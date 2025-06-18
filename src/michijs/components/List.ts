import type { ProxiedArray } from "../classes";
import type { FC, ObservableTypeOrConst } from "../types";
import { isObservable } from "../typeWards/isObservable";

/**
 * Props for the List component.
 *
 * @template T - The type of items in the data array.
 */
interface ListComponentProps<T> {
  /**
   * The data source, which can be a regular array or an observable array.
   */
  data: ObservableTypeOrConst<T[]>;

  /**
   * A function that renders each item in the list.
   */
  renderItem: FC<T>;
}

/**
 * A generic list rendering component that supports both static arrays and observable arrays.
 * 
 * If the `data` is an observable array, the component delegates rendering
 * to the array's internal `.List` method. Otherwise, it directly maps through the array and renders each item.
 *
 * @template T - The type of items in the list.
 * @param props - The list component props.
 * @param contextElement - Optional DOM element used for contextual rendering.
 * @param contextNamespace - Optional namespace used for scoping render operations.
 * @returns The rendered list, either by using the observable's `.List` method or via a direct map.
 */
export const List = <const T = unknown>(
  props: ListComponentProps<T>,
  contextElement?: Element,
  contextNamespace?: string,
) => {
  if (isObservable(props.data)) {
    const data = props.data as unknown as ProxiedArray<T>;
    return data.List(
      { renderItem: props.renderItem },
      contextElement,
      contextNamespace,
    );
  }
  return props.data.map((x) =>
    props.renderItem(x, contextElement, contextNamespace),
  );
};
