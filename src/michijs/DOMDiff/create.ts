import { SingleJSXElement } from "../types";
import { getElementFactory } from "./getElementFactory";

interface CreateOptions {
  isSVG: boolean,
  isMATHML: boolean,
  contextElement?: Element
}

let globalOptions: CreateOptions = {
  isSVG: false,
  isMATHML: false,
  contextElement: undefined
};

export function create(
  newJSX: SingleJSXElement,
  options?: CreateOptions
) {
  if(options)
    globalOptions = options;
  const { factory, jsx } = getElementFactory(newJSX, contextElement);
  return factory.create(jsx, isSVG, isMATHML, contextElement);
}
