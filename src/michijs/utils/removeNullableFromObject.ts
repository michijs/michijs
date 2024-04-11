export const removeNullableFromObject = (obj: Record<string, unknown>) =>
  Object.entries(obj).reduce((previousValue, [key, value]) => {
    if (value !== undefined) previousValue[key] = value;

    return previousValue;
  }, {});
