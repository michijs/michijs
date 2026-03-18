import type { UseTransition } from "../types";
import { removeNullableFromObject } from "../../shared/utils/removeNullableFromObject";

/**
 * Hook to generate CSS transition properties based on the provided configuration.
 * @param transition - The configuration for the CSS transition.
 * @returns The CSS properties for the transition.
 */
export const useTransition: UseTransition = ({
  property,
  duration,
  timingFunction,
  delay,
}) => {
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
