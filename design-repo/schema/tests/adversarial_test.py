#!/usr/bin/env python3
"""Adversarial suite: every mutation must be rejected with its expected rule, every control must pass.

    python3 schema/tests/adversarial_test.py

Controls: every reference example (one per implemented route, so every implemented template is covered with
real content), the bundled example and both generation-safe examples.
Mutations are applied to deep copies; registry-level mutations (contract / allowlist / asset registry) are applied
to an in-memory copy of the loaded repo, never to files.
"""
import copy, importlib.util, json, sys

sys.dont_write_bytecode = True  # never leave __pycache__ inside the package
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("semantic_validate", REPO / "schema/semantic_validate.py")
sv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sv)
BASE = sv.load_repo()


def J(rel):
    return json.loads((REPO / rel).read_text())


REF_T1 = J("schema/examples/reference/product--develop.pagespec.json")
REF_T2 = J("schema/examples/reference/product--data-modernization.pagespec.json")
REF_T3 = J("schema/examples/reference/data-platforms--northwind.pagespec.json")
REF_HOME = J("schema/examples/reference/home.pagespec.json")
GEN_HOME = J("schema/examples/generated/home.generated.pagespec.json")
GEN_T1 = J("schema/examples/generated/product-feature.generated.pagespec.json")


def idx(s, section, nth=0):
    hits = [i for i, n in enumerate(s["nodes"]) if n["section"] == section]
    return hits[nth]


def node(s, section, nth=0):
    return s["nodes"][idx(s, section, nth)]


def M(base, fn):
    s = copy.deepcopy(base)
    fn(s)
    return s


def R(fn):
    r = copy.deepcopy(BASE)
    fn(r)
    return r


def setp(path, value):
    def f(s):
        cur = s
        for k in path[:-1]:
            cur = cur[k]
        cur[path[-1]] = value
    return f


CASES = []


def case(name, base, fn, expect, repo_fn=None):
    CASES.append((name, M(base, fn), expect, R(repo_fn) if repo_fn else BASE))


# ---------------------------------------------------------------- schema layer
case("unknown template id", REF_T1, setp(["template"], "T99"), "SCHEMA")
case("missing mode", REF_T1, lambda s: s.pop("mode"), "SCHEMA")
case("mode outside enum", REF_T1, setp(["mode"], "draft"), "SCHEMA")
case("invented section id", REF_T1, lambda s: s["nodes"].insert(5, {"section": "hero.video", "variant": "default", "content": {}, "motion": {"pattern": "static", "reducedMotionFallback": "none-needed"}}), "SCHEMA")
case("missing reducedMotionFallback", REF_T1, lambda s: node(s, "content.media-split")["motion"].pop("reducedMotionFallback"), "SCHEMA")
case("wrong reducedMotionFallback for pattern", REF_T1, lambda s: node(s, "content.media-split")["motion"].update(reducedMotionFallback="unchanged"), "SCHEMA")
case("invented motion field", REF_T1, lambda s: node(s, "content.media-split")["motion"].update(inventedAnimation="spin"), "SCHEMA")
case("invented content field", REF_T1, lambda s: node(s, "hero.split")["content"].update(subtitle="Extra line"), "SCHEMA")
case("invented asset role", REF_T1, lambda s: node(s, "hero.split")["content"]["media"].update(assetRole="hero.photo"), "SCHEMA")
case("theme outside enum", REF_T1, setp(["theme"], "dark"), "THEME_UNSUPPORTED")
case("list over observed max", REF_T1, lambda s: node(s, "features.tabs-dark")["content"]["tabs"].extend(copy.deepcopy(node(s, "features.tabs-dark")["content"]["tabs"][:2])), "SCHEMA")

# ---------------------------------------------------------------- structural / template linkage
case("template/node mismatch (T1 page declared as T3)", REF_T1, setp(["template"], "T3"), "TEMPLATE_SEQUENCE")
case("pending template", REF_T1, setp(["template"], "T8"), "TEMPLATE_PENDING")
case("required section removed", REF_T1, lambda s: s["nodes"].pop(idx(s, "editorial.resource-cards")), "TEMPLATE_SEQUENCE")
case("sections reordered", REF_T1, lambda s: s["nodes"].insert(idx(s, "features.tabs-dark"), s["nodes"].pop(idx(s, "editorial.resource-cards"))), "TEMPLATE_SEQUENCE")
case("second hero", REF_T1, lambda s: s["nodes"].insert(idx(s, "hero.split") + 1, copy.deepcopy(node(s, "hero.split"))), "ONE_HERO")
case("hero not first content node", REF_T1, lambda s: s["nodes"].insert(idx(s, "hero.split"), s["nodes"].pop(idx(s, "content.media-split"))), "HERO_FIRST_CONTENT")
case("adjacent identical section#variant", REF_T2, lambda s: s["nodes"].insert(idx(s, "features.tabs-light"), copy.deepcopy(node(s, "features.tabs-light"))), "NO_ADJACENT_IDENTICAL")
case("section over maxPerPage", REF_T2, lambda s: [s["nodes"].insert(idx(s, "editorial.resource-cards"), copy.deepcopy(node(s, "social-proof.stats-bento"))) for _ in range(1)], "SECTION_MAX_PER_PAGE")
case("footer moved before content", REF_T1, lambda s: s["nodes"].insert(5, s["nodes"].pop()), "SHELL_ORDER")
case("home template on a non-home route", REF_HOME, setp(["route"], "/product/develop"), "HOME_ROUTE_ONLY")
case("reference route not mapped to template", REF_T1, setp(["route"], "/product/ai"), "REFERENCE_ROUTE_IN_TEMPLATE")
case("variant not allowed at this template position", REF_T1, lambda s: node(s, "hero.split").update(variant="flush"), "TEMPLATE_SEQUENCE")

# ---------------------------------------------------------------- content contract
case("maxWords overflow on a real field", REF_T1, lambda s: node(s, "hero.split")["content"].update(title="one two three four five six seven eight nine"), "MAX_WORDS")
case("maxChars overflow on a real field", REF_T1, lambda s: node(s, "content.media-split")["content"].update(eyebrow="x" * 41), "SCHEMA")
case("variant forbidden field (flush hero with badge)", REF_T3, lambda s: node(s, "hero.split")["content"].update(badge="New"), "VARIANT_FORBIDDEN_FIELD")
case("variant required field missing", REF_T1, lambda s: node(s, "content.media-split")["content"].pop("primary"), "VARIANT_REQUIRED_FIELD")
case("unknown variant", REF_T1, lambda s: node(s, "features.tabs-dark").update(variant="carousel"), "SCHEMA")
case("variant list size (single quote band with 2 quotes)", J("schema/examples/reference/industry--healthcare.pagespec.json"),
     lambda s: node(s, "social-proof.quote-band")["content"]["quotes"].append(copy.deepcopy(node(s, "social-proof.quote-band")["content"]["quotes"][0])), "VARIANT_LIST_SIZE")

# ---------------------------------------------------------------- motion
case("motion pattern not allowed for section", REF_T1, lambda s: node(s, "hero.split").update(motion={"pattern": "marquee.loop", "reducedMotionFallback": "static-row"}), "MOTION_PATTERN_NOT_ALLOWED")
case("required motion pattern missing", REF_T1, lambda s: node(s, "hero.split").update(motion={"pattern": "static", "reducedMotionFallback": "none-needed"}), "MOTION_REQUIRED_PATTERN")

# ---------------------------------------------------------------- retrieval eligibility (node / contract / allowlist)
case("runtime UI marked retrievable at node level", REF_T1, lambda s: node(s, "shell.mega-menu").update(retrievalEligible=True), "RUNTIME_UI_INELIGIBLE")
case("content section marked ineligible at node level", REF_T1, lambda s: node(s, "features.card-grid").update(retrievalEligible=False), "RUNTIME_UI_INELIGIBLE")
case("contract flipped to eligible (registry)", REF_T1, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["shell.mobile-drawer"].update(retrievalEligible=True))
case("allowlist flipped to eligible (registry)", REF_T1, lambda s: None, "RETRIEVAL_PIN_MISMATCH",
     lambda r: [e.update(retrievalEligible=True) for e in r["allowlist"]["entries"] if e["id"] == "shell.announcement-bar"])
case("content contract marked ineligible (registry)", REF_T1, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["features.card-grid"].update(retrievalEligible=False))

# ---------------------------------------------------------------- asset registry pins
case("registry loosens customer.logo to generation-safe", GEN_T1, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["customer.logo"].update(availability="generation-safe"))
case("registry drops forbiddenInAllModes", REF_T1, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["thirdparty.real-mark"].pop("forbiddenInAllModes"))
case("asset role not allowed for field", REF_T1, lambda s: node(s, "hero.split")["content"]["media"].update(assetRole="customer.logo"), "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD")
case("real third-party mark in reference mode", REF_T1, lambda s: node(s, "hero.split")["content"]["media"].update(assetRole="thirdparty.real-mark"), "ASSET_FORBIDDEN_ALL_MODES")
case("real person photo in reference mode", REF_HOME, lambda s: node(s, "social-proof.testimonial-slider")["content"]["cards"][0]["logo"].update(assetRole="person.real-photo"), "ASSET_FORBIDDEN_ALL_MODES")

# ---------------------------------------------------------------- tokens / policy
case("unknown token", REF_T1, lambda s: node(s, "hero.split")["style"].update(strokeGradient="gradient.99"), "TOKEN_UNKNOWN")
case("raw hex colour", REF_T1, lambda s: node(s, "hero.split")["style"].update(strokeGradient="#ff8800"), "TOKEN_RAW_COLOR")
case("raw rgb colour", REF_T1, lambda s: node(s, "features.tabs-dark")["style"].update(strokeGradient="rgb(255,0,0)"), "TOKEN_RAW_COLOR")
case("arbitrary spacing value", REF_T1, lambda s: node(s, "features.card-grid")["style"].update(iconSize="44px"), "TOKEN_ARBITRARY_SPACING")
case("unsupported font", REF_T1, lambda s: node(s, "hero.split")["style"].update(strokeShape="font.family.polymath"), "TOKEN_UNSUPPORTED_FONT")
case("invalid token combination (wrong category)", REF_T1, lambda s: node(s, "hero.split")["style"].update(strokeShape="gradient.01"), "TOKEN_INVALID_COMBINATION")
case("invalid token combination (light-card gradient on a dark band stroke)", REF_T1, lambda s: node(s, "features.tabs-dark")["style"].update(strokeGradient="gradient.26"), "TOKEN_INVALID_COMBINATION")
case("enum style value outside contract", REF_T1, lambda s: node(s, "features.card-grid")["style"].update(headerAlign="right"), "SCHEMA")

# ---------------------------------------------------------------- generated mode leakage (control: generated examples)
case("clone brand in copy", GEN_T1, lambda s: node(s, "hero.split")["content"].update(title="Write models faster with Lattice."), "GENERATED_MODE_BRAND")
case("clone brand as page brand", GEN_T1, setp(["brand", "name"], "Lattice"), "GENERATED_MODE_BRAND")
case("clone fictional customer name", GEN_T1, lambda s: node(s, "social-proof.customer-tabs")["content"]["stories"][0].update(name="Kestrel"), "GENERATED_MODE_BRAND")
case("clone brand in alt text", GEN_HOME, lambda s: node(s, "features.gradient-panel")["content"]["media"].update(alt="Lattice editor view"), "GENERATED_MODE_BRAND")
case("logo/brand-mark reuse (clone wordmark role)", GEN_T1, lambda s: node(s, "shell.navbar")["content"]["brandMark"].update(assetRole="brand.wordmark"), "GENERATED_MODE_ASSET")
case("proprietary media reuse (clone product screenshot)", GEN_T1, lambda s: node(s, "hero.split")["content"].update(media={"assetRole": "product.screenshot", "alt": "Editor", "ref": "/assets/pages/hero/develop.svg"}), "GENERATED_MODE_ASSET")
case("clone asset file path with a safe role", GEN_T1, lambda s: node(s, "hero.split")["content"]["media"].update(ref="/assets/pages/hero/develop.svg"), "GENERATED_MODE_ASSET")
case("store mark text", GEN_HOME, lambda s: node(s, "cta.ide-card")["content"]["tiles"][0].update(label="App Store"), "GENERATED_MODE_STORE")
case("store URL", GEN_HOME, lambda s: node(s, "cta.community-band")["content"]["primary"].update(href="https://apps.apple.com/app/id1"), "GENERATED_MODE_STORE")
case("review/rating claim", GEN_HOME, lambda s: node(s, "cta.community-band")["content"]["stats"][0].update(label="Rated 4.8 out of 5"), "GENERATED_MODE_RATING")
case("award badge asset", GEN_HOME, lambda s: node(s, "features.gradient-panel")["content"]["media"].update(assetRole="award.badge"), "GENERATED_MODE_RATING")
case("person identity from the source", GEN_T1, lambda s: node(s, "social-proof.customer-tabs")["content"]["stories"][0].update(person=sorted(BASE["brand"]["clonePersons"]["names"])[0]), "GENERATED_MODE_PERSON")
case("source URL (clone brand route)", GEN_T1, lambda s: node(s, "cta.gradient-card")["content"]["primary"].update(href="/product/what-is-lattice"), "GENERATED_MODE_URL")
case("non-reserved absolute URL", GEN_T1, lambda s: node(s, "cta.gradient-card")["content"]["primary"].update(href="https://wrenly.io/demo"), "GENERATED_MODE_URL")
case("source copy reuse (clone sentence)", GEN_T1, lambda s: node(s, "hero.split")["content"].update(lead=REF_T1["nodes"][4]["content"]["lead"]), "GENERATED_MODE_COPY")
case("source copy reuse (6-word fragment)", GEN_HOME, lambda s: node(s, "content.statement")["content"].update(title="We promise that " + " ".join(REF_HOME["nodes"][7]["content"]["title"].split()[2:8]) + " soon."), "GENERATED_MODE_COPY")
case("source-specific CTA", GEN_T1, lambda s: node(s, "cta.closing-band")["content"]["secondary"].update(label="Explore Lattice"), "GENERATED_MODE_CTA")

# ---------------------------------------------------------------- original-site identity (any mode)
case("original site brand (reference mode)", REF_T1, lambda s: node(s, "hero.split")["content"].update(title="Build with dbt Labs."), "SOURCE_REAL_IDENTITY")
case("real third-party platform name (reference mode)", REF_T3, lambda s: node(s, "hero.split")["content"].update(lead="Northwind, now on Snowflake."), "SOURCE_REAL_IDENTITY")
case("original domain (generated mode)", GEN_HOME, lambda s: node(s, "editorial.news-band")["content"]["action"].update(href="https://www.getdbt.com/blog"), "SOURCE_REAL_IDENTITY")

CONTROLS = [(p.relative_to(REPO), json.loads(p.read_text())) for p in sorted((REPO / "schema/examples").rglob("*.json"))] + [("schema/example.pagespec.json", J("schema/example.pagespec.json"))]


def main():
    fails = 0
    print("CONTROLS (must pass with 0 errors)")
    for name, s in CONTROLS:
        E, W = sv.validate(s, BASE)
        ok = not E
        fails += not ok
        print(f"  {'pass' if ok else 'FAIL'}  {name}" + ("" if ok else f"  {E[:3]}"))
    gen_controls = [s for _, s in CONTROLS if s.get("mode") == "generated"]
    print(f"\nMUTATIONS (must be rejected with the expected rule): {len(CASES)}")
    for name, s, expect, repo in CASES:
        E, W = sv.validate(s, repo)
        rules = {r for r, _ in E}
        ok = expect in rules
        fails += not ok
        print(f"  {'rejected' if ok else 'MISSED  '}  [{expect}] {name}" + ("" if ok else f"  got {sorted(rules) or 'no errors'}"))
    print(f"\nadversarial: {len(CONTROLS)} controls, {len(CASES)} mutations, {len(gen_controls)} generated controls, {fails} failures")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
