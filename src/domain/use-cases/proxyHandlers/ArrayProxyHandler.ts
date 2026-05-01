import { ObjectProxyHandler } from "./ObjectProxyHandler";
import type { ProxyHandlerPort, ProxiedValuePort } from "#ports";
import { unproxify } from "../../utils/unproxify";
import { cloneArray } from "#shared";
import { ProxiedArray } from "../../entities/reactive/proxied/ProxiedArray";

export class ArrayProxyHandler<T extends ProxiedArray<any>>
  extends ObjectProxyHandler<T>
  implements ProxyHandlerPort<T>
{
  $newItemsCallback =
    (target: ProxiedValuePort<T>, bindedTargetProperty: Function) =>
    (...args: T[]) => {
      const proxiedArray = this.$cloneAndProxify(target, unproxify(args));
      const result = bindedTargetProperty(...proxiedArray);
      target.notifyCurrentValue();
      return result;
    };
  $callAndNotifyIfTrueCallback =
    (target: ProxiedValuePort<T>, bindedTargetProperty: Function) =>
    (...args: T[]) => {
      const result = bindedTargetProperty(...args);
      if (result) target.notifyCurrentValue();
      return result;
    };
  $callAndNotifyIfLengthChangedCallback =
    (target: ProxiedValuePort<T>, bindedTargetProperty: Function) =>
    (...args: T[]) => {
      const oldLength = target.$value.length;
      const result = bindedTargetProperty(...args);
      if (oldLength !== target.$value.length) target.notifyCurrentValue();
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
    $clear:
      (target: ProxiedValuePort<T>, bindedTargetProperty: Function) => () => {
        if (target.$value.length > 0) {
          bindedTargetProperty();
          target.notifyCurrentValue();
        }
      },
    $remove: this.$callAndNotifyIfLengthChangedCallback,
    $swap: this.$callAndNotifyIfTrueCallback,
    pop: this.$callAndNotifyIfTrueCallback,
    reverse: this.$callAndNotifyIfTrueCallback,
    shift: this.$callAndNotifyIfTrueCallback,
    sort: this.$callAndNotifyIfTrueCallback,
  };
  apply(target: ProxiedValuePort<T>, _: any, args: any[]) {
    if (args.length > 0) return this.applyNewValue(target, unproxify(args[0]));
    // For some reason now is enumerating List and targets
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValuePort<T>, unproxifiedValue: T) {
    if (Array.isArray(unproxifiedValue)) {
      this.$overrides.$replace(
        target,
        target.$value.$replace.bind(target.$value),
      )(...unproxifiedValue);
      return;
    }
    return this.updateHandlerAndValue(target, unproxifiedValue);
  }
  getInitialValue(
    target: ProxiedValuePort<T>,
    unproxifiedValue: Array<any>,
  ): T {
    return new ProxiedArray(
      ...this.$cloneAndProxify(target, unproxifiedValue),
    ) as unknown as T;
  }
  $cloneAndProxify(target: ProxiedValuePort<T>, unproxifiedValue: Array<any>) {
    return cloneArray(unproxifiedValue, (newValue) =>
      this.createProxyChild(target, newValue),
    );
  }
  get(target: ProxiedValuePort<T>, property) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    // Proxies are also functions. This is an easier way to know if its a proxy item or a function
    if (Number.isInteger(Number(property))) return targetProperty;
    const bindedTargetProperty =
      typeof targetProperty === "function"
        ? (targetProperty as Function).bind(target.$value)
        : targetProperty;

    return (
      this.$overrides[property]?.(target, bindedTargetProperty) ??
      bindedTargetProperty
    );
  }
  override getOwnPropertyDescriptor(
    target: ProxiedValuePort<T>,
    p: string | symbol,
  ) {
    // Otherwise length is listed as a property
    return p !== "length"
      ? (
          super
            .getOwnPropertyDescriptor as ArrayProxyHandler<T>["getOwnPropertyDescriptor"]
        )(target, p)
      : Reflect.getOwnPropertyDescriptor(target, p);
  }

  override ownKeys(target: ProxiedValuePort<T>) {
    return Reflect.ownKeys(target.$value).filter((x) =>
      typeof x === "string" ? !["List", "targets"].includes(x) : x,
    );
  }
}
