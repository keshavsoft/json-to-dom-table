/**
 * Step 2 (after render): Updates header `data-sort-order` and `↑ / ↓ / ⇅` indicator spans.
 */
export const updateHeaderState = ({ targetContainerId, sortColumn, sortOrder }) => {
    if (typeof document === "undefined" || !sortColumn || sortOrder === "none") return;

    const container = document.getElementById(targetContainerId);
    const headerCells = container?.querySelectorAll("thead th");
    if (!headerCells) return;

    headerCells.forEach((th) => {
        const colName = th.dataset.column;
        const indicator = th.querySelector("[data-role='sort-indicator']");

        if (colName === sortColumn) {
            th.setAttribute("data-sort-order", sortOrder);
            if (indicator) {
                indicator.textContent = sortOrder === "asc" ? "↑" : "↓";
            }
        } else if (th.hasAttribute("data-sort-order")) {
            th.setAttribute("data-sort-order", "none");
            if (indicator) {
                indicator.textContent = "⇅";
            }
        }
    });
};

export default updateHeaderState;
