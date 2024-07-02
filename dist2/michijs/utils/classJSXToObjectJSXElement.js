/**
 * @typedef {import('../types').ClassJSXElement} ClassJSXElement
 * @typedef {import('../types').ObjectJSXElement} ObjectJSXElement
 */

/**
 * @param {ClassJSXElement}
 * @returns {ObjectJSXElement}
 */
export const classJSXToObjectJSXElement = ({ jsxTag, attrs, }) => {
    if (jsxTag.extends)
        return {
            jsxTag: jsxTag.extends,
            attrs: {
                ...attrs,
                is: jsxTag.tag,
            },
        };
    return {
        jsxTag: jsxTag.tag,
        attrs,
    };
};
