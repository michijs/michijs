import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export const isFragmentElement = (
  jsx:
    | ObjectJSXElement
    | FunctionJSXElement
    | FragmentJSXElement
    | ClassJSXElement
    | DOMElementJSXElement,
): jsx is FragmentJSXElement => !jsx.jsxTag;