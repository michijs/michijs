/**
 * @typedef {import('../types').PrimitiveType} PrimitiveType
 */

/**
 * @param {PrimitiveType | { }} jsx
 * @returns {Text}
 */
export const createTextElement = (jsx) => document.createTextNode((typeof jsx === "object" ? JSON.stringify(jsx) : jsx?.toString()) ?? "");
