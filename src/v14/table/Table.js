import buildTable from "json-renderers-build-table";

class Table {
    constructor({ data = [], columns = [], options = {} } = {}) {
        this.data = data;
        this.columns = columns;
        this.options = options;
        this.sortColumn = null;
        this.sortOrder = "none";
        this.state = data;
    };

    render({
        targetContainerId = "",
        type = "withFooter",
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

        return dom;
    }
}

export { Table };
export default Table;
