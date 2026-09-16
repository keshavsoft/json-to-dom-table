// Module-level reference store for components
const appState = {
    table: null,
    dataList: null,
    formElement: null,
    menu: null
};

// State Helper: Register/update component references
const setAppState = ({ inTable, inDataList, inFormElement, inMenu } = {}) => {
    const localTable = inTable;
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localMenu = inMenu;

    if (localTable) appState.table = localTable;
    if (localDataList) appState.dataList = localDataList;
    if (localFormElement) appState.formElement = localFormElement;
    if (localMenu) appState.menu = localMenu;
};

// Helper 1: Update status badge in the menu header
const updateBadge = ({ inMenu, inStateCount, inTotalCount } = {}) => {
    const localMenu = inMenu;
    const localStateCount = inStateCount;
    const localTotalCount = inTotalCount;

    if (!localMenu) return;

    if (localStateCount === localTotalCount) {
        localMenu.setBadge({
            inText: `All ${localTotalCount.toLocaleString()} records`,
            inType: "success"
        });
    } else {
        localMenu.setBadge({
            inText: `Showing ${localStateCount.toLocaleString()} of ${localTotalCount.toLocaleString()} records`,
            inType: "warning"
        });
    }
};

// Helper 2: Clear active highlight from all filter rows
const clearRowHighlight = ({ inFormElement } = {}) => {
    const localFormElement = inFormElement;

    if (!localFormElement) return;

    const activeRows = localFormElement.querySelectorAll(".filter-row-active");
    activeRows.forEach(row => {
        row.classList.remove("filter-row-active");
    });
};

// Helper 3: Highlight the clicked filter row
const highlightRow = ({ inRow, inFormElement } = {}) => {
    const localRow = inRow;
    const localFormElement = inFormElement;

    clearRowHighlight({ inFormElement: localFormElement });

    if (localRow) {
        localRow.classList.add("filter-row-active");
    }
};

// Helper 4: Extract filter query and target row from the clicked search button
const getFilterQueryFromRow = ({ inButton } = {}) => {
    const localButton = inButton;

    if (!localButton) return { query: {}, row: null };

    const localRow = localButton.closest(".row") || localButton.closest("div");
    const input = localRow?.querySelector("input");
    const name = input?.getAttribute("name");
    const value = input?.value || "";

    const query = name ? { [name]: value } : {};

    return { query, row: localRow };
};

// Helper 5: Apply filter query to table, resync datalist and update badge
const applyFilter = ({ inTable, inDataList, inMenu, inQuery } = {}) => {
    const localTable = inTable;
    const localDataList = inDataList;
    const localMenu = inMenu;
    const localQuery = inQuery;

    if (localTable) {
        localTable.filterStateData({ query: localQuery });
    }

    if (localDataList && localTable?.store?.stateData) {
        localDataList.update({ data: localTable.store.stateData });
    }

    if (localMenu && localTable?.store) {
        updateBadge({
            inMenu: localMenu,
            inStateCount: localTable.store.stateData.length,
            inTotalCount: localTable.store.rawData.length
        });
    }
};

// Story Step: Search button click handler
const onSearchButtonClick = ({ inEvent, inTable, inDataList, inFormElement, inMenu } = {}) => {
    const localEvent = inEvent;
    const localTable = inTable;
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localMenu = inMenu;

    const button = localEvent.currentTarget;
    const { query, row } = getFilterQueryFromRow({ inButton: button });

    highlightRow({ inRow: row, inFormElement: localFormElement });

    applyFilter({
        inTable: localTable,
        inDataList: localDataList,
        inMenu: localMenu,
        inQuery: query
    });
};

// Helper 6: Clear all input text values inside the form
const clearFormInputs = ({ inFormElement } = {}) => {
    const localFormElement = inFormElement;

    if (!localFormElement) return;

    const inputs = localFormElement.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    });
};

// Story Step: Reset all filters back to original in-memory data
const resetFilters = ({ inTable, inDataList, inFormElement, inMenu } = {}) => {
    const localTable = inTable;
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localMenu = inMenu;

    // 1. Clear active row highlights
    clearRowHighlight({ inFormElement: localFormElement });

    // 2. Clear form input fields
    clearFormInputs({ inFormElement: localFormElement });

    // 3. Reset table to original data in-memory (no server roundtrip)
    if (localTable) {
        localTable.filterOriginalData({ query: {} });
    }

    // 4. Resync datalist options with pristine data
    if (localDataList && localTable?.store?.stateData) {
        localDataList.update({ data: localTable.store.stateData });
    }

    // 5. Update badge display
    if (localMenu && localTable?.store) {
        updateBadge({
            inMenu: localMenu,
            inStateCount: localTable.store.stateData.length,
            inTotalCount: localTable.store.rawData.length
        });
    }

    // 6. Collapse mobile navbar drawer if open
    if (localMenu) {
        localMenu.collapseMobile();
    }
};

// Action 1: Reset Action for both menu and toolbar buttons
const onResetAction = () => {
    resetFilters({
        inTable: appState.table,
        inDataList: appState.dataList,
        inFormElement: appState.formElement,
        inMenu: appState.menu
    });
};

// Action 2: Server reload action
const onReloadAction = () => {
    window.location.reload();
};

// Action 3: Menu navigation item click handler
const onItemClick = ({ inItem, inEvent } = {}) => {
    const localItem = inItem;
    const localEvent = inEvent;

    if (localItem?.id === "reset") {
        localEvent?.preventDefault();
        onResetAction();
    }
};

// Action 4: Menu subHeader action click handler
const onActionClick = ({ inAction, inEvent } = {}) => {
    const localAction = inAction;
    const localEvent = inEvent;

    if (localAction?.id === "header-reset-btn") {
        localEvent?.preventDefault();
        onResetAction();
    } else if (localAction?.id === "header-reload-btn") {
        localEvent?.preventDefault();
        onReloadAction();
    }
};

// Hook: Attach listeners to search buttons inside form
const hookSearchButtons = ({ inFormElement, inTable, inDataList, inMenu } = {}) => {
    const localFormElement = inFormElement;
    const localTable = inTable;
    const localDataList = inDataList;
    const localMenu = inMenu;

    if (!localFormElement) {
        console.warn("Form element was not rendered; skipping button listeners.");
        return;
    }

    const buttons = localFormElement.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", event => {
            onSearchButtonClick({
                inEvent: event,
                inTable: localTable,
                inDataList: localDataList,
                inFormElement: localFormElement,
                inMenu: localMenu
            });
        });
    });
};

// Hook: Attach listener to card clear button
const hookCardClearButton = () => {
    const cardClearBtn = document.getElementById("card-clear-filters-btn");
    if (cardClearBtn) {
        cardClearBtn.addEventListener("click", () => {
            onResetAction();
        });
    }
};

// Main Entry: Register references and hook all DOM event listeners
const addListeners = ({ inTable, inDataList, inFormElement, inMenu } = {}) => {
    const localTable = inTable;
    const localDataList = inDataList;
    const localFormElement = inFormElement;
    const localMenu = inMenu;

    // Cache state references for menu and card action triggers
    setAppState({
        inTable: localTable,
        inDataList: localDataList,
        inFormElement: localFormElement,
        inMenu: localMenu
    });

    hookSearchButtons({
        inFormElement: localFormElement,
        inTable: localTable,
        inDataList: localDataList,
        inMenu: localMenu
    });

    hookCardClearButton();
};

export {
    addListeners,
    onItemClick,
    onActionClick,
    onResetAction,
    onReloadAction,
    resetFilters,
    updateBadge,
    clearRowHighlight,
    highlightRow,
    applyFilter
};
