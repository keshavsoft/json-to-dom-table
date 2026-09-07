import { buildTable } from "../tableBuilder/index.js";

const buildSpec = ({ inTable } = {}) => {
    const localTable = inTable;

    if (!localTable?.store) {
        return null;
    }

    const columnsConfig = localTable.store.source?.config?.columnsConfig;
    const colGroupConfig = localTable.store.config?.colgroup;
    const captionConfig = localTable.store.config?.caption;

    const tableSpec = buildTable({
        inColumns: localTable.store.activeColumns,
        inData: localTable.store.stateData,
        inComputedFooter: localTable.store.computedFooter,
        inRowConfig: localTable.store.config?.row,
        inClasses: localTable.classes,
        inColumnsConfig: columnsConfig,
        inColGroupConfig: colGroupConfig,
        inCaptionConfig: captionConfig
    });

    localTable.spec = tableSpec;

    return tableSpec;
};


export { buildSpec };
export default buildSpec;
