# json-to-dom-table

Standalone, zero-dependency, config-driven Table renderer built on top of `json-to-dom`.

## Features
- **Config-Driven**: Head, body, and foot definitions completely configured via JSON.
- **Dynamic Serials & Footers**: Multi-tier aggregates (sum, avg, count) and eval-based formulas (GST, Grand Total).
- **Themes & Layouts**: Built-in compact/relaxed layouts and light/dark theme support.
- **DataProvider Compatible**: Can receive an injected `dataProvider` to load data asynchronously or accept raw records directly.

## Usage

```javascript
import { Table } from "./src/index.js";

const table = new Table({
    targetContainerId: "table-container",
    columns: sampleColumns,
    config: sampleTableConfig,
    data: sampleData
});

await table.render();
```
