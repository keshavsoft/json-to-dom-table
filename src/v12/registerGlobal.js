import meta from "./meta.js";

export const registerGlobal = (Table) => {
    if (typeof globalThis === "undefined" || !Table) return;

    globalThis.ks ??= {};
    globalThis.ks.jsonToDom ??= {};
    globalThis.ks.jsonToDom.table ??= {};

    globalThis.ks.jsonToDom.table.v12 = {
        meta,
        Table
    };

    globalThis.ks.jsonToDom.table.build = {
        meta,
        Table
    };
};

export default registerGlobal;
