import { observe } from "./observe";
import { StoreProps, Store, EmptyObject } from "../types";
import { observable } from "./observable";

export function store<
  T extends object = EmptyObject,
  Y extends Record<string | symbol, Function> = EmptyObject,
>(props: StoreProps<T, Y>): Store<T, Y> {
  const { notify, ...observableProps } = observable<string[]>();
  const proxiedState = observe<T>({
    item: props.state,
    onChange: (propertyPath) => propertyChangedCallback(propertyPath),
    shouldValidatePropertyChange: (propertyPath) =>
      !propertiesThatChanged.find((x) => x === propertyPath),
    propertyPath: "",
  });
  let dispatchInProgressCount = 0;
  let propertiesThatChanged = new Array<string>();
  // @ts-ignore
  const self = this;
  const proxiedTransactions = Object.entries(props.transactions ?? {}).reduce(
    (previousValue, [key, value]) => {
      previousValue[key] = (...args) => {
        dispatchInProgressCount++;
        const result = self ? value.apply(self, args) : value(...args);
        decrementDispatchInProgressCount();
        return result;
      };
      return previousValue;
    },
    {},
  ) as Y;
  // Removed because of event listener validations
  // const proxiedTransactions = (props.transactions ? new Proxy(props.transactions, {
  //   get(target, property) {
  //     return (...args) => {
  //       dispatchInProgressCount++;
  //       const result = props.transactions?.[property].apply(self ?? target, args);
  //       decrementDispatchInProgressCount();
  //       return result;
  //     };
  //   }
  // }): {}) as Y;

  const propertyChangedCallback = (propertyThatChanged?: string) => {
    if (propertyThatChanged) propertiesThatChanged.push(propertyThatChanged);
    tryToNotify();
  };

  const tryToNotify = () => {
    if (dispatchInProgressCount === 0 && propertiesThatChanged.length > 0) {
      const clonedArray = propertiesThatChanged.map((x) => x.slice(1));
      propertiesThatChanged = [];
      notify(clonedArray);
    }
  };

  const decrementDispatchInProgressCount = () => {
    dispatchInProgressCount--;
    tryToNotify();
  };

  return {
    ...observableProps,
    state: proxiedState,
    transactions: proxiedTransactions,
  };
}
