import { buildSpecElement } from "../../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import structureJson from './structure.json' with {type: 'json'};

const startFunc = ({ targetHtmlId } = {}) => {
    try {
        const fromRenderer = buildSpecElement({ spec: structureJson, targetHtmlId });

        return fromRenderer;

    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;

