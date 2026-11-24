// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = {
	version: "1.8.1",
	description: "Class-based table instance manager with integrated event hooking"
}, r = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom ??= {}, globalThis.ks.jsonToDom.table ??= {}, globalThis.ks.jsonToDom.table.v8 = {
		meta: n,
		Table: e
	}, globalThis.ks.jsonToDom.table.build = {
		meta: n,
		Table: e
	});
}, i = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.type;
	if (n === void 0) throw Error("Missing compulsory key: \"type\"");
	if (typeof n != "string") throw TypeError("type must be a string");
	return !0;
}, a = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.data;
	if (n === void 0) throw Error("Missing compulsory key: \"data\"");
	if (!Array.isArray(n)) throw TypeError("data must be an Array");
	return !0;
}, o = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.columns;
	if (n === void 0) throw Error("Missing compulsory key: \"columns\"");
	if (!Array.isArray(n)) throw TypeError("columns must be an Array");
	return !0;
}, s = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.showLog;
	if (n !== void 0 && typeof n != "boolean") throw TypeError("showLog must be a boolean");
	return !0;
}, c = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return i(t), a(t), o(t), s(t), !0;
}, l = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.targetHtmlId;
	if (n === void 0) throw Error("Missing compulsory key: \"targetHtmlId\"");
	if (typeof n != "string") throw TypeError("targetHtmlId must be a string");
	if (n.trim().length === 0) throw Error("targetHtmlId must be a non-empty string");
	return !0;
}, u = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.appendPosition;
	if (n === void 0) throw Error("Missing compulsory key: \"appendPosition\"");
	if (typeof n != "string") throw TypeError("appendPosition must be a string");
	return !0;
}, d = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.classToApply;
	if (n === void 0) throw Error("Missing compulsory key: \"classToApply\"");
	if (typeof n != "string") throw TypeError("classToApply must be a string");
	return !0;
}, f = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return l(t), u(t), d(t), !0;
}, p = {
	type: "table",
	targetHtmlId: "",
	data: [],
	columns: [],
	classToApply: "",
	appendPosition: "replace",
	showLog: !1
}, m = (e) => {
	let t = typeof e == "object" && e ? e.inKey ?? e.key : e;
	return t && t in p ? p[t] : { ...p };
};
Object.assign(m, p);
// node_modules/json-renderers-guard/src/v5/index.js
var h = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return c(t), f(t), !0;
};
h.getSpec = m, h.configSpec = p, h.guardSpec = c, h.guardMount = f;
// node_modules/@keshavsoft/json-to-dom/src/v42/register/meta.js
var g = {
	version: "42.1.4",
	name: "json-to-dom"
}, ee = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: g,
		appendToDom: e
	});
}, te = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, _ = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: te,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, ne = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => y({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, v = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = ne({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, y = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? ne({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? v({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, re = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, ie = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, ae = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, oe = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, se = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, ce = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, le = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	re({
		inNode: r,
		inErrors: a
	}) && (ie({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ae({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), oe({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), se({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ce({
		inNode: r,
		inErrors: a
	}));
}, ue = {
	table: {
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: { initialize: "serialRoot" }
			}
		},
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			options: { serial: { showSerial: "serialChild" } }
		}
	},
	select: { simple: {
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"],
		options: {}
	} },
	dataList: { simple: {
		baseFromSpec: "dataListSimple",
		instructions: ["buildDataListWithOptions"],
		options: {}
	} },
	selectOptionsOnly: { simple: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"],
		options: {}
	} },
	searchInput: { simple: {
		baseFromSpec: "searchInputBase",
		instructions: [],
		options: {}
	} },
	form: { simple: {
		baseFromSpec: "formSimple",
		instructions: ["buildFormField"],
		options: {}
	} },
	accordion: {
		simple: {
			baseFromSpec: "accordionSimple",
			instructions: ["buildAccordionItems"],
			options: {}
		},
		flush: {
			baseFromSpec: "accordionFlush",
			instructions: ["buildAccordionItems"],
			options: {}
		}
	},
	card: {
		simple: {
			baseFromSpec: "cardSimple",
			instructions: ["buildCardBody"],
			options: {}
		},
		withHeader: {
			baseFromSpec: "cardWithHeader",
			instructions: ["buildCardHeader", "buildCardBody"],
			options: {}
		},
		withFooter: {
			baseFromSpec: "cardWithFooter",
			instructions: [
				"buildCardHeader",
				"buildCardBody",
				"buildCardFooter"
			],
			options: {}
		},
		imageTop: {
			baseFromSpec: "cardImageTop",
			instructions: ["buildCardBody"],
			options: {}
		}
	},
	list: {
		simple: {
			baseFromSpec: "listSimple",
			instructions: ["buildListItems"],
			options: {}
		},
		group: {
			baseFromSpec: "listGroup",
			instructions: ["buildListGroupItems"],
			options: {}
		},
		ordered: {
			baseFromSpec: "listOrdered",
			instructions: ["buildListGroupItems"],
			options: {}
		}
	},
	menu: {
		simple: {
			baseFromSpec: "menuSimple",
			instructions: ["buildMenuItems"],
			options: {}
		},
		cards: {
			baseFromSpec: "menuCardsBase",
			instructions: ["buildMenuCards"],
			options: {}
		}
	}
}, b = {
	tableSearchBar: {
		tagName: "div",
		attributes: { class: "row mb-3 align-items-center" },
		children: [
			{
				tagName: "div",
				attributes: { class: "col-md-4 d-flex align-items-center" },
				children: [{
					tagName: "h6",
					attributes: {
						class: "mb-0 fw-semibold text-secondary",
						id: "table-title"
					},
					textContent: "Items"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
				children: [{
					tagName: "span",
					attributes: {
						id: "search-feedback",
						class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
					},
					textContent: "Showing all records"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4" },
				children: [{
					tagName: "div",
					attributes: { class: "input-group" },
					children: [{
						tagName: "span",
						attributes: { class: "input-group-text bg-white" },
						children: [{
							tagName: "i",
							attributes: { class: "bi bi-search" },
							textContent: "🔍"
						}]
					}, {
						tagName: "input",
						attributes: {
							type: "text",
							id: "tableSearch",
							class: "form-control",
							placeholder: "Search table..."
						}
					}]
				}]
			}
		]
	},
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-withSearch-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-withSearch-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableBodyOnly: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-tag-id"
		},
		children: [{
			tagName: "tbody",
			attributes: {
				"data-role": "table-body",
				id: "table-body-id"
			},
			children: []
		}]
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-colgroup-id"
				},
				children: []
			}, {
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-row-id"
					},
					children: []
				}]
			}]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	},
	searchToolbar: {
		tagName: "div",
		attributes: {
			class: "row mb-3 align-items-center",
			"data-role": "search-toolbar"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 d-flex align-items-center",
					"data-role": "search-label-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 text-center d-flex align-items-center justify-content-center",
					"data-role": "search-helper-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4",
					"data-role": "search-input-slot"
				},
				children: []
			}
		]
	},
	searchLabel: {
		tagName: "h6",
		textContent: "Items",
		attributes: {
			class: "mb-0 fw-semibold text-secondary",
			id: "table-title"
		}
	},
	searchHelper: {
		tagName: "span",
		textContent: "Showing all records",
		attributes: {
			id: "search-feedback",
			class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
		}
	},
	searchInput: {
		tagName: "div",
		attributes: { class: "input-group" },
		children: [{
			tagName: "span",
			attributes: { class: "input-group-text bg-white" },
			children: [{
				tagName: "i",
				attributes: { class: "bi bi-search" },
				textContent: "🔍"
			}]
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "tableSearch",
				class: "form-control",
				placeholder: "Search table..."
			}
		}]
	},
	optionsEditButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "edit",
			attributes: { class: "btn btn-secondary btn-sm ks-btn-edit" }
		}]
	},
	optionsDeleteButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "delete",
			attributes: { class: "btn btn-danger btn-sm ks-btn-delete" }
		}]
	},
	headerForEditOption: {
		tagName: "th",
		textContent: "edit",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	headerForDeleteOption: {
		tagName: "th",
		textContent: "delete",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForEditOption: {
		tagName: "col",
		attributes: { width: "80px" }
	},
	colGroupForDeleteOption: {
		tagName: "col",
		attributes: { width: "90px" }
	},
	tableWithFooterParent: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-footer-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-with-footer-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-with-footer-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-with-footer-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-with-footer-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-with-footer-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-with-footer-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-with-footer-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithSearchAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-search-footer-parent-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-with-footer-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-with-footer-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-with-footer-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-with-footer-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-with-footer-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-with-footer-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-with-footer-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	accordionSimple: {
		tagName: "div",
		attributes: {
			class: "accordion shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	accordionFlush: {
		tagName: "div",
		attributes: {
			class: "accordion accordion-flush shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	buildAccordionItem: {
		tagName: "div",
		attributes: {
			class: "accordion-item",
			"data-role": "accordion-item"
		},
		children: [{
			tagName: "h2",
			attributes: {
				class: "accordion-header",
				id: "heading-${id}"
			},
			children: [{
				tagName: "button",
				attributes: {
					class: "accordion-button collapsed",
					type: "button",
					"data-bs-toggle": "collapse",
					"data-bs-target": "#collapse-${id}",
					"aria-expanded": "false",
					"aria-controls": "collapse-${id}"
				},
				textContent: "${title}"
			}]
		}, {
			tagName: "div",
			attributes: {
				id: "collapse-${id}",
				class: "accordion-collapse collapse",
				"aria-labelledby": "heading-${id}",
				"data-bs-parent": "#accordion-parent-id",
				"data-role": "accordion-collapse"
			},
			children: [{
				tagName: "div",
				attributes: { class: "accordion-body text-secondary" },
				textContent: "${content}"
			}]
		}]
	},
	cardSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithHeader: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-header bg-white py-3 fw-bold border-bottom",
				"data-role": "card-header"
			},
			children: []
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithFooter: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 fw-bold border-bottom",
					"data-role": "card-header"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					"data-role": "card-body"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light py-3 border-top",
					"data-role": "card-footer"
				},
				children: []
			}
		]
	},
	cardImageTop: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3 overflow-hidden",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "img",
			attributes: {
				class: "card-img-top",
				src: "${imageSrc}",
				alt: "${imageAlt}",
				"data-role": "card-img"
			}
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	buildCardBodyTemplate: {
		tagName: "div",
		attributes: { class: "card-content" },
		children: [{
			tagName: "h5",
			attributes: { class: "card-title fw-bold text-dark mb-2" },
			textContent: "${title}"
		}, {
			tagName: "p",
			attributes: { class: "card-text text-secondary mb-3" },
			textContent: "${text}"
		}]
	},
	buildCardHeaderTemplate: {
		tagName: "span",
		attributes: { class: "card-header-title text-dark" },
		textContent: "${headerTitle}"
	},
	buildCardFooterTemplate: {
		tagName: "small",
		attributes: { class: "text-muted" },
		textContent: "${footerText}"
	},
	listSimple: {
		tagName: "ul",
		attributes: {
			class: "list-unstyled mb-0",
			id: "list-parent-id",
			"data-role": "list-parent"
		},
		children: []
	},
	listGroup: {
		tagName: "ul",
		attributes: {
			class: "list-group shadow-sm",
			id: "list-group-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	listOrdered: {
		tagName: "ol",
		attributes: {
			class: "list-group list-group-numbered shadow-sm",
			id: "list-ordered-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	menuSimple: {
		tagName: "ul",
		attributes: {
			class: "nav nav-pills flex-column bg-white p-3 rounded-3 shadow-sm border",
			id: "menu-parent-id",
			"data-role": "menu-parent"
		},
		children: []
	},
	menuCardsBase: {
		tagName: "div",
		attributes: {
			class: "row g-4",
			id: "menu-cards-parent-id",
			"data-role": "menu-cards-parent"
		},
		children: []
	},
	buildListItemTemplate: {
		tagName: "li",
		attributes: {
			class: "py-2 px-3 border-bottom d-flex align-items-center text-secondary",
			"data-role": "list-item"
		},
		textContent: "${text}"
	},
	buildListGroupItemTemplate: {
		tagName: "li",
		attributes: {
			class: "list-group-item d-flex justify-content-between align-items-center py-3",
			"data-role": "list-group-item"
		},
		children: [{
			tagName: "span",
			textContent: "${text}"
		}, {
			tagName: "span",
			attributes: { class: "badge bg-primary rounded-pill px-3 py-2" },
			textContent: "${badge}"
		}]
	},
	buildMenuItemTemplate: {
		tagName: "li",
		attributes: {
			class: "nav-item mb-1",
			"data-role": "menu-item"
		},
		children: [{
			tagName: "a",
			attributes: {
				class: "nav-link text-dark fw-medium",
				href: "${href}"
			},
			textContent: "${text}"
		}]
	},
	buildMenuCardItemTemplate: {
		tagName: "div",
		attributes: {
			class: "col-md-4 col-sm-6",
			"data-role": "menu-card-col"
		},
		children: [{
			tagName: "div",
			attributes: { class: "card h-100 shadow-sm border rounded-3" },
			children: [{
				tagName: "div",
				attributes: { class: "card-body p-4 d-flex flex-column" },
				children: [
					{
						tagName: "h5",
						attributes: { class: "card-title fw-bold text-primary mb-2" },
						textContent: "${title}"
					},
					{
						tagName: "p",
						attributes: { class: "card-text text-muted small flex-grow-1" },
						textContent: "${description}"
					},
					{
						tagName: "a",
						attributes: {
							class: "btn btn-outline-primary btn-sm mt-3",
							href: "${href}"
						},
						textContent: "${actionText}"
					}
				]
			}]
		}]
	}
}, x = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, de = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, fe = {
	buildColgroup: {
		type: "single",
		narration: "Build column widths",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		}
	},
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}],
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'form-body']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		}
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: {
			fileName: "base",
			filePath: []
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		}
	},
	searchFrame: [{
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	}],
	searchLabel: [{
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-label-slot']"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	}],
	searchHelper: [{
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-helper-slot']"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	}],
	searchInput: [{
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-input-slot']"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	}],
	serialRoot: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	serialChild: [{
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshiftSerialToRows",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	}],
	optionsShowButton: [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	optionsEditButton: [
		{
			narration: "Append edit column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	optionsDeleteButton: [
		{
			narration: "Append delete column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-body']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-header']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-footer']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, pe = {
	name: "spec-repo",
	version: "1.17.1"
};
// node_modules/spec-repo/src/v19/index.js
(({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: pe,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
})({
	spec: b,
	tags: x,
	tagsSchema: de,
	instructions: fe,
	definitions: ue
});
// node_modules/json-to-tag-validate/src/v4/index.js
function me({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? x, a = [];
	return y({
		inSpec: r,
		inFunc: (e) => {
			le({
				inNode: e,
				inCatalog: i,
				inErrors: a
			});
		}
	}), {
		isValid: a.length === 0,
		errors: a
	};
}
// node_modules/@keshavsoft/json-to-tag/src/v12/element/createElement.js
var he = "http://www.w3.org/2000/svg", ge = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), _e = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return ge.has(t) ? document.createElementNS(he, t) : document.createElement(t);
}, ve = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), ye = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), be = "http://www.w3.org/1999/xlink", xe = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(be, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, Se = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, Ce = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = _e({ inTagName: e.tagName });
	return t ? (ve({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), ye({
		inElement: t,
		inProperties: e.properties
	}), xe({
		inElement: t,
		inAttributes: e.attributes
	}), Se({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, we = (e = {}) => y({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: Ce
});
_({
	buildSpecElement: we,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = me({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), y({
			inSpec: t,
			inFunc: Ce
		});
	}
});
// node_modules/spec-to-dom/src/v2/register/meta.js
var Te = {
	version: "2.1.1",
	name: "spec-to-dom"
}, Ee = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: Te,
		appendToDom: e
	});
}, De = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
Ee(De);
// node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var Oe = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => De({
	buildSpec: we(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
ee(Oe);
// node_modules/json-renderers-build-table-events/src/v2/state.js
var ke = ({ container: e, dataset: t = [], columns: n = [], options: r = {}, renderTable: i = null, onSearch: a = null, onRowClick: o = null, onRowAction: s = null, onSave: c = null, showLog: l = !1 } = {}) => ({
	container: e,
	dataset: [...t],
	filteredData: [...t],
	columns: n,
	options: r,
	renderTable: i,
	selectedIndex: -1,
	onSearch: a,
	onRowClick: o,
	onRowAction: s,
	onSave: c,
	showLog: l
}), Ae = [
	{
		event: "input",
		selector: "input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input",
		action: "onSearch"
	},
	{
		event: "click",
		selector: "tfoot button, button.ks-btn-save, [data-role='table-save']",
		action: "onFooterSave"
	},
	{
		event: "click",
		selector: "tbody button, button.ks-btn-show, [data-role='row-action']",
		action: "onRowAction"
	},
	{
		event: "click",
		selector: "tbody tr",
		action: "onRowClick"
	}
], je = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, Me = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: je,
		runInstructions: e
	});
}, Ne = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, Pe = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, Fe = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: i }) => {
	let a = Ne({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), o = Pe(n, r), s = i[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof s != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return s(a, o, r);
}, Ie = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, Le = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, Re = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, ze = /* @__PURE__ */ t({
	closest: () => Ie,
	querySelector: () => Le,
	querySelectorAll: () => Re
}), Be = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, Ve = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, He = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? Ve(e, {}, n) : Be(e, {}, n);
		o[r] = s;
	}), o;
}, Ue = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = Ve(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, We = /* @__PURE__ */ t({
	mapNamedValues: () => Ue,
	mapValues: () => He,
	readText: () => Be,
	readValue: () => Ve
}), Ge = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, Ke = /* @__PURE__ */ t({ isKey: () => Ge }), qe = {
	...ze,
	...We,
	...Ke
}, Je = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = Fe({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: qe
		});
	}
	return r;
}, S = Je;
Me(Je);
// node_modules/dom-traversal-functions/src/v3/table/header/instructions.json
var Ye = [{
	narration: "Find search input control if event came from within header container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "input, form, div" }
}, {
	narration: "Read search query value from input",
	sourcePath: { fileName: "previous" },
	func: "readValue"
}], Xe = (e) => e ? (S(e.target || e, Ye) || "").trim().toLowerCase() : "", Ze = /* @__PURE__ */ t({
	default: () => Xe,
	getSearchQuery: () => Xe,
	instructions: () => Ye
}), C = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, Qe = (e, t = "") => {
	let n = C(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, $e = (e, t = "table-primary", n = "") => {
	let r = C(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, et = [
	{
		narration: "Find closest body table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	},
	{
		narration: "Collect all data cells from row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "td" }
	},
	{
		narration: "Map collected cell values to columns using clientData",
		sourcePath: { fileName: "previous" },
		func: "mapValues",
		arguments: { read: "text" }
	}
], tt = (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
	let i = C(e);
	if (!i) return null;
	let a = Qe(i, r);
	return n && Array.isArray(n) && a >= 0 && a < n.length ? n[a] : S(i, et, { columns: t.map((e) => typeof e == "string" ? e : e.columnName || e.field) }) || {};
}, nt = /* @__PURE__ */ t({
	getRowData: () => tt,
	getRowElement: () => C,
	getRowIndex: () => Qe,
	highlightRow: () => $e,
	instructions: () => et
}), rt = [
	{
		narration: "Find closest footer table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tfoot tr" }
	},
	{
		narration: "Collect all input and select controls in footer row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "input, select" }
	},
	{
		narration: "Map named control values into object",
		sourcePath: { fileName: "previous" },
		func: "mapNamedValues"
	}
], it = (e, t = []) => {
	let n = C(e);
	if (!n) return {};
	let r = S(n, rt);
	if (r && typeof r == "object" && Object.keys(r).length > 0) return r;
	let i = {};
	return t && t.length > 0 && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.columnName || e.field, r = n.querySelector(`input[name="${t}"], select[name="${t}"]`) || n.querySelector(`input#${t}, select#${t}`);
		r && (i[t] = r.value.trim());
	}), i;
}, at = (e) => {
	let t = C(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
}, w = {
	header: Ze,
	body: nt,
	footer: /* @__PURE__ */ t({
		clearRowInputs: () => at,
		getFooterData: () => it,
		instructions: () => rt
	})
}, ot = {
	name: "dom-traversal-functions",
	version: "1.3.1"
};
// node_modules/dom-traversal-functions/src/v3/index.js
((e) => {
	let t = e;
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks.domTraversal ??= {}, globalThis.ks.domTraversal = {
		meta: ot,
		...t
	});
})({ table: w });
// node_modules/json-renderers-build-table-events/src/v2/actions/onSearch/instructions.json
var st = [{
	narration: "From search input, find component container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "[data-role='table-parent'], .card-body, .container, div" }
}, {
	narration: "Locate search feedback display element",
	sourcePath: { fileName: "previous" },
	func: "querySelector",
	arguments: { selector: "#search-feedback, [data-role='search-feedback']" }
}], ct = (e, t, n) => {
	let r = w?.header?.getSearchQuery ? w.header.getSearchQuery(t) : (t?.value || "").trim().toLowerCase(), i = r ? n.dataset.filter((e) => Object.values(e).some((e) => String(e ?? "").toLowerCase().includes(r))) : n.dataset;
	n.filteredData = i, typeof n.renderTable == "function" && n.renderTable(i);
	let a = S(t, st);
	a && (a.textContent = r ? `Showing ${i.length} of ${n.dataset.length} records matching "${t.value.trim()}".` : `Showing all ${n.dataset.length} records.`), typeof n.onSearch == "function" && n.onSearch(r, i);
}, lt = [{
	narration: "From clicked element, traverse to closest tbody table row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tbody tr" }
}], ut = (e, t, n) => {
	let r = S(t, lt);
	if (!r || !n.container.contains(r)) return;
	r.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
		e.classList.remove("table-primary", "table-active");
	}), r.classList.add("table-primary");
	let i = w?.body?.getRowIndex ? w.body.getRowIndex(r) : Array.from(r.parentElement.children).indexOf(r), a = n.filteredData[i] || n.dataset[i];
	n.selectedIndex = i, typeof n.onRowClick == "function" && a && n.onRowClick(a, i);
}, dt = [{
	narration: "From clicked button, traverse to closest tbody table row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tbody tr" }
}], ft = (e, t, n) => {
	e.stopPropagation();
	let r = t.closest("button"), i = S(t, dt);
	if (!r || !i || !n.container.contains(i)) return;
	i.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
		e.classList.remove("table-primary", "table-active");
	}), i.classList.add("table-primary");
	let a = w?.body?.getRowIndex ? w.body.getRowIndex(i) : Array.from(i.parentElement.children).indexOf(i), o = n.filteredData[a] || n.dataset[a];
	n.selectedIndex = a;
	let s = r.dataset.action || r.textContent.trim().toLowerCase() || "show";
	typeof n.onRowAction == "function" && o && n.onRowAction(s, o, a);
}, pt = [{
	narration: "From clicked save button, traverse to closest tfoot row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tfoot tr" }
}], mt = (e, t, n) => {
	let r = S(t, pt);
	if (!r || !n.container.contains(r)) return;
	let i = w?.footer?.getFooterData ? w.footer.getFooterData(r, n.columns) : {};
	i && Object.keys(i).length !== 0 || r.querySelectorAll("input, select").forEach((e) => {
		let t = e.id || e.name;
		t && (i[t] = e.value);
	}), w?.footer?.clearRowInputs ? w.footer.clearRowInputs(r) : r.querySelectorAll("input").forEach((e) => e.value = ""), n.dataset.push(i), n.filteredData.push(i), typeof n.renderTable == "function" && n.renderTable(n.filteredData), typeof n.onSave == "function" && n.onSave(i, n.dataset);
}, ht = /* @__PURE__ */ t({
	onFooterSave: () => mt,
	onRowAction: () => ft,
	onRowClick: () => ut,
	onSearch: () => ct
}), T = (e, t) => {
	e.addEventListener("input", (n) => {
		for (let r of Ae) {
			if (r.event !== "input") continue;
			let i = n.target.closest(r.selector);
			if (i && e.contains(i)) {
				let e = ht[r.action];
				typeof e == "function" && e(n, i, t);
				return;
			}
		}
	}), e.addEventListener("click", (n) => {
		for (let r of Ae) {
			if (r.event !== "click") continue;
			let i = n.target.closest(r.selector);
			if (i && e.contains(i)) {
				let e = ht[r.action];
				typeof e == "function" && e(n, i, t);
				return;
			}
		}
	});
}, gt = {
	name: "json-renderers-build-table-events",
	version: "v1"
}, _t = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.tableEvents = {
		meta: gt,
		...e
	});
}, vt = (e = {}) => {
	let t = typeof e.container == "string" ? document.getElementById(e.container) : e.container;
	if (!t) return e.showLog && console.warn("[json-renderers-build-table-events] Container not found:", e.container), null;
	let n = ke({
		...e,
		container: t
	});
	return T(t, n), { getState: () => ({ ...n }) };
};
_t({ hookTableEvents: vt });
// node_modules/json-renderers-build-table/src/v57/registerGlobal/meta.js
var yt = {
	name: "json-renderers-build-table",
	version: "1.57.0"
}, bt = ({ render: e, hookEvents: t }) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.table = {
		meta: yt,
		render: e,
		hookEvents: t
	});
}, E = {
	table: {
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: { initialize: "serialRoot" }
			}
		},
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			options: { serial: { showSerial: "serialChild" } }
		}
	},
	select: { simple: {
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"],
		options: {}
	} },
	dataList: { simple: {
		baseFromSpec: "dataListSimple",
		instructions: ["buildDataListWithOptions"],
		options: {}
	} },
	selectOptionsOnly: { simple: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"],
		options: {}
	} },
	searchInput: { simple: {
		baseFromSpec: "searchInputBase",
		instructions: [],
		options: {}
	} },
	form: { simple: {
		baseFromSpec: "formSimple",
		instructions: ["buildFormField"],
		options: {}
	} },
	accordion: {
		simple: {
			baseFromSpec: "accordionSimple",
			instructions: ["buildAccordionItems"],
			options: {}
		},
		flush: {
			baseFromSpec: "accordionFlush",
			instructions: ["buildAccordionItems"],
			options: {}
		}
	},
	card: {
		simple: {
			baseFromSpec: "cardSimple",
			instructions: ["buildCardBody"],
			options: {}
		},
		withHeader: {
			baseFromSpec: "cardWithHeader",
			instructions: ["buildCardHeader", "buildCardBody"],
			options: {}
		},
		withFooter: {
			baseFromSpec: "cardWithFooter",
			instructions: [
				"buildCardHeader",
				"buildCardBody",
				"buildCardFooter"
			],
			options: {}
		},
		imageTop: {
			baseFromSpec: "cardImageTop",
			instructions: ["buildCardBody"],
			options: {}
		}
	},
	list: {
		simple: {
			baseFromSpec: "listSimple",
			instructions: ["buildListItems"],
			options: {}
		},
		group: {
			baseFromSpec: "listGroup",
			instructions: ["buildListGroupItems"],
			options: {}
		},
		ordered: {
			baseFromSpec: "listOrdered",
			instructions: ["buildListGroupItems"],
			options: {}
		}
	},
	menu: {
		simple: {
			baseFromSpec: "menuSimple",
			instructions: ["buildMenuItems"],
			options: {}
		},
		cards: {
			baseFromSpec: "menuCardsBase",
			instructions: ["buildMenuCards"],
			options: {}
		}
	}
}, xt = {
	name: "declarative-definitions",
	version: "1.0.1"
};
// node_modules/declarative-definitions/src/v2/index.js
((e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.definitions = {
		meta: xt,
		data: e
	});
})(E);
var St = {
	tableSearchBar: {
		tagName: "div",
		attributes: { class: "row mb-3 align-items-center" },
		children: [
			{
				tagName: "div",
				attributes: { class: "col-md-4 d-flex align-items-center" },
				children: [{
					tagName: "h6",
					attributes: {
						class: "mb-0 fw-semibold text-secondary",
						id: "table-title"
					},
					textContent: "Items"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
				children: [{
					tagName: "span",
					attributes: {
						id: "search-feedback",
						class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
					},
					textContent: "Showing all records"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4" },
				children: [{
					tagName: "div",
					attributes: { class: "input-group" },
					children: [{
						tagName: "span",
						attributes: { class: "input-group-text bg-white" },
						children: [{
							tagName: "i",
							attributes: { class: "bi bi-search" },
							textContent: "🔍"
						}]
					}, {
						tagName: "input",
						attributes: {
							type: "text",
							id: "tableSearch",
							class: "form-control",
							placeholder: "Search table..."
						}
					}]
				}]
			}
		]
	},
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-withSearch-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-withSearch-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableBodyOnly: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-tag-id"
		},
		children: [{
			tagName: "tbody",
			attributes: {
				"data-role": "table-body",
				id: "table-body-id"
			},
			children: []
		}]
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-colgroup-id"
				},
				children: []
			}, {
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-row-id"
					},
					children: []
				}]
			}]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	},
	searchToolbar: {
		tagName: "div",
		attributes: {
			class: "row mb-3 align-items-center",
			"data-role": "search-toolbar"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 d-flex align-items-center",
					"data-role": "search-label-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 text-center d-flex align-items-center justify-content-center",
					"data-role": "search-helper-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4",
					"data-role": "search-input-slot"
				},
				children: []
			}
		]
	},
	searchLabel: {
		tagName: "h6",
		textContent: "Items",
		attributes: {
			class: "mb-0 fw-semibold text-secondary",
			id: "table-title"
		}
	},
	searchHelper: {
		tagName: "span",
		textContent: "Showing all records",
		attributes: {
			id: "search-feedback",
			class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
		}
	},
	searchInput: {
		tagName: "div",
		attributes: { class: "input-group" },
		children: [{
			tagName: "span",
			attributes: { class: "input-group-text bg-white" },
			children: [{
				tagName: "i",
				attributes: { class: "bi bi-search" },
				textContent: "🔍"
			}]
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "tableSearch",
				class: "form-control",
				placeholder: "Search table..."
			}
		}]
	},
	optionsEditButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "edit",
			attributes: { class: "btn btn-secondary btn-sm ks-btn-edit" }
		}]
	},
	optionsDeleteButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "delete",
			attributes: { class: "btn btn-danger btn-sm ks-btn-delete" }
		}]
	},
	headerForEditOption: {
		tagName: "th",
		textContent: "edit",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	headerForDeleteOption: {
		tagName: "th",
		textContent: "delete",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForEditOption: {
		tagName: "col",
		attributes: { width: "80px" }
	},
	colGroupForDeleteOption: {
		tagName: "col",
		attributes: { width: "90px" }
	},
	tableWithFooterParent: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-footer-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-with-footer-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-with-footer-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-with-footer-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-with-footer-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-with-footer-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-with-footer-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-with-footer-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithSearchAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-search-footer-parent-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-with-footer-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-with-footer-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-with-footer-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-with-footer-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-with-footer-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-with-footer-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-with-footer-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	accordionSimple: {
		tagName: "div",
		attributes: {
			class: "accordion shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	accordionFlush: {
		tagName: "div",
		attributes: {
			class: "accordion accordion-flush shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	buildAccordionItem: {
		tagName: "div",
		attributes: {
			class: "accordion-item",
			"data-role": "accordion-item"
		},
		children: [{
			tagName: "h2",
			attributes: {
				class: "accordion-header",
				id: "heading-${id}"
			},
			children: [{
				tagName: "button",
				attributes: {
					class: "accordion-button collapsed",
					type: "button",
					"data-bs-toggle": "collapse",
					"data-bs-target": "#collapse-${id}",
					"aria-expanded": "false",
					"aria-controls": "collapse-${id}"
				},
				textContent: "${title}"
			}]
		}, {
			tagName: "div",
			attributes: {
				id: "collapse-${id}",
				class: "accordion-collapse collapse",
				"aria-labelledby": "heading-${id}",
				"data-bs-parent": "#accordion-parent-id",
				"data-role": "accordion-collapse"
			},
			children: [{
				tagName: "div",
				attributes: { class: "accordion-body text-secondary" },
				textContent: "${content}"
			}]
		}]
	},
	cardSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithHeader: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-header bg-white py-3 fw-bold border-bottom",
				"data-role": "card-header"
			},
			children: []
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithFooter: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 fw-bold border-bottom",
					"data-role": "card-header"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					"data-role": "card-body"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light py-3 border-top",
					"data-role": "card-footer"
				},
				children: []
			}
		]
	},
	cardImageTop: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3 overflow-hidden",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "img",
			attributes: {
				class: "card-img-top",
				src: "${imageSrc}",
				alt: "${imageAlt}",
				"data-role": "card-img"
			}
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	buildCardBodyTemplate: {
		tagName: "div",
		attributes: { class: "card-content" },
		children: [{
			tagName: "h5",
			attributes: { class: "card-title fw-bold text-dark mb-2" },
			textContent: "${title}"
		}, {
			tagName: "p",
			attributes: { class: "card-text text-secondary mb-3" },
			textContent: "${text}"
		}]
	},
	buildCardHeaderTemplate: {
		tagName: "span",
		attributes: { class: "card-header-title text-dark" },
		textContent: "${headerTitle}"
	},
	buildCardFooterTemplate: {
		tagName: "small",
		attributes: { class: "text-muted" },
		textContent: "${footerText}"
	},
	listSimple: {
		tagName: "ul",
		attributes: {
			class: "list-unstyled mb-0",
			id: "list-parent-id",
			"data-role": "list-parent"
		},
		children: []
	},
	listGroup: {
		tagName: "ul",
		attributes: {
			class: "list-group shadow-sm",
			id: "list-group-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	listOrdered: {
		tagName: "ol",
		attributes: {
			class: "list-group list-group-numbered shadow-sm",
			id: "list-ordered-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	menuSimple: {
		tagName: "ul",
		attributes: {
			class: "nav nav-pills flex-column bg-white p-3 rounded-3 shadow-sm border",
			id: "menu-parent-id",
			"data-role": "menu-parent"
		},
		children: []
	},
	menuCardsBase: {
		tagName: "div",
		attributes: {
			class: "row g-4",
			id: "menu-cards-parent-id",
			"data-role": "menu-cards-parent"
		},
		children: []
	},
	buildListItemTemplate: {
		tagName: "li",
		attributes: {
			class: "py-2 px-3 border-bottom d-flex align-items-center text-secondary",
			"data-role": "list-item"
		},
		textContent: "${text}"
	},
	buildListGroupItemTemplate: {
		tagName: "li",
		attributes: {
			class: "list-group-item d-flex justify-content-between align-items-center py-3",
			"data-role": "list-group-item"
		},
		children: [{
			tagName: "span",
			textContent: "${text}"
		}, {
			tagName: "span",
			attributes: { class: "badge bg-primary rounded-pill px-3 py-2" },
			textContent: "${badge}"
		}]
	},
	buildMenuItemTemplate: {
		tagName: "li",
		attributes: {
			class: "nav-item mb-1",
			"data-role": "menu-item"
		},
		children: [{
			tagName: "a",
			attributes: {
				class: "nav-link text-dark fw-medium",
				href: "${href}"
			},
			textContent: "${text}"
		}]
	},
	buildMenuCardItemTemplate: {
		tagName: "div",
		attributes: {
			class: "col-md-4 col-sm-6",
			"data-role": "menu-card-col"
		},
		children: [{
			tagName: "div",
			attributes: { class: "card h-100 shadow-sm border rounded-3" },
			children: [{
				tagName: "div",
				attributes: { class: "card-body p-4 d-flex flex-column" },
				children: [
					{
						tagName: "h5",
						attributes: { class: "card-title fw-bold text-primary mb-2" },
						textContent: "${title}"
					},
					{
						tagName: "p",
						attributes: { class: "card-text text-muted small flex-grow-1" },
						textContent: "${description}"
					},
					{
						tagName: "a",
						attributes: {
							class: "btn btn-outline-primary btn-sm mt-3",
							href: "${href}"
						},
						textContent: "${actionText}"
					}
				]
			}]
		}]
	}
}, Ct = {
	buildColgroup: {
		type: "single",
		narration: "Build column widths",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		}
	},
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}],
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'form-body']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		}
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: {
			fileName: "base",
			filePath: []
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		}
	},
	searchFrame: [{
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	}],
	searchLabel: [{
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-label-slot']"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	}],
	searchHelper: [{
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-helper-slot']"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	}],
	searchInput: [{
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-input-slot']"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	}],
	serialRoot: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	serialChild: [{
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshiftSerialToRows",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	}],
	optionsShowButton: [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	optionsEditButton: [
		{
			narration: "Append edit column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	optionsDeleteButton: [
		{
			narration: "Append delete column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-body']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-header']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-footer']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, wt = (e) => typeof e == "object" && !!e && !Array.isArray(e), Tt = (e, t) => {
	if (!wt(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = D(t, i);
	return n;
}, Et = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => D(t, e));
}, Dt = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Ot = (e, t) => Dt(e, t), kt = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, At = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, jt = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: At,
		applyTemplate: e
	});
}, D = (e, t, n) => {
	let r = e, i = t;
	kt(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Dt(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Ot(a?.textContent, r)), "attributes" in a && (a.attributes = Tt(a?.attributes, r)), "children" in a && (a.children = Et(a?.children, r))), a);
};
jt(D);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Mt = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Nt = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Pt = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Nt,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Ft = (e, t) => {
	let n = e, r = t;
	return Mt(n, r), n.map((e) => D(e, r));
};
Pt((e, t) => {
	let n = e;
	return Mt(n, t), n.map((e) => D(e, e[t]));
}, Ft);
// node_modules/json-transformer-funcs-two-dimensions/src/v9/index.js
var It = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = D(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? Ft(a, r) : [], i;
}), Lt = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => It({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), Rt = ({ columns: e = [], data: t = [], rows: n, columnSpec: r, rowSpec: i } = {}) => {
	let a = n ?? (Array.isArray(t) ? t : t?.data ?? t?.rows ?? []);
	return It({
		outer: e,
		outerSpec: r,
		innerSpec: i,
		getInner: (e) => Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : a.map((t) => ({
			...t,
			rowValue: t[e.columnName] ?? t.value ?? t
		}))
	});
}, zt = (e) => Array.isArray(e) ? e : [e], Bt = (e, t, n) => {
	e[t] = n;
}, Vt = {
	set: Bt,
	push: (e, t, n) => {
		e[t].push(...zt(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...zt(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(zt(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(zt(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Ht = Object.defineProperty, Ut = Object.getOwnPropertySymbols, Wt = Object.prototype.hasOwnProperty, Gt = Object.prototype.propertyIsEnumerable, Kt = Math.pow, qt = (e, t, n) => t in e ? Ht(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Jt = (e, t) => {
	for (var n in t ||= {}) Wt.call(t, n) && qt(e, n, t[n]);
	if (Ut) for (var n of Ut(t)) Gt.call(t, n) && qt(e, n, t[n]);
	return e;
}, Yt = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, Xt = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, O = () => void 0, Zt = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = j(e);
		return r === j(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = A(e), a = A(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, Qt = (e, t, n = O) => {
	let r = [];
	if (!Zt(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Zt($t(e.x, t), $t(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !k(o, i) || !k(a, i)) return !1;
			let s = a[i];
			if (!k(o, i) || !Zt(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, k = (e, t) => Object.prototype.hasOwnProperty.call(e, t), $t = (e, t) => k(e, t) ? e[t] : void 0, en = 16383, tn = 1e3, A = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > tn) throw new Xt(`Member name too long (maximum ${tn} characters)`);
	return t;
}, j = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, nn = (e) => e instanceof RangeError && /call stack/i.test(e.message), M = (e) => Array.isArray(e), rn = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), N = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, P = (e) => typeof e == "number", F = (e) => typeof e == "string", an = (e) => e === void 0, I = (e) => e !== void 0;
function on(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function sn(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function cn(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var ln = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function un(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Rr }, a = Rr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", h = "size", g = "empty", ee = "true", te = "false", _ = "null", ne = /^[,\]]/, v = /^[+\-]/, y = /^[*\/]/, re = /^[a-zA-Z_]/, ie = /^[\x80-\uFFFF_]/, ae = /^[a-zA-Z0-9_]/, oe = /^[0-9@$\-]/, se = /^[^\/\\]/, ce = /^[gimsuy]/, le = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ue = /^[\uD800-\uDBFF]/, b = /^[\uDC00-\uDFFF]/, x = /^[0-9]/, de = /^[1-9]/, fe = /^[eE]/, pe = /^["\\]/, me = /^['\\]/, he = /^[ -\uD7FF\uE000-\uFFFF]/, ge = /^[dD]/, _e = /^[89abAB]/, ve = /^[c-fC-F]/, ye = /^[0-9a-fA-F]/, be = /^[ \t\n\r]/, xe = J([",", "]"], !1, !1, !1), Se = q("length", !1), Ce = q("count", !1), we = q("match", !1), Te = q("search", !1), Ee = q("value", !1), De = J(["+", "-"], !1, !1, !1), Oe = J(["*", "/"], !1, !1, !1), ke = Nr("string"), Ae = J([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), je = J([["", "￿"], "_"], !1, !1, !1), Me = J([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Ne = q("-", !1), Pe = J([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Fe = q("$", !1), Ie = q("@", !1), Le = q("..", !1), Re = q(".", !1), ze = q("*", !1), Be = q("&&", !1), Ve = q("||", !1), He = q("!", !1), Ue = q("==", !1), We = q("!=", !1), Ge = q(">=", !1), Ke = q(">", !1), qe = q("<=", !1), Je = q("<", !1), S = q("=~", !1), Ye = q("in", !1), Xe = q("nin", !1), Ze = q("subsetof", !1), C = q("anyof", !1), Qe = q("noneof", !1), $e = q("sizeof", !1), et = q("size", !1), tt = q("empty", !1), nt = q("true", !1), rt = q("false", !1), it = q("null", !1), at = q("{", !1), w = q("}", !1), ot = q("[", !1), st = q("]", !1), ct = q(":", !1), lt = q(",", !1), ut = q("(", !1), dt = q(")", !1), ft = q("?", !1), pt = Nr("regex"), mt = q("/", !1), ht = J(["/", "\\"], !0, !1, !1), T = q("\\", !1), gt = jr(), _t = J([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), vt = J([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), yt = J([["\ud800", "\udbff"]], !1, !1, !1), bt = J([["\udc00", "\udfff"]], !1, !1, !1), E = J([["0", "9"]], !1, !1, !1), xt = Nr("number"), St = q("0", !1), Ct = J([["1", "9"]], !1, !1, !1), wt = Nr("integer"), Tt = J(["e", "E"], !1, !1, !1), Et = q("\"", !1), Dt = q("'", !1), Ot = J(["\"", "\\"], !1, !1, !1), kt = J(["'", "\\"], !1, !1, !1), At = J([[" ", "퟿"], ["", "￿"]], !1, !1, !1), jt = q("b", !1), D = q("f", !1), Mt = q("n", !1), Nt = q("r", !1), Pt = q("t", !1), Ft = q("u", !1), It = J(["d", "D"], !1, !1, !1), Lt = J([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Rt = q("\\u", !1), zt = J([["c", "f"], ["C", "F"]], !1, !1, !1), Bt = J([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Vt = J([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Ht(e) {
		return {
			type: "root",
			next: on(e)
		};
	}
	function Ut(e) {
		return e.map((e) => e[1]);
	}
	function Wt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Gt(e) {
		return e;
	}
	function Kt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function qt() {
		return { type: "wildcard" };
	}
	function Jt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Yt() {
		return { type: "wildcard" };
	}
	function Xt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function O(e) {
		return e;
	}
	function Zt(e) {
		return e;
	}
	function Qt(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function k(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function $t(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function en(e, t) {
		return cn(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function tn(e, t) {
		return cn(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function A(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function j(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function nn(e, t) {
		return t !== null || sn(e);
	}
	function M(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function rn(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function N(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function P() {
		return { operator: "empty" };
	}
	function F() {
		return "eq";
	}
	function an() {
		return "ne";
	}
	function I() {
		return "le";
	}
	function un() {
		return "lt";
	}
	function dn() {
		return "ge";
	}
	function fn() {
		return "gt";
	}
	function L() {
		return "in";
	}
	function pn() {
		return "nin";
	}
	function mn() {
		return "subsetof";
	}
	function hn() {
		return "anyof";
	}
	function gn() {
		return "noneof";
	}
	function _n() {
		return "sizeof";
	}
	function vn() {
		return "size";
	}
	function yn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function bn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function xn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Sn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Cn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function wn() {
		return "length";
	}
	function Tn() {
		return "count";
	}
	function En() {
		return "match";
	}
	function Dn() {
		return "search";
	}
	function On() {
		return "value";
	}
	function kn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function An(e, t) {
		return t.length === 0 ? e : cn(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function jn(e, t) {
		return t.length === 0 ? e : cn(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function Mn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function Nn(e) {
		return {
			type: "root",
			next: on(e)
		};
	}
	function R(e) {
		return {
			type: "current",
			next: on(e)
		};
	}
	function Pn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Fn() {
		return { type: "wildcard" };
	}
	function In(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Ln(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Rn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function zn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Bn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Vn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Hn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Un() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Wn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Gn(e) {
		return e;
	}
	function Kn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function qn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Jn(e, t) {
		return [e, t.value];
	}
	function Yn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Xn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Zn(e) {
		return _a(e);
	}
	function Qn(e) {
		return _a(e);
	}
	function $n() {
		return "true";
	}
	function er() {
		return "false";
	}
	function tr() {
		return "null";
	}
	function nr(e) {
		return _a(e);
	}
	function rr() {
		return "true";
	}
	function ir() {
		return "false";
	}
	function ar() {
		return "null";
	}
	function or(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function sr(e) {
		return e.join("");
	}
	function cr(e, t) {
		let n = parseFloat(K());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function lr() {
		let e = parseInt(K(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && kr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function ur(e) {
		return e.join("");
	}
	function dr(e) {
		return e.join("");
	}
	function fr(e) {
		return e;
	}
	function pr() {
		return "\"";
	}
	function mr(e) {
		return e;
	}
	function hr(e) {
		return e;
	}
	function gr() {
		return "'";
	}
	function _r(e) {
		return e;
	}
	function vr() {
		return "\\";
	}
	function yr() {
		return "/";
	}
	function br() {
		return "\b";
	}
	function xr() {
		return "\f";
	}
	function Sr() {
		return "\n";
	}
	function Cr() {
		return "\r";
	}
	function wr() {
		return "	";
	}
	function Tr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Er(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Dr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let z = t.peg$currPos | 0, B = z, V = [{
		line: 1,
		column: 1
	}], H = z, Or = t.peg$maxFailExpected || [], U = t.peg$silentFails | 0, W = /* @__PURE__ */ new Map(), G;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function K() {
		return e.substring(B, z);
	}
	function kr(e, t) {
		throw t = t === void 0 ? Fr(B, z) : t, Ir(e, t);
	}
	function Ar(t = z) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function q(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function J(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function jr() {
		return { type: "any" };
	}
	function Mr() {
		return { type: "end" };
	}
	function Nr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Pr(t) {
		let n = V[t], r;
		if (n) return n;
		if (t >= V.length) r = V.length - 1;
		else for (r = t; !V[--r];);
		for (n = V[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return V[t] = n, n;
	}
	function Fr(e, t, n) {
		let i = Pr(e), a = Pr(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function Y(e) {
		z < H || (z > H && (H = z, Or = []), Or.push(e));
	}
	function Ir(e, t) {
		return new ln(e, null, null, t);
	}
	function Lr(e, t, n) {
		return new ln(ln.buildMessage(e, t), e, t, n);
	}
	function Rr() {
		let e, t, r, i;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = zr(), i = ga(), i === n ? (z = e, e = n) : (B = e, e = Ht(r))), e;
	}
	function zr() {
		let e, t, r, i, a;
		for (e = z, t = [], r = z, i = $(), a = Br(), a === n ? (z = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = z, i = $(), a = Br(), a === n ? (z = r, r = n) : (i = [i, a], r = i);
		return B = e, t = Ut(t), e = t, e;
	}
	function Br() {
		let e;
		return e = Hr(), e === n && (e = Vr()), e;
	}
	function Vr() {
		let e, t, r;
		return e = z, t = Ti(), t === n ? (z = e, e = n) : (r = Ur(), r === n ? (z = e, e = n) : (B = e, e = Wt(r))), e === n && (e = z, t = Gr(), t !== n && (B = e, t = Gt(t)), e = t), e;
	}
	function Hr() {
		let e, t, r;
		return e = z, t = wi(), t === n ? (z = e, e = n) : (r = Wr(), r === n ? (z = e, e = n) : (B = e, e = Kt(r))), e;
	}
	function Ur() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = qt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Jt(t)), e = t), e;
	}
	function Wr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Yt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Xt(t)), e = t, e === n && (e = z, t = Gr(), t !== n && (B = e, t = O(t)), e = t)), e;
	}
	function Gr() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = Kr(), r === n ? (z = e, e = n) : ($(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = Zt(r)))), e;
	}
	function Kr() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = ui(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ui(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ui(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = Qt(t, r);
		} else z = e, e = n;
		return e;
	}
	function qr() {
		let t, r, i, a, o, s, c, l, u;
		return t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = $i(), i === n ? (z = t, t = n) : ($(), a = Jr(), a === n ? (z = t, t = n) : ($(), o = ea(), o === n ? (z = t, t = n) : (s = z, U++, c = z, l = $(), u = e.charAt(z), ne.test(u) ? z++ : (u = n, U === 0 && Y(xe)), u === n ? (z = c, c = n) : (l = [l, u], c = l), U--, c === n ? s = n : (z = s, s = void 0), s === n ? (z = t, t = n) : (B = t, t = k(a)))))), t === n && (t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = Jr(), i === n ? (z = t, t = n) : (B = t, t = $t(i)))), t;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c, l = z * 91 + 10, u = W.get(l);
		if (u) return z = u.nextPos, u.result;
		if (e = z, t = Yr(), t !== n) {
			for (r = [], i = z, a = $(), o = Oi(), o === n ? (z = i, i = n) : (s = $(), c = Yr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = Oi(), o === n ? (z = i, i = n) : (s = $(), c = Yr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = en(t, r);
		} else z = e, e = n;
		return W.set(l, {
			nextPos: z,
			result: e
		}), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = Xr(), t !== n) {
			for (r = [], i = z, a = $(), o = Di(), o === n ? (z = i, i = n) : (s = $(), c = Xr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = Di(), o === n ? (z = i, i = n) : (s = $(), c = Xr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = tn(t, r);
		} else z = e, e = n;
		return e;
	}
	function Xr() {
		let e, t, r, i, a;
		return e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = $i(), r === n ? (z = e, e = n) : ($(), i = Jr(), i === n ? (z = e, e = n) : ($(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = A(i))))), e === n && (e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = ei(), r === n ? (z = e, e = n) : (B = e, e = j(r))), e === n && (e = Zr())), e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = z, t = ai(), t === n ? (z = e, e = n) : (r = z, i = $(), a = Qr(), a === n ? (z = r, r = n) : (i = [i, a], r = i), r === n && (r = null), B = z, i = nn(t, r), i = i ? void 0 : n, i === n ? (z = e, e = n) : (B = e, e = M(t, r))), e === n && (e = ei()), e;
	}
	function Qr() {
		let e, t, r;
		return e = z, t = $r(), t === n ? (z = e, e = n) : ($(), r = ai(), r === n ? (z = e, e = n) : (B = e, e = rn(t, r))), e === n && (e = z, t = Ii(), t === n ? (z = e, e = n) : ($(), r = di(), r === n ? (z = e, e = n) : (B = e, e = N(r))), e === n && (e = z, t = Wi(), t !== n && (B = e, t = P()), e = t)), e;
	}
	function $r() {
		let e, t;
		return e = z, t = Ai(), t !== n && (B = e, t = F()), e = t, e === n && (e = z, t = ji(), t !== n && (B = e, t = an()), e = t, e === n && (e = z, t = Pi(), t !== n && (B = e, t = I()), e = t, e === n && (e = z, t = Fi(), t !== n && (B = e, t = un()), e = t, e === n && (e = z, t = Mi(), t !== n && (B = e, t = dn()), e = t, e === n && (e = z, t = Ni(), t !== n && (B = e, t = fn()), e = t, e === n && (e = z, t = Li(), t !== n && (B = e, t = L()), e = t, e === n && (e = z, t = Ri(), t !== n && (B = e, t = pn()), e = t, e === n && (e = z, t = zi(), t !== n && (B = e, t = mn()), e = t, e === n && (e = z, t = Bi(), t !== n && (B = e, t = hn()), e = t, e === n && (e = z, t = Vi(), t !== n && (B = e, t = gn()), e = t, e === n && (e = z, t = Hi(), t !== n && (B = e, t = _n()), e = t, e === n && (e = z, t = Ui(), t !== n && (B = e, t = vn()), e = t)))))))))))), e;
	}
	function ei() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = Jr(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = yn(r)))), e === n && (e = ti(), e === n && (e = ci(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = bn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = xn()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Sn()), e = t))))), e;
	}
	function ti() {
		let e, t, r, i, a;
		return e = z, t = ni(), t === n ? (z = e, e = n) : (r = $i(), r === n ? (z = e, e = n) : ($(), i = ri(), i === n && (i = null), $(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = Cn(t, i)))), e;
	}
	function ni() {
		let t, r;
		return t = z, e.substr(z, 6) === o ? (r = o, z += 6) : (r = n, U === 0 && Y(Se)), r !== n && (B = t, r = wn()), t = r, t === n && (t = z, e.substr(z, 5) === s ? (r = s, z += 5) : (r = n, U === 0 && Y(Ce)), r !== n && (B = t, r = Tn()), t = r, t === n && (t = z, e.substr(z, 5) === c ? (r = c, z += 5) : (r = n, U === 0 && Y(we)), r !== n && (B = t, r = En()), t = r, t === n && (t = z, e.substr(z, 6) === l ? (r = l, z += 6) : (r = n, U === 0 && Y(Te)), r !== n && (B = t, r = Dn()), t = r, t === n && (t = z, e.substr(z, 5) === u ? (r = u, z += 5) : (r = n, U === 0 && Y(Ee)), r !== n && (B = t, r = On()), t = r)))), t;
	}
	function ri() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = ii(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ii(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ii(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = kn(t, r);
		} else z = e, e = n;
		return e;
	}
	function ii() {
		let e;
		return e = ai(), e === n && (e = pi()), e;
	}
	function ai() {
		let t, r, i, a, o, s, c, l, u = z * 91 + 21, d = W.get(u);
		if (d) return z = d.nextPos, d.result;
		if (t = z, r = oi(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, U === 0 && Y(De)), s === n ? (z = a, a = n) : (c = $(), l = oi(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, U === 0 && Y(De)), s === n ? (z = a, a = n) : (c = $(), l = oi(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = An(r, i);
		} else z = t, t = n;
		return W.set(u, {
			nextPos: z,
			result: t
		}), t;
	}
	function oi() {
		let t, r, i, a, o, s, c, l;
		if (t = z, r = si(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), y.test(s) ? z++ : (s = n, U === 0 && Y(Oe)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), y.test(s) ? z++ : (s = n, U === 0 && Y(Oe)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = jn(r, i);
		} else z = t, t = n;
		return t;
	}
	function si() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = ai(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = Mn(r)))), e === n && (e = ti(), e === n && (e = fi(), e === n && (e = ci()))), e;
	}
	function ci() {
		let e, t, r;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = zr(), r === n ? (z = e, e = n) : (B = e, e = Nn(r))), e === n && (e = z, t = Ci(), t === n ? (z = e, e = n) : (r = zr(), r === n ? (z = e, e = n) : (B = e, e = R(r)))), e;
	}
	function li() {
		let e, t, r, i, a, o, s, c, l;
		return e = z, t = z, r = la(), r === n ? (z = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (z = e, e = n) : (i = $(), a = z, o = la(), o === n ? (z = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = z, s = Qi(), s === n ? (z = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), B = e, e = Pn(t, a, o)), e;
	}
	function ui() {
		let e, t;
		return e = qr(), e === n && (e = li(), e === n && (e = z, t = Ei(), t !== n && (B = e, t = Fn()), e = t, e === n && (e = z, t = la(), t !== n && (B = e, t = In(t)), e = t, e === n && (e = z, t = da(), t !== n && (B = e, t = Ln(t)), e = t, e === n && (e = z, t = yi(), t !== n && (B = e, t = Rn(t)), e = t))))), e;
	}
	function di() {
		let e, t, r;
		return e = z, t = na(), t === n ? (z = e, e = n) : (r = ra(), B = e, e = zn(t, r)), e;
	}
	function fi() {
		let e, t;
		return e = z, t = pi(), t !== n && (B = e, t = Bn(t)), e = t, e === n && (e = z, t = sa(), t !== n && (B = e, t = Vn(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Hn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = Un()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Wn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return U++, e = z, t = da(), t !== n && (B = e, t = Gn(t)), e = t, U--, e === n && (t = n, U === 0 && Y(ke)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = z, t = Ji(), t === n ? (z = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (z = e, e = n) : (B = e, e = Kn(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = gi(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = gi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = gi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = qn(t, r);
		} else z = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = z, t = da(), t === n ? (z = e, e = n) : ($(), r = Qi(), r === n ? (z = e, e = n) : ($(), i = fi(), i === n ? (z = e, e = n) : (B = e, e = Jn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = Yn(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = fi(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = fi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = fi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = Xn(t, r);
		} else z = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = z, r = z, i = z, a = e.charAt(z), re.test(a) ? z++ : (a = n, U === 0 && Y(Ae)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else z = i, i = n;
		if (r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = Zn(r)), t = r, t === n) {
			if (t = z, r = z, i = [], a = e.charAt(z), ie.test(a) ? z++ : (a = n, U === 0 && Y(je)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(z), ie.test(a) ? z++ : (a = n, U === 0 && Y(je));
			else i = n;
			r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = Qn(r)), t = r, t === n && (t = z, r = Gi(), r !== n && (B = t, r = $n()), t = r, t === n && (t = z, r = Ki(), r !== n && (B = t, r = er()), t = r, t === n && (t = z, r = qi(), r !== n && (B = t, r = tr()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(z), ae.test(t) ? z++ : (t = n, U === 0 && Y(Me)), t === n && (t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, U === 0 && Y(Ne)), r === n ? (z = t, t = n) : (i = z, U++, a = e.charAt(z), oe.test(a) ? z++ : (a = n, U === 0 && Y(Pe)), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = z, t = ia(), t !== n && (B = e, t = nr(t)), e = t, e === n && (e = z, t = Gi(), t !== n && (B = e, t = rr()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = ir()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = ar()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(z) === 36 ? (t = "$", z++) : (t = n, U === 0 && Y(Fe)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(z) === 64 ? (t = "@", z++) : (t = n, U === 0 && Y(Ie)), t;
	}
	function wi() {
		let t;
		return e.substr(z, 2) === ".." ? (t = "..", z += 2) : (t = n, U === 0 && Y(Le)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(z) === 46 ? (t = ".", z++) : (t = n, U === 0 && Y(Re)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(z) === 42 ? (t = "*", z++) : (t = n, U === 0 && Y(ze)), t;
	}
	function Di() {
		let t;
		return e.substr(z, 2) === "&&" ? (t = "&&", z += 2) : (t = n, U === 0 && Y(Be)), t;
	}
	function Oi() {
		let t;
		return e.substr(z, 2) === "||" ? (t = "||", z += 2) : (t = n, U === 0 && Y(Ve)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(z) === 33 ? (t = "!", z++) : (t = n, U === 0 && Y(He)), t;
	}
	function Ai() {
		let t;
		return e.substr(z, 2) === "==" ? (t = "==", z += 2) : (t = n, U === 0 && Y(Ue)), t;
	}
	function ji() {
		let t;
		return e.substr(z, 2) === "!=" ? (t = "!=", z += 2) : (t = n, U === 0 && Y(We)), t;
	}
	function Mi() {
		let t;
		return e.substr(z, 2) === ">=" ? (t = ">=", z += 2) : (t = n, U === 0 && Y(Ge)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(z) === 62 ? (t = ">", z++) : (t = n, U === 0 && Y(Ke)), t;
	}
	function Pi() {
		let t;
		return e.substr(z, 2) === "<=" ? (t = "<=", z += 2) : (t = n, U === 0 && Y(qe)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(z) === 60 ? (t = "<", z++) : (t = n, U === 0 && Y(Je)), t;
	}
	function Ii() {
		let t;
		return e.substr(z, 2) === "=~" ? (t = "=~", z += 2) : (t = n, U === 0 && Y(S)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = z, e.substr(z, 2) === "in" ? (r = "in", z += 2) : (r = n, U === 0 && Y(Ye)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = z, e.substr(z, 3) === "nin" ? (r = "nin", z += 3) : (r = n, U === 0 && Y(Xe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = z, e.substr(z, 8) === d ? (r = d, z += 8) : (r = n, U === 0 && Y(Ze)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === f ? (r = f, z += 5) : (r = n, U === 0 && Y(C)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === p ? (r = p, z += 6) : (r = n, U === 0 && Y(Qe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === m ? (r = m, z += 6) : (r = n, U === 0 && Y($e)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === h ? (r = h, z += 4) : (r = n, U === 0 && Y(et)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === g ? (r = g, z += 5) : (r = n, U === 0 && Y(tt)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === ee ? (r = ee, z += 4) : (r = n, U === 0 && Y(nt)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === te ? (r = te, z += 5) : (r = n, U === 0 && Y(rt)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === _ ? (r = _, z += 4) : (r = n, U === 0 && Y(it)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(z) === 123 ? (t = "{", z++) : (t = n, U === 0 && Y(at)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(z) === 125 ? (t = "}", z++) : (t = n, U === 0 && Y(w)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(z) === 91 ? (t = "[", z++) : (t = n, U === 0 && Y(ot)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(z) === 93 ? (t = "]", z++) : (t = n, U === 0 && Y(st)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(z) === 58 ? (t = ":", z++) : (t = n, U === 0 && Y(ct)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(z) === 44 ? (t = ",", z++) : (t = n, U === 0 && Y(lt)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(z) === 40 ? (t = "(", z++) : (t = n, U === 0 && Y(ut)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(z) === 41 ? (t = ")", z++) : (t = n, U === 0 && Y(dt)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(z) === 63 ? (t = "?", z++) : (t = n, U === 0 && Y(ft)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (U++, t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, U === 0 && Y(mt)), r !== n) {
			for (i = [], a = e.charAt(z), se.test(a) ? z++ : (a = n, U === 0 && Y(ht)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, U === 0 && Y(T)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, U === 0 && Y(gt)), s === n ? (z = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(z), se.test(a) ? z++ : (a = n, U === 0 && Y(ht)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, U === 0 && Y(T)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, U === 0 && Y(gt)), s === n ? (z = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(z) === 47 ? (a = "/", z++) : (a = n, U === 0 && Y(mt)), a === n ? (z = t, t = n) : (B = t, t = or(i));
		} else z = t, t = n;
		return U--, t === n && (r = n, U === 0 && Y(pt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = z, r = [], i = e.charAt(z), ce.test(i) ? z++ : (i = n, U === 0 && Y(_t)); i !== n;) r.push(i), i = e.charAt(z), ce.test(i) ? z++ : (i = n, U === 0 && Y(_t));
		return B = t, r = sr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = z, r = z, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else z = r, r = n;
		return t = r === n ? r : e.substring(t, z), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(z), le.test(t) ? z++ : (t = n, U === 0 && Y(vt)), t === n && (t = z, r = e.charAt(z), ue.test(r) ? z++ : (r = n, U === 0 && Y(yt)), r === n ? (z = t, t = n) : (i = e.charAt(z), b.test(i) ? z++ : (i = n, U === 0 && Y(bt)), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(z), x.test(t) ? z++ : (t = n, U === 0 && Y(E))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (U++, t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, U === 0 && Y(Ne)), r === n && (r = null), i = ca(), i !== n) {
			if (a = z, e.charCodeAt(z) === 46 ? (o = ".", z++) : (o = n, U === 0 && Y(Re)), o !== n) {
				if (s = [], c = e.charAt(z), x.test(c) ? z++ : (c = n, U === 0 && Y(E)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(z), x.test(c) ? z++ : (c = n, U === 0 && Y(E));
				else s = n;
				s === n ? (z = a, a = n) : (o = [o, s], a = o);
			} else z = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), B = t, t = cr(a, o);
		} else z = t, t = n;
		return U--, t === n && (r = n, U === 0 && Y(xt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(z) === 48 ? (t = "0", z++) : (t = n, U === 0 && Y(St)), t === n) {
			if (t = z, r = e.charAt(z), de.test(r) ? z++ : (r = n, U === 0 && Y(Ct)), r !== n) {
				for (i = [], a = e.charAt(z), x.test(a) ? z++ : (a = n, U === 0 && Y(E)); a !== n;) i.push(a), a = e.charAt(z), x.test(a) ? z++ : (a = n, U === 0 && Y(E));
				r = [r, i], t = r;
			} else z = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (U++, t = z, e.charCodeAt(z) === 48 ? (r = "0", z++) : (r = n, U === 0 && Y(St)), r === n) {
			if (r = z, e.charCodeAt(z) === 45 ? (i = "-", z++) : (i = n, U === 0 && Y(Ne)), i === n && (i = null), a = e.charAt(z), de.test(a) ? z++ : (a = n, U === 0 && Y(Ct)), a !== n) {
				for (o = [], s = e.charAt(z), x.test(s) ? z++ : (s = n, U === 0 && Y(E)); s !== n;) o.push(s), s = e.charAt(z), x.test(s) ? z++ : (s = n, U === 0 && Y(E));
				i = [
					i,
					a,
					o
				], r = i;
			} else z = r, r = n;
		}
		return r !== n && (B = t, r = lr()), t = r, U--, t === n && (r = n, U === 0 && Y(wt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = z, r = e.charAt(z), fe.test(r) ? z++ : (r = n, U === 0 && Y(Tt)), r !== n) {
			if (i = e.charAt(z), v.test(i) ? z++ : (i = n, U === 0 && Y(De)), i === n && (i = null), a = [], o = e.charAt(z), x.test(o) ? z++ : (o = n, U === 0 && Y(E)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(z), x.test(o) ? z++ : (o = n, U === 0 && Y(E));
			else a = n;
			a === n ? (z = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else z = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (U++, t = z, e.charCodeAt(z) === 34 ? (r = "\"", z++) : (r = n, U === 0 && Y(Et)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(z) === 34 ? (a = "\"", z++) : (a = n, U === 0 && Y(Et)), a === n ? (z = t, t = n) : (B = t, t = ur(i));
		} else z = t, t = n;
		if (t === n) {
			if (t = z, e.charCodeAt(z) === 39 ? (r = "'", z++) : (r = n, U === 0 && Y(Dt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(z) === 39 ? (a = "'", z++) : (a = n, U === 0 && Y(Dt)), a === n ? (z = t, t = n) : (B = t, t = dr(i));
			} else z = t, t = n;
		}
		return U--, t === n && (r = n, U === 0 && Y(ke)), t;
	}
	function fa() {
		let t, r, i;
		return t = z, r = z, U++, i = e.charAt(z), pe.test(i) ? z++ : (i = n, U === 0 && Y(Ot)), U--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = fr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && Y(T)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 34 ? (i = "\"", z++) : (i = n, U === 0 && Y(Et)), i === n ? (z = t, t = n) : (B = t, t = pr())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && Y(T)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = mr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = z, r = z, U++, i = e.charAt(z), me.test(i) ? z++ : (i = n, U === 0 && Y(kt)), U--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = hr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && Y(T)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 39 ? (i = "'", z++) : (i = n, U === 0 && Y(Dt)), i === n ? (z = t, t = n) : (B = t, t = gr())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && Y(T)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = _r(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(z), he.test(t) ? z++ : (t = n, U === 0 && Y(At)), t === n && (t = z, r = z, i = e.charAt(z), ue.test(i) ? z++ : (i = n, U === 0 && Y(yt)), i === n ? (z = r, r = n) : (a = e.charAt(z), b.test(a) ? z++ : (a = n, U === 0 && Y(bt)), a === n ? (z = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, z)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && Y(T)), r !== n && (B = t, r = vr()), t = r, t === n && (t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, U === 0 && Y(mt)), r !== n && (B = t, r = yr()), t = r, t === n && (t = z, e.charCodeAt(z) === 98 ? (r = "b", z++) : (r = n, U === 0 && Y(jt)), r !== n && (B = t, r = br()), t = r, t === n && (t = z, e.charCodeAt(z) === 102 ? (r = "f", z++) : (r = n, U === 0 && Y(D)), r !== n && (B = t, r = xr()), t = r, t === n && (t = z, e.charCodeAt(z) === 110 ? (r = "n", z++) : (r = n, U === 0 && Y(Mt)), r !== n && (B = t, r = Sr()), t = r, t === n && (t = z, e.charCodeAt(z) === 114 ? (r = "r", z++) : (r = n, U === 0 && Y(Nt)), r !== n && (B = t, r = Cr()), t = r, t === n && (t = z, e.charCodeAt(z) === 116 ? (r = "t", z++) : (r = n, U === 0 && Y(Pt)), r !== n && (B = t, r = wr()), t = r, t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, U === 0 && Y(Ft)), r === n ? (z = t, t = n) : (i = z, a = z, o = e.charAt(z), ge.test(o) ? z++ : (o = n, U === 0 && Y(It)), o === n ? (z = a, a = n) : (s = e.charAt(z), _e.test(s) ? z++ : (s = n, U === 0 && Y(Lt)), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (e.substr(z, 2) === "\\u" ? (a = "\\u", z += 2) : (a = n, U === 0 && Y(Rt)), a === n ? (z = t, t = n) : (o = z, s = z, c = e.charAt(z), ge.test(c) ? z++ : (c = n, U === 0 && Y(It)), c === n ? (z = s, s = n) : (l = e.charAt(z), ve.test(l) ? z++ : (l = n, U === 0 && Y(zt)), l === n ? (z = s, s = n) : (u = Z(), u === n ? (z = s, s = n) : (d = Z(), d === n ? (z = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, z), o === n ? (z = t, t = n) : (B = t, t = Tr(i, o))))), t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, U === 0 && Y(Ft)), r === n ? (z = t, t = n) : (i = z, a = z, o = Z(), o === n ? (z = a, a = n) : (s = Z(), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (B = z, a = Er(i), a = a ? n : void 0, a === n ? (z = t, t = n) : (B = t, t = Dr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(z), ye.test(t) ? z++ : (t = n, U === 0 && Y(Bt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(z), ae.test(t) ? z++ : (t = n, U === 0 && Y(Me)), t;
	}
	function $() {
		let t, r;
		for (U++, t = [], r = e.charAt(z), be.test(r) ? z++ : (r = n, U === 0 && Y(Vt)); r !== n;) t.push(r), r = e.charAt(z), be.test(r) ? z++ : (r = n, U === 0 && Y(Vt));
		return U--, t;
	}
	function ga() {
		let t, r;
		return t = z, U++, e.length > z ? (r = e.charAt(z), z++) : (r = n, U === 0 && Y(gt)), U--, r === n ? t = void 0 : (z = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && kr("Member name too long (maximum 1000 characters)"), e;
	}
	G = a();
	let va = G !== n && z === e.length;
	function ya() {
		throw G !== n && z < e.length && Y(Mr()), Lr(Or, H < e.length ? Ar(H) : null, H < e.length ? Fr(H, H + 1) : Fr(H, H));
	}
	if (t.peg$library) return {
		peg$result: G,
		peg$currPos: z,
		peg$FAILED: n,
		peg$maxFailExpected: Or,
		peg$maxFailPos: H,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return G;
	ya();
}
var dn = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), fn = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, L = (e) => {
	throw new Yt(1, 1, e);
}, pn = (e) => e.type === "root" || e.type === "current", mn = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function hn(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (pn(i)) r === "value" && !mn(i) && L("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && L(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = dn.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = fn[e], a = i.args;
				a.length !== n.args.length && L(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && L(`The result of ${e}() must be compared`), r === "value" && n.logical && L(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && L("A literal must be compared");
		}
	}
}
function gn(e) {
	let t;
	try {
		t = un(e);
	} catch (e) {
		if (nn(e)) throw new Yt(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new Yt(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new Yt(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return hn(t), t;
}
var _n = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), vn = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), yn = (e) => e >= 55296 && e <= 56319, bn = (e) => e >= 56320 && e <= 57343, xn = (e) => e !== void 0 && e >= "0" && e <= "9", Sn = (e, t) => {
	let n = e.charCodeAt(t);
	return yn(n) && bn(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : yn(n) || bn(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, Cn = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !_n.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, wn = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return vn.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Tn = (e, t) => {
	let n = e[t];
	return n === "\\" ? Cn(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : Sn(e, t);
}, En = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = wn(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Tn(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Tn(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, Dn = (e, t) => {
	let n = t + 1, r = n;
	for (; xn(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; xn(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, On = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? Dn(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = En(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = wn(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = Cn(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = Sn(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, kn = 1e3, An = 1e3, jn = 16, Mn = /^[dgimsuy]*$/, Nn = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, R = class extends Error {}, Pn = 0, Fn = 1, In = 2, Ln = 3, Rn = 4, zn = 5, Bn = Kt(2, 31) - 1, Vn = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > Bn - t - 2 || r.step > Bn - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Hn = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), Un = /^\{(\d+)(?:,(\d*))?\}/, Wn = /^[0-9a-fA-F]{4}/, Gn = /^\(\?([ims]*)(?:-([ims]*))?:/, Kn = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, qn = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new R("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = Gn.exec(e.slice(t, t + 12));
				if (!r) throw new R("lookaround or named group");
				let i = Jt({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new R("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new R("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new R("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Hn.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new R("trailing backslash");
		if (r === "b" || r === "B") throw new R("word boundary");
		if (r >= "1" && r <= "9") throw new R("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new R("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Wn.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Wn.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = Un.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > kn || i !== Infinity && i > kn) throw new R("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Jn = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= kn) throw new R("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(zn);
	}
	compile(e) {
		if (++this.work > 4 * kn) throw new R("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Pn, this.atomId(e));
				return;
			case "bol":
				this.emit(Ln, +!!e.multiline);
				return;
			case "eol":
				this.emit(Rn, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Fn);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(In)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Fn);
					this.x[t] = t + 1, this.compile(e.node), this.emit(In, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Fn);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Yn = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new qn(e, r, t, n).parse(), a = new Jn(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, Xn = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: h, stack: g, atomGen: ee, atomHit: te } = r, _ = r.gen, ne = r.step;
	r.gen = _ + t.length + 2, r.step = ne + t.length + 2;
	let v = 0, y = !1, re = (e, n, r) => {
		let s = 0;
		g[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = g[--s];
			if (h[r] !== _) switch (h[r] = _, ++c === 64 && (u(c), c = 0), i[r]) {
				case Pn:
					e[n++] = r;
					break;
				case zn: return u(c), y = !0, n;
				case In:
					g[s++] = a[r];
					break;
				case Fn:
					g[s++] = o[r], g[s++] = a[r];
					break;
				case Ln:
					(v === 0 || a[r] === 1 && Kn(t.charCodeAt(v - 1))) && (g[s++] = r + 1);
					break;
				case Rn: (v === t.length || a[r] === 1 && Kn(t.charCodeAt(v))) && (g[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (_++, p = re(d, 0, 0), y) return !0;
	for (; v < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(v) : t.charCodeAt(v)) > 65535 ? 2 : 1, n = t.slice(v, v + e), r = ne + v + 1;
		_++, m = 0, v += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (ee[i] !== r) {
				ee[i] = r;
				let e = s[i];
				te[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (te[i] === 1 && (m = re(f, m, t + 1), y)) return !0;
		}
		if (!l && (m = re(f, m, 0), y)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Zn = (e, t, n) => {
	let r = Vn(e, t.length);
	try {
		return Xn(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Qn = 256, $n = /* @__PURE__ */ new Map(), er = 0, tr = (e, t, n, r, i = !1) => {
	if (e.length > An || t.length > 7 || !Mn.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = $n.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Nn(s) > jn ? null : Yn(n ? `^(?:${s})$` : s, t, i);
	er >= Qn && ($n.clear(), er = 0);
	let l = $n.get(s);
	return l === void 0 && $n.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), er++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, nr = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Zn(e, t, n);
}, rr = class {
	constructor(e) {
		this.nodes = e;
	}
}, ir = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, ar = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !ir(e);
}, or = 256, sr = /* @__PURE__ */ new Map(), cr = (e, t) => {
	let n = sr.get(e);
	return n === void 0 && (n = ar(e), sr.size >= or && sr.clear(), sr.set(Array.from(e).join(""), n)), t(e.length), n;
}, lr = /* @__PURE__ */ new Map(), ur = (e, t) => {
	let n = lr.get(e);
	return n === void 0 && (n = On(e), n !== null && (n = Array.from(n).join("")), lr.size >= or && lr.clear(), lr.set(Array.from(e).join(""), n)), t(e.length), n;
}, dr = 256, fr = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > An) c = null;
		else if (o) {
			let n = ur(e, i);
			c = n === null ? null : tr(n, t, r, i, !0);
		} else c = cr(e, i) ? tr(e, t, r, i) : null;
		s !== void 0 && (s.size >= dr && s.clear(), s.set(a, c));
	}
	return c !== null && nr(c, n, i);
}, pr = {
	length: (e, t) => {
		let n = e[0];
		if (F(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (M(n)) return j(n);
		if (N(n)) {
			let e = A(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !F(r) || !F(i) ? !1 : fr(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !F(r) || !F(i) ? !1 : fr(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, mr = (e, t, n = O) => e === void 0 && t === void 0 || Qt(e, t, n), hr = (e, t, n = O) => !Qt(e, t, n), gr = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, _r = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return gr(n) - gr(i);
	}
	return e.length - t.length;
}, vr = (e, t, n = O) => P(e) && P(t) ? e < t : F(e) && F(t) ? (n(Math.min(e.length, t.length)), _r(e, t) < 0) : !1, yr = (e, t, n = O) => vr(e, t, n) || mr(e, t, n), br = (e, t, n = O) => P(e) && P(t) ? e > t : F(e) && F(t) ? (n(Math.min(e.length, t.length)), _r(e, t) > 0) : !1, xr = (e, t, n = O) => br(e, t, n) || mr(e, t, n), Sr = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, Cr = (e, t, n) => {
	let r = j(e);
	for (let i = 0; i < r; i++) {
		let r = $t(e, i);
		if (n(1 + Sr(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, wr = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Tr = (e) => typeof e == "string" && e.length + 1 > en, Er = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = j(e);
	for (let n = 0; n < a; n++) {
		let r = $t(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Tr(r) ? i.long.push(r) : i.set.add(wr(r));
	}
	return n?.set(e, i), i;
}, Dr = ({ set: e, long: t }, n, r) => {
	if (Tr(n)) {
		for (let e of t) if (r(1 + Sr(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(wr(n)));
}, z = (e, t, n) => {
	let r = j(e);
	for (let i = 0; i < r; i++) if (n(), k(e, i) && t(e[i])) return !0;
	return !1;
}, B = {
	eq: mr,
	ne: hr,
	lt: vr,
	le: yr,
	gt: br,
	ge: xr,
	in: (e, t, n = O) => M(t) ? Cr(t, e, n) !== -1 : !1,
	nin: (e, t, n = O) => M(t) ? Cr(t, e, n) === -1 : !1,
	subsetof: (e, t, n = O, r) => {
		if (!M(e) || !M(t)) return !1;
		let i = Er(t, n, r);
		return !z(e, (e) => !Dr(i, e, n), n);
	},
	anyof: (e, t, n = O, r) => {
		if (!M(e) || !M(t)) return !1;
		let i = Er(t, n, r);
		return z(e, (e) => Dr(i, e, n), n);
	},
	noneof: (e, t, n = O, r) => {
		if (!M(e) || !M(t)) return !1;
		let i = Er(t, n, r);
		return !z(e, (e) => Dr(i, e, n), n);
	},
	sizeof: (e, t) => !M(e) && !F(e) || !M(t) && !F(t) ? !1 : (M(e) ? j(e) : e.length) === (M(t) ? j(t) : t.length),
	size: (e, t) => !M(e) && !F(e) || !P(t) ? !1 : (M(e) ? j(e) : e.length) === t
}, V = (e) => !M(e) && !F(e) ? !1 : (M(e) ? j(e) : e.length) === 0, H = (e, t, n, r = O, i) => !F(e) || !F(t) ? !1 : fr(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Or = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), U = (e, t) => e.concat(`[${t}]`), W = (e, t) => e < 0 ? t + e : e, G = (e, t) => {
	let n = j(e), r = W(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: k(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, K = (e, t) => {
	for (let n of t) e.push(n);
}, kr = 1e6, Ar = 100, q = 1e6, J = 20, jr = 1e4, Mr = 1e4, Nr = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					k(n, r) && this.visit(n[r]);
				} else if (k(n, t)) this.visit(n[t]);
				else if (++e.holes > Mr) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!k(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), M(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: j(e),
				i: 0,
				holes: 0
			});
			else if (N(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, Pr = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Or(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Or(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = j(e);
			for (let r = 0; r < n; r++) this.tick(), k(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Nr(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(jr, Math.ceil((this.retained - this.retainedLimit) / J))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new Xt(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(kr, Ar * e.weight) + t, this.retainedLimit = Math.max(q, J * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Nr(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(jr, Math.ceil((this.steps - this.stepLimit) / Ar))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new Xt(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!N(e)) return;
			let r = this.canonicalName(n, n.value);
			if (k(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (M(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: U(t, r)
					});
				}), n;
			}
			if (N(e)) {
				let n = A(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) k(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!M(e)) return;
			let r = G(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: U(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (M(e)) {
				let r = G(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: U(t, r.index)
				} : void 0;
			}
			if (N(e)) {
				let r = String(n.value);
				return k(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!M(e)) return [];
			let r = j(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : W(n.start, r), o = n.end === null ? r : W(n.end, r)) : (a = n.start === null ? r - 1 : W(n.start, r), o = n.end === null ? -r - 1 : W(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: k(e, u) ? e[u] : void 0,
				paths: U(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (N(e.value)) {
						let t = this.handleIdentifier(e, r);
						I(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (N(e.value)) {
						let t = this.handleStringLiteral(e, r);
						I(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (M(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						I(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					K(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": K(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						I(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						K(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						K(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						I(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (N(e)) {
					let t = A(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else M(e) && i.push({
					parent: a,
					keys: null,
					length: j(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!k(n, t)) continue;
						a = {
							value: n[t],
							paths: U(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!k(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!P(i) || !P(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return P(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return V(n);
			if (t.operator === "reg") return H(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = B[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new rr(r.value) : new rr(I(r?.value) ? [r?.value] : []);
			}), i = pr[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : I(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : I(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (M(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: U(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (N(n)) {
						let i = A(n);
						this.tick(i.length);
						for (let a of i) {
							if (!k(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!I(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) K(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw nn(e) ? new Xt("Query is nested too deeply") : rn(e) ? new Xt("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? kr, this.retainedLimit = this.adaptiveLimit ? q : Infinity;
	}
}, Fr = (e, t, n) => {
	let r = gn(t), i = new Pr(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? an(i) ? [] : [i.value] : i?.value;
}, Y = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Fr(e, i, n);
		I(t) && r.push(t);
	}
	return r;
}, Ir = (e, t, n = {}) => {
	try {
		return M(t) ? Y(e, t, n) : Fr(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Lr = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Lr(n, t);
		if (e) return e;
	}
	return null;
}, Rr = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Ir(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Lr(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
	let a = [...t.filePath ?? []];
	if (a.length === 0) throw Error("destinationPath.filePath must contain the property to write");
	let o = a.pop(), s = a.reduce((e, t) => {
		if (e == null) throw Error(`Cannot resolve destination filePath at: ${t}`);
		return e[t];
	}, i);
	if (s == null) throw Error(`Destination parent not found for filePath: ${t.filePath.join(".")}`);
	return n && console.log("json-write-path v6 resolved:", {
		fileName: t.fileName,
		jsonPath: t.jsonPath,
		dataRole: t.dataRole,
		filePath: t.filePath,
		parent: s,
		key: o
	}), {
		parent: s,
		key: o,
		target: i
	};
}, zr = (e, t, n, r) => {
	let { parent: i, key: a } = Rr(e, t, r);
	return (Vt[t.action] || Bt)(i, a, n), e;
}, Br = (e, t) => {
	if (!e) return null;
	let n = t[e.fileName];
	if (n === void 0) throw Error(`Entry not found in state: ${e.fileName}`);
	if (e.jsonPath) {
		let t = Ir(n, e.jsonPath, { returnArray: !0 });
		return t.length === 0 ? Array.isArray(n) ? n : [] : t.length === 1 ? t[0] : t;
	}
	return Array.isArray(e.filePath) && e.filePath.length > 0 ? e.filePath.reduce((e, t) => e ? e[t] : void 0, n) : n;
}, Vr = (e, t, n, r = !1) => {
	if (t) {
		if (!t.filePath || t.filePath.length === 0) {
			let r = e[t.fileName];
			Array.isArray(r) ? r.push(...Array.isArray(n) ? n : [n]) : e[t.fileName] = n;
		} else try {
			zr(e, t, n, r);
		} catch {}
	}
}, Hr = {
	single: (e, t) => {
		let n = b[e.templateKey], r = Br(e.sourcePath, t);
		return (e.func === "fromCollection" ? Ft : D)(r, n);
	},
	rowOnColumn: (e, { data: t }) => Lt({
		columns: t?.columns,
		data: t,
		columnSpec: b[e.templateKey.columnKey],
		rowSpec: b[e.templateKey.rowKey]
	}),
	columnOnRow: (e, { data: t }) => Rt({
		columns: t?.columns,
		data: t,
		columnSpec: b[e.templateKey.columnKey],
		rowSpec: b[e.templateKey.rowKey]
	})
}, Ur = (e, t, n = !1) => {
	let r = Ct[e], i = Hr[r.type](r, t);
	return Vr(t, r.destinationPath, i, n), i;
}, Wr = {
	name: "json-renderers-run-instructions",
	version: "1.7.1"
}, Gr = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.steps = {
		meta: Wr,
		runInstructions: e
	});
}, Kr = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	r && console.log(`[runStep] ${e}`), Ur(e, {
		base: t,
		data: n
	}, r);
}), t);
Gr(Kr);
// node_modules/json-renderers-run-instructions/src/v15/runOptions/index.js
var qr = (e) => typeof e == "object" && !!e && !Array.isArray(e), Jr = (e, t) => {
	if (!qr(e)) return null;
	if (e[t] !== void 0) return e[t];
	let n = `show${t.charAt(0).toUpperCase()}${t.slice(1)}`;
	return e[n] === void 0 ? null : e[n];
}, Yr = (e, t) => {
	let n = fe[e];
	if (n) for (let e of n) {
		if (e.skipIf && Ir(t, e.skipIf, { returnArray: !0 }).length > 0) continue;
		let n = b[e.templateKey];
		try {
			zr({ base: t }, e.destinationPath, n);
		} catch {}
	}
}, Xr = ({ options: e = {}, optionDefs: t = {}, base: n, showLog: r = !1 } = {}) => {
	if (!n || !qr(e) || !qr(t)) return n;
	for (let [r, i] of Object.entries(t)) {
		if (!qr(i)) continue;
		let t = Jr(e, r);
		if (!t) continue;
		let a = typeof t == "boolean" && t === !0, o = qr(t);
		if ((a || o) && Object.entries(i).some(([e]) => e !== "initialize" && (a || t[e] === !0))) {
			i.initialize && Yr(i.initialize, n);
			for (let [e, r] of Object.entries(i)) e !== "initialize" && (a || t[e] === !0) && Yr(r, n);
		}
	}
	return n;
}, Zr = {
	name: "json-renderers-run-instructions",
	version: "1.15.1"
}, Qr = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.render = {
		meta: Zr,
		renderFunc: e
	});
}, $r = ({ instructionMainKey: e, instructionSubKey: t, data: n, options: r, showLog: i = !1 } = {}) => {
	let a = E[e]?.[t];
	if (!a) throw Error(`Definition not found: ${e}.${t}`);
	let o = structuredClone(St[a.baseFromSpec]);
	return Kr({
		instructions: a.instructions ?? [],
		base: o,
		data: n,
		showLog: i
	}), Xr({
		options: r,
		optionDefs: a.options && typeof a.options == "object" ? a.options : E[e]?.options ?? {},
		base: o,
		data: n,
		showLog: i
	}), o;
};
Qr($r);
// node_modules/json-renderers-build-table/src/v57/index.js
var ei = (e) => {
	if (!e || typeof e != "object") return e;
	let t = { ...e };
	return t.showSearch === !0 && !t.search && (t.search = {
		showLabel: !0,
		showHelper: !0,
		showInput: !0
	}), t.showSerial === !0 && t.serial === void 0 && (t.serial = !0), t.showOptions === !0 && !t.options && (t.options = {
		showButton: !0,
		showEditButton: !0,
		showDeleteButton: !0
	}), t;
}, ti = (e = {}) => {
	console.log("config : ", e), h(e);
	let t = e?.showLog, n = (e.type || "").split("."), r = n.length > 1 ? n[0] : "table", i = n.length > 1 ? n[1] : n[0] || "simple", a = ei(e?.options), o = $r({
		instructionMainKey: r,
		instructionSubKey: i,
		data: {
			data: e?.data,
			columns: e?.columns
		},
		options: a,
		showLog: t
	});
	return console.log("spec : ", o), Oe({
		jsonSpec: o,
		targetHtmlId: e.targetHtmlId,
		appendPosition: e.appendPosition,
		classToApply: e.classToApply ?? "",
		showLog: t
	});
};
bt({
	render: ti,
	hookEvents: (e = {}) => {
		let t = typeof e.container == "string" ? document.getElementById(e.container) : e.container, n = (n) => {
			if (!t) return;
			let r = t.querySelector("#table-content-container") || t.querySelector("table")?.parentElement || t;
			if (!r) return;
			let i = r.id || "table-content-container";
			r.id ||= i;
			let a = "table.bodyOnly";
			console.log("tableType : ", a), ti({
				data: n,
				columns: e.columns,
				targetHtmlId: i,
				appendPosition: "replace",
				type: a,
				options: e.options,
				classToApply: "",
				showLog: !1
			});
		};
		return vt({
			...e,
			renderTable: e.renderTable || n
		});
	}
});
// src/v8/table/Table.js
var ni = ({ container: e, data: t = [], columns: n = [], options: r = {} } = {}) => {
	let i = typeof e == "string" ? document.getElementById(e) : e;
	i && i.addEventListener("input", (e) => {
		let a = e.target;
		if (!a.matches("input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input")) return;
		let o = (a.value || "").trim().toLowerCase(), s = o ? t.filter((e) => Object.values(e).some((e) => String(e ?? "").toLowerCase().includes(o))) : t, c = (a.closest("table") || i.querySelector("table"))?.querySelector("tbody");
		if (!c) return;
		let l = $r({
			instructionMainKey: "table",
			instructionSubKey: "bodyOnly",
			data: {
				data: s,
				columns: n
			},
			options: r
		}), u = ((l.tagName === "tbody" ? l : l.children?.[0] || l).children || []).map((e) => we(e));
		c.replaceChildren(...u);
		let d = i.querySelector("#search-feedback, [data-role='feedback'], .badge");
		d && (d.textContent = o ? `Showing ${s.length} of ${t.length} records matching "${a.value.trim()}".` : `Showing all ${t.length} records.`);
	});
}, ri = class {
	constructor({ data: e = [], columns: t = [], options: n = {}, type: r = "table.simple", targetContainerId: i = "" } = {}) {
		this.data = e, this.columns = t, this.options = n, this.type = r, this.targetContainerId = i;
	}
	render(e = {}) {
		let t = ti({
			type: this.type,
			data: this.data,
			columns: this.columns,
			options: this.options,
			targetHtmlId: this.targetContainerId,
			appendPosition: "replace",
			classToApply: "",
			...e
		});
		return ni({
			container: this.targetContainerId,
			data: this.data,
			columns: this.columns,
			options: this.options
		}), t;
	}
};
// src/v8/index.js
r(ri);
var ii = ri;
export { ri as Table, ii as default };
