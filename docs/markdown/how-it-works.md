# How It Works

This document explains the lifecycle of a `Table` instance from JSON configuration to live DOM rendering.

```
+----------------------------------------------------------------+
|                        Table Initialization                    |
|   columns.json + config.json + data.json (via dataProvider)   |
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                          TableStore                            |
|  - Resolves activeColumns (from config.head.columns)           |
|  - Configures colgroup styles and widths                       |
|  - Clones data & generates serial row numbers (if enabled)     |
|  - Computes footer aggregates (sum, avg, count, eval)          |
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                     table.methods Execution                    |
|        renderContainerHeaderAndData({ targetHtmlId })          |
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                     json-to-spec (v21)                         |
|   compile({ specJson: structureJson, dataJson, showLog: true })|
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                   @keshavsoft/json-to-dom                      |
|         specToDom({ spec: specAsJsonToDom, targetHtmlId })     |
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                  Live Browser DOM Mounted                      |
+----------------------------------------------------------------+
```

---

## 1. Store Lifecycle

When `new Table(...)` is called:
1. Arguments are extracted and stored: `data`, `columns`, `config`, `dataProvider`.
2. A new `TableStore` is constructed.
3. `buildLibrary` evaluates:
   - Column catalog filtering according to `config.head.columns`.
   - Column widths and styles from `config.colgroup`.
   - Data cloning and insertion of serial numbers into each record row if `config.serial` is `true`.
   - Multi-stage calculation of footer aggregates.

---

## 2. Rendering Cycle

Calling `table.methods.renderContainerHeaderAndData({ targetHtmlId })`:
1. Gathers `activeColumns`, `stateData`, and `colGroup` from `store.library`.
2. Passes them as `dataAsJson` into `containerHeaderAndData`.
3. Invokes `compile({ specJson: structureJson, dataJson: dataAsJson, showLog: true })` via `json-to-spec`.
4. Renders the resulting spec directly into the DOM node matching `targetHtmlId` using `@keshavsoft/json-to-dom`.
