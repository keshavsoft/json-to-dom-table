import { cloneData } from "../../../common/cloneData.js";
import { insertSerial } from "./serial/insertSerial.js";
import { calculateFooter } from "./footer/calculateFooter.js";

const buildColGroup = ({ inColGroup }) => {
    const colGroup = inColGroup.map(element => {
        let newElement = { ...element };
        if ("width" in element) {
            newElement.style = `width: ${element.width}`;
        };
        return newElement;
    });

    return colGroup;
};

const buildLibrary = ({ inSource = {}, inResolveColumns } = {}) => {
    const localSource = inSource;
    const localResolveColumns = inResolveColumns;

    const activeColumns = typeof localResolveColumns === "function"
        ? localResolveColumns({
            inColumnsCatalog: localSource?.columns,
            inColumnKeys: localSource?.config?.head?.columns
        })
        : (localSource?.columns || []);

    const colGroup = buildColGroup({ inColGroup: localSource?.config?.colgroup });

    const stateData = cloneData({
        inData: localSource?.originalData,
        inActiveColumns: activeColumns
    });

    const serialResult = insertSerial({
        inColumns: activeColumns,
        inData: stateData,
        inConfig: localSource?.config,
        inColGroup: colGroup
    });

    const computedFooter = calculateFooter({
        inData: serialResult.data,
        inFooterConfig: localSource?.config?.foot
    });

    return {
        activeColumns: serialResult.columns,
        stateData: serialResult.data,
        computedFooter,
        isSerialEnabled: serialResult.isSerialEnabled,
        colGroup: serialResult.colGroup
    };
};

export { buildLibrary };
export default buildLibrary;
