import { Table, methods, actions, templateConfig, getTemplateConfig } from "./table/index.js";

const version = "v1.0.0";

window.ks ??= {};
window.ks["json-to-dom-table"] = {
    version,
    Table,
    methods,
    actions,
    templateConfig,
    getTemplateConfig
};

export { version, Table, methods, actions, templateConfig, getTemplateConfig };
export default Table;
