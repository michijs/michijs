import { AttributesType, EmptyObject, EventsType, KebabCase, MethodsType, LSElementProperties, Self, SubscribeToType } from '../types';

export function createElementProperties<
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
    FOA extends boolean = false,
    >(elementProperties: LSElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA> & ThisType<Self<M, T, E, A, RA, NOA, EL>> = {}) {
  return elementProperties;
}