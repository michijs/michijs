import type { Attributes } from '@lsegurado/htmltype';
import type { FC, MichiCustomElement } from '../types';
import { h } from '../h';
import { Fragment } from '.';
import { setAttribute } from '../DOM/attributes/setAttribute';
import { GetRoles } from '@lsegurado/htmltype/dist/Attributes';

export type ElementInternalsProps = Partial<
  {
    /**Form controls usually expose a "value" property */
    formValue: Parameters<ElementInternals['setFormValue']>[0];
    /**A validation message to show */
    errorMessage?: Parameters<ElementInternals['setValidity']>[1];
    validityStateFlags?: ValidityStateFlags;
    tabIndex: number;
    children: JSX.Element;
  }
  & ARIAMixin
  & GetRoles<Attributes.AllRoles>
>

/**
 * It allows to:
 * - Make the element accessible to the browser
 * - Access element internals 
 * - Validate and assign values to forms
 */
export const ElementInternals: FC<ElementInternalsProps> = ({ children, errorMessage, formValue, tabIndex = 0, validityStateFlags = { customError: true }, ...aria }, self: MichiCustomElement) => {
  if (self && self.$michi.internals) {
    if (errorMessage)
      self.$michi.internals.setValidity?.(validityStateFlags, errorMessage);
    else
      self.$michi.internals.setValidity?.({});
    self.$michi.internals.setFormValue?.(formValue);

    Object.entries({ tabIndex, ...aria }).forEach(([key, value]) => {
      if (key in self.$michi.internals) {
        if (value !== self.$michi.internals[key])
          self.$michi.internals[key] = value;
      } else if (key in self) {
        if (self[key] !== value)
          self[key] = value;
      } else {
        const ariaSplitted = key.split('aria');
        setAttribute(self, ariaSplitted.map(x => x.toLowerCase()).join('-'), value);
      }
    });
  }
  return <Fragment children={children} />;
};