import type { AllAttributes } from "../generated/htmlType";
import { setAttribute } from "../DOM/attributes/setAttribute";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import { useComputedObserve } from "../hooks/useComputedObserve";
import type { FC, ObservableOrConst } from "../types";
import { getObservables } from "../utils/getObservables";
import { unproxify } from "../utils/unproxify";
import { GarbageCollectableObject } from "../classes/GarbageCollectableObject";
import { bindObservable } from "../utils/bindObservable";

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
  { contextElement: self },
) => {
  if (self && isMichiCustomElement(self) && self.$michi.internals) {
    const gc = new GarbageCollectableObject(self);
    if (errorMessage) {
      const errorObservable = useComputedObserve(
        () => ({
          errorMessage,
          validityStateFlags,
        }),
        getObservables([validityStateFlags, errorMessage]),
      );

      bindObservable(errorObservable, (newValue) => {
        const error = unproxify(newValue.errorMessage);
        gc.ref.$michi.internals!.setValidity(
          error ? unproxify(validityStateFlags) : undefined,
          error,
        );
      });
    }

    if (formValue)
      bindObservable(formValue, (newValue) => {
        gc.ref.$michi.internals!.setFormValue(newValue);
      });
    Object.entries({ tabIndex, ...aria }).forEach(([key, value]) => {
      if (gc.ref.$michi.internals)
        if (key in gc.ref.$michi.internals)
          bindObservable(value, (newValue) => {
            gc.ref.$michi.internals![key] = newValue;
          });
        else if (key in gc.ref)
          bindObservable(value, (newValue) => (gc.ref[key] = newValue));
        // Some browsers still dont support internals
        else {
          const formattedKey = key.toLowerCase().replace("aria", "aria-");
          bindObservable(value, (newValue) =>
            setAttribute(gc.ref, formattedKey, newValue),
          );
        }
    });
  }
  return children;
};
