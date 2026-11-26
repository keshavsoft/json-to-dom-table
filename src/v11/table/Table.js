import { render as buildTable } from "json-renderers-build-table";
import bindTableEvents from "dom-table-events-search";

class Table {
    constructor({
        data = [],
        columns = [],
        options = {}
    } = {}) {
        this.data = data;
        this.columns = columns;
        this.options = options;
        this.sortColumn = null;
        this.sortOrder = "none";
    }

    render({
        targetContainerId = "",
        type = "table.simple",
        appendPosition = "replace",
        autoHookEvents = true
    } = {}) {
        if (!targetContainerId) {
            console.warn("[json-to-dom-table v11] Missing targetContainerId in render().");
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

        this.#updateHeaderSortState(targetContainerId);

        if (autoHookEvents) {
            bindTableEvents({
                container: targetContainerId,
                data: this.data,
                columns: this.columns,
                options: this.options
            });
        }

        this.hookHeaderClick({
            targetContainerId,
            type,
            dom
        });

        return dom;
    }

    /**
     * Attaches a delegated click handler on the rendered <table> to sort by clicked header column and rebuild.
     */
    hookHeaderClick({
        targetContainerId = "",
        type = "table.simple",
        dom = null
    } = {}) {
        if (typeof document === "undefined" || !targetContainerId) return;

        const container = document.getElementById(targetContainerId);
        const tableElement = (dom?.matches?.("table") ? dom : dom?.querySelector?.("table"))
            || container?.querySelector("table");
        if (!tableElement) return;

        tableElement.addEventListener("click", (event) => {
            const headerCell = event.target.closest("thead th");
            if (!headerCell || !tableElement.contains(headerCell)) return;

            const columnName = this.#resolveColumnName(headerCell);
            if (!columnName) return;

            const nextOrder = (this.sortColumn === columnName && this.sortOrder === "asc")
                ? "desc"
                : "asc";

            this.sortColumn = columnName;
            this.sortOrder = nextOrder;
            this.#sortData(columnName, nextOrder);

            this.render({
                targetContainerId,
                type,
                appendPosition: "replace",
                autoHookEvents: false
            });
        });
    }

    #resolveColumnName(headerCell) {
        if (headerCell.dataset.column) {
            return headerCell.dataset.column;
        }

        const headerText = headerCell.textContent?.trim();
        if (!headerText || !Array.isArray(this.columns)) return null;

        const matched = this.columns.find((col) => {
            if (typeof col === "string") return col === headerText;
            return col?.columnName === headerText || col?.key === headerText || col?.label === headerText;
        });

        if (!matched) return null;
        return typeof matched === "string"
            ? matched
            : (matched.columnName || matched.key || matched.name || null);
    }

    #sortData(columnName, order) {
        if (!Array.isArray(this.data) || this.data.length === 0) return;

        this.data.sort((a, b) => {
            const aVal = a?.[columnName];
            const bVal = b?.[columnName];

            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            const aNum = Number(aVal);
            const bNum = Number(bVal);
            const bothNumeric =
                aVal !== "" && bVal !== "" &&
                !Number.isNaN(aNum) && !Number.isNaN(bNum);

            const comparison = bothNumeric
                ? aNum - bNum
                : String(aVal).localeCompare(String(bVal), undefined, {
                    numeric: true,
                    sensitivity: "base"
                });

            return order === "asc" ? comparison : -comparison;
        });
    }

    #updateHeaderSortState(targetContainerId) {
        if (typeof document === "undefined" || !this.sortColumn || this.sortOrder === "none") return;

        const container = document.getElementById(targetContainerId);
        const headerCells = container?.querySelectorAll("thead th");
        if (!headerCells) return;

        headerCells.forEach((th) => {
            const colName = this.#resolveColumnName(th);
            const indicator = th.querySelector("[data-role='sort-indicator']");

            if (colName === this.sortColumn) {
                th.setAttribute("data-sort-order", this.sortOrder);
                if (indicator) {
                    indicator.textContent = this.sortOrder === "asc" ? "↑" : "↓";
                }
            } else if (th.hasAttribute("data-sort-order")) {
                th.setAttribute("data-sort-order", "none");
                if (indicator) {
                    indicator.textContent = "⇅";
                }
            }
        });
    }
}

export { Table };
export default Table;
