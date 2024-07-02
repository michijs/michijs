import { useObserve } from "../useObserve";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { customMapAndSetClear, customMapAndSetDelete, } from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectGetOwnPropertyDescriptor, customObjectOwnKeys, customObjectSet, } from "./observeCommonObject";
import { cloneMap, setObservableValue } from "../../utils";

/**
 * @typedef {import('../../types').ObservableType} ObservableType
 * @typedef {import('../../types').Subscription} Subscription
 */









/**
 * @template E
 * @template {Map<any, E>} T
 * @param {T} item
 * @param {Subscription<T>[]} [initialObservers=[]]
 * @returns {ObservableType<T>}
 */
export const observeMap = (item, initialObservers = []) => {
    const newInitialObservers = [
        ...initialObservers,
        () => newObservable.notifyCurrentValue(),
    ];
    const proxiedMap = cloneMap(item, (value) => useObserve(value, newInitialObservers));
    const newObservable = new ProxiedValue(proxiedMap, initialObservers);
    return new Proxy(newObservable, {
        set: customObjectSet(newInitialObservers),
        get: (target, property) => {
            if (property in target)
                return Reflect.get(target, property);
            const targetProperty = Reflect.get(target.$value, property);
            const bindedTargetProperty = typeof targetProperty === "function"
                ? targetProperty.bind(target.$value)
                : targetProperty;
            switch (property) {
                case "clear": {
                    return customMapAndSetClear(target, bindedTargetProperty);
                }
                case "set": {
                    return (key, newValue) => {
                        const hasOldValue = target.$value.has(key);
                        if (hasOldValue) {
                            const oldValue = target.$value.get(key);
                            return setObservableValue(oldValue, newValue, newInitialObservers);
                        }
                        const observedItem = useObserve(newValue, newInitialObservers);
                        const result = bindedTargetProperty(key, observedItem);
                        observedItem.notifyCurrentValue?.();
                        return result;
                    };
                }
                case "delete": {
                    return customMapAndSetDelete(target, bindedTargetProperty);
                }
                default: {
                    return bindedTargetProperty;
                }
            }
        },
        ownKeys: customObjectOwnKeys,
        getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
        deleteProperty: customObjectDelete,
    });
};
