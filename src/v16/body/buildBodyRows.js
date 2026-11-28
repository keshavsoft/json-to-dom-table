import spec from "declarative-spec";
import { rowOnColumn } from "json-transformer-funcs-two-dimensions";
import buildSpecElement from "@keshavsoft/json-to-tag";
import attachRowFeatures from "./attachRowFeatures.js";

/**
 * Transforms row data to JSON via `rowOnColumn` and compiles DOM `<tr>` elements via `json-to-tag`.
 */
const buildBodyRows = ({ data = [], columns = [], options = {} } = {}) => {
    const rowSpecs = rowOnColumn({
        columns,
        data,
        columnSpec: spec.buildBodyCell,
        rowSpec: spec.buildBodyTr
    });

    attachRowFeatures({ rowSpecs, options });
    return buildSpecElement(rowSpecs) ?? [];
};

export default buildBodyRows;
