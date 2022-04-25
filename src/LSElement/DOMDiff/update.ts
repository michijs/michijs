import { SingleJSXElement } from '../..';
import { getElementFactory } from './getElementFactory';

export const update = (element: ChildNode, newJSX: SingleJSXElement, isSVG?: boolean, contextElement?: Element) => {
  const { factory, jsx } = getElementFactory(newJSX, contextElement);
  // if they are the same node
  if (factory.compare(element, jsx)) // Update it 
    factory.update?.(jsx, element, isSVG, contextElement);
  else // replace it
    element.replaceWith(factory.create(jsx, isSVG, contextElement));
};