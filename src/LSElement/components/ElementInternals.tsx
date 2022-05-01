import type { Attributes } from '@lsegurado/htmltype';
import type { FC } from '../types';
import { h } from '../h';
import { Fragment } from '.';
import { setAttribute } from '../DOM/attributes/setAttribute';
import { GetRoles } from '@lsegurado/htmltype/dist/Attributes';

export type ElementInternalsProps = {
    /**Form controls usually expose a "value" property */
    formValue?: FormValue;
    /**A validation message to show */
    errorMessage?: string | null;
    /** */
    tabIndex?: number
} & Partial<ARIAMixin> & Partial<GetRoles<Attributes.AllRoles>>

/**
 * It allows to:
 * - Make the element accessible to the browser
 * - Access element internals 
 * - Validate and assign values to forms
 */
export const ElementInternals: FC<ElementInternalsProps> = ({ children, errorMessage, formValue, tabIndex = 0, ...aria }, self) => {
  if (self && self.ls.internals) {
    if (errorMessage)
      self.ls.internals.setValidity?.({ customError: true }, errorMessage);
    else
      self.ls.internals.setValidity?.({});
    self.ls.internals.setFormValue?.(formValue);

    Object.entries({ tabIndex, ...aria }).forEach(([key, value]) => {
      if (key in self.ls.internals) {
        if (value !== self.ls.internals[key])
          self.ls.internals[key] = value;
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