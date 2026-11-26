import bindTableEvents from "./bindTableEvents/index.js";
import hookSort, { updateHeaderState } from "./sort/index.js";

/**
 * Orchestrates all table listeners once per container lifecycle.
 */
export const addListeners = ({ targetContainerId, table, onSorted }) => {
    bindTableEvents({
        targetContainerId,
        data: table.data,
        columns: table.columns,
        options: table.options
    });

    hookSort({
        targetContainerId,
        table,
        onSorted
    });
};

export { updateHeaderState };
export default addListeners;
