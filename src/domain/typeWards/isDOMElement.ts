import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../../michijs/types";

export const isDOMElement = (
  jsx:
    | ObjectJSXElement
    | FunctionJSXElement
    | ClassJSXElement
    | DOMElementJSXElement,
): jsx is DOMElementJSXElement => typeof jsx.jsxTag === "object";
