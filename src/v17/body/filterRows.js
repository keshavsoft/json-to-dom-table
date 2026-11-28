/**
 * Pure row filter matching `query` across configured columns (or all row values if omitted).
 */
const filterRows = ({ data = [], columns = [], query = "" } = {}) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return data;

    const keys = columns.map((col) => col?.columnName ?? col?.key).filter(Boolean);
    return data.filter((row) => {
        const values = keys.length > 0
            ? keys.map((key) => row?.[key])
            : Object.values(row ?? {});

        return values.some((value) =>
            value !== undefined &&
            value !== null &&
            String(value).toLowerCase().includes(normalizedQuery)
        );
    });
};

export default filterRows;
