# The V5 Story & CDN Usage

This guide documents the modern `v5` architecture of `json-to-dom-table`, its CDN distribution, and how to consume it in modern web applications.

---

## 1. CDN Distribution

`json-to-dom-table` v5 is distributed as a standalone, production-ready ES module hosted on GitHub Pages:

```
https://keshavsoft.github.io/json-to-dom-table/dist/v5/min.js
```

It exports:
- `Table` (Named Export)
- `default` (Default Export)

---

## 2. Dependencies

When using the CDN in a browser environment, you only need the following companion modules:

1. **`json-to-dom` (Engine)**:
   ```html
   <script src="https://keshavsoft.github.io/json-to-dom/dist/v31/min.js" type="module"></script>
   ```
2. **`json-to-dom-provider` (Optional Data Provider)**:
   ```javascript
   import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";
   ```

---

## 3. The Working Story (UOM Example)

The following pattern represents the standard v5 implementation:

```javascript
import columns from "./columns.json" with { type: "json" };
import configJson from "./config.json" with { type: "json" };

// Import Table from v5 CDN
const { Table } = await import("https://keshavsoft.github.io/json-to-dom-table/dist/v5/min.js");

import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// 1. Configure Data Provider
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    // 2. Fetch raw data asynchronously
    const data = await dataProvider.read();

    // 3. Initialize Table instance
    const table = new Table({
        theme: "default",
        data,
        columns,
        config: configJson,
        targetContainerId: "filter-container"
    });

    // 4. Render Table into the target DOM container
    table.methods.renderContainerHeaderAndData({ targetHtmlId: "table-container" });
};

startFunc();
```

---

## 4. Why `json-to-spec` v21 Integration Matters

In previous iterations, the table engine constructed DOM nodes imperatively or through internal templates. 

In `v5`:
- `json-to-spec` v21 acts as a pure spec compiler (`compile({ specJson, dataJson, showLog: true })`).
- Structure specifications (`structure.json`) define the HTML skeleton (`table`, `thead`, `tbody`, `colgroup`).
- Data specifications feed directly into the compiler, producing an immutable JSON DOM description that `@keshavsoft/json-to-dom` translates into live DOM elements.
