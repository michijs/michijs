import type { AllAttributes } from "../../jsx-runtime/generated/htmlType";
import { setAttribute } from "../../rendering/setAttribute";
import { isMichiCustomElement } from "../typewards/isMichiCustomElement";
import {
  useComputedObserve,
  getObservables,
  GarbageCollectableObject,
  type CallableReactiveOrConst,
  bindObservable,
  unproxify,
} from "#domain";

type ObservableAriaMixin = {
  [k in keyof Omit<ARIAMixin, "role">]?: CallableReactiveOrConst<ARIAMixin[k]>;
};

export interface ElementInternalsProps extends ObservableAriaMixin {
  /**
   * Form controls usually expose a "value" property
   */
  formValue?: CallableReactiveOrConst<
    Parameters<ElementInternals["setFormValue"]>[0]
  >;
  /**
   * A validation message to show
   */
  errorMessage?: CallableReactiveOrConst<
    Parameters<ElementInternals["setValidity"]>[1]
  >;
  validityStateFlags?: CallableReactiveOrConst<ValidityStateFlags>;
  tabIndex?: number;
  role?: CallableReactiveOrConst<AllAttributes["role"]>;
  children?: JSX.Element;
}

/**
 * It allows to:
 * - Make the element accessible to the browser
 * - Access element internals
 * - Validate and assign values to forms
 */
export const ElementInternals = (
  {
    children,
    errorMessage,
    formValue,
    tabIndex = 0,
    validityStateFlags = { customError: true },
    ...aria
  }: ElementInternalsProps,
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
        { deps: getObservables([validityStateFlags, errorMessage]) },
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
