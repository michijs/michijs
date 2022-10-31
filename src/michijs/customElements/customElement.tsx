import { AttributesType, EmptyObject, EventsType, KebabCase, MichiElementProperties, MethodsType, Self, SubscribeToType, CustomElementTag, ReflectedAttributesType, CssVariablesType, ReflectedCssVariablesType, ComputedCssVariablesType } from '../types';
import { createCustomElement } from './createCustomElement';

export function customElement(tag: TemplateStringsArray) {
  return function <
    A extends AttributesType = EmptyObject,
    RA extends ReflectedAttributesType = EmptyObject,
    NOA extends AttributesType = EmptyObject,
    FRA = RA extends object ? {
      [k in keyof RA as KebabCase<k>]: RA[k]
    } : EmptyObject,
    M extends MethodsType = EmptyObject,
    T extends MethodsType = EmptyObject,
    E extends EventsType = EmptyObject,
    S extends SubscribeToType = EmptyObject,
    EL extends Element = HTMLElement,
    FOA extends boolean = false,
    EXTA extends keyof JSX.IntrinsicElements = undefined,
    C extends CssVariablesType = EmptyObject,
    RC extends ReflectedCssVariablesType = EmptyObject,
    FRC extends CssVariablesType = RC extends object ? {
      [k in keyof RC as KebabCase<k>]: RC[k]
    } : EmptyObject,
    CC extends ComputedCssVariablesType = EmptyObject
  >(elementProperties: MichiElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA, EL, EXTA, C, RC, FRC, CC> & ThisType<Self<CC, RC, C, M, T, E, A, RA, NOA, EL, FRA, EXTA>> = {}) {
    return createCustomElement<A, RA, NOA, FRA, M, T, E, S, EL, FOA, EXTA, C, RC, FRC, CC, CustomElementTag>(tag[0] as CustomElementTag, elementProperties);
  };
}