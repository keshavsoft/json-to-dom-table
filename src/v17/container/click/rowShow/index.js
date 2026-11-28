import instructions from "./instructions.json" with { type: "json" };
import { dispatchRowSelection } from "../shared/rowTarget.js";

/**
 * Handles `.ks-btn-show` clicks: extracts row record, highlights the row, and notifies listeners.
 */
const onRowShow = ({ matchElement, event, table }) => dispatchRowSelection({
    matchElement,
    event,
    table,
    instructions,
    rowClass: "table-primary",
    statusVerb: "Selected",
    callbackName: "onShow",
    eventName: "ks:table:show"
});

export default onRowShow;
