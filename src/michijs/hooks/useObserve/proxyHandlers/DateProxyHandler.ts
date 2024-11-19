import { ObjectProxyHandler } from "./ObjectProxyHandler";

export class DateProxyHandler<T> extends ObjectProxyHandler<T> {
  override get(target, property) {
    if (property in target) return Reflect.get(target, property);
    if (target.$value) {
      const targetProperty = Reflect.get(target.$value, property);
      if (typeof property === "string") {
        if (property.startsWith("set")) {
          return (...args) => {
            const oldValue = target.$value.getTime();
            const result = (targetProperty as Function).apply(
              target.$value,
              args,
            );
            const newValue = target.$value.getTime();
            if (newValue !== oldValue) target.notifyCurrentValue();

            return result;
          };
        }
        // else if (property === 'subscribe')
        //   return (callback) => subscribeCallback?.(propertyPath, callback);
      }
      return typeof targetProperty === "function"
        ? targetProperty.bind(target.$value)
        : targetProperty;
    }
  }
}