import { SingleJSXElement } from "../..";
import { getElementFactory } from "./getElementFactory";

export const update = (
  element: ChildNode,
  newJSX: SingleJSXElement,
  isSVG?: boolean,
  isMATHML?: boolean,
  contextElement?: Element,
) => {
  const { factory, jsx } = getElementFactory(newJSX, contextElement);
  // if they are the same node
  if (factory.compare(element, jsx))
    // Update it
    factory.update?.(jsx, element, isSVG, isMATHML, contextElement);
  // replace it
  else
    element.replaceWith(factory.create(jsx, isSVG, isMATHML, contextElement));
};
