import {
  CustomElementClass,
  CustomElementEvents,
  MichiProperties,
  MichiElementOptions,
} from '../types';

export function createElementProperties<
O extends MichiElementOptions,
S extends HTMLElement = (
  O['attributes'] &
  O['reflectedAttributes'] &
  O['cssVariables'] &
  O['reflectedCssVariables'] &
  O['transactions'] &
  O['methods'] &
  (O['nonObservedAttributes'] extends (() => infer NOA) ? NOA : {}) &
  CustomElementEvents<O['events']> &
  MichiProperties &
  (O['extends'] extends { class: infer E; } ? (E extends new (...args: any) => any ? InstanceType<E> : HTMLElement) : HTMLElement))
>(
  elementOptions: O & ThisType<S>,
) {
  return elementOptions;
}
