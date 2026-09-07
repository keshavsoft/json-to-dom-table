const Z = ({ inData: l = [], inColumns: e = [], inConfig: t = {}, inTopN: n } = {}) => {
  const o = l, r = e, a = t, s = n;
  return {
    originalData: Array.isArray(o) ? typeof structuredClone == "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o)) : [],
    columns: Array.isArray(r) ? r : [],
    config: a || {},
    topN: s
  };
}, L = ({ inColumnsCatalog: l = [], inColumnKeys: e = [] } = {}) => {
  const t = l, n = e;
  if (Array.isArray(n) && n.length > 0) {
    const o = new Map((Array.isArray(t) ? t : []).map((s) => [s.key, s])), r = [], a = [];
    for (const s of n) {
      const u = o.get(s);
      u ? a.push(u) : r.push(s);
    }
    return r.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${r.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), a;
  }
  return Array.isArray(t) ? t : [];
}, _ = ({ inData: l = [] } = {}) => {
  const e = l;
  return Array.isArray(e) ? typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e)) : [];
}, tt = ({ inColumns: l = [], inData: e = [], inConfig: t = {}, inLabel: n } = {}) => {
  var b, y;
  const o = l, r = e, a = t, s = n;
  if (!!!(a != null && a.serial || (b = a == null ? void 0 : a.table) != null && b.serial || (y = a == null ? void 0 : a.head) != null && y.serial))
    return {
      columns: o,
      data: r,
      isSerialEnabled: !1
    };
  const d = {
    key: "serial",
    label: s || typeof (a == null ? void 0 : a.serial) == "object" && a.serial.label || "#",
    align: "center",
    isSerial: !0
  }, c = (Array.isArray(o) ? o : []).some((p) => p.key === "serial") ? o : [d, ...Array.isArray(o) ? o : []], m = (Array.isArray(r) ? r : []).map((p, h) => ({
    serial: h + 1,
    ...p || {}
  }));
  return {
    columns: c,
    data: m,
    isSerialEnabled: !0
  };
}, et = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, nt = {
  aggregate: {
    supportedFunctions: [
      "sum",
      "count",
      "avg",
      "min",
      "max"
    ]
  }
}, O = {
  rowKeys: et,
  types: nt
}, ot = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  return !Array.isArray(t) || !n ? 0 : t.reduce((o, r) => {
    const a = Number(r == null ? void 0 : r[n]);
    return o + (isNaN(a) ? 0 : a);
  }, 0);
}, rt = ({ inData: l = [] } = {}) => {
  const e = l;
  return Array.isArray(e) ? e.length : 0;
}, at = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(t) || t.length === 0 || !n) return 0;
  let o = 0;
  const r = t.reduce((a, s) => {
    const u = Number(s == null ? void 0 : s[n]);
    return isNaN(u) ? a : (o++, a + u);
  }, 0);
  return o > 0 ? r / o : 0;
}, st = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(t) || t.length === 0 || !n) return 0;
  let o = !1, r = 1 / 0;
  return t.forEach((a) => {
    const s = Number(a == null ? void 0 : a[n]);
    isNaN(s) || (o = !0, s < r && (r = s));
  }), o ? r : 0;
}, lt = ({ inData: l = [], inKey: e } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(t) || t.length === 0 || !n) return 0;
  let o = !1, r = -1 / 0;
  return t.forEach((a) => {
    const s = Number(a == null ? void 0 : a[n]);
    isNaN(s) || (o = !0, s > r && (r = s));
  }), o ? r : 0;
}, it = {
  sum: ot,
  count: rt,
  avg: at,
  min: st,
  max: lt
}, ct = ({ inExpression: l = "", inScope: e = {} } = {}) => {
  const t = l, n = e;
  try {
    const o = Object.keys(n), r = Object.values(n);
    return new Function(...o, `return ${t};`)(...r);
  } catch (o) {
    return console.error(`Error evaluating expression "${t}":`, o), 0;
  }
}, ut = ({ inRowConfig: l = {}, inData: e = [], inScope: t = {} } = {}) => {
  var c, m;
  const n = l, o = e, r = t, a = O.rowKeys || {}, s = n.id ?? a.id, u = n.title ?? a.title, f = n.type ?? a.type, d = n.values ?? a.values, i = {};
  if (f === "aggregate") {
    const b = ((m = (c = O.types) == null ? void 0 : c.aggregate) == null ? void 0 : m.supportedFunctions) || [];
    Object.entries(d).forEach(([y, p]) => {
      if (!b.includes(p)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${p}" for column "${y}". Supported: [${b.join(", ")}]`
        );
        return;
      }
      const h = it[p];
      typeof h == "function" && (i[y] = h({ inData: o, inKey: y }));
    });
  } else f === "eval" && Object.entries(d).forEach(([b, y]) => {
    typeof y == "string" && (i[b] = ct({
      inExpression: y,
      inScope: r
    }));
  });
  return {
    id: s,
    title: u,
    values: i
  };
}, q = ({ inData: l = [], inFooterConfig: e = [] } = {}) => {
  const t = l, n = e;
  if (!Array.isArray(n)) return [];
  const o = {}, r = [];
  return n.forEach((a) => {
    const s = ut({
      inRowConfig: a,
      inData: t,
      inScope: o
    });
    a.id && (o[a.id] = s.values), r.push(s);
  }), r;
}, P = ({ inSource: l = {}, inResolveColumns: e } = {}) => {
  var u, f, d;
  const t = l, n = e, o = typeof n == "function" ? n({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (f = (u = t == null ? void 0 : t.config) == null ? void 0 : u.head) == null ? void 0 : f.columns
  }) : (t == null ? void 0 : t.columns) || [], r = _({
    inData: t == null ? void 0 : t.originalData
  }), a = tt({
    inColumns: o,
    inData: r,
    inConfig: t == null ? void 0 : t.config
  }), s = q({
    inData: a.data,
    inFooterConfig: (d = t == null ? void 0 : t.config) == null ? void 0 : d.foot
  });
  return {
    activeColumns: a.columns,
    stateData: a.data,
    computedFooter: s,
    isSerialEnabled: a.isSerialEnabled
  };
}, dt = ({ inQuery: l = "", inActiveColumns: e = [] } = {}) => {
  const t = l, n = e, o = new Set(
    (Array.isArray(n) ? n : []).map((r) => typeof r == "object" && r !== null ? r.key : r).filter(Boolean)
  );
  if (typeof t == "object" && t !== null) {
    if (t.type === "string")
      return {
        type: "string",
        value: String(t.value ?? "").trim().toLowerCase()
      };
    const r = t.type === "object" && typeof t.value == "object" && t.value !== null ? t.value : t, a = {};
    for (const [s, u] of Object.entries(r))
      if (o.has(s) && u !== void 0 && u !== null) {
        const f = String(u).trim().toLowerCase();
        f !== "" && (a[s] = f);
      }
    return {
      type: "object",
      value: a
    };
  }
  return {
    type: "string",
    value: String(t ?? "").trim().toLowerCase()
  };
}, mt = ({ inData: l = [], inQueryObject: e = {}, inActiveColumns: t = [] } = {}) => {
  const n = l, o = e, r = t;
  if (!Array.isArray(n)) return [];
  const a = o == null ? void 0 : o.type, s = o == null ? void 0 : o.value, u = Array.isArray(r) && r.length > 0 ? r.map((d) => typeof d == "object" && d !== null ? d.key : d).filter(Boolean) : null;
  if (a === "object") {
    const i = Object.entries(typeof s == "object" && s !== null ? s : {});
    return i.length === 0 ? [...n] : n.filter((c) => !c || typeof c != "object" ? !1 : i.every(([m, b]) => {
      const y = c[m];
      return y == null ? !1 : String(y).toLowerCase().includes(b);
    }));
  }
  const f = typeof s == "string" ? s : String(o ?? "").trim().toLowerCase();
  return f ? n.filter((d) => !d || typeof d != "object" ? !1 : (u ? u.map((c) => d[c]) : Object.values(d)).some((c) => c == null ? !1 : String(c).toLowerCase().includes(f))) : [...n];
}, ft = ({ inData: l = [], inIsEnabled: e = !1 } = {}) => {
  const t = l;
  return !e || !Array.isArray(t) ? t : t.map((o, r) => ({
    ...o,
    serial: r + 1
  }));
}, B = ({ inStore: l, inData: e = [], inQuery: t = "" } = {}) => {
  var m;
  const n = l, o = e, r = t, a = n.library.activeColumns, s = n.library.isSerialEnabled, u = (m = n.source.config) == null ? void 0 : m.foot, f = dt({
    inQuery: r,
    inActiveColumns: a
  }), d = mt({
    inData: o,
    inQueryObject: f,
    inActiveColumns: a
  }), i = ft({
    inData: d,
    inIsEnabled: s
  }), c = q({
    inData: i,
    inFooterConfig: u
  });
  return n.library.stateData = i, n.library.computedFooter = c, {
    activeColumns: n.library.activeColumns,
    stateData: n.library.stateData,
    computedFooter: n.library.computedFooter
  };
};
class yt {
  constructor({ inData: e = [], inColumns: t = [], inConfig: n = {} } = {}) {
    const o = e, r = t, a = n;
    this.source = Z({
      inData: o,
      inColumns: r,
      inConfig: a
    }), this.library = P({
      inSource: this.source,
      inResolveColumns: L
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
    return this.source.originalData = Array.isArray(t) ? t : [], this.library = P({
      inSource: this.source,
      inResolveColumns: L
    }), this.library.stateData;
  }
  filterOriginalData({ inQuery: e = "" } = {}) {
    const t = e;
    return B({
      inStore: this,
      inData: this.source.originalData,
      inQuery: t
    });
  }
  filterStateData({ inQuery: e = "" } = {}) {
    const t = e;
    return B({
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
const bt = {
  table: "table table-sm align-middle",
  thead: "",
  th: "text-uppercase fw-semibold small",
  tbody: "",
  tr: "",
  td: "py-1",
  tfoot: "table-group-divider fw-bold small"
}, pt = {
  table: "table table-bordered table-sm align-middle",
  thead: "",
  th: "text-uppercase fw-semibold",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "table-group-divider fw-bold"
}, ht = {
  table: "table table-borderless table-sm align-middle",
  thead: "border-bottom",
  th: "text-uppercase fw-semibold",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-top fw-bold"
}, A = {
  default: {
    table: "table align-middle",
    thead: "",
    th: "text-uppercase fw-semibold",
    tbody: "",
    tr: "",
    td: "",
    tfoot: "table-group-divider fw-bold"
  },
  compact: bt,
  bordered: pt,
  borderless: ht
}, Ct = {
  table: "table-hover table-striped",
  thead: "table-light",
  th: "text-secondary",
  tbody: "",
  tr: "",
  td: "",
  tfoot: ""
}, gt = {
  table: "table-hover",
  thead: "",
  th: "text-muted",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "text-secondary"
}, vt = {
  table: "table-dark table-hover table-striped",
  thead: "table-dark",
  th: "",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-secondary"
}, St = {
  table: "table-dark table-striped-columns border-secondary",
  thead: "table-active",
  th: "text-light",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-secondary"
}, T = {
  default: {
    table: "table-hover table-striped",
    thead: "table-light",
    th: "",
    tbody: "",
    tr: "",
    td: "",
    tfoot: ""
  },
  light: Ct,
  extraLight: gt,
  dark: vt,
  extraDark: St
}, Dt = ({ inTable: l, inTheme: e = "default" } = {}) => {
  var o, r;
  const t = l, n = e || "default";
  if (t && (t.theme = n, t.classes = E({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (o = t.store) == null ? void 0 : o.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.tableElement))
    return t.render();
}, E = ({
  inLayout: l = "compact",
  inTheme: e = "default",
  inConfigClasses: t = {},
  inCustomClasses: n = {}
} = {}) => {
  const o = l || "compact", r = e || "default", a = t || {}, s = n || {}, u = A[o] || A.compact || {}, f = T[r] || T.default || {}, d = /* @__PURE__ */ new Set([
    ...Object.keys(u),
    ...Object.keys(f),
    ...Object.keys(a),
    ...Object.keys(s)
  ]), i = {};
  for (const c of d) {
    const m = [
      u[c],
      f[c],
      a[c],
      s[c]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    i[c] = Array.from(new Set(m)).join(" ");
  }
  return i;
}, wt = ({ inTable: l, inLayout: e = "compact" } = {}) => {
  var o, r;
  const t = l, n = e || "compact";
  if (t && (t.layout = n, t.classes = E({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (o = t.store) == null ? void 0 : o.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.tableElement))
    return t.render();
}, At = ({ inAlign: l = "" } = {}) => {
  const e = l;
  return e === "right" ? "text-end" : e === "center" ? "text-center" : "";
}, Tt = ({ inCell: l } = {}) => {
  const e = l;
  return String(typeof e == "object" && e !== null ? e.textContent ?? "" : e ?? "");
}, Et = ({ inCell: l, inDefaultClass: e = "" } = {}) => {
  const t = l, n = e, o = typeof t == "object" && t !== null, r = o && t.class !== void 0 ? t.class : n, a = o ? t.align : "", s = At({ inAlign: a }), u = [r, s].filter(Boolean).join(" ").trim(), f = u ? { class: u } : {}, i = { ...o && t.inAttributes ? t.inAttributes : {} };
  for (const [c, m] of Object.entries(f))
    i[c] = i[c] ? `${i[c]} ${m}`.trim() : m;
  return i;
}, Rt = ({ inCell: l, inCellTagName: e = "td", inDefaultClass: t = "" } = {}) => {
  const n = l, o = e, r = t, a = Tt({ inCell: n }), s = Et({ inCell: n, inDefaultClass: r });
  return {
    tagName: o,
    textContent: a,
    attributes: s
  };
}, R = ({
  inCellTagName: l = "td",
  inCells: e = [],
  inRowClass: t = "",
  inCellClass: n = "",
  inColumnsConfig: o
} = {}) => {
  const r = l, a = e, s = t, u = n, f = s ? { class: s } : {}, d = a.map((i) => Rt({
    inCell: i,
    inCellTagName: r,
    inDefaultClass: u
  }));
  return {
    tagName: "tr",
    attributes: f,
    children: d
  };
}, It = ({ inColumns: l = [], inClasses: e = {} } = {}) => {
  const t = l, n = e, o = t.map((s) => ({
    textContent: s.label,
    align: s.align,
    id: s.id
  })), r = R({
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
}, K = ({
  inColumns: l = [],
  inData: e = [],
  inRowConfig: t = {},
  inClasses: n = {},
  inColumnsConfig: o = []
} = {}) => {
  const r = l, a = e, s = n, u = Array.isArray(o) ? o : [];
  if (!Array.isArray(a) || a.length === 0) {
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
      attributes: s != null && s.tbody ? { class: s.tbody } : {},
      children: [i]
    };
  }
  const f = a.map((i) => {
    const c = r.map((m) => {
      var p, h, w, Q, N;
      const b = Array.isArray(u) ? u.find((Y) => Y.key === m.key) : void 0, y = ((h = (p = b == null ? void 0 : b.tbody) == null ? void 0 : p.td) == null ? void 0 : h.attributes) || ((Q = (w = b == null ? void 0 : b.tbody) == null ? void 0 : w.th) == null ? void 0 : Q.attributes);
      return {
        textContent: m.key === "amount" ? Number(i[m.key]).toFixed(2) : String(i[m.key] ?? ""),
        align: m.align,
        inAttributes: y,
        style: (N = b == null ? void 0 : b.th) == null ? void 0 : N.style
      };
    });
    return R({
      inCellTagName: "td",
      inCells: c,
      inRowClass: (s == null ? void 0 : s.tr) || "",
      inCellClass: (s == null ? void 0 : s.td) || ""
    });
  });
  return {
    tagName: "tbody",
    attributes: s != null && s.tbody ? { class: s.tbody } : {},
    children: f
  };
}, W = ({ inColumns: l = [], inComputedFooter: e = [], inClasses: t = {} } = {}) => {
  const n = l, o = e, r = t;
  if (!Array.isArray(o) || o.length === 0)
    return null;
  const a = o.map((u, f) => {
    const d = u.title || "", i = u.values || {}, c = f === o.length - 1, m = n.findIndex((y) => !y.isSerial), b = n.map((y, p) => {
      if (i[y.key] !== void 0) {
        const h = i[y.key];
        return {
          textContent: typeof h == "number" ? h.toFixed(2) : String(h),
          align: y.align || "right",
          class: c ? "fw-bold" : "fw-semibold"
        };
      }
      return p === m ? {
        textContent: d,
        class: c ? "fw-bold text-uppercase" : "fw-semibold text-uppercase"
      } : {
        textContent: "",
        class: ""
      };
    });
    return R({
      inCellTagName: "td",
      inCells: b,
      inRowClass: c ? "table-light" : (r == null ? void 0 : r.tr) || "",
      inCellClass: (r == null ? void 0 : r.td) || ""
    });
  });
  return {
    tagName: "tfoot",
    attributes: r != null && r.tfoot ? { class: r.tfoot } : {},
    children: a
  };
}, I = ({ inTableElement: l, inColumns: e = [], inData: t = [], inRowConfig: n = {}, inColumnsConfig: o = [], inClasses: r = {} } = {}) => {
  var p, h;
  const a = l, s = e, u = t, f = n, d = o, i = r;
  if (!a) return;
  const c = K({
    inColumns: s,
    inData: u,
    inRowConfig: f,
    inColumnsConfig: d,
    inClasses: i
  }), m = (h = (p = window.ks) == null ? void 0 : p["json-to-dom"]) == null ? void 0 : h.buildSpecElement;
  if (typeof m != "function") return;
  const b = m({ inSpec: c }), y = a.querySelector("tbody");
  y && b && y.replaceWith(b);
}, F = ({ inTableElement: l, inColumns: e = [], inComputedFooter: t = [], inClasses: n = {} } = {}) => {
  var c, m;
  const o = l, r = e, a = t, s = n;
  if (!o) return;
  const u = W({
    inColumns: r,
    inComputedFooter: a,
    inClasses: s
  }), f = (m = (c = window.ks) == null ? void 0 : c["json-to-dom"]) == null ? void 0 : m.buildSpecElement;
  if (typeof f != "function") return;
  const d = u ? f({ inSpec: u }) : null, i = o.querySelector("tfoot");
  i && d ? i.replaceWith(d) : i && !d ? i.remove() : !i && d && o.appendChild(d);
}, S = ({ inTableElement: l, inStore: e, inClasses: t = {} } = {}) => {
  var a, s, u, f;
  const n = l, o = e, r = t;
  !n || !o || (I({
    inTableElement: n,
    inColumns: o.activeColumns,
    inData: o.stateData,
    inRowConfig: (a = o.config) == null ? void 0 : a.row,
    inColumnsConfig: ((u = (s = o.source) == null ? void 0 : s.config) == null ? void 0 : u.columnsConfig) || ((f = o.config) == null ? void 0 : f.columnsConfig) || [],
    inClasses: r
  }), F({
    inTableElement: n,
    inColumns: o.activeColumns,
    inComputedFooter: o.computedFooter,
    inClasses: r
  }));
}, Ft = "table", jt = {}, kt = [], xt = {
  tagName: Ft,
  attributes: jt,
  children: kt
}, $ = ({
  inColumns: l = [],
  inData: e = [],
  inComputedFooter: t = [],
  inRowConfig: n = {},
  inClasses: o = {},
  inColumnsConfig: r
} = {}) => {
  const a = l, s = e, u = t, f = n, d = o, i = r, c = It({ inColumns: a, inClasses: d }), m = K({
    inColumns: a,
    inData: s,
    inRowConfig: f,
    inClasses: d,
    inColumnsConfig: i
  }), b = W({ inColumns: a, inComputedFooter: u, inClasses: d }), y = structuredClone(xt);
  return d != null && d.table && (y.attributes.class = d.table), y.children = [c, m, b].filter(Boolean), y;
}, C = ({ inTable: l } = {}) => {
  var o, r, a;
  const e = l;
  if (!(e != null && e.store))
    return null;
  const t = (r = (o = e.store.source) == null ? void 0 : o.config) == null ? void 0 : r.columnsConfig, n = $({
    inColumns: e.store.activeColumns,
    inData: e.store.stateData,
    inComputedFooter: e.store.computedFooter,
    inRowConfig: (a = e.store.config) == null ? void 0 : a.row,
    inClasses: e.classes,
    inColumnsConfig: t
  });
  return e.spec = n, n;
}, v = ({ inSpec: l } = {}) => {
  var u, f, d;
  const e = l;
  if (!e || typeof e != "object") return null;
  if (Array.isArray(e)) {
    const i = e.map((c) => v({ inSpec: c })).filter(Boolean);
    return i.length > 0 ? i : null;
  }
  const n = (Array.isArray(e.children) ? e.children : []).map((i) => v({ inSpec: i })).filter(Boolean), o = ((u = e.attributes) == null ? void 0 : u.id) || e.id, r = !!o, a = n.length > 0;
  if (!r && !a)
    return null;
  const s = {
    tagName: e.tagName
  };
  return o && (s.id = o), (f = e.attributes) != null && f.name && (s.name = e.attributes.name), (d = e.attributes) != null && d.type && (s.type = e.attributes.type), e.attributes && (s.attributes = e.attributes), n.length > 0 && (s.children = n), s;
}, V = async ({ inTable: l, inContainerId: e, inContainer: t, inQuery: n = {} } = {}) => {
  var b, y;
  const o = l, r = e, a = t, s = n;
  if (!o)
    return console.error("[json-to-dom-renderers:Table] Table instance (inTable) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Table instance (inTable) is required"
    };
  o.dataProvider && typeof o.load == "function" ? await o.load({ inQuery: s }) : C({ inTable: o });
  const u = o.spec || C({ inTable: o }), f = v({ inSpec: u }), d = (y = (b = window.ks) == null ? void 0 : b["json-to-dom"]) == null ? void 0 : y.buildSpecElement;
  if (typeof d != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: f,
      spec: u,
      element: null
    };
  const i = d({ inSpec: u }), c = Array.isArray(i) ? i[0] : i;
  let m = null;
  if (a instanceof HTMLElement)
    m = a;
  else {
    const p = r || o.containerId;
    p && (m = document.getElementById(p));
  }
  return m && (m.innerHTML = "", m.appendChild(c)), o.tableElement = c, o.controlsTree = f, {
    treeWithIds: f,
    spec: u,
    element: c,
    store: o.store
  };
}, M = ({ inTable: l, inContainerId: e, inContainer: t } = {}) => {
  var c, m;
  const n = l, o = e, r = t;
  if (!n)
    return console.error("[json-to-dom-renderers:Table] Table instance (inTable) is required to render structure."), null;
  const a = n.spec || C({ inTable: n }), s = v({ inSpec: a }), u = (m = (c = window.ks) == null ? void 0 : c["json-to-dom"]) == null ? void 0 : m.buildSpecElement;
  if (typeof u != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: s,
      spec: a,
      element: null
    };
  const f = u({ inSpec: a }), d = Array.isArray(f) ? f[0] : f;
  let i = null;
  if (r instanceof HTMLElement)
    i = r;
  else {
    const b = o || n.containerId;
    b && (i = document.getElementById(b));
  }
  return i && (i.innerHTML = "", i.appendChild(d)), n.tableElement = d, n.controlsTree = s, {
    treeWithIds: s,
    spec: a,
    element: d,
    store: n.store
  };
}, Qt = {
  repaintBody: I,
  repaintFoot: F,
  refreshTable: S,
  renderTable: V,
  renderStructure: M,
  buildSpec: C,
  buildTable: $
}, Nt = ({ inTable: l } = {}) => {
  const e = l;
  return {
    buildSpec: () => C({ inTable: e }),
    repaintBody: () => {
      var u;
      e != null && e.tableElement && I({
        inTableElement: e.tableElement,
        inColumns: e.store.activeColumns,
        inData: e.store.stateData,
        inRowConfig: (u = e.store.config) == null ? void 0 : u.row,
        inClasses: e.classes
      });
    },
    repaintFoot: () => {
      e != null && e.tableElement && F({
        inTableElement: e.tableElement,
        inColumns: e.store.activeColumns,
        inComputedFooter: e.store.computedFooter,
        inClasses: e.classes
      });
    },
    refreshTable: () => {
      e != null && e.tableElement && S({
        inTableElement: e.tableElement,
        inStore: e.store,
        inClasses: e.classes
      });
    },
    renderStructure: ({ inContainerId: u, inContainer: f, targetContainerId: d } = {}) => {
      const m = M({
        inTable: e,
        inContainerId: u || d,
        inContainer: f
      });
      return m != null && m.element && (e.tableElement = m.element, e.controlsTree = m.treeWithIds), m;
    },
    render: async ({ inContainerId: u, inContainer: f, targetContainerId: d, inQuery: i = {} } = {}) => {
      const y = await V({
        inTable: e,
        inContainerId: u || d,
        inContainer: f,
        inQuery: i
      });
      return y != null && y.element && (e.tableElement = y.element, e.controlsTree = y.treeWithIds), y;
    }
  };
}, j = ({ inTable: l, inQuery: e = "" } = {}) => {
  const t = l, n = e;
  !(t != null && t.tableElement) || !(t != null && t.store) || (t.store.filterOriginalData({ inQuery: n }), S({
    inTableElement: t.tableElement,
    inStore: t.store,
    inClasses: t.classes
  }));
}, k = ({ inTable: l, inQuery: e = "" } = {}) => {
  const t = l, n = e;
  !(t != null && t.tableElement) || !(t != null && t.store) || (t.store.filterStateData({ inQuery: n }), S({
    inTableElement: t.tableElement,
    inStore: t.store,
    inClasses: t.classes
  }));
}, H = ({ inTable: l, inQuery: e = "", inFromState: t = !1, query: n = "" } = {}) => {
  const o = l, r = e || n;
  t ? k({ inTable: o, inQuery: r }) : j({ inTable: o, inQuery: r });
}, g = async ({ inTable: l, inQuery: e = {} } = {}) => {
  var o, r;
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
    return console.warn("[json-to-dom-renderers:Table] Table.load called without a valid dataProvider.read implementation"), (o = t == null ? void 0 : t.store) == null ? void 0 : o.stateData;
  try {
    const a = await t.dataProvider.read({ inQuery: n }), s = Array.isArray(a) ? a : (a == null ? void 0 : a.data) || [];
    return t.store.updateData({ inData: s }), t.buildSpec(), s;
  } catch (a) {
    return console.error("[json-to-dom-renderers:Table] Failed to load records via dataProvider.read:", a), (r = t == null ? void 0 : t.store) == null ? void 0 : r.stateData;
  }
}, U = async ({ inTable: l, inQuery: e = {} } = {}) => {
  var o;
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.read != "function")
    return console.warn("[json-to-dom-renderers:Table] Table.loadSpec called without a valid dataProvider.read implementation"), (t == null ? void 0 : t.spec) || ((o = t == null ? void 0 : t.buildSpec) == null ? void 0 : o.call(t));
  try {
    const r = await t.dataProvider.read({ inQuery: n }), a = Array.isArray(r) ? r : (r == null ? void 0 : r.data) || [];
    return t.store.updateData({ inData: a }), t.buildSpec();
  } catch (r) {
    return console.error("[json-to-dom-renderers:Table] Failed to load spec via dataProvider.read:", r), t == null ? void 0 : t.spec;
  }
}, J = ({ inTable: l, inData: e = [] } = {}) => {
  const t = l, n = e;
  return t.store.updateData({ inData: n }), t.render();
}, z = async ({ inTable: l, inItem: e = {} } = {}) => {
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.create != "function")
    throw new Error("Table.createRecord requires a valid dataProvider.create implementation");
  const o = await t.dataProvider.create({ inItem: n });
  return await g({ inTable: t }), o;
}, G = async ({ inTable: l, inId: e = null, inItem: t = {} } = {}) => {
  const n = l, o = e, r = t;
  if (!(n != null && n.dataProvider) || typeof n.dataProvider.update != "function")
    throw new Error("Table.updateRecord requires a valid dataProvider.update implementation");
  const a = await n.dataProvider.update({ inId: o, inItem: r });
  return await g({ inTable: n }), a;
}, X = async ({ inTable: l, inId: e = null } = {}) => {
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.delete != "function")
    throw new Error("Table.deleteRecord requires a valid dataProvider.delete implementation");
  const o = await t.dataProvider.delete({ inId: n });
  return await g({ inTable: t }), o;
}, Lt = {
  load: g,
  loadSpec: U,
  update: J,
  createRecord: z,
  updateRecord: G,
  deleteRecord: X,
  filterTable: H,
  filterOriginalTable: j,
  filterStateTable: k
}, Ot = ({ inTable: l } = {}) => {
  const e = l;
  return {
    load: async ({ inQuery: i, query: c } = {}) => await g({
      inTable: e,
      inQuery: i ?? c ?? {}
    }),
    loadSpec: async ({ inQuery: i, query: c } = {}) => await U({
      inTable: e,
      inQuery: i ?? c ?? {}
    }),
    update: ({ inData: i, data: c } = {}) => J({ inTable: e, inData: i ?? c ?? [] }),
    createRecord: async ({ inItem: i, item: c } = {}) => await z({ inTable: e, inItem: i ?? c ?? {} }),
    updateRecord: async ({ inId: i, id: c = null, inItem: m, item: b = {} } = {}) => await G({ inTable: e, inId: i ?? c, inItem: m ?? b }),
    deleteRecord: async ({ inId: i, id: c = null } = {}) => await X({ inTable: e, inId: i ?? c }),
    filterOriginalData: ({ inQuery: i, query: c } = {}) => {
      j({ inTable: e, inQuery: i ?? c ?? "" });
    },
    filterStateData: ({ inQuery: i, query: c } = {}) => {
      k({ inTable: e, inQuery: i ?? c ?? "" });
    },
    filter: ({ inQuery: i, query: c, inFromState: m = !1 } = {}) => {
      H({
        inTable: e,
        inQuery: i ?? c ?? "",
        inFromState: m
      });
    }
  };
}, Pt = !0, Bt = {
  columns: []
}, qt = {
  striped: !0,
  hover: !0
}, Kt = [
  {
    id: "totals",
    title: "Total",
    type: "aggregate",
    values: {}
  }
], Wt = {
  table: "",
  thead: "",
  tfoot: "",
  th: "",
  tbody: "",
  tr: "",
  td: ""
}, x = {
  serial: Pt,
  head: Bt,
  row: qt,
  foot: Kt,
  classes: Wt
}, $t = () => structuredClone(x);
class D {
  constructor({
    data: e = [],
    columns: t = [],
    config: n = {},
    layout: o,
    theme: r,
    classes: a = {},
    dataProvider: s = null,
    targetContainerId: u = ""
  } = {}) {
    const f = e, d = t, i = n, c = o || (i == null ? void 0 : i.layout) || "compact", m = r || (i == null ? void 0 : i.theme) || "default", b = a, y = s, p = u;
    this.containerId = p, this.layout = c, this.theme = m, this.customClasses = b, this.classes = E({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: i == null ? void 0 : i.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = y, this.tableElement = null, this.controlsTree = null, this.store = new yt({
      inData: f,
      inColumns: d,
      inConfig: i
    }), this.methods = Nt({ inTable: this }), this.actions = Ot({ inTable: this }), this.spec = this.buildSpec();
  }
  setLayout({ layout: e = "compact", inLayout: t } = {}) {
    return wt({ inTable: this, inLayout: t || e || "compact" });
  }
  setTheme({ theme: e = "default", inTheme: t } = {}) {
    return Dt({ inTable: this, inTheme: t || e || "default" });
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
D.layouts = Object.keys(A);
D.themes = Object.keys(T);
D.configTemplate = x;
const Vt = "v1.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-table"] = {
  version: Vt,
  Table: D,
  methods: Qt,
  actions: Lt,
  templateConfig: x,
  getTemplateConfig: $t
};
export {
  D as Table,
  Lt as actions,
  D as default,
  $t as getTemplateConfig,
  Qt as methods,
  x as templateConfig,
  Vt as version
};
