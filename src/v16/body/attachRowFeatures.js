import spec from "declarative-spec";

/**
 * Adds enabled row-level feature cells (`serial` and `options` buttons) to generated `<tr>` specs.
 */
const attachRowFeatures = ({ rowSpecs = [], options = {} } = {}) => {
    if (options?.serial) {
        rowSpecs.forEach((trSpec, index) => {
            const serialCell = structuredClone(spec.buildBodyCell);
            serialCell.textContent = index + 1;
            trSpec.children.unshift(serialCell);
        });
    }

    const rowOptions = options?.options;
    if (!rowOptions || typeof rowOptions !== "object") return rowSpecs;

    const optionTemplates = [
        [rowOptions.showButton, spec.optionsButtonCell],
        [rowOptions.showEditButton, spec.optionsEditButtonCell],
        [rowOptions.showDeleteButton, spec.optionsDeleteButtonCell]
    ];

    for (const [enabled, cellTemplate] of optionTemplates) {
        if (enabled !== true || !cellTemplate) continue;
        rowSpecs.forEach((trSpec) => trSpec.children.push(structuredClone(cellTemplate)));
    }

    return rowSpecs;
};

export default attachRowFeatures;
