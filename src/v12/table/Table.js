import { render as buildTable } from "json-renderers-build-table";
import addListeners, { updateHeaderState } from "./addListeners/index.js";

class Table {
    constructor({ data = [], columns = [], options = {} } = {}) {
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
            console.warn("[json-to-dom-table v12] Missing targetContainerId in render().");
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

        updateHeaderState({
            targetContainerId,
            sortColumn: this.sortColumn,
            sortOrder: this.sortOrder
        });

        if (autoHookEvents) {
            addListeners({
                targetContainerId,
                table: this,
                onSorted: () => this.render({
                    targetContainerId,
                    type,
                    appendPosition: "replace",
                    autoHookEvents: false
                })
            });
        }

        return dom;
    }
}

export { Table };
export default Table;
