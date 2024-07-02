/**
 * @typedef {import('../../types').ObservableType} ObservableType
 */

/**
 * @typedef {import('../../classes/ProxiedValue').ProxiedValue} ProxiedValue
 */

/**
 * @param {ProxiedValue<Map<any, any>> | ProxiedValue<Set<any>>} target
 * @param {Map<any, any>["clear"] | Set<any>["clear"]} clearFn
 * @returns {Map<any, any>["clear"] | Set<any>["clear"]}
 */
export const customMapAndSetClear = (target, clearFn) => {
    return () => {
        if (target.shouldNotify()) {
            if (target.$value.size !== 0) {
                clearFn();
                target.notifyCurrentValue();
            }
        }
        else
            clearFn();
    };
};

/**
 * @param {ProxiedValue<Map<any, any>> | ProxiedValue<Set<any>>} target
 * @param {| Map<unknown, ObservableType<unknown>>["delete"] | Set<ObservableType<unknown>>["delete"]} deleteFn
 * @returns {| Map<unknown, ObservableType<unknown>>["delete"] | Set<ObservableType<unknown>>["delete"]}
 */
export const customMapAndSetDelete = (target, deleteFn) => {
    //In Map is key, in Set is value
    return (key) => {
        const result = deleteFn(key?.valueOf?.());
        if (result)
            target.notifyCurrentValue();
        return result;
    };
};
