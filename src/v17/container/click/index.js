import { bindEvents } from "dom-primitive-bindings";
import bindings from "./bindings.json" with { type: "json" };
import onSortHeader from "./sortHeader/index.js";
import onRowShow from "./rowShow/index.js";
import onRowEdit from "./rowEdit/index.js";
import onRowDelete from "./rowDelete/index.js";

const withTable = (handler, getTable, container) => (event, matchElement) => {
    const table = getTable();
    if (table) handler({ matchElement, event, container, table });
};

/**
 * Hooks declarative `click` bindings via `dom-primitive-bindings` to scoped click handlers.
 */
const hookClick = ({ container, getTable }) => {
    const actions = {
        onSortHeader: withTable(onSortHeader, getTable, container),
        onRowShow: withTable(onRowShow, getTable, container),
        onRowEdit: withTable(onRowEdit, getTable, container),
        onRowDelete: withTable(onRowDelete, getTable, container)
    };

    bindEvents(container, bindings, actions);
};

export default hookClick;
