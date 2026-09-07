const et = ({ inData: l = [], inColumns: e = [], inConfig: t = {}, inTopN: n } = {}) => {
  const o = l, r = e, s = t, a = n;
  return {
    originalData: Array.isArray(o) ? typeof structuredClone == "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o)) : [],
    columns: Array.isArray(r) ? r : [],
    config: s || {},
    topN: a
  };
}, K = ({ inColumnsCatalog: l = [], inColumnKeys: e = [] } = {}) => {
  const t = l, n = e;
  if (Array.isArray(n) && n.length > 0) {
    const o = new Map((Array.isArray(t) ? t : []).map((a) => [a.key, a])), r = [], s = [];
    for (const a of n) {
      const u = o.get(a);
      u ? s.push(u) : r.push(a);
    }
    return r.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${r.map((a) => `"${a}"`).join(", ")}] that do not exist in the columns catalog.`
    ), s;
  }
  return Array.isArray(t) ? t : [];
}, nt = ({ inData: l = [] } = {}) => {
  const e = l;
  return Array.isArray(e) ? typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e)) : [];
}, ot = ({ inColumns: l = [], inData: e = [], inConfig: t = {}, inLabel: n } = {}) => {
  var m, f;
  const o = l, r = e, s = t, a = n;
  if (!!!(s != null && s.serial || (m = s == null ? void 0 : s.table) != null && m.serial || (f = s == null ? void 0 : s.head) != null && f.serial))
    return {
      columns: o,
      data: r,
      isSerialEnabled: !1
    };
  const d = {
    key: "serial",
    label: a || typeof (s == null ? void 0 : s.serial) == "object" && s.serial.label || "#",
    align: "center",
    isSerial: !0
  }, c = (Array.isArray(o) ? o : []).some((p) => p.key === "serial") ? o : [d, ...Array.isArray(o) ? o : []], b = (Array.isArray(r) ? r : []).map((p, h) => ({
    serial: h + 1,
    ...p || {}
  }));
  return {
    columns: c,
    data: b,
    isSerialEnabled: !0
  };
}, rt = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, st = {
  aggregate: {
    supportedFunctions: [
      "sum",
      "count",
      "avg",
      "min",
      "max"
    ]
  }
}, $ = {
  rowKeys: rt,
  types: st
}, at = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  return !Array.isArray(t) || !n ? 0 : t.reduce((o, r) => {
    const s = Number(r == null ? void 0 : r[n]);
    return o + (isNaN(s) ? 0 : s);
  }, 0);
}, lt = ({ inData: l = [] } = {}) => {
  const e = l;
  return Array.isArray(e) ? e.length : 0;
}, it = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(t) || t.length === 0 || !n) return 0;
  let o = 0;
  const r = t.reduce((s, a) => {
    const u = Number(a == null ? void 0 : a[n]);
    return isNaN(u) ? s : (o++, s + u);
  }, 0);
  return o > 0 ? r / o : 0;
}, ct = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(t) || t.length === 0 || !n) return 0;
  let o = !1, r = 1 / 0;
  return t.forEach((s) => {
    const a = Number(s == null ? void 0 : s[n]);
    isNaN(a) || (o = !0, a < r && (r = a));
  }), o ? r : 0;
}, ut = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(t) || t.length === 0 || !n) return 0;
  let o = !1, r = -1 / 0;
  return t.forEach((s) => {
    const a = Number(s == null ? void 0 : s[n]);
    isNaN(a) || (o = !0, a > r && (r = a));
  }), o ? r : 0;
}, dt = {
  sum: at,
  count: lt,
  avg: it,
  min: ct,
  max: ut
}, yt = ({ inExpression: l = "", inScope: e = {} } = {}) => {
  const t = l, n = e;
  try {
    const o = Object.keys(n), r = Object.values(n);
    return new Function(...o, `return ${t};`)(...r);
  } catch (o) {
    return console.error(`Error evaluating expression "${t}":`, o), 0;
  }
}, bt = ({ inRowConfig: l = {}, inData: e = [], inScope: t = {} } = {}) => {
  var c, b;
  const n = l, o = e, r = t, s = $.rowKeys || {}, a = n.id ?? s.id, u = n.title ?? s.title, y = n.type ?? s.type, d = n.values ?? s.values, i = {};
  if (y === "aggregate") {
    const m = ((b = (c = $.types) == null ? void 0 : c.aggregate) == null ? void 0 : b.supportedFunctions) || [];
    Object.entries(d).forEach(([f, p]) => {
      if (!m.includes(p)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${p}" for column "${f}". Supported: [${m.join(", ")}]`
        );
        return;
      }
      const h = dt[p];
      typeof h == "function" && (i[f] = h({ inData: o, inKey: f }));
    });
  } else y === "eval" && Object.entries(d).forEach(([m, f]) => {
    typeof f == "string" && (i[m] = yt({
      inExpression: f,
      inScope: r
    }));
  });
  return {
    id: a,
    title: u,
    values: i
  };
}, G = ({ inData: l = [], inFooterConfig: e = [] } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(n)) return [];
  const o = {}, r = [];
  return n.forEach((s) => {
    const a = bt({
      inRowConfig: s,
      inData: t,
      inScope: o
    });
    s.id && (o[s.id] = a.values), r.push(a);
  }), r;
}, W = ({ inSource: l = {}, inResolveColumns: e } = {}) => {
  var u, y, d;
  const t = l, n = e, o = typeof n == "function" ? n({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (y = (u = t == null ? void 0 : t.config) == null ? void 0 : u.head) == null ? void 0 : y.columns
  }) : (t == null ? void 0 : t.columns) || [], r = nt({
    inData: t == null ? void 0 : t.originalData
  }), s = ot({
    inColumns: o,
    inData: r,
    inConfig: t == null ? void 0 : t.config
  }), a = G({
    inData: s.data,
    inFooterConfig: (d = t == null ? void 0 : t.config) == null ? void 0 : d.foot
  });
  return {
    activeColumns: s.columns,
    stateData: s.data,
    computedFooter: a,
    isSerialEnabled: s.isSerialEnabled
  };
}, ft = ({ inQuery: l = "", inActiveColumns: e = [] } = {}) => {
  const t = l, n = e, o = new Set(
    (Array.isArray(n) ? n : []).map((r) => typeof r == "object" && r !== null ? r.key : r).filter(Boolean)
  );
  if (typeof t == "object" && t !== null) {
    if (t.type === "string")
      return {
        type: "string",
        value: String(t.value ?? "").trim().toLowerCase()
      };
    const r = t.type === "object" && typeof t.value == "object" && t.value !== null ? t.value : t, s = {};
    for (const [a, u] of Object.entries(r))
      if (o.has(a) && u !== void 0 && u !== null) {
        const y = String(u).trim().toLowerCase();
        y !== "" && (s[a] = y);
      }
    return {
      type: "object",
      value: s
    };
  }
  return {
    type: "string",
    value: String(t ?? "").trim().toLowerCase()
  };
}, mt = ({ inData: l = [], inQueryObject: e = {}, inActiveColumns: t = [] } = {}) => {
  const n = l, o = e, r = t;
  if (!Array.isArray(n)) return [];
  const s = o == null ? void 0 : o.type, a = o == null ? void 0 : o.value, u = Array.isArray(r) && r.length > 0 ? r.map((d) => typeof d == "object" && d !== null ? d.key : d).filter(Boolean) : null;
  if (s === "object") {
    const i = Object.entries(typeof a == "object" && a !== null ? a : {});
    return i.length === 0 ? [...n] : n.filter((c) => !c || typeof c != "object" ? !1 : i.every(([b, m]) => {
      const f = c[b];
      return f == null ? !1 : String(f).toLowerCase().includes(m);
    }));
  }
  const y = typeof a == "string" ? a : String(o ?? "").trim().toLowerCase();
  return y ? n.filter((d) => !d || typeof d != "object" ? !1 : (u ? u.map((c) => d[c]) : Object.values(d)).some((c) => c == null ? !1 : String(c).toLowerCase().includes(y))) : [...n];
}, pt = ({ inData: l = [], inIsEnabled: e = !1 } = {}) => {
  const t = l;
  return !e || !Array.isArray(t) ? t : t.map((o, r) => ({
    ...o,
    serial: r + 1
  }));
}, q = ({ inStore: l, inData: e = [], inQuery: t = "" } = {}) => {
  var b;
  const n = l, o = e, r = t, s = n.library.activeColumns, a = n.library.isSerialEnabled, u = (b = n.source.config) == null ? void 0 : b.foot, y = ft({
    inQuery: r,
    inActiveColumns: s
  }), d = mt({
    inData: o,
    inQueryObject: y,
    inActiveColumns: s
  }), i = pt({
    inData: d,
    inIsEnabled: a
  }), c = G({
    inData: i,
    inFooterConfig: u
  });
  return n.library.stateData = i, n.library.computedFooter = c, {
    activeColumns: n.library.activeColumns,
    stateData: n.library.stateData,
    computedFooter: n.library.computedFooter
  };
};
class ht {
  constructor({ inData: e = [], inColumns: t = [], inConfig: n = {} } = {}) {
    const o = e, r = t, s = n;
    this.source = et({
      inData: o,
      inColumns: r,
      inConfig: s
    }), this.library = W({
      inSource: this.source,
      inResolveColumns: K
    });
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
  get stateData() {
    return this.library.stateData;
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get computedFooter() {
    return this.library.computedFooter;
  }
  updateData({ inData: e = [] } = {}) {
    const t = e;
    return this.source.originalData = Array.isArray(t) ? t : [], this.library = W({
      inSource: this.source,
      inResolveColumns: K
    }), this.library.stateData;
  }
  filterOriginalData({ inQuery: e = "" } = {}) {
    const t = e;
    return q({
      inStore: this,
      inData: this.source.originalData,
      inQuery: t
    });
  }
  filterStateData({ inQuery: e = "" } = {}) {
    const t = e;
    return q({
      inStore: this,
      inData: this.library.stateData,
      inQuery: t
    });
  }
  filter({ inQuery: e = "" } = {}) {
    const t = e;
    return this.filterOriginalData({ inQuery: t });
  }
}
const Ct = {
  table: "table table-sm align-middle",
  thead: "",
  th: "text-uppercase fw-semibold small",
  tbody: "",
  tr: "",
  td: "py-1",
  tfoot: "table-group-divider fw-bold small"
}, gt = {
  table: "table table-bordered table-sm align-middle",
  thead: "",
  th: "text-uppercase fw-semibold",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "table-group-divider fw-bold"
}, vt = {
  table: "table table-borderless table-sm align-middle",
  thead: "border-bottom",
  th: "text-uppercase fw-semibold",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-top fw-bold"
}, x = {
  default: {
    table: "table align-middle",
    thead: "",
    th: "text-uppercase fw-semibold",
    tbody: "",
    tr: "",
    td: "",
    tfoot: "table-group-divider fw-bold"
  },
  compact: Ct,
  bordered: gt,
  borderless: vt
}, At = {
  table: "table-hover table-striped",
  thead: "table-light",
  th: "text-secondary",
  tbody: "",
  tr: "",
  td: "",
  tfoot: ""
}, St = {
  table: "table-hover",
  thead: "",
  th: "text-muted",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "text-secondary"
}, wt = {
  table: "table-dark table-hover table-striped",
  thead: "table-dark",
  th: "",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-secondary"
}, Dt = {
  table: "table-dark table-striped-columns border-secondary",
  thead: "table-active",
  th: "text-light",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-secondary"
}, N = {
  default: {
    table: "table-hover table-striped",
    thead: "table-light",
    th: "",
    tbody: "",
    tr: "",
    td: "",
    tfoot: ""
  },
  light: At,
  extraLight: St,
  dark: wt,
  extraDark: Dt
}, Tt = ({ inTable: l, inTheme: e = "default" } = {}) => {
  var o, r;
  const t = l, n = e || "default";
  if (t && (t.theme = n, t.classes = F({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (o = t.store) == null ? void 0 : o.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.tableElement))
    return t.render();
}, F = ({
  inLayout: l = "compact",
  inTheme: e = "default",
  inConfigClasses: t = {},
  inCustomClasses: n = {}
} = {}) => {
  const o = l || "compact", r = e || "default", s = t || {}, a = n || {}, u = x[o] || x.compact || {}, y = N[r] || N.default || {}, d = /* @__PURE__ */ new Set([
    ...Object.keys(u),
    ...Object.keys(y),
    ...Object.keys(s),
    ...Object.keys(a)
  ]), i = {};
  for (const c of d) {
    const b = [
      u[c],
      y[c],
      s[c],
      a[c]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    i[c] = Array.from(new Set(b)).join(" ");
  }
  return i;
}, Et = ({ inTable: l, inLayout: e = "compact" } = {}) => {
  var o, r;
  const t = l, n = e || "compact";
  if (t && (t.layout = n, t.classes = F({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (o = t.store) == null ? void 0 : o.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.tableElement))
    return t.render();
}, Rt = ({ inCaption: l } = {}) => {
  const e = l;
  if (!e)
    return null;
  if (typeof e == "string")
    return {
      tagName: "caption",
      textContent: e
    };
  if (typeof e == "object") {
    const t = e.text ?? e.textContent ?? "", n = {};
    return e.class && (n.class = e.class), e.style && (n.style = e.style), e.side && (n.style = n.style ? `${n.style} caption-side: ${e.side};` : `caption-side: ${e.side};`), {
      tagName: "caption",
      textContent: String(t),
      attributes: n
    };
  }
  return null;
}, jt = ({ inCol: l, inColGroupConfig: e } = {}) => {
  const t = l, n = e;
  if (!n)
    return null;
  const o = (t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.id) ?? "";
  if (Array.isArray(n)) {
    const r = n.find((s) => {
      const a = (s == null ? void 0 : s.key) ?? (s == null ? void 0 : s.id) ?? "";
      return a && a === o;
    });
    if (r)
      return r.width ?? r.style ?? null;
  }
  return typeof n == "object" && !Array.isArray(n) && o && n[o] ? n[o] : null;
}, It = ({ inCol: l, inColGroupConfig: e } = {}) => {
  const t = l, n = e, o = {}, r = (t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.id) ?? "";
  if (Array.isArray(n)) {
    const a = n.find((u) => {
      const y = (u == null ? void 0 : u.key) ?? (u == null ? void 0 : u.id) ?? "";
      return y && y === r;
    });
    a && (a.span && (o.span = a.span), a.class && (o.class = a.class), a.attributes && typeof a.attributes == "object" && Object.assign(o, a.attributes));
  }
  const s = jt({ inCol: t, inColGroupConfig: n });
  if (s) {
    const a = s.includes(":") ? s : `width: ${s};`;
    o.style = o.style ? `${o.style} ${a}`.trim() : a;
  }
  return o;
}, xt = ({ inColumns: l = [], inColGroupConfig: e } = {}) => {
  const t = l, n = e;
  return n ? {
    tagName: "colgroup",
    children: t.map((r) => ({
      tagName: "col",
      attributes: It({
        inCol: r,
        inColGroupConfig: n
      })
    }))
  } : null;
}, Nt = ({ inAlign: l = "" } = {}) => {
  const e = l;
  return e === "right" ? "text-end" : e === "center" ? "text-center" : "";
}, Ft = ({ inCell: l } = {}) => {
  const e = l;
  return String(typeof e == "object" && e !== null ? e.textContent ?? "" : e ?? "");
}, kt = ({ inCell: l, inDefaultClass: e = "" } = {}) => {
  const t = l, n = e, o = typeof t == "object" && t !== null, r = o && t.class !== void 0 ? t.class : n, s = o ? t.align : "", a = Nt({ inAlign: s }), u = [r, a].filter(Boolean).join(" ").trim(), y = u ? { class: u } : {}, i = { ...o && t.inAttributes ? t.inAttributes : {} };
  for (const [c, b] of Object.entries(y))
    i[c] = i[c] ? `${i[c]} ${b}`.trim() : b;
  return i;
}, Qt = ({ inCell: l, inCellTagName: e = "td", inDefaultClass: t = "" } = {}) => {
  const n = l, o = e, r = t, s = Ft({ inCell: n }), a = kt({ inCell: n, inDefaultClass: r });
  return {
    tagName: o,
    textContent: s,
    attributes: a
  };
}, k = ({
  inCellTagName: l = "td",
  inCells: e = [],
  inRowClass: t = "",
  inCellClass: n = "",
  inColumnsConfig: o
} = {}) => {
  const r = l, s = e, a = t, u = n, y = a ? { class: a } : {}, d = s.map((i) => Qt({
    inCell: i,
    inCellTagName: r,
    inDefaultClass: u
  }));
  return {
    tagName: "tr",
    attributes: y,
    children: d
  };
}, Lt = ({ inColumns: l = [], inClasses: e = {} } = {}) => {
  const t = l, n = e, o = t.map((a) => ({
    textContent: a.label,
    align: a.align,
    id: a.id
  })), r = k({
    inCellTagName: "th",
    inCells: o,
    inCellClass: (n == null ? void 0 : n.th) || "",
    inRowClass: (n == null ? void 0 : n.tr) || ""
  });
  return {
    tagName: "thead",
    attributes: n != null && n.thead ? { class: n.thead } : {},
    children: [r]
  };
}, V = ({
  inColumns: l = [],
  inData: e = [],
  inRowConfig: t = {},
  inClasses: n = {},
  inColumnsConfig: o = []
} = {}) => {
  const r = l, s = e, a = n, u = Array.isArray(o) ? o : [];
  if (!Array.isArray(s) || s.length === 0) {
    const i = {
      tagName: "tr",
      children: [{
        tagName: "td",
        textContent: "No matching records found",
        attributes: {
          colspan: String(r.length),
          class: "text-center text-muted fst-italic py-4"
        }
      }]
    };
    return {
      tagName: "tbody",
      attributes: a != null && a.tbody ? { class: a.tbody } : {},
      children: [i]
    };
  }
  const y = s.map((i) => {
    const c = r.map((b) => {
      var p, h, g, S, v;
      const m = Array.isArray(u) ? u.find((A) => A.key === b.key) : void 0, f = ((h = (p = m == null ? void 0 : m.tbody) == null ? void 0 : p.td) == null ? void 0 : h.attributes) || ((S = (g = m == null ? void 0 : m.tbody) == null ? void 0 : g.th) == null ? void 0 : S.attributes);
      return {
        textContent: b.key === "amount" ? Number(i[b.key]).toFixed(2) : String(i[b.key] ?? ""),
        align: b.align,
        inAttributes: f,
        style: (v = m == null ? void 0 : m.th) == null ? void 0 : v.style
      };
    });
    return k({
      inCellTagName: "td",
      inCells: c,
      inRowClass: (a == null ? void 0 : a.tr) || "",
      inCellClass: (a == null ? void 0 : a.td) || ""
    });
  });
  return {
    tagName: "tbody",
    attributes: a != null && a.tbody ? { class: a.tbody } : {},
    children: y
  };
}, M = ({ inColumns: l = [], inComputedFooter: e = [], inClasses: t = {} } = {}) => {
  const n = l, o = e, r = t;
  if (!Array.isArray(o) || o.length === 0)
    return null;
  const s = o.map((u, y) => {
    const d = u.title || "", i = u.values || {}, c = y === o.length - 1, b = n.findIndex((f) => !f.isSerial), m = n.map((f, p) => {
      if (i[f.key] !== void 0) {
        const h = i[f.key];
        return {
          textContent: typeof h == "number" ? h.toFixed(2) : String(h),
          align: f.align || "right",
          class: c ? "fw-bold" : "fw-semibold"
        };
      }
      return p === b ? {
        textContent: d,
        class: c ? "fw-bold text-uppercase" : "fw-semibold text-uppercase"
      } : {
        textContent: "",
        class: ""
      };
    });
    return k({
      inCellTagName: "td",
      inCells: m,
      inRowClass: c ? "table-light" : (r == null ? void 0 : r.tr) || "",
      inCellClass: (r == null ? void 0 : r.td) || ""
    });
  });
  return {
    tagName: "tfoot",
    attributes: r != null && r.tfoot ? { class: r.tfoot } : {},
    children: s
  };
}, Ot = ({ inContainerConfig: l = null, inChildSpec: e = null, inClasses: t = {} } = {}) => {
  const n = l, o = e, r = t;
  if (!n)
    return o;
  if (((n == null ? void 0 : n.type) || "card") === "card") {
    const u = {
      class: (r == null ? void 0 : r.container) || (n == null ? void 0 : n.class) || "card shadow-sm border-0"
    };
    n != null && n.id && (u.id = n.id);
    const y = [], d = n == null ? void 0 : n.header;
    if (d) {
      const f = (r == null ? void 0 : r.containerHeader) || (d == null ? void 0 : d.class) || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center", p = [], h = (d == null ? void 0 : d.title) || "Table", g = (d == null ? void 0 : d.icon) || "", S = (d == null ? void 0 : d.titleClass) || "fw-semibold text-secondary", v = [];
      if (g && v.push({
        tagName: "i",
        attributes: { class: `${g} me-1` }
      }), v.push({
        tagName: "span",
        textContent: h
      }), p.push({
        tagName: "div",
        attributes: { class: S },
        children: v
      }), Array.isArray(d == null ? void 0 : d.actions) && d.actions.length > 0) {
        const A = {
          tagName: "div",
          attributes: { class: "d-flex align-items-center gap-2" },
          children: d.actions.map((C) => {
            const j = [];
            C.icon && j.push({
              tagName: "i",
              attributes: { class: `${C.icon} me-1` }
            }), C.label && j.push({
              tagName: "span",
              textContent: C.label
            });
            const I = {
              type: C.type || "button",
              class: C.class || "btn btn-sm btn-outline-secondary"
            };
            return C.id && (I.id = C.id), C.title && (I.title = C.title), {
              tagName: "button",
              attributes: I,
              children: j
            };
          })
        };
        p.push(A);
      }
      y.push({
        tagName: "div",
        attributes: { class: f },
        children: p
      });
    }
    const i = (r == null ? void 0 : r.containerBody) || (n == null ? void 0 : n.bodyClass) || "card-body p-0", b = {
      tagName: "div",
      attributes: { class: (n == null ? void 0 : n.responsiveClass) || "table-responsive" },
      children: o ? [o] : []
    }, m = b ? [b] : [];
    if (Array.isArray(n == null ? void 0 : n.extraControls) && m.push(...n.extraControls), y.push({
      tagName: "div",
      attributes: { class: i },
      children: m
    }), n != null && n.footer) {
      const f = n.footer, p = (r == null ? void 0 : r.containerFooter) || (f == null ? void 0 : f.class) || "card-footer bg-light py-2";
      y.push({
        tagName: "div",
        attributes: { class: p },
        textContent: f.text || ""
      });
    }
    return {
      tagName: "div",
      attributes: u,
      children: y
    };
  }
  return {
    tagName: "div",
    attributes: { class: (n == null ? void 0 : n.class) || "" },
    children: o ? [o] : []
  };
}, Q = ({ inTableElement: l, inColumns: e = [], inData: t = [], inRowConfig: n = {}, inColumnsConfig: o = [], inClasses: r = {} } = {}) => {
  var p, h;
  const s = l, a = e, u = t, y = n, d = o, i = r;
  if (!s) return;
  const c = V({
    inColumns: a,
    inData: u,
    inRowConfig: y,
    inColumnsConfig: d,
    inClasses: i
  }), b = (h = (p = window.ks) == null ? void 0 : p["json-to-dom"]) == null ? void 0 : h.buildSpecElement;
  if (typeof b != "function") return;
  const m = b({ inSpec: c }), f = s.querySelector("tbody");
  f && m && f.replaceWith(m);
}, L = ({ inTableElement: l, inColumns: e = [], inComputedFooter: t = [], inClasses: n = {} } = {}) => {
  var c, b;
  const o = l, r = e, s = t, a = n;
  if (!o) return;
  const u = M({
    inColumns: r,
    inComputedFooter: s,
    inClasses: a
  }), y = (b = (c = window.ks) == null ? void 0 : c["json-to-dom"]) == null ? void 0 : b.buildSpecElement;
  if (typeof y != "function") return;
  const d = u ? y({ inSpec: u }) : null, i = o.querySelector("tfoot");
  i && d ? i.replaceWith(d) : i && !d ? i.remove() : !i && d && o.appendChild(d);
}, E = ({ inTableElement: l, inStore: e, inClasses: t = {} } = {}) => {
  var s, a, u, y;
  const n = l, o = e, r = t;
  !n || !o || (Q({
    inTableElement: n,
    inColumns: o.activeColumns,
    inData: o.stateData,
    inRowConfig: (s = o.config) == null ? void 0 : s.row,
    inColumnsConfig: ((u = (a = o.source) == null ? void 0 : a.config) == null ? void 0 : u.columnsConfig) || ((y = o.config) == null ? void 0 : y.columnsConfig) || [],
    inClasses: r
  }), L({
    inTableElement: n,
    inColumns: o.activeColumns,
    inComputedFooter: o.computedFooter,
    inClasses: r
  }));
}, Bt = "table", Pt = {}, Kt = [], $t = {
  tagName: Bt,
  attributes: Pt,
  children: Kt
}, H = ({
  inColumns: l = [],
  inData: e = [],
  inComputedFooter: t = [],
  inRowConfig: n = {},
  inClasses: o = {},
  inColumnsConfig: r,
  inColGroupConfig: s,
  inCaptionConfig: a
} = {}) => {
  const u = l, y = e, d = t, i = n, c = o, b = r, m = s, p = Rt({ inCaption: a }), h = xt({
    inColumns: u,
    inColGroupConfig: m
  }), g = Lt({ inColumns: u, inClasses: c }), S = V({
    inColumns: u,
    inData: y,
    inRowConfig: i,
    inClasses: c,
    inColumnsConfig: b
  }), v = M({
    inColumns: u,
    inComputedFooter: d,
    inClasses: c
  }), A = structuredClone($t);
  return c != null && c.table && (A.attributes.class = c.table), A.children = [p, h, g, S, v].filter(Boolean), A;
}, w = ({ inTable: l } = {}) => {
  var a, u, y, d, i, c;
  const e = l;
  if (!(e != null && e.store))
    return null;
  const t = (u = (a = e.store.source) == null ? void 0 : a.config) == null ? void 0 : u.columnsConfig, n = (y = e.store.config) == null ? void 0 : y.colgroup, o = (d = e.store.config) == null ? void 0 : d.caption, r = H({
    inColumns: e.store.activeColumns,
    inData: e.store.stateData,
    inComputedFooter: e.store.computedFooter,
    inRowConfig: (i = e.store.config) == null ? void 0 : i.row,
    inClasses: e.classes,
    inColumnsConfig: t,
    inColGroupConfig: n,
    inCaptionConfig: o
  }), s = Ot({
    inContainerConfig: (c = e.store.config) == null ? void 0 : c.container,
    inChildSpec: r,
    inClasses: e.classes
  });
  return e.spec = s, s;
}, T = ({ inSpec: l } = {}) => {
  var u, y, d;
  const e = l;
  if (!e || typeof e != "object") return null;
  if (Array.isArray(e)) {
    const i = e.map((c) => T({ inSpec: c })).filter(Boolean);
    return i.length > 0 ? i : null;
  }
  const n = (Array.isArray(e.children) ? e.children : []).map((i) => T({ inSpec: i })).filter(Boolean), o = ((u = e.attributes) == null ? void 0 : u.id) || e.id, r = !!o, s = n.length > 0;
  if (!r && !s)
    return null;
  const a = {
    tagName: e.tagName
  };
  return o && (a.id = o), (y = e.attributes) != null && y.name && (a.name = e.attributes.name), (d = e.attributes) != null && d.type && (a.type = e.attributes.type), e.attributes && (a.attributes = e.attributes), n.length > 0 && (a.children = n), a;
}, U = async ({ inTable: l, inContainerId: e, inContainer: t, inQuery: n = {} } = {}) => {
  var m, f;
  const o = l, r = e, s = t, a = n;
  if (!o)
    return console.error("[json-to-dom-renderers:Table] Table instance (inTable) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Table instance (inTable) is required"
    };
  o.dataProvider && typeof o.load == "function" ? await o.load({ inQuery: a }) : w({ inTable: o });
  const u = o.spec || w({ inTable: o }), y = T({ inSpec: u }), d = (f = (m = window.ks) == null ? void 0 : m["json-to-dom"]) == null ? void 0 : f.buildSpecElement;
  if (typeof d != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: y,
      spec: u,
      element: null
    };
  const i = d({ inSpec: u }), c = Array.isArray(i) ? i[0] : i;
  let b = null;
  if (s instanceof HTMLElement)
    b = s;
  else {
    const p = r || o.containerId;
    p && (b = document.getElementById(p));
  }
  return b && (b.innerHTML = "", b.appendChild(c)), o.tableElement = c, o.controlsTree = y, {
    treeWithIds: y,
    spec: u,
    element: c,
    store: o.store
  };
}, J = ({ inTable: l, inContainerId: e, inContainer: t } = {}) => {
  var c, b;
  const n = l, o = e, r = t;
  if (!n)
    return console.error("[json-to-dom-renderers:Table] Table instance (inTable) is required to render structure."), null;
  const s = n.spec || w({ inTable: n }), a = T({ inSpec: s }), u = (b = (c = window.ks) == null ? void 0 : c["json-to-dom"]) == null ? void 0 : b.buildSpecElement;
  if (typeof u != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: a,
      spec: s,
      element: null
    };
  const y = u({ inSpec: s }), d = Array.isArray(y) ? y[0] : y;
  let i = null;
  if (r instanceof HTMLElement)
    i = r;
  else {
    const m = o || n.containerId;
    m && (i = document.getElementById(m));
  }
  return i && (i.innerHTML = "", i.appendChild(d)), n.tableElement = d, n.controlsTree = a, {
    treeWithIds: a,
    spec: s,
    element: d,
    store: n.store
  };
}, Wt = {
  repaintBody: Q,
  repaintFoot: L,
  refreshTable: E,
  renderTable: U,
  renderStructure: J,
  buildSpec: w,
  buildTable: H
}, qt = ({ inTable: l } = {}) => {
  const e = l;
  return {
    buildSpec: () => w({ inTable: e }),
    repaintBody: () => {
      var u;
      e != null && e.tableElement && Q({
        inTableElement: e.tableElement,
        inColumns: e.store.activeColumns,
        inData: e.store.stateData,
        inRowConfig: (u = e.store.config) == null ? void 0 : u.row,
        inClasses: e.classes
      });
    },
    repaintFoot: () => {
      e != null && e.tableElement && L({
        inTableElement: e.tableElement,
        inColumns: e.store.activeColumns,
        inComputedFooter: e.store.computedFooter,
        inClasses: e.classes
      });
    },
    refreshTable: () => {
      e != null && e.tableElement && E({
        inTableElement: e.tableElement,
        inStore: e.store,
        inClasses: e.classes
      });
    },
    renderStructure: ({ inContainerId: u, inContainer: y, targetContainerId: d } = {}) => {
      const b = J({
        inTable: e,
        inContainerId: u || d,
        inContainer: y
      });
      return b != null && b.element && (e.tableElement = b.element, e.controlsTree = b.treeWithIds), b;
    },
    render: async ({ inContainerId: u, inContainer: y, targetContainerId: d, inQuery: i = {} } = {}) => {
      const f = await U({
        inTable: e,
        inContainerId: u || d,
        inContainer: y,
        inQuery: i
      });
      return f != null && f.element && (e.tableElement = f.element, e.controlsTree = f.treeWithIds), f;
    }
  };
}, O = ({ inTable: l, inQuery: e = "" } = {}) => {
  const t = l, n = e;
  !(t != null && t.tableElement) || !(t != null && t.store) || (t.store.filterOriginalData({ inQuery: n }), E({
    inTableElement: t.tableElement,
    inStore: t.store,
    inClasses: t.classes
  }));
}, B = ({ inTable: l, inQuery: e = "" } = {}) => {
  const t = l, n = e;
  !(t != null && t.tableElement) || !(t != null && t.store) || (t.store.filterStateData({ inQuery: n }), E({
    inTableElement: t.tableElement,
    inStore: t.store,
    inClasses: t.classes
  }));
}, z = ({ inTable: l, inQuery: e = "", inFromState: t = !1, query: n = "" } = {}) => {
  const o = l, r = e || n;
  t ? B({ inTable: o, inQuery: r }) : O({ inTable: o, inQuery: r });
}, D = async ({ inTable: l, inQuery: e = {} } = {}) => {
  var o, r;
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
    return console.warn("[json-to-dom-renderers:Table] Table.load called without a valid dataProvider.read implementation"), (o = t == null ? void 0 : t.store) == null ? void 0 : o.stateData;
  try {
    const s = await t.dataProvider.read({ inQuery: n }), a = Array.isArray(s) ? s : (s == null ? void 0 : s.data) || [];
    return t.store.updateData({ inData: a }), t.buildSpec(), a;
  } catch (s) {
    return console.error("[json-to-dom-renderers:Table] Failed to load records via dataProvider.read:", s), (r = t == null ? void 0 : t.store) == null ? void 0 : r.stateData;
  }
}, X = async ({ inTable: l, inQuery: e = {} } = {}) => {
  var o;
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
    return console.warn("[json-to-dom-renderers:Table] Table.loadSpec called without a valid dataProvider.read implementation"), (t == null ? void 0 : t.spec) || ((o = t == null ? void 0 : t.buildSpec) == null ? void 0 : o.call(t));
  try {
    const r = await t.dataProvider.read({ inQuery: n }), s = Array.isArray(r) ? r : (r == null ? void 0 : r.data) || [];
    return t.store.updateData({ inData: s }), t.buildSpec();
  } catch (r) {
    return console.error("[json-to-dom-renderers:Table] Failed to load spec via dataProvider.read:", r), t == null ? void 0 : t.spec;
  }
}, Y = ({ inTable: l, inData: e = [] } = {}) => {
  const t = l, n = e;
  return t.store.updateData({ inData: n }), t.render();
}, Z = async ({ inTable: l, inItem: e = {} } = {}) => {
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.create != "function")
    throw new Error("Table.createRecord requires a valid dataProvider.create implementation");
  const o = await t.dataProvider.create({ inItem: n });
  return await D({ inTable: t }), o;
}, _ = async ({ inTable: l, inId: e = null, inItem: t = {} } = {}) => {
  const n = l, o = e, r = t;
  if (!(n != null && n.dataProvider) || typeof n.dataProvider.update != "function")
    throw new Error("Table.updateRecord requires a valid dataProvider.update implementation");
  const s = await n.dataProvider.update({ inId: o, inItem: r });
  return await D({ inTable: n }), s;
}, tt = async ({ inTable: l, inId: e = null } = {}) => {
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.delete != "function")
    throw new Error("Table.deleteRecord requires a valid dataProvider.delete implementation");
  const o = await t.dataProvider.delete({ inId: n });
  return await D({ inTable: t }), o;
}, Gt = {
  load: D,
  loadSpec: X,
  update: Y,
  createRecord: Z,
  updateRecord: _,
  deleteRecord: tt,
  filterTable: z,
  filterOriginalTable: O,
  filterStateTable: B
}, Vt = ({ inTable: l } = {}) => {
  const e = l;
  return {
    load: async ({ inQuery: i, query: c } = {}) => await D({
      inTable: e,
      inQuery: i ?? c ?? {}
    }),
    loadSpec: async ({ inQuery: i, query: c } = {}) => await X({
      inTable: e,
      inQuery: i ?? c ?? {}
    }),
    update: ({ inData: i, data: c } = {}) => Y({ inTable: e, inData: i ?? c ?? [] }),
    createRecord: async ({ inItem: i, item: c } = {}) => await Z({ inTable: e, inItem: i ?? c ?? {} }),
    updateRecord: async ({ inId: i, id: c = null, inItem: b, item: m = {} } = {}) => await _({ inTable: e, inId: i ?? c, inItem: b ?? m }),
    deleteRecord: async ({ inId: i, id: c = null } = {}) => await tt({ inTable: e, inId: i ?? c }),
    filterOriginalData: ({ inQuery: i, query: c } = {}) => {
      O({ inTable: e, inQuery: i ?? c ?? "" });
    },
    filterStateData: ({ inQuery: i, query: c } = {}) => {
      B({ inTable: e, inQuery: i ?? c ?? "" });
    },
    filter: ({ inQuery: i, query: c, inFromState: b = !1 } = {}) => {
      z({
        inTable: e,
        inQuery: i ?? c ?? "",
        inFromState: b
      });
    }
  };
}, Mt = !0, Ht = {
  columns: []
}, Ut = {
  striped: !0,
  hover: !0
}, Jt = [
  {
    id: "totals",
    title: "Total",
    type: "aggregate",
    values: {}
  }
], zt = {
  table: "",
  thead: "",
  tfoot: "",
  th: "",
  tbody: "",
  tr: "",
  td: ""
}, P = {
  serial: Mt,
  head: Ht,
  row: Ut,
  foot: Jt,
  classes: zt
}, Xt = () => structuredClone(P);
class R {
  constructor({
    data: e = [],
    columns: t = [],
    config: n = {},
    layout: o,
    theme: r,
    classes: s = {},
    dataProvider: a = null,
    targetContainerId: u = ""
  } = {}) {
    const y = e, d = t, i = n, c = o || (i == null ? void 0 : i.layout) || "compact", b = r || (i == null ? void 0 : i.theme) || "default", m = s, f = a, p = u;
    this.containerId = p, this.layout = c, this.theme = b, this.customClasses = m, this.classes = F({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: i == null ? void 0 : i.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = f, this.tableElement = null, this.controlsTree = null, this.store = new ht({
      inData: y,
      inColumns: d,
      inConfig: i
    }), this.methods = qt({ inTable: this }), this.actions = Vt({ inTable: this }), this.spec = this.buildSpec();
  }
  setLayout({ layout: e = "compact", inLayout: t } = {}) {
    return Et({ inTable: this, inLayout: t || e || "compact" });
  }
  setTheme({ theme: e = "default", inTheme: t } = {}) {
    return Tt({ inTable: this, inTheme: t || e || "default" });
  }
  buildSpec() {
    return this.methods.buildSpec();
  }
  renderStructure(e = {}) {
    return this.methods.renderStructure(e);
  }
  async loadSpec(e = {}) {
    return await this.actions.loadSpec(e);
  }
  async render(e = {}) {
    return await this.methods.render(e);
  }
  getControlsTree() {
    return this.controlsTree;
  }
  get data() {
    return this.store.stateData;
  }
  get columns() {
    return this.store.activeColumns;
  }
  get config() {
    return this.store.config;
  }
  // Methods (DOM / repaints) delegations for backward compatibility
  repaintBody() {
    return this.methods.repaintBody();
  }
  repaintFoot() {
    return this.methods.repaintFoot();
  }
  refreshTable() {
    return this.methods.refreshTable();
  }
  // Actions (state / CRUD / filtering) delegations for backward compatibility
  load(e = {}) {
    return this.actions.load(e);
  }
  update(e = {}) {
    return this.actions.update(e);
  }
  createRecord(e = {}) {
    return this.actions.createRecord(e);
  }
  updateRecord(e = {}) {
    return this.actions.updateRecord(e);
  }
  deleteRecord(e = {}) {
    return this.actions.deleteRecord(e);
  }
  filterOriginalData(e = {}) {
    return this.actions.filterOriginalData(e);
  }
  filterStateData(e = {}) {
    return this.actions.filterStateData(e);
  }
  filter(e = {}) {
    return this.actions.filter(e);
  }
}
R.layouts = Object.keys(x);
R.themes = Object.keys(N);
R.configTemplate = P;
const Yt = "v3.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-table"] = {
  version: Yt,
  Table: R,
  methods: Wt,
  actions: Gt,
  templateConfig: P,
  getTemplateConfig: Xt
};
export {
  R as Table,
  Gt as actions,
  R as default,
  Xt as getTemplateConfig,
  Wt as methods,
  P as templateConfig,
  Yt as version
};
