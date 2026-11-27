import buildTable from "json-renderers-build-table";
import spec from "declarative-spec";
import { rowOnColumn } from "json-transformer-funcs-two-dimensions";
import buildSpecElement from "@keshavsoft/json-to-tag";

const containerTableMap = new WeakMap();

const filterTableRows = ({ data = [], columns = [], query = "" } = {}) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return data;

    const keys = columns.map((col) => col?.columnName ?? col?.key).filter(Boolean);
    return data.filter((row) => {
        const values = keys.length > 0
            ? keys.map((key) => row?.[key])
            : Object.values(row ?? {});

        return values.some((value) =>
            value !== undefined &&
            value !== null &&
            String(value).toLowerCase().includes(normalizedQuery)
        );
    });
};

const addRowFeatureCells = ({ rowSpecs, options = {} }) => {
    if (options?.serial) {
        rowSpecs.forEach((trSpec, index) => {
            const serialCell = structuredClone(spec.buildBodyCell);
            serialCell.textContent = index + 1;
            trSpec.children.unshift(serialCell);
        });
    }

    const rowOptions = options?.options;
    if (!rowOptions || typeof rowOptions !== "object") return;

    const optionTemplates = [
        [rowOptions.showButton, spec.optionsButtonCell],
        [rowOptions.showEditButton, spec.optionsEditButtonCell],
        [rowOptions.showDeleteButton, spec.optionsDeleteButtonCell]
    ];

    for (const [enabled, cellTemplate] of optionTemplates) {
        if (enabled !== true || !cellTemplate) continue;
        rowSpecs.forEach((trSpec) => trSpec.children.push(structuredClone(cellTemplate)));
    }
};

const handleSearchInput = (event) => {
    const container = event.currentTarget;
    const table = containerTableMap.get(container);
    if (!table) return;

    const searchInput = event.target?.closest?.('[data-role="search-input-slot"] input');
    if (!searchInput || !container.contains(searchInput)) return;

    const query = searchInput.value ?? "";
    const filteredData = filterTableRows({
        data: table.data,
        columns: table.columns,
        query
    });
    table.state = filteredData;

    const toolbar = searchInput.closest('[data-role="search-toolbar"]');
    const badgeSlot = toolbar?.querySelector('[data-role="search-helper-slot"]');
    const badge = badgeSlot?.firstElementChild ?? badgeSlot?.children?.[0];
    if (badge) {
        badge.textContent = query.trim()
            ? `Showing ${filteredData.length} of ${table.data.length} records`
            : "Showing all records";
    }

    const rowSpecs = rowOnColumn({
        columns: table.columns,
        data: filteredData,
        columnSpec: spec.buildBodyCell,
        rowSpec: spec.buildBodyTr
    });
    addRowFeatureCells({ rowSpecs, options: table.options });

    const domRows = buildSpecElement(rowSpecs) ?? [];
    const tableParent = searchInput.closest('[data-role="table-parent"]') ?? container;
    const targetTbody = tableParent.querySelector("table")?.querySelector("tbody");
    if (targetTbody) {
        targetTbody.replaceChildren(...domRows);
    }
};

class Table {
    constructor({ data = [], columns = [], options = {} } = {}) {
        this.data = data;
        this.columns = columns;
        this.options = options;
        this.sortColumn = null;
        this.sortOrder = "none";
        this.state = data;
    };

    hookSearch(targetContainerId) {
        if (typeof document === "undefined" || !targetContainerId) return;

        const container = document.getElementById(targetContainerId);
        if (!container) return;

        const alreadyBound = containerTableMap.has(container);
        containerTableMap.set(container, this);

        if (!alreadyBound) {
            container.addEventListener("input", handleSearchInput);
        }
    }

    render({
        targetContainerId = "",
        type = "withFooter",
        appendPosition = "replace",
        autoHookEvents = true
    } = {}) {
        if (!targetContainerId) {
            console.warn("[json-to-dom-table v14] Missing targetContainerId in render().");
            return null;
        }

        const dom = buildTable({
            type,
            data: this.data,
            columns: this.columns,
            options: this.options,
            targetHtmlId: targetContainerId,
            appendPosition,
            classToApply: ""
        });

        if (autoHookEvents) {
            this.hookSearch(targetContainerId);
        }

        return dom;
    }
}

export { Table };
export default Table;
