import { removeNullableFromObject } from "../utils";

/**
 * @typedef {import('../types').CSSObject} CSSObject
 */

/**
 * Represents transition properties for CSS animations.
 * @typedef {object} Transition
 * @property {string[]} property The CSS properties to apply the transition to.
 * @property {string} [duration] The duration of the transition.
 * @property {string} [timingFunction] The timing function for the transition.
 * @property {string} [delay] The delay before the transition starts.
 */

/**
 * Hook to generate CSS transition properties based on the provided configuration.
 * @param {Transition}
 * @returns {CSSObject} The CSS properties for the transition.
 */
export const useTransition = ({ property, duration, timingFunction, delay, }) => {
    const properties = property.join(", ");
    return {
        willChange: properties,
        "@media (prefers-reduced-motion: no-preference)": removeNullableFromObject({
            transitionProperty: properties,
            transitionDuration: duration,
            transitionTimingFunction: timingFunction,
            transitionDelay: delay,
            transitionBehavior: "allow-discrete",
        }),
    };
};
