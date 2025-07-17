import { GarbageCollectableObject, VirtualFragment } from "../classes";
import { create } from "../DOM/create/create";
import type {
  ElementFactoryType,
  FC,
  ObservablePrimitiveType,
  ObservableType,
  ObservableTypeOrConst,
  ObservableArray,
} from "../types";
import { isObservable } from "../typeWards/isObservable";
import { bindObservable } from "../utils";

/**
 * Props for the List component.
 *
 * @template T - The type of items in the data array.
 */
interface ListComponentProps<T extends ObservableTypeOrConst<any[]>> {
  /**
   * The data source, which can be a regular array or an observable array.
   */
  data: T;

  /**
   * A function that renders each item in the list.
   */
  renderItem: FC<
    [T] extends [ObservableArray<infer Y>]
      ? ObservableType<Y>
      : [T] extends [ObservablePrimitiveType<(infer Z)[]>]
        ? Z
        : T[any]
  >;
}

/**
 * A generic list rendering component that supports both static arrays and observable arrays.
 *
 * If the `data` is an observable array, the component delegates rendering
 * to the array's internal `.List` method. Otherwise, it directly maps through the array and renders each item.
 *
 * @template T - The type of items in the list.
 * @param props - The list component props.
 * @param factory - The element factory to use
 * @returns The rendered list, either by using the observable's `.List` method or via a direct map.
 */
export const List = <const T extends ObservableTypeOrConst<any[]>>(
  { data, renderItem }: ListComponentProps<T>,
  factory: ElementFactoryType,
) => {
  if (isObservable(data)) {
    if ("List" in data) return data.List({ renderItem }, factory);
    else {
      const el = new VirtualFragment();
      const gc = new GarbageCollectableObject(el);
      bindObservable(data, (data) =>
        gc.ref.append(
          ...(data as ObservablePrimitiveType<any[]>)().map((x) =>
            create(renderItem(x, factory), factory.contextElement),
          ),
        ),
      );
      return el;
    }
  }
  return data.map((x) => renderItem(x, factory));
};
