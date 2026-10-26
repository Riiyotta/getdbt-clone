#!/usr/bin/env python3
"""Semantic validator for Lattice-clone PageSpecs: everything JSON Schema cannot express.

    python3 schema/semantic_validate.py <pagespec.json> [...] [--json]

Layers (in order):
  1. Draft-07 schema (schema/pagespec.schema.json) when the `jsonschema` package is importable
     (otherwise reported as a warning; the semantic layer below still runs).
  2. Registry pins: asset-role availability, forbidden-in-all-modes roles and retrieval eligibility are
     pinned in THIS file; a registry/contract/allowlist edit that loosens them is an error.
  3. Template linkage: the declared template's real node list is matched against the node sequence
     (section#variant; slots may offer alternative sections or fixed sequences), plus every rule in
     compatibility/graph.json (GRAPH_RULES_IMPLEMENTED): chrome variant (full | event | none), theme, hero
     exceptions, consecutive variants, dialog pairing.
  4. Contract rules: variants, required/forbidden fields, list sizes, maxWords, motion, style tokens.
  5. Mode rules: generated mode may contain nothing that identifies or reproduces the source
     (GENERATED_MODE_* rules); original-site identity is rejected in every mode.

Stdlib only (jsonschema optional). Repo root is derived from this file's location.
"""
import copy, hashlib, json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------------ pins (independent of the registries)
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
# chrome variants (src/Layout.jsx CHROME): the shell nodes a page opens and closes with
CHROME_HEADS = {"full": ["shell.announcement-bar", "shell.navbar", "shell.mega-menu", "shell.mobile-drawer"], "event": ["shell.event-subnav"], "none": ["shell.minimal-nav"]}
CHROME_TAILS = {"full": ["shell.footer"], "event": ["shell.event-footer"], "none": []}
CHROME_BY_ROUTE = {"/summit": "event", "/partner-directory": "none"}  # every other route is 'full'; verify_all compares this with src/Layout.jsx
THEME_BY_CHROME = {"full": "light", "event": "event", "none": "light"}
OVERLAY_DIALOG = "cta.dev-path-dialog"
HEROLESS_TEMPLATES = {"T5", "T6", "T7", "T8", "T9", "T10", "T11", "T14", "T17"}  # open with a LISTING/ARTICLE/FORM/LEGAL/PRICING/DIRECTORY header, not a HERO section
AUTOPLAY_PATTERNS = {"carousel.autoplay", "marquee.loop", "marquee.photo-loop"}
GRAPH_RULES_IMPLEMENTED = {
    "TEMPLATE_SEQUENCE", "TEMPLATE_PENDING", "SHELL_ORDER", "CHROME_VARIANT", "TEMPLATE_THEME", "ONE_HERO", "HERO_FIRST_CONTENT", "SECTION_MAX_PER_PAGE",
    "NO_ADJACENT_IDENTICAL", "CTA_CLOSES_PAGE", "AUTOPLAY_BUDGET", "RUNTIME_UI_INELIGIBLE", "DIALOG_PAIRING", "HOME_ROUTE_ONLY", "REFERENCE_ROUTE_IN_TEMPLATE",
}
GENERATED_MODE_RULES = ["GENERATED_MODE_BRAND", "GENERATED_MODE_CTA", "GENERATED_MODE_COPY", "GENERATED_MODE_URL", "GENERATED_MODE_ASSET",
                        "GENERATED_MODE_PERSON", "GENERATED_MODE_RATING", "GENERATED_MODE_STORE"]
NONCOPY_KEYS = {"href", "ref", "assetRole", "kind"}
GENERATED_REF = re.compile(r"^(generate:|user-supplied:|https://[a-z0-9.-]+\.(example|invalid)(/|$))")


def _load(rel):
    return json.loads((REPO / rel).read_text())


def load_repo():
    """Everything the validator reads, as one dict (tests deep-copy and mutate it)."""
    contracts = {p.stem: json.loads(p.read_text()) for p in sorted((REPO / "sections").glob("*.json"))}
    return {
        "schema": _load("schema/pagespec.schema.json"),
        "contracts": contracts,
        "templates": _load("templates/templates.json")["templates"],
        "routes": _load("routes/routes.json"),
        "graph": _load("compatibility/graph.json"),
        "roles": _load("assets/asset-roles.json"),
        "brand": _load("schema/source-brand.json"),
        "fingerprints": _load("schema/source-copy-fingerprints.json"),
        "catalog": _load("tokens/llm/token-catalog.json")["tokens"],
        "policy": _load("tokens/llm/token-policy.json"),
        "allowlist": _load("tokens/llm/component-allowlist.json"),
        "motion": _load("tokens/00-foundation/motion-patterns.json")["patterns"],
    }


# ------------------------------------------------------------------ helpers
def leaves(v, path=""):
    """(path, key, value) for every scalar; list items get '[]' in the path."""
    if isinstance(v, dict):
        for k, x in v.items():
            yield from leaves(x, f"{path}.{k}" if path else k)
    elif isinstance(v, list):
        for x in v:
            yield from leaves(x, path + "[]")
    else:
        yield path, path.split(".")[-1].replace("[]", ""), v


def assets_in(v, path=""):
    if isinstance(v, dict):
        if "assetRole" in v:
            yield path, v
            return
        for k, x in v.items():
            yield from assets_in(x, f"{path}.{k}" if path else k)
    elif isinstance(v, list):
        for x in v:
            yield from assets_in(x, path + "[]")


def actions_in(v):
    if isinstance(v, dict):
        if "label" in v and "href" in v:
            yield v
        for x in v.values():
            yield from actions_in(x)
    elif isinstance(v, list):
        for x in v:
            yield from actions_in(x)


def nwords(s):
    return len(re.findall(r"\S+", s))


def norm_words(s):
    return re.findall(r"[a-z0-9']+", s.lower())


def h16(s):
    return hashlib.sha1(s.encode()).hexdigest()[:16]


def node_pattern(n):
    def alt(section, variants):
        v = "|".join(re.escape(x) for x in variants) if variants else r"[a-z0-9-]+"
        return rf"{re.escape(section)}#(?:{v});"

    def alt_o(o):
        if "sequence" in o:
            return "".join(alt(x["section"], x.get("variants")) for x in o["sequence"])
        return alt(o["section"], o.get("variants"))
    if "slot" in n:
        body = "(?:" + "|".join(alt_o(o) for o in n["anyOf"]) + ")"
    else:
        body = "(?:" + alt(n["section"], n.get("variants")) + ")"
    if n.get("repeatable"):
        return body + "{%d,%d}" % (n.get("minCount") or (1 if n["required"] else 0), n.get("maxCount") or 99)
    return body if n["required"] else body + "?"


# ------------------------------------------------------------------ registry pin checks
def registry_pin_errors(repo):
    errs = []
    roles = repo["roles"]["roles"]
    for rid, av in PINNED_AVAILABILITY.items():
        if rid not in roles:
            errs.append(("REGISTRY_PIN_MISMATCH", f"pinned asset role {rid} missing from assets/asset-roles.json"))
        elif roles[rid].get("availability") != av:
            errs.append(("REGISTRY_PIN_MISMATCH", f"asset role {rid}: registry availability {roles[rid].get('availability')!r} != pinned {av!r}"))
    for rid in roles:
        if rid not in PINNED_AVAILABILITY:
            errs.append(("REGISTRY_PIN_MISMATCH", f"asset role {rid} is not pinned in code"))
    forb = {r for r, d in roles.items() if d.get("forbiddenInAllModes")}
    if forb != PINNED_FORBIDDEN_ALL_MODES or set(repo["roles"].get("forbiddenInAllModes", [])) != PINNED_FORBIDDEN_ALL_MODES:
        errs.append(("REGISTRY_PIN_MISMATCH", f"forbiddenInAllModes drift: registry {sorted(forb)} vs pinned {sorted(PINNED_FORBIDDEN_ALL_MODES)}"))
    for sid, c in repo["contracts"].items():
        pinned_ok = sid not in RETRIEVAL_INELIGIBLE
        if c.get("retrievalEligible") is not pinned_ok:
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"contract {sid}: retrievalEligible {c.get('retrievalEligible')} != pinned {pinned_ok}"))
        if RUNTIME_UI_HINT.search(sid + " " + c.get("title", "")) and sid not in RETRIEVAL_INELIGIBLE:
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"contract {sid} looks like runtime/utility UI but is not in RETRIEVAL_INELIGIBLE"))
    for e in repo["allowlist"]["entries"]:
        if e["kind"] == "section" and e.get("retrievalEligible") is not (e["id"] not in RETRIEVAL_INELIGIBLE):
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"allowlist {e['id']}: retrievalEligible {e.get('retrievalEligible')} contradicts the pin"))
    return errs


# ------------------------------------------------------------------ main entry
def validate(spec, repo=None, use_schema=True):
    """returns (errors, warnings): lists of (RULE_ID, message)."""
    repo = repo or load_repo()
    E, W = [], []
    err = lambda r, m: E.append((r, m))
    warn = lambda r, m: W.append((r, m))

    # 1. schema
    if use_schema:
        try:
            from jsonschema import Draft7Validator
            for e in sorted(Draft7Validator(repo["schema"]).iter_errors(spec), key=lambda e: list(e.path)):
                err("SCHEMA", f"{'/'.join(str(p) for p in e.path) or '<root>'}: {e.message[:200]}")
        except ImportError:
            warn("SCHEMA_SKIPPED", "jsonschema not installed; Draft-07 layer skipped (pip install jsonschema)")
    if not isinstance(spec, dict) or not isinstance(spec.get("nodes"), list):
        err("SCHEMA", "spec must be an object with a nodes array")
        return E, W

    # 2. pins
    E.extend(registry_pin_errors(repo))

    contracts, templates = repo["contracts"], repo["templates"]
    mode = spec.get("mode")
    if mode not in ("reference", "generated"):
        err("MODE", f"mode must be 'reference' or 'generated', got {mode!r}")
    if spec.get("theme") not in repo["policy"]["themes"]:
        err("THEME_UNSUPPORTED", f"theme {spec.get('theme')!r} not in token-policy themes {repo['policy']['themes']}")
    nodes = [n for n in spec["nodes"] if isinstance(n, dict)]
    for i, n in enumerate(nodes):
        if n.get("section") not in contracts:
            err("UNKNOWN_SECTION", f"node {i}: section {n.get('section')!r} has no contract")
    nodes = [n for n in nodes if n.get("section") in contracts]
    cat = lambda n: contracts[n["section"]]["semantic"]["category"]

    # 3. template linkage + graph rules
    tid = spec.get("template")
    t = templates.get(tid)
    route = spec.get("route")
    if t is None:
        err("TEMPLATE_SEQUENCE", f"unknown template {tid!r}")
    elif t["status"] == "pending":
        err("TEMPLATE_PENDING", f"template {tid} ({t['name']}) is pending: no section contracts exist for it yet")
    else:
        seq = "".join(f"{n['section']}#{n.get('variant')};" for n in nodes)
        pat = "".join(node_pattern(x) for x in t["nodes"])
        if not re.fullmatch(pat, seq):
            err("TEMPLATE_SEQUENCE", f"node sequence does not match template {tid}. got: {[n['section'] + '#' + str(n.get('variant')) for n in nodes]}")
        chrome = t.get("chrome", "full")
        heads, tails = CHROME_HEADS.get(chrome), CHROME_TAILS.get(chrome)
        if heads is None:
            err("CHROME_VARIANT", f"template {tid} declares unknown chrome {chrome!r}")
        else:
            ids = [n["section"] for n in nodes]
            body_end = len(ids) - len(tails)
            if ids[:len(heads)] != heads or (tails and ids[body_end:] != tails):
                err("SHELL_ORDER", f"chrome '{chrome}' must open with {heads} and close with {tails or 'no footer'}; got head {ids[:len(heads)]} tail {ids[body_end:] if tails else ids[-1:]}")
            shell_used = {x for x in ids if contracts[x]["semantic"]["category"] == "SHELL"}
            if shell_used != set(heads) | set(tails):
                err("CHROME_VARIANT", f"page uses shell nodes {sorted(shell_used)} but chrome '{chrome}' allows {sorted(set(heads) | set(tails))}")
        if mode == "reference" and route not in t["routes"]:
            err("REFERENCE_ROUTE_IN_TEMPLATE", f"route {route!r} is not mapped to template {tid} in routes/routes.json")
        if mode == "reference" and CHROME_BY_ROUTE.get(route, "full") != chrome:
            err("CHROME_VARIANT", f"route {route!r} renders chrome '{CHROME_BY_ROUTE.get(route, 'full')}' (src/Layout.jsx) but template {tid} declares '{chrome}'")
        if spec.get("theme") != t.get("theme", "light"):
            err("TEMPLATE_THEME", f"theme {spec.get('theme')!r} but template {tid} requires {t.get('theme', 'light')!r}")
    if (tid == "T0") != (route == "/"):
        err("HOME_ROUTE_ONLY", f"template T0 is only valid on '/', and '/' only on T0 (got {tid} on {route})")
    heroes = [i for i, n in enumerate(nodes) if cat(n) == "HERO"]
    if len(heroes) > 1 or (len(heroes) == 0 and tid not in HEROLESS_TEMPLATES):
        err("ONE_HERO", f"expected exactly one HERO node (none on {sorted(HEROLESS_TEMPLATES)}), found {len(heroes)} on {tid}")
    elif heroes and tid in HEROLESS_TEMPLATES:
        err("ONE_HERO", f"{tid} is a hero-less template (page-specific header) but has a HERO node")
    content_nodes = [n for n in nodes if cat(n) != "SHELL"]
    if heroes and content_nodes and cat(content_nodes[0]) != "HERO":
        err("HERO_FIRST_CONTENT", f"first non-shell node is {content_nodes[0]['section']}, not the hero")
    counts = {}
    for n in nodes:
        counts[n["section"]] = counts.get(n["section"], 0) + 1
    for sid, k in counts.items():
        mx = contracts[sid]["constraints"]["maxPerPage"]
        if k > mx:
            err("SECTION_MAX_PER_PAGE", f"{sid} appears {k} times (maxPerPage {mx})")
    for a, b in zip(nodes, nodes[1:]):
        if (a["section"], a.get("variant")) == (b["section"], b.get("variant")) and a.get("variant") not in contracts[a["section"]]["constraints"].get("consecutiveVariants", []):
            err("NO_ADJACENT_IDENTICAL", f"adjacent identical nodes {a['section']}#{a.get('variant')} (not a consecutive-allowed variant)")
    if content_nodes and cat(content_nodes[-1]) != "CTA":
        warn("CTA_CLOSES_PAGE", f"last content node {content_nodes[-1]['section']} is not CTA-category")
    auto = [n["section"] for n in nodes if ({n.get("motion", {}).get("pattern")} | {x.get("pattern") for x in n.get("motion", {}).get("additional", [])}) & AUTOPLAY_PATTERNS]
    if len(auto) > 2:
        warn("AUTOPLAY_BUDGET", f"{len(auto)} autoplaying sections: {auto}")
    opens = any(a.get("opensDialog") for n in nodes for a in actions_in(n.get("content") or {}))
    has_dialog = any(n["section"] == OVERLAY_DIALOG for n in nodes)
    if opens != has_dialog:
        err("DIALOG_PAIRING", f"{'an action opens the dialog but the page has no ' + OVERLAY_DIALOG + ' node' if opens else OVERLAY_DIALOG + ' is present but no action has opensDialog'}")
    if has_dialog:
        ids = [n["section"] for n in nodes]
        j = ids.index(OVERLAY_DIALOG)
        trailing = [x for x in ids[j + 1:] if contracts[x]["semantic"]["category"] != "SHELL"]
        if trailing:
            err("DIALOG_PAIRING", f"{OVERLAY_DIALOG} must be the last non-shell node; {trailing} follow it")

    # 4. per-node contract rules
    roles = repo["roles"]["roles"]
    catalog, policy = repo["catalog"], repo["policy"]
    for i, n in enumerate(nodes):
        sid, c = n["section"], contracts[n["section"]]
        where = f"node {i} ({sid})"
        content = n.get("content") or {}
        # retrieval
        if "retrievalEligible" in n:
            pinned = sid not in RETRIEVAL_INELIGIBLE
            if n["retrievalEligible"] is not pinned:
                err("RUNTIME_UI_INELIGIBLE", f"{where}: retrievalEligible {n['retrievalEligible']} contradicts the pinned value {pinned}")
        # variants
        v = n.get("variant")
        vd = c["variants"].get(v)
        if vd is None:
            err("VARIANT_UNKNOWN", f"{where}: variant {v!r} not in {sorted(c['variants'])}")
        else:
            for f in vd["requiredFields"]:
                if f not in content:
                    err("VARIANT_REQUIRED_FIELD", f"{where}: variant {v} requires content.{f}")
            for f in vd["forbiddenFields"]:
                if f in content:
                    err("VARIANT_FORBIDDEN_FIELD", f"{where}: variant {v} does not render content.{f}")
            for f, (lo, hi) in vd.get("listSizes", {}).items():
                if f in content and isinstance(content[f], list) and not lo <= len(content[f]) <= hi:
                    err("VARIANT_LIST_SIZE", f"{where}: variant {v} takes {lo}-{hi} items in content.{f}, got {len(content[f])}")
        # budgets
        fields = c["content"]["fields"]
        for path, key, val in leaves(content):
            if key in NONCOPY_KEYS or not isinstance(val, str):
                continue
            fd = fields.get(path)
            if fd is None:
                err("CONTENT_FIELD_UNKNOWN", f"{where}: content.{path} is not a contract field")
                continue
            if fd["type"] == "text":
                if nwords(val) > fd["maxWords"]:
                    err("MAX_WORDS", f"{where}: content.{path} has {nwords(val)} words (maxWords {fd['maxWords']})")
                if len(val) > fd["maxChars"]:
                    err("MAX_CHARS", f"{where}: content.{path} has {len(val)} chars (maxChars {fd['maxChars']})")
        # motion
        m = n.get("motion") or {}
        pats = [m.get("pattern")] + [x.get("pattern") for x in m.get("additional", [])]
        for p in pats:
            if p not in c["motion"]["allowedPatterns"]:
                err("MOTION_PATTERN_NOT_ALLOWED", f"{where}: motion {p!r} not allowed (allowed {c['motion']['allowedPatterns']})")
        for p in c["motion"]["requiredPatterns"]:
            if p not in pats:
                err("MOTION_REQUIRED_PATTERN", f"{where}: motion must include {p}")
        for entry in [m] + list(m.get("additional", [])):
            p = entry.get("pattern")
            if p in repo["motion"] and entry.get("reducedMotionFallback") != repo["motion"][p]["reducedMotionFallback"]:
                err("MOTION_FALLBACK", f"{where}: {p} requires reducedMotionFallback {repo['motion'][p]['reducedMotionFallback']!r}")
        # style tokens
        for prop, val in (n.get("style") or {}).items():
            sp = c["style"]["props"].get(prop)
            pol = policy["styleProps"].get(prop)
            sval = str(val)
            if sp is None or pol is None:
                err("STYLE_PROP_UNKNOWN", f"{where}: style.{prop} is not a settable style prop for {sid}")
                continue
            if sp["kind"] == "enum":
                if sval not in sp["allowed"]:
                    err("TOKEN_INVALID_COMBINATION", f"{where}: style.{prop}={sval!r} not in {sp['allowed']}")
                continue
            if re.search(r"#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklab|oklch)\(", sval):
                err("TOKEN_RAW_COLOR", f"{where}: style.{prop}={sval!r} is a raw colour; use a catalog token")
            elif re.search(r"^-?[0-9.]+(px|rem|em|%|vw|vh)$", sval.strip()):
                err("TOKEN_ARBITRARY_SPACING", f"{where}: style.{prop}={sval!r} is a raw length; use a catalog token")
            elif any(f.lower() in sval.lower() for f in policy["unsupportedFonts"]) or (sval.startswith("font.") and sval not in catalog) or "'" in sval or '"' in sval:
                err("TOKEN_UNSUPPORTED_FONT", f"{where}: style.{prop}={sval!r} names an unsupported font or font token")
            elif sval not in catalog:
                err("TOKEN_UNKNOWN", f"{where}: style.{prop}={sval!r} is not in tokens/llm/token-catalog.json")
            elif catalog[sval]["category"] not in pol["categories"] or sval not in pol["allowedBySection"].get(sid, []):
                err("TOKEN_INVALID_COMBINATION", f"{where}: style.{prop}={sval!r} (category {catalog[sval]['category']}) not allowed for {sid}; allowed {pol['allowedBySection'].get(sid)}")
        # assets
        afields = c["assets"]["fields"]
        for path, a in assets_in(content):
            role = a.get("assetRole")
            if role not in roles:
                err("ASSET_ROLE_UNKNOWN", f"{where}: content.{path} role {role!r} not in assets/asset-roles.json")
                continue
            if role in PINNED_FORBIDDEN_ALL_MODES:
                err("ASSET_FORBIDDEN_ALL_MODES", f"{where}: content.{path} uses {role}, forbidden in every mode")
            fd = afields.get(path)
            if fd is None:
                err("ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", f"{where}: content.{path} is not an asset field")
            elif role not in set(fd["referenceRoles"]) | set(fd["generatedRoles"]):
                err("ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", f"{where}: content.{path} role {role} not in {sorted(set(fd['referenceRoles']) | set(fd['generatedRoles']))}")
            if mode == "generated":
                if PINNED_AVAILABILITY.get(role) != "generation-safe":
                    rule = "GENERATED_MODE_RATING" if role == "award.badge" else "GENERATED_MODE_ASSET"
                    err(rule, f"{where}: content.{path} uses {role} ({PINNED_AVAILABILITY.get(role)}); use one of {roles[role].get('generationSafeSubstitutes')}")
                if not GENERATED_REF.match(str(a.get("ref", ""))):
                    err("GENERATED_MODE_ASSET", f"{where}: content.{path}.ref {a.get('ref')!r} reuses a source file; use generate:/user-supplied:/https://*.example")

    # 5. identity / leakage
    b = repo["brand"]
    orig = re.compile(r"(?<![a-z0-9])(" + "|".join(re.escape(x) for x in b["originalSite"]["names"]) + r")(?![a-z0-9])", re.I)
    orig_dom = re.compile("|".join(b["originalSite"]["domains"]), re.I)
    store = re.compile("|".join(b["storeAndMarketplace"]["domains"] + b["storeAndMarketplace"]["words"]), re.I)
    clone_brand = re.compile("|".join(b["cloneBrand"]["patterns"]), re.I)
    ent = re.compile(r"(?<![A-Za-z0-9])(" + "|".join(re.escape(x) for x in b["cloneFictionalEntities"]["names"]) + r")(?![A-Za-z0-9])")
    ent_slug = re.compile(r"(?<![a-z0-9])(" + "|".join(re.escape(x.lower().replace(" ", "-")) for x in b["cloneFictionalEntities"]["names"]) + r")(?![a-z0-9])")
    persons = {p.lower() for p in b["clonePersons"]["names"]}
    rating = re.compile("|".join(b["rating"]["patterns"]), re.I)
    fp = repo["fingerprints"]
    shingles, fulls, k = set(fp["shingles"]), set(fp["fullStrings"]), fp["shingleSize"]

    strings = [("brand.name", "name", spec.get("brand", {}).get("name", "")), ("meta.title", "title", spec.get("meta", {}).get("title", ""))]
    for i, n in enumerate(nodes):
        for path, key, val in leaves(n.get("content") or {}):
            if isinstance(val, str):
                strings.append((f"node {i} ({n['section']}).{path}", key, val))
    for where, key, val in strings:
        if key in ("assetRole", "kind"):
            continue
        if orig.search(val) or orig_dom.search(val):
            err("SOURCE_REAL_IDENTITY", f"{where}: {val!r} names the original live site or a real third party (forbidden in every mode)")
        if store.search(val):
            err("GENERATED_MODE_STORE" if mode == "generated" else "STORE_MARK", f"{where}: {val!r} is a store/marketplace mark or link")
        if mode != "generated":
            continue
        if key in ("href", "ref"):
            if val.startswith("https://") and not re.match(r"^https://[a-z0-9.-]+\.(example|invalid)(/|$)", val):
                err("GENERATED_MODE_URL", f"{where}: absolute URL {val!r} must use a reserved .example/.invalid domain")
            if val.startswith("mailto:") and not re.search(r"@[a-z0-9.-]+\.(example|invalid)$", val):
                err("GENERATED_MODE_URL", f"{where}: mail link {val!r} must use a reserved .example/.invalid domain")
            if clone_brand.search(val) or ent_slug.search(val.lower()):
                err("GENERATED_MODE_URL", f"{where}: link {val!r} carries a source route/brand slug")
            continue
        if clone_brand.search(val) or ent.search(val):
            err("GENERATED_MODE_BRAND", f"{where}: {val!r} names the source brand or one of its fictional entities")
        low = val.lower()
        if key == "person" and low in persons or any(p in low for p in persons):
            err("GENERATED_MODE_PERSON", f"{where}: {val!r} reuses a person identity from the source")
        if rating.search(val):
            err("GENERATED_MODE_RATING", f"{where}: {val!r} looks like a review score/award claim; use rating.placeholder")
        w = norm_words(val)
        hit = len(w) >= fp["fullStringMinWords"] and h16(" ".join(w)) in fulls
        hit = hit or any(h16(" ".join(w[j:j + k])) in shingles for j in range(len(w) - k + 1))
        if hit:
            err("GENERATED_MODE_COPY", f"{where}: copy reproduces source copy ({val[:60]!r}...)")
    if mode == "generated":
        verbs = b["cta"]["verbs"]
        for n in nodes:
            for a in actions_in(n.get("content") or {}):
                lab = str(a["label"]).strip()
                first = (lab.split() or [""])[0].lower()
                if first in verbs and (clone_brand.search(lab) or ent.search(lab) or orig.search(lab)):
                    err("GENERATED_MODE_CTA", f"{n['section']}: action {lab!r} is a source-specific CTA")
    return E, W


def main(argv):
    as_json = "--json" in argv
    files = [a for a in argv if not a.startswith("--")]
    if not files:
        print(__doc__)
        return 2
    repo = load_repo()
    bad = 0
    report = {}
    for f in files:
        spec = json.loads(Path(f).read_text())
        E, W = validate(spec, repo)
        report[f] = {"errors": E, "warnings": W}
        bad += bool(E)
        if not as_json:
            print(f"{'FAIL' if E else 'ok  '}  {f}  errors={len(E)} warnings={len(W)}")
            for r, m in E:
                print(f"   ERROR {r}: {m}")
            for r, m in W:
                print(f"   warn  {r}: {m}")
    if as_json:
        print(json.dumps(report, indent=1))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
