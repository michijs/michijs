import type { CSSObject } from "../types";

interface Transition {
  property: string[];
  duration?: string;
  timingFunction?: string;
  delay?: string;
  disablePrefersReducedMotion?: boolean;
}

export const useTransition = ({
  property,
  duration = "",
  timingFunction = "",
  delay = "",
  disablePrefersReducedMotion,
}: Transition) => {
  const properties = property.join(", ");
  const result: CSSObject = {
    willChange: properties,
    transitionProperty: properties,
    transitionDuration: duration,
    transitionTimingFunction: timingFunction,
    transitionDelay: delay,
    transitionBehavior: "allow-discrete",
  };

  return disablePrefersReducedMotion
    ? result
    : { "@media (prefers-reduced-motion: no-preference)": result };
};
