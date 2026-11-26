/**
 * Step 1 (on header click): Sorts table rows in place by the selected column and direction.
 */
export const sortData = ({ data, columnName, order }) => {
    if (!Array.isArray(data) || data.length === 0 || !columnName) return;

    data.sort((a, b) => {
        const aVal = a?.[columnName];
        const bVal = b?.[columnName];

        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        const aNum = Number(aVal);
        const bNum = Number(bVal);
        const bothNumeric =
            aVal !== "" && bVal !== "" &&
            !Number.isNaN(aNum) && !Number.isNaN(bNum);

        const comparison = bothNumeric
            ? aNum - bNum
            : String(aVal).localeCompare(String(bVal), undefined, {
                numeric: true,
                sensitivity: "base"
            });

        return order === "asc" ? comparison : -comparison;
    });
};

export default sortData;
