/**
 * @param {string | null} [value]
 * @returns {*}
 */
export function getAttributeValue(value) {
  switch (true) {
    case value === "" || value === "true": {
      return true;
    }
    case value === null || value === undefined: {
      return false;
    }
    default: {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  }
}
