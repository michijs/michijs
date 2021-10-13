import { observe } from './observe';
import { EmptyObject, ObjectOf, PropertyKey } from '../types';
import { observable } from './observable';

export type lsStoreProps<T,Y> = { state: T, transactions: Y };

export function lsStore<T extends object = EmptyObject, Y extends ObjectOf<Function> = EmptyObject>({ state = {} as T, transactions = {} as Y }: lsStoreProps<T,Y>) {
  const { notify, ...observableProps } = observable<Set<PropertyKey>>();
  const proxiedState = observe<T>(state || {} as T, (propertyThatChanged) => propertyChangedCallback(propertyThatChanged));
  let dispatchInProgressCount = 0;
  const propertiesThatChanged = new Set<PropertyKey>();
  // @ts-ignore
  const self = this;
  const proxiedTransactions = new Proxy(transactions || {}, {
    get (target, property) {
      return (...args) => {
        dispatchInProgressCount++;
        const result = transactions[property as string].apply(self || target, args);
        decrementDispatchInProgressCount();
        return result;
      };
    }
  }) as Y;

  const propertyChangedCallback = (propertyThatChanged: PropertyKey) => {
    propertiesThatChanged.add(propertyThatChanged);
    tryToNotify();
  };

  const tryToNotify = () => {
    if (dispatchInProgressCount === 0 && propertiesThatChanged.size > 0) {
      const clonedSet = new Set(propertiesThatChanged);
      propertiesThatChanged.clear();
      notify(clonedSet);
    }
  };

  const decrementDispatchInProgressCount = () => {
    dispatchInProgressCount--;
    tryToNotify();
  };

  return { ...observableProps, state: proxiedState, transactions: proxiedTransactions };
}