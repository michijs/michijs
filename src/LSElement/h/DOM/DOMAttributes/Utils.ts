import { AllAttributes } from './AllAttributes';
import { AllRoles } from './Roles';
import { Length, Type } from './types';

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

export type GetValues<T = string> = {
    /**
     * The values attribute has different meanings, depending upon the context where it's used, either it defines a sequence of values used over the course of an animation, or it's a list of numbers for a color matrix, which is interpreted differently depending on the type of color change to be performed.
     */
    values: T
}

export type GetMax<T = string> = {
    /**
    * Specifies the maximum value
    */
    max: T;
}
export type GetMinAndMax<T = string> = {

    /**
     * Specifies a minimum value
     */
    min: T;
} & GetMax<T>;
export type GetDxAndDy<T = number> = {
    /**
     * The dx attribute indicates a shift along the x-axis on the position of an element or its content.
     */
    dx: T;
    /**
     * The dy attribute indicates a shift along the y-axis on the position of an element or its content.
     */
    dy: T;
};
export type GetXY<T = Length> = {
    /**
     * The x attribute defines a x-axis coordinate in the user coordinate system.
     */
    x: T;
    /**
     * The y attribute defines a y-axis coordinate in the user coordinate system.
     */
    y: T;
};
export type GetXYZ<T = number> = {
    /**
     * The z attribute defines the location along the z-axis for a light source in the coordinate system established by the primitiveUnits attribute on the `<filter>` element, assuming that, in the initial coordinate system, the positive z-axis comes out towards the person viewing the content and assuming that one unit along the z-axis equals one unit in x and y.
     */
    z: T;
} & GetXY<T>;