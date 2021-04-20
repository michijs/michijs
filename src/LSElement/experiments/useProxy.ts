// import { ChangeFunction } from '../types';
// import { deepEqual } from '../utils/deepEqual';

// export function useProxy<T extends object>(object: T, onChange: ChangeFunction): T {
//   return new Proxy<T>(object, {
//     defineProperty(target, propertyKey, descriptor) {
//       const oldValue = target[propertyKey];
//       const result = Reflect.defineProperty(target, propertyKey, descriptor);
//       const newValue = target[propertyKey];
//       if (!deepEqual(newValue, oldValue)) {
//         onChange(propertyKey, newValue, oldValue);
//       }
//       return result;
//     },
//     deleteProperty(target, propertyKey) {
//       const oldValue = target[propertyKey];
//       const result = Reflect.deleteProperty(target, propertyKey);
//       const newValue = target[propertyKey];
//       if (!deepEqual(newValue, oldValue)) {
//         onChange(propertyKey, newValue, oldValue);
//       }
//       return result;
//     }
//   });
// }

// export function useProxy<T extends object>(object: T, onChange: ChangeFunction, rootPropertyKey?: string | number | symbol, rootTarget?: T): T {
//     return new Proxy<T>(object, {
//         // get(target, property, receiver) {
//         //     try {
//         //         const value = target[property];
//         //         if (typeof value === 'object' && value !== undefined && value !== null) {
//         //             return useProxy(target[property], onChange, rootPropertyKey || property, rootTarget || target);
//         //         }
//         //         return Reflect.get(target, property, receiver);
//         //         if (typeof target[property] === 'function') {
//         //             return Reflect.get(target, property, receiver);
//         //         }
//         //         return useProxy(target[property], onChange, rootPropertyKey || property, rootTarget || target);
//         //     } catch (err) {
//         //         return Reflect.get(target, property, receiver);
//         //     }
//         // },
//         defineProperty(target, property, descriptor) {
//             const propertyKey = rootPropertyKey || property;
//             const oldValue = copy((rootTarget || target)[propertyKey]);
//             const result = Reflect.defineProperty(target, property, descriptor);
//             const newValue = copy((rootTarget || target)[propertyKey]);
//             if (!deepEqual(newValue, oldValue)) {
//                 onChange(propertyKey, newValue, oldValue);
//             }
//             return result;
//         },
//         deleteProperty(target, property) {
//             const propertyKey = rootPropertyKey || property;
//             const oldValue = copy((rootTarget || target)[propertyKey]);
//             const result = Reflect.deleteProperty(target, property);
//             const newValue = copy((rootTarget || target)[propertyKey]);
//             if (!deepEqual(newValue, oldValue)) {
//                 onChange(propertyKey, newValue, oldValue);
//             }
//             return result;
//         }
//     });
// }
