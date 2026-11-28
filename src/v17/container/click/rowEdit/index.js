import instructions from "./instructions.json" with { type: "json" };
import { dispatchRowSelection } from "../shared/rowTarget.js";

/**
 * Handles `.ks-btn-edit` clicks: extracts row record, highlights the row for edit, and notifies listeners.
 */
const onRowEdit = ({ matchElement, event, table }) => dispatchRowSelection({
    matchElement,
    event,
    table,
    instructions,
    rowClass: "table-warning",
    statusVerb: "Editing",
    callbackName: "onEdit",
    eventName: "ks:table:edit"
});

export default onRowEdit;
