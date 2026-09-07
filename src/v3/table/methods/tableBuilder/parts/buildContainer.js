const buildContainer = ({ inContainerConfig = null, inChildSpec = null, inClasses = {} } = {}) => {
    const localContainerConfig = inContainerConfig;
    const localChildSpec = inChildSpec;
    const localClasses = inClasses;

    if (!localContainerConfig) {
        return localChildSpec;
    }

    const containerType = localContainerConfig?.type || "card";

    if (containerType === "card") {
        const containerClass = localClasses?.container || localContainerConfig?.class || "card shadow-sm border-0";
        const containerAttributes = {
            class: containerClass
        };
        if (localContainerConfig?.id) {
            containerAttributes.id = localContainerConfig.id;
        }

        const containerChildren = [];

        // 1. Container Header
        const headerConfig = localContainerConfig?.header;
        if (headerConfig) {
            const headerClass = localClasses?.containerHeader || headerConfig?.class || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center";
            const headerChildren = [];

            // Title & Icon
            const titleText = headerConfig?.title || "Table";
            const iconClass = headerConfig?.icon || "";
            const titleClass = headerConfig?.titleClass || "fw-semibold text-secondary";

            const titleChildren = [];
            if (iconClass) {
                titleChildren.push({
                    tagName: "i",
                    attributes: { class: `${iconClass} me-1` }
                });
            }
            titleChildren.push({
                tagName: "span",
                textContent: titleText
            });

            headerChildren.push({
                tagName: "div",
                attributes: { class: titleClass },
                children: titleChildren
            });

            // Action buttons in header
            if (Array.isArray(headerConfig?.actions) && headerConfig.actions.length > 0) {
                const actionsWrapper = {
                    tagName: "div",
                    attributes: { class: "d-flex align-items-center gap-2" },
                    children: headerConfig.actions.map(action => {
                        const actionChildren = [];
                        if (action.icon) {
                            actionChildren.push({
                                tagName: "i",
                                attributes: { class: `${action.icon} me-1` }
                            });
                        }
                        if (action.label) {
                            actionChildren.push({
                                tagName: "span",
                                textContent: action.label
                            });
                        }
                        const btnAttr = {
                            type: action.type || "button",
                            class: action.class || "btn btn-sm btn-outline-secondary"
                        };
                        if (action.id) btnAttr.id = action.id;
                        if (action.title) btnAttr.title = action.title;

                        return {
                            tagName: "button",
                            attributes: btnAttr,
                            children: actionChildren
                        };
                    })
                };
                headerChildren.push(actionsWrapper);
            }

            containerChildren.push({
                tagName: "div",
                attributes: { class: headerClass },
                children: headerChildren
            });
        }

        // 2. Container Body wrapping Table (with responsive wrapper)
        const bodyClass = localClasses?.containerBody || localContainerConfig?.bodyClass || "card-body p-0";
        const responsiveClass = localContainerConfig?.responsiveClass || "table-responsive";

        const tableWrapper = responsiveClass ? {
            tagName: "div",
            attributes: { class: responsiveClass },
            children: localChildSpec ? [localChildSpec] : []
        } : localChildSpec;

        const bodyChildren = tableWrapper ? [tableWrapper] : [];

        // Additional controls inside container if specified
        if (Array.isArray(localContainerConfig?.extraControls)) {
            bodyChildren.push(...localContainerConfig.extraControls);
        }

        containerChildren.push({
            tagName: "div",
            attributes: { class: bodyClass },
            children: bodyChildren
        });

        // 3. Optional Container Footer
        if (localContainerConfig?.footer) {
            const footerConfig = localContainerConfig.footer;
            const footerClass = localClasses?.containerFooter || footerConfig?.class || "card-footer bg-light py-2";
            containerChildren.push({
                tagName: "div",
                attributes: { class: footerClass },
                textContent: footerConfig.text || ""
            });
        }

        return {
            tagName: "div",
            attributes: containerAttributes,
            children: containerChildren
        };
    }

    // Default fallback: wrap in a styled div
    return {
        tagName: "div",
        attributes: { class: localContainerConfig?.class || "" },
        children: localChildSpec ? [localChildSpec] : []
    };
};

export { buildContainer };
export default buildContainer;
