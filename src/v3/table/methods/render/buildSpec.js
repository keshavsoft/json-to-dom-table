import { buildTable } from "../tableBuilder/index.js";
import { buildContainer } from "../tableBuilder/parts/index.js";

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

    const finalSpec = buildContainer({
        inContainerConfig: localTable.store.config?.container,
        inChildSpec: tableSpec,
        inClasses: localTable.classes
    });

    localTable.spec = finalSpec;

    return finalSpec;
};


export { buildSpec };
export default buildSpec;
