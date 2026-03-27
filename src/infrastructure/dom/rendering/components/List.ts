import { GarbageCollectableObject, isObservable, ReactiveArray, ProxiedArray, bindObservable, type ElementFactoryPort } from "@domain";
import { create } from "../create";
import { ElementFactory } from "../ElementFactory";
import type {
  FC,
  ObservablePrimitiveType,
  ObservableType,
  ObservableTypeOrConst,
  ObservableArray,
  ExtendableComponent,
  SingleJSXElement,
} from "../types";
import { ElementArrayTarget } from "../../entities/ElementArrayTarget";
import { ElementProxiedArrayTarget } from "../../entities/ElementProxiedArrayTarget";
import { VirtualFragment } from "../VirtualFragment";

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
  elementFactory?: ElementFactoryPort<Element, SingleJSXElement>
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
export const List = <const T extends ObservableTypeOrConst<any[]>, const E = FC>(
  { data, renderItem, as: asTag, elementFactory, ...attrs }: ListComponentProps<T, E>,
  factory?: ElementFactoryPort<Element, SingleJSXElement>,
) => {
  const resolvedFactory = elementFactory ?? factory ?? new ElementFactory();
  const underlyingData = (data as any)?.$value ?? data;
  if (underlyingData instanceof ReactiveArray) {
    const castedData = underlyingData as ReactiveArray<any>
    let el: ParentNode | VirtualFragment;
    if (asTag)
      el = resolvedFactory.create<ParentNode>({
        jsxTag: asTag,
        attrs,
      } as SingleJSXElement);
    else
      removeVirtualFragmentOnNonProxiedArrays: {
        el = new VirtualFragment();
      }

    const newTarget = underlyingData instanceof ProxiedArray
      ? new ElementProxiedArrayTarget(el, renderItem, resolvedFactory)
      : new ElementArrayTarget(el, renderItem, resolvedFactory);

    castedData.targets.push(newTarget);

    // Render existing items in the array
    newTarget.push(castedData as unknown as any[]);

    return el.valueOf() as Node;
  }

  if (isObservable(data)) {
    const el = new VirtualFragment();
    const gc = new GarbageCollectableObject(el);
    bindObservable<T>(data, (data) =>
      gc.ref.replaceChildren(
        ...data.map((x) =>
          create(renderItem(x, resolvedFactory), resolvedFactory.contextElement),
        ),
      ),
    );
    return el.valueOf();
  }
  return data.map((x) => renderItem(x, resolvedFactory));
};
