import { IdGenerator } from "../classes/IdGenerator";
import type { CSSObject, UseAnimation } from "../types";
import { formatToKebabCase } from "../utils/formatToKebabCase";
import { removeNullableFromObject } from "../utils/removeNullableFromObject";

const idGenerator = new IdGenerator();

// const test1: TransitionKeyframes = [{ opacity: 1 }, { opacity: 0.1, offset: .7 }, { opacity: 0 }]
// const test2: TransitionKeyframes = { opacity: [1, 0.1, 0], offset: [0, .7] }

const getOffset = (i: number, length: number, offset?: number) =>
  `${((offset ?? (i === 0 ? 0 : i === length - 1 ? 1 : i / length - 1)) * 100).toFixed(2)}%`;
/**
 * Generates CSS keyframes and animation properties based on the provided keyframes and options.
 * @param keyframes - The keyframes for the animation.
 * @param options - Options for the animation.
 * @returns An array containing CSS keyframes and animation properties.
 */
export const useAnimation: UseAnimation = (
  keyframes,
  options,
) => {
  const keyframeId = options.id ?? `keyframe-${idGenerator.generateId(1)}`;
  const keyframesIsArray = Array.isArray(keyframes);
  const properties = keyframesIsArray
    ? Array.from(new Set(keyframes.flatMap((x) => Object.keys(x))))
    : Object.keys(keyframes);
  const keyframesCssObject = {};

  if (keyframesIsArray) {
    keyframes.forEach((x, i) => {
      const { offset, ...xWithoutOffset } = x;
      const index = getOffset(i, keyframes.length, offset);

      keyframesCssObject[index] = {
        ...(keyframesCssObject[index] ?? {}),
        ...xWithoutOffset,
      };
    });
  } else {
    const { offset, ...keyframesWithoutOffset } = keyframes;

    for (const [key, value] of Object.entries(keyframesWithoutOffset)) {
      value?.forEach((x, i) => {
        const index = getOffset(i, value.length, offset?.[i]);
        keyframesCssObject[index] = {
          ...keyframesCssObject[index],
          [key]: x,
        };
      });
    }
  }

  return [
    {
      [`@keyframes ${keyframeId}`]: keyframesCssObject,
    },
    {
      ...keyframesCssObject["100.00%"],
      willChange: properties
        .filter((x) => x !== "offset")
        .map((x) => formatToKebabCase(x))
        .join(","),
      "@media (prefers-reduced-motion: no-preference)":
        removeNullableFromObject({
          animationName: keyframeId,
          animationDelay: options.delay ? `${options.delay}ms` : options.delay,
          animationDirection: options.direction,
          animationDuration: options.duration?.toString(),
          animationTimingFunction: options.easing,
          animationFillMode: options.fill,
          animationIterationCount: options.iterations,
        }),
    },
  ];
};
