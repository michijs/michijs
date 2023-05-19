import { SingleJSXElement } from "../types";
import { getElementFactory } from "./getElementFactory";

export function create(
  newJSX: SingleJSXElement,
  isSVG?: boolean,
  isMATHML?: boolean,
  contextElement?: Element,
) {
  const { factory, jsx } = getElementFactory(newJSX, contextElement);
  return factory.create(jsx, isSVG, isMATHML, contextElement);
}
