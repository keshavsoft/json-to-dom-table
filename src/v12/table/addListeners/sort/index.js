import sortData from "./sortData/index.js";
import updateHeaderState from "./updateHeaderState/index.js";

/**
 * Listener 2: Attaches delegated header click sorting on the container so it survives table re-renders.
 */
export const hookSort = ({ targetContainerId, table, onSorted }) => {
    if (typeof document === "undefined" || !targetContainerId) return;

    const container = document.getElementById(targetContainerId);
    if (!container) return;

    container.addEventListener("click", (event) => {
        const headerCell = event.target.closest('thead th[data-role="sortable-header"]');
        if (!headerCell || !container.contains(headerCell)) return;

        const columnName = headerCell.dataset.column;
        if (!columnName) return;

        const nextOrder = (table.sortColumn === columnName && table.sortOrder === "asc")
            ? "desc"
            : "asc";

        table.sortColumn = columnName;
        table.sortOrder = nextOrder;

        sortData({ data: table.data, columnName, order: nextOrder });
        onSorted?.();
    });
};

export { sortData, updateHeaderState };
export default hookSort;
