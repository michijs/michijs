import { setAttributeValue } from "../utils/setAttributeValue";
import { AllDomAttributes } from "../utils/whiteLists/AllDomAttributes";

export function setAttribute(element: Element, name: string, value: any) {
    const reflectAttribute = AllDomAttributes.includes(name);
    if (reflectAttribute) {
        try {
            element[name] = value;
        }catch(_){}
        setAttributeValue(element, name, value);
    }
    else {
        if (name === 'style') {
            setStyle(element, value);
        } else {
            element[name] = value;
        }
    }
}

function setStyle(element: Element, value: any) {
    if (value) {
        Object.keys(value).forEach(name => {
            // @ts-ignore
            element.style[name] = value[name];
        })
    } else {
        setAttributeValue(element, 'style', value);
    }
}