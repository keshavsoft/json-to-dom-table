import { compile } from "../../../../node_modules/json-to-spec/index.js";
import { buildSpecElement } from "../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import container from "../fromSpec/container/index.js";
import containerAndHeader from "../fromSpec/containerAndHeader/index.js";
import containerHeaderAndData from "../fromSpec/containerHeaderAndData/index.js";

import structureJson from './structure.json' with {type: 'json'};
import dataJson from './data.json' with {type: 'json'};

const localRenderFromCdn = ({ inContainerId, inContainer, targetContainerId } = {}) => {
    try {
        const specAsJsonToDom = compile(structureJson, dataJson);

        const fromRenderer = buildSpecElement({ spec: specAsJsonToDom, targetHtmlId: "table-container" });

        return fromRenderer;

    } catch (error) {
        console.log("error : ", error);
    };
};

const createMethods = ({ inTable } = {}) => {
    const localTable = inTable;

    const localContainerAndHeader = ({ targetHtmlId } = {}) => {
        const activeColumns = localTable.store.library.activeColumns;

        containerAndHeader({ targetHtmlId, inColumns: activeColumns });
    };

    const localContainerHeaderAndData = ({ targetHtmlId } = {}) => {
        const activeColumns = localTable.store.library.activeColumns;

        const data = localTable.store.library.stateData;

        console.log("data-------- : ", data);

        containerHeaderAndData({
            targetHtmlId, inColumns: activeColumns,
            inData: data
        });
    };

    return {
        renderFromCdn: localRenderFromCdn,
        renderContainer: container,
        renderContainerAndHeader: localContainerAndHeader,
        renderContainerHeaderAndData: localContainerHeaderAndData
    };
};

export { createMethods };