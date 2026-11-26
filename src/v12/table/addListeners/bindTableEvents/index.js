import bindSearchAndTableEvents from "dom-table-events-search";

/**
 * Listener 1: Hooks table search and row/footer action bindings via container delegation.
 */
export const bindTableEvents = ({ targetContainerId, data, columns, options }) => {
    // Exclude `search` here so dom-table-events-search's `bodyOnly` re-render does not prepend
    // `searchToolbar` onto `table.children[0]` and replace `<tbody>` rows with search controls.
    const { search, ...bodyOptions } = options || {};

    bindSearchAndTableEvents({
        container: targetContainerId,
        data,
        columns,
        options: bodyOptions
    });
};

export default bindTableEvents;
