import { IdGenerator } from "../classes/IdGenerator";
import type { CSSObject } from "../types";
import type { CSSProperties } from "../generated/htmlType";

type TransitionKeyframes =
  | ({
      [k in keyof Omit<CSSProperties, "offset">]?: CSSProperties[k][];
    } & { offset?: number[] })
  | (Omit<CSSProperties, "offset"> & { offset?: number })[];

const idGenerator = new IdGenerator();

// const test1: TransitionKeyframes = [{ opacity: 1 }, { opacity: 0.1, offset: .7 }, { opacity: 0 }]
// const test2: TransitionKeyframes = { opacity: [1, 0.1, 0], offset: [0, .7] }

const getOffset = (i: number, length: number, offset?: number) =>
  `${(
    (offset ?? (i === 0 ? 0 : i === length - 1 ? 1 : i / length - 1)) * 100
  ).toFixed(2)}%`;

export const useAnimation = (
  keyframes: TransitionKeyframes,
  options: Pick<
    KeyframeAnimationOptions,
    "id" | "delay" | "direction" | "duration" | "easing" | "fill"
  > & {
    disablePrefersReducedMotion?: boolean;
    iterations?: "infinite" | number;
  },
): [CSSObject, CSSObject] => {
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
    Object.entries(keyframesWithoutOffset).forEach(([key, value]) => {
      value?.forEach((x, i) => {
        const index = getOffset(i, value.length, offset?.[i]);
        keyframesCssObject[index] = {
          ...(keyframesCssObject[index] ?? {}),
          [key]: x,
        };
      });
    });
  }

  const result = Object.entries({
    willChange: properties.filter((x) => x !== "offset").join(","),
    animationName: keyframeId,
    animationDelay: options.delay ? `${options.delay}ms` : options.delay,
    animationDirection: options.direction,
    animationDuration: options.duration?.toString(),
    animationTimingFunction: options.easing,
    animationFillMode: options.fill,
    animationIterationCount: options.iterations,
    ...keyframesCssObject["100.00%"],
  }).reduce((previousValue, [key, value]) => {
    if (value !== undefined) previousValue[key] = value;

    return previousValue;
  }, {});

  return [
    {
      [`@keyframes ${keyframeId}`]: keyframesCssObject,
    },
    options.disablePrefersReducedMotion
      ? result
      : {
          "@media (prefers-reduced-motion: no-preference)": result,
        },
  ];
};
