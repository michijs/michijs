import { createElement } from "./createElement";
import { ElementMap } from "../types";

export function renderFunctionalComponent(elementMap: ElementMap){
    return createElement(elementMap);
}