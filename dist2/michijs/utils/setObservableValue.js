import { ProxiedArray, ProxiedValue, useObserve } from "../..";

/**
 * @typedef {import('../types').Subscription} Subscription
 */

// <T extends ObservableType<any>>
/**
 * @template {object} T
 * @param {T} object1
 * @param {*} object2
 * @param {Subscription<T>[]} initialObservers
 * @returns {boolean}
 */
export function setObservableValue(object1, object2, 
// Intentional - this function should be only used on observe functions to avoid removing subscription to parents
initialObservers) {
    // null?.valueOf() is undefined - bug
    const object1Value = object1 ? object1.valueOf() : object1;
    const object2Value = object2 ? object2.valueOf() : object2;

    if (object1Value === object2Value || object1Value == object2Value)
        return true;

    const type = typeof object1Value;
    const typeObject2 = typeof object2Value;
    const areDifferentTypes = type !== typeObject2;
    if (areDifferentTypes) {
        return Reflect.set(object1, "$value", useObserve(object2, initialObservers)
            .$value);
    }
    switch (type) {
        case "function": {
            return Reflect.set(object1, "$value", object2Value);
        }
        case "object": {
            if (object1Value === null || object2Value === null)
                return Reflect.set(object1, "$value", useObserve(object2, initialObservers).$value);

            ProxiedValue.startTransaction();
            if (object1 instanceof ProxiedArray && Array.isArray(object2Value)) {
                object1.$replace(...object2Value.map((x) => useObserve(x, initialObservers)));
            }
            else if (Object.getPrototypeOf(object1Value) === Object.prototype)
                for (const key in { ...object1Value, ...object2Value }) {
                    object1[key] = object2Value[key];
                }
            else
                Reflect.set(object1, "$value", useObserve(object2, initialObservers).$value);
            ProxiedValue.endTransaction();
            return true;
            // TODO: add set / map etc
        }
        default: {
            return Reflect.set(object1, "$value", object2Value);
        }
    }
}
// export function deepEqual(object1Value, object2Value) {
//   const result = deepEqual2(object1Value, object2Value)
//   console.log(object1Value, object2Value, result)
//   return result;
// }
