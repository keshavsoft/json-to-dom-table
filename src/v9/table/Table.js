import { render as buildTable } from "json-renderers-build-table";
import bindTableEvents from "dom-table-events-search";

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

        bindTableEvents({
            container: targetContainerId,
            data: this.data,
            columns: this.columns,
            options: this.options
        });

        return dom;
    };
};

export { Table };
export default Table;
