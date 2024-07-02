/**
 * @typedef {object} RemoveNullableFromObject
 */

/**
 * @returns {NonNullable<T>}
 */
export const removeNullableFromObject = (obj) =>
  Object.entries(obj).reduce((previousValue, [key, value]) => {
    if (value !== undefined) previousValue[key] = value;

    return previousValue;
  }, {});
