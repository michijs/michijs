import { AllAttributes } from "./AllAttributes";
import { GlobalAttributes } from "./GlobalAttributes";
import { AllRoles } from "./Roles";
import { Type } from "./types";

export type GetRoles<T extends AllRoles = AllRoles> = {
    /**
    * Authors must assign an ARIA role and the appropriate states and properties to an element during its life-cycle, unless the element already has appropriate ARIA semantics.
    * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques
    */
    role: Extract<AllRoles, T>;
};

export type GetAttributes<T extends keyof AllAttributes> = Pick<AllAttributes, T>;

export type GetType<T extends keyof Type, E extends Type[T] = Type[T]> = {
    /**
     * The type attribute specifies the type of the element.
     */
    type: Extract<Type[T], E>
}

export type GetValue<T = string> = {
    /**
     * The value attribute specifies the initial value of the element.
     */
    value: T
}

export type GetMinAndMax<T = string> = {
    /**
     * Specifies the maximum value
     */
    max: T;
    /**
     * Specifies a minimum value
     */
    min: T;
}
