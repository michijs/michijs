import { ElementFactory, ObjectJSXElement } from "../..";
import { setAttributes } from "../DOM/attributes/setAttributes";
import { create } from "./create";

export const ObjectFactory: Required<ElementFactory> = {
  compare(el: Element, jsx: ObjectJSXElement): boolean {
    return el.localName === jsx.tag;
  },
  create(
    jsx: ObjectJSXElement,
    isSVGParam?: boolean,
    isMATHMLParam?: boolean,
    self?: Element,
  ) {
    const isSVG = isSVGParam || jsx.tag === "svg";
    const isMATHML = !isSVG && (isMATHMLParam || jsx.tag === "math");
    let el: Element;
    const {
      children,
      $staticChildren,
      $oncreated,
      $doNotTouchChildren,
      $onupdate,
      ...attrs
    } = jsx.attrs;
    if (isSVG) {
      if (jsx.attrs?.is)
        el = document.createElementNS("http://www.w3.org/2000/svg", jsx.tag, {
          is: jsx.attrs.is,
        });
      else el = document.createElementNS("http://www.w3.org/2000/svg", jsx.tag);
    } else if (isMATHML) {
      if (jsx.attrs?.is)
        el = document.createElementNS(
          "http://www.w3.org/1998/Math/MathML",
          jsx.tag,
          {
            is: jsx.attrs.is,
          },
        );
      else
        el = document.createElementNS(
          "http://www.w3.org/1998/Math/MathML",
          jsx.tag,
        );
    } else if (jsx.attrs?.is)
      el = document.createElement(jsx.tag, {
        is: jsx.attrs.is,
      });
    else el = document.createElement(jsx.tag);

    $oncreated?.(el, isSVG, isMATHML, self);

    if (!el.$doNotTouchChildren && !$doNotTouchChildren)
      el.append(...children.map((x) => create(x, isSVG, isMATHML, self)));

    setAttributes(el, attrs, self);

    return el;
  },
};
