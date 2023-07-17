import { ElementFactory, ObjectJSXElement } from "../..";
import { setAttributes } from "../DOM/attributes/setAttributes";
import { Namespaces, RootTags } from "../constants/namespaces";
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
    const isSVG = isSVGParam || jsx.tag === RootTags.SVG;
    const isMATHML = !isSVG && (isMATHMLParam || jsx.tag === RootTags.MATHML);
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
        el = document.createElementNS(Namespaces.SVG, jsx.tag, {
          is: jsx.attrs.is,
        });
      else el = document.createElementNS(Namespaces.SVG, jsx.tag);
    } else if (isMATHML) {
      if (jsx.attrs?.is)
        el = document.createElementNS(
          Namespaces.MATHML,
          jsx.tag,
          {
            is: jsx.attrs.is,
          },
        );
      else
        el = document.createElementNS(
          Namespaces.MATHML,
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
