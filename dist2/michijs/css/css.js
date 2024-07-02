import { useStringTemplate } from "../hooks/useStringTemplate";
import { bindObservableToRef } from "../utils";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 */



/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode:
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 * @param {TemplateStringsArray} cssObject
 * @param {...(ObservableType<string | number> | string | number)} [props]
 * @returns {CSSStyleSheet}
 */
export function css(cssObject, ...props) {
    const template = useStringTemplate(cssObject, ...props);
    const styleSheet = new CSSStyleSheet();
    bindObservableToRef(template, styleSheet, (newValue, styleSheet) => {
        // Jest fix
        if (styleSheet.replaceSync)
            styleSheet.replaceSync(newValue);
    });
    return styleSheet;
}
