import type {
  ElementFactoryType,
  FC,
  ListProps,
  SingleJSXElement,
} from "../shared/types/types";
import { VirtualFragment } from "./VirtualFragment";
import { CloneFactory, ElementFactory } from "../infrastructure/dom/create/ElementFactory";
import { NonProxiedArrayTarget } from "./NonProxiedArrayTarget";

export class NonProxiedArray<
  V,
  T extends NonProxiedArrayTarget<V> = NonProxiedArrayTarget<V>,
> extends Array<V> {
  declare targets: Array<T>;

  constructor(
    TargetConstructor: typeof NonProxiedArrayTarget<V> = NonProxiedArrayTarget,
    ...items: V[]
  ) {
    super(...items);
    Object.defineProperty(this, "List", {
      enumerable: false,
      configurable: true,
      value: <const E = FC>(
        { as: asTag, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
        factory: ElementFactoryType = new ElementFactory(),
      ): Node => {
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

        const newTarget = new TargetConstructor(
          el,
          renderItem,
          useTemplate ? new CloneFactory() : factory,
        ) as T;

        this.targets.push(newTarget);

        newTarget.push(this);

        return el.valueOf() as Node;
      },
    });
    Object.defineProperty(this, "targets", {
      enumerable: false,
      configurable: true,
      value: [] as T[],
    });
  }

  declare List: <const E = FC>(
    { as, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
    factory?: ElementFactoryType,
  ) => Node;

  // Critical functions
  override push(...items: V[]): number {
    if (items.length > 0) for (const target of this.targets) target.push(items);
    return super.push(...items);
  }

  $clear(): void {
    for (const target of this.targets) target.$clear();
    this.length = 0;
  }

  $replace(...items: V[]): number {
    if (this.length) {
      for (const target of this.targets) target.$replace(items);
      this.length = items.length;
      items.forEach((x, i) => (this[i] = x));
    } else {
      for (const target of this.targets) target.push(items);
      super.push(...items);
    }
    return items.length;
  }

  $remove(index: number): number {
    for (const target of this.targets) target.$remove(index);
    super.splice(index, 1);
    return this.length;
  }

  $swap(indexA: number, indexB: number): boolean {
    for (const target of this.targets) target.$swap(indexA, indexB);
    [this[indexA], this[indexB]] = [this[indexB]!, this[indexA]!];
    return true;
  }
}
