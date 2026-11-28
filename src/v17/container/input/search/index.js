import { runInstructions } from "dom-primitive-engine";
import instructions from "./instructions.json" with { type: "json" };
import syncTableBody from "../../../body/syncTableBody.js";

/**
 * Executes search DOM traversal instructions via `dom-primitive-engine` and updates `tbody`.
 */
const onSearch = ({ target, table }) => {
    const query = runInstructions(target, instructions.readSearchValue) ?? "";
    const badge = runInstructions(target, instructions.findHelperBadge);
    const targetTbody = runInstructions(target, instructions.findTableBody);

    syncTableBody({ table, targetTbody, badge, query });
};

export default onSearch;
