import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const start = () => {
    try {
        const TableClass = window.ks?.jsonToDom?.table?.build?.Table;
        if (!TableClass) {
            console.error("Table class not found on window.ks");
            return;
        }

        // Table 1: Data & options in constructor; type & container in render()
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
        console.log("Table 1 (v10) rendered:", table1);


    } catch (err) {
        console.error("Error rendering v10 tables:", err);
    }
};

start();
