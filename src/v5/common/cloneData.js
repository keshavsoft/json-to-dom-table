const cloneData = ({ inData = [], inActiveColumns } = {}) => {
    const localData = inData;

    if (!Array.isArray(localData)) {
        return [];
    };

    const processedData = localData?.map(loopRow => {
        const newRow = {};
        inActiveColumns?.forEach((loopColumn) => {
            newRow[loopColumn.key] = loopRow[loopColumn.key];
        });

        return newRow;
    });

    return processedData;
};

export { cloneData };
export default cloneData;
