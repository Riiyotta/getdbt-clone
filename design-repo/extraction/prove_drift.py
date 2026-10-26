#!/usr/bin/env python3
"""Proves verify_all.py's drift checks actually catch drift (they must FAIL on injected drift).

    python3 extraction/prove_drift.py

For each case: copy this design-repo into a fresh OS temp directory, inject one drift, run verify_all there and
require the named check to FAIL; then run the untouched copy and require every check to pass. The real package is
never modified. When the clone project surrounds this folder, its source files are symlinked (read-only use) next
to the scratch copy so the citation / provenance / tailwind / routes checks can be exercised; standalone, those
cases are reported as SKIPPED.
"""
import json, re, shutil, subprocess, sys, tempfile
from pathlib import Path

sys.dont_write_bytecode = True
REPO = Path(__file__).resolve().parent.parent
PROJECT = REPO.parent
SIBLING = (PROJECT / "src").is_dir() and (PROJECT / "package.json").exists()
LINKS = ["src", "public", "specs", "recon", "package.json", "tailwind.config.cjs", "CLONE_SPEC.md", "PAGES.md", "ASSET_MANIFEST.md", "index.html"]


def jload(p):
    return json.loads(p.read_text())


def jsave(p, d):
    p.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n")


def edit_json(rel, fn):
    def go(r):
        p = r / rel
        d = jload(p)
        fn(d)
        jsave(p, d)
    return go


def edit_text(rel, old, new):
    def go(r):
        p = r / rel
        s = p.read_text()
        assert old in s, f"drift anchor not found in {rel}: {old[:40]}"
        p.write_text(s.replace(old, new, 1))
    return go


def scratch(with_sibling):
    root = Path(tempfile.mkdtemp(prefix="design-repo-drift-"))
    shutil.copytree(REPO, root / "design-repo", ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"))
    if with_sibling:
        for name in LINKS:
            if (PROJECT / name).exists():
                (root / name).symlink_to(PROJECT / name)
    return root


def run_verify(root):
    p = subprocess.run([sys.executable, "-B", str(root / "design-repo/extraction/verify_all.py"), "--quiet"], capture_output=True, text=True)
    failed = set(re.findall(r"^FAIL\s+(\S+)", p.stdout, re.M))
    return p.returncode, failed, p.stdout


def bad_citation(r):
    p = r / "sections/hero.split.json"
    d = jload(p)
    d["evidence"].append("src/components/sections/HeroSplit.jsx:9000-9010")
    jsave(p, d)


def wrong_tagline(r):
    p = r / "sections/cta.gradient-card.json"
    d = jload(p)
    d["source"]["tagLine"] = d["source"]["tagLine"] + 3
    jsave(p, d)


def tailwind_drift(r):
    for rel in ("tokens/00-foundation/color.json", "tokens/llm/token-catalog.json"):
        p = r / rel
        d = jload(p)
        d["tokens"]["color.orange.600"]["value"] = "#ff6600"
        jsave(p, d)


def add_graph_rule(r):
    p = r / "compatibility/graph.json"
    d = jload(p)
    d["rules"].append({"id": "NO_TWO_DARK_BANDS", "severity": "error", "rule": "documented but never implemented"})
    jsave(p, d)


def flip_retrieval_both(r):
    for rel in ("sections/shell.mega-menu.json",):
        p = r / rel
        d = jload(p)
        d["retrievalEligible"] = True
        d.pop("retrievalIneligibleReason", None)
        jsave(p, d)
    p = r / "tokens/llm/component-allowlist.json"
    d = jload(p)
    for e in d["entries"]:
        if e["id"] == "shell.mega-menu":
            e["retrievalEligible"] = True
    jsave(p, d)


def drop_measurement(r):
    p = r / "extraction/measured-values.json"
    d = jload(p)
    d["sectionHeights"]["routes"].pop("/product/develop")
    jsave(p, d)


def taller_hero(r):
    p = r / "extraction/measured-values.json"
    d = jload(p)
    d["sectionHeights"]["routes"]["/product/develop"]["nodes"][0]["heightPx"] = 3100
    jsave(p, d)


def majority_section(r):
    p = r / "extraction/measured-values.json"
    d = jload(p)
    d["sectionHeights"]["routes"]["/product/develop"]["nodes"][3]["heightPx"] = 20000
    jsave(p, d)


def bad_whitelist(r):
    p = r / "extraction/measured-values.json"
    d = jload(p)
    d["sectionHeights"]["routes"]["/product/develop"]["nodes"][0]["heightPx"] = 3100
    d["wrapperGateWhitelist"] = [{"route": "/product/develop", "section": "hero.split", "reviewedBy": "build agent", "justification": "tall", "maxHeightPx": 3200}]
    jsave(p, d)


CASES = [
    # (name, mutate, check that must FAIL, needs sibling source)
    ("phantom allowlist entry", edit_json("tokens/llm/component-allowlist.json", lambda d: d["entries"].append({"id": "section.ghost", "kind": "section", "file": "sections/section.ghost.json"})), "ALLOWLIST_PARITY", False),
    ("orphan contract (allowlist entry removed)", edit_json("tokens/llm/component-allowlist.json", lambda d: d.update(entries=[e for e in d["entries"] if e["id"] != "cta.ide-card"])), "ALLOWLIST_PARITY", False),
    ("allowlist settable drift", edit_json("tokens/llm/component-allowlist.json", lambda d: [e["settable"]["content"].append("subtitle") for e in d["entries"] if e["id"] == "hero.split"]), "ALLOWLIST_PARITY", False),
    ("allowlistVersion drift", edit_json("registry.manifest.json", lambda d: d.update(allowlistVersion="9.9.9")), "ALLOWLIST_PARITY", False),
    ("manifest count drift", edit_json("registry.manifest.json", lambda d: d["counts"].update(sections=d["counts"]["sections"] + 1)), "COUNTS", False),
    ("README count drift", edit_text("README.md", '"sections": ', '"sections": 1'), "COUNTS", False),
    ("registry availability loosened", edit_json("assets/asset-roles.json", lambda d: d["roles"]["customer.logo"].update(availability="generation-safe")), "PINS", False),
    ("pin removed from verify_all", edit_text("extraction/verify_all.py", '"customer.logo": "reference-only", "customer.placeholder-logo"', '"customer.placeholder-logo"'), "PINS", False),
    ("contract + allowlist retrieval flipped together", flip_retrieval_both, "PINS", False),
    ("graph rule documented but not implemented", add_graph_rule, "GRAPH_AGREEMENT", False),
    ("token catalog value drift", edit_json("tokens/llm/token-catalog.json", lambda d: d["tokens"]["radius.xl"].update(value="14px")), "TOKENS", False),
    ("policy category not in catalog", edit_json("tokens/llm/token-policy.json", lambda d: d["rawValueRestrictions"].update(typography="only type tokens")), "TOKENS", False),
    ("route removed from routes.json", edit_json("routes/routes.json", lambda d: d.update(routes=[x for x in d["routes"] if x["path"] != "/product/mesh"])), "ROUTE_COVERAGE", False),
    ("template marked pending while it still has nodes", edit_json("templates/templates.json", lambda d: d["templates"]["T8"].update(status="pending")), "TEMPLATES", False),
    ("wrapper gate: missing measurement", drop_measurement, "WRAPPER_GATE", False),
    ("wrapper gate: wrong viewport", edit_json("extraction/measured-values.json", lambda d: d["sectionHeights"].update(viewport=1280)), "WRAPPER_GATE", False),
    ("wrapper gate: HERO 3100px", taller_hero, "WRAPPER_GATE", False),
    ("wrapper gate: majority share", majority_section, "WRAPPER_GATE", False),
    ("wrapper gate: whitelist without justification / agent attestation", bad_whitelist, "WRAPPER_GATE", False),
    ("absolute machine path", edit_text("CHANGELOG.md", "Rebuilt against", "Rebuilt against (" + "/" + "Users/someone/project)"), "HYGIENE", False),
    ("entry point outside the package", edit_json("registry.manifest.json", lambda d: d["entryPoints"].update(spec="../CLONE_SPEC.md")), "ENTRYPOINTS", False),
    ("summit route chrome changed in routes.json", edit_json("routes/routes.json", lambda d: [x.update(chrome="full") for x in d["routes"] if x["path"] == "/summit"]), "ROUTE_COVERAGE", False),
    ("chrome pin changed in verify_all", edit_text("extraction/verify_all.py", '"/summit": "event", "/partner-directory": "none"}  # duplicated', '"/summit": "none", "/partner-directory": "none"}  # duplicated'), "ROUTE_COVERAGE", False),
    ("hero-less pin removed (T17)", edit_text("extraction/verify_all.py", '"T14", "T17"}', '"T14"}'), "ROUTE_COVERAGE", False),
    ("retrieval pin removed (category bar)", edit_text("extraction/verify_all.py", '"article.progress-bar", "listing.category-nav"}', '"article.progress-bar"}'), "PINS", False),
    ("new role pin removed (partner.wordmark)", edit_text("extraction/verify_all.py", '"partner.wordmark": "reference-only", ', ''), "PINS", False),
    ("contract placement drift (dialog treated as in-flow)", edit_json("sections/cta.dev-path-dialog.json", lambda d: d.update(placement="main")), "PINS", False),
    ("stale wrapper whitelist entry", lambda r: edit_json("extraction/measured-values.json", lambda d: d["wrapperGateWhitelist"].append({"route": "/pricing", "section": "pricing.add-ons", "reviewedBy": "build agent (agent attestation, not a human sign-off)", "justification": "stale entry that no measured hit uses at all", "maxHeightPx": 9999}))(r), "WRAPPER_GATE", False),
    ("summit colour token drifted from oneoffs.css", lambda r: [edit_json(rel, lambda d: d["tokens"]["color.summit.orange"].update(value="#ff0000"))(r) for rel in ("tokens/00-foundation/color.json", "tokens/llm/token-catalog.json")], "TOKENS", True),
    ("event theme removed from the policy", edit_json("tokens/llm/token-policy.json", lambda d: d.update(themes=["light"])), "TOKENS", False),
    ("out-of-range citation", bad_citation, "CITATIONS", True),
    ("source tag moved off its cited line", wrong_tagline, "SOURCE_PROVENANCE", True),
    ("token drifted from tailwind.config.cjs", tailwind_drift, "TOKENS", True),
]


def main():
    fails = 0
    root = scratch(SIBLING)
    rc, failed, out = run_verify(root)
    print(f"untouched scratch copy: verify_all exit {rc}, failed checks {sorted(failed) or 'none'}")
    if rc != 0:
        print(out)
        return 1
    shutil.rmtree(root)
    for name, mutate, check, needs_sibling in CASES:
        if needs_sibling and not SIBLING:
            print(f"  SKIPPED  [{check}] {name} (no sibling clone source)")
            continue
        root = scratch(SIBLING)
        mutate(root / "design-repo")
        rc, failed, out = run_verify(root)
        ok = rc != 0 and check in failed
        fails += not ok
        print(f"  {'caught' if ok else 'MISSED'}  [{check}] {name}" + ("" if ok else f"  (exit {rc}, failed {sorted(failed)})"))
        shutil.rmtree(root)
    rc, failed, _ = run_verify(REPO.parent)
    print(f"\nreal repo after drift runs: verify_all exit {rc}")
    print(f"prove_drift: {len(CASES)} cases, {fails} missed")
    return 1 if fails or rc else 0


if __name__ == "__main__":
    sys.exit(main())
