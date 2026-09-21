import compile from "../../../../../node_modules/json-to-spec/index.js";
import jsonToTag from "../../../../../node_modules/@keshavsoft/json-to-tag/index.js";

import structureJson from './structure.json' with {type: 'json'};

const startFunc = ({ targetHtmlId, inColumns, inData, inColGroup } = {}) => {
    try {
        let dataAsJson = {};
        dataAsJson.columns = inColumns;
        dataAsJson.data = inData;
        dataAsJson.colGroup = inColGroup;
        // console.log("----dataAsJson : ", dataAsJson);

        const specAsJsonToDom = compile({ specJson: structureJson, dataJson: dataAsJson, showLog: true });
        // console.log("----specAsJsonToDom : ", jsonToTag, specAsJsonToDom);

        const fromRenderer = jsonToTag({ spec: specAsJsonToDom, targetHtmlId });
        // console.log("fromRenderer : ", fromRenderer);
        const html = document.getElementById(targetHtmlId)
        html.append(fromRenderer)
        // return fromRenderer;

    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;

