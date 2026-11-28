import onSearch from "./search/index.js";

const inputHandlers = [
    ['[data-role="search-input-slot"] input', onSearch]
];

/**
 * Hooks delegated `input` events inside `container` to matching control handlers.
 */
const hookInput = ({ container, getTable }) => {
    container.addEventListener("input", (event) => {
        const table = getTable();
        if (!table) return;

        for (const [selector, handler] of inputHandlers) {
            const target = event.target?.closest?.(selector);
            if (!target || !container.contains(target)) continue;

            handler({ target, event, container, table });
            return;
        }
    });
};

export default hookInput;
