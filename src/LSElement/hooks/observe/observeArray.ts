import { observe, ObserveProps } from '../observe';
import { customObjectDelete, customObjectSet } from './observeCommonObject';

export const observeArray = ({item, ...props}: ObserveProps<Array<any>>) => {
  const proxiedArray = item.map((value, key) => observe({ ...props, item: value, rootPropertyName: props.rootPropertyName ?? key.toString() }));
  return new Proxy(proxiedArray, {
    set: (target, property, newValue, receiver) => customObjectSet(props, property !== 'length')(target, property, newValue, receiver),
    deleteProperty: customObjectDelete(props)
    // Any change calls the set trap
    // get(target, property) {
    //     const targetProperty = Reflect.get(target, property);
    // switch (property) {
    //     case 'unshift':
    //     case 'shift':
    //     case 'pop':
    //     case 'push': {
    //         return function (...args) {
    //             const result = targetProperty.apply(target, args)
    //             if (result !== undefined)
    //                 onChange(rootPropertyName);//TODO: Notify with all values?
    //             return result;
    //         }
    //     }
    //     case 'splice': {
    //         return function (...args) {
    //             const result = targetProperty.apply(target, args)
    //             if (result.length !== 0)
    //                 onChange(rootPropertyName);//TODO: Notify with all values?
    //             return result;
    //         }
    //     }
    //     case 'reverse':
    //     case 'sort':
    //     case 'fill': {
    //         return function (...args) {
    //             const result = targetProperty.apply(target, args)
    //             // TODO: how do I know if changed?
    //             onChange(rootPropertyName);//TODO: Notify with all values?
    //             return result;
    //         };
    //     }
    //     default: {
    // return typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
    // }
    // }
    // },
  });
};