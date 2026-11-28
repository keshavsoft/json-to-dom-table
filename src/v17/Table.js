import buildTable from "json-renderers-build-table";
import hookContainer from "./container/index.js";

/**
 * Config-driven Table model and DOM renderer with delegated container listeners.
 */
class Table {
    constructor({ data = [], columns = [], options = {}, actions = {} } = {}) {
        this.data = data;
        this.columns = columns;
        this.options = options;
        this.actions = actions;
        this.sortColumn = null;
        this.sortOrder = "none";
        this.state = data;
    }

    render({
        targetContainerId = "",
        type = "withFooter",
        appendPosition = "replace",
        autoHookEvents = true
    } = {}) {
        if (!targetContainerId) {
            console.warn("[json-to-dom-table v17] Missing targetContainerId in render().");
            return null;
        }

        this.sortColumn = null;
        this.sortOrder = "none";
        this.state = this.data;

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
            hookContainer({ targetContainerId, table: this });
        }

        return dom;
    }
}

export { Table };
export default Table;
