import { AttributesType, EmptyObject, EventsType, KebabCase, MethodsType, MichiElementProperties, Self, SubscribeToType, CssVariablesType, ReflectedAttributesType, ReflectedCssVariablesType, CSSObject } from '../types';

export function createElementProperties<
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
    C extends CssVariablesType = EmptyObject,
    RC extends ReflectedCssVariablesType = EmptyObject,
    FRC extends CssVariablesType = RC extends object ? {
      [k in keyof RC as KebabCase<k>]: RC[k]
    } : EmptyObject
    >(elementProperties: MichiElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA, EL, never, C, RC, FRC> & ThisType<InstanceType<Self<RC, C, M, T, E, A, RA, NOA, EL, FRA, undefined, FRC>>> = {}) {
  return elementProperties;
}