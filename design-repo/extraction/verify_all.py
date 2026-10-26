#!/usr/bin/env python3
"""One-shot verification of this design-repo. Exit 1 on any failed check.

    python3 extraction/verify_all.py [--quiet]

Checks (each prints PASS/FAIL/WARN):
  SCHEMAS            Draft-07 meta-validation of pagespec + section-contract schemas; every contract validates
  EXAMPLES           every reference + generated example: schema + semantic validator, 0 errors
  ROUTE_COVERAGE     every served route mapped exactly once; one reference example per implemented route; redirects resolve;
                     chrome variant per route == template == src/Layout.jsx CHROME (+ pins); (sibling clone present) routes.json ==
                     src/routes.js paths + '/' and the implemented templates == src/App.jsx registry
  TEMPLATES          implemented templates have nodes; pending have none; template.routes == routes.json mapping
  ALLOWLIST_PARITY   allowlist ids == primitives/components/sections files; section 'settable' == contract + schema; version parity
  GRAPH_AGREEMENT    compatibility/graph.json rule ids == semantic_validate.GRAPH_RULES_IMPLEMENTED
  PINS               availability + forbidden-all-modes + retrieval pins: this file == semantic_validate == registries
  TOKENS             catalog == regenerated from tokens/ files; policy categories/allowed values exist; (sibling) colours == tailwind.config.cjs
  MOTION             every contract motion pattern exists; schema motion patterns == motion-patterns.json
  SOURCE_PROVENANCE  (sibling) every contract source/additionalSources range exists, export at start line, <tag> at tagLine
  CITATIONS          (sibling) every path:line[-line] citation in the repo resolves inside the real file
  ASSET_REFS         (sibling) every reference-example asset ref exists under public/
  COUNTS             registry.manifest.json counts == recomputed; README counts block == manifest
  ENTRYPOINTS        every entry point exists and is inside this folder
  WRAPPER_GATE       extraction/wrapper_gate.py (R9)
  HYGIENE            no absolute machine paths, no junk files
"(sibling)" checks need the clone project around this folder; standalone they WARN instead of failing.
"""
import importlib.util, json, re, sys

sys.dont_write_bytecode = True  # never leave __pycache__ inside the package
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PROJECT = REPO.parent
SIBLING = (PROJECT / "src").is_dir() and (PROJECT / "package.json").exists()
QUIET = "--quiet" in sys.argv

# pins, duplicated on purpose (independent of the registries and of semantic_validate.py)
PINNED_AVAILABILITY = {
    "brand.wordmark": "reference-only", "brand.placeholder-mark": "generation-safe", "brand.user-supplied-mark": "generation-safe",
    "customer.logo": "reference-only", "customer.placeholder-logo": "generation-safe",
    "partner.lockup": "reference-only", "partner.placeholder-lockup": "generation-safe",
    "platform.logo": "reference-only", "platform.placeholder-icon": "generation-safe",
    "product.screenshot": "reference-only", "product.generated-visual": "generation-safe",
    "illustration.diagram": "reference-only", "illustration.generated-diagram": "generation-safe", "illustration.abstract": "generation-safe",
    "photo.composite-scene": "reference-only", "photo.generated-scene": "generation-safe",
    "video.poster": "reference-only", "video.placeholder-poster": "generation-safe",
    "resource.thumbnail": "reference-only", "resource.generated-thumbnail": "generation-safe",
    "award.badge": "reference-only", "rating.placeholder": "generation-safe",
    "icon.feature": "generation-safe", "person.fictional-avatar": "generation-safe",
    "brand.event-mark": "reference-only", "product.lockup": "reference-only", "partner.wordmark": "reference-only", "figure.article-image": "reference-only",
    "person.real-photo": "blocked-for-generation", "thirdparty.real-mark": "blocked-for-generation", "store.badge": "blocked-for-generation",
    "link.clone-route": "reference-only", "link.placeholder": "generation-safe", "link.source-external": "blocked-for-generation",
    "copy.clone-placeholder": "reference-only", "copy.original": "generation-safe", "copy.source-site": "blocked-for-generation",
}
PINNED_FORBIDDEN_ALL_MODES = {"person.real-photo", "thirdparty.real-mark", "store.badge", "link.source-external", "copy.source-site"}
RETRIEVAL_INELIGIBLE = {"shell.announcement-bar", "shell.mega-menu", "shell.mobile-drawer", "cta.dev-path-dialog", "article.progress-bar", "listing.category-nav"}
RUNTIME_UI_HINT = re.compile(r"(cookie|consent|banner|modal|dialog|drawer|overlay|preloader|cursor|ticker|toast|popover|mega-menu|announcement|progress bar|progress-bar|tooltip)", re.I)
CHROME_BY_ROUTE = {"/summit": "event", "/partner-directory": "none"}  # duplicated on purpose: compared with semantic_validate and src/Layout.jsx
HEROLESS_TEMPLATES = {"T5", "T6", "T7", "T8", "T9", "T10", "T11", "T14", "T17"}

RESULTS = []


def rec(name, errors, warnings=(), info=""):
    status = "FAIL" if errors else ("WARN" if warnings else "PASS")
    RESULTS.append((name, status, list(errors), list(warnings), info))


def J(rel):
    return json.loads((REPO / rel).read_text())


def import_file(name, rel):
    spec = importlib.util.spec_from_file_location(name, REPO / rel)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


sv = import_file("semantic_validate", "schema/semantic_validate.py")
wg = import_file("wrapper_gate", "extraction/wrapper_gate.py")
repo = sv.load_repo()
contracts, templates, schema = repo["contracts"], repo["templates"], repo["schema"]
routes_doc = repo["routes"]
manifest = J("registry.manifest.json")
slug = lambda r: "home" if r == "/" else r.strip("/").replace("/", "--")

# ---------------------------------------------------------------- SCHEMAS
errs = []
try:
    from jsonschema import Draft7Validator
    Draft7Validator.check_schema(schema)
    cs = J("schema/section-contract.schema.json")
    Draft7Validator.check_schema(cs)
    cv = Draft7Validator(cs)
    for sid, c in contracts.items():
        for e in cv.iter_errors(c):
            errs.append(f"sections/{sid}.json: {'/'.join(map(str, e.path))}: {e.message[:160]}")
        if c["id"] != sid or c["semantic"]["id"] != sid:
            errs.append(f"sections/{sid}.json: id/semantic.id must equal the file stem")
        if c["source"]["id"] == sid:
            errs.append(f"sections/{sid}.json: source.id must not equal the semantic id")
    rec("SCHEMAS", errs, info=f"{len(contracts)} contracts validated against section-contract.schema.json")
except ImportError:
    rec("SCHEMAS", ["jsonschema not installed (pip install jsonschema)"])

# ---------------------------------------------------------------- EXAMPLES
errs, warns = [], []
ex_files = sorted((REPO / "schema/examples").rglob("*.json")) + [REPO / "schema/example.pagespec.json"]
modes = {"reference": 0, "generated": 0}
for f in ex_files:
    spec = json.loads(f.read_text())
    E, W = sv.validate(spec, repo)
    modes[spec.get("mode")] = modes.get(spec.get("mode"), 0) + 1
    for r, m in E:
        errs.append(f"{f.relative_to(REPO)}: {r}: {m}")
    for r, m in W:
        warns.append(f"{f.relative_to(REPO)}: {r}: {m}")
    if "generated" in f.parts and spec.get("mode") != "generated":
        errs.append(f"{f.relative_to(REPO)} is under examples/generated but mode != generated")
if modes.get("generated", 0) < 1:
    errs.append("no generated-mode example")
gen_templates = {json.loads(f.read_text())["template"] for f in (REPO / "schema/examples/generated").glob("*.json")}
if not {"T0", "T8", "T11"} <= gen_templates or len(gen_templates) < 4:
    errs.append(f"generated examples must cover the home family, an article (T8), a legal page (T11) and at least one marketing content family; got {sorted(gen_templates)}")
rec("EXAMPLES", errs, warns, info=f"{len(ex_files)} examples ({modes}) -> 0 errors required")

# ---------------------------------------------------------------- ROUTE_COVERAGE + TEMPLATES
errs = []
paths = [r["path"] for r in routes_doc["routes"]]
dups = {p for p in paths if paths.count(p) > 1}
if dups:
    errs.append(f"routes mapped more than once: {sorted(dups)}")
for r in routes_doc["routes"]:
    if r["template"] not in templates:
        errs.append(f"{r['path']} -> unknown template {r['template']}")
    elif templates[r["template"]]["status"] != r["status"]:
        errs.append(f"{r['path']}: status {r['status']} != template status")
    if r["status"] == "implemented" and not (REPO / "schema/examples/reference" / f"{slug(r['path'])}.pagespec.json").exists():
        errs.append(f"implemented route {r['path']} has no reference example")
for f in (REPO / "schema/examples/reference").glob("*.json"):
    s = json.loads(f.read_text())
    if s["route"] not in paths or slug(s["route"]) != f.stem.replace(".pagespec", ""):
        errs.append(f"{f.name}: route {s['route']} not in routes.json or misnamed")
for rd in routes_doc["redirects"]:
    if rd["to"] not in paths:
        errs.append(f"redirect {rd['from']} -> {rd['to']} targets an unmapped route")
    if rd["from"] in paths:
        errs.append(f"redirect source {rd['from']} is also a page route")
if CHROME_BY_ROUTE != sv.CHROME_BY_ROUTE:
    errs.append("CHROME_BY_ROUTE differs between verify_all and semantic_validate")
for r in routes_doc["routes"]:
    want = CHROME_BY_ROUTE.get(r["path"], "full")
    if r.get("chrome") != want:
        errs.append(f"{r['path']}: routes.json chrome {r.get('chrome')!r} != pinned {want!r}")
    t = templates.get(r["template"])
    if t and t.get("chrome") != want:
        errs.append(f"{r['path']}: template {r['template']} chrome {t.get('chrome')!r} != route chrome {want!r}")
    if t and t.get("theme") != sv.THEME_BY_CHROME[want]:
        errs.append(f"{r['template']}: theme {t.get('theme')!r} != {sv.THEME_BY_CHROME[want]!r} required by chrome {want!r}")
if HEROLESS_TEMPLATES != sv.HEROLESS_TEMPLATES:
    errs.append("HEROLESS_TEMPLATES differs between verify_all and semantic_validate")
def _options(n):
    for o in (n["anyOf"] if "slot" in n else [n]):
        yield from (o["sequence"] if "sequence" in o else [o])
hero_less = {tid for tid, t in templates.items() if not any(contracts[o["section"]]["semantic"]["category"] == "HERO" for n in t["nodes"] for o in _options(n))}
if hero_less != HEROLESS_TEMPLATES:
    errs.append(f"hero-less templates computed from templates.json {sorted(hero_less)} != pinned {sorted(HEROLESS_TEMPLATES)}")
one_hero = next((r for r in repo["graph"]["rules"] if r["id"] == "ONE_HERO"), {})
if set(one_hero.get("exceptions", [])) != HEROLESS_TEMPLATES:
    errs.append("graph ONE_HERO exceptions != pinned hero-less templates")
warns = []
if SIBLING:
    _lay = (PROJECT / "src/Layout.jsx").read_text()
    _m = re.search(r"const CHROME = \{(.*?)\n\}", _lay, re.S)
    live_chrome = dict(re.findall(r"'([^']+)': '([a-z]+)'", _m.group(1))) if _m else {}
    if live_chrome != CHROME_BY_ROUTE:
        errs.append(f"src/Layout.jsx CHROME {live_chrome} != pinned {CHROME_BY_ROUTE}")
    src_paths = set(re.findall(r"path: '([^']+)'", (PROJECT / "src/routes.js").read_text())) | {"/"}
    if src_paths != set(paths):
        errs.append(f"routes.json drifted from src/routes.js: missing {sorted(src_paths - set(paths))}, extra {sorted(set(paths) - src_paths)}")
    app = (PROJECT / "src/App.jsx").read_text()
    m = re.search(r"const templates = \{([^}]*)\}", app)
    live = {x.strip() for x in m.group(1).split(",")} if m else set()
    impl = {t for t, d in templates.items() if d["status"] == "implemented" and t != "T0"}
    if live != impl:
        errs.append(f"implemented templates drifted from src/App.jsx registry: App {sorted(live)} vs repo {sorted(impl)}")
else:
    warns.append("no sibling clone source: src/routes.js / src/App.jsx drift not checked")
rec("ROUTE_COVERAGE", errs, warns, info=f"{len(paths)} routes, {len(routes_doc['redirects'])} redirects")
errs = []
for tid, t in templates.items():
    if t["status"] == "implemented" and not t["nodes"]:
        errs.append(f"{tid} implemented without nodes")
    if t["status"] == "pending" and t["nodes"]:
        errs.append(f"{tid} pending but has nodes (contracts must exist first)")
    want = sorted(r["path"] for r in routes_doc["routes"] if r["template"] == tid)
    if sorted(t["routes"]) != want:
        errs.append(f"{tid}.routes {t['routes']} != routes.json mapping {want}")
    for n in t["nodes"]:
        for o in _options(n):
            if o["section"] not in contracts:
                errs.append(f"{tid} references unknown section {o['section']}")
            for v in o.get("variants", []):
                if v not in contracts.get(o["section"], {}).get("variants", {}):
                    errs.append(f"{tid}: {o['section']} has no variant {v}")
    if t.get("chrome") not in sv.CHROME_HEADS:
        errs.append(f"{tid}: unknown chrome {t.get('chrome')!r}")
    else:
        ids = [n.get("section", "<slot>") for n in t["nodes"]]
        if ids[:len(sv.CHROME_HEADS[t["chrome"]])] != sv.CHROME_HEADS[t["chrome"]] or (sv.CHROME_TAILS[t["chrome"]] and ids[-len(sv.CHROME_TAILS[t["chrome"]]):] != sv.CHROME_TAILS[t["chrome"]]):
            errs.append(f"{tid}: node list does not open/close with the shell nodes of chrome {t['chrome']!r}")
rec("TEMPLATES", errs)

# ---------------------------------------------------------------- ALLOWLIST_PARITY
errs = []
al = repo["allowlist"]
files = {}
for d, kind in (("primitives", "primitive"), ("components", "component"), ("sections", "section")):
    for p in (REPO / d).glob("*.json"):
        files[json.loads(p.read_text())["id"]] = (kind, f"{d}/{p.name}")
ids = [e["id"] for e in al["entries"]]
if len(ids) != len(set(ids)):
    errs.append("duplicate allowlist ids")
for e in al["entries"]:
    if e["id"] not in files:
        errs.append(f"phantom allowlist entry {e['id']} (no contract file)")
    elif files[e["id"]] != (e["kind"], e["file"]):
        errs.append(f"allowlist {e['id']}: kind/file {e['kind']}/{e['file']} != {files[e['id']]}")
for i in files:
    if i not in ids:
        errs.append(f"orphan contract {i} has no allowlist entry")
for e in al["entries"]:
    if e["kind"] != "section" or e["id"] not in contracts:
        continue
    c = contracts[e["id"]]
    want = {"variant": sorted(c["variants"]), "content": sorted(schema["definitions"][f"content.{e['id']}"]["properties"]), "style": sorted(c["style"]["props"]),
            "motion": c["motion"]["allowedPatterns"], "assetRoles": c["generatedAssetRoles"]}
    if e.get("settable") != want:
        errs.append(f"allowlist {e['id']} settable drifted from contract/schema: {e.get('settable')} != {want}")
    if e.get("retrievalEligible") != c["retrievalEligible"]:
        errs.append(f"allowlist {e['id']} retrievalEligible != contract")
if manifest.get("allowlistVersion") != al.get("version"):
    errs.append(f"manifest allowlistVersion {manifest.get('allowlistVersion')} != allowlist version {al.get('version')}")
if manifest.get("pageSpecVersion") != schema["properties"]["pageSpecVersion"]["const"]:
    errs.append("manifest pageSpecVersion != schema const")
rec("ALLOWLIST_PARITY", errs, info=f"{len(ids)} entries == {len(files)} contract files")

# ---------------------------------------------------------------- GRAPH_AGREEMENT
gids = {r["id"] for r in repo["graph"]["rules"]}
errs = []
if gids != sv.GRAPH_RULES_IMPLEMENTED:
    errs.append(f"graph rules not implemented: {sorted(gids - sv.GRAPH_RULES_IMPLEMENTED)}; implemented but undocumented: {sorted(sv.GRAPH_RULES_IMPLEMENTED - gids)}")
src_sv = (REPO / "schema/semantic_validate.py").read_text()
for g in gids:
    if f'err("{g}"' not in src_sv and f'warn("{g}"' not in src_sv:
        errs.append(f"graph rule {g} has no err()/warn() call in semantic_validate.py")
for r in repo["graph"]["rules"]:
    if r.get("severity") not in ("error", "warn"):
        errs.append(f"rule {r['id']} severity must be error|warn")
    sev_in_code = "warn" if f'warn("{r["id"]}"' in src_sv else "error"
    if sev_in_code != r.get("severity"):
        errs.append(f"rule {r['id']}: graph severity {r.get('severity')} != validator {sev_in_code}")
rec("GRAPH_AGREEMENT", errs, info=f"{len(gids)} rules")

# ---------------------------------------------------------------- PINS
errs = []
roles = repo["roles"]["roles"]
if PINNED_AVAILABILITY != sv.PINNED_AVAILABILITY:
    errs.append("verify_all PINNED_AVAILABILITY != semantic_validate PINNED_AVAILABILITY")
if PINNED_FORBIDDEN_ALL_MODES != sv.PINNED_FORBIDDEN_ALL_MODES:
    errs.append("forbidden-all-modes pins differ between verify_all and semantic_validate")
if RETRIEVAL_INELIGIBLE != sv.RETRIEVAL_INELIGIBLE:
    errs.append("RETRIEVAL_INELIGIBLE differs between verify_all and semantic_validate")
for rid, av in PINNED_AVAILABILITY.items():
    if roles.get(rid, {}).get("availability") != av:
        errs.append(f"asset role {rid}: registry {roles.get(rid, {}).get('availability')!r} != pinned {av!r}")
for rid, d in roles.items():
    if rid not in PINNED_AVAILABILITY:
        errs.append(f"asset role {rid} not pinned")
    if d.get("availability") != "generation-safe":
        subs = d.get("generationSafeSubstitutes") or []
        if not subs or any(PINNED_AVAILABILITY.get(s) != "generation-safe" for s in subs):
            errs.append(f"asset role {rid}: generationSafeSubstitutes must be non-empty and generation-safe")
    if rid in PINNED_FORBIDDEN_ALL_MODES and not d.get("forbiddenInAllModes"):
        errs.append(f"asset role {rid} lost forbiddenInAllModes")
if roles.get("brand.wordmark", {}).get("generationPolicy") == "must-reuse-exact":
    errs.append("brand wordmark may never be must-reuse-exact")
if set(schema["definitions"]["assetRole"]["enum"]) != {r for r, d in roles.items() if d["kind"] == "media"}:
    errs.append("schema assetRole enum != media roles in assets/asset-roles.json")
for sid, c in contracts.items():
    for gr in c["generatedAssetRoles"]:
        if PINNED_AVAILABILITY.get(gr) != "generation-safe":
            errs.append(f"{sid}: generatedAssetRoles contains non-generation-safe {gr}")
    if c["retrievalEligible"] is not (sid not in RETRIEVAL_INELIGIBLE):
        errs.append(f"{sid}: retrievalEligible {c['retrievalEligible']} contradicts the pin")
    if RUNTIME_UI_HINT.search(sid + " " + c["title"]) and sid not in RETRIEVAL_INELIGIBLE:
        errs.append(f"{sid} looks like runtime UI but is not pinned retrieval-ineligible")
for sid, c in contracts.items():
    want_pl = "overlay" if sid == sv.OVERLAY_DIALOG else "chrome" if c["semantic"]["category"] == "SHELL" else "main"
    if c.get("placement") != want_pl:
        errs.append(f"{sid}: placement {c.get('placement')!r} != {want_pl!r}")
errs += [f"{r}: {m}" for r, m in sv.registry_pin_errors(repo)]
rec("PINS", errs, info=f"{len(PINNED_AVAILABILITY)} roles, {len(RETRIEVAL_INELIGIBLE)} retrieval-ineligible sections")

# ---------------------------------------------------------------- TOKENS
errs, warns = [], []
cat = repo["catalog"]
regen = {}
for p in sorted((REPO / "tokens/00-foundation").glob("*.json")):
    if p.name == "motion-patterns.json":
        continue
    for k, v in json.loads(p.read_text())["tokens"].items():
        regen[k] = {"value": v["value"], "category": v["category"]}
SEM = J("tokens/10-semantic/semantic.json")["tokens"]
for layer, rel in (("semantic", "tokens/10-semantic/semantic.json"), ("component", "tokens/20-component/component.json")):
    for k, ref in J(rel)["tokens"].items():
        tgt = regen.get(ref) if ref in regen and not str(regen[ref]["value"]).startswith("{") else regen.get(SEM.get(ref, ref))
        if tgt is None:
            errs.append(f"{rel}: {k} -> {ref} does not resolve to a foundation token")
            continue
        regen[k] = {"value": "{" + ref + "}", "category": tgt["category"]}
cat_file = J("tokens/llm/token-catalog.json")
if {k: {"value": v["value"], "category": v["category"]} for k, v in cat.items()} != regen:
    diff = sorted(set(cat) ^ set(regen)) or sorted(k for k in cat if regen.get(k) != {"value": cat[k]["value"], "category": cat[k]["category"]})
    errs.append(f"token-catalog drifted from tokens/ files: {diff[:8]}")
if cat_file.get("count") != len(cat):
    errs.append("token-catalog count field != number of tokens")
pol = repo["policy"]
cats = {v["category"] for v in cat.values()}
if set(pol["categories"]) != cats:
    errs.append(f"policy categories {sorted(pol['categories'])} != catalog categories {sorted(cats)}")
for c in pol["rawValueRestrictions"]:
    if c not in cats:
        errs.append(f"policy rawValueRestrictions key {c!r} is not a catalog category")
for prop, d in pol["styleProps"].items():
    for c in d["categories"]:
        if c not in cats:
            errs.append(f"styleProps.{prop} category {c} not in catalog")
    for sid, vals in d["allowedBySection"].items():
        if sid not in contracts or contracts[sid]["style"]["props"].get(prop, {}).get("allowed") != vals:
            errs.append(f"styleProps.{prop}.{sid} != contract style props")
        for v in vals:
            if d["kind"] == "token" and v not in cat:
                errs.append(f"styleProps.{prop}: {v} not in catalog")
if pol["themes"] != manifest["schemaValidatedThemes"] or schema["properties"]["theme"]["enum"] != pol["themes"]:
    errs.append("themes differ between token-policy, manifest and schema")
for key in ("token-catalog.json", "token-policy.json", "component-allowlist.json"):
    if not any(str(v).endswith(key) for v in manifest["entryPoints"].values()):
        errs.append(f"{key} not registered in registry.manifest.json entryPoints")
if SIBLING:
    tw = (PROJECT / "tailwind.config.cjs").read_text()
    for fam in ("ink", "purple", "orange"):
        block = re.search(fam + r": \{([^}]*)\}", tw)
        for k, v in re.findall(r"(\d+): '(#[0-9a-fA-F]{6})'", block.group(1) if block else ""):
            tok = cat.get(f"color.{fam}.{k}")
            if tok is None or tok["value"].lower() != v.lower():
                errs.append(f"color.{fam}.{k} = {tok and tok['value']} but tailwind.config.cjs has {v}")
    typo = J("tokens/00-foundation/typography.json")["tokens"]
    for k, size, lh in re.findall(r"^\s+'?([a-z0-9-]+)'?: \['(\d+px)', '([\d.]+px)'\]", tw, re.M):
        tok = typo.get(f"font.size.{k}")
        if tok is None or tok["value"] != size or tok.get("lineHeight") != lh:
            errs.append(f"font.size.{k} drifted from tailwind.config.cjs ({size}/{lh})")
    css1 = (PROJECT / "src/styles/oneoffs.css").read_text()
    for var, tok in (("ink", "color.summit.ink"), ("orange", "color.summit.orange"), ("pink", "color.summit.pink"), ("citron", "color.summit.citron"), ("bg", "color.summit.bg"), ("fg", "color.summit.fg")):
        m1 = re.search(rf"--summit-{var}: (#[0-9a-fA-F]{{3,6}})", css1)
        v1 = m1 and m1.group(1).lower()
        if v1 and len(v1) == 4:
            v1 = "#" + "".join(ch * 2 for ch in v1[1:])
        if tok not in cat or v1 is None or cat[tok]["value"].lower() != v1:
            errs.append(f"{tok} = {cat.get(tok, {}).get('value')} but src/styles/oneoffs.css --summit-{var} is {v1}")
    tw2 = (PROJECT / "tailwind.config.cjs").read_text()
    for name, tok in (("danger", "color.danger"), ("pink: \\{ 700", "color.pink.700")):
        m2 = re.search(rf"\b{name}: '(#[0-9a-fA-F]{{6}})'", tw2)
        if not m2 or cat.get(tok, {}).get("value", "").lower() != m2.group(1).lower():
            errs.append(f"{tok} drifted from tailwind.config.cjs")
else:
    warns.append("no sibling tailwind.config.cjs: token-vs-source drift not checked")
rec("TOKENS", errs, warns, info=f"{len(cat)} catalog tokens, {len(cats)} categories")

# ---------------------------------------------------------------- MOTION
errs = []
mp = repo["motion"]
for sid, c in contracts.items():
    for p in c["motion"]["allowedPatterns"]:
        if p not in mp:
            errs.append(f"{sid}: motion pattern {p} not in motion-patterns.json")
        elif c["motion"]["reducedMotionFallback"].get(p) != mp[p]["reducedMotionFallback"]:
            errs.append(f"{sid}: reducedMotionFallback for {p} != motion-patterns.json")
schema_patterns = {o["properties"]["pattern"]["const"] for o in schema["definitions"]["motion"]["oneOf"]}
if schema_patterns != set(mp):
    errs.append(f"schema motion patterns {sorted(schema_patterns)} != motion-patterns.json {sorted(mp)}")
rec("MOTION", errs, info=f"{len(mp)} patterns")

# ---------------------------------------------------------------- SOURCE_PROVENANCE + CITATIONS + ASSET_REFS
CITE = re.compile(r"((?:src/|specs/|recon/)[\w./-]+|[A-Z_]+\.md|tailwind\.config\.cjs|package\.json|index\.html):(\d+)(?:-(\d+))?")
if SIBLING:
    errs = []
    n = 0
    for sid, c in contracts.items():
        for s in [c["source"]] + c["additionalSources"]:
            n += 1
            f = PROJECT / s["file"]
            if not f.exists():
                errs.append(f"{sid}: source file {s['file']} missing")
                continue
            ls = f.read_text().split("\n")
            a, b = map(int, s["lines"].split("-"))
            if not (1 <= a <= b <= len(ls)):
                errs.append(f"{sid}: source range {s['lines']} outside {s['file']} ({len(ls)} lines)")
                continue
            if s["export"] and not re.search(rf"function {re.escape(s['export'])}\b", ls[a - 1]):
                errs.append(f"{sid}: line {a} of {s['file']} is not 'function {s['export']}'")
            if not (a <= s["tagLine"] <= b) or f"<{s['tag']}" not in ls[s["tagLine"] - 1]:
                errs.append(f"{sid}: <{s['tag']}> not at {s['file']}:{s['tagLine']}")
            if s["export"] and ls[b - 1] != "}":
                errs.append(f"{sid}: {s['file']}:{b} is not the end of {s['export']}")
    rec("SOURCE_PROVENANCE", errs, info=f"{n} source ranges re-read")
    errs, total = [], 0
    for p in REPO.rglob("*"):
        if p.suffix not in (".json", ".md") or not p.is_file():
            continue
        for m in CITE.finditer(p.read_text()):
            total += 1
            f = PROJECT / m.group(1)
            if not f.exists():
                errs.append(f"{p.relative_to(REPO)}: cites missing file {m.group(1)}")
                continue
            nlines = len(f.read_text().split("\n"))
            a, b = int(m.group(2)), int(m.group(3) or m.group(2))
            if not (1 <= a <= b <= nlines):
                errs.append(f"{p.relative_to(REPO)}: {m.group(0)} out of range ({nlines} lines)")
    rec("CITATIONS", errs, info=f"{total} citations resolved")
    errs, total = [], 0
    for f in (REPO / "schema/examples/reference").glob("*.json"):
        for _, a in sv.assets_in(json.loads(f.read_text())["nodes"]):
            total += 1
            if not (PROJECT / "public" / a["ref"].lstrip("/")).exists():
                errs.append(f"{f.name}: asset {a['ref']} not found under public/")
    rec("ASSET_REFS", errs, info=f"{total} asset refs found under public/")
else:
    for name in ("SOURCE_PROVENANCE", "CITATIONS", "ASSET_REFS"):
        rec(name, [], ["no sibling clone source tree: skipped (degrades gracefully)"])

# ---------------------------------------------------------------- COUNTS
errs = []
gen_n = len(list((REPO / "schema/examples/generated").glob("*.json")))
want = {
    "tokensInCatalog": len(cat), "foundationTokens": sum(len(json.loads(p.read_text())["tokens"]) for p in (REPO / "tokens/00-foundation").glob("*.json") if p.name != "motion-patterns.json"),
    "semanticTokens": len(J("tokens/10-semantic/semantic.json")["tokens"]), "componentTokens": len(J("tokens/20-component/component.json")["tokens"]),
    "motionPatterns": len(mp), "primitives": len(list((REPO / "primitives").glob("*.json"))), "components": len(list((REPO / "components").glob("*.json"))),
    "sections": len(contracts), "sectionsRetrievalIneligible": sum(1 for c in contracts.values() if not c["retrievalEligible"]),
    "templates": len(templates), "templatesImplemented": sum(1 for t in templates.values() if t["status"] == "implemented"), "templatesPending": sum(1 for t in templates.values() if t["status"] == "pending"),
    "routes": len(paths), "routesImplemented": sum(1 for r in routes_doc["routes"] if r["status"] == "implemented"), "routesPending": sum(1 for r in routes_doc["routes"] if r["status"] == "pending"),
    "redirects": len(routes_doc["redirects"]), "assetRoles": len(roles), "assetRolesGenerationSafe": sum(1 for d in roles.values() if d["availability"] == "generation-safe"),
    "graphRules": len(repo["graph"]["rules"]), "allowlistEntries": len(al["entries"]), "referenceExamples": len(list((REPO / "schema/examples/reference").glob("*.json"))),
    "generatedExamples": gen_n, "themes": len(list((REPO / "tokens/themes").glob("*.json"))), "measuredRoutes1440": len(J("extraction/measured-values.json")["sectionHeights"]["routes"]),
}
if manifest["counts"] != want:
    errs.append(f"manifest counts drifted: " + ", ".join(f"{k} {manifest['counts'].get(k)}!={v}" for k, v in want.items() if manifest["counts"].get(k) != v) + (f" (keys {sorted(set(manifest['counts']) ^ set(want))})" if set(manifest["counts"]) != set(want) else ""))
m = re.search(r"<!-- counts:start -->\s*```json\s*(\{.*?\})\s*```\s*<!-- counts:end -->", (REPO / "README.md").read_text(), re.S)
if not m or json.loads(m.group(1)) != manifest["counts"]:
    errs.append("README counts block != manifest counts")
if manifest.get("status") != "design-review-pending" or manifest.get("productionApproved") is not False:
    errs.append("manifest must stay design-review-pending / productionApproved false")
rec("COUNTS", errs, info=f"{len(want)} counts recomputed")

# ---------------------------------------------------------------- ENTRYPOINTS
errs = []
for k, v in manifest["entryPoints"].items():
    if v.startswith("..") or v.startswith("/") or ":" in v:
        errs.append(f"entryPoint {k} points outside the package: {v}")
    elif not (REPO / v).exists():
        errs.append(f"entryPoint {k} missing: {v}")
rec("ENTRYPOINTS", errs, info=f"{len(manifest['entryPoints'])} entry points")

# ---------------------------------------------------------------- WRAPPER_GATE
E, W, S = wg.run(REPO)
rec("WRAPPER_GATE", E, W, info=str(S))

# ---------------------------------------------------------------- HYGIENE
errs = []
WIN_HOME = re.escape("C:" + "\\" + "Users" + "\\")  # built from pieces so this line never matches itself
HOMES = "|".join("/" + d + r"/[A-Za-z0-9._-]+/" for d in ("Users", "home"))  # pieces, so a plain grep of this file stays clean
ABS = re.compile(HOMES + r"|/private/(tmp|var)/|" + WIN_HOME)
for p in REPO.rglob("*"):
    if p.is_file():
        if p.name in (".DS_Store", "Thumbs.db", "desktop.ini") or "__MACOSX" in p.parts or "__pycache__" in p.parts or p.suffix == ".pyc":
            errs.append(f"junk file {p.relative_to(REPO)}")
        elif p.suffix in (".json", ".md", ".py", ".mjs", ".txt") and ABS.search(p.read_text(errors="ignore")):
            errs.append(f"absolute machine path in {p.relative_to(REPO)}")
rec("HYGIENE", errs)

# ---------------------------------------------------------------- report
fails = 0
for name, status, e, w, info in RESULTS:
    fails += status == "FAIL"
    print(f"{status:4}  {name:18} {info}")
    if not QUIET or status == "FAIL":
        for x in e[:12]:
            print(f"        ERROR {x}")
        for x in w[:4]:
            print(f"        warn  {x}")
print(f"\nverify_all: {len(RESULTS) - fails} passed/warned, {fails} failed  (sibling clone source: {'present' if SIBLING else 'absent'})")
sys.exit(1 if fails else 0)
