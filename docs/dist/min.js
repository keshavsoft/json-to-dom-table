// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = {
	version: "1.17.1",
	description: "Instruction-driven Table powered by dom-primitive-bindings, dom-primitive-engine, and json-to-tag"
}, r = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {}, globalThis.ks.jsonToDom ??= {}, globalThis.ks.jsonToDom.table ??= {};
	let t = {
		meta: n,
		Table: e
	};
	globalThis.ks.jsonToDom.table.v17 = t, globalThis.ks.jsonToDom.table.build = t;
}, i = {
	version: "42.1.4",
	name: "json-to-dom"
}, a = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: i,
		appendToDom: e
	});
}, o = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, s = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: o,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, c = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => u({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, l = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = c({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, u = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? c({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? l({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, d = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, f = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, p = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, m = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, ee = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, h = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, te = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	d({
		inNode: r,
		inErrors: a
	}) && (f({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), p({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), m({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), ee({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), h({
		inNode: r,
		inErrors: a
	}));
}, ne = {
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
}, g = {
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
}, re = {
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
}, _ = {
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
}, v = {
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
}, ie = {
	name: "spec-repo",
	version: "1.17.1"
};
// ../json-renderers-build-table/node_modules/spec-repo/src/v19/index.js
(({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: ie,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
})({
	spec: g,
	tags: re,
	tagsSchema: _,
	instructions: v,
	definitions: ne
});
// ../json-renderers-build-table/node_modules/json-to-tag-validate/src/v4/index.js
function ae({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? re, a = [];
	return u({
		inSpec: r,
		inFunc: (e) => {
			te({
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
// ../json-renderers-build-table/node_modules/@keshavsoft/json-to-tag/src/v12/element/createElement.js
var oe = "http://www.w3.org/2000/svg", se = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), ce = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return se.has(t) ? document.createElementNS(oe, t) : document.createElement(t);
}, le = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), ue = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), de = "http://www.w3.org/1999/xlink", fe = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(de, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, y = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, pe = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = ce({ inTagName: e.tagName });
	return t ? (le({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), ue({
		inElement: t,
		inProperties: e.properties
	}), fe({
		inElement: t,
		inAttributes: e.attributes
	}), y({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, me = (e = {}) => u({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: pe
});
s({
	buildSpecElement: me,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = ae({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), u({
			inSpec: t,
			inFunc: pe
		});
	}
});
// ../json-renderers-build-table/node_modules/spec-to-dom/src/v2/register/meta.js
var he = {
	version: "2.1.1",
	name: "spec-to-dom"
}, ge = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: he,
		appendToDom: e
	});
}, _e = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
ge(_e);
// ../json-renderers-build-table/node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var ve = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => _e({
	buildSpec: me(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
a(ve);
// ../json-renderers-build-table/src/v63/registerGlobal/meta.js
var ye = {
	name: "json-renderers-build-table",
	version: "1.63.1"
}, be = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.table = {
		meta: ye,
		render: e
	});
}, xe = {
	table: {
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			"instructions-type": [{
				type: "single",
				key: "buildColgroup"
			}, {
				type: "single",
				key: "buildHeader"
			}]
		},
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			"instructions-type": [
				{
					type: "single",
					key: "buildColgroup"
				},
				{
					type: "single",
					key: "buildHeader"
				},
				{
					type: "single",
					key: "buildBody"
				}
			]
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			"instructions-type": [
				{
					type: "single",
					key: "buildColgroup"
				},
				{
					type: "single",
					key: "buildHeader"
				},
				{
					type: "single",
					key: "buildFooter"
				},
				{
					type: "single",
					key: "buildBody"
				}
			]
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			"instructions-type": [{
				type: "single",
				key: "buildBody"
			}]
		},
		simpleSortable: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeaderClickable",
				"buildBody"
			],
			"instructions-type": [
				{
					type: "single",
					key: "buildColgroup"
				},
				{
					type: "single",
					key: "buildHeaderClickable"
				},
				{
					type: "single",
					key: "buildBody"
				}
			]
		},
		full: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody",
				"buildFooter",
				"set-search",
				"search-show-label",
				"search-show-helper",
				"search-show-input",
				"set-serial",
				"serial-show-serial",
				"options-show-button",
				"options-show-edit-button"
			],
			"instructions-type": [
				{
					type: "single",
					key: "buildColgroup"
				},
				{
					type: "single",
					key: "buildHeader"
				},
				{
					type: "single",
					key: "buildBody"
				},
				{
					type: "single",
					key: "buildFooter"
				},
				{
					type: "single",
					key: "set-search"
				},
				{
					type: "single",
					key: "search-show-label"
				},
				{
					type: "single",
					key: "search-show-helper"
				},
				{
					type: "single",
					key: "search-show-input"
				},
				{
					type: "multi",
					key: "set-serial"
				},
				{
					type: "single",
					key: "serial-show-serial"
				},
				{
					type: "multi",
					key: "options-show-button"
				},
				{
					type: "multi",
					key: "options-show-edit-button"
				}
			]
		}
	},
	select: { simple: {
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"],
		"instructions-type": [{
			type: "single",
			key: "buildSelectWithOptions"
		}]
	} },
	dataList: { simple: {
		baseFromSpec: "dataListSimple",
		instructions: ["buildDataListWithOptions"],
		"instructions-type": [{
			type: "single",
			key: "buildDataListWithOptions"
		}]
	} },
	selectOptionsOnly: { simple: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"],
		"instructions-type": [{
			type: "single",
			key: "buildOptionsArray"
		}]
	} },
	searchInput: { simple: {
		baseFromSpec: "searchInputBase",
		instructions: [],
		"instructions-type": []
	} },
	form: { simple: {
		baseFromSpec: "formSimple",
		instructions: ["buildFormField"],
		"instructions-type": [{
			type: "single",
			key: "buildFormField"
		}]
	} },
	accordion: {
		simple: {
			baseFromSpec: "accordionSimple",
			instructions: ["buildAccordionItems"],
			"instructions-type": [{
				type: "single",
				key: "buildAccordionItems"
			}]
		},
		flush: {
			baseFromSpec: "accordionFlush",
			instructions: ["buildAccordionItems"],
			"instructions-type": [{
				type: "single",
				key: "buildAccordionItems"
			}]
		}
	},
	card: {
		simple: {
			baseFromSpec: "cardSimple",
			instructions: ["buildCardBody"],
			"instructions-type": [{
				type: "single",
				key: "buildCardBody"
			}]
		},
		withHeader: {
			baseFromSpec: "cardWithHeader",
			instructions: ["buildCardHeader", "buildCardBody"],
			"instructions-type": [{
				type: "single",
				key: "buildCardHeader"
			}, {
				type: "single",
				key: "buildCardBody"
			}]
		},
		withFooter: {
			baseFromSpec: "cardWithFooter",
			instructions: [
				"buildCardHeader",
				"buildCardBody",
				"buildCardFooter"
			],
			"instructions-type": [{
				type: "multi",
				key: "card-with-footer"
			}]
		},
		imageTop: {
			baseFromSpec: "cardImageTop",
			instructions: ["buildCardBody"],
			"instructions-type": [{
				type: "single",
				key: "buildCardBody"
			}]
		}
	},
	list: {
		simple: {
			baseFromSpec: "listSimple",
			instructions: ["buildListItems"],
			"instructions-type": [{
				type: "single",
				key: "buildListItems"
			}]
		},
		group: {
			baseFromSpec: "listGroup",
			instructions: ["buildListGroupItems"],
			"instructions-type": [{
				type: "single",
				key: "buildListGroupItems"
			}]
		},
		ordered: {
			baseFromSpec: "listOrdered",
			instructions: ["buildListGroupItems"],
			"instructions-type": [{
				type: "single",
				key: "buildListGroupItems"
			}]
		}
	},
	menu: {
		simple: {
			baseFromSpec: "menuSimple",
			instructions: ["buildMenuItems"],
			"instructions-type": [{
				type: "single",
				key: "buildMenuItems"
			}]
		},
		cards: {
			baseFromSpec: "menuCardsBase",
			instructions: ["buildMenuCards"],
			"instructions-type": [{
				type: "single",
				key: "buildMenuCards"
			}]
		}
	}
}, Se = {
	name: "declarative-definitions",
	version: "1.6.1"
}, Ce = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.definitions = {
		meta: Se,
		data: e
	});
}, we = xe;
Ce(xe);
var Te = {
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
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
	tableHeaderClickable: {
		tagName: "th",
		attributes: {
			class: "py-3 px-3 fw-semibold text-uppercase small user-select-none",
			role: "button",
			tabindex: "0",
			style: "cursor: pointer;",
			"data-column": "${columnName}",
			"data-sort-order": "none",
			"data-role": "sortable-header"
		},
		children: [{
			tagName: "span",
			attributes: { class: "d-inline-flex align-items-center gap-2" },
			children: [{
				tagName: "span",
				textContent: "${columnName}"
			}, {
				tagName: "span",
				textContent: "⇅",
				attributes: {
					class: "small opacity-75",
					"data-role": "sort-indicator"
				}
			}]
		}]
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
}, Ee = {
	name: "declarative-spec",
	version: "1.4.1"
}, De = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.spec = {
		meta: Ee,
		data: e
	});
}, b = Te;
De(Te);
// ../json-renderers-build-table/node_modules/declarative-instructions-single/src/v5/index.js
var Oe = {
	"options-search": {
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$.base.children"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	},
	"options-search-showLabel": {
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-label-slot'].children"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	},
	"options-search-showHelper": {
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-helper-slot'].children"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	},
	"options-search-showInput": {
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-input-slot'].children"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	},
	buildHeaderClickable: {
		type: "single",
		narration: "Build table header",
		destinationPath: { jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children" },
		sourcePath: "$.data.columns",
		templateKey: "tableHeaderClickable",
		func: "fromCollection"
	},
	buildColgroup: {
		narration: "Build column widths",
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		sourcePath: {
			rows: "$.data.data",
			columns: "$.data.columns"
		},
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-body'].children" },
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		},
		func: "rowOnColumn"
	},
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: { jsonPath: "$.base..*[?@.attributes['data-role'] == 'form-body'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		sourcePath: {
			columns: "$.data.columns",
			rows: "$.data.data"
		},
		destinationPath: { jsonPath: "$.base.children" },
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		},
		func: "columnOnRow"
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.data",
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: { jsonPath: "$.base" },
		sourcePath: "$.data.data",
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		sourcePath: {
			columns: "$.data.columns",
			rows: "$.data.data"
		},
		destinationPath: { jsonPath: "$.base.children" },
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		},
		func: "columnOnRow"
	},
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-body'].children"
		},
		sourcePath: "$.data",
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-header'].children"
		},
		sourcePath: "$.data",
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-footer'].children"
		},
		sourcePath: "$.data",
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, ke = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ae = (e, t) => {
	if (!ke(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = x(t, i);
	return n;
}, je = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => x(t, e));
}, Me = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Ne = (e, t) => Me(e, t), Pe = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Fe = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Ie = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Fe,
		applyTemplate: e
	});
}, x = (e, t, n) => {
	let r = e, i = t;
	Pe(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Me(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Ne(a?.textContent, r)), "attributes" in a && (a.attributes = Ae(a?.attributes, r)), "children" in a && (a.children = je(a?.children, r))), a);
};
Ie(x);
// ../json-renderers-build-table/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Le = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Re = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, ze = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Re,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Be = (e, t) => {
	let n = e, r = t;
	return Le(n, r), n.map((e) => x(e, r));
};
ze((e, t) => {
	let n = e;
	return Le(n, t), n.map((e) => x(e, e[t]));
}, Be);
// ../json-renderers-build-table/node_modules/json-transformer-funcs-two-dimensions/src/v10/index.js
var Ve = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = x(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? Be(a, r) : [], i;
}), He = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => Ve({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), Ue = ({ columns: e = [], data: t = [], rows: n, columnSpec: r, rowSpec: i } = {}) => {
	let a = n ?? (Array.isArray(t) ? t : t?.data ?? t?.rows ?? []);
	return Ve({
		outer: e,
		outerSpec: r,
		innerSpec: i,
		getInner: (e) => Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : a.map((t) => ({
			...t,
			rowValue: t[e.columnName] ?? t.value ?? t
		}))
	});
}, We = Object.defineProperty, Ge = Object.getOwnPropertySymbols, Ke = Object.prototype.hasOwnProperty, qe = Object.prototype.propertyIsEnumerable, Je = Math.pow, Ye = (e, t, n) => t in e ? We(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Xe = (e, t) => {
	for (var n in t ||= {}) Ke.call(t, n) && Ye(e, n, t[n]);
	if (Ge) for (var n of Ge(t)) qe.call(t, n) && Ye(e, n, t[n]);
	return e;
}, Ze = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, S = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, C = () => void 0, Qe = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = E(e);
		return r === E(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = T(e), a = T(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, $e = (e, t, n = C) => {
	let r = [];
	if (!Qe(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Qe(et(e.x, t), et(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !w(o, i) || !w(a, i)) return !1;
			let s = a[i];
			if (!w(o, i) || !Qe(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, w = (e, t) => Object.prototype.hasOwnProperty.call(e, t), et = (e, t) => w(e, t) ? e[t] : void 0, tt = 16383, nt = 1e3, T = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > nt) throw new S(`Member name too long (maximum ${nt} characters)`);
	return t;
}, E = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, rt = (e) => e instanceof RangeError && /call stack/i.test(e.message), D = (e) => Array.isArray(e), it = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), O = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, k = (e) => typeof e == "number", A = (e) => typeof e == "string", at = (e) => e === void 0, j = (e) => e !== void 0;
function ot(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function st(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function ct(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var lt = class extends SyntaxError {
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
function ut(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: zr }, a = zr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", re = /^[,\]]/, _ = /^[+\-]/, v = /^[*\/]/, ie = /^[a-zA-Z_]/, ae = /^[\x80-\uFFFF_]/, oe = /^[a-zA-Z0-9_]/, se = /^[0-9@$\-]/, ce = /^[^\/\\]/, le = /^[gimsuy]/, ue = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, de = /^[\uD800-\uDBFF]/, fe = /^[\uDC00-\uDFFF]/, y = /^[0-9]/, pe = /^[1-9]/, me = /^[eE]/, he = /^["\\]/, ge = /^['\\]/, _e = /^[ -\uD7FF\uE000-\uFFFF]/, ve = /^[dD]/, ye = /^[89abAB]/, be = /^[c-fC-F]/, xe = /^[0-9a-fA-F]/, Se = /^[ \t\n\r]/, Ce = K([",", "]"], !1, !1, !1), we = G("length", !1), Te = G("count", !1), Ee = G("match", !1), De = G("search", !1), b = G("value", !1), Oe = K(["+", "-"], !1, !1, !1), ke = K(["*", "/"], !1, !1, !1), Ae = Pr("string"), je = K([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Me = K([["", "￿"], "_"], !1, !1, !1), Ne = K([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Pe = G("-", !1), Fe = K([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ie = G("$", !1), x = G("@", !1), Le = G("..", !1), Re = G(".", !1), ze = G("*", !1), Be = G("&&", !1), Ve = G("||", !1), He = G("!", !1), Ue = G("==", !1), We = G("!=", !1), Ge = G(">=", !1), Ke = G(">", !1), qe = G("<=", !1), Je = G("<", !1), Ye = G("=~", !1), Xe = G("in", !1), Ze = G("nin", !1), S = G("subsetof", !1), C = G("anyof", !1), Qe = G("noneof", !1), $e = G("sizeof", !1), w = G("size", !1), et = G("empty", !1), tt = G("true", !1), nt = G("false", !1), T = G("null", !1), E = G("{", !1), rt = G("}", !1), D = G("[", !1), it = G("]", !1), O = G(":", !1), k = G(",", !1), A = G("(", !1), at = G(")", !1), j = G("?", !1), ut = Pr("regex"), dt = G("/", !1), ft = K(["/", "\\"], !0, !1, !1), M = G("\\", !1), pt = q(), mt = K([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), ht = K([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), gt = K([["\ud800", "\udbff"]], !1, !1, !1), _t = K([["\udc00", "\udfff"]], !1, !1, !1), N = K([["0", "9"]], !1, !1, !1), vt = Pr("number"), yt = G("0", !1), bt = K([["1", "9"]], !1, !1, !1), xt = Pr("integer"), St = K(["e", "E"], !1, !1, !1), Ct = G("\"", !1), wt = G("'", !1), Tt = K(["\"", "\\"], !1, !1, !1), Et = K(["'", "\\"], !1, !1, !1), Dt = K([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Ot = G("b", !1), kt = G("f", !1), At = G("n", !1), jt = G("r", !1), Mt = G("t", !1), P = G("u", !1), Nt = K(["d", "D"], !1, !1, !1), Pt = K([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Ft = G("\\u", !1), It = K([["c", "f"], ["C", "F"]], !1, !1, !1), Lt = K([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Rt = K([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function zt(e) {
		return {
			type: "root",
			next: ot(e)
		};
	}
	function Bt(e) {
		return e.map((e) => e[1]);
	}
	function Vt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Ht(e) {
		return e;
	}
	function Ut(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Wt() {
		return { type: "wildcard" };
	}
	function Gt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Kt() {
		return { type: "wildcard" };
	}
	function qt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Jt(e) {
		return e;
	}
	function Yt(e) {
		return e;
	}
	function Xt(e, t) {
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
	function Zt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Qt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function $t(e, t) {
		return ct(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function en(e, t) {
		return ct(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function tn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function nn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function rn(e, t) {
		return t !== null || st(e);
	}
	function an(e, t) {
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
	function on(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function sn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function cn() {
		return { operator: "empty" };
	}
	function ln() {
		return "eq";
	}
	function un() {
		return "ne";
	}
	function dn() {
		return "le";
	}
	function fn() {
		return "lt";
	}
	function pn() {
		return "ge";
	}
	function mn() {
		return "gt";
	}
	function hn() {
		return "in";
	}
	function gn() {
		return "nin";
	}
	function _n() {
		return "subsetof";
	}
	function vn() {
		return "anyof";
	}
	function yn() {
		return "noneof";
	}
	function bn() {
		return "sizeof";
	}
	function xn() {
		return "size";
	}
	function Sn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function Cn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function wn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Tn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function En(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function Dn() {
		return "length";
	}
	function On() {
		return "count";
	}
	function kn() {
		return "match";
	}
	function An() {
		return "search";
	}
	function jn() {
		return "value";
	}
	function Mn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function F(e, t) {
		return t.length === 0 ? e : ct(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Nn(e, t) {
		return t.length === 0 ? e : ct(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function Pn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function Fn(e) {
		return {
			type: "root",
			next: ot(e)
		};
	}
	function In(e) {
		return {
			type: "current",
			next: ot(e)
		};
	}
	function Ln(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Rn() {
		return { type: "wildcard" };
	}
	function zn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Bn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Vn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Hn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Un(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Wn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Gn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function I() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Kn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function qn(e) {
		return e;
	}
	function Jn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Yn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Xn(e, t) {
		return [e, t.value];
	}
	function Zn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Qn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function $n(e) {
		return _a(e);
	}
	function er(e) {
		return _a(e);
	}
	function tr() {
		return "true";
	}
	function nr() {
		return "false";
	}
	function rr() {
		return "null";
	}
	function ir(e) {
		return _a(e);
	}
	function ar() {
		return "true";
	}
	function or() {
		return "false";
	}
	function sr() {
		return "null";
	}
	function cr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e, t) {
		let n = parseFloat(Ar());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function dr() {
		let e = parseInt(Ar(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function fr(e) {
		return e.join("");
	}
	function pr(e) {
		return e.join("");
	}
	function mr(e) {
		return e;
	}
	function hr() {
		return "\"";
	}
	function gr(e) {
		return e;
	}
	function _r(e) {
		return e;
	}
	function vr() {
		return "'";
	}
	function yr(e) {
		return e;
	}
	function br() {
		return "\\";
	}
	function xr() {
		return "/";
	}
	function Sr() {
		return "\b";
	}
	function Cr() {
		return "\f";
	}
	function wr() {
		return "\n";
	}
	function Tr() {
		return "\r";
	}
	function Er() {
		return "	";
	}
	function Dr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function L(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Or(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let R = t.peg$currPos | 0, z = R, B = [{
		line: 1,
		column: 1
	}], V = R, H = t.peg$maxFailExpected || [], U = t.peg$silentFails | 0, kr = /* @__PURE__ */ new Map(), W;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Ar() {
		return e.substring(z, R);
	}
	function jr(e, t) {
		throw t = t === void 0 ? Ir(z, R) : t, Lr(e, t);
	}
	function Mr(t = R) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function G(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function K(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function q() {
		return { type: "any" };
	}
	function Nr() {
		return { type: "end" };
	}
	function Pr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Fr(t) {
		let n = B[t], r;
		if (n) return n;
		if (t >= B.length) r = B.length - 1;
		else for (r = t; !B[--r];);
		for (n = B[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return B[t] = n, n;
	}
	function Ir(e, t, n) {
		let i = Fr(e), a = Fr(t), o = {
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
	function J(e) {
		R < V || (R > V && (V = R, H = []), H.push(e));
	}
	function Lr(e, t) {
		return new lt(e, null, null, t);
	}
	function Rr(e, t, n) {
		return new lt(lt.buildMessage(e, t), e, t, n);
	}
	function zr() {
		let e, t, r, i;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Br(), i = ga(), i === n ? (R = e, e = n) : (z = e, e = zt(r))), e;
	}
	function Br() {
		let e, t, r, i, a;
		for (e = R, t = [], r = R, i = $(), a = Vr(), a === n ? (R = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = R, i = $(), a = Vr(), a === n ? (R = r, r = n) : (i = [i, a], r = i);
		return z = e, t = Bt(t), e = t, e;
	}
	function Vr() {
		let e;
		return e = Ur(), e === n && (e = Hr()), e;
	}
	function Hr() {
		let e, t, r;
		return e = R, t = Ei(), t === n ? (R = e, e = n) : (r = Wr(), r === n ? (R = e, e = n) : (z = e, e = Vt(r))), e === n && (e = R, t = Kr(), t !== n && (z = e, t = Ht(t)), e = t), e;
	}
	function Ur() {
		let e, t, r;
		return e = R, t = Ti(), t === n ? (R = e, e = n) : (r = Gr(), r === n ? (R = e, e = n) : (z = e, e = Ut(r))), e;
	}
	function Wr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Wt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Gt(t)), e = t), e;
	}
	function Gr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Kt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = qt(t)), e = t, e === n && (e = R, t = Kr(), t !== n && (z = e, t = Jt(t)), e = t)), e;
	}
	function Kr() {
		let e, t, r, i;
		return e = R, t = Xi(), t === n ? (R = e, e = n) : ($(), r = qr(), r === n ? (R = e, e = n) : ($(), i = Zi(), i === n ? (R = e, e = n) : (z = e, e = Yt(r)))), e;
	}
	function qr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = di(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = di(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = di(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Xt(t, r);
		} else R = e, e = n;
		return e;
	}
	function Jr() {
		let t, r, i, a, o, s, c, l, u;
		return t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = $i(), i === n ? (R = t, t = n) : ($(), a = Yr(), a === n ? (R = t, t = n) : ($(), o = ea(), o === n ? (R = t, t = n) : (s = R, U++, c = R, l = $(), u = e.charAt(R), re.test(u) ? R++ : (u = n, U === 0 && J(Ce)), u === n ? (R = c, c = n) : (l = [l, u], c = l), U--, c === n ? s = n : (R = s, s = void 0), s === n ? (R = t, t = n) : (z = t, t = Zt(a)))))), t === n && (t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = Yr(), i === n ? (R = t, t = n) : (z = t, t = Qt(i)))), t;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c, l = R * 91 + 10, u = kr.get(l);
		if (u) return R = u.nextPos, u.result;
		if (e = R, t = Xr(), t !== n) {
			for (r = [], i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Xr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Xr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = $t(t, r);
		} else R = e, e = n;
		return kr.set(l, {
			nextPos: R,
			result: e
		}), e;
	}
	function Xr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = Zr(), t !== n) {
			for (r = [], i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = Zr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = Zr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = en(t, r);
		} else R = e, e = n;
		return e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = $i(), r === n ? (R = e, e = n) : ($(), i = Yr(), i === n ? (R = e, e = n) : ($(), a = ea(), a === n ? (R = e, e = n) : (z = e, e = tn(i))))), e === n && (e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ti(), r === n ? (R = e, e = n) : (z = e, e = nn(r))), e === n && (e = Qr())), e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = R, t = oi(), t === n ? (R = e, e = n) : (r = R, i = $(), a = $r(), a === n ? (R = r, r = n) : (i = [i, a], r = i), r === n && (r = null), z = R, i = rn(t, r), i = i ? void 0 : n, i === n ? (R = e, e = n) : (z = e, e = an(t, r))), e === n && (e = ti()), e;
	}
	function $r() {
		let e, t, r;
		return e = R, t = ei(), t === n ? (R = e, e = n) : ($(), r = oi(), r === n ? (R = e, e = n) : (z = e, e = on(t, r))), e === n && (e = R, t = Li(), t === n ? (R = e, e = n) : ($(), r = fi(), r === n ? (R = e, e = n) : (z = e, e = sn(r))), e === n && (e = R, t = Gi(), t !== n && (z = e, t = cn()), e = t)), e;
	}
	function ei() {
		let e, t;
		return e = R, t = ji(), t !== n && (z = e, t = ln()), e = t, e === n && (e = R, t = Mi(), t !== n && (z = e, t = un()), e = t, e === n && (e = R, t = Fi(), t !== n && (z = e, t = dn()), e = t, e === n && (e = R, t = Ii(), t !== n && (z = e, t = fn()), e = t, e === n && (e = R, t = Ni(), t !== n && (z = e, t = pn()), e = t, e === n && (e = R, t = Pi(), t !== n && (z = e, t = mn()), e = t, e === n && (e = R, t = Ri(), t !== n && (z = e, t = hn()), e = t, e === n && (e = R, t = zi(), t !== n && (z = e, t = gn()), e = t, e === n && (e = R, t = Bi(), t !== n && (z = e, t = _n()), e = t, e === n && (e = R, t = Vi(), t !== n && (z = e, t = vn()), e = t, e === n && (e = R, t = Hi(), t !== n && (z = e, t = yn()), e = t, e === n && (e = R, t = Ui(), t !== n && (z = e, t = bn()), e = t, e === n && (e = R, t = Wi(), t !== n && (z = e, t = xn()), e = t)))))))))))), e;
	}
	function ti() {
		let e, t, r, i;
		return e = R, t = $i(), t === n ? (R = e, e = n) : ($(), r = Yr(), r === n ? (R = e, e = n) : ($(), i = ea(), i === n ? (R = e, e = n) : (z = e, e = Sn(r)))), e === n && (e = ni(), e === n && (e = li(), e === n && (e = R, t = Y(), t !== n && (z = e, t = Cn()), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = wn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = Tn()), e = t))))), e;
	}
	function ni() {
		let e, t, r, i, a;
		return e = R, t = ri(), t === n ? (R = e, e = n) : (r = $i(), r === n ? (R = e, e = n) : ($(), i = ii(), i === n && (i = null), $(), a = ea(), a === n ? (R = e, e = n) : (z = e, e = En(t, i)))), e;
	}
	function ri() {
		let t, r;
		return t = R, e.substr(R, 6) === o ? (r = o, R += 6) : (r = n, U === 0 && J(we)), r !== n && (z = t, r = Dn()), t = r, t === n && (t = R, e.substr(R, 5) === s ? (r = s, R += 5) : (r = n, U === 0 && J(Te)), r !== n && (z = t, r = On()), t = r, t === n && (t = R, e.substr(R, 5) === c ? (r = c, R += 5) : (r = n, U === 0 && J(Ee)), r !== n && (z = t, r = kn()), t = r, t === n && (t = R, e.substr(R, 6) === l ? (r = l, R += 6) : (r = n, U === 0 && J(De)), r !== n && (z = t, r = An()), t = r, t === n && (t = R, e.substr(R, 5) === u ? (r = u, R += 5) : (r = n, U === 0 && J(b)), r !== n && (z = t, r = jn()), t = r)))), t;
	}
	function ii() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = ai(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = ai(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = ai(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Mn(t, r);
		} else R = e, e = n;
		return e;
	}
	function ai() {
		let e;
		return e = oi(), e === n && (e = mi()), e;
	}
	function oi() {
		let t, r, i, a, o, s, c, l, u = R * 91 + 21, d = kr.get(u);
		if (d) return R = d.nextPos, d.result;
		if (t = R, r = si(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), _.test(s) ? R++ : (s = n, U === 0 && J(Oe)), s === n ? (R = a, a = n) : (c = $(), l = si(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), _.test(s) ? R++ : (s = n, U === 0 && J(Oe)), s === n ? (R = a, a = n) : (c = $(), l = si(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = F(r, i);
		} else R = t, t = n;
		return kr.set(u, {
			nextPos: R,
			result: t
		}), t;
	}
	function si() {
		let t, r, i, a, o, s, c, l;
		if (t = R, r = ci(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), v.test(s) ? R++ : (s = n, U === 0 && J(ke)), s === n ? (R = a, a = n) : (c = $(), l = ci(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), v.test(s) ? R++ : (s = n, U === 0 && J(ke)), s === n ? (R = a, a = n) : (c = $(), l = ci(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Nn(r, i);
		} else R = t, t = n;
		return t;
	}
	function ci() {
		let e, t, r, i;
		return e = R, t = $i(), t === n ? (R = e, e = n) : ($(), r = oi(), r === n ? (R = e, e = n) : ($(), i = ea(), i === n ? (R = e, e = n) : (z = e, e = Pn(r)))), e === n && (e = ni(), e === n && (e = pi(), e === n && (e = li()))), e;
	}
	function li() {
		let e, t, r;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Br(), r === n ? (R = e, e = n) : (z = e, e = Fn(r))), e === n && (e = R, t = wi(), t === n ? (R = e, e = n) : (r = Br(), r === n ? (R = e, e = n) : (z = e, e = In(r)))), e;
	}
	function ui() {
		let e, t, r, i, a, o, s, c, l;
		return e = R, t = R, r = la(), r === n ? (R = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (R = e, e = n) : (i = $(), a = R, o = la(), o === n ? (R = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = R, s = Qi(), s === n ? (R = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), z = e, e = Ln(t, a, o)), e;
	}
	function di() {
		let e, t;
		return e = Jr(), e === n && (e = ui(), e === n && (e = R, t = Di(), t !== n && (z = e, t = Rn()), e = t, e === n && (e = R, t = la(), t !== n && (z = e, t = zn(t)), e = t, e === n && (e = R, t = da(), t !== n && (z = e, t = Bn(t)), e = t, e === n && (e = R, t = bi(), t !== n && (z = e, t = Vn(t)), e = t))))), e;
	}
	function fi() {
		let e, t, r;
		return e = R, t = na(), t === n ? (R = e, e = n) : (r = ra(), z = e, e = Hn(t, r)), e;
	}
	function pi() {
		let e, t;
		return e = R, t = mi(), t !== n && (z = e, t = Un(t)), e = t, e === n && (e = R, t = sa(), t !== n && (z = e, t = Wn(t)), e = t, e === n && (e = hi(), e === n && (e = vi(), e === n && (e = R, t = Y(), t !== n && (z = e, t = Gn()), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = I()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = Kn()), e = t)))))), e;
	}
	function mi() {
		let e, t;
		return U++, e = R, t = da(), t !== n && (z = e, t = qn(t)), e = t, U--, e === n && (t = n, U === 0 && J(Ae)), e;
	}
	function hi() {
		let e, t, r, i;
		return e = R, t = Ji(), t === n ? (R = e, e = n) : ($(), r = gi(), r === n && (r = null), $(), i = Yi(), i === n ? (R = e, e = n) : (z = e, e = Jn(r))), e;
	}
	function gi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = _i(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Yn(t, r);
		} else R = e, e = n;
		return e;
	}
	function _i() {
		let e, t, r, i;
		return e = R, t = da(), t === n ? (R = e, e = n) : ($(), r = Qi(), r === n ? (R = e, e = n) : ($(), i = pi(), i === n ? (R = e, e = n) : (z = e, e = Xn(t, i)))), e;
	}
	function vi() {
		let e, t, r, i;
		return e = R, t = Xi(), t === n ? (R = e, e = n) : ($(), r = yi(), r === n && (r = null), $(), i = Zi(), i === n ? (R = e, e = n) : (z = e, e = Zn(r))), e;
	}
	function yi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = pi(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = pi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = pi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Qn(t, r);
		} else R = e, e = n;
		return e;
	}
	function bi() {
		let t, r, i, a, o, s;
		if (t = R, r = R, i = R, a = e.charAt(R), ie.test(a) ? R++ : (a = n, U === 0 && J(je)), a !== n) {
			for (o = [], s = xi(); s !== n;) o.push(s), s = xi();
			a = [a, o], i = a;
		} else R = i, i = n;
		if (r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = $n(r)), t = r, t === n) {
			if (t = R, r = R, i = [], a = e.charAt(R), ae.test(a) ? R++ : (a = n, U === 0 && J(Me)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(R), ae.test(a) ? R++ : (a = n, U === 0 && J(Me));
			else i = n;
			r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = er(r)), t = r, t === n && (t = R, r = Y(), r !== n && (z = t, r = tr()), t = r, t === n && (t = R, r = Ki(), r !== n && (z = t, r = nr()), t = r, t === n && (t = R, r = qi(), r !== n && (z = t, r = rr()), t = r)));
		}
		return t;
	}
	function xi() {
		let t, r, i, a;
		return t = e.charAt(R), oe.test(t) ? R++ : (t = n, U === 0 && J(Ne)), t === n && (t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, U === 0 && J(Pe)), r === n ? (R = t, t = n) : (i = R, U++, a = e.charAt(R), se.test(a) ? R++ : (a = n, U === 0 && J(Fe)), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function Si() {
		let e, t;
		return e = R, t = ia(), t !== n && (z = e, t = ir(t)), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = ar()), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = or()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = sr()), e = t))), e;
	}
	function Ci() {
		let t;
		return e.charCodeAt(R) === 36 ? (t = "$", R++) : (t = n, U === 0 && J(Ie)), t;
	}
	function wi() {
		let t;
		return e.charCodeAt(R) === 64 ? (t = "@", R++) : (t = n, U === 0 && J(x)), t;
	}
	function Ti() {
		let t;
		return e.substr(R, 2) === ".." ? (t = "..", R += 2) : (t = n, U === 0 && J(Le)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(R) === 46 ? (t = ".", R++) : (t = n, U === 0 && J(Re)), t;
	}
	function Di() {
		let t;
		return e.charCodeAt(R) === 42 ? (t = "*", R++) : (t = n, U === 0 && J(ze)), t;
	}
	function Oi() {
		let t;
		return e.substr(R, 2) === "&&" ? (t = "&&", R += 2) : (t = n, U === 0 && J(Be)), t;
	}
	function ki() {
		let t;
		return e.substr(R, 2) === "||" ? (t = "||", R += 2) : (t = n, U === 0 && J(Ve)), t;
	}
	function Ai() {
		let t;
		return e.charCodeAt(R) === 33 ? (t = "!", R++) : (t = n, U === 0 && J(He)), t;
	}
	function ji() {
		let t;
		return e.substr(R, 2) === "==" ? (t = "==", R += 2) : (t = n, U === 0 && J(Ue)), t;
	}
	function Mi() {
		let t;
		return e.substr(R, 2) === "!=" ? (t = "!=", R += 2) : (t = n, U === 0 && J(We)), t;
	}
	function Ni() {
		let t;
		return e.substr(R, 2) === ">=" ? (t = ">=", R += 2) : (t = n, U === 0 && J(Ge)), t;
	}
	function Pi() {
		let t;
		return e.charCodeAt(R) === 62 ? (t = ">", R++) : (t = n, U === 0 && J(Ke)), t;
	}
	function Fi() {
		let t;
		return e.substr(R, 2) === "<=" ? (t = "<=", R += 2) : (t = n, U === 0 && J(qe)), t;
	}
	function Ii() {
		let t;
		return e.charCodeAt(R) === 60 ? (t = "<", R++) : (t = n, U === 0 && J(Je)), t;
	}
	function Li() {
		let t;
		return e.substr(R, 2) === "=~" ? (t = "=~", R += 2) : (t = n, U === 0 && J(Ye)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = R, e.substr(R, 2) === "in" ? (r = "in", R += 2) : (r = n, U === 0 && J(Xe)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = R, e.substr(R, 3) === "nin" ? (r = "nin", R += 3) : (r = n, U === 0 && J(Ze)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = R, e.substr(R, 8) === d ? (r = d, R += 8) : (r = n, U === 0 && J(S)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === f ? (r = f, R += 5) : (r = n, U === 0 && J(C)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === p ? (r = p, R += 6) : (r = n, U === 0 && J(Qe)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === m ? (r = m, R += 6) : (r = n, U === 0 && J($e)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === ee ? (r = ee, R += 4) : (r = n, U === 0 && J(w)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === h ? (r = h, R += 5) : (r = n, U === 0 && J(et)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Y() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === te ? (r = te, R += 4) : (r = n, U === 0 && J(tt)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === ne ? (r = ne, R += 5) : (r = n, U === 0 && J(nt)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === g ? (r = g, R += 4) : (r = n, U === 0 && J(T)), r === n ? (R = t, t = n) : (i = R, U++, a = Q(), U--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(R) === 123 ? (t = "{", R++) : (t = n, U === 0 && J(E)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(R) === 125 ? (t = "}", R++) : (t = n, U === 0 && J(rt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(R) === 91 ? (t = "[", R++) : (t = n, U === 0 && J(D)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(R) === 93 ? (t = "]", R++) : (t = n, U === 0 && J(it)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(R) === 58 ? (t = ":", R++) : (t = n, U === 0 && J(O)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(R) === 44 ? (t = ",", R++) : (t = n, U === 0 && J(k)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(R) === 40 ? (t = "(", R++) : (t = n, U === 0 && J(A)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(R) === 41 ? (t = ")", R++) : (t = n, U === 0 && J(at)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(R) === 63 ? (t = "?", R++) : (t = n, U === 0 && J(j)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (U++, t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, U === 0 && J(dt)), r !== n) {
			for (i = [], a = e.charAt(R), ce.test(a) ? R++ : (a = n, U === 0 && J(ft)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, U === 0 && J(M)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, U === 0 && J(pt)), s === n ? (R = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(R), ce.test(a) ? R++ : (a = n, U === 0 && J(ft)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, U === 0 && J(M)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, U === 0 && J(pt)), s === n ? (R = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(R) === 47 ? (a = "/", R++) : (a = n, U === 0 && J(dt)), a === n ? (R = t, t = n) : (z = t, t = cr(i));
		} else R = t, t = n;
		return U--, t === n && (r = n, U === 0 && J(ut)), t;
	}
	function ra() {
		let t, r, i;
		for (t = R, r = [], i = e.charAt(R), le.test(i) ? R++ : (i = n, U === 0 && J(mt)); i !== n;) r.push(i), i = e.charAt(R), le.test(i) ? R++ : (i = n, U === 0 && J(mt));
		return z = t, r = lr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = R, r = R, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else R = r, r = n;
		return t = r === n ? r : e.substring(t, R), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(R), ue.test(t) ? R++ : (t = n, U === 0 && J(ht)), t === n && (t = R, r = e.charAt(R), de.test(r) ? R++ : (r = n, U === 0 && J(gt)), r === n ? (R = t, t = n) : (i = e.charAt(R), fe.test(i) ? R++ : (i = n, U === 0 && J(_t)), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(R), y.test(t) ? R++ : (t = n, U === 0 && J(N))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (U++, t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, U === 0 && J(Pe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = R, e.charCodeAt(R) === 46 ? (o = ".", R++) : (o = n, U === 0 && J(Re)), o !== n) {
				if (s = [], c = e.charAt(R), y.test(c) ? R++ : (c = n, U === 0 && J(N)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(R), y.test(c) ? R++ : (c = n, U === 0 && J(N));
				else s = n;
				s === n ? (R = a, a = n) : (o = [o, s], a = o);
			} else R = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), z = t, t = ur(a, o);
		} else R = t, t = n;
		return U--, t === n && (r = n, U === 0 && J(vt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(R) === 48 ? (t = "0", R++) : (t = n, U === 0 && J(yt)), t === n) {
			if (t = R, r = e.charAt(R), pe.test(r) ? R++ : (r = n, U === 0 && J(bt)), r !== n) {
				for (i = [], a = e.charAt(R), y.test(a) ? R++ : (a = n, U === 0 && J(N)); a !== n;) i.push(a), a = e.charAt(R), y.test(a) ? R++ : (a = n, U === 0 && J(N));
				r = [r, i], t = r;
			} else R = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (U++, t = R, e.charCodeAt(R) === 48 ? (r = "0", R++) : (r = n, U === 0 && J(yt)), r === n) {
			if (r = R, e.charCodeAt(R) === 45 ? (i = "-", R++) : (i = n, U === 0 && J(Pe)), i === n && (i = null), a = e.charAt(R), pe.test(a) ? R++ : (a = n, U === 0 && J(bt)), a !== n) {
				for (o = [], s = e.charAt(R), y.test(s) ? R++ : (s = n, U === 0 && J(N)); s !== n;) o.push(s), s = e.charAt(R), y.test(s) ? R++ : (s = n, U === 0 && J(N));
				i = [
					i,
					a,
					o
				], r = i;
			} else R = r, r = n;
		}
		return r !== n && (z = t, r = dr()), t = r, U--, t === n && (r = n, U === 0 && J(xt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = R, r = e.charAt(R), me.test(r) ? R++ : (r = n, U === 0 && J(St)), r !== n) {
			if (i = e.charAt(R), _.test(i) ? R++ : (i = n, U === 0 && J(Oe)), i === n && (i = null), a = [], o = e.charAt(R), y.test(o) ? R++ : (o = n, U === 0 && J(N)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(R), y.test(o) ? R++ : (o = n, U === 0 && J(N));
			else a = n;
			a === n ? (R = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else R = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (U++, t = R, e.charCodeAt(R) === 34 ? (r = "\"", R++) : (r = n, U === 0 && J(Ct)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(R) === 34 ? (a = "\"", R++) : (a = n, U === 0 && J(Ct)), a === n ? (R = t, t = n) : (z = t, t = fr(i));
		} else R = t, t = n;
		if (t === n) {
			if (t = R, e.charCodeAt(R) === 39 ? (r = "'", R++) : (r = n, U === 0 && J(wt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(R) === 39 ? (a = "'", R++) : (a = n, U === 0 && J(wt)), a === n ? (R = t, t = n) : (z = t, t = pr(i));
			} else R = t, t = n;
		}
		return U--, t === n && (r = n, U === 0 && J(Ae)), t;
	}
	function fa() {
		let t, r, i;
		return t = R, r = R, U++, i = e.charAt(R), he.test(i) ? R++ : (i = n, U === 0 && J(Tt)), U--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = mr(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, U === 0 && J(M)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 34 ? (i = "\"", R++) : (i = n, U === 0 && J(Ct)), i === n ? (R = t, t = n) : (z = t, t = hr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, U === 0 && J(M)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = gr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = R, r = R, U++, i = e.charAt(R), ge.test(i) ? R++ : (i = n, U === 0 && J(Et)), U--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = _r(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, U === 0 && J(M)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 39 ? (i = "'", R++) : (i = n, U === 0 && J(wt)), i === n ? (R = t, t = n) : (z = t, t = vr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, U === 0 && J(M)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = yr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(R), _e.test(t) ? R++ : (t = n, U === 0 && J(Dt)), t === n && (t = R, r = R, i = e.charAt(R), de.test(i) ? R++ : (i = n, U === 0 && J(gt)), i === n ? (R = r, r = n) : (a = e.charAt(R), fe.test(a) ? R++ : (a = n, U === 0 && J(_t)), a === n ? (R = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, R)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, U === 0 && J(M)), r !== n && (z = t, r = br()), t = r, t === n && (t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, U === 0 && J(dt)), r !== n && (z = t, r = xr()), t = r, t === n && (t = R, e.charCodeAt(R) === 98 ? (r = "b", R++) : (r = n, U === 0 && J(Ot)), r !== n && (z = t, r = Sr()), t = r, t === n && (t = R, e.charCodeAt(R) === 102 ? (r = "f", R++) : (r = n, U === 0 && J(kt)), r !== n && (z = t, r = Cr()), t = r, t === n && (t = R, e.charCodeAt(R) === 110 ? (r = "n", R++) : (r = n, U === 0 && J(At)), r !== n && (z = t, r = wr()), t = r, t === n && (t = R, e.charCodeAt(R) === 114 ? (r = "r", R++) : (r = n, U === 0 && J(jt)), r !== n && (z = t, r = Tr()), t = r, t === n && (t = R, e.charCodeAt(R) === 116 ? (r = "t", R++) : (r = n, U === 0 && J(Mt)), r !== n && (z = t, r = Er()), t = r, t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, U === 0 && J(P)), r === n ? (R = t, t = n) : (i = R, a = R, o = e.charAt(R), ve.test(o) ? R++ : (o = n, U === 0 && J(Nt)), o === n ? (R = a, a = n) : (s = e.charAt(R), ye.test(s) ? R++ : (s = n, U === 0 && J(Pt)), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (e.substr(R, 2) === "\\u" ? (a = "\\u", R += 2) : (a = n, U === 0 && J(Ft)), a === n ? (R = t, t = n) : (o = R, s = R, c = e.charAt(R), ve.test(c) ? R++ : (c = n, U === 0 && J(Nt)), c === n ? (R = s, s = n) : (l = e.charAt(R), be.test(l) ? R++ : (l = n, U === 0 && J(It)), l === n ? (R = s, s = n) : (u = Z(), u === n ? (R = s, s = n) : (d = Z(), d === n ? (R = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, R), o === n ? (R = t, t = n) : (z = t, t = Dr(i, o))))), t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, U === 0 && J(P)), r === n ? (R = t, t = n) : (i = R, a = R, o = Z(), o === n ? (R = a, a = n) : (s = Z(), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (z = R, a = L(i), a = a ? n : void 0, a === n ? (R = t, t = n) : (z = t, t = Or(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(R), xe.test(t) ? R++ : (t = n, U === 0 && J(Lt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(R), oe.test(t) ? R++ : (t = n, U === 0 && J(Ne)), t;
	}
	function $() {
		let t, r;
		for (U++, t = [], r = e.charAt(R), Se.test(r) ? R++ : (r = n, U === 0 && J(Rt)); r !== n;) t.push(r), r = e.charAt(R), Se.test(r) ? R++ : (r = n, U === 0 && J(Rt));
		return U--, t;
	}
	function ga() {
		let t, r;
		return t = R, U++, e.length > R ? (r = e.charAt(R), R++) : (r = n, U === 0 && J(pt)), U--, r === n ? t = void 0 : (R = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && jr("Member name too long (maximum 1000 characters)"), e;
	}
	W = a();
	let va = W !== n && R === e.length;
	function ya() {
		throw W !== n && R < e.length && J(Nr()), Rr(H, V < e.length ? Mr(V) : null, V < e.length ? Ir(V, V + 1) : Ir(V, V));
	}
	if (t.peg$library) return {
		peg$result: W,
		peg$currPos: R,
		peg$FAILED: n,
		peg$maxFailExpected: H,
		peg$maxFailPos: V,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return W;
	ya();
}
var dt = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), ft = {
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
}, M = (e) => {
	throw new Ze(1, 1, e);
}, pt = (e) => e.type === "root" || e.type === "current", mt = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function ht(e) {
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
		if (pt(i)) r === "value" && !mt(i) && M("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && M(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = dt.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = ft[e], a = i.args;
				a.length !== n.args.length && M(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && M(`The result of ${e}() must be compared`), r === "value" && n.logical && M(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && M("A literal must be compared");
		}
	}
}
function gt(e) {
	let t;
	try {
		t = ut(e);
	} catch (e) {
		if (rt(e)) throw new Ze(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new Ze(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new Ze(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return ht(t), t;
}
var _t = /* @__PURE__ */ new Set([
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
]), N = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), vt = (e) => e >= 55296 && e <= 56319, yt = (e) => e >= 56320 && e <= 57343, bt = (e) => e !== void 0 && e >= "0" && e <= "9", xt = (e, t) => {
	let n = e.charCodeAt(t);
	return vt(n) && yt(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : vt(n) || yt(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, St = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !_t.has(n) ? null : n === "n" ? {
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
}, Ct = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return N.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, wt = (e, t) => {
	let n = e[t];
	return n === "\\" ? St(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : xt(e, t);
}, Tt = (e, t) => {
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
			let t = Ct(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = wt(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = wt(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, Et = (e, t) => {
	let n = t + 1, r = n;
	for (; bt(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; bt(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Dt = (e) => {
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
				let e = i ? Et(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = Tt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = Ct(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = St(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = xt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Ot = 1e3, kt = 1e3, At = 16, jt = /^[dgimsuy]*$/, Mt = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, P = class extends Error {}, Nt = 0, Pt = 1, Ft = 2, It = 3, Lt = 4, Rt = 5, zt = Je(2, 31) - 1, Bt = (e, t) => {
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
	return e.scratch = void 0, (r.gen > zt - t - 2 || r.step > zt - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Vt = /* @__PURE__ */ new Set([
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
]), Ht = /^\{(\d+)(?:,(\d*))?\}/, Ut = /^[0-9a-fA-F]{4}/, Wt = /^\(\?([ims]*)(?:-([ims]*))?:/, Gt = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Kt = class {
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
		if (this.i < this.src.length) throw new P("unexpected character");
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
				let r = Wt.exec(e.slice(t, t + 12));
				if (!r) throw new P("lookaround or named group");
				let i = Xe({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new P("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new P("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new P("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Vt.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new P("trailing backslash");
		if (r === "b" || r === "B") throw new P("word boundary");
		if (r >= "1" && r <= "9") throw new P("backreference");
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
			if (n === -1) throw new P("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Ut.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Ut.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = Ht.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Ot || i !== Infinity && i > Ot) throw new P("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, qt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Ot) throw new P("pattern too large");
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
		this.emit(Rt);
	}
	compile(e) {
		if (++this.work > 4 * Ot) throw new P("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Nt, this.atomId(e));
				return;
			case "bol":
				this.emit(It, +!!e.multiline);
				return;
			case "eol":
				this.emit(Lt, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Pt);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Ft)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Pt);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Ft, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Pt);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Jt = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Kt(e, r, t, n).parse(), a = new qt(r);
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
}, Yt = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, re = r.step;
	r.gen = g + t.length + 2, r.step = re + t.length + 2;
	let _ = 0, v = !1, ie = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case Nt:
					e[n++] = r;
					break;
				case Rt: return u(c), v = !0, n;
				case Ft:
					h[s++] = a[r];
					break;
				case Pt:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case It:
					(_ === 0 || a[r] === 1 && Gt(t.charCodeAt(_ - 1))) && (h[s++] = r + 1);
					break;
				case Lt: (_ === t.length || a[r] === 1 && Gt(t.charCodeAt(_))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = ie(d, 0, 0), v) return !0;
	for (; _ < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(_) : t.charCodeAt(_)) > 65535 ? 2 : 1, n = t.slice(_, _ + e), r = re + _ + 1;
		g++, m = 0, _ += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (te[i] !== r) {
				te[i] = r;
				let e = s[i];
				ne[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (ne[i] === 1 && (m = ie(f, m, t + 1), v)) return !0;
		}
		if (!l && (m = ie(f, m, 0), v)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Xt = (e, t, n) => {
	let r = Bt(e, t.length);
	try {
		return Yt(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Zt = 256, Qt = /* @__PURE__ */ new Map(), $t = 0, en = (e, t, n, r, i = !1) => {
	if (e.length > kt || t.length > 7 || !jt.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Qt.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Mt(s) > At ? null : Jt(n ? `^(?:${s})$` : s, t, i);
	$t >= Zt && (Qt.clear(), $t = 0);
	let l = Qt.get(s);
	return l === void 0 && Qt.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), $t++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, tn = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Xt(e, t, n);
}, nn = class {
	constructor(e) {
		this.nodes = e;
	}
}, rn = (e) => {
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
}, an = (e) => {
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
	return !rn(e);
}, on = 256, sn = /* @__PURE__ */ new Map(), cn = (e, t) => {
	let n = sn.get(e);
	return n === void 0 && (n = an(e), sn.size >= on && sn.clear(), sn.set(Array.from(e).join(""), n)), t(e.length), n;
}, ln = /* @__PURE__ */ new Map(), un = (e, t) => {
	let n = ln.get(e);
	return n === void 0 && (n = Dt(e), n !== null && (n = Array.from(n).join("")), ln.size >= on && ln.clear(), ln.set(Array.from(e).join(""), n)), t(e.length), n;
}, dn = 256, fn = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > kt) c = null;
		else if (o) {
			let n = un(e, i);
			c = n === null ? null : en(n, t, r, i, !0);
		} else c = cn(e, i) ? en(e, t, r, i) : null;
		s !== void 0 && (s.size >= dn && s.clear(), s.set(a, c));
	}
	return c !== null && tn(c, n, i);
}, pn = {
	length: (e, t) => {
		let n = e[0];
		if (A(n)) {
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
		if (D(n)) return E(n);
		if (O(n)) {
			let e = T(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !A(r) || !A(i) ? !1 : fn(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !A(r) || !A(i) ? !1 : fn(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, mn = (e, t, n = C) => e === void 0 && t === void 0 || $e(e, t, n), hn = (e, t, n = C) => !$e(e, t, n), gn = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, _n = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return gn(n) - gn(i);
	}
	return e.length - t.length;
}, vn = (e, t, n = C) => k(e) && k(t) ? e < t : A(e) && A(t) ? (n(Math.min(e.length, t.length)), _n(e, t) < 0) : !1, yn = (e, t, n = C) => vn(e, t, n) || mn(e, t, n), bn = (e, t, n = C) => k(e) && k(t) ? e > t : A(e) && A(t) ? (n(Math.min(e.length, t.length)), _n(e, t) > 0) : !1, xn = (e, t, n = C) => bn(e, t, n) || mn(e, t, n), Sn = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, Cn = (e, t, n) => {
	let r = E(e);
	for (let i = 0; i < r; i++) {
		let r = et(e, i);
		if (n(1 + Sn(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, wn = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Tn = (e) => typeof e == "string" && e.length + 1 > tt, En = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = E(e);
	for (let n = 0; n < a; n++) {
		let r = et(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Tn(r) ? i.long.push(r) : i.set.add(wn(r));
	}
	return n?.set(e, i), i;
}, Dn = ({ set: e, long: t }, n, r) => {
	if (Tn(n)) {
		for (let e of t) if (r(1 + Sn(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(wn(n)));
}, On = (e, t, n) => {
	let r = E(e);
	for (let i = 0; i < r; i++) if (n(), w(e, i) && t(e[i])) return !0;
	return !1;
}, kn = {
	eq: mn,
	ne: hn,
	lt: vn,
	le: yn,
	gt: bn,
	ge: xn,
	in: (e, t, n = C) => D(t) ? Cn(t, e, n) !== -1 : !1,
	nin: (e, t, n = C) => D(t) ? Cn(t, e, n) === -1 : !1,
	subsetof: (e, t, n = C, r) => {
		if (!D(e) || !D(t)) return !1;
		let i = En(t, n, r);
		return !On(e, (e) => !Dn(i, e, n), n);
	},
	anyof: (e, t, n = C, r) => {
		if (!D(e) || !D(t)) return !1;
		let i = En(t, n, r);
		return On(e, (e) => Dn(i, e, n), n);
	},
	noneof: (e, t, n = C, r) => {
		if (!D(e) || !D(t)) return !1;
		let i = En(t, n, r);
		return !On(e, (e) => Dn(i, e, n), n);
	},
	sizeof: (e, t) => !D(e) && !A(e) || !D(t) && !A(t) ? !1 : (D(e) ? E(e) : e.length) === (D(t) ? E(t) : t.length),
	size: (e, t) => !D(e) && !A(e) || !k(t) ? !1 : (D(e) ? E(e) : e.length) === t
}, An = (e) => !D(e) && !A(e) ? !1 : (D(e) ? E(e) : e.length) === 0, jn = (e, t, n, r = C, i) => !A(e) || !A(t) ? !1 : fn(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Mn = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), F = (e, t) => e.concat(`[${t}]`), Nn = (e, t) => e < 0 ? t + e : e, Pn = (e, t) => {
	let n = E(e), r = Nn(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: w(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, Fn = (e, t) => {
	for (let n of t) e.push(n);
}, In = 1e6, Ln = 100, Rn = 1e6, zn = 20, Bn = 1e4, Vn = 1e4, Hn = class {
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
					w(n, r) && this.visit(n[r]);
				} else if (w(n, t)) this.visit(n[t]);
				else if (++e.holes > Vn) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!w(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), D(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: E(e),
				i: 0,
				holes: 0
			});
			else if (O(e)) {
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
}, Un = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Mn(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Mn(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = E(e);
			for (let r = 0; r < n; r++) this.tick(), w(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Hn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Bn, Math.ceil((this.retained - this.retainedLimit) / zn))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new S(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(In, Ln * e.weight) + t, this.retainedLimit = Math.max(Rn, zn * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Hn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Bn, Math.ceil((this.steps - this.stepLimit) / Ln))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new S(`Query exceeded ${this.stepLimit} evaluation steps`);
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
			if (!O(e)) return;
			let r = this.canonicalName(n, n.value);
			if (w(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (D(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: F(t, r)
					});
				}), n;
			}
			if (O(e)) {
				let n = T(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) w(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!D(e)) return;
			let r = Pn(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: F(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (D(e)) {
				let r = Pn(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: F(t, r.index)
				} : void 0;
			}
			if (O(e)) {
				let r = String(n.value);
				return w(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!D(e)) return [];
			let r = E(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : Nn(n.start, r), o = n.end === null ? r : Nn(n.end, r)) : (a = n.start === null ? r - 1 : Nn(n.start, r), o = n.end === null ? -r - 1 : Nn(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: w(e, u) ? e[u] : void 0,
				paths: F(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (O(e.value)) {
						let t = this.handleIdentifier(e, r);
						j(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (O(e.value)) {
						let t = this.handleStringLiteral(e, r);
						j(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (D(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						j(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					Fn(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": Fn(n, this.handleBracketExpressionContent(e, r));
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
						j(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						Fn(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						Fn(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						j(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (O(e)) {
					let t = T(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else D(e) && i.push({
					parent: a,
					keys: null,
					length: E(e),
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
						if (!w(n, t)) continue;
						a = {
							value: n[t],
							paths: F(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!w(n, r)) continue;
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
						if (!k(i) || !k(r)) i = void 0;
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
					return k(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return An(n);
			if (t.operator === "reg") return jn(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = kn[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new nn(r.value) : new nn(j(r?.value) ? [r?.value] : []);
			}), i = pn[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : j(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : j(n);
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
					if (D(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: F(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (O(n)) {
						let i = T(n);
						this.tick(i.length);
						for (let a of i) {
							if (!w(n, a)) continue;
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
					if (!j(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) Fn(n, a);
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
				throw rt(e) ? new S("Query is nested too deeply") : it(e) ? new S("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? In, this.retainedLimit = this.adaptiveLimit ? Rn : Infinity;
	}
}, Wn = (e, t, n) => {
	let r = gt(t), i = new Un(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? at(i) ? [] : [i.value] : i?.value;
}, Gn = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Wn(e, i, n);
		j(t) && r.push(t);
	}
	return r;
}, I = (e, t, n = {}) => {
	try {
		return D(t) ? Gn(e, t, n) : Wn(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Kn = {
	unshift: (e, t) => e?.unshift(structuredClone(t)),
	push: (e, t) => e?.push(structuredClone(t)),
	unshiftSerialToRows: (e, t) => {
		e?.forEach((e, n) => {
			let r = structuredClone(t);
			r.textContent = n + 1, e?.children?.unshift(r);
		});
	},
	pushToRows: (e, t) => {
		e?.forEach((e) => {
			e?.children?.push(structuredClone(t));
		});
	}
}, qn = {
	applyTemplate: (e, t) => {
		let n = b[e.templateKey], r = x(I(t, e.sourcePath), n);
		I(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(r);
	},
	fromCollection: (e, t) => {
		let n = b[e.templateKey], r = Be(I(t, e.sourcePath), n);
		I(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...r);
	},
	rowOnColumn: (e, t) => {
		let n = He({
			columns: I(t, e.sourcePath?.columns),
			data: I(t, e.sourcePath?.rows),
			columnSpec: b[e.templateKey?.columnKey],
			rowSpec: b[e.templateKey?.rowKey]
		});
		I(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...n);
	},
	columnOnRow: (e, t) => {
		let n = Ue({
			columns: I(t, e.sourcePath?.columns),
			data: I(t, e.sourcePath?.rows),
			columnSpec: b[e.templateKey?.columnKey],
			rowSpec: b[e.templateKey?.rowKey]
		});
		I(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...n);
	}
}, Jn = (e, t, n = !1) => {
	if (e.skipIf && I(t.base, e.skipIf, { returnArray: !0 }).length > 0) return t;
	if (e.func === null) {
		let r = b[e.templateKey];
		if (r === void 0) throw Error(`Instruction spec not found: ${e.templateKey}`);
		let i = I(t, e.destinationPath?.jsonPath, { returnArray: !0 }), a = Kn[e.destinationPath?.action];
		return a?.(i[0], r), n && console.log("template : ", i, r), n && console.log("state : ", t), t;
	}
	let r = qn[e.func];
	if (!r) throw Error(`Unsupported instruction func: ${e.func}`);
	return r(e, t), n && console.log("state : ", t), t;
}, Yn = (e, t, n = !1) => {
	let r = Oe[e];
	if (!r) throw Error(`Single instruction not found: ${e}`);
	return Jn(r, t, n);
}, Xn = {
	"options-serial": [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				action: "unshiftSerialToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	"options-options-showButton": [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				action: "pushToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	"options-options-showEditButton": [
		{
			narration: "Append edit column width.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				action: "pushToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	"options-options-showDeleteButton": [
		{
			narration: "Append delete column width.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				action: "pushToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	"card-with-footer": [
		{
			narration: "Build card header content.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-header'].children"
			},
			sourcePath: "$.data",
			templateKey: "buildCardHeaderTemplate",
			func: "applyTemplate"
		},
		{
			narration: "Build card body content.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-body'].children"
			},
			sourcePath: "$.data",
			templateKey: "buildCardBodyTemplate",
			func: "applyTemplate"
		},
		{
			narration: "Build card footer content.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-footer'].children"
			},
			sourcePath: "$.data",
			templateKey: "buildCardFooterTemplate",
			func: "applyTemplate"
		}
	],
	"table-search-toolbar": [
		{
			narration: "Insert the search toolbar frame before the table.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base.children"
			},
			sourcePath: null,
			templateKey: "searchToolbar",
			func: null,
			skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
		},
		{
			narration: "Insert the search label into its configured slot.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-label-slot'].children"
			},
			sourcePath: null,
			templateKey: "searchLabel",
			func: null,
			skipIf: "$..*[?@.attributes.id == 'table-title']"
		},
		{
			narration: "Insert the search helper text into its configured slot.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-helper-slot'].children"
			},
			sourcePath: null,
			templateKey: "searchHelper",
			func: null,
			skipIf: "$..*[?@.attributes.id == 'search-feedback']"
		},
		{
			narration: "Insert the search input into its configured slot.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-input-slot'].children"
			},
			sourcePath: null,
			templateKey: "searchInput",
			func: null,
			skipIf: "$..*[?@.attributes.id == 'tableSearch']"
		}
	]
}, Zn = {
	single: Yn,
	multi: (e, t, n = !1) => {
		let r = Xn[e];
		if (!Array.isArray(r)) throw Error(`Multi instruction not found: ${e}`);
		return r.forEach((e) => Jn(e, t, n)), t;
	}
}, Qn = (e, t, n = !1) => {
	if (!e || typeof e != "object") throw Error(`Invalid instruction descriptor: expected { type, key }, got ${String(e)}`);
	let { type: r, key: i } = e, a = Zn[r];
	if (!a) throw Error(`Unsupported instruction type "${r}" for key "${i}". Expected "single" or "multi".`);
	return a(i, t, n);
}, $n = {
	name: "json-renderers-run-instructions",
	version: "1.14.1"
}, er = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.steps = {
		meta: $n,
		runInstructions: e
	});
}, tr = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	Qn(e, {
		base: t,
		data: n
	}, r);
}), t);
er(tr);
// ../json-renderers-build-table/node_modules/json-renderers-run-instructions/src/v22/runOptions/index.js
var nr = (e) => typeof e == "object" && !!e && !Array.isArray(e), rr = Array.from(/* @__PURE__ */ new Set([...Object.keys(Oe), ...Object.keys(Xn)])), ir = (e) => Oe[e] === void 0 ? Xn[e] === void 0 ? null : {
	type: "multi",
	key: e
} : {
	type: "single",
	key: e
}, ar = ({ node: e, prefix: t, sequence: n, seen: r }) => {
	let i = (e) => {
		if (!e) return;
		let t = `${e.type}:${e.key}`;
		r.has(t) || (r.add(t), n.push(e));
	};
	for (let [a, o] of Object.entries(e)) {
		if (o === !1 || o == null) continue;
		let e = `${t}-${a}`;
		if (i(ir(e)), nr(o)) ar({
			node: o,
			prefix: e,
			sequence: n,
			seen: r
		});
		else if (o === !0) {
			let t = `${e}-`;
			for (let e of rr) e.startsWith(t) && i(ir(e));
		}
	}
}, or = ({ options: e = {} } = {}) => {
	if (!nr(e)) return [];
	let t = [];
	return ar({
		node: e,
		prefix: "options",
		sequence: t,
		seen: /* @__PURE__ */ new Set()
	}), t;
}, sr = {
	name: "json-renderers-run-instructions",
	version: "1.22.1"
}, cr = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.render = {
		meta: sr,
		renderFunc: e
	});
}, lr = ({ instructionMainKey: e, instructionSubKey: t, data: n, options: r, showLog: i = !1 } = {}) => {
	let a = we[e]?.[t];
	if (!a) throw Error(`Definition not found: ${e}.${t}`);
	let o = b[a.baseFromSpec];
	if (o === void 0) throw Error(`Base spec not found: ${a.baseFromSpec}`);
	let s = structuredClone(o), c = a["instructions-type"] ?? [], l = r ? or({ options: r }) : [], u = [...c, ...l];
	return i && console.log("[v22] instructions : ", u), tr({
		instructions: u,
		base: s,
		data: n,
		showLog: i
	});
};
cr(lr);
// ../json-renderers-build-table/src/v63/index.js
var ur = ({ type: e, data: t, columns: n, options: r, targetHtmlId: i, classToApply: a = "", appendPosition: o = "replace", showLog: s }) => ve({
	jsonSpec: lr({
		instructionMainKey: "table",
		instructionSubKey: e,
		data: {
			columns: n,
			data: t
		},
		options: r
	}),
	targetHtmlId: i,
	appendPosition: o,
	classToApply: a,
	showLog: s
});
be(ur);
// node_modules/dom-primitive-engine/src/v19/register/meta.js
var dr = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, fr = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: dr,
		runInstructions: e
	});
}, pr = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, mr = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, hr = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: i }) => {
	let a = pr({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), o = mr(n, r), s = i[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof s != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return s(a, o, r);
}, gr = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, _r = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, vr = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, yr = /* @__PURE__ */ t({
	closest: () => gr,
	querySelector: () => _r,
	querySelectorAll: () => vr
}), br = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, xr = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, Sr = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? xr(e, {}, n) : br(e, {}, n);
		o[r] = s;
	}), o;
}, Cr = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = xr(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, wr = /* @__PURE__ */ t({
	mapNamedValues: () => Cr,
	mapValues: () => Sr,
	readText: () => br,
	readValue: () => xr
}), Tr = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, Er = /* @__PURE__ */ t({ isKey: () => Tr }), Dr = {
	...yr,
	...wr,
	...Er
}, L = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = hr({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: Dr
		});
	}
	return r;
};
// node_modules/dom-primitive-engine/src/v19/index.js
fr(L);
var Or = {
	readSearchValue: [{
		narration: "Read the current query text from the matched search input.",
		sourcePath: { fileName: "root" },
		func: "readValue"
	}],
	findHelperBadge: [{
		narration: "Walk up to the enclosing search toolbar.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "[data-role='search-toolbar']" }
	}, {
		narration: "Locate the helper badge element inside the search helper slot.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "[data-role='search-helper-slot'] > *" }
	}],
	findTableBody: [{
		narration: "Walk up to the enclosing table parent wrapper.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "[data-role='table-parent']" }
	}, {
		narration: "Drill down to the live tbody element for that table.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "table tbody" }
	}]
}, R = ({ data: e = [], columns: t = [], query: n = "" } = {}) => {
	let r = n.trim().toLowerCase();
	if (!r) return e;
	let i = t.map((e) => e?.columnName ?? e?.key).filter(Boolean);
	return e.filter((e) => (i.length > 0 ? i.map((t) => e?.[t]) : Object.values(e ?? {})).some((e) => e != null && String(e).toLowerCase().includes(r)));
}, z = {
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
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
	tableHeaderClickable: {
		tagName: "th",
		attributes: {
			class: "py-3 px-3 fw-semibold text-uppercase small user-select-none",
			role: "button",
			tabindex: "0",
			style: "cursor: pointer;",
			"data-column": "${columnName}",
			"data-sort-order": "none",
			"data-role": "sortable-header"
		},
		children: [{
			tagName: "span",
			attributes: { class: "d-inline-flex align-items-center gap-2" },
			children: [{
				tagName: "span",
				textContent: "${columnName}"
			}, {
				tagName: "span",
				textContent: "⇅",
				attributes: {
					class: "small opacity-75",
					"data-role": "sort-indicator"
				}
			}]
		}]
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
}, B = {
	name: "declarative-spec",
	version: "1.4.1"
}, V = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.spec = {
		meta: B,
		data: e
	});
}, H = z;
V(z);
// node_modules/json-transformer-funcs-primitive/src/v10/forAttributes/index.js
var U = (e) => typeof e == "object" && !!e && !Array.isArray(e), kr = (e, t) => {
	if (!U(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = q(t, i);
	return n;
}, W = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => q(t, e));
}, Ar = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, jr = (e, t) => Ar(e, t), Mr = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, G = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, K = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: G,
		applyTemplate: e
	});
}, q = (e, t, n) => {
	let r = e, i = t;
	Mr(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Ar(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = jr(a?.textContent, r)), "attributes" in a && (a.attributes = kr(a?.attributes, r)), "children" in a && (a.children = W(a?.children, r))), a);
};
K(q);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Nr = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Pr = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Fr = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Pr,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Ir = (e, t) => {
	let n = e, r = t;
	return Nr(n, r), n.map((e) => q(e, r));
};
Fr((e, t) => {
	let n = e;
	return Nr(n, t), n.map((e) => q(e, e[t]));
}, Ir);
// node_modules/json-transformer-funcs-two-dimensions/src/v10/index.js
var J = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = q(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? Ir(a, r) : [], i;
}), Lr = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => J({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), Rr = {
	version: "1.13.1",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, zr = (e) => {
	if (typeof globalThis > "u" || typeof e != "function") return;
	globalThis.ks ??= {};
	let t = {
		meta: Rr,
		buildSpecElement: e
	};
	globalThis.ks["json-to-tag"] = t, globalThis.ks.jsonToTag = t;
}, Br = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => Hr({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, Vr = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = Br({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, Hr = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? Br({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? Vr({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, Ur = "http://www.w3.org/2000/svg", Wr = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), Gr = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return Wr.has(t) ? document.createElementNS(Ur, t) : document.createElement(t);
}, Kr = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), qr = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), Jr = "http://www.w3.org/1999/xlink", Yr = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(Jr, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, Xr = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, Zr = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = Gr({ inTagName: e.tagName });
	return t ? (Kr({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), qr({
		inElement: t,
		inProperties: e.properties
	}), Yr({
		inElement: t,
		inAttributes: e.attributes
	}), Xr({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, Qr = (e = {}) => Hr({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: Zr
});
zr(Qr);
// src/v17/body/attachRowFeatures.js
var $r = ({ rowSpecs: e = [], options: t = {} } = {}) => {
	t?.serial && e.forEach((e, t) => {
		let n = structuredClone(H.buildBodyCell);
		n.textContent = t + 1, e.children.unshift(n);
	});
	let n = t?.options;
	if (!n || typeof n != "object") return e;
	let r = [
		[n.showButton, H.optionsButtonCell],
		[n.showEditButton, H.optionsEditButtonCell],
		[n.showDeleteButton, H.optionsDeleteButtonCell]
	];
	for (let [t, n] of r) t === !0 && n && e.forEach((e) => e.children.push(structuredClone(n)));
	return e;
}, ei = ({ data: e = [], columns: t = [], options: n = {} } = {}) => {
	let r = Lr({
		columns: t,
		data: e,
		columnSpec: H.buildBodyCell,
		rowSpec: H.buildBodyTr
	});
	return $r({
		rowSpecs: r,
		options: n
	}), Qr(r) ?? [];
}, ti = ({ table: e, targetTbody: t, badge: n = null, query: r = "", emptyStatusText: i = "Showing all records" } = {}) => {
	if (!e) return [];
	let a = R({
		data: e.data,
		columns: e.columns,
		query: r
	});
	if (e.state = a, n && (n.textContent = String(r).trim() ? `Showing ${a.length} of ${e.data.length} records` : i), t) {
		let n = ei({
			data: a,
			columns: e.columns,
			options: e.options
		});
		t.replaceChildren(...n);
	}
	return a;
}, ni = [["[data-role=\"search-input-slot\"] input", ({ target: e, table: t }) => {
	let n = L(e, Or.readSearchValue) ?? "", r = L(e, Or.findHelperBadge);
	ti({
		table: t,
		targetTbody: L(e, Or.findTableBody),
		badge: r,
		query: n
	});
}]], ri = ({ container: e, getTable: t }) => {
	e.addEventListener("input", (n) => {
		let r = t();
		if (r) for (let [t, i] of ni) {
			let a = n.target?.closest?.(t);
			if (a && e.contains(a)) {
				i({
					target: a,
					event: n,
					container: e,
					table: r
				});
				return;
			}
		}
	});
}, ii = {
	name: "dom-primitive-bindings",
	version: "5.0.0"
}, ai = (e, t = ii) => {
	if (e && typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.domPrimitiveBindings = {
		meta: t,
		...e
	}, globalThis.ks.bindEvents ??= e.bindEvents, globalThis.ks.domPrimitiveBindings;
}, oi = (e) => typeof e == "string" ? document.getElementById(e) || document.querySelector(e) : e && typeof e == "object" && "addEventListener" in e ? e : null, si = (e) => e && oi(e) || null, ci = [
	"event",
	"selector",
	"action"
], li = (e) => {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}, ui = (e) => !li(e) || Object.keys(e).length !== ci.length || !ci.every((t) => Object.hasOwn(e, t)) ? !1 : ci.every((t) => typeof e[t] == "string" && e[t].trim().length > 0), di = (e) => {
	if (!Array.isArray(e)) throw TypeError("bindings must be an array.");
	if (e.length === 0) throw TypeError("bindings must contain at least one binding.");
	return e.forEach((e, t) => {
		if (!ui(e)) throw TypeError(`bindings[${t}] must be an object with exactly three non-empty string properties: event, selector, and action.`);
	}), e;
}, fi = (e) => di(e), pi = (e) => {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}, mi = (e = {}) => {
	if (!pi(e)) throw TypeError("actions must be a plain, flat object.");
	for (let [t, n] of Object.entries(e)) if (typeof n != "function") throw TypeError(`actions.${t} must be a function.`);
	return e;
}, hi = (e, t, n = {}) => {
	let r = si(e);
	return r ? {
		container: r,
		bindings: fi(t),
		actions: mi(n)
	} : null;
}, gi = (e) => {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.event) ?? [];
		e.push(n), t.set(n.event, e);
	}
	return t;
}, _i = (e, t = {}) => gi(t && typeof t == "object" && Object.keys(t).length > 0 ? e.map((e) => e.action && typeof t[e.action] == "function" && typeof e.onExtract != "function" ? {
	...e,
	onExtract: (n, r, i) => {
		t[e.action](r, i, n);
	}
} : e) : e), vi = (e, t, n) => e.root === "event" || t?.type?.startsWith("key") ? t : n, yi = (e, t, n) => ({
	...e.clientData,
	event: t,
	targetElement: n
}), bi = ({ binding: e, event: t, matchElement: n }) => {
	let r = vi(e, t, n), i = yi(e, t, n), a = e.runner, o = typeof a == "function" ? a(r, e.instructions, i) : r;
	return o != null && typeof e.onExtract == "function" && e.onExtract(o, t, n), o;
}, xi = ({ bindings: e, event: t, container: n }) => {
	for (let r of e) {
		let e = t.target?.closest?.(r.selector);
		e && n.contains(e) && bi({
			binding: r,
			event: t,
			matchElement: e
		});
	}
}, Si = (e, t, n) => {
	e.addEventListener(t, (t) => {
		xi({
			bindings: n,
			event: t,
			container: e
		});
	});
}, Ci = (e, t) => {
	for (let [n, r] of t.entries()) Si(e, n, r);
	return e;
}, wi = () => "app", Ti = () => [{
	event: "click",
	selector: "#loadBtn",
	action: "loadData"
}], Ei = () => ({ loadData: () => {} }), Di = () => ({
	containerOrId: wi(),
	bindings: Ti(),
	actions: Ei()
}), Oi = (e, t = [], n = {}) => hi(e, t, n), ki = (e, t = [], n = {}) => {
	let r = Oi(e, t, n);
	if (!r) return null;
	let { container: i, bindings: a } = r;
	return Ci(i, _i(a, r.actions)), i;
};
ai({
	bindEvents: ki,
	check: Oi,
	sample: Di,
	sampleContainer: wi,
	sampleBindings: Ti,
	sampleActions: Ei
});
// src/v17/container/click/bindings.json
var Ai = [
	{
		event: "click",
		selector: "thead th[data-role='sortable-header']",
		action: "onSortHeader"
	},
	{
		event: "click",
		selector: ".ks-btn-show",
		action: "onRowShow"
	},
	{
		event: "click",
		selector: ".ks-btn-edit",
		action: "onRowEdit"
	},
	{
		event: "click",
		selector: ".ks-btn-delete",
		action: "onRowDelete"
	}
], ji = {
	findHeaderCells: [{
		narration: "Walk up from the clicked column header to its enclosing thead.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "thead" }
	}, {
		narration: "Collect all header cells in that thead row to refresh sort indicators.",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "th" }
	}],
	readSearchQuery: [
		{
			narration: "Walk up to the enclosing table parent container.",
			sourcePath: { fileName: "root" },
			func: "closest",
			arguments: { selector: "[data-role='table-parent']" }
		},
		{
			narration: "Locate the table search input if the search toolbar is rendered.",
			sourcePath: { fileName: "previous" },
			func: "querySelector",
			arguments: { selector: "[data-role='search-input-slot'] input" }
		},
		{
			narration: "Read any active search filter so sorting preserves filtered results.",
			sourcePath: { fileName: "previous" },
			func: "readValue"
		}
	],
	findHelperBadge: [{
		narration: "Walk up to the enclosing table parent container.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "[data-role='table-parent']" }
	}, {
		narration: "Locate the helper badge element inside the search helper slot.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "[data-role='search-helper-slot'] > *" }
	}],
	findTableBody: [{
		narration: "Walk up to the enclosing table element.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "table" }
	}, {
		narration: "Select the live tbody element for that table.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "tbody" }
	}]
}, Mi = ({ data: e, columnName: t, order: n } = {}) => (!Array.isArray(e) || e.length === 0 || !t || e.sort((e, r) => {
	let i = e?.[t], a = r?.[t];
	if (i == null && a == null) return 0;
	if (i == null) return 1;
	if (a == null) return -1;
	let o = Number(i), s = Number(a), c = i !== "" && a !== "" && !Number.isNaN(o) && !Number.isNaN(s) ? o - s : String(i).localeCompare(String(a), void 0, {
		numeric: !0,
		sensitivity: "base"
	});
	return n === "asc" ? c : -c;
}), e), Ni = ["table-primary", "table-warning"], Pi = (e = []) => e.map((e) => e?.columnName ?? e?.key).filter(Boolean), Fi = (e, t, n) => {
	typeof CustomEvent == "function" && typeof e?.dispatchEvent == "function" && e.dispatchEvent(new CustomEvent(t, {
		bubbles: !0,
		detail: n
	}));
}, Ii = (e = {}, t = []) => {
	let n = Pi(t);
	return (n.length > 0 ? n.map((t) => e?.[t]) : Object.values(e ?? {})).filter((e) => e != null && String(e).trim() !== "").slice(0, 2).map(String).join(" · ") || "record";
}, Li = (e, t, n) => {
	e?.children && t?.classList && (Array.from(e.children).forEach((e) => {
		Ni.forEach((t) => e.classList?.remove?.(t));
	}), t.classList.add(n));
}, Ri = ({ matchElement: e, table: t, instructions: n }) => {
	let r = L(e, n.findRow), i = L(e, n.findTableBody);
	if (!r || !i) return null;
	let a = Array.from(i.children ?? []).indexOf(r), o = Pi(t.columns), s = t.options?.serial ? [null, ...o] : o, c = L(e, n.readRowValues, { columns: s }) ?? {};
	return {
		row: r,
		tbody: i,
		rowIndex: a,
		extractedRow: c,
		record: a >= 0 && t.state?.[a] ? t.state[a] : c,
		badge: n.findHelperBadge ? L(e, n.findHelperBadge) : null
	};
}, zi = ({ matchElement: e, event: t, table: n, instructions: r, rowClass: i, statusVerb: a, callbackName: o, eventName: s }) => {
	let c = Ri({
		matchElement: e,
		table: n,
		instructions: r
	});
	if (!c) return null;
	if (Li(c.tbody, c.row, i), c.badge) {
		let e = Ii(c.record, n.columns);
		c.badge.textContent = `${a}: ${e}`;
	}
	let l = {
		rowIndex: c.rowIndex,
		record: c.record,
		extractedRow: c.extractedRow,
		row: c.row,
		table: n
	};
	return n.actions?.[o]?.({
		event: t,
		matchElement: e,
		...l
	}), Fi(e, s, l), c;
}, Bi = ({ headerCells: e = [], sortColumn: t, sortOrder: n }) => {
	e.forEach((e) => {
		let r = e.dataset?.column ?? e.getAttribute?.("data-column"), i = e.querySelector?.("[data-role='sort-indicator']");
		r === t ? (e.setAttribute?.("data-sort-order", n), i && (i.textContent = n === "asc" ? "↑" : "↓")) : e.hasAttribute?.("data-sort-order") && (e.setAttribute?.("data-sort-order", "none"), i && (i.textContent = "⇅"));
	});
}, Vi = ({ matchElement: e, event: t, table: n }) => {
	let r = e?.dataset?.column ?? e?.getAttribute?.("data-column");
	if (!r) return;
	let i = n.sortColumn === r && n.sortOrder === "asc" ? "desc" : "asc";
	n.sortColumn = r, n.sortOrder = i, Mi({
		data: n.data,
		columnName: r,
		order: i
	}), Bi({
		headerCells: L(e, ji.findHeaderCells) ?? [],
		sortColumn: r,
		sortOrder: i
	});
	let a = L(e, ji.readSearchQuery) ?? "", o = L(e, ji.findHelperBadge);
	ti({
		table: n,
		targetTbody: L(e, ji.findTableBody),
		badge: o,
		query: a
	});
	let s = {
		columnName: r,
		sortOrder: i,
		state: n.state,
		table: n
	};
	n.actions?.onSort?.({
		event: t,
		matchElement: e,
		...s
	}), Fi(e, "ks:table:sort", s);
}, Hi = {
	findRow: [{
		narration: "Walk up from the Show button to its enclosing table row.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	}],
	findTableBody: [{
		narration: "Walk up from the Show button to the enclosing tbody.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tbody" }
	}],
	readRowValues: [
		{
			narration: "Walk up from the Show button to its enclosing row.",
			sourcePath: { fileName: "root" },
			func: "closest",
			arguments: { selector: "tr" }
		},
		{
			narration: "Collect all cell elements inside that row.",
			sourcePath: { fileName: "previous" },
			func: "querySelectorAll",
			arguments: { selector: "td" }
		},
		{
			narration: "Map cell texts onto configured column keys.",
			sourcePath: { fileName: "previous" },
			func: "mapValues",
			arguments: { read: "text" }
		}
	],
	findHelperBadge: [{
		narration: "Walk up to the enclosing table parent wrapper.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "[data-role='table-parent']" }
	}, {
		narration: "Locate the helper badge element inside the search helper slot.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "[data-role='search-helper-slot'] > *" }
	}]
}, Ui = ({ matchElement: e, event: t, table: n }) => zi({
	matchElement: e,
	event: t,
	table: n,
	instructions: Hi,
	rowClass: "table-primary",
	statusVerb: "Selected",
	callbackName: "onShow",
	eventName: "ks:table:show"
}), Wi = {
	findRow: [{
		narration: "Walk up from the Edit button to its enclosing table row.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	}],
	findTableBody: [{
		narration: "Walk up from the Edit button to the enclosing tbody.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tbody" }
	}],
	readRowValues: [
		{
			narration: "Walk up from the Edit button to its enclosing row.",
			sourcePath: { fileName: "root" },
			func: "closest",
			arguments: { selector: "tr" }
		},
		{
			narration: "Collect all cell elements inside that row.",
			sourcePath: { fileName: "previous" },
			func: "querySelectorAll",
			arguments: { selector: "td" }
		},
		{
			narration: "Map cell texts onto configured column keys.",
			sourcePath: { fileName: "previous" },
			func: "mapValues",
			arguments: { read: "text" }
		}
	],
	findHelperBadge: [{
		narration: "Walk up to the enclosing table parent wrapper.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "[data-role='table-parent']" }
	}, {
		narration: "Locate the helper badge element inside the search helper slot.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "[data-role='search-helper-slot'] > *" }
	}]
}, Gi = ({ matchElement: e, event: t, table: n }) => zi({
	matchElement: e,
	event: t,
	table: n,
	instructions: Wi,
	rowClass: "table-warning",
	statusVerb: "Editing",
	callbackName: "onEdit",
	eventName: "ks:table:edit"
}), Y = {
	findRow: [{
		narration: "Walk up from the Delete button to its enclosing table row.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	}],
	findTableBody: [{
		narration: "Walk up from the Delete button to the enclosing tbody.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tbody" }
	}],
	readRowValues: [
		{
			narration: "Walk up from the Delete button to its enclosing row.",
			sourcePath: { fileName: "root" },
			func: "closest",
			arguments: { selector: "tr" }
		},
		{
			narration: "Collect all cell elements inside that row.",
			sourcePath: { fileName: "previous" },
			func: "querySelectorAll",
			arguments: { selector: "td" }
		},
		{
			narration: "Map cell texts onto configured column keys.",
			sourcePath: { fileName: "previous" },
			func: "mapValues",
			arguments: { read: "text" }
		}
	],
	readSearchQuery: [
		{
			narration: "Walk up to the enclosing table parent container.",
			sourcePath: { fileName: "root" },
			func: "closest",
			arguments: { selector: "[data-role='table-parent']" }
		},
		{
			narration: "Locate the table search input if the search toolbar is rendered.",
			sourcePath: { fileName: "previous" },
			func: "querySelector",
			arguments: { selector: "[data-role='search-input-slot'] input" }
		},
		{
			narration: "Read any active search filter before repainting rows.",
			sourcePath: { fileName: "previous" },
			func: "readValue"
		}
	],
	findHelperBadge: [{
		narration: "Walk up to the enclosing table parent wrapper.",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "[data-role='table-parent']" }
	}, {
		narration: "Locate the helper badge element inside the search helper slot.",
		sourcePath: { fileName: "previous" },
		func: "querySelector",
		arguments: { selector: "[data-role='search-helper-slot'] > *" }
	}]
}, Ki = ({ table: e, context: t }) => {
	let n = e.data.indexOf(t.record);
	if (n >= 0) return n;
	let r = Pi(e.columns);
	return r.length > 0 ? e.data.findIndex((e) => r.every((n) => String(e?.[n] ?? "") === String(t.extractedRow?.[n] ?? ""))) : e.state === e.data ? t.rowIndex : -1;
}, qi = ({ matchElement: e, event: t, table: n }) => {
	let r = Ri({
		matchElement: e,
		table: n,
		instructions: Y
	});
	if (!r) return;
	let i = {
		rowIndex: r.rowIndex,
		record: r.record,
		extractedRow: r.extractedRow,
		row: r.row,
		table: n
	};
	if (n.actions?.onDelete?.({
		event: t,
		matchElement: e,
		...i
	}) === !1) return;
	let a = Ki({
		table: n,
		context: r
	});
	a >= 0 && n.data.splice(a, 1);
	let o = L(e, Y.readSearchQuery) ?? "";
	ti({
		table: n,
		targetTbody: r.tbody,
		badge: r.badge,
		query: o,
		emptyStatusText: `Showing ${n.data.length} records`
	}), Fi(e, "ks:table:delete", i);
}, Ji = (e, t, n) => (r, i) => {
	let a = t();
	a && e({
		matchElement: i,
		event: r,
		container: n,
		table: a
	});
}, Yi = ({ container: e, getTable: t }) => {
	ki(e, Ai, {
		onSortHeader: Ji(Vi, t, e),
		onRowShow: Ji(Ui, t, e),
		onRowEdit: Ji(Gi, t, e),
		onRowDelete: Ji(qi, t, e)
	});
}, Xi = /* @__PURE__ */ new WeakMap(), Zi = ({ targetContainerId: e, table: t } = {}) => {
	if (typeof document > "u" || !e || !t) return;
	let n = document.getElementById(e);
	if (!n) return;
	let r = Xi.has(n);
	if (Xi.set(n, t), r) return;
	let i = () => Xi.get(n);
	ri({
		container: n,
		getTable: i
	}), Yi({
		container: n,
		getTable: i
	});
}, Qi = class {
	constructor({ data: e = [], columns: t = [], options: n = {}, actions: r = {} } = {}) {
		this.data = e, this.columns = t, this.options = n, this.actions = r, this.sortColumn = null, this.sortOrder = "none", this.state = e;
	}
	render({ targetContainerId: e = "", type: t = "withFooter", appendPosition: n = "replace", autoHookEvents: r = !0 } = {}) {
		if (!e) return console.warn("[json-to-dom-table v17] Missing targetContainerId in render()."), null;
		this.sortColumn = null, this.sortOrder = "none", this.state = this.data;
		let i = ur({
			type: t,
			data: this.data,
			columns: this.columns,
			options: this.options,
			targetHtmlId: e,
			appendPosition: n,
			classToApply: ""
		});
		return r && Zi({
			targetContainerId: e,
			table: this
		}), i;
	}
};
// src/v17/index.js
r(Qi);
var X = Qi;
export { Qi as Table, X as default };
