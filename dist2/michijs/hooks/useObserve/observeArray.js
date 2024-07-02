import { useObserve } from "../useObserve";
import { ProxiedArray } from "../../classes";
import { customObjectApply, customObjectDelete, customObjectGet, customObjectGetOwnPropertyDescriptor, customObjectHas, customObjectOwnKeys, customObjectSet, } from "./observeCommonObject";
import { cloneArray } from "../../utils";

/**
 * @typedef {import('../../types').ObservableType} ObservableType
 * @typedef {import('../../types').Subscription} Subscription
 */







const mutableNewItemsProperties = new Set(["push", "$replace", "unshift"]);

/**
 * @template {Array<unknown>} T
 * @param {T} item
 * @param {Subscription<T>[]} [initialObservers=[]]
 * @returns {ObservableType<T>}
 */
export function observeArray(item, initialObservers = []) {
    const newInitialObservers = [
        ...initialObservers,
        () => newObservable.notifyCurrentValue(),
    ];
    const proxiedArray = cloneArray(item, (value) => useObserve(value, newInitialObservers));

    const newObservable = new ProxiedArray(proxiedArray);
    const proxy = new Proxy(newObservable, {
        set: customObjectSet(newInitialObservers),
        deleteProperty: customObjectDelete,
        ownKeys: customObjectOwnKeys,
        apply: customObjectApply(() => proxy, newInitialObservers),
        getOwnPropertyDescriptor(target, prop) {
            return prop !== "length"
                ? customObjectGetOwnPropertyDescriptor(target, prop)
                : Reflect.getOwnPropertyDescriptor(target, prop);
        },
        // Fixes calling iterable methods like forEach
        has: customObjectHas,
        get(target, p, receiver) {
            const castedP = p;
            if (typeof castedP === "string") {
                if (mutableNewItemsProperties.has(castedP)) {
                    const targetProperty = Reflect.get(target, p);
                    return (...args) => {
                        const proxiedArray = args.map((value) => useObserve(value, newInitialObservers));
                        const result = targetProperty.apply(target, proxiedArray);
                        return result;
                    };
                }
                if (castedP === "fill") {
                    const targetProperty = Reflect.get(target, p);
                    return (value, start, end) => {
                        const result = targetProperty.apply(target, [
                            useObserve(value, newInitialObservers),
                            start,
                            end,
                        ]);
                        return result;
                    };
                }
                if (castedP === "splice") {
                    const targetProperty = Reflect.get(target, p);
                    return (start, deleteCount, ...items) => {
                        const result = targetProperty.apply(target, [
                            start,
                            deleteCount,
                            ...items.map((x) => useObserve(x, newInitialObservers)),
                        ]);
                        return result;
                    };
                }
            }
            return customObjectGet(newInitialObservers)(target, p, receiver);
        },
    });

    return proxy;
}
