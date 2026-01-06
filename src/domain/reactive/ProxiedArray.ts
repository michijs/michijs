import { NonProxiedArray } from "./NonProxiedArray";
import { Target } from "./Target";
export class ProxiedArray<V> extends NonProxiedArray<V, Target<V>> {
  constructor(...items: V[]) {
    super(Target, ...items);
  }

  override pop(): V | undefined {
    for (const target of this.targets) target.pop();
    return super.pop();
  }

  override reverse(): V[] {
    for (const target of this.targets) target.reverse();
    return super.reverse();
  }

  override shift(): V | undefined {
    for (const target of this.targets) target.shift();
    return super.shift();
  }
  override unshift(...items: V[]): number {
    for (const target of this.targets) target.prependItems(items);
    return super.unshift(...items);
  }
  override fill(item: V, start?: number, end?: number) {
    for (const target of this.targets) target.fill(item, start, end);
    super.fill(item, start, end);
    return this;
  }
  override sort(compareFn?: (a: V, b: V) => number) {
    const arrayCopy = [...this];
    const result = super.sort(compareFn);
    if (this.targets.length > 0) {
      const indexesArray = arrayCopy.reduce(
        (previousValue, currentValue, currentIndex) => {
          const newIndex = result.indexOf(currentValue);
          // To avoid repeated indexes
          if (newIndex > currentIndex) {
            previousValue.push({
              currentIndex,
              newIndex,
            });
          }
          return previousValue;
        },
        [] as { currentIndex: number; newIndex: number }[],
      );

      for (const target of this.targets)
        for (const { currentIndex, newIndex } of indexesArray)
          target.$swap(currentIndex, newIndex);
    }
    return this;
  }
  override splice(start: number, deleteCount = 0, ...items: V[]): V[] {
    if (start === 0 && deleteCount >= this.length) this.$replace(...items);
    else {
      for (const target of this.targets)
        target.splice(start, deleteCount, items);
      super.splice(start, deleteCount, ...items);
    }
    return this;
  }
}
