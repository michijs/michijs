import type { AllAttributes } from "../generated/htmlType";
import { setAttribute } from "../DOM/attributes/setAttribute";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import { bindObservableToRef, getObservables, unproxify } from "../utils";
import { createFunctionalComponent } from "../customElements/createFunctionalComponent";
import { useComputedObserve } from "../hooks";
import type { CreateFunctionalComponent } from "../types";

export interface ElementInternalsProps
  extends Omit<Partial<ARIAMixin>, "role"> {
  /**
   * Form controls usually expose a "value" property
   */
  formValue?: Parameters<ElementInternals["setFormValue"]>[0];
  /**
   * A validation message to show
   */
  errorMessage?: Parameters<ElementInternals["setValidity"]>[1];
  validityStateFlags?: ValidityStateFlags;
  tabIndex?: number;
  role?: AllAttributes["role"];
  children?: JSX.Element;
}

/**
 * It allows to:
 * - Make the element accessible to the browser
 * - Access element internals
 * - Validate and assign values to forms
 */
export const ElementInternals: CreateFunctionalComponent<ElementInternalsProps> =
  createFunctionalComponent<ElementInternalsProps>(
    (
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
        if (errorMessage) {
          const errorObservable = useComputedObserve(
            () => ({
              errorMessage,
              validityStateFlags,
            }),
            getObservables([validityStateFlags, errorMessage]),
          );

          bindObservableToRef(errorObservable, self, (newValue, self) => {
            self.$michi.internals!.setValidity(
              // @ts-ignore
              unproxify(validityStateFlags),
              unproxify(newValue.errorMessage),
            );
          });
        }
        if (formValue)
          bindObservableToRef(formValue, self, (newValue, self) => {
            self?.$michi.internals!.setFormValue(
              newValue as Parameters<ElementInternals["setFormValue"]>[0],
            );
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
    },
  );
