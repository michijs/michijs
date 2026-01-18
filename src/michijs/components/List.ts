import { CloneFactory } from "infrastructure/DOM/create/ElementFactory";
import { GarbageCollectableObject, VirtualFragment } from "../../domain/entities";
import { create } from "../../infrastructure/DOM/create/create";
import type {
  ElementFactoryType,
  FC,
  ObservablePrimitiveType,
  ObservableType,
  ObservableTypeOrConst,
  ObservableArray,
  ExtendableComponent,
  SingleJSXElement,
} from "../types";
import { isObservable } from "../../domain/typeWards/isObservable";
import { NonProxiedArray } from "@domain";

/**
 * Props for the List component.
 *
 * @template T - The type of items in the data array.
 */
type ListComponentProps<T extends ObservableTypeOrConst<any[]>, E> = ExtendableComponent<E> & {
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
  /**
   * Uses cloneNode instead of creating every item separately. It is twice as fast as not using a template
   *
   * **Warning:** It only works with plain objectJSXElements or classJSXElements
   *
   * Do not use conditions, arrays or fragments on the renderItem function if this is enabled
   */
  useTemplate?: boolean;
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
export const List = <const T extends ObservableTypeOrConst<any[]>, E = FC>(
  { data, renderItem, as: asTag, useTemplate, ...attrs }: ListComponentProps<T, E>,
  factory: ElementFactoryType,
) => {
  if (isObservable(data)) {
    if (data instanceof NonProxiedArray) {
      let el: ParentNode | VirtualFragment;
      if (asTag)
        el = factory.create<ParentNode>({
          jsxTag: asTag,
          attrs,
        } as SingleJSXElement);
      else
        removeVirtualFragmentOnNonProxiedArrays: {
          el = new VirtualFragment();
        }

      const newTarget = new data.TargetConstructor(
        el,
        renderItem,
        useTemplate ? new CloneFactory() : factory,
      ) as T;

      this.targets.push(newTarget);

      newTarget.push(this);

      return el.valueOf() as Node;
    }

    const el = new VirtualFragment();
    const gc = new GarbageCollectableObject(el);
    bindObservable<T>(data, (data) =>
      gc.ref.replaceChildren(
        ...data.map((x) =>
          create(renderItem(x, factory), factory.contextElement),
        ),
      ),
    );
    return el.valueOf();
  }
  return data.map((x) => renderItem(x, factory));
};
