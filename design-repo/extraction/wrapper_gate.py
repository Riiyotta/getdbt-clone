#!/usr/bin/env python3
"""Whole-page-wrapper quality gate (R9). Called by extraction/verify_all.py; also runnable alone.

Reads measured 1440px heights from extraction/measured-values.json -> sectionHeights.
  - HERO taller than HERO_WARN_PX warns; taller than HERO_FAIL_PX fails unless whitelisted.
  - one in-flow non-SHELL section holding > SHARE_WARN of its page warns; > SHARE_FAIL fails unless whitelisted
    (pages with fewer than MIN_SECTIONS in-flow content sections are skipped; fixed/sticky elements take no page height).
  - every implemented route must be measured, at REQUIRED_VIEWPORT, with a node list matching its reference PageSpec.
  - whitelist entries need reviewedBy, a justification of >= 30 chars and maxHeightPx above the measured height;
    stale entries fail; a whitelisted hit still warns; an agent reviewer must say it is an agent attestation.
Thresholds are pinned here, not read from JSON.
"""
import json, sys
from pathlib import Path

HERO_WARN_PX = 1800
HERO_FAIL_PX = 3000
SHARE_WARN = 0.50
SHARE_FAIL = 0.60
REQUIRED_VIEWPORT = 1440
MIN_SECTIONS = 3
AGENT_PHRASE = "agent attestation, not a human sign-off"

REPO = Path(__file__).resolve().parent.parent


def run(repo=REPO, mv=None):
    """returns (errors, warnings, stats)"""
    repo = Path(repo)
    E, W = [], []
    mv = mv if mv is not None else json.loads((repo / "extraction/measured-values.json").read_text())
    routes = json.loads((repo / "routes/routes.json").read_text())["routes"]
    contracts = {p.stem: json.loads(p.read_text()) for p in (repo / "sections").glob("*.json")}
    sh = mv.get("sectionHeights") or {}
    if sh.get("viewport") != REQUIRED_VIEWPORT:
        E.append(f"WRAPPER_VIEWPORT: sectionHeights measured at {sh.get('viewport')!r}, required {REQUIRED_VIEWPORT}")
    measured = sh.get("routes") or {}
    wl = mv.get("wrapperGateWhitelist", [])
    wl_used = set()
    for i, w in enumerate(wl):
        for k in ("route", "section", "reviewedBy", "justification", "maxHeightPx"):
            if k not in w:
                E.append(f"WRAPPER_WHITELIST: entry {i} missing {k}")
        if len(str(w.get("justification", ""))) < 30:
            E.append(f"WRAPPER_WHITELIST: entry {i} justification shorter than 30 chars")
        if "agent" in str(w.get("reviewedBy", "")).lower() and AGENT_PHRASE not in str(w.get("reviewedBy", "")):
            E.append(f"WRAPPER_WHITELIST: entry {i} reviewedBy is an agent but does not say '{AGENT_PHRASE}'")
    def whitelisted(route, sid, h):
        for i, w in enumerate(wl):
            if w.get("route") == route and w.get("section") == sid:
                wl_used.add(i)
                if not isinstance(w.get("maxHeightPx"), (int, float)) or w["maxHeightPx"] <= h:
                    E.append(f"WRAPPER_WHITELIST: {route} {sid} measured {h}px exceeds whitelisted maxHeightPx {w.get('maxHeightPx')}")
                    return False
                return True
        return False
    stats = {"pages": 0, "maxHeroPx": 0, "maxSharePct": 0.0}
    for r in routes:
        if r["status"] != "implemented":
            continue
        route = r["path"]
        m = measured.get(route)
        if m is None:
            E.append(f"WRAPPER_MISSING_MEASUREMENT: implemented route {route} has no 1440 measurement")
            continue
        ref = repo / "schema/examples/reference" / (("home" if route == "/" else route.strip("/").replace("/", "--")) + ".pagespec.json")
        if ref.exists():
            spec_nodes = [n["section"] for n in json.loads(ref.read_text())["nodes"] if contracts.get(n["section"], {}).get("placement") == "main"]
            if spec_nodes != [n["section"] for n in m["nodes"]]:
                E.append(f"WRAPPER_STRUCTURE_MISMATCH: {route} measured nodes {[n['section'] for n in m['nodes']]} != reference PageSpec {spec_nodes}")
        stats["pages"] += 1
        chrome = m.get("shell", {})
        flow_chrome = sum(c["heightPx"] for c in chrome.values() if c.get("position") not in ("fixed", "sticky"))
        inflow = [n for n in m["nodes"] if n.get("position") not in ("fixed", "sticky")]
        page_h = flow_chrome + sum(n["heightPx"] for n in inflow)
        for n in inflow:
            sid, h = n["section"], n["heightPx"]
            c = contracts.get(sid)
            if c is None:
                E.append(f"WRAPPER_UNKNOWN_SECTION: {route} measured {sid} has no contract")
                continue
            if c["semantic"]["category"] == "HERO":
                stats["maxHeroPx"] = max(stats["maxHeroPx"], h)
                if h > HERO_FAIL_PX:
                    if whitelisted(route, sid, h):
                        W.append(f"WRAPPER_HERO: {route} {sid} {h}px > {HERO_FAIL_PX} (whitelisted)")
                    else:
                        E.append(f"WRAPPER_HERO: {route} {sid} is {h}px (> {HERO_FAIL_PX}px): a HERO is the page-opening composition only")
                elif h > HERO_WARN_PX:
                    W.append(f"WRAPPER_HERO: {route} {sid} is {h}px (> {HERO_WARN_PX}px)")
            if len(inflow) >= MIN_SECTIONS and page_h:
                share = h / page_h
                stats["maxSharePct"] = max(stats["maxSharePct"], round(share * 100, 1))
                if share > SHARE_FAIL:
                    if whitelisted(route, sid, h):
                        W.append(f"WRAPPER_SHARE: {route} {sid} holds {share:.0%} of the page (whitelisted)")
                    else:
                        E.append(f"WRAPPER_SHARE: {route} {sid} holds {share:.0%} of the page (> {SHARE_FAIL:.0%}): decompose it")
                elif share > SHARE_WARN:
                    W.append(f"WRAPPER_SHARE: {route} {sid} holds {share:.0%} of the page (> {SHARE_WARN:.0%})")
    for i, w in enumerate(wl):
        if i not in wl_used:
            E.append(f"WRAPPER_WHITELIST: entry {i} ({w.get('route')} {w.get('section')}) is stale: no measured hit uses it")
    return E, W, stats


if __name__ == "__main__":
    E, W, S = run()
    for e in E:
        print("ERROR", e)
    for w in W:
        print("warn ", w)
    print(f"wrapper gate: {len(E)} errors, {len(W)} warnings, {S}")
    sys.exit(1 if E else 0)
