import type { CSSObject } from "../types";
import { removeNullableFromObject } from "../utils/removeNullableFromObject";

/**
 * Represents transition properties for CSS animations.
 */
interface Transition {
  /**
   * The CSS properties to apply the transition to.
   */
  property: string[];
  /**
   * The duration of the transition.
   */
  duration?: string;
  /**
   * The timing function for the transition.
   */
  timingFunction?: string;
  /**
   * The delay before the transition starts.
   */
  delay?: string;
}

/**
 * Hook to generate CSS transition properties based on the provided configuration.
 * @param transition - The configuration for the CSS transition.
 * @returns The CSS properties for the transition.
 */
export const useTransition = ({
  property,
  duration,
  timingFunction,
  delay,
}: Transition): CSSObject => {
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
