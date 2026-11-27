import { render as buildTable } from "json-renderers-build-table";
import runInstructions from "json-renderers-run-instructions";
import jsonToTag from "@keshavsoft/json-to-tag";

const bindTableEvents = ({ container, data = [], columns = [], options = {} } = {}) => {
    const root = typeof container === "string" ? document.getElementById(container) : container;
    if (!root) return;

    root.addEventListener("input", (event) => {
        const target = event.target;
        if (!target.matches("input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input")) return;

        const query = (target.value || "").trim().toLowerCase();
        const filtered = query
            ? data.filter(item => Object.values(item).some(val => String(val ?? "").toLowerCase().includes(query)))
            : data;

        const tbody = (target.closest("table") || root.querySelector("table"))?.querySelector("tbody");
        if (!tbody) return;

        const spec = runInstructions({
            instructionMainKey: "table",
            instructionSubKey: "bodyOnly",
            data: { data: filtered, columns },
            options
        });

        const tbodySpec = spec.tagName === "tbody" ? spec : spec.children?.[0] || spec;
        const rows = (tbodySpec.children || []).map(rowSpec => jsonToTag(rowSpec));
        tbody.replaceChildren(...rows);

        const feedback = root.querySelector("#search-feedback, [data-role='feedback'], .badge");
        if (feedback) {
            feedback.textContent = query
                ? `Showing ${filtered.length} of ${data.length} records matching "${target.value.trim()}".`
                : `Showing all ${data.length} records.`;
        }
    });
};

class Table {
    constructor({
        data = [],
        columns = [],
        options = {},
        type = "table.simple",
        targetContainerId = ""
    } = {}) {
        this.data = data;
        this.columns = columns;
        this.options = options;
        this.type = type;
        this.targetContainerId = targetContainerId;
    }

    render(config = {}) {
        const dom = buildTable({
            type: this.type,
            data: this.data,
            columns: this.columns,
            options: this.options,
            targetHtmlId: this.targetContainerId,
            appendPosition: "replace",
            classToApply: "",
            ...config
        });

        bindTableEvents({
            container: this.targetContainerId,
            data: this.data,
            columns: this.columns,
            options: this.options
        });

        return dom;
    }
}

export { Table, bindTableEvents, bindTableEvents as hookTableEvents };
export default Table;
