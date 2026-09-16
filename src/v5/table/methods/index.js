import { compile } from "../../../../node_modules/json-to-spec/index.js";
import { buildSpecElement } from "../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import { repaintBody, repaintFoot, refreshTable } from "./repaints/index.js";
import { renderTable, renderStructure, buildSpec } from "./render/index.js";
import { buildTable } from "./tableBuilder/index.js";
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

    const localBuildSpec = () => {
        return buildSpec({ inTable: localTable });
    };

    const localRepaintBody = () => {
        if (!localTable?.tableElement) return;

        repaintBody({
            inTableElement: localTable.tableElement,
            inColumns: localTable.store.activeColumns,
            inData: localTable.store.stateData,
            inRowConfig: localTable.store.config?.row,
            inClasses: localTable.classes
        });
    };

    const localRepaintFoot = () => {
        if (!localTable?.tableElement) return;

        repaintFoot({
            inTableElement: localTable.tableElement,
            inColumns: localTable.store.activeColumns,
            inComputedFooter: localTable.store.computedFooter,
            inClasses: localTable.classes
        });
    };

    const localRefreshTable = () => {
        if (!localTable?.tableElement) return;

        refreshTable({
            inTableElement: localTable.tableElement,
            inStore: localTable.store,
            inClasses: localTable.classes
        });
    };

    const localRender = async ({ inContainerId, inContainer, targetContainerId, inQuery = {} } = {}) => {
        const localContainerId = inContainerId || targetContainerId;
        const localContainer = inContainer;
        const localQuery = inQuery;

        const result = await renderTable({
            inTable: localTable,
            inContainerId: localContainerId,
            inContainer: localContainer,
            inQuery: localQuery
        });

        if (result?.element) {
            localTable.tableElement = result.element;
            localTable.controlsTree = result.treeWithIds;
        }

        return result;
    };

    const localRenderStructure = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        const localContainerId = inContainerId || targetContainerId;
        const localContainer = inContainer;

        const result = renderStructure({
            inTable: localTable,
            inContainerId: localContainerId,
            inContainer: localContainer
        });

        if (result?.element) {
            localTable.tableElement = result.element;
            localTable.controlsTree = result.treeWithIds;
        }

        return result;
    };

    const localContainerAndHeader = ({ targetHtmlId } = {}) => {
        const activeColumns = localTable.store.library.activeColumns;

        containerAndHeader({ targetHtmlId, inColumns: activeColumns });
    };

    const localContainerHeaderAndData = ({ targetHtmlId } = {}) => {
        const activeColumns = localTable.store.library.activeColumns;

        const data = localTable.store.library.stateData;

        console.log("data : ", data);

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