import columns from "./columns.json" with { type: "json" };
import configJson from "./config.json" with { type: "json" };

import { Table } from "../../src/v5/index.js";

import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// 3. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    const data = await dataProvider.read();

    // 6. Instantiate and render Form
    const table = new Table({
        theme: "default",
        data,
        columns,
        config: configJson,
        targetContainerId: "filter-container"
    });

    const k1 = table.methods.renderContainerHeaderAndData({ targetHtmlId: "table-container" });

    console.log("------table--- : ", k1, data, table.methods);
};

startFunc();
