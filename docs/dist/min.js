// src/v14/meta.js
var e = {
	version: "1.14.1",
	description: "Lean class-based Table with modular addListeners, sortData, and updateHeaderState steps"
}, t = (t) => {
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks.jsonToDom ??= {}, globalThis.ks.jsonToDom.table ??= {}, globalThis.ks.jsonToDom.table.v12 = {
		meta: e,
		Table: t
	}, globalThis.ks.jsonToDom.table.build = {
		meta: e,
		Table: t
	});
}, n = {
	version: "42.1.4",
	name: "json-to-dom"
}, r = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: n,
		appendToDom: e
	});
}, i = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, a = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: i,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, o = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => c({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, s = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = o({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, c = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? o({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? s({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, l = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, u = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, d = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, f = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, p = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, m = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, ee = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	l({
		inNode: r,
		inErrors: a
	}) && (u({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), d({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), f({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), p({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), m({
		inNode: r,
		inErrors: a
	}));
}, h = {
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
}, te = {
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
}, ne = {
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
}, g = {
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
}, re = {
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
}, _ = {
	name: "spec-repo",
	version: "1.17.1"
};
// ../json-renderers-build-table/node_modules/spec-repo/src/v19/index.js
(({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: _,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
})({
	spec: te,
	tags: ne,
	tagsSchema: g,
	instructions: re,
	definitions: h
});
// ../json-renderers-build-table/node_modules/json-to-tag-validate/src/v4/index.js
function v({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? ne, a = [];
	return c({
		inSpec: r,
		inFunc: (e) => {
			ee({
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
var ie = "http://www.w3.org/2000/svg", ae = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), oe = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return ae.has(t) ? document.createElementNS(ie, t) : document.createElement(t);
}, se = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), ce = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), le = "http://www.w3.org/1999/xlink", ue = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(le, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, de = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, fe = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = oe({ inTagName: e.tagName });
	return t ? (se({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), ce({
		inElement: t,
		inProperties: e.properties
	}), ue({
		inElement: t,
		inAttributes: e.attributes
	}), de({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, y = (e = {}) => c({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: fe
});
a({
	buildSpecElement: y,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = v({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), c({
			inSpec: t,
			inFunc: fe
		});
	}
});
// ../json-renderers-build-table/node_modules/spec-to-dom/src/v2/register/meta.js
var pe = {
	version: "2.1.1",
	name: "spec-to-dom"
}, me = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: pe,
		appendToDom: e
	});
}, he = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
me(he);
// ../json-renderers-build-table/node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var ge = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => he({
	buildSpec: y(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
r(ge);
// ../json-renderers-build-table/src/v63/registerGlobal/meta.js
var _e = {
	name: "json-renderers-build-table",
	version: "1.63.1"
}, ve = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.table = {
		meta: _e,
		render: e
	});
}, ye = {
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
}, be = {
	name: "declarative-definitions",
	version: "1.6.1"
}, xe = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.definitions = {
		meta: be,
		data: e
	});
}, Se = ye;
xe(ye);
var Ce = {
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
}, we = {
	name: "declarative-spec",
	version: "1.4.1"
}, Te = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.spec = {
		meta: we,
		data: e
	});
}, b = Ce;
Te(Ce);
// ../json-renderers-build-table/node_modules/declarative-instructions-single/src/v5/index.js
var Ee = {
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
}, De = (e) => typeof e == "object" && !!e && !Array.isArray(e), Oe = (e, t) => {
	if (!De(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = x(t, i);
	return n;
}, ke = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => x(t, e));
}, Ae = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, je = (e, t) => Ae(e, t), Me = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Ne = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Pe = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Ne,
		applyTemplate: e
	});
}, x = (e, t, n) => {
	let r = e, i = t;
	Me(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Ae(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = je(a?.textContent, r)), "attributes" in a && (a.attributes = Oe(a?.attributes, r)), "children" in a && (a.children = ke(a?.children, r))), a);
};
Pe(x);
// ../json-renderers-build-table/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Fe = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Ie = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Le = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Ie,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Re = (e, t) => {
	let n = e, r = t;
	return Fe(n, r), n.map((e) => x(e, r));
};
Le((e, t) => {
	let n = e;
	return Fe(n, t), n.map((e) => x(e, e[t]));
}, Re);
// ../json-renderers-build-table/node_modules/json-transformer-funcs-two-dimensions/src/v10/index.js
var ze = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = x(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? Re(a, r) : [], i;
}), Be = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => ze({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), Ve = ({ columns: e = [], data: t = [], rows: n, columnSpec: r, rowSpec: i } = {}) => {
	let a = n ?? (Array.isArray(t) ? t : t?.data ?? t?.rows ?? []);
	return ze({
		outer: e,
		outerSpec: r,
		innerSpec: i,
		getInner: (e) => Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : a.map((t) => ({
			...t,
			rowValue: t[e.columnName] ?? t.value ?? t
		}))
	});
}, He = Object.defineProperty, Ue = Object.getOwnPropertySymbols, We = Object.prototype.hasOwnProperty, Ge = Object.prototype.propertyIsEnumerable, Ke = Math.pow, qe = (e, t, n) => t in e ? He(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Je = (e, t) => {
	for (var n in t ||= {}) We.call(t, n) && qe(e, n, t[n]);
	if (Ue) for (var n of Ue(t)) Ge.call(t, n) && qe(e, n, t[n]);
	return e;
}, Ye = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, Xe = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, S = () => void 0, Ze = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = T(e);
		return r === T(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = w(e), a = w(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, Qe = (e, t, n = S) => {
	let r = [];
	if (!Ze(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Ze($e(e.x, t), $e(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !C(o, i) || !C(a, i)) return !1;
			let s = a[i];
			if (!C(o, i) || !Ze(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, C = (e, t) => Object.prototype.hasOwnProperty.call(e, t), $e = (e, t) => C(e, t) ? e[t] : void 0, et = 16383, tt = 1e3, w = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > tt) throw new Xe(`Member name too long (maximum ${tt} characters)`);
	return t;
}, T = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, nt = (e) => e instanceof RangeError && /call stack/i.test(e.message), E = (e) => Array.isArray(e), rt = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), D = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, O = (e) => typeof e == "number", k = (e) => typeof e == "string", it = (e) => e === void 0, A = (e) => e !== void 0;
function at(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function ot(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function st(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var ct = class extends SyntaxError {
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
function lt(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Rr }, a = Rr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", re = /^[,\]]/, _ = /^[+\-]/, v = /^[*\/]/, ie = /^[a-zA-Z_]/, ae = /^[\x80-\uFFFF_]/, oe = /^[a-zA-Z0-9_]/, se = /^[0-9@$\-]/, ce = /^[^\/\\]/, le = /^[gimsuy]/, ue = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, de = /^[\uD800-\uDBFF]/, fe = /^[\uDC00-\uDFFF]/, y = /^[0-9]/, pe = /^[1-9]/, me = /^[eE]/, he = /^["\\]/, ge = /^['\\]/, _e = /^[ -\uD7FF\uE000-\uFFFF]/, ve = /^[dD]/, ye = /^[89abAB]/, be = /^[c-fC-F]/, xe = /^[0-9a-fA-F]/, Se = /^[ \t\n\r]/, Ce = q([",", "]"], !1, !1, !1), we = K("length", !1), Te = K("count", !1), b = K("match", !1), Ee = K("search", !1), De = K("value", !1), Oe = q(["+", "-"], !1, !1, !1), ke = q(["*", "/"], !1, !1, !1), Ae = Pr("string"), je = q([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Me = q([["", "￿"], "_"], !1, !1, !1), Ne = q([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Pe = K("-", !1), x = q([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Fe = K("$", !1), Ie = K("@", !1), Le = K("..", !1), Re = K(".", !1), ze = K("*", !1), Be = K("&&", !1), Ve = K("||", !1), He = K("!", !1), Ue = K("==", !1), We = K("!=", !1), Ge = K(">=", !1), Ke = K(">", !1), qe = K("<=", !1), Je = K("<", !1), Ye = K("=~", !1), Xe = K("in", !1), S = K("nin", !1), Ze = K("subsetof", !1), Qe = K("anyof", !1), C = K("noneof", !1), $e = K("sizeof", !1), et = K("size", !1), tt = K("empty", !1), w = K("true", !1), T = K("false", !1), nt = K("null", !1), E = K("{", !1), rt = K("}", !1), D = K("[", !1), O = K("]", !1), k = K(":", !1), it = K(",", !1), A = K("(", !1), lt = K(")", !1), ut = K("?", !1), dt = Pr("regex"), j = K("/", !1), ft = q(["/", "\\"], !0, !1, !1), M = K("\\", !1), pt = Mr(), mt = q([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), ht = q([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), gt = q([["\ud800", "\udbff"]], !1, !1, !1), _t = q([["\udc00", "\udfff"]], !1, !1, !1), N = q([["0", "9"]], !1, !1, !1), vt = Pr("number"), yt = K("0", !1), bt = q([["1", "9"]], !1, !1, !1), xt = Pr("integer"), St = q(["e", "E"], !1, !1, !1), Ct = K("\"", !1), wt = K("'", !1), Tt = q(["\"", "\\"], !1, !1, !1), Et = q(["'", "\\"], !1, !1, !1), Dt = q([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Ot = K("b", !1), kt = K("f", !1), At = K("n", !1), P = K("r", !1), jt = K("t", !1), Mt = K("u", !1), Nt = q(["d", "D"], !1, !1, !1), Pt = q([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Ft = K("\\u", !1), It = q([["c", "f"], ["C", "F"]], !1, !1, !1), Lt = q([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Rt = q([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function zt(e) {
		return {
			type: "root",
			next: at(e)
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
		return st(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function en(e, t) {
		return st(e, t, (e, t) => ({
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
		return t !== null || ot(e);
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
	function F() {
		return "value";
	}
	function I(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function jn(e, t) {
		return t.length === 0 ? e : st(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function L(e, t) {
		return t.length === 0 ? e : st(e, t, (e, t) => ({
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
			next: at(e)
		};
	}
	function Pn(e) {
		return {
			type: "current",
			next: at(e)
		};
	}
	function Fn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function In() {
		return { type: "wildcard" };
	}
	function Ln(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Rn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function zn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Bn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Vn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function R(e) {
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
		let n = parseFloat(kr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function lr() {
		let e = parseInt(kr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function z(e) {
		return e.join("");
	}
	function ur(e) {
		return e.join("");
	}
	function dr(e) {
		return e;
	}
	function fr() {
		return "\"";
	}
	function pr(e) {
		return e;
	}
	function mr(e) {
		return e;
	}
	function hr() {
		return "'";
	}
	function gr(e) {
		return e;
	}
	function _r() {
		return "\\";
	}
	function B() {
		return "/";
	}
	function vr() {
		return "\b";
	}
	function yr() {
		return "\f";
	}
	function br() {
		return "\n";
	}
	function xr() {
		return "\r";
	}
	function Sr() {
		return "	";
	}
	function Cr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function wr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Tr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let V = t.peg$currPos | 0, H = V, U = [{
		line: 1,
		column: 1
	}], W = V, Er = t.peg$maxFailExpected || [], G = t.peg$silentFails | 0, Dr = /* @__PURE__ */ new Map(), Or;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function kr() {
		return e.substring(H, V);
	}
	function Ar(e, t) {
		throw t = t === void 0 ? J(H, V) : t, Ir(e, t);
	}
	function jr(t = V) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function K(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function q(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Mr() {
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
		let n = U[t], r;
		if (n) return n;
		if (t >= U.length) r = U.length - 1;
		else for (r = t; !U[--r];);
		for (n = U[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return U[t] = n, n;
	}
	function J(e, t, n) {
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
	function Y(e) {
		V < W || (V > W && (W = V, Er = []), Er.push(e));
	}
	function Ir(e, t) {
		return new ct(e, null, null, t);
	}
	function Lr(e, t, n) {
		return new ct(ct.buildMessage(e, t), e, t, n);
	}
	function Rr() {
		let e, t, r, i;
		return e = V, t = Si(), t === n ? (V = e, e = n) : (r = zr(), i = ga(), i === n ? (V = e, e = n) : (H = e, e = zt(r))), e;
	}
	function zr() {
		let e, t, r, i, a;
		for (e = V, t = [], r = V, i = $(), a = Br(), a === n ? (V = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = V, i = $(), a = Br(), a === n ? (V = r, r = n) : (i = [i, a], r = i);
		return H = e, t = Bt(t), e = t, e;
	}
	function Br() {
		let e;
		return e = Hr(), e === n && (e = Vr()), e;
	}
	function Vr() {
		let e, t, r;
		return e = V, t = Ti(), t === n ? (V = e, e = n) : (r = Ur(), r === n ? (V = e, e = n) : (H = e, e = Vt(r))), e === n && (e = V, t = Gr(), t !== n && (H = e, t = Ht(t)), e = t), e;
	}
	function Hr() {
		let e, t, r;
		return e = V, t = wi(), t === n ? (V = e, e = n) : (r = Wr(), r === n ? (V = e, e = n) : (H = e, e = Ut(r))), e;
	}
	function Ur() {
		let e, t;
		return e = V, t = Ei(), t !== n && (H = e, t = Wt()), e = t, e === n && (e = V, t = xi(), t !== n && (H = e, t = Gt(t)), e = t), e;
	}
	function Wr() {
		let e, t;
		return e = V, t = Ei(), t !== n && (H = e, t = Kt()), e = t, e === n && (e = V, t = xi(), t !== n && (H = e, t = qt(t)), e = t, e === n && (e = V, t = Gr(), t !== n && (H = e, t = Jt(t)), e = t)), e;
	}
	function Gr() {
		let e, t, r, i;
		return e = V, t = Xi(), t === n ? (V = e, e = n) : ($(), r = Kr(), r === n ? (V = e, e = n) : ($(), i = Zi(), i === n ? (V = e, e = n) : (H = e, e = Yt(r)))), e;
	}
	function Kr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ui(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ui(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ui(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Xt(t, r);
		} else V = e, e = n;
		return e;
	}
	function qr() {
		let t, r, i, a, o, s, c, l, u;
		return t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = $i(), i === n ? (V = t, t = n) : ($(), a = Jr(), a === n ? (V = t, t = n) : ($(), o = ea(), o === n ? (V = t, t = n) : (s = V, G++, c = V, l = $(), u = e.charAt(V), re.test(u) ? V++ : (u = n, G === 0 && Y(Ce)), u === n ? (V = c, c = n) : (l = [l, u], c = l), G--, c === n ? s = n : (V = s, s = void 0), s === n ? (V = t, t = n) : (H = t, t = Zt(a)))))), t === n && (t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = Jr(), i === n ? (V = t, t = n) : (H = t, t = Qt(i)))), t;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c, l = V * 91 + 10, u = Dr.get(l);
		if (u) return V = u.nextPos, u.result;
		if (e = V, t = Yr(), t !== n) {
			for (r = [], i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Yr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Yr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = $t(t, r);
		} else V = e, e = n;
		return Dr.set(l, {
			nextPos: V,
			result: e
		}), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = Xr(), t !== n) {
			for (r = [], i = V, a = $(), o = Di(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Di(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = en(t, r);
		} else V = e, e = n;
		return e;
	}
	function Xr() {
		let e, t, r, i, a;
		return e = V, t = ki(), t === n ? (V = e, e = n) : ($(), r = $i(), r === n ? (V = e, e = n) : ($(), i = Jr(), i === n ? (V = e, e = n) : ($(), a = ea(), a === n ? (V = e, e = n) : (H = e, e = tn(i))))), e === n && (e = V, t = ki(), t === n ? (V = e, e = n) : ($(), r = ei(), r === n ? (V = e, e = n) : (H = e, e = nn(r))), e === n && (e = Zr())), e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = V, t = ai(), t === n ? (V = e, e = n) : (r = V, i = $(), a = Qr(), a === n ? (V = r, r = n) : (i = [i, a], r = i), r === n && (r = null), H = V, i = rn(t, r), i = i ? void 0 : n, i === n ? (V = e, e = n) : (H = e, e = an(t, r))), e === n && (e = ei()), e;
	}
	function Qr() {
		let e, t, r;
		return e = V, t = $r(), t === n ? (V = e, e = n) : ($(), r = ai(), r === n ? (V = e, e = n) : (H = e, e = on(t, r))), e === n && (e = V, t = Ii(), t === n ? (V = e, e = n) : ($(), r = di(), r === n ? (V = e, e = n) : (H = e, e = sn(r))), e === n && (e = V, t = Wi(), t !== n && (H = e, t = cn()), e = t)), e;
	}
	function $r() {
		let e, t;
		return e = V, t = Ai(), t !== n && (H = e, t = ln()), e = t, e === n && (e = V, t = ji(), t !== n && (H = e, t = un()), e = t, e === n && (e = V, t = Pi(), t !== n && (H = e, t = dn()), e = t, e === n && (e = V, t = Fi(), t !== n && (H = e, t = fn()), e = t, e === n && (e = V, t = Mi(), t !== n && (H = e, t = pn()), e = t, e === n && (e = V, t = Ni(), t !== n && (H = e, t = mn()), e = t, e === n && (e = V, t = Li(), t !== n && (H = e, t = hn()), e = t, e === n && (e = V, t = Ri(), t !== n && (H = e, t = gn()), e = t, e === n && (e = V, t = zi(), t !== n && (H = e, t = _n()), e = t, e === n && (e = V, t = Bi(), t !== n && (H = e, t = vn()), e = t, e === n && (e = V, t = Vi(), t !== n && (H = e, t = yn()), e = t, e === n && (e = V, t = Hi(), t !== n && (H = e, t = bn()), e = t, e === n && (e = V, t = Ui(), t !== n && (H = e, t = xn()), e = t)))))))))))), e;
	}
	function ei() {
		let e, t, r, i;
		return e = V, t = $i(), t === n ? (V = e, e = n) : ($(), r = Jr(), r === n ? (V = e, e = n) : ($(), i = ea(), i === n ? (V = e, e = n) : (H = e, e = Sn(r)))), e === n && (e = ti(), e === n && (e = ci(), e === n && (e = V, t = Gi(), t !== n && (H = e, t = Cn()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = wn()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = Tn()), e = t))))), e;
	}
	function ti() {
		let e, t, r, i, a;
		return e = V, t = ni(), t === n ? (V = e, e = n) : (r = $i(), r === n ? (V = e, e = n) : ($(), i = ri(), i === n && (i = null), $(), a = ea(), a === n ? (V = e, e = n) : (H = e, e = En(t, i)))), e;
	}
	function ni() {
		let t, r;
		return t = V, e.substr(V, 6) === o ? (r = o, V += 6) : (r = n, G === 0 && Y(we)), r !== n && (H = t, r = Dn()), t = r, t === n && (t = V, e.substr(V, 5) === s ? (r = s, V += 5) : (r = n, G === 0 && Y(Te)), r !== n && (H = t, r = On()), t = r, t === n && (t = V, e.substr(V, 5) === c ? (r = c, V += 5) : (r = n, G === 0 && Y(b)), r !== n && (H = t, r = kn()), t = r, t === n && (t = V, e.substr(V, 6) === l ? (r = l, V += 6) : (r = n, G === 0 && Y(Ee)), r !== n && (H = t, r = An()), t = r, t === n && (t = V, e.substr(V, 5) === u ? (r = u, V += 5) : (r = n, G === 0 && Y(De)), r !== n && (H = t, r = F()), t = r)))), t;
	}
	function ri() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ii(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ii(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = ii(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = I(t, r);
		} else V = e, e = n;
		return e;
	}
	function ii() {
		let e;
		return e = ai(), e === n && (e = pi()), e;
	}
	function ai() {
		let t, r, i, a, o, s, c, l, u = V * 91 + 21, d = Dr.get(u);
		if (d) return V = d.nextPos, d.result;
		if (t = V, r = oi(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), _.test(s) ? V++ : (s = n, G === 0 && Y(Oe)), s === n ? (V = a, a = n) : (c = $(), l = oi(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), _.test(s) ? V++ : (s = n, G === 0 && Y(Oe)), s === n ? (V = a, a = n) : (c = $(), l = oi(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = jn(r, i);
		} else V = t, t = n;
		return Dr.set(u, {
			nextPos: V,
			result: t
		}), t;
	}
	function oi() {
		let t, r, i, a, o, s, c, l;
		if (t = V, r = si(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), v.test(s) ? V++ : (s = n, G === 0 && Y(ke)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), v.test(s) ? V++ : (s = n, G === 0 && Y(ke)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = L(r, i);
		} else V = t, t = n;
		return t;
	}
	function si() {
		let e, t, r, i;
		return e = V, t = $i(), t === n ? (V = e, e = n) : ($(), r = ai(), r === n ? (V = e, e = n) : ($(), i = ea(), i === n ? (V = e, e = n) : (H = e, e = Mn(r)))), e === n && (e = ti(), e === n && (e = fi(), e === n && (e = ci()))), e;
	}
	function ci() {
		let e, t, r;
		return e = V, t = Si(), t === n ? (V = e, e = n) : (r = zr(), r === n ? (V = e, e = n) : (H = e, e = Nn(r))), e === n && (e = V, t = Ci(), t === n ? (V = e, e = n) : (r = zr(), r === n ? (V = e, e = n) : (H = e, e = Pn(r)))), e;
	}
	function li() {
		let e, t, r, i, a, o, s, c, l;
		return e = V, t = V, r = la(), r === n ? (V = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (V = e, e = n) : (i = $(), a = V, o = la(), o === n ? (V = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = V, s = Qi(), s === n ? (V = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), H = e, e = Fn(t, a, o)), e;
	}
	function ui() {
		let e, t;
		return e = qr(), e === n && (e = li(), e === n && (e = V, t = Ei(), t !== n && (H = e, t = In()), e = t, e === n && (e = V, t = la(), t !== n && (H = e, t = Ln(t)), e = t, e === n && (e = V, t = da(), t !== n && (H = e, t = Rn(t)), e = t, e === n && (e = V, t = yi(), t !== n && (H = e, t = zn(t)), e = t))))), e;
	}
	function di() {
		let e, t, r;
		return e = V, t = na(), t === n ? (V = e, e = n) : (r = ra(), H = e, e = Bn(t, r)), e;
	}
	function fi() {
		let e, t;
		return e = V, t = pi(), t !== n && (H = e, t = Vn(t)), e = t, e === n && (e = V, t = sa(), t !== n && (H = e, t = R(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = V, t = Gi(), t !== n && (H = e, t = Hn()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = Un()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = Wn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return G++, e = V, t = da(), t !== n && (H = e, t = Gn(t)), e = t, G--, e === n && (t = n, G === 0 && Y(Ae)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = V, t = Ji(), t === n ? (V = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (V = e, e = n) : (H = e, e = Kn(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = gi(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = gi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = gi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = qn(t, r);
		} else V = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = V, t = da(), t === n ? (V = e, e = n) : ($(), r = Qi(), r === n ? (V = e, e = n) : ($(), i = fi(), i === n ? (V = e, e = n) : (H = e, e = Jn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = V, t = Xi(), t === n ? (V = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (V = e, e = n) : (H = e, e = Yn(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = fi(), t !== n) {
			for (r = [], i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = fi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = X(), o === n ? (V = i, i = n) : (s = $(), c = fi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Xn(t, r);
		} else V = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = V, r = V, i = V, a = e.charAt(V), ie.test(a) ? V++ : (a = n, G === 0 && Y(je)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else V = i, i = n;
		if (r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Zn(r)), t = r, t === n) {
			if (t = V, r = V, i = [], a = e.charAt(V), ae.test(a) ? V++ : (a = n, G === 0 && Y(Me)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(V), ae.test(a) ? V++ : (a = n, G === 0 && Y(Me));
			else i = n;
			r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Qn(r)), t = r, t === n && (t = V, r = Gi(), r !== n && (H = t, r = $n()), t = r, t === n && (t = V, r = Ki(), r !== n && (H = t, r = er()), t = r, t === n && (t = V, r = qi(), r !== n && (H = t, r = tr()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(V), oe.test(t) ? V++ : (t = n, G === 0 && Y(Ne)), t === n && (t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && Y(Pe)), r === n ? (V = t, t = n) : (i = V, G++, a = e.charAt(V), se.test(a) ? V++ : (a = n, G === 0 && Y(x)), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = V, t = ia(), t !== n && (H = e, t = nr(t)), e = t, e === n && (e = V, t = Gi(), t !== n && (H = e, t = rr()), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = ir()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = ar()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(V) === 36 ? (t = "$", V++) : (t = n, G === 0 && Y(Fe)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(V) === 64 ? (t = "@", V++) : (t = n, G === 0 && Y(Ie)), t;
	}
	function wi() {
		let t;
		return e.substr(V, 2) === ".." ? (t = "..", V += 2) : (t = n, G === 0 && Y(Le)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(V) === 46 ? (t = ".", V++) : (t = n, G === 0 && Y(Re)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(V) === 42 ? (t = "*", V++) : (t = n, G === 0 && Y(ze)), t;
	}
	function Di() {
		let t;
		return e.substr(V, 2) === "&&" ? (t = "&&", V += 2) : (t = n, G === 0 && Y(Be)), t;
	}
	function Oi() {
		let t;
		return e.substr(V, 2) === "||" ? (t = "||", V += 2) : (t = n, G === 0 && Y(Ve)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(V) === 33 ? (t = "!", V++) : (t = n, G === 0 && Y(He)), t;
	}
	function Ai() {
		let t;
		return e.substr(V, 2) === "==" ? (t = "==", V += 2) : (t = n, G === 0 && Y(Ue)), t;
	}
	function ji() {
		let t;
		return e.substr(V, 2) === "!=" ? (t = "!=", V += 2) : (t = n, G === 0 && Y(We)), t;
	}
	function Mi() {
		let t;
		return e.substr(V, 2) === ">=" ? (t = ">=", V += 2) : (t = n, G === 0 && Y(Ge)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(V) === 62 ? (t = ">", V++) : (t = n, G === 0 && Y(Ke)), t;
	}
	function Pi() {
		let t;
		return e.substr(V, 2) === "<=" ? (t = "<=", V += 2) : (t = n, G === 0 && Y(qe)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(V) === 60 ? (t = "<", V++) : (t = n, G === 0 && Y(Je)), t;
	}
	function Ii() {
		let t;
		return e.substr(V, 2) === "=~" ? (t = "=~", V += 2) : (t = n, G === 0 && Y(Ye)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = V, e.substr(V, 2) === "in" ? (r = "in", V += 2) : (r = n, G === 0 && Y(Xe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = V, e.substr(V, 3) === "nin" ? (r = "nin", V += 3) : (r = n, G === 0 && Y(S)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = V, e.substr(V, 8) === d ? (r = d, V += 8) : (r = n, G === 0 && Y(Ze)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === f ? (r = f, V += 5) : (r = n, G === 0 && Y(Qe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === p ? (r = p, V += 6) : (r = n, G === 0 && Y(C)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === m ? (r = m, V += 6) : (r = n, G === 0 && Y($e)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === ee ? (r = ee, V += 4) : (r = n, G === 0 && Y(et)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === h ? (r = h, V += 5) : (r = n, G === 0 && Y(tt)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === te ? (r = te, V += 4) : (r = n, G === 0 && Y(w)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === ne ? (r = ne, V += 5) : (r = n, G === 0 && Y(T)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === g ? (r = g, V += 4) : (r = n, G === 0 && Y(nt)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(V) === 123 ? (t = "{", V++) : (t = n, G === 0 && Y(E)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(V) === 125 ? (t = "}", V++) : (t = n, G === 0 && Y(rt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(V) === 91 ? (t = "[", V++) : (t = n, G === 0 && Y(D)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(V) === 93 ? (t = "]", V++) : (t = n, G === 0 && Y(O)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(V) === 58 ? (t = ":", V++) : (t = n, G === 0 && Y(k)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(V) === 44 ? (t = ",", V++) : (t = n, G === 0 && Y(it)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(V) === 40 ? (t = "(", V++) : (t = n, G === 0 && Y(A)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(V) === 41 ? (t = ")", V++) : (t = n, G === 0 && Y(lt)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(V) === 63 ? (t = "?", V++) : (t = n, G === 0 && Y(ut)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && Y(j)), r !== n) {
			for (i = [], a = e.charAt(V), ce.test(a) ? V++ : (a = n, G === 0 && Y(ft)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && Y(M)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && Y(pt)), s === n ? (V = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(V), ce.test(a) ? V++ : (a = n, G === 0 && Y(ft)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && Y(M)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && Y(pt)), s === n ? (V = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(V) === 47 ? (a = "/", V++) : (a = n, G === 0 && Y(j)), a === n ? (V = t, t = n) : (H = t, t = or(i));
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && Y(dt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = V, r = [], i = e.charAt(V), le.test(i) ? V++ : (i = n, G === 0 && Y(mt)); i !== n;) r.push(i), i = e.charAt(V), le.test(i) ? V++ : (i = n, G === 0 && Y(mt));
		return H = t, r = sr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = V, r = V, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else V = r, r = n;
		return t = r === n ? r : e.substring(t, V), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(V), ue.test(t) ? V++ : (t = n, G === 0 && Y(ht)), t === n && (t = V, r = e.charAt(V), de.test(r) ? V++ : (r = n, G === 0 && Y(gt)), r === n ? (V = t, t = n) : (i = e.charAt(V), fe.test(i) ? V++ : (i = n, G === 0 && Y(_t)), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(V), y.test(t) ? V++ : (t = n, G === 0 && Y(N))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (G++, t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && Y(Pe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = V, e.charCodeAt(V) === 46 ? (o = ".", V++) : (o = n, G === 0 && Y(Re)), o !== n) {
				if (s = [], c = e.charAt(V), y.test(c) ? V++ : (c = n, G === 0 && Y(N)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(V), y.test(c) ? V++ : (c = n, G === 0 && Y(N));
				else s = n;
				s === n ? (V = a, a = n) : (o = [o, s], a = o);
			} else V = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), H = t, t = cr(a, o);
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && Y(vt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(V) === 48 ? (t = "0", V++) : (t = n, G === 0 && Y(yt)), t === n) {
			if (t = V, r = e.charAt(V), pe.test(r) ? V++ : (r = n, G === 0 && Y(bt)), r !== n) {
				for (i = [], a = e.charAt(V), y.test(a) ? V++ : (a = n, G === 0 && Y(N)); a !== n;) i.push(a), a = e.charAt(V), y.test(a) ? V++ : (a = n, G === 0 && Y(N));
				r = [r, i], t = r;
			} else V = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 48 ? (r = "0", V++) : (r = n, G === 0 && Y(yt)), r === n) {
			if (r = V, e.charCodeAt(V) === 45 ? (i = "-", V++) : (i = n, G === 0 && Y(Pe)), i === n && (i = null), a = e.charAt(V), pe.test(a) ? V++ : (a = n, G === 0 && Y(bt)), a !== n) {
				for (o = [], s = e.charAt(V), y.test(s) ? V++ : (s = n, G === 0 && Y(N)); s !== n;) o.push(s), s = e.charAt(V), y.test(s) ? V++ : (s = n, G === 0 && Y(N));
				i = [
					i,
					a,
					o
				], r = i;
			} else V = r, r = n;
		}
		return r !== n && (H = t, r = lr()), t = r, G--, t === n && (r = n, G === 0 && Y(xt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = V, r = e.charAt(V), me.test(r) ? V++ : (r = n, G === 0 && Y(St)), r !== n) {
			if (i = e.charAt(V), _.test(i) ? V++ : (i = n, G === 0 && Y(Oe)), i === n && (i = null), a = [], o = e.charAt(V), y.test(o) ? V++ : (o = n, G === 0 && Y(N)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(V), y.test(o) ? V++ : (o = n, G === 0 && Y(N));
			else a = n;
			a === n ? (V = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else V = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (G++, t = V, e.charCodeAt(V) === 34 ? (r = "\"", V++) : (r = n, G === 0 && Y(Ct)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(V) === 34 ? (a = "\"", V++) : (a = n, G === 0 && Y(Ct)), a === n ? (V = t, t = n) : (H = t, t = z(i));
		} else V = t, t = n;
		if (t === n) {
			if (t = V, e.charCodeAt(V) === 39 ? (r = "'", V++) : (r = n, G === 0 && Y(wt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(V) === 39 ? (a = "'", V++) : (a = n, G === 0 && Y(wt)), a === n ? (V = t, t = n) : (H = t, t = ur(i));
			} else V = t, t = n;
		}
		return G--, t === n && (r = n, G === 0 && Y(Ae)), t;
	}
	function fa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), he.test(i) ? V++ : (i = n, G === 0 && Y(Tt)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = dr(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(M)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 34 ? (i = "\"", V++) : (i = n, G === 0 && Y(Ct)), i === n ? (V = t, t = n) : (H = t, t = fr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(M)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = pr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), ge.test(i) ? V++ : (i = n, G === 0 && Y(Et)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = mr(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(M)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 39 ? (i = "'", V++) : (i = n, G === 0 && Y(wt)), i === n ? (V = t, t = n) : (H = t, t = hr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(M)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = gr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(V), _e.test(t) ? V++ : (t = n, G === 0 && Y(Dt)), t === n && (t = V, r = V, i = e.charAt(V), de.test(i) ? V++ : (i = n, G === 0 && Y(gt)), i === n ? (V = r, r = n) : (a = e.charAt(V), fe.test(a) ? V++ : (a = n, G === 0 && Y(_t)), a === n ? (V = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, V)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && Y(M)), r !== n && (H = t, r = _r()), t = r, t === n && (t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && Y(j)), r !== n && (H = t, r = B()), t = r, t === n && (t = V, e.charCodeAt(V) === 98 ? (r = "b", V++) : (r = n, G === 0 && Y(Ot)), r !== n && (H = t, r = vr()), t = r, t === n && (t = V, e.charCodeAt(V) === 102 ? (r = "f", V++) : (r = n, G === 0 && Y(kt)), r !== n && (H = t, r = yr()), t = r, t === n && (t = V, e.charCodeAt(V) === 110 ? (r = "n", V++) : (r = n, G === 0 && Y(At)), r !== n && (H = t, r = br()), t = r, t === n && (t = V, e.charCodeAt(V) === 114 ? (r = "r", V++) : (r = n, G === 0 && Y(P)), r !== n && (H = t, r = xr()), t = r, t === n && (t = V, e.charCodeAt(V) === 116 ? (r = "t", V++) : (r = n, G === 0 && Y(jt)), r !== n && (H = t, r = Sr()), t = r, t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && Y(Mt)), r === n ? (V = t, t = n) : (i = V, a = V, o = e.charAt(V), ve.test(o) ? V++ : (o = n, G === 0 && Y(Nt)), o === n ? (V = a, a = n) : (s = e.charAt(V), ye.test(s) ? V++ : (s = n, G === 0 && Y(Pt)), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (e.substr(V, 2) === "\\u" ? (a = "\\u", V += 2) : (a = n, G === 0 && Y(Ft)), a === n ? (V = t, t = n) : (o = V, s = V, c = e.charAt(V), ve.test(c) ? V++ : (c = n, G === 0 && Y(Nt)), c === n ? (V = s, s = n) : (l = e.charAt(V), be.test(l) ? V++ : (l = n, G === 0 && Y(It)), l === n ? (V = s, s = n) : (u = Z(), u === n ? (V = s, s = n) : (d = Z(), d === n ? (V = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, V), o === n ? (V = t, t = n) : (H = t, t = Cr(i, o))))), t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && Y(Mt)), r === n ? (V = t, t = n) : (i = V, a = V, o = Z(), o === n ? (V = a, a = n) : (s = Z(), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (H = V, a = wr(i), a = a ? n : void 0, a === n ? (V = t, t = n) : (H = t, t = Tr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(V), xe.test(t) ? V++ : (t = n, G === 0 && Y(Lt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(V), oe.test(t) ? V++ : (t = n, G === 0 && Y(Ne)), t;
	}
	function $() {
		let t, r;
		for (G++, t = [], r = e.charAt(V), Se.test(r) ? V++ : (r = n, G === 0 && Y(Rt)); r !== n;) t.push(r), r = e.charAt(V), Se.test(r) ? V++ : (r = n, G === 0 && Y(Rt));
		return G--, t;
	}
	function ga() {
		let t, r;
		return t = V, G++, e.length > V ? (r = e.charAt(V), V++) : (r = n, G === 0 && Y(pt)), G--, r === n ? t = void 0 : (V = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Ar("Member name too long (maximum 1000 characters)"), e;
	}
	Or = a();
	let va = Or !== n && V === e.length;
	function ya() {
		throw Or !== n && V < e.length && Y(Nr()), Lr(Er, W < e.length ? jr(W) : null, W < e.length ? J(W, W + 1) : J(W, W));
	}
	if (t.peg$library) return {
		peg$result: Or,
		peg$currPos: V,
		peg$FAILED: n,
		peg$maxFailExpected: Er,
		peg$maxFailPos: W,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return Or;
	ya();
}
var ut = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), dt = {
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
}, j = (e) => {
	throw new Ye(1, 1, e);
}, ft = (e) => e.type === "root" || e.type === "current", M = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function pt(e) {
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
		if (ft(i)) r === "value" && !M(i) && j("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && j(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = ut.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = dt[e], a = i.args;
				a.length !== n.args.length && j(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && j(`The result of ${e}() must be compared`), r === "value" && n.logical && j(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && j("A literal must be compared");
		}
	}
}
function mt(e) {
	let t;
	try {
		t = lt(e);
	} catch (e) {
		if (nt(e)) throw new Ye(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new Ye(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new Ye(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return pt(t), t;
}
var ht = /* @__PURE__ */ new Set([
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
]), gt = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), _t = (e) => e >= 55296 && e <= 56319, N = (e) => e >= 56320 && e <= 57343, vt = (e) => e !== void 0 && e >= "0" && e <= "9", yt = (e, t) => {
	let n = e.charCodeAt(t);
	return _t(n) && N(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : _t(n) || N(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, bt = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !ht.has(n) ? null : n === "n" ? {
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
}, xt = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return gt.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, St = (e, t) => {
	let n = e[t];
	return n === "\\" ? bt(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : yt(e, t);
}, Ct = (e, t) => {
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
			let t = xt(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = St(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = St(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, wt = (e, t) => {
	let n = t + 1, r = n;
	for (; vt(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; vt(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Tt = (e) => {
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
				let e = i ? wt(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = Ct(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = xt(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = bt(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = yt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Et = 1e3, Dt = 1e3, Ot = 16, kt = /^[dgimsuy]*$/, At = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, P = class extends Error {}, jt = 0, Mt = 1, Nt = 2, Pt = 3, Ft = 4, It = 5, Lt = Ke(2, 31) - 1, Rt = (e, t) => {
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
	return e.scratch = void 0, (r.gen > Lt - t - 2 || r.step > Lt - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, zt = /* @__PURE__ */ new Set([
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
]), Bt = /^\{(\d+)(?:,(\d*))?\}/, Vt = /^[0-9a-fA-F]{4}/, Ht = /^\(\?([ims]*)(?:-([ims]*))?:/, Ut = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Wt = class {
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
				let r = Ht.exec(e.slice(t, t + 12));
				if (!r) throw new P("lookaround or named group");
				let i = Je({}, n);
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
		return this.i = t + i.length, this.atom(zt.has(i) ? `\\${i}` : i, i);
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
		if (r === "u" && Vt.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Vt.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = Bt.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Et || i !== Infinity && i > Et) throw new P("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Gt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Et) throw new P("pattern too large");
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
		this.emit(It);
	}
	compile(e) {
		if (++this.work > 4 * Et) throw new P("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(jt, this.atomId(e));
				return;
			case "bol":
				this.emit(Pt, +!!e.multiline);
				return;
			case "eol":
				this.emit(Ft, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Mt);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Nt)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Mt);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Nt, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Mt);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Kt = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Wt(e, r, t, n).parse(), a = new Gt(r);
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
}, qt = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, re = r.step;
	r.gen = g + t.length + 2, r.step = re + t.length + 2;
	let _ = 0, v = !1, ie = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case jt:
					e[n++] = r;
					break;
				case It: return u(c), v = !0, n;
				case Nt:
					h[s++] = a[r];
					break;
				case Mt:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case Pt:
					(_ === 0 || a[r] === 1 && Ut(t.charCodeAt(_ - 1))) && (h[s++] = r + 1);
					break;
				case Ft: (_ === t.length || a[r] === 1 && Ut(t.charCodeAt(_))) && (h[s++] = r + 1);
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
}, Jt = (e, t, n) => {
	let r = Rt(e, t.length);
	try {
		return qt(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Yt = 256, Xt = /* @__PURE__ */ new Map(), Zt = 0, Qt = (e, t, n, r, i = !1) => {
	if (e.length > Dt || t.length > 7 || !kt.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Xt.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = At(s) > Ot ? null : Kt(n ? `^(?:${s})$` : s, t, i);
	Zt >= Yt && (Xt.clear(), Zt = 0);
	let l = Xt.get(s);
	return l === void 0 && Xt.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Zt++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, $t = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Jt(e, t, n);
}, en = class {
	constructor(e) {
		this.nodes = e;
	}
}, tn = (e) => {
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
}, nn = (e) => {
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
	return !tn(e);
}, rn = 256, an = /* @__PURE__ */ new Map(), on = (e, t) => {
	let n = an.get(e);
	return n === void 0 && (n = nn(e), an.size >= rn && an.clear(), an.set(Array.from(e).join(""), n)), t(e.length), n;
}, sn = /* @__PURE__ */ new Map(), cn = (e, t) => {
	let n = sn.get(e);
	return n === void 0 && (n = Tt(e), n !== null && (n = Array.from(n).join("")), sn.size >= rn && sn.clear(), sn.set(Array.from(e).join(""), n)), t(e.length), n;
}, ln = 256, un = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Dt) c = null;
		else if (o) {
			let n = cn(e, i);
			c = n === null ? null : Qt(n, t, r, i, !0);
		} else c = on(e, i) ? Qt(e, t, r, i) : null;
		s !== void 0 && (s.size >= ln && s.clear(), s.set(a, c));
	}
	return c !== null && $t(c, n, i);
}, dn = {
	length: (e, t) => {
		let n = e[0];
		if (k(n)) {
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
		if (E(n)) return T(n);
		if (D(n)) {
			let e = w(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !k(r) || !k(i) ? !1 : un(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !k(r) || !k(i) ? !1 : un(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, fn = (e, t, n = S) => e === void 0 && t === void 0 || Qe(e, t, n), pn = (e, t, n = S) => !Qe(e, t, n), mn = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, hn = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return mn(n) - mn(i);
	}
	return e.length - t.length;
}, gn = (e, t, n = S) => O(e) && O(t) ? e < t : k(e) && k(t) ? (n(Math.min(e.length, t.length)), hn(e, t) < 0) : !1, _n = (e, t, n = S) => gn(e, t, n) || fn(e, t, n), vn = (e, t, n = S) => O(e) && O(t) ? e > t : k(e) && k(t) ? (n(Math.min(e.length, t.length)), hn(e, t) > 0) : !1, yn = (e, t, n = S) => vn(e, t, n) || fn(e, t, n), bn = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, xn = (e, t, n) => {
	let r = T(e);
	for (let i = 0; i < r; i++) {
		let r = $e(e, i);
		if (n(1 + bn(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, Sn = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Cn = (e) => typeof e == "string" && e.length + 1 > et, wn = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = T(e);
	for (let n = 0; n < a; n++) {
		let r = $e(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Cn(r) ? i.long.push(r) : i.set.add(Sn(r));
	}
	return n?.set(e, i), i;
}, Tn = ({ set: e, long: t }, n, r) => {
	if (Cn(n)) {
		for (let e of t) if (r(1 + bn(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(Sn(n)));
}, En = (e, t, n) => {
	let r = T(e);
	for (let i = 0; i < r; i++) if (n(), C(e, i) && t(e[i])) return !0;
	return !1;
}, Dn = {
	eq: fn,
	ne: pn,
	lt: gn,
	le: _n,
	gt: vn,
	ge: yn,
	in: (e, t, n = S) => E(t) ? xn(t, e, n) !== -1 : !1,
	nin: (e, t, n = S) => E(t) ? xn(t, e, n) === -1 : !1,
	subsetof: (e, t, n = S, r) => {
		if (!E(e) || !E(t)) return !1;
		let i = wn(t, n, r);
		return !En(e, (e) => !Tn(i, e, n), n);
	},
	anyof: (e, t, n = S, r) => {
		if (!E(e) || !E(t)) return !1;
		let i = wn(t, n, r);
		return En(e, (e) => Tn(i, e, n), n);
	},
	noneof: (e, t, n = S, r) => {
		if (!E(e) || !E(t)) return !1;
		let i = wn(t, n, r);
		return !En(e, (e) => Tn(i, e, n), n);
	},
	sizeof: (e, t) => !E(e) && !k(e) || !E(t) && !k(t) ? !1 : (E(e) ? T(e) : e.length) === (E(t) ? T(t) : t.length),
	size: (e, t) => !E(e) && !k(e) || !O(t) ? !1 : (E(e) ? T(e) : e.length) === t
}, On = (e) => !E(e) && !k(e) ? !1 : (E(e) ? T(e) : e.length) === 0, kn = (e, t, n, r = S, i) => !k(e) || !k(t) ? !1 : un(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), An = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), F = (e, t) => e.concat(`[${t}]`), I = (e, t) => e < 0 ? t + e : e, jn = (e, t) => {
	let n = T(e), r = I(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: C(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, L = (e, t) => {
	for (let n of t) e.push(n);
}, Mn = 1e6, Nn = 100, Pn = 1e6, Fn = 20, In = 1e4, Ln = 1e4, Rn = class {
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
					C(n, r) && this.visit(n[r]);
				} else if (C(n, t)) this.visit(n[t]);
				else if (++e.holes > Ln) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!C(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), E(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: T(e),
				i: 0,
				holes: 0
			});
			else if (D(e)) {
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
}, zn = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, An(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = An(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = T(e);
			for (let r = 0; r < n; r++) this.tick(), C(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Rn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(In, Math.ceil((this.retained - this.retainedLimit) / Fn))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new Xe(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Mn, Nn * e.weight) + t, this.retainedLimit = Math.max(Pn, Fn * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Rn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(In, Math.ceil((this.steps - this.stepLimit) / Nn))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new Xe(`Query exceeded ${this.stepLimit} evaluation steps`);
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
			if (!D(e)) return;
			let r = this.canonicalName(n, n.value);
			if (C(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (E(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: F(t, r)
					});
				}), n;
			}
			if (D(e)) {
				let n = w(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) C(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!E(e)) return;
			let r = jn(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: F(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (E(e)) {
				let r = jn(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: F(t, r.index)
				} : void 0;
			}
			if (D(e)) {
				let r = String(n.value);
				return C(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!E(e)) return [];
			let r = T(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : I(n.start, r), o = n.end === null ? r : I(n.end, r)) : (a = n.start === null ? r - 1 : I(n.start, r), o = n.end === null ? -r - 1 : I(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: C(e, u) ? e[u] : void 0,
				paths: F(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (D(e.value)) {
						let t = this.handleIdentifier(e, r);
						A(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (D(e.value)) {
						let t = this.handleStringLiteral(e, r);
						A(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (E(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						A(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					L(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": L(n, this.handleBracketExpressionContent(e, r));
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
						A(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						L(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						L(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						A(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (D(e)) {
					let t = w(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else E(e) && i.push({
					parent: a,
					keys: null,
					length: T(e),
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
						if (!C(n, t)) continue;
						a = {
							value: n[t],
							paths: F(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!C(n, r)) continue;
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
						if (!O(i) || !O(r)) i = void 0;
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
					return O(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return On(n);
			if (t.operator === "reg") return kn(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = Dn[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new en(r.value) : new en(A(r?.value) ? [r?.value] : []);
			}), i = dn[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : A(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : A(n);
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
					if (E(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: F(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (D(n)) {
						let i = w(n);
						this.tick(i.length);
						for (let a of i) {
							if (!C(n, a)) continue;
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
					if (!A(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) L(n, a);
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
				throw nt(e) ? new Xe("Query is nested too deeply") : rt(e) ? new Xe("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Mn, this.retainedLimit = this.adaptiveLimit ? Pn : Infinity;
	}
}, Bn = (e, t, n) => {
	let r = mt(t), i = new zn(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? it(i) ? [] : [i.value] : i?.value;
}, Vn = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Bn(e, i, n);
		A(t) && r.push(t);
	}
	return r;
}, R = (e, t, n = {}) => {
	try {
		return E(t) ? Vn(e, t, n) : Bn(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Hn = {
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
}, Un = {
	applyTemplate: (e, t) => {
		let n = b[e.templateKey], r = x(R(t, e.sourcePath), n);
		R(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(r);
	},
	fromCollection: (e, t) => {
		let n = b[e.templateKey], r = Re(R(t, e.sourcePath), n);
		R(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...r);
	},
	rowOnColumn: (e, t) => {
		let n = Be({
			columns: R(t, e.sourcePath?.columns),
			data: R(t, e.sourcePath?.rows),
			columnSpec: b[e.templateKey?.columnKey],
			rowSpec: b[e.templateKey?.rowKey]
		});
		R(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...n);
	},
	columnOnRow: (e, t) => {
		let n = Ve({
			columns: R(t, e.sourcePath?.columns),
			data: R(t, e.sourcePath?.rows),
			columnSpec: b[e.templateKey?.columnKey],
			rowSpec: b[e.templateKey?.rowKey]
		});
		R(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...n);
	}
}, Wn = (e, t, n = !1) => {
	if (e.skipIf && R(t.base, e.skipIf, { returnArray: !0 }).length > 0) return t;
	if (e.func === null) {
		let r = b[e.templateKey];
		if (r === void 0) throw Error(`Instruction spec not found: ${e.templateKey}`);
		let i = R(t, e.destinationPath?.jsonPath, { returnArray: !0 }), a = Hn[e.destinationPath?.action];
		return a?.(i[0], r), n && console.log("template : ", i, r), n && console.log("state : ", t), t;
	}
	let r = Un[e.func];
	if (!r) throw Error(`Unsupported instruction func: ${e.func}`);
	return r(e, t), n && console.log("state : ", t), t;
}, Gn = (e, t, n = !1) => {
	let r = Ee[e];
	if (!r) throw Error(`Single instruction not found: ${e}`);
	return Wn(r, t, n);
}, Kn = {
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
}, qn = {
	single: Gn,
	multi: (e, t, n = !1) => {
		let r = Kn[e];
		if (!Array.isArray(r)) throw Error(`Multi instruction not found: ${e}`);
		return r.forEach((e) => Wn(e, t, n)), t;
	}
}, Jn = (e, t, n = !1) => {
	if (!e || typeof e != "object") throw Error(`Invalid instruction descriptor: expected { type, key }, got ${String(e)}`);
	let { type: r, key: i } = e, a = qn[r];
	if (!a) throw Error(`Unsupported instruction type "${r}" for key "${i}". Expected "single" or "multi".`);
	return a(i, t, n);
}, Yn = {
	name: "json-renderers-run-instructions",
	version: "1.14.1"
}, Xn = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.steps = {
		meta: Yn,
		runInstructions: e
	});
}, Zn = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	Jn(e, {
		base: t,
		data: n
	}, r);
}), t);
Xn(Zn);
// ../json-renderers-build-table/node_modules/json-renderers-run-instructions/src/v22/runOptions/index.js
var Qn = (e) => typeof e == "object" && !!e && !Array.isArray(e), $n = Array.from(/* @__PURE__ */ new Set([...Object.keys(Ee), ...Object.keys(Kn)])), er = (e) => Ee[e] === void 0 ? Kn[e] === void 0 ? null : {
	type: "multi",
	key: e
} : {
	type: "single",
	key: e
}, tr = ({ node: e, prefix: t, sequence: n, seen: r }) => {
	let i = (e) => {
		if (!e) return;
		let t = `${e.type}:${e.key}`;
		r.has(t) || (r.add(t), n.push(e));
	};
	for (let [a, o] of Object.entries(e)) {
		if (o === !1 || o == null) continue;
		let e = `${t}-${a}`;
		if (i(er(e)), Qn(o)) tr({
			node: o,
			prefix: e,
			sequence: n,
			seen: r
		});
		else if (o === !0) {
			let t = `${e}-`;
			for (let e of $n) e.startsWith(t) && i(er(e));
		}
	}
}, nr = ({ options: e = {} } = {}) => {
	if (!Qn(e)) return [];
	let t = [];
	return tr({
		node: e,
		prefix: "options",
		sequence: t,
		seen: /* @__PURE__ */ new Set()
	}), t;
}, rr = {
	name: "json-renderers-run-instructions",
	version: "1.22.1"
}, ir = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.render = {
		meta: rr,
		renderFunc: e
	});
}, ar = ({ instructionMainKey: e, instructionSubKey: t, data: n, options: r, showLog: i = !1 } = {}) => {
	let a = Se[e]?.[t];
	if (!a) throw Error(`Definition not found: ${e}.${t}`);
	let o = b[a.baseFromSpec];
	if (o === void 0) throw Error(`Base spec not found: ${a.baseFromSpec}`);
	let s = structuredClone(o), c = a["instructions-type"] ?? [], l = r ? nr({ options: r }) : [], u = [...c, ...l];
	return i && console.log("[v22] instructions : ", u), Zn({
		instructions: u,
		base: s,
		data: n,
		showLog: i
	});
};
ir(ar);
// ../json-renderers-build-table/src/v63/index.js
var or = ({ type: e, data: t, columns: n, options: r, targetHtmlId: i, classToApply: a = "", appendPosition: o = "replace", showLog: s }) => ge({
	jsonSpec: ar({
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
ve(or);
var sr = {
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
}, cr = {
	name: "declarative-spec",
	version: "1.4.1"
}, lr = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.spec = {
		meta: cr,
		data: e
	});
}, z = sr;
lr(sr);
// node_modules/json-transformer-funcs-primitive/src/v10/forAttributes/index.js
var ur = (e) => typeof e == "object" && !!e && !Array.isArray(e), dr = (e, t) => {
	if (!ur(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = B(t, i);
	return n;
}, fr = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => B(t, e));
}, pr = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, mr = (e, t) => pr(e, t), hr = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, gr = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, _r = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: gr,
		applyTemplate: e
	});
}, B = (e, t, n) => {
	let r = e, i = t;
	hr(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? pr(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = mr(a?.textContent, r)), "attributes" in a && (a.attributes = dr(a?.attributes, r)), "children" in a && (a.children = fr(a?.children, r))), a);
};
_r(B);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var vr = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, yr = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, br = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: yr,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, xr = (e, t) => {
	let n = e, r = t;
	return vr(n, r), n.map((e) => B(e, r));
};
br((e, t) => {
	let n = e;
	return vr(n, t), n.map((e) => B(e, e[t]));
}, xr);
// node_modules/json-transformer-funcs-two-dimensions/src/v10/index.js
var Sr = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = B(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? xr(a, r) : [], i;
}), Cr = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => Sr({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), wr = {
	version: "1.13.1",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, Tr = (e) => {
	if (typeof globalThis > "u" || typeof e != "function") return;
	globalThis.ks ??= {};
	let t = {
		meta: wr,
		buildSpecElement: e
	};
	globalThis.ks["json-to-tag"] = t, globalThis.ks.jsonToTag = t;
}, V = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => U({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, H = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = V({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, U = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? V({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? H({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, W = "http://www.w3.org/2000/svg", Er = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), G = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return Er.has(t) ? document.createElementNS(W, t) : document.createElement(t);
}, Dr = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), Or = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), kr = "http://www.w3.org/1999/xlink", Ar = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(kr, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, jr = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, K = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = G({ inTagName: e.tagName });
	return t ? (Dr({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), Or({
		inElement: t,
		inProperties: e.properties
	}), Ar({
		inElement: t,
		inAttributes: e.attributes
	}), jr({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, q = (e = {}) => U({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: K
});
Tr(q);
// src/v14/table/Table.js
var Mr = /* @__PURE__ */ new WeakMap(), Nr = ({ data: e = [], columns: t = [], query: n = "" } = {}) => {
	let r = n.trim().toLowerCase();
	if (!r) return e;
	let i = t.map((e) => e?.columnName ?? e?.key).filter(Boolean);
	return e.filter((e) => (i.length > 0 ? i.map((t) => e?.[t]) : Object.values(e ?? {})).some((e) => e != null && String(e).toLowerCase().includes(r)));
}, Pr = ({ rowSpecs: e, options: t = {} }) => {
	t?.serial && e.forEach((e, t) => {
		let n = structuredClone(z.buildBodyCell);
		n.textContent = t + 1, e.children.unshift(n);
	});
	let n = t?.options;
	if (!n || typeof n != "object") return;
	let r = [
		[n.showButton, z.optionsButtonCell],
		[n.showEditButton, z.optionsEditButtonCell],
		[n.showDeleteButton, z.optionsDeleteButtonCell]
	];
	for (let [t, n] of r) t === !0 && n && e.forEach((e) => e.children.push(structuredClone(n)));
}, Fr = (e) => {
	let t = e.currentTarget, n = Mr.get(t);
	if (!n) return;
	let r = e.target?.closest?.("[data-role=\"search-input-slot\"] input");
	if (!r || !t.contains(r)) return;
	let i = r.value ?? "", a = Nr({
		data: n.data,
		columns: n.columns,
		query: i
	});
	n.state = a;
	let o = r.closest("[data-role=\"search-toolbar\"]")?.querySelector("[data-role=\"search-helper-slot\"]"), s = o?.firstElementChild ?? o?.children?.[0];
	s && (s.textContent = i.trim() ? `Showing ${a.length} of ${n.data.length} records` : "Showing all records");
	let c = Cr({
		columns: n.columns,
		data: a,
		columnSpec: z.buildBodyCell,
		rowSpec: z.buildBodyTr
	});
	Pr({
		rowSpecs: c,
		options: n.options
	});
	let l = q(c) ?? [], u = (r.closest("[data-role=\"table-parent\"]") ?? t).querySelector("table")?.querySelector("tbody");
	u && u.replaceChildren(...l);
}, J = class {
	constructor({ data: e = [], columns: t = [], options: n = {} } = {}) {
		this.data = e, this.columns = t, this.options = n, this.sortColumn = null, this.sortOrder = "none", this.state = e;
	}
	hookSearch(e) {
		if (typeof document > "u" || !e) return;
		let t = document.getElementById(e);
		if (!t) return;
		let n = Mr.has(t);
		Mr.set(t, this), n || t.addEventListener("input", Fr);
	}
	render({ targetContainerId: e = "", type: t = "withFooter", appendPosition: n = "replace", autoHookEvents: r = !0 } = {}) {
		if (!e) return console.warn("[json-to-dom-table v14] Missing targetContainerId in render()."), null;
		let i = or({
			type: t,
			data: this.data,
			columns: this.columns,
			options: this.options,
			targetHtmlId: e,
			appendPosition: n,
			classToApply: ""
		});
		return r && this.hookSearch(e), i;
	}
};
// src/v14/index.js
t(J);
var Y = J;
export { J as Table, Y as default };
