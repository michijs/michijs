export function getAttributeValue(value: string) {
  switch (true) {
    case value === '' || value === 'true': {
      return true;
    }
    case value === null: {
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