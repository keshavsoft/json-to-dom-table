import meta from "./meta.js";

export const registerGlobal = (Table) => {
    if (typeof globalThis === "undefined" || !Table) return;

    globalThis.ks ??= {};
    globalThis.ks.jsonToDom ??= {};
    globalThis.ks.jsonToDom.table ??= {};

    const entry = { meta, Table };
    globalThis.ks.jsonToDom.table.v15 = entry;
    globalThis.ks.jsonToDom.table.build = entry;
};

export default registerGlobal;
