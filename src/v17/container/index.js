import hookInput from "./input/index.js";
import hookClick from "./click/index.js";

const containerTableMap = new WeakMap();

/**
 * Registers delegated `input` and `click` listeners once per container element.
 */
export const hookContainer = ({ targetContainerId, table } = {}) => {
    if (typeof document === "undefined" || !targetContainerId || !table) return;

    const container = document.getElementById(targetContainerId);
    if (!container) return;

    const alreadyBound = containerTableMap.has(container);
    containerTableMap.set(container, table);
    if (alreadyBound) return;

    const getTable = () => containerTableMap.get(container);
    hookInput({ container, getTable });
    hookClick({ container, getTable });
};

export default hookContainer;
