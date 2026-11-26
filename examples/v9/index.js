import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const start = () => {
    try {
        const TableClass = window.ks?.jsonToDom?.table?.build?.Table;
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
            }
        });

        table1.render({
            targetContainerId: "table-container-1",
            type: "table.simpleSortable"
        });
        console.log("Table 1 rendered with events:", table1);

    } catch (err) {
        console.error("Error rendering v8 tables:", err);
    }
};

start();
