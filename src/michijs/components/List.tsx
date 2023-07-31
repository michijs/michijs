import { h } from "../h";
import { GetElementProps, MichiCustomElement } from "../types";
// import { ListElement } from "./FragmentAndList";

export type ListAttrs<Y, T = typeof ListElement> = {
  as?: T;
  data: Y[];
  renderItem: (item: Y, index: number) => JSX.Element;
} & Omit<GetElementProps<T>, "children">;

export function List<Y, const T = typeof ListElement>(
  { as, data, renderItem, ...attrs }: ListAttrs<Y, T>,
  self?: MichiCustomElement,
) {
  const childrenRenderResult = data.map((x, i) => renderItem(x, i));
  return h.createElement(
    as ?? ListElement.tag,
    {
      ...attrs,
      $doNotTouchChildren: true,
      $oncreated: (el, isSVG, isMATHML) => {
        createTarget(el, isSVG, isMATHML, self).appendItems(
          ...childrenRenderResult,
        );
      },
      $onupdate: (
        _jsx,
        el: Element,
        isSVG?: boolean,
        isMATHML?: boolean,
        context?: MichiCustomElement,
      ) => {
        ListFactory.update(childrenRenderResult, el, isSVG, isMATHML, context);
      },
    },
    [],
  );
}
