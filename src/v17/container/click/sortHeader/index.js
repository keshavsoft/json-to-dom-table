import { runInstructions } from "dom-primitive-engine";
import instructions from "./instructions.json" with { type: "json" };
import sortRows from "../../../body/sortRows.js";
import syncTableBody from "../../../body/syncTableBody.js";
import { dispatchTableEvent } from "../shared/rowTarget.js";

const updateHeaderIndicators = ({ headerCells = [], sortColumn, sortOrder }) => {
    headerCells.forEach((th) => {
        const colName = th.dataset?.column ?? th.getAttribute?.("data-column");
        const indicator = th.querySelector?.("[data-role='sort-indicator']");

        if (colName === sortColumn) {
            th.setAttribute?.("data-sort-order", sortOrder);
            if (indicator) indicator.textContent = sortOrder === "asc" ? "↑" : "↓";
        } else if (th.hasAttribute?.("data-sort-order")) {
            th.setAttribute?.("data-sort-order", "none");
            if (indicator) indicator.textContent = "⇅";
        }
    });
};

/**
 * Handles clicks on `thead th[data-role="sortable-header"]` by sorting `table.data` and repainting `tbody`.
 */
const onSortHeader = ({ matchElement, event, table }) => {
    const columnName = matchElement?.dataset?.column ?? matchElement?.getAttribute?.("data-column");
    if (!columnName) return;

    const nextOrder = (table.sortColumn === columnName && table.sortOrder === "asc")
        ? "desc"
        : "asc";

    table.sortColumn = columnName;
    table.sortOrder = nextOrder;

    sortRows({ data: table.data, columnName, order: nextOrder });

    const headerCells = runInstructions(matchElement, instructions.findHeaderCells) ?? [];
    updateHeaderIndicators({ headerCells, sortColumn: columnName, sortOrder: nextOrder });

    const query = runInstructions(matchElement, instructions.readSearchQuery) ?? "";
    const badge = runInstructions(matchElement, instructions.findHelperBadge);
    const targetTbody = runInstructions(matchElement, instructions.findTableBody);

    syncTableBody({ table, targetTbody, badge, query });

    const detail = { columnName, sortOrder: nextOrder, state: table.state, table };
    table.actions?.onSort?.({ event, matchElement, ...detail });
    dispatchTableEvent(matchElement, "ks:table:sort", detail);
};

export default onSortHeader;
