import { TableStore } from "./tableStore/index.js";
import { createMethods } from "./methods/index.js";

class Table {
    constructor({
        data = [],
        columns = [],
        config = {},
        dataProvider = null,
        targetContainerId = ""
    } = {}) {

        const localData = data;
        const localColumns = columns;
        const localConfig = config;
        const localDataProvider = dataProvider;
        const localTargetContainerId = targetContainerId;

        this.containerId = localTargetContainerId;
        this.dataProvider = localDataProvider;

        this.store = new TableStore({
            inData: localData,
            inColumns: localColumns,
            inConfig: localConfig
        });
        // console.log("this.store : ", this.store);
        this.methods = createMethods({ inTable: this });
    };
};

export { Table };
