import { observe } from './observe';
import { EmptyObject, LsStoreProps, ObjectOf } from '../types';
import { observable } from './observable';

export function lsStore<T extends object = EmptyObject, Y extends ObjectOf<Function> = EmptyObject>({ state = {} as T, transactions = {} as Y }: LsStoreProps<T, Y>) {
  const { notify, ...observableProps } = observable<string[]>();
  const proxiedState = observe<T, string[]>({
    item: state as T,
    onChange: (propertyPath) => propertyChangedCallback(propertyPath),
    shouldValidatePropertyChange: (propertyPath) => !propertiesThatChanged.find(x => x === propertyPath),
    propertyPath: '',
    subscribeCallback: (path, observer) => {
      const cuttedPath = path.slice(1);
      observableProps.subscribe((value) => {
        const valuesFound = value.filter(x => x.startsWith(cuttedPath)).map(x => x.slice(cuttedPath.length));
        if (valuesFound.length > 0)
          observer(valuesFound);
      });
    }
  });
  let dispatchInProgressCount = 0;
  let propertiesThatChanged = new Array<string>();
  // @ts-ignore
  const self = this;
  const proxiedTransactions = new Proxy(transactions, {
    get(target, property) {
      return (...args) => {
        dispatchInProgressCount++;
        const result = transactions[property as string].apply(self ?? target, args);
        decrementDispatchInProgressCount();
        return result;
      };
    }
  }) as Y;

  const propertyChangedCallback = (propertyThatChanged: string) => {
    propertiesThatChanged.push(propertyThatChanged);
    tryToNotify();
  };

  const tryToNotify = () => {
    if (dispatchInProgressCount === 0 && propertiesThatChanged.length > 0) {
      const clonedArray = propertiesThatChanged.map(x => x.slice(1));
      propertiesThatChanged = [];
      notify(clonedArray);
    }
  };

  const decrementDispatchInProgressCount = () => {
    dispatchInProgressCount--;
    tryToNotify();
  };

  return { ...observableProps, state: proxiedState, transactions: proxiedTransactions };
}