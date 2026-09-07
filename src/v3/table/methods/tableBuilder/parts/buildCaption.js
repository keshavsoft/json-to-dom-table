const buildCaption = ({ inCaption } = {}) => {
    const localCaption = inCaption;

    if (!localCaption) {
        return null;
    }

    if (typeof localCaption === "string") {
        return {
            tagName: "caption",
            textContent: localCaption
        };
    }

    if (typeof localCaption === "object") {
        const textContent = localCaption.text ?? localCaption.textContent ?? "";
        const attributes = {};

        if (localCaption.class) {
            attributes.class = localCaption.class;
        }

        if (localCaption.style) {
            attributes.style = localCaption.style;
        }

        if (localCaption.side) {
            attributes.style = attributes.style
                ? `${attributes.style} caption-side: ${localCaption.side};`
                : `caption-side: ${localCaption.side};`;
        }

        return {
            tagName: "caption",
            textContent: String(textContent),
            attributes
        };
    }

    return null;
};

export { buildCaption };
export default buildCaption;
