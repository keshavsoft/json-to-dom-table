import { render as buildTable, hookEvents as buildTableEvents } from "json-renderers-build-table";
import { hookTableEvents } from "json-renderers-build-table-events";

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

    hookEvents({ container = this.targetContainerId } = {}) {
        const root = typeof container === "string" ? document.getElementById(container) : container;
        if (!root) return null;

        return buildTableEvents({
            container: root,
            data: this.data,
            columns: this.columns,
            options: this.options
        });
    }

    render({
        targetContainerId = this.targetContainerId,
        type = this.type,
        appendPosition = "replace",
        autoHookEvents = true
    } = {}) {
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
            this.hookEvents({ container: targetContainerId });
        }

        return dom;
    }
}

export { Table, buildTableEvents, hookTableEvents };
export default Table;
