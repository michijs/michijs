import type { NonProxiedArrayTargetPort } from "../../ports";
import { NonProxiedArrayTarget } from "../NonProxiedArrayTarget";

export class NonProxiedArray<
  V,
  T extends NonProxiedArrayTargetPort<V, Node> = NonProxiedArrayTarget<V>,
> extends Array<V> {
  declare targets: Array<T>;
  declare TargetConstructor: typeof NonProxiedArrayTarget<V>;

  constructor(
    TargetConstructor: typeof NonProxiedArrayTarget<V> = NonProxiedArrayTarget,
    ...items: V[]
  ) {
    super(...items);
    this.TargetConstructor = TargetConstructor;
    Object.defineProperty(this, "targets", {
      enumerable: false,
      configurable: true,
      value: [] as T[],
    });
  }

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
