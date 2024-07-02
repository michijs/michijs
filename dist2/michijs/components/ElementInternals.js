import { setAttribute } from "../DOM/attributes/setAttribute";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import { bindObservableToRef, getObservables, unproxify } from "../utils";
import { createFunctionalComponent } from "../customElements/createFunctionalComponent";
import { useComputedObserve } from "../hooks";
/**
 * @typedef {import('../generated/htmlType').AllAttributes} AllAttributes
 */

/**
 * @typedef {import('../types').CreateFunctionalComponent} CreateFunctionalComponent
 */

/**
 * @typedef {object} ElementInternalsProps
 * @property {Parameters<ElementInternals["setFormValue"]>[0]} [formValue] Form controls usually expose a "value" property
 * @property {Parameters<ElementInternals["setValidity"]>[1]} [errorMessage] A validation message to show
 * @property {ValidityStateFlags} [validityStateFlags]
 * @property {number} [tabIndex]
 * @property {AllAttributes["role"]} [role]
 * @property {JSX.Element} [children]
 */

/**
 * It allows to:
 * - Make the element accessible to the browser
 * - Access element internals
 * - Validate and assign values to forms
 * @type {CreateFunctionalComponent<ElementInternalsProps>}
 */
export const ElementInternals = createFunctionalComponent(
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
          self.$michi.internals.setValidity(
            // @ts-ignore
            unproxify(validityStateFlags),
            unproxify(newValue.errorMessage),
          );
        });
      }
      if (formValue)
        bindObservableToRef(formValue, self, (newValue, self) => {
          self?.$michi.internals.setFormValue(newValue);
        });

      Object.entries({ tabIndex, ...aria }).forEach(([key, value]) => {
        if (self.$michi.internals)
          if (key in self.$michi.internals)
            bindObservableToRef(
              value,
              self,
              (newValue, self) => (self.$michi.internals[key] = newValue),
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
