import { runInstructions } from "dom-primitive-engine";

const ROW_HIGHLIGHT_CLASSES = ["table-primary", "table-warning"];

export const getColumnKeys = (columns = []) =>
    columns.map((col) => col?.columnName ?? col?.key).filter(Boolean);

/**
 * Dispatches a bubbling DOM `CustomEvent` when supported by the runtime and element.
 */
export const dispatchTableEvent = (target, eventName, detail) => {
    if (typeof CustomEvent !== "function" || typeof target?.dispatchEvent !== "function") return;
    target.dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail }));
};

/**
 * Builds a short human-readable summary string from a row record.
 */
export const formatRecordSummary = (record = {}, columns = []) => {
    const keys = getColumnKeys(columns);
    const values = (keys.length > 0 ? keys.map((key) => record?.[key]) : Object.values(record ?? {}))
        .filter((val) => val !== undefined && val !== null && String(val).trim() !== "")
        .slice(0, 2)
        .map(String);

    return values.join(" · ") || "record";
};

/**
 * Highlights one row in `tbody` while clearing selection highlights on sibling rows.
 */
export const highlightRow = (tbody, activeRow, className) => {
    if (!tbody?.children || !activeRow?.classList) return;

    Array.from(tbody.children).forEach((tr) => {
        ROW_HIGHLIGHT_CLASSES.forEach((cls) => tr.classList?.remove?.(cls));
    });
    activeRow.classList.add(className);
};

/**
 * Uses `dom-primitive-engine` instructions to resolve row element, tbody, row index, and record data.
 */
export const resolveRowTarget = ({ matchElement, table, instructions }) => {
    const row = runInstructions(matchElement, instructions.findRow);
    const tbody = runInstructions(matchElement, instructions.findTableBody);
    if (!row || !tbody) return null;

    const rowIndex = Array.from(tbody.children ?? []).indexOf(row);
    const columnKeys = getColumnKeys(table.columns);
    const cellKeys = table.options?.serial ? [null, ...columnKeys] : columnKeys;

    const extractedRow = runInstructions(matchElement, instructions.readRowValues, {
        columns: cellKeys
    }) ?? {};

    const record = (rowIndex >= 0 && table.state?.[rowIndex])
        ? table.state[rowIndex]
        : extractedRow;

    const badge = instructions.findHelperBadge
        ? runInstructions(matchElement, instructions.findHelperBadge)
        : null;

    return { row, tbody, rowIndex, extractedRow, record, badge };
};

/**
 * Shared handler for row selection actions (`show` and `edit`).
 */
export const dispatchRowSelection = ({
    matchElement,
    event,
    table,
    instructions,
    rowClass,
    statusVerb,
    callbackName,
    eventName
}) => {
    const context = resolveRowTarget({ matchElement, table, instructions });
    if (!context) return null;

    highlightRow(context.tbody, context.row, rowClass);

    if (context.badge) {
        const label = formatRecordSummary(context.record, table.columns);
        context.badge.textContent = `${statusVerb}: ${label}`;
    }

    const detail = {
        rowIndex: context.rowIndex,
        record: context.record,
        extractedRow: context.extractedRow,
        row: context.row,
        table
    };

    table.actions?.[callbackName]?.({ event, matchElement, ...detail });
    dispatchTableEvent(matchElement, eventName, detail);

    return context;
};
