import {
  CustomElementTag,
  CustomElementEvents,
  MichiElementOptions,
  MichiProperties,
} from '../types';
import { createCustomElement } from './createCustomElement';

export function customElement(tag: TemplateStringsArray) {
  return function <
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
>(elementOptions: O & ThisType<S>) {
    return createCustomElement<O,S>(tag[0] as CustomElementTag, elementOptions);
  };
}
