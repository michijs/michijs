import { setProperties } from "../DOM/attributes/setProperties";
import { Namespaces, RootTags } from "../constants/namespaces";
import { create } from "./create";

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').ObjectJSXElement} ObjectJSXElement
 */



/**
 * @param {ObjectJSXElement} jsx
 * @param {CreateOptions} options
 * @returns {Element}
 */
export const createObject = (jsx, options) => {
    const isSVG = options.isSVG || jsx.jsxTag === RootTags.SVG;
    let isMATHML;
    let el;
    const { children, ...attrs } = jsx.attrs;
    if (isSVG) {
        if (jsx.attrs?.is)
            el = document.createElementNS(Namespaces.SVG, jsx.jsxTag, {
                is: jsx.attrs.is,
            });
        else
            el = document.createElementNS(Namespaces.SVG, jsx.jsxTag);
    }
    else {
        isMATHML = options.isMATHML || jsx.jsxTag === RootTags.MATHML;
        if (isMATHML) {
            if (jsx.attrs?.is)
                el = document.createElementNS(Namespaces.MATHML, jsx.jsxTag, {
                    is: jsx.attrs.is,
                });
            else
                el = document.createElementNS(Namespaces.MATHML, jsx.jsxTag);
        }
        else if (jsx.attrs?.is)
            el = document.createElement(jsx.jsxTag, {
                is: jsx.attrs.is,
            });
        else
            el = document.createElement(jsx.jsxTag);
    }

    // $oncreated?.(el, isSVG, isMATHML, self);

    // if (!el.$doNotTouchChildren && !$doNotTouchChildren)
    const newOptions = {
        ...options,
        isMATHML,
        isSVG,
    };
    if (children)
        if (Array.isArray(children))
            el.append(...children.map((x) => create(x, newOptions)));
        else
            el.append(create(children, newOptions));

    setProperties(el, attrs, options);

    return el;
};
