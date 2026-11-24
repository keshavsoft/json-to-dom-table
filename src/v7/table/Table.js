import { render as buildTable } from "json-renderers-build-table";

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
        appendPosition = "replace"
    } = {}) {
        return buildTable({
            type,
            data: this.data,
            columns: this.columns,
            options: this.options,
            targetHtmlId: targetContainerId,
            appendPosition,
            classToApply: ""
        });
    }
}

export { Table };
export default Table;
