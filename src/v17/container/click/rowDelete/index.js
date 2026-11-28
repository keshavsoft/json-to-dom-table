import { runInstructions } from "dom-primitive-engine";
import instructions from "./instructions.json" with { type: "json" };
import syncTableBody from "../../../body/syncTableBody.js";
import {
    dispatchTableEvent,
    getColumnKeys,
    resolveRowTarget
} from "../shared/rowTarget.js";

const findDataIndex = ({ table, context }) => {
    const exactIndex = table.data.indexOf(context.record);
    if (exactIndex >= 0) return exactIndex;

    const columnKeys = getColumnKeys(table.columns);
    if (columnKeys.length > 0) {
        return table.data.findIndex((item) =>
            columnKeys.every((key) => String(item?.[key] ?? "") === String(context.extractedRow?.[key] ?? ""))
        );
    }

    return table.state === table.data ? context.rowIndex : -1;
};

/**
 * Handles `.ks-btn-delete` clicks: removes the record from `table.data` and repaints `tbody`.
 */
const onRowDelete = ({ matchElement, event, table }) => {
    const context = resolveRowTarget({ matchElement, table, instructions });
    if (!context) return;

    const detail = {
        rowIndex: context.rowIndex,
        record: context.record,
        extractedRow: context.extractedRow,
        row: context.row,
        table
    };

    if (table.actions?.onDelete?.({ event, matchElement, ...detail }) === false) return;

    const dataIndex = findDataIndex({ table, context });
    if (dataIndex >= 0) {
        table.data.splice(dataIndex, 1);
    }

    const query = runInstructions(matchElement, instructions.readSearchQuery) ?? "";
    syncTableBody({
        table,
        targetTbody: context.tbody,
        badge: context.badge,
        query,
        emptyStatusText: `Showing ${table.data.length} records`
    });

    dispatchTableEvent(matchElement, "ks:table:delete", detail);
};

export default onRowDelete;
