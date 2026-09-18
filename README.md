# json-to-dom-table

Standalone, config-driven Table renderer built on top of `json-to-dom` and `json-to-spec`.

[![Version](https://img.shields.io/badge/version-v5.0.0-blue.svg)](https://github.com/keshavsoft/json-to-dom-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Examples](https://img.shields.io/badge/Live-Examples-success.svg)](https://keshavsoft.github.io/json-to-dom-table/examples/)

---

## What It Is

`json-to-dom-table` transforms plain JSON column catalogs, table configurations, and data rows into fully interactive, styled DOM tables without framework bloat. Under the hood, it leverages:
- **`json-to-spec` (v21)**: Compiles table blueprints and data models into declarative DOM specifications.
- **`@keshavsoft/json-to-dom`**: Renders declarative specs into native browser DOM elements.

---

## Quickstart (CDN / Standalone)

No build step required. Load `json-to-dom` and import the standalone `v5` bundle directly into your ES module script:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>json-to-dom-table Demo</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- 1. json-to-dom engine -->
    <script src="https://keshavsoft.github.io/json-to-dom/dist/v31/min.js" type="module"></script>
</head>
<body class="p-4 bg-light">
    <!-- Mount Container -->
    <div id="table-container"></div>

    <script type="module">
        import columns from "./columns.json" with { type: "json" };
        import configJson from "./config.json" with { type: "json" };
        import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

        // Import Table from v5 CDN
        const { Table } = await import("https://keshavsoft.github.io/json-to-dom-table/dist/v5/min.js");

        // 1. Fetch data via dataProvider
        const dataProvider = createDataProvider({
            inReadUrl: "./data.json"
        });
        const data = await dataProvider.read();

        // 2. Instantiate Table
        const table = new Table({
            theme: "default",
            data,
            columns,
            config: configJson,
            targetContainerId: "filter-container"
        });

        // 3. Render Table into DOM
        table.methods.renderContainerHeaderAndData({ targetHtmlId: "table-container" });
    </script>
</body>
</html>
```

---

## NPM Installation

```bash
npm install json-to-dom-table
```

```javascript
import { Table } from "json-to-dom-table";

const table = new Table({
    data: myData,
    columns: myColumns,
    config: myConfig
});

table.methods.renderContainerHeaderAndData({ targetHtmlId: "table-container" });
```

---

## Configuration

Tables are driven by two JSON structures: **columns** and **config**.

### `columns.json`
Defines available fields, keys, labels, and types:
```json
[
    { "key": "name", "label": "name", "type": "string" },
    { "key": "originalName", "label": "originalName", "type": "string" }
]
```

### `config.json`
Controls table rendering, column widths, and footer aggregates:
```json
{
    "serial": false,
    "caption": {
        "text": "Unit of Measurement Records",
        "class": "caption-top fw-bold text-secondary ps-2 pb-1"
    },
    "colgroup": [
        { "key": "name", "width": "20%" },
        { "key": "originalName", "width": "80%" }
    ],
    "head": {
        "columns": ["name", "originalName"]
    },
    "classes": {
        "table": "table table-hover table-striped table-sm align-middle mb-0",
        "thead": "table-light",
        "th": "text-uppercase fw-semibold"
    }
}
```

---

## Available Methods (`table.methods`)

| Method | Description |
| :--- | :--- |
| `renderContainerHeaderAndData({ targetHtmlId })` | Renders container shell, colgroup, headers, and data rows into the target HTML element. |
| `renderContainerAndHeader({ targetHtmlId })` | Renders container and column headers only (empty body). |
| `renderContainer({ targetHtmlId })` | Renders the empty outer table container shell. |
| `renderFromCdn({ targetContainerId })` | Standalone CDN renderer test utility. |

---

## Live Examples

- 🌐 [Examples Directory](https://keshavsoft.github.io/json-to-dom-table/examples/)
- 📦 [UOM (Unit of Measurement) Example](https://keshavsoft.github.io/json-to-dom-table/examples/uom/)
- 📊 [Stock Items Inventory Example](https://keshavsoft.github.io/json-to-dom-table/examples/stockItems/)
- 💻 [Interactive Demo & Docs](https://keshavsoft.github.io/json-to-dom-table/)

---

## License

MIT © [KeshavSoft](https://github.com/keshavsoft)
