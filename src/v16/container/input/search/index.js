import { runInstructions } from "dom-primitive-engine";
import instructions from "./instructions.json" with { type: "json" };
import filterRows from "../../../body/filterRows.js";
import buildBodyRows from "../../../body/buildBodyRows.js";

/**
 * Executes search DOM traversal instructions via `dom-primitive-engine` and updates `tbody`.
 */
const onSearch = ({ target, table }) => {
    const query = runInstructions(target, instructions.readSearchValue) ?? "";
    const filteredData = filterRows({
        data: table.data,
        columns: table.columns,
        query
    });
    table.state = filteredData;

    const badge = runInstructions(target, instructions.findHelperBadge);
    if (badge) {
        badge.textContent = query.trim()
            ? `Showing ${filteredData.length} of ${table.data.length} records`
            : "Showing all records";
    }

    const targetTbody = runInstructions(target, instructions.findTableBody);
    if (!targetTbody) return;

    const domRows = buildBodyRows({
        data: filteredData,
        columns: table.columns,
        options: table.options
    });
    targetTbody.replaceChildren(...domRows);
};

export default onSearch;
