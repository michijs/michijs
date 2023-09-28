import type { AllAttributes } from "@michijs/htmltype";
import type { FC } from "../types";
import { setAttribute } from "../DOM/attributes/setAttribute";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import { bindObservable } from "../utils";

export type ElementInternalsProps = {
  /**Form controls usually expose a "value" property */
  formValue?: Parameters<ElementInternals["setFormValue"]>[0];
  /**A validation message to show */
  errorMessage?: Parameters<ElementInternals["setValidity"]>[1];
  validityStateFlags?: ValidityStateFlags;
  tabIndex?: number;
  children?: JSX.Element;
  role?: AllAttributes["role"];
} & Partial<ARIAMixin>;

/**
 * It allows to:
 * - Make the element accessible to the browser
 * - Access element internals
 * - Validate and assign values to forms
 */
export const ElementInternals: FC<ElementInternalsProps> = (
  {
    children,
    errorMessage,
    formValue,
    tabIndex = 0,
    validityStateFlags = { customError: true },
    ...aria
  },
  options,
) => {
  const self = options?.contextElement;
  if (self && isMichiCustomElement(self) && self.$michi.internals) {
    if (errorMessage)
      bindObservable(errorMessage, (newValue) => {
        if (newValue)
          self.$michi.internals!.setValidity?.(validityStateFlags, newValue);
        else self.$michi.internals!.setValidity?.({});
      });

    if (formValue)
      bindObservable(formValue, (newValue) => {
        self.$michi.internals!.setFormValue?.(
          newValue as Parameters<ElementInternals["setFormValue"]>[0],
        );
      });

    Object.entries({ tabIndex, ...aria }).forEach(([key, value]) => {
      if (self.$michi.internals)
        if (key in self.$michi.internals)
          bindObservable(
            value,
            (newValue) => (self.$michi.internals![key] = newValue),
          );
        else if (key in self)
          bindObservable(value, (newValue) => (self[key] = newValue));
        // Some browsers still dont support internals
        else {
          const formattedKey = key
            .toLowerCase().replace('aria', 'aria-');
          bindObservable(value, (newValue) =>
            setAttribute(self, formattedKey, newValue),
          );
        }
    });
  }
  return children;
};
