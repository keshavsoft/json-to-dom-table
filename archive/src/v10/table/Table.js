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
    }

    render({
        targetContainerId = "",
        type = "table.simple",
        appendPosition = "replace",
        autoHookEvents = true
    } = {}) {
        if (!targetContainerId) {
            console.warn("[json-to-dom-table v10] Missing targetContainerId in render().");
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
            bindTableEvents({
                container: targetContainerId,
                data: this.data,
                columns: this.columns,
                options: this.options
            });
        }

        return dom;
    }
}

export { Table };
export default Table;
