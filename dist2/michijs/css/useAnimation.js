import { IdGenerator } from "../classes/IdGenerator";
import { formatToKebabCase, removeNullableFromObject } from "../utils";

/**
 * @typedef {import('../types').CSSObject} CSSObject
 */

/**
 * @typedef {import('../generated/htmlType').CSSProperties} CSSProperties
 */



/**
 * Represents keyframes for CSS animations.
 * @typedef {| ({ [k in keyof Omit<CSSProperties, "offset">]?: CSSProperties[k][]; } & { offset?: number[] }) | (Omit<CSSProperties, "offset"> & { offset?: number })[]} TransitionKeyframes
 */

const idGenerator = new IdGenerator();

// const test1: TransitionKeyframes = [{ opacity: 1 }, { opacity: 0.1, offset: .7 }, { opacity: 0 }]
// const test2: TransitionKeyframes = { opacity: [1, 0.1, 0], offset: [0, .7] }

/**
 * @param {number} i
 * @param {number} length
 * @param {number} [offset]
 * @returns {string}
 */
const getOffset = (i, length, offset) => `${((offset ?? (i === 0 ? 0 : i === length - 1 ? 1 : i / length - 1)) * 100).toFixed(2)}%`;
/**
 * Generates CSS keyframes and animation properties based on the provided keyframes and options.
 * @param {TransitionKeyframes} keyframes - The keyframes for the animation.
 * @param {Pick< KeyframeAnimationOptions, "id" | "delay" | "direction" | "duration" | "easing" | "fill" > & { iterations?: "infinite" | number; }} options - Options for the animation.
 * @returns {[CSSObject, CSSObject]} An array containing CSS keyframes and animation properties.
 */
export const useAnimation = (keyframes, options) => {
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
    }
    else {
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
            "@media (prefers-reduced-motion: no-preference)": removeNullableFromObject({
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
