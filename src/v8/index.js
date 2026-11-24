import registerGlobal from "./registerGlobal.js";
import { Table, buildTableEvents, hookTableEvents } from "./table/index.js";

registerGlobal(Table);

export { Table, buildTableEvents, hookTableEvents };
export default Table;
