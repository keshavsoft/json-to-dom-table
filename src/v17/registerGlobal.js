import meta from "./meta.js";

/**
 * Registers the `v17` table entry and active `build` alias on `globalThis.ks.jsonToDom.table`.
 */
export const registerGlobal = (Table) => {
    if (typeof globalThis === "undefined" || !Table) return;

    globalThis.ks ??= {};
    globalThis.ks.jsonToDom ??= {};
    globalThis.ks.jsonToDom.table ??= {};

    const entry = { meta, Table };
    globalThis.ks.jsonToDom.table.v17 = entry;
    globalThis.ks.jsonToDom.table.build = entry;
};

export default registerGlobal;
