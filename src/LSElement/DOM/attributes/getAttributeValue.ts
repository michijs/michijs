export function getAttributeValue(value) {
  try {
    return JSON.parse(value);
  } catch {
    switch (true) {
      case value === '' || value === 'true': {
        return true;
      }
      case value === null: {
        return false;
      }
      default: {
        return value;
      }
    }
  }
}
