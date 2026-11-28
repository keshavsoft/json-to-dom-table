import onSearch from "./search/index.js";

const inputHandlers = [
    ['[data-role="search-input-slot"] input', onSearch]
];

/**
 * Identifies the control that fired `input` inside `container` and runs its handler.
 */
const onInput = ({ event, container, table }) => {
    for (const [selector, handler] of inputHandlers) {
        const target = event.target?.closest?.(selector);
        if (!target || !container.contains(target)) continue;

        handler({ target, event, container, table });
        return;
    }
};

export default onInput;
