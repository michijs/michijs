/**
 * @template {Date} T
 * @param {T} date
 * @returns {T}
 */
export function cloneDate(date) {
  try {
    return structuredClone(date);
  } catch {
    return new Date(date);
  }
}
