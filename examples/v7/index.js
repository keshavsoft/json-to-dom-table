import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import { Table } from "../../src/v7/index.js";

const start = () => {
    try {
        // Table 1: Simple table instance with serial
        const table1 = new Table({
            data,
            columns,
            options: {
                serial: true
            },
            type: "table.simple",
            targetContainerId: "table-container-1"
        });

        table1.render();
        console.log("Table 1 rendered successfully:", table1);

        // Table 2: Another independent table instance with action buttons
        const table2 = new Table({
            data: data.slice(0, 2),
            columns,
            options: {
                serial: true,
                options: {
                    showButton: true,
                    showEditButton: true,
                    showDeleteButton: true
                }
            },
            type: "table.withFooter",
            targetContainerId: "table-container-2"
        });

        table2.render();
        console.log("Table 2 rendered successfully:", table2);

    } catch (err) {
        console.error("Error rendering v7 tables:", err);
    }
};

start();
