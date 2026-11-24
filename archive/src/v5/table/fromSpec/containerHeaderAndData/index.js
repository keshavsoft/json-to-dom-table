import compile from "../../../../../node_modules/json-to-spec/index.js";
import specToDom from "../../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import structureJson from './structure.json' with {type: 'json'};

const startFunc = ({ targetHtmlId, inColumns, inData, inColGroup } = {}) => {
    try {
        let dataAsJson = {};
        dataAsJson.columns = inColumns;
        dataAsJson.data = inData;
        dataAsJson.colGroup = inColGroup;
        console.log("----dataAsJson : ", dataAsJson);

        const specAsJsonToDom = compile({ specJson: structureJson, dataJson: dataAsJson, showLog: true });

        const fromRenderer = specToDom({ spec: specAsJsonToDom, targetHtmlId });

        return fromRenderer;

    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;

