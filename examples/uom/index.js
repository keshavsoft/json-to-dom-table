import columns from "./columns.json" with { type: "json" };
import tableConfig from "./table/config.json" with { type: "json" };
import searchConfig from "./form/config.json" with { type: "json" };
import datalistConfig from "./datalist/config.json" with { type: "json" };
import menuConfig from "./menu/config.json" with { type: "json" };

// 1. Renderers pulled via GitHub Pages docs/dist bundles
// import { Form } from "https://keshavsoft.github.io/json-to-dom-form/dist/v1/min.js";
import { Table } from "../../src/v5/index.js";

import { DataList } from "https://keshavsoft.github.io/json-to-dom-datalist/dist/v9/min.js";
import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// 3. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    const data = await dataProvider.read();

    const dataList = new DataList({
        theme: "default",
        data,
        columns,
        config: datalistConfig,
        targetContainerId: "datalist-container"
    });
    await dataList.render();
    console.log("dataList : ", dataList);

    // 6. Instantiate and render Form
    const table = new Table({
        theme: "default",
        data,
        columns,
        config: searchConfig,
        targetContainerId: "filter-container"
    });

    const k1 = table.methods.renderFromCdn({});

    console.log("------table--- : ", k1, data, table.methods);
};

startFunc();
