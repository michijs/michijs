interface RemoveNullableFromObject {
  <T extends Record<string, unknown>>(obj: T): NonNullable<T>;
}

export const removeNullableFromObject: RemoveNullableFromObject = (obj) =>
  Object.entries(obj).reduce((previousValue, [key, value]) => {
    if (value !== undefined) previousValue[key] = value;

    return previousValue;
  }, {}) as NonNullable<typeof obj>;
