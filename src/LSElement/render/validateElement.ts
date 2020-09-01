export function validateElement(x: any, otherElements: Array<any>) {
    if (!x.tagName) {
        console.error(`"${x}" is not valid. Please enclose it inside an element.`);
        return false;
    }
    if (!x.id) {
        console.error("Element ", '\n', x.outerHTML, '\n', "is not valid. Please add an id to this element.");
        return false;
    }
    const itemWithSameId = otherElements.find(resultItem => resultItem.id === x.id);
    if (itemWithSameId) {
        console.error("Element ", '\n', x.outerHTML, '\n', "has a repeated id with ", '\n', itemWithSameId.outerHTML, '\n', "Please change the id of this element.");
        return false;
    }
    return true;
}

export function validateDeepElement(x: Element, otherElements: Array<any>) {
    const validatedElement = validateElement(x, otherElements);
    if (validatedElement) {
        if (x.childElementCount > 0) {
            let result = true;
            Array.from(x.children).forEach(children => {
                otherElements = otherElements.concat(x);
                result = result && validateDeepElement(children, otherElements);
            })
            return result;
        } else {
            return true;
        }
    }
    else {
        return false;
    }
}