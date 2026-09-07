const resolveColWidth = ({ inCol, inColGroupConfig } = {}) => {
    const localCol = inCol;
    const localColGroupConfig = inColGroupConfig;

    if (!localColGroupConfig) {
        return null;
    }

    const colKey = localCol?.key ?? localCol?.id ?? "";

    // 1. If inColGroupConfig is an array of configuration objects
    if (Array.isArray(localColGroupConfig)) {
        const found = localColGroupConfig.find(item => {
            const itemKey = item?.key ?? item?.id ?? "";
            return itemKey && itemKey === colKey;
        });

        if (found) {
            return found.width ?? found.style ?? null;
        }
    }

    // 2. If inColGroupConfig is a key-value dictionary { [colKey]: width }
    if (typeof localColGroupConfig === "object" && !Array.isArray(localColGroupConfig)) {
        if (colKey && localColGroupConfig[colKey]) {
            return localColGroupConfig[colKey];
        }
    }

    return null;
};

const resolveColAttributes = ({ inCol, inColGroupConfig } = {}) => {
    const localCol = inCol;
    const localColGroupConfig = inColGroupConfig;

    const attributes = {};
    const colKey = localCol?.key ?? localCol?.id ?? "";

    // Check if configuration has additional attributes (e.g. span, class, style)
    if (Array.isArray(localColGroupConfig)) {
        const found = localColGroupConfig.find(item => {
            const itemKey = item?.key ?? item?.id ?? "";
            return itemKey && itemKey === colKey;
        });

        if (found) {
            if (found.span) attributes.span = found.span;
            if (found.class) attributes.class = found.class;
            if (found.attributes && typeof found.attributes === "object") {
                Object.assign(attributes, found.attributes);
            }
        }
    }

    const widthVal = resolveColWidth({ inCol: localCol, inColGroupConfig: localColGroupConfig });

    if (widthVal) {
        const styleVal = widthVal.includes(":") ? widthVal : `width: ${widthVal};`;
        attributes.style = attributes.style
            ? `${attributes.style} ${styleVal}`.trim()
            : styleVal;
    }

    return attributes;
};

const buildColGroup = ({ inColumns = [], inColGroupConfig } = {}) => {
    const localColumns = inColumns;
    const localColGroupConfig = inColGroupConfig;

    if (!localColGroupConfig) {
        return null;
    }

    const cols = localColumns.map(col => {
        const attributes = resolveColAttributes({
            inCol: col,
            inColGroupConfig: localColGroupConfig
        });

        return {
            tagName: "col",
            attributes
        };
    });

    return {
        tagName: "colgroup",
        children: cols
    };
};

export { buildColGroup };
export default buildColGroup;
