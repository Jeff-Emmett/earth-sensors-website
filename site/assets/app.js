/* =========================================================================
   earth-sensors — behaviour
   Three instruments: the Ladder (supply vs demand, log axis), the Traverse
   (frequency vs penetration, computed live from Maxwell), and the Scenarios.
   ========================================================================= */

(() => {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  /* ---- formatting ------------------------------------------------------ */

  const SI = [
    [1e0,  "W",  1], [1e-3, "mW", 1e3], [1e-6, "µW", 1e6],
    [1e-9, "nW", 1e9], [1e-12, "pW", 1e12], [1e-15, "fW", 1e15],
  ];

  function fmtW(w) {
    if (w === 0) return "0";
    if (w >= 1000) return (w / 1000).toPrecision(2) + " kW";
    for (const [floor, unit, mul] of SI) {
      if (w >= floor) {
        const v = w * mul;
        return (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toPrecision(2)) + " " + unit;
      }
    }
    return w.toExponential(1) + " W";
  }

  function fmtArea(a) {
    if (a >= 1) return a.toFixed(a < 10 ? 2 : 0).replace(/\.00$/, "") + " m²";
    return (a * 1e4).toFixed(0) + " cm²";
  }

  function fmtFreq(f) {
    if (f >= 1e9) return (f / 1e9).toPrecision(3) + " GHz";
    if (f >= 1e6) return (f / 1e6).toPrecision(3) + " MHz";
    if (f >= 1e3) return (f / 1e3).toPrecision(3) + " kHz";
    return f.toPrecision(3) + " Hz";
  }

  function fmtLen(m) {
    if (m >= 1000) return (m / 1000).toPrecision(3) + " km";
    if (m >= 1) return m.toPrecision(3) + " m";
    if (m >= 0.01) return (m * 100).toPrecision(3) + " cm";
    return (m * 1000).toPrecision(3) + " mm";
  }

  /** Cadence of reports a given average power supports. */
  function cadence(w) {
    if (w <= 0) return { text: "never", detail: "no local energy at all" };
    const perDay = (86400 * w) / ENERGY.REPORT_J;
    if (perDay >= 86400) return { text: "continuous", detail: "more than one per second" };
    if (perDay >= 48) return { text: Math.round(perDay) + " / day", detail: "every " + fmtDur(86400 / perDay) };
    if (perDay >= 1) return { text: perDay.toFixed(1) + " / day", detail: "every " + fmtDur(86400 / perDay) };
    const days = 1 / perDay;
    if (days < 730) return { text: "1 per " + Math.round(days) + " days", detail: "too slow for most uses" };
    const yrs = days / 365.25;
    const big =
      yrs >= 1e9 ? (yrs / 1e9).toPrecision(2) + " billion" :
      yrs >= 1e6 ? (yrs / 1e6).toPrecision(2) + " million" :
      yrs >= 1e3 ? (yrs / 1e3).toPrecision(2) + " thousand" :
      Math.round(yrs).toString();
    return {
      text: "1 per " + big + " years",
      detail: "this is not a power source",
    };
  }

  function fmtDur(s) {
    if (s < 90) return Math.round(s) + " s";
    if (s < 5400) return Math.round(s / 60) + " min";
    if (s < 172800) return (s / 3600).toFixed(1) + " h";
    return Math.round(s / 86400) + " days";
  }

  /* ---- citations ------------------------------------------------------- */

  let citeOrder = [];
  function citeIds(ids) {
    const frag = document.createDocumentFragment();
    (ids || []).forEach((id) => {
      if (!SOURCES[id]) return;
      if (!citeOrder.includes(id)) citeOrder.push(id);
      const a = el("a", "cite", "[" + (citeOrder.indexOf(id) + 1) + "]");
      a.href = "#ref-" + id;
      a.title = SOURCES[id].title;
      frag.appendChild(a);
    });
    return frag;
  }

  /* =======================================================================
     PLATE I — THE LADDER
     ======================================================================= */

  const LAD_MIN = -16;   // log10 W
  const LAD_MAX = 2;

  function ladPos(w) {
    if (w <= 0) return 0;
    const l = Math.log10(w);
    return Math.max(0, Math.min(1, (l - LAD_MIN) / (LAD_MAX - LAD_MIN)));
  }

  function buildLadder() {
    const host = $("#ladder");
    if (!host) return;

    const rows = [];

    const mkRow = (item, kind) => {
      const row = el("div", "ladder__row");
      row.setAttribute("role", "button");
      row.setAttribute("tabindex", "0");
      row.setAttribute("aria-expanded", "false");

      const name = el("div", "ladder__name");
      name.appendChild(document.createTextNode(item.name));
      if (item.srcs) name.appendChild(citeIds(item.srcs));
      const unit = el("span", "ladder__unit",
        kind === "demand" ? "demand · class " + item.cls : item.unit);
      name.appendChild(unit);

      const track = el("div", "ladder__track");
      const bar = el("div", "ladder__bar");
      bar.dataset.family = kind === "demand" ? "demand" : item.family;
      track.appendChild(bar);

      const val = el("div", "ladder__val");
      const num = el("span", null, "");
      const sub = el("small", null, "");
      val.append(num, sub);

      const note = el("div", "ladder__note");
      note.hidden = true;
      note.appendChild(document.createTextNode(item.note || ""));
      if (item.derived) {
        const d = el("div", "mono u-derived", "derived: " + item.derived);
        note.appendChild(d);
      }

      row.append(name, track, val, note);

      const toggle = () => {
        const open = row.getAttribute("aria-expanded") === "true";
        row.setAttribute("aria-expanded", String(!open));
        note.hidden = open;
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });

      host.appendChild(row);
      rows.push({ item, kind, bar, num, sub });
    };

    SUPPLY.forEach((s) => mkRow(s, "supply"));
    const sep = el("div", "ladder__row u-sep");
    const sepLabel = el("div", "eyebrow u-sep-label", "what a node needs ↓");
    sep.appendChild(sepLabel);
    host.appendChild(sep);
    DEMAND.forEach((d) => mkRow(d, "demand"));

    // decade axis
    const dec = el("div", "decades");
    for (let l = LAD_MIN; l <= LAD_MAX; l += 3) {
      dec.appendChild(el("span", null, fmtW(Math.pow(10, l))));
    }
    host.after(dec);

    /* --- live update --- */
    const areaIn = $("#lad-area");
    const areaOut = $("#lad-area-out");
    const selWrap = $("#lad-readout");

    function update() {
      const area = Math.pow(10, parseFloat(areaIn.value)); // m²
      areaOut.textContent = fmtArea(area);

      let best = null;
      rows.forEach((r) => {
        const scaled = r.kind === "supply" && r.item.areaScaled
          ? r.item.w * area
          : r.item.w;
        r.bar.style.width = (ladPos(scaled) * 100).toFixed(2) + "%";
        r.num.textContent = fmtW(scaled);
        if (r.kind === "supply") {
          const c = cadence(r.item.recovered ? scaled * r.item.recovered : scaled);
          r.sub.textContent = c.text;
          const eff = r.item.recovered ? scaled * r.item.recovered : scaled;
          if (!best || eff > best.w) best = { w: eff, name: r.item.name };
        } else {
          r.sub.textContent = "class " + r.item.cls;
        }
      });

      // readout: the honest comparison
      const atmos = SUPPLY.find((s) => s.id === "atmos").w * area;
      const mfc = SUPPLY.find((s) => s.id === "smfcField").w * area;
      const ratio = mfc / atmos;

      selWrap.innerHTML = "";
      const mk = (label, big, small) => {
        const d = el("div");
        d.append(el("dt", null, label), (() => {
          const dd = el("dd", null, big);
          if (small) dd.appendChild(el("small", null, small));
          return dd;
        })());
        return d;
      };
      selWrap.append(
        mk("Atmospheric electricity", fmtW(atmos), cadence(atmos).text + " — " + cadence(atmos).detail),
        mk("Soil microbial fuel cell", fmtW(mfc), cadence(mfc).text + " of the same reports"),
        mk("Ratio", Math.round(ratio).toLocaleString() + "×",
           "how much more the bacteria pay than the sky, for the same footprint"),
      );
    }

    areaIn.addEventListener("input", update);
    update();
  }

  /* =======================================================================
     PLATE II — THE TRAVERSE
     Attenuation in a general lossy medium. No conductor approximation:
       α = ω √( µε/2 · ( √(1 + (σ/ωε)²) − 1 ) )
     valid from ELF (where σ dominates) to UHF (where it does not).
     ======================================================================= */

  function attenuation(fHz, sigma, epsR) {
    const w = 2 * Math.PI * fHz;
    const eps = epsR * PHYS.EPS0;
    const p = sigma / (w * eps);                    // loss tangent
    const inner = Math.sqrt(1 + p * p) - 1;
    const alpha = w * Math.sqrt((PHYS.MU0 * eps / 2) * inner);  // Np/m
    return {
      alpha,
      skinDepth: 1 / alpha,                          // m, 1/e amplitude
      dbPerM: alpha * 8.6858896,
      lossTangent: p,
      regime: p > 10 ? "conductor" : p < 0.1 ? "dielectric" : "transition",
    };
  }

  /** Order-of-magnitude channel capacity available at a carrier frequency.
      Not a standard — a scale marker: usable fractional bandwidth ~1 % and
      a few bits/s/Hz. */
  function rateScale(fHz) {
    return fHz * 0.01 * 2;
  }

  const TR_MIN = Math.log10(3);
  const TR_MAX = Math.log10(6e9);

  function buildTraverse() {
    const svg = $("#traverse-axis");
    if (!svg) return;

    const W = 1000, H = 200;
    const padL = 8, padR = 8, axisY = 148;
    const x = (f) => padL + ((Math.log10(f) - TR_MIN) / (TR_MAX - TR_MIN)) * (W - padL - padR);

    const NS = "http://www.w3.org/2000/svg";
    const mk = (t, attrs, txt) => {
      const n = document.createElementNS(NS, t);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      if (txt != null) n.textContent = txt;
      return n;
    };

    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.innerHTML = "";

    // baseline
    svg.appendChild(mk("line", {
      x1: padL, y1: axisY, x2: W - padR, y2: axisY,
      stroke: "var(--rule)", "stroke-width": 1,
    }));

    // decade ticks
    for (let l = 1; l <= 9; l++) {
      const f = Math.pow(10, l);
      if (f < 3 || f > 6e9) continue;
      const xx = x(f);
      svg.appendChild(mk("line", { x1: xx, y1: axisY, x2: xx, y2: axisY + 7, stroke: "var(--rule)", "stroke-width": 1 }));
      svg.appendChild(mk("text", {
        x: xx, y: axisY + 20, "text-anchor": "middle",
        fill: "var(--ink-3)", "font-family": "var(--f-mono)", "font-size": "9",
        "letter-spacing": ".08em",
      }, fmtFreq(f).replace(/\.\d+/, "")));
    }

    // Band markers. Labels are packed into lanes greedily: a label goes in the
    // topmost lane where it does not overlap what is already there, so nothing
    // collides no matter how the band list changes.
    const FS = 8.2, CHW = 7.4, LANE_H = 19, LANES = 5;
    const laneEnd = new Array(LANES).fill(-Infinity);

    BANDS.forEach((b, i) => {
      const xx = x(b.f);
      const label = (b.short || b.name).toUpperCase();
      const w = label.length * CHW;

      // anchor: keep the label inside the plot at both edges
      let anchor = "middle", lx = xx, left = xx - w / 2, right = xx + w / 2;
      if (left < padL) { anchor = "start"; lx = xx; left = xx; right = xx + w; }
      if (right > W - padR) { anchor = "end"; lx = xx; right = xx; left = xx - w; }

      let lane = 0;
      while (lane < LANES - 1 && left < laneEnd[lane] + 14) lane++;
      laneEnd[lane] = right;

      const laneY = axisY - 22 - lane * LANE_H;
      svg.appendChild(mk("line", {
        x1: xx, y1: axisY, x2: xx, y2: laneY + 2,
        stroke: "var(--rule-soft)", "stroke-width": 1, "stroke-dasharray": "2 3",
      }));
      svg.appendChild(mk("circle", { cx: xx, cy: axisY, r: 3, fill: "var(--verdigris)" }));
      svg.appendChild(mk("text", {
        x: lx, y: laneY, "text-anchor": anchor,
        fill: "var(--ink-2)", "font-family": "var(--f-mono)", "font-size": String(FS),
        "letter-spacing": ".06em",
      }, label));
    });

    // the movable cursor
    const cursor = mk("g", { id: "tr-cursor" });
    const cline = mk("line", { x1: 0, y1: 12, x2: 0, y2: axisY + 7, stroke: "var(--copper)", "stroke-width": 1.5 });
    const chead = mk("path", { d: "M-5,4 L5,4 L0,12 Z", fill: "var(--copper)" });
    cursor.append(cline, chead);
    svg.appendChild(cursor);

    const fIn = $("#tr-freq"), sIn = $("#tr-sigma");
    const fOut = $("#tr-freq-out"), sOut = $("#tr-sigma-out");
    const grid = $("#traverse-grid"), card = $("#traverse-band");

    function nearestBand(f) {
      let best = BANDS[0], bd = Infinity;
      BANDS.forEach((b) => {
        const d = Math.abs(Math.log10(b.f) - Math.log10(f));
        if (d < bd) { bd = d; best = b; }
      });
      return { band: best, close: bd < 0.12 };
    }

    function update() {
      const f = Math.pow(10, parseFloat(fIn.value));
      const sigma = Math.pow(10, parseFloat(sIn.value));
      // permittivity rises with water content, which is also what raises σ
      const epsR = 3 + 60 * Math.min(1, Math.pow(sigma / 0.5, 0.45));

      const a = attenuation(f, sigma, epsR);
      const lambda = PHYS.C / f;
      const rate = rateScale(f);

      const xx = x(f);
      cursor.setAttribute("transform", `translate(${xx},0)`);
      fOut.textContent = fmtFreq(f);
      sOut.textContent = sigma.toFixed(3) + " S/m";

      const wetness =
        sigma < 0.005 ? "dry sand / frozen" :
        sigma < 0.02  ? "dry soil" :
        sigma < 0.08  ? "moist loam" :
        sigma < 0.3   ? "wet soil" : "saturated / saline";

      grid.innerHTML = "";
      const cell = (label, big, small) => {
        const d = el("div", "traverse__cell");
        d.append(el("dt", null, label));
        const dd = el("dd", null, big);
        if (small) dd.appendChild(el("small", null, small));
        d.appendChild(dd);
        return d;
      };
      grid.append(
        cell("Penetration (1/e)", fmtLen(a.skinDepth),
             a.dbPerM >= 1 ? a.dbPerM.toPrecision(3) + " dB per metre of " + wetness
                           : (a.dbPerM * 1000).toPrecision(3) + " dB per km"),
        cell("Wavelength in air", fmtLen(lambda),
             lambda > 100 ? "any practical antenna is electrically tiny here"
                          : "an efficient antenna is a buildable object"),
        cell("Channel scale", rate >= 1e6 ? (rate / 1e6).toPrecision(2) + " Mb/s"
                            : rate >= 1e3 ? (rate / 1e3).toPrecision(2) + " kb/s"
                            : rate.toPrecision(2) + " b/s",
             "order of magnitude at ~1 % fractional bandwidth"),
        cell("Propagation regime", a.regime,
             "loss tangent σ/ωε = " + (a.lossTangent >= 100 ? a.lossTangent.toExponential(1) : a.lossTangent.toPrecision(3))),
      );

      const nb = nearestBand(f);
      card.innerHTML = "";
      if (nb.close) {
        card.append(
          el("h4", null, nb.band.name),
          el("p", null, nb.band.use),
          el("div", "mono", "Canada: " + nb.band.ca),
        );
        card.classList.remove("u-hidden");
      } else {
        card.classList.add("u-hidden");
      }
    }

    fIn.addEventListener("input", update);
    sIn.addEventListener("input", update);
    window.addEventListener("resize", update);
    update();
  }

  /* =======================================================================
     PLATE V — SCENARIOS
     ======================================================================= */

  function buildScenarios() {
    const tabs = $("#scn-tabs"), panel = $("#scn-panel");
    if (!tabs) return;

    SCENARIOS.forEach((s, i) => {
      const b = el("button", "scn__tab", s.name);
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(i === 0));
      b.addEventListener("click", () => show(i));
      tabs.appendChild(b);
    });

    function show(i) {
      const s = SCENARIOS[i];
      $$(".scn__tab", tabs).forEach((b, j) => b.setAttribute("aria-selected", String(i === j)));
      panel.innerHTML = "";

      panel.append(el("h3", null, s.name), (() => {
        const p = el("p", "scn__stake", s.stake);
        return p;
      })());

      const stack = el("div", "stack");
      const cell = (label, txt) => {
        const d = el("div", "stack__cell");
        d.append(el("dt", null, label), el("dd", null, txt));
        return d;
      };
      stack.append(
        cell("Layer 0 — resonators", s.layer0),
        cell("Layer 1 — interrogator", s.layer1),
        cell("Layer 2 — link", s.layer2),
        cell("Layer 3 — claim", s.claim),
      );
      panel.appendChild(stack);

      const measure = el("p", "u-measure", "");
      measure.appendChild(el("span", "eyebrow", "what is measured  "));
      measure.appendChild(document.createTextNode(s.measure));
      panel.appendChild(measure);

      const nums = el("div", "scn__nums");
      const num = (label, big) => {
        const d = el("div", "scn__num");
        d.append(el("dt", null, label), el("dd", null, big));
        return d;
      };
      nums.append(
        num("Harvest", s.harvestW ? fmtW(s.harvestW) : "none in the field"),
        num("Reports", s.reportsPerDay >= 1
          ? Math.round(s.reportsPerDay) + " / day"
          : s.reportsPerDay > 0 ? "1 per " + Math.round(1 / s.reportsPerDay) + " days" : "on visit"),
        num("Hardware", "~$" + s.costCad + " CAD"),
      );
      panel.appendChild(nums);

      panel.appendChild(el("p", "scn__why", s.why));
    }

    show(0);
  }

  /* =======================================================================
     STATIC RENDERS
     ======================================================================= */

  function buildFamilies() {
    const tb = $("#fam-body");
    if (!tb) return;
    FAMILIES.forEach((f) => {
      const tr = el("tr");
      const name = el("td");
      name.appendChild(el("strong", null, f.name));
      name.appendChild(el("div", "mono", f.f));
      const why = el("td", null, f.why);
      tr.append(
        name,
        el("td", null, f.range),
        el("td", null, f.depth),
        el("td", null, f.cost),
        why,
      );
      tb.appendChild(tr);
    });
  }

  function buildElectroculture() {
    const host = $("#ec-body");
    if (!host) return;
    ELECTROCULTURE.forEach((e) => {
      const tr = el("tr");
      const v = el("td");
      v.appendChild(el("span", "chip chip--" + e.verdict, e.verdict));
      const claim = el("td");
      claim.appendChild(el("strong", null, e.claim));
      claim.appendChild(el("div", "mono", e.numbers));
      const ev = el("td", null, e.evidence);
      ev.appendChild(citeIds(e.srcs));
      tr.append(v, claim, ev);
      host.appendChild(tr);
    });
  }

  function buildTesla() {
    const host = $("#tesla");
    if (!host) return;
    TESLA.forEach((t) => {
      const c = el("div", "card");
      const chipCls = t.status.includes("right") ? "right"
        : t.status.includes("deployed") ? "deployed"
        : t.status.includes("contested") ? "contested" : "refuted";
      c.appendChild((() => {
        return el("span", "chip chip--" + chipCls + " u-chip-block", t.status);
      })());
      c.appendChild(el("h3", null, t.claim));
      const p = el("p", null, t.body);
      p.appendChild(citeIds(t.srcs));
      c.appendChild(p);
      host.appendChild(c);
    });
  }

  function buildLayers() {
    const host = $("#layers");
    if (!host) return;
    LAYERS.forEach((l) => {
      const c = el("div", "card");
      c.appendChild(el("span", "eyebrow", "Layer " + l.n + " · " + l.cls));
      c.appendChild(el("h3", null, l.name));
      c.appendChild(el("p", null, l.body));
      const cons = el("p", "u-consequence", l.consequence);
      c.appendChild(cons);
      host.appendChild(c);
    });
  }

  function buildBench() {
    const host = $("#bench");
    if (!host) return;
    BENCH.forEach((b) => {
      const d = el("div", "bench__item");
      d.appendChild(el("span", "bench__id", b.id));
      d.appendChild(el("h3", null, b.name));
      d.appendChild(el("div", "mono", b.cost));
      const dl = el("dl");
      const add = (k, v, cls) => {
        dl.appendChild(el("dt", null, k));
        dl.appendChild(el("dd", cls || null, v));
      };
      add("Build", b.build);
      add("Prediction", b.predict, "predict");
      add("What would falsify it", b.falsifies);
      d.appendChild(dl);
      host.appendChild(d);
    });
  }

  function buildRefs() {
    const host = $("#refs");
    if (!host) return;
    // anything never cited inline still belongs in the list
    Object.keys(SOURCES).forEach((id) => { if (!citeOrder.includes(id)) citeOrder.push(id); });
    citeOrder.forEach((id, i) => {
      const s = SOURCES[id];
      const li = el("li");
      li.id = "ref-" + id;
      li.appendChild(el("span", "mono", "[" + (i + 1) + "] " + s.tag));
      const a = el("a", null, s.title);
      a.href = s.url;
      a.rel = "noopener";
      li.appendChild(a);
      li.appendChild(el("em", null, s.where));
      host.appendChild(li);
    });
  }

  /* =======================================================================
     THEME
     ======================================================================= */

  function initTheme() {
    const btn = $("#theme");
    if (!btn) return;
    const KEY = "es-theme";
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (_) {}
    if (saved) document.documentElement.dataset.theme = saved;
    const label = () => {
      const cur = document.documentElement.dataset.theme;
      btn.textContent = cur === "dark" ? "day" : cur === "light" ? "night" : "night";
    };
    label();
    btn.addEventListener("click", () => {
      const cur = document.documentElement.dataset.theme;
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (_) {}
      label();
    });
  }

  /* =======================================================================
     GO
     ======================================================================= */

  function init() {
    initTheme();
    buildLadder();
    buildTraverse();
    buildFamilies();
    buildElectroculture();
    buildTesla();
    buildScenarios();
    buildLayers();
    buildBench();
    buildRefs();
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
