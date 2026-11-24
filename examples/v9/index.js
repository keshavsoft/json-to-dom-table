import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const start = () => {
    try {
        const TableClass = window.ks?.jsonToDom?.table?.v8?.Table || window.ks?.jsonToDom?.table?.build?.Table;
        if (!TableClass) {
            console.error("Table class not found on window.ks");
            return;
        }

        // Table 1: Simple Table with Search & Serial
        const table1 = new TableClass({
            data,
            columns,
            options: {
                search: {
                    showLabel: true,
                    showHelper: true,
                    showInput: true
                },
                serial: true
            },
            type: "table.simple",
            targetContainerId: "table-container-1"
        });

        table1.render();
        console.log("Table 1 rendered with events:", table1);

        // Table 2: Table With Footer, Search, Serial & Action Buttons
        const table2 = new TableClass({
            data: data.slice(0, 3),
            columns,
            options: {
                search: {
                    showLabel: true,
                    showHelper: true,
                    showInput: true
                },
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
        console.log("Table 2 rendered with events:", table2);

    } catch (err) {
        console.error("Error rendering v8 tables:", err);
    }
};

start();
