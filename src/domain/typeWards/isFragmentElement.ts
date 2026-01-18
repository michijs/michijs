import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../../michijs/types";

export const isFragmentElement = (
  jsx:
    | ObjectJSXElement
    | FunctionJSXElement
    | FragmentJSXElement
    | ClassJSXElement
    | DOMElementJSXElement,
): jsx is FragmentJSXElement => !jsx.jsxTag;
