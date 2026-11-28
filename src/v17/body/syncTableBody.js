import filterRows from "./filterRows.js";
import buildBodyRows from "./buildBodyRows.js";

/**
 * Filters `table.data`, updates `table.state` and helper badge text, and repaints `tbody`.
 */
const syncTableBody = ({
    table,
    targetTbody,
    badge = null,
    query = "",
    emptyStatusText = "Showing all records"
} = {}) => {
    if (!table) return [];

    const filteredData = filterRows({
        data: table.data,
        columns: table.columns,
        query
    });
    table.state = filteredData;

    if (badge) {
        badge.textContent = String(query).trim()
            ? `Showing ${filteredData.length} of ${table.data.length} records`
            : emptyStatusText;
    }

    if (targetTbody) {
        const domRows = buildBodyRows({
            data: filteredData,
            columns: table.columns,
            options: table.options
        });
        targetTbody.replaceChildren(...domRows);
    }

    return filteredData;
};

export default syncTableBody;
