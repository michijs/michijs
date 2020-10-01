import { ElementMap } from '../types';

export function validateElement(x: ElementMap, otherElements: Array<ElementMap>) {
  if (!x.tag) {
    console.error(`"${x}" is not valid. Please enclose it inside an element.`);
    return false;
  }
  if (!x.attrs?.id) {
    // TODO: change error
    console.error('Element ', '\n', x, '\n', 'is not valid. Please add an id to this element.');
    return false;
  }
  const itemWithSameId = otherElements.find(resultItem => resultItem.attrs?.id === x.attrs?.id);
  if (itemWithSameId) {
    // TODO: change error
    console.error('Element ', '\n', x, '\n', 'has a repeated id with ', '\n', itemWithSameId, '\n', 'Please change the id of this element.');
    return false;
  }
  return true;
}