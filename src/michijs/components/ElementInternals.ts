import type { AllAttributes } from "../generated/htmlType";
import { setAttribute } from "../DOM/attributes/setAttribute";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import { useComputedObserve } from "../hooks/useComputedObserve";
import type { FC, ObservableOrConst } from "../types";
import { getObservables } from "../utils/getObservables";
import { bindObservableToRef } from "../utils/bindObservableToRef";
import { unproxify } from "../utils/unproxify";

type ObservableAriaMixin = {
  [k in keyof Omit<ARIAMixin, "role">]?: ObservableOrConst<ARIAMixin[k]>;
};

export interface ElementInternalsProps extends ObservableAriaMixin {
  /**
   * Form controls usually expose a "value" property
   */
  formValue?: ObservableOrConst<
    Parameters<ElementInternals["setFormValue"]>[0]
  >;
  /**
   * A validation message to show
   */
  errorMessage?: ObservableOrConst<
    Parameters<ElementInternals["setValidity"]>[1]
  >;
  validityStateFlags?: ObservableOrConst<ValidityStateFlags>;
  tabIndex?: number;
  role?: ObservableOrConst<AllAttributes["role"]>;
  children?: JSX.Element;
}

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
  self,
) => {
  if (self && isMichiCustomElement(self) && self.$michi.internals) {
    if (errorMessage) {
      const errorObservable = useComputedObserve(
        () => ({
          errorMessage,
          validityStateFlags,
        }),
        getObservables([validityStateFlags, errorMessage]),
      );

      bindObservableToRef(errorObservable, self, (newValue, self) => {
        const error = unproxify(newValue.errorMessage);
        self.$michi.internals!.setValidity(
          error ? unproxify(validityStateFlags) : undefined,
          error,
        );
      });
    }

    if (formValue)
      bindObservableToRef(formValue, self, (newValue, self) => {
        self?.$michi.internals!.setFormValue(newValue);
      });

    Object.entries({ tabIndex, ...aria }).forEach(([key, value]) => {
      if (self.$michi.internals)
        if (key in self.$michi.internals)
          bindObservableToRef(
            value,
            self,
            (newValue, self) => (self.$michi.internals![key] = newValue),
          );
        else if (key in self)
          bindObservableToRef(
            value,
            self,
            (newValue, self) => (self[key] = newValue),
          );
        // Some browsers still dont support internals
        else {
          const formattedKey = key.toLowerCase().replace("aria", "aria-");
          bindObservableToRef(value, self, (newValue, self) =>
            setAttribute(self, formattedKey, newValue),
          );
        }
    });
  }
  return children;
};
