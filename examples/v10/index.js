import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const start = () => {
    try {
        const TableClass = window.ks?.jsonToDom?.table?.v10?.Table || window.ks?.jsonToDom?.table?.build?.Table;
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
            type: "table.simple"
        });
        console.log("Table 1 (v10) rendered:", table1);

        // Table 2: Independent instance rendered as table.withFooter
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
            }
        });

        table2.render({
            targetContainerId: "table-container-2",
            type: "table.withFooter",
            autoHookEvents: false
        });
        console.log("Table 2 (v10) rendered:", table2);

    } catch (err) {
        console.error("Error rendering v10 tables:", err);
    }
};

start();
