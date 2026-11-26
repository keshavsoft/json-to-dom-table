import bindSearchAndTableEvents from "dom-table-events-search";

/**
 * Listener 1: Hooks table search and row/footer action bindings via container delegation.
 */
export const bindTableEvents = ({ targetContainerId, data, columns, options }) => {
    bindSearchAndTableEvents({
        container: targetContainerId,
        data,
        columns,
        options
    });
};

export default bindTableEvents;
