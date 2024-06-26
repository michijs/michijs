import type {
  CustomElementTag,
  MichiElementClass,
  MichiElementOptions,
  MichiElementSelf,
  NoExtraProperties,
} from "../types";
import { createCustomElement } from "./createCustomElement";

export function customElement(tag: TemplateStringsArray) {
  return <
    O extends MichiElementOptions,
    S extends HTMLElement = MichiElementSelf<O>,
  >(
    elementOptions: NoExtraProperties<MichiElementOptions, O> & ThisType<S>,
  ): MichiElementClass<O, S> => createCustomElement<O, S>(tag[0] as CustomElementTag, elementOptions);
}
