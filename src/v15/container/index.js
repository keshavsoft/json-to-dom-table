import onInput from "./input/index.js";

const containerTableMap = new WeakMap();

/**
 * Registers delegated event listeners on the table container element once per container.
 */
export const hookContainer = ({ targetContainerId, table } = {}) => {
    if (typeof document === "undefined" || !targetContainerId || !table) return;

    const container = document.getElementById(targetContainerId);
    if (!container) return;

    const alreadyBound = containerTableMap.has(container);
    containerTableMap.set(container, table);
    if (alreadyBound) return;

    container.addEventListener("input", (event) => {
        const activeTable = containerTableMap.get(container);
        if (activeTable) onInput({ event, container, table: activeTable });
    });
};

export default hookContainer;
