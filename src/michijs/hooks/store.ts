import { observe } from "./observe";
import { StoreProps, Store, EmptyObject } from "../types";
import { observable } from "./observable";

export function store<
  T extends object = EmptyObject,
  Y extends Record<string | symbol, Function> = EmptyObject,
>(this: any, props: StoreProps<T, Y>): Store<T, Y> {
  const { notify, ...observableProps } = observable<string[]>();
  const proxiedState = observe<T>({
    item: props.state,
    onChange: (propertyPath) => propertyChangedCallback(propertyPath),
    shouldValidatePropertyChange: (propertyPath) =>
      !propertiesThatChanged.find((x) => x === propertyPath),
    propertyPath: "",
    // subscribeCallback: (path, observer) => {
    //   const cuttedPath = path.slice(1);
    //   observableProps.subscribe((value) => {
    //     const valuesFound = value?.filter(x => x.startsWith(cuttedPath)).map(x => x.slice(cuttedPath.length));
    //     if (valuesFound && valuesFound.length > 0)
    //       observer(valuesFound);
    //   });
    // }
  });
  let dispatchInProgressCount = 0;
  let propertiesThatChanged = new Array<string>();
  const proxiedTransactions = Object.entries(props.transactions ?? {}).reduce(
    (previousValue, [key, value]) => {
      previousValue[key] = (...args) => {
        dispatchInProgressCount++;
        const result = this ? value.apply(this, args) : value(...args);
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
