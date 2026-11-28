/**
 * Sorts row objects in place by `columnName` in `"asc"` or `"desc"` order.
 */
const sortRows = ({ data, columnName, order } = {}) => {
    if (!Array.isArray(data) || data.length === 0 || !columnName) return data;

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

    return data;
};

export default sortRows;
