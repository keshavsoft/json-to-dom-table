import compile from "../../../../../node_modules/json-to-spec/index.js";
import specToDom from "../../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import structureJson from './structure.json' with {type: 'json'};
import dataJson from './data.json' with {type: 'json'};

const startFunc = ({ targetHtmlId, inColumns } = {}) => {
    try {
        let columns = {};
        columns.columns = inColumns;

        const specAsJsonToDom = compile({ specJson: structureJson, dataJson: columns, showLog: true });

        const fromRenderer = specToDom({ spec: specAsJsonToDom, targetHtmlId });

        return fromRenderer;

    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;

