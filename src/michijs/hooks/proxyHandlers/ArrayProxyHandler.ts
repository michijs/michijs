import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { ProxiedArray } from "../../classes/ProxiedArray";
import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { unproxify } from "../../utils/unproxify";
import { cloneArray } from "../../utils/clone/cloneArray";

export class ArrayProxyHandler<T extends ProxiedArray<any>>
  extends ObjectProxyHandler<T>
  implements ObservableProxyHandler<ProxiedValueV2<T>, Array<any>>
{
  $newItemsCallback =
    (target: ProxiedValueV2<T>, bindedTargetProperty: Function) =>
    (...args: T[]) => {
      const proxiedArray = this.$cloneAndProxify(target, unproxify(args));
      const result = bindedTargetProperty(proxiedArray);
      target.notifyCurrentValue();
      return result;
    };
  $overrides = {
    push: this.$newItemsCallback,
    $replace: this.$newItemsCallback,
    unshift: this.$newItemsCallback,
    fill:
      (target, bindedTargetProperty: Array<any>["fill"]): Array<any>["fill"] =>
      (newValue, start, end) => {
        const result = bindedTargetProperty(
          this.createProxyChild(target, unproxify(newValue)),
          start,
          end,
        );
        target.notifyCurrentValue();
        return result;
      },
    splice:
      (
        target,
        bindedTargetProperty: Array<any>["splice"],
      ): Array<any>["splice"] =>
      (start, deleteCount, ...items) => {
        const result = bindedTargetProperty(
          start,
          deleteCount,
          ...items.map((x) => this.createProxyChild(target, unproxify(x))),
        );
        if (deleteCount > 0 || items.length > 0) target.notifyCurrentValue();
        return result;
      },
  };
  apply(target: ProxiedValueV2<T>, _: any, args: any[]) {
    if (args.length > 0) return this.applyNewValue(target, unproxify(args[0]));
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValueV2<T>, unproxifiedValue: T) {
    if (Array.isArray(unproxifiedValue)) {
      this.$overrides.$replace(
        target,
        target.$value.$replace,
      )(unproxifiedValue);
      return;
    } else return this.updateHandlerAndValue(target, unproxifiedValue);
  }
  getInitialValue(target: ProxiedValueV2<T>, unproxifiedValue: Array<any>): T {
    return new ProxiedArray(
      this.$cloneAndProxify(target, unproxifiedValue),
    ) as unknown as T;
  }
  $cloneAndProxify(target: ProxiedValueV2<T>, unproxifiedValue: Array<any>) {
    return cloneArray(unproxifiedValue, (newValue) =>
      this.createProxyChild(target, newValue),
    );
  }
  set(target: ProxiedValueV2<T>, p: string | symbol, newValue: any): boolean {
    return target[p](newValue);
  }
  get(target: ProxiedValueV2<T>, property) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    const bindedTargetProperty =
      typeof targetProperty === "function"
        ? (targetProperty as Function).bind(target.$value)
        : targetProperty;

    return (
      this.$overrides[property]?.(target, bindedTargetProperty) ??
      bindedTargetProperty
    );
  }
  // @ts-ignore
  override getOwnPropertyDescriptor(
    target: ProxiedValueV2<T>,
    prop: string | symbol,
  ) {
    // Otherwise length is listed as a property
    return prop !== "length"
      ? super.getOwnPropertyDescriptor(target, prop)
      : Reflect.getOwnPropertyDescriptor(target, prop);
  }
}
