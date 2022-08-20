import { AttributesType, EmptyObject, EventsType, KebabCase, LSElementProperties, MethodsType, Self, SubscribeToType, Tag, LSElementConfig } from '../types';
import { createCustomElement } from './createCustomElement';

export function customElement(tag: TemplateStringsArray) {
  return function <
        A extends AttributesType = EmptyObject,
        RA extends AttributesType = EmptyObject,
        NOA extends AttributesType = EmptyObject,
        FRA = RA extends object ? {
            [k in keyof RA as KebabCase<k>]: RA[k]
        } : EmptyObject,
        M extends MethodsType = EmptyObject,
        T extends MethodsType = EmptyObject,
        E extends EventsType = EmptyObject,
        S extends SubscribeToType = EmptyObject,
        EL extends Element = HTMLElement,
        FOA extends boolean = false
        >(elementProperties: LSElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA> & ThisType<Self<M, T, E, A, RA, NOA, EL>> = {}) {
    return createCustomElement<A, RA, NOA, FRA, M, T, E, S, EL, FOA, Tag>(tag[0] as Tag, elementProperties);
  };
}