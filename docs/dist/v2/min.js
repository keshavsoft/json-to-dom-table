const Z = ({ inData: l = [], inColumns: e = [], inConfig: t = {}, inTopN: n } = {}) => {
  const o = l, r = e, a = t, s = n;
  return {
    originalData: Array.isArray(o) ? typeof structuredClone == "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o)) : [],
    columns: Array.isArray(r) ? r : [],
    config: a || {},
    topN: s
  };
}, O = ({ inColumnsCatalog: l = [], inColumnKeys: e = [] } = {}) => {
  const t = l, n = e;
  if (Array.isArray(n) && n.length > 0) {
    const o = new Map((Array.isArray(t) ? t : []).map((s) => [s.key, s])), r = [], a = [];
    for (const s of n) {
      const c = o.get(s);
      c ? a.push(c) : r.push(s);
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
  var b, m;
  const o = l, r = e, a = t, s = n;
  if (!!!(a != null && a.serial || (b = a == null ? void 0 : a.table) != null && b.serial || (m = a == null ? void 0 : a.head) != null && m.serial))
    return {
      columns: o,
      data: r,
      isSerialEnabled: !1
    };
  const y = {
    key: "serial",
    label: s || typeof (a == null ? void 0 : a.serial) == "object" && a.serial.label || "#",
    align: "center",
    isSerial: !0
  }, u = (Array.isArray(o) ? o : []).some((p) => p.key === "serial") ? o : [y, ...Array.isArray(o) ? o : []], d = (Array.isArray(r) ? r : []).map((p, C) => ({
    serial: C + 1,
    ...p || {}
  }));
  return {
    columns: u,
    data: d,
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
}, P = {
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
    const c = Number(s == null ? void 0 : s[n]);
    return isNaN(c) ? a : (o++, a + c);
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
  var u, d;
  const n = l, o = e, r = t, a = P.rowKeys || {}, s = n.id ?? a.id, c = n.title ?? a.title, f = n.type ?? a.type, y = n.values ?? a.values, i = {};
  if (f === "aggregate") {
    const b = ((d = (u = P.types) == null ? void 0 : u.aggregate) == null ? void 0 : d.supportedFunctions) || [];
    Object.entries(y).forEach(([m, p]) => {
      if (!b.includes(p)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${p}" for column "${m}". Supported: [${b.join(", ")}]`
        );
        return;
      }
      const C = it[p];
      typeof C == "function" && (i[m] = C({ inData: o, inKey: m }));
    });
  } else f === "eval" && Object.entries(y).forEach(([b, m]) => {
    typeof m == "string" && (i[b] = ct({
      inExpression: m,
      inScope: r
    }));
  });
  return {
    id: s,
    title: c,
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
}, B = ({ inSource: l = {}, inResolveColumns: e } = {}) => {
  var c, f, y;
  const t = l, n = e, o = typeof n == "function" ? n({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (f = (c = t == null ? void 0 : t.config) == null ? void 0 : c.head) == null ? void 0 : f.columns
  }) : (t == null ? void 0 : t.columns) || [], r = _({
    inData: t == null ? void 0 : t.originalData
  }), a = tt({
    inColumns: o,
    inData: r,
    inConfig: t == null ? void 0 : t.config
  }), s = q({
    inData: a.data,
    inFooterConfig: (y = t == null ? void 0 : t.config) == null ? void 0 : y.foot
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
    for (const [s, c] of Object.entries(r))
      if (o.has(s) && c !== void 0 && c !== null) {
        const f = String(c).trim().toLowerCase();
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
}, ft = ({ inData: l = [], inQueryObject: e = {}, inActiveColumns: t = [] } = {}) => {
  const n = l, o = e, r = t;
  if (!Array.isArray(n)) return [];
  const a = o == null ? void 0 : o.type, s = o == null ? void 0 : o.value, c = Array.isArray(r) && r.length > 0 ? r.map((y) => typeof y == "object" && y !== null ? y.key : y).filter(Boolean) : null;
  if (a === "object") {
    const i = Object.entries(typeof s == "object" && s !== null ? s : {});
    return i.length === 0 ? [...n] : n.filter((u) => !u || typeof u != "object" ? !1 : i.every(([d, b]) => {
      const m = u[d];
      return m == null ? !1 : String(m).toLowerCase().includes(b);
    }));
  }
  const f = typeof s == "string" ? s : String(o ?? "").trim().toLowerCase();
  return f ? n.filter((y) => !y || typeof y != "object" ? !1 : (c ? c.map((u) => y[u]) : Object.values(y)).some((u) => u == null ? !1 : String(u).toLowerCase().includes(f))) : [...n];
}, yt = ({ inData: l = [], inIsEnabled: e = !1 } = {}) => {
  const t = l;
  return !e || !Array.isArray(t) ? t : t.map((o, r) => ({
    ...o,
    serial: r + 1
  }));
}, K = ({ inStore: l, inData: e = [], inQuery: t = "" } = {}) => {
  var d;
  const n = l, o = e, r = t, a = n.library.activeColumns, s = n.library.isSerialEnabled, c = (d = n.source.config) == null ? void 0 : d.foot, f = dt({
    inQuery: r,
    inActiveColumns: a
  }), y = ft({
    inData: o,
    inQueryObject: f,
    inActiveColumns: a
  }), i = yt({
    inData: y,
    inIsEnabled: s
  }), u = q({
    inData: i,
    inFooterConfig: c
  });
  return n.library.stateData = i, n.library.computedFooter = u, {
    activeColumns: n.library.activeColumns,
    stateData: n.library.stateData,
    computedFooter: n.library.computedFooter
  };
};
class mt {
  constructor({ inData: e = [], inColumns: t = [], inConfig: n = {} } = {}) {
    const o = e, r = t, a = n;
    this.source = Z({
      inData: o,
      inColumns: r,
      inConfig: a
    }), this.library = B({
      inSource: this.source,
      inResolveColumns: O
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
    return this.source.originalData = Array.isArray(t) ? t : [], this.library = B({
      inSource: this.source,
      inResolveColumns: O
    }), this.library.stateData;
  }
  filterOriginalData({ inQuery: e = "" } = {}) {
    const t = e;
    return K({
      inStore: this,
      inData: this.source.originalData,
      inQuery: t
    });
  }
  filterStateData({ inQuery: e = "" } = {}) {
    const t = e;
    return K({
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
}, Ct = {
  table: "table table-borderless table-sm align-middle",
  thead: "border-bottom",
  th: "text-uppercase fw-semibold",
  tbody: "",
  tr: "",
  td: "",
  tfoot: "border-top fw-bold"
}, R = {
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
  borderless: Ct
}, ht = {
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
}, j = {
  default: {
    table: "table-hover table-striped",
    thead: "table-light",
    th: "",
    tbody: "",
    tr: "",
    td: "",
    tfoot: ""
  },
  light: ht,
  extraLight: gt,
  dark: vt,
  extraDark: St
}, At = ({ inTable: l, inTheme: e = "default" } = {}) => {
  var o, r;
  const t = l, n = e || "default";
  if (t && (t.theme = n, t.classes = I({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (o = t.store) == null ? void 0 : o.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.tableElement))
    return t.render();
}, I = ({
  inLayout: l = "compact",
  inTheme: e = "default",
  inConfigClasses: t = {},
  inCustomClasses: n = {}
} = {}) => {
  const o = l || "compact", r = e || "default", a = t || {}, s = n || {}, c = R[o] || R.compact || {}, f = j[r] || j.default || {}, y = /* @__PURE__ */ new Set([
    ...Object.keys(c),
    ...Object.keys(f),
    ...Object.keys(a),
    ...Object.keys(s)
  ]), i = {};
  for (const u of y) {
    const d = [
      c[u],
      f[u],
      a[u],
      s[u]
    ].filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
    i[u] = Array.from(new Set(d)).join(" ");
  }
  return i;
}, wt = ({ inTable: l, inLayout: e = "compact" } = {}) => {
  var o, r;
  const t = l, n = e || "compact";
  if (t && (t.layout = n, t.classes = I({
    inLayout: t.layout,
    inTheme: t.theme,
    inConfigClasses: (r = (o = t.store) == null ? void 0 : o.config) == null ? void 0 : r.classes,
    inCustomClasses: t.customClasses
  }), t.tableElement))
    return t.render();
}, Dt = ({ inCaption: l } = {}) => {
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
}, Tt = ({ inCol: l, inColGroupConfig: e } = {}) => {
  const t = l, n = e;
  if (!n)
    return null;
  const o = (t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.id) ?? "";
  if (Array.isArray(n)) {
    const r = n.find((a) => {
      const s = (a == null ? void 0 : a.key) ?? (a == null ? void 0 : a.id) ?? "";
      return s && s === o;
    });
    if (r)
      return r.width ?? r.style ?? null;
  }
  return typeof n == "object" && !Array.isArray(n) && o && n[o] ? n[o] : null;
}, Et = ({ inCol: l, inColGroupConfig: e } = {}) => {
  const t = l, n = e, o = {}, r = (t == null ? void 0 : t.key) ?? (t == null ? void 0 : t.id) ?? "";
  if (Array.isArray(n)) {
    const s = n.find((c) => {
      const f = (c == null ? void 0 : c.key) ?? (c == null ? void 0 : c.id) ?? "";
      return f && f === r;
    });
    s && (s.span && (o.span = s.span), s.class && (o.class = s.class), s.attributes && typeof s.attributes == "object" && Object.assign(o, s.attributes));
  }
  const a = Tt({ inCol: t, inColGroupConfig: n });
  if (a) {
    const s = a.includes(":") ? a : `width: ${a};`;
    o.style = o.style ? `${o.style} ${s}`.trim() : s;
  }
  return o;
}, Rt = ({ inColumns: l = [], inColGroupConfig: e } = {}) => {
  const t = l, n = e;
  return n ? {
    tagName: "colgroup",
    children: t.map((r) => ({
      tagName: "col",
      attributes: Et({
        inCol: r,
        inColGroupConfig: n
      })
    }))
  } : null;
}, jt = ({ inAlign: l = "" } = {}) => {
  const e = l;
  return e === "right" ? "text-end" : e === "center" ? "text-center" : "";
}, It = ({ inCell: l } = {}) => {
  const e = l;
  return String(typeof e == "object" && e !== null ? e.textContent ?? "" : e ?? "");
}, Ft = ({ inCell: l, inDefaultClass: e = "" } = {}) => {
  const t = l, n = e, o = typeof t == "object" && t !== null, r = o && t.class !== void 0 ? t.class : n, a = o ? t.align : "", s = jt({ inAlign: a }), c = [r, s].filter(Boolean).join(" ").trim(), f = c ? { class: c } : {}, i = { ...o && t.inAttributes ? t.inAttributes : {} };
  for (const [u, d] of Object.entries(f))
    i[u] = i[u] ? `${i[u]} ${d}`.trim() : d;
  return i;
}, kt = ({ inCell: l, inCellTagName: e = "td", inDefaultClass: t = "" } = {}) => {
  const n = l, o = e, r = t, a = It({ inCell: n }), s = Ft({ inCell: n, inDefaultClass: r });
  return {
    tagName: o,
    textContent: a,
    attributes: s
  };
}, F = ({
  inCellTagName: l = "td",
  inCells: e = [],
  inRowClass: t = "",
  inCellClass: n = "",
  inColumnsConfig: o
} = {}) => {
  const r = l, a = e, s = t, c = n, f = s ? { class: s } : {}, y = a.map((i) => kt({
    inCell: i,
    inCellTagName: r,
    inDefaultClass: c
  }));
  return {
    tagName: "tr",
    attributes: f,
    children: y
  };
}, xt = ({ inColumns: l = [], inClasses: e = {} } = {}) => {
  const t = l, n = e, o = t.map((s) => ({
    textContent: s.label,
    align: s.align,
    id: s.id
  })), r = F({
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
}, $ = ({
  inColumns: l = [],
  inData: e = [],
  inRowConfig: t = {},
  inClasses: n = {},
  inColumnsConfig: o = []
} = {}) => {
  const r = l, a = e, s = n, c = Array.isArray(o) ? o : [];
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
    const u = r.map((d) => {
      var p, C, h, A, w;
      const b = Array.isArray(c) ? c.find((g) => g.key === d.key) : void 0, m = ((C = (p = b == null ? void 0 : b.tbody) == null ? void 0 : p.td) == null ? void 0 : C.attributes) || ((A = (h = b == null ? void 0 : b.tbody) == null ? void 0 : h.th) == null ? void 0 : A.attributes);
      return {
        textContent: d.key === "amount" ? Number(i[d.key]).toFixed(2) : String(i[d.key] ?? ""),
        align: d.align,
        inAttributes: m,
        style: (w = b == null ? void 0 : b.th) == null ? void 0 : w.style
      };
    });
    return F({
      inCellTagName: "td",
      inCells: u,
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
  const a = o.map((c, f) => {
    const y = c.title || "", i = c.values || {}, u = f === o.length - 1, d = n.findIndex((m) => !m.isSerial), b = n.map((m, p) => {
      if (i[m.key] !== void 0) {
        const C = i[m.key];
        return {
          textContent: typeof C == "number" ? C.toFixed(2) : String(C),
          align: m.align || "right",
          class: u ? "fw-bold" : "fw-semibold"
        };
      }
      return p === d ? {
        textContent: y,
        class: u ? "fw-bold text-uppercase" : "fw-semibold text-uppercase"
      } : {
        textContent: "",
        class: ""
      };
    });
    return F({
      inCellTagName: "td",
      inCells: b,
      inRowClass: u ? "table-light" : (r == null ? void 0 : r.tr) || "",
      inCellClass: (r == null ? void 0 : r.td) || ""
    });
  });
  return {
    tagName: "tfoot",
    attributes: r != null && r.tfoot ? { class: r.tfoot } : {},
    children: a
  };
}, k = ({ inTableElement: l, inColumns: e = [], inData: t = [], inRowConfig: n = {}, inColumnsConfig: o = [], inClasses: r = {} } = {}) => {
  var p, C;
  const a = l, s = e, c = t, f = n, y = o, i = r;
  if (!a) return;
  const u = $({
    inColumns: s,
    inData: c,
    inRowConfig: f,
    inColumnsConfig: y,
    inClasses: i
  }), d = (C = (p = window.ks) == null ? void 0 : p["json-to-dom"]) == null ? void 0 : C.buildSpecElement;
  if (typeof d != "function") return;
  const b = d({ inSpec: u }), m = a.querySelector("tbody");
  m && b && m.replaceWith(b);
}, x = ({ inTableElement: l, inColumns: e = [], inComputedFooter: t = [], inClasses: n = {} } = {}) => {
  var u, d;
  const o = l, r = e, a = t, s = n;
  if (!o) return;
  const c = W({
    inColumns: r,
    inComputedFooter: a,
    inClasses: s
  }), f = (d = (u = window.ks) == null ? void 0 : u["json-to-dom"]) == null ? void 0 : d.buildSpecElement;
  if (typeof f != "function") return;
  const y = c ? f({ inSpec: c }) : null, i = o.querySelector("tfoot");
  i && y ? i.replaceWith(y) : i && !y ? i.remove() : !i && y && o.appendChild(y);
}, T = ({ inTableElement: l, inStore: e, inClasses: t = {} } = {}) => {
  var a, s, c, f;
  const n = l, o = e, r = t;
  !n || !o || (k({
    inTableElement: n,
    inColumns: o.activeColumns,
    inData: o.stateData,
    inRowConfig: (a = o.config) == null ? void 0 : a.row,
    inColumnsConfig: ((c = (s = o.source) == null ? void 0 : s.config) == null ? void 0 : c.columnsConfig) || ((f = o.config) == null ? void 0 : f.columnsConfig) || [],
    inClasses: r
  }), x({
    inTableElement: n,
    inColumns: o.activeColumns,
    inComputedFooter: o.computedFooter,
    inClasses: r
  }));
}, Nt = "table", Qt = {}, Lt = [], Ot = {
  tagName: Nt,
  attributes: Qt,
  children: Lt
}, G = ({
  inColumns: l = [],
  inData: e = [],
  inComputedFooter: t = [],
  inRowConfig: n = {},
  inClasses: o = {},
  inColumnsConfig: r,
  inColGroupConfig: a,
  inCaptionConfig: s
} = {}) => {
  const c = l, f = e, y = t, i = n, u = o, d = r, b = a, p = Dt({ inCaption: s }), C = Rt({
    inColumns: c,
    inColGroupConfig: b
  }), h = xt({ inColumns: c, inClasses: u }), A = $({
    inColumns: c,
    inData: f,
    inRowConfig: i,
    inClasses: u,
    inColumnsConfig: d
  }), w = W({
    inColumns: c,
    inComputedFooter: y,
    inClasses: u
  }), g = structuredClone(Ot);
  return u != null && u.table && (g.attributes.class = u.table), g.children = [p, C, h, A, w].filter(Boolean), g;
}, v = ({ inTable: l } = {}) => {
  var a, s, c, f, y;
  const e = l;
  if (!(e != null && e.store))
    return null;
  const t = (s = (a = e.store.source) == null ? void 0 : a.config) == null ? void 0 : s.columnsConfig, n = (c = e.store.config) == null ? void 0 : c.colgroup, o = (f = e.store.config) == null ? void 0 : f.caption, r = G({
    inColumns: e.store.activeColumns,
    inData: e.store.stateData,
    inComputedFooter: e.store.computedFooter,
    inRowConfig: (y = e.store.config) == null ? void 0 : y.row,
    inClasses: e.classes,
    inColumnsConfig: t,
    inColGroupConfig: n,
    inCaptionConfig: o
  });
  return e.spec = r, r;
}, D = ({ inSpec: l } = {}) => {
  var c, f, y;
  const e = l;
  if (!e || typeof e != "object") return null;
  if (Array.isArray(e)) {
    const i = e.map((u) => D({ inSpec: u })).filter(Boolean);
    return i.length > 0 ? i : null;
  }
  const n = (Array.isArray(e.children) ? e.children : []).map((i) => D({ inSpec: i })).filter(Boolean), o = ((c = e.attributes) == null ? void 0 : c.id) || e.id, r = !!o, a = n.length > 0;
  if (!r && !a)
    return null;
  const s = {
    tagName: e.tagName
  };
  return o && (s.id = o), (f = e.attributes) != null && f.name && (s.name = e.attributes.name), (y = e.attributes) != null && y.type && (s.type = e.attributes.type), e.attributes && (s.attributes = e.attributes), n.length > 0 && (s.children = n), s;
}, V = async ({ inTable: l, inContainerId: e, inContainer: t, inQuery: n = {} } = {}) => {
  var b, m;
  const o = l, r = e, a = t, s = n;
  if (!o)
    return console.error("[json-to-dom-renderers:Table] Table instance (inTable) is required to render."), {
      treeWithIds: null,
      spec: null,
      element: null,
      error: "Table instance (inTable) is required"
    };
  o.dataProvider && typeof o.load == "function" ? await o.load({ inQuery: s }) : v({ inTable: o });
  const c = o.spec || v({ inTable: o }), f = D({ inSpec: c }), y = (m = (b = window.ks) == null ? void 0 : b["json-to-dom"]) == null ? void 0 : m.buildSpecElement;
  if (typeof y != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: f,
      spec: c,
      element: null
    };
  const i = y({ inSpec: c }), u = Array.isArray(i) ? i[0] : i;
  let d = null;
  if (a instanceof HTMLElement)
    d = a;
  else {
    const p = r || o.containerId;
    p && (d = document.getElementById(p));
  }
  return d && (d.innerHTML = "", d.appendChild(u)), o.tableElement = u, o.controlsTree = f, {
    treeWithIds: f,
    spec: c,
    element: u,
    store: o.store
  };
}, M = ({ inTable: l, inContainerId: e, inContainer: t } = {}) => {
  var u, d;
  const n = l, o = e, r = t;
  if (!n)
    return console.error("[json-to-dom-renderers:Table] Table instance (inTable) is required to render structure."), null;
  const a = n.spec || v({ inTable: n }), s = D({ inSpec: a }), c = (d = (u = window.ks) == null ? void 0 : u["json-to-dom"]) == null ? void 0 : d.buildSpecElement;
  if (typeof c != "function")
    return console.error("json-to-dom buildSpecElement not found on window.ks"), {
      treeWithIds: s,
      spec: a,
      element: null
    };
  const f = c({ inSpec: a }), y = Array.isArray(f) ? f[0] : f;
  let i = null;
  if (r instanceof HTMLElement)
    i = r;
  else {
    const b = o || n.containerId;
    b && (i = document.getElementById(b));
  }
  return i && (i.innerHTML = "", i.appendChild(y)), n.tableElement = y, n.controlsTree = s, {
    treeWithIds: s,
    spec: a,
    element: y,
    store: n.store
  };
}, Pt = {
  repaintBody: k,
  repaintFoot: x,
  refreshTable: T,
  renderTable: V,
  renderStructure: M,
  buildSpec: v,
  buildTable: G
}, Bt = ({ inTable: l } = {}) => {
  const e = l;
  return {
    buildSpec: () => v({ inTable: e }),
    repaintBody: () => {
      var c;
      e != null && e.tableElement && k({
        inTableElement: e.tableElement,
        inColumns: e.store.activeColumns,
        inData: e.store.stateData,
        inRowConfig: (c = e.store.config) == null ? void 0 : c.row,
        inClasses: e.classes
      });
    },
    repaintFoot: () => {
      e != null && e.tableElement && x({
        inTableElement: e.tableElement,
        inColumns: e.store.activeColumns,
        inComputedFooter: e.store.computedFooter,
        inClasses: e.classes
      });
    },
    refreshTable: () => {
      e != null && e.tableElement && T({
        inTableElement: e.tableElement,
        inStore: e.store,
        inClasses: e.classes
      });
    },
    renderStructure: ({ inContainerId: c, inContainer: f, targetContainerId: y } = {}) => {
      const d = M({
        inTable: e,
        inContainerId: c || y,
        inContainer: f
      });
      return d != null && d.element && (e.tableElement = d.element, e.controlsTree = d.treeWithIds), d;
    },
    render: async ({ inContainerId: c, inContainer: f, targetContainerId: y, inQuery: i = {} } = {}) => {
      const m = await V({
        inTable: e,
        inContainerId: c || y,
        inContainer: f,
        inQuery: i
      });
      return m != null && m.element && (e.tableElement = m.element, e.controlsTree = m.treeWithIds), m;
    }
  };
}, N = ({ inTable: l, inQuery: e = "" } = {}) => {
  const t = l, n = e;
  !(t != null && t.tableElement) || !(t != null && t.store) || (t.store.filterOriginalData({ inQuery: n }), T({
    inTableElement: t.tableElement,
    inStore: t.store,
    inClasses: t.classes
  }));
}, Q = ({ inTable: l, inQuery: e = "" } = {}) => {
  const t = l, n = e;
  !(t != null && t.tableElement) || !(t != null && t.store) || (t.store.filterStateData({ inQuery: n }), T({
    inTableElement: t.tableElement,
    inStore: t.store,
    inClasses: t.classes
  }));
}, H = ({ inTable: l, inQuery: e = "", inFromState: t = !1, query: n = "" } = {}) => {
  const o = l, r = e || n;
  t ? Q({ inTable: o, inQuery: r }) : N({ inTable: o, inQuery: r });
}, S = async ({ inTable: l, inQuery: e = {} } = {}) => {
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
  return await S({ inTable: t }), o;
}, X = async ({ inTable: l, inId: e = null, inItem: t = {} } = {}) => {
  const n = l, o = e, r = t;
  if (!(n != null && n.dataProvider) || typeof n.dataProvider.update != "function")
    throw new Error("Table.updateRecord requires a valid dataProvider.update implementation");
  const a = await n.dataProvider.update({ inId: o, inItem: r });
  return await S({ inTable: n }), a;
}, Y = async ({ inTable: l, inId: e = null } = {}) => {
  const t = l, n = e;
  if (!(t != null && t.dataProvider) || typeof t.dataProvider.delete != "function")
    throw new Error("Table.deleteRecord requires a valid dataProvider.delete implementation");
  const o = await t.dataProvider.delete({ inId: n });
  return await S({ inTable: t }), o;
}, Kt = {
  load: S,
  loadSpec: U,
  update: J,
  createRecord: z,
  updateRecord: X,
  deleteRecord: Y,
  filterTable: H,
  filterOriginalTable: N,
  filterStateTable: Q
}, qt = ({ inTable: l } = {}) => {
  const e = l;
  return {
    load: async ({ inQuery: i, query: u } = {}) => await S({
      inTable: e,
      inQuery: i ?? u ?? {}
    }),
    loadSpec: async ({ inQuery: i, query: u } = {}) => await U({
      inTable: e,
      inQuery: i ?? u ?? {}
    }),
    update: ({ inData: i, data: u } = {}) => J({ inTable: e, inData: i ?? u ?? [] }),
    createRecord: async ({ inItem: i, item: u } = {}) => await z({ inTable: e, inItem: i ?? u ?? {} }),
    updateRecord: async ({ inId: i, id: u = null, inItem: d, item: b = {} } = {}) => await X({ inTable: e, inId: i ?? u, inItem: d ?? b }),
    deleteRecord: async ({ inId: i, id: u = null } = {}) => await Y({ inTable: e, inId: i ?? u }),
    filterOriginalData: ({ inQuery: i, query: u } = {}) => {
      N({ inTable: e, inQuery: i ?? u ?? "" });
    },
    filterStateData: ({ inQuery: i, query: u } = {}) => {
      Q({ inTable: e, inQuery: i ?? u ?? "" });
    },
    filter: ({ inQuery: i, query: u, inFromState: d = !1 } = {}) => {
      H({
        inTable: e,
        inQuery: i ?? u ?? "",
        inFromState: d
      });
    }
  };
}, $t = !0, Wt = {
  columns: []
}, Gt = {
  striped: !0,
  hover: !0
}, Vt = [
  {
    id: "totals",
    title: "Total",
    type: "aggregate",
    values: {}
  }
], Mt = {
  table: "",
  thead: "",
  tfoot: "",
  th: "",
  tbody: "",
  tr: "",
  td: ""
}, L = {
  serial: $t,
  head: Wt,
  row: Gt,
  foot: Vt,
  classes: Mt
}, Ht = () => structuredClone(L);
class E {
  constructor({
    data: e = [],
    columns: t = [],
    config: n = {},
    layout: o,
    theme: r,
    classes: a = {},
    dataProvider: s = null,
    targetContainerId: c = ""
  } = {}) {
    const f = e, y = t, i = n, u = o || (i == null ? void 0 : i.layout) || "compact", d = r || (i == null ? void 0 : i.theme) || "default", b = a, m = s, p = c;
    this.containerId = p, this.layout = u, this.theme = d, this.customClasses = b, this.classes = I({
      inLayout: this.layout,
      inTheme: this.theme,
      inConfigClasses: i == null ? void 0 : i.classes,
      inCustomClasses: this.customClasses
    }), this.dataProvider = m, this.tableElement = null, this.controlsTree = null, this.store = new mt({
      inData: f,
      inColumns: y,
      inConfig: i
    }), this.methods = Bt({ inTable: this }), this.actions = qt({ inTable: this }), this.spec = this.buildSpec();
  }
  setLayout({ layout: e = "compact", inLayout: t } = {}) {
    return wt({ inTable: this, inLayout: t || e || "compact" });
  }
  setTheme({ theme: e = "default", inTheme: t } = {}) {
    return At({ inTable: this, inTheme: t || e || "default" });
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
E.layouts = Object.keys(R);
E.themes = Object.keys(j);
E.configTemplate = L;
const Ut = "v2.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-table"] = {
  version: Ut,
  Table: E,
  methods: Pt,
  actions: Kt,
  templateConfig: L,
  getTemplateConfig: Ht
};
export {
  E as Table,
  Kt as actions,
  E as default,
  Ht as getTemplateConfig,
  Pt as methods,
  L as templateConfig,
  Ut as version
};
