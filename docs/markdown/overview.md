# Overview

`json-to-dom-table` is a declarative, configuration-driven table engine designed to render complex, high-performance HTML tables directly from JSON configurations.

Instead of hand-coding markup, coordinating table headers, column widths, serial numbers, aggregates, and rows through fragile template loops, `json-to-dom-table` treats the table as a pure declarative model.

---

## The Core Problem It Solves

Enterprise dashboards and administrative systems frequently need tables with:
- Dynamic column catalogs where users toggle columns on and off.
- Configurable widths, alignments, and Bootstrap/custom styling classes.
- Multi-tier footers with automatic aggregates (sums, averages, counts) and evaluations.
- Decoupled data fetching from REST APIs or local data sources.

`json-to-dom-table` encapsulates all of this logic cleanly, allowing applications to configure their tables in portable JSON files.

---

## The V5 Story

Version 5 introduces a streamlined architecture that delegates spec compilation to **`json-to-spec` (v21)** and live DOM element building to **`@keshavsoft/json-to-dom`**:

1. **`TableStore`**: Ingests raw data, resolves active columns against the column catalog, generates serial rows, and computes footer aggregates.
2. **`json-to-spec` (v21)**: Merges structural JSON templates with table store state to produce a clean DOM specification.
3. **`@keshavsoft/json-to-dom`**: Ingests the spec and renders native DOM elements with lightning speed.
4. **CDN Bundle**: Available directly as an ES module at `https://keshavsoft.github.io/json-to-dom-table/dist/v5/min.js`.

---

## Live Examples

- **UOM Example**: [docs/examples/uom/index.html](../examples/uom/index.html)
- **Stock Items Example**: [docs/examples/stockItems/index.html](../examples/stockItems/index.html)
- **Examples Index**: [docs/examples/index.html](../examples/index.html)
