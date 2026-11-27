import filterRows from "../../../body/filterRows.js";
import buildBodyRows from "../../../body/buildBodyRows.js";

/**
 * Handles search input via pure relative DOM traversal from `target`.
 */
const handleSearchInput = ({ target, container, table }) => {
    const query = target.value ?? "";
    const filteredData = filterRows({
        data: table.data,
        columns: table.columns,
        query
    });
    table.state = filteredData;

    const toolbar = target.closest('[data-role="search-toolbar"]');
    const badgeSlot = toolbar?.querySelector('[data-role="search-helper-slot"]');
    const badge = badgeSlot?.firstElementChild ?? badgeSlot?.children?.[0];
    if (badge) {
        badge.textContent = query.trim()
            ? `Showing ${filteredData.length} of ${table.data.length} records`
            : "Showing all records";
    }

    const tableParent = target.closest('[data-role="table-parent"]') ?? container;
    const targetTbody = tableParent.querySelector("table")?.querySelector("tbody");
    if (!targetTbody) return;

    const domRows = buildBodyRows({
        data: filteredData,
        columns: table.columns,
        options: table.options
    });
    targetTbody.replaceChildren(...domRows);
};

export default handleSearchInput;
