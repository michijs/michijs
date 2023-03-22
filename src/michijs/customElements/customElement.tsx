import {
  CustomElementTag,
  MichiElementOptions,
  MichiElementSelf,
} from '../types';
import { createCustomElement } from './createCustomElement';

export function customElement(tag: TemplateStringsArray) {
  return function <
    O extends MichiElementOptions,
    S extends HTMLElement = MichiElementSelf<O>,
  >(elementOptions: O & ThisType<S>) {
    return createCustomElement<O, S>(
      tag[0] as CustomElementTag,
      elementOptions,
    );
  };
}
