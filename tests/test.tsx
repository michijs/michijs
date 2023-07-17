import { If, computedObserve, create, h, observe } from "../src";
// const h = {
//   createElement(tag, attrs, ...childrenProps): JSX.Element {
//     console.log(childrenProps)
//   },
// };

// type Observable<T> = (T extends object
//   ? { [K in keyof T]: Observable<T[K]> }
//   : (newValue: T) => T) & { subscribe(): void };

// const callbacks = [];

// const createObservable = <T extends object>(obj: T): Observable<T> => {
//   return new Proxy<T>(obj, {
//     get(target, p) {
//       if (typeof target[p] !== "object") {
//         const notify = () => {
//           callbacks.forEach((callback) => callback());
//         };

//         const observableValue = (newValue) => {
//           if (newValue !== undefined && target[p] !== newValue) {
//             target[p] = newValue;
//             notify();
//           }
//           return target[p];
//         };
//         observableValue.subscribe = (callback) => callbacks.push(callback);
//         return observableValue;
//       }
//     },
//   }) as unknown as Observable<T>;
// };

// const b = createObservable({
//   count: "123",
// });

// const a = <input type="text" value={b.count} />;

// const button = document.createElement("button");
// button.textContent = "xd";

// button.onclick = () => {
//   b.count(Math.random().toString());
//   console.log(a);
// };

// // document.body.innerHTML = "";
// // document.body.append(button);
// // document.body.append(a);

// const A = {
//   valueOf() {
//     return 3;
//   },

//   toString() {
//     return "3";
//   },

//   subscribe() {
//     console.log("xd");
//   },
// } as unknown as number & { subscribe(): void };

// const tests = 2 + A;

// console.log(tests, A.subscribe);

const store = observe({
  level2: {
    date: new Date(),
    map: new Map<string, number>(),
    level1: {
      number: 1,
      undefined: undefined,
      // set: new Set()
    },
  },
});

const { number } = store.level2.level1;

store.level2.level1.subscribe?.((newValue) => console.log('level1', newValue))
store.level2.level1.undefined.subscribe?.((val) => console.log('undefined', val));
store.level2.level1.number.subscribe?.((val) => console.log(val));
store.level2.date.subscribe?.((val) => console.log(val));
store.level2.map.subscribe?.((val) => console.log(val));
const computed = computedObserve(() => !!Number.isInteger(number / 2), [number])

computed.subscribe?.((newValue) => console.log('computed', newValue));

store.level2.level1.number = 2;
store.level2.level1.undefined = 3;
store.level2.date.setMonth(store.level2.date.getMonth() + 1);
store.level2.map.set("xd", 1);
store.level2.map.get("xd")?.subscribe?.((newValue) => console.log('map xd key changed', newValue));
store.level2.map.set("xd", 2);
store.level2.map.clear();

const a = <div
    // _={{
    //   id: number,
    // }}
    name={number}
    onclick={() => {
      store.level2.level1.number++;
    }}
  >
    asdf: {number}
    <If
      condition={computed}
      then={() => "Es par"}
      else={() => <span>Es impar</span>}
    />
  </div>
;
document.body.append(a);
// TODO: set is broken, add arrays subscription return values
// aasdf.level2.level1.set.add(1);
// console.log(aasdf.level2.level1.set.has(1))
// aasdf.level3.subscribe?.((val) => console.log(val))

// store.level2.level1 = {
//   number: 12
// }