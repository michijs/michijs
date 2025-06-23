export function getAttributeValue(value?: string | null): any {
  if (value === "" || value === "true")
    return true;
  if (value === null || value === undefined)
    return false;

  try {
    return JSON.parse(value!);
  } catch {
    return value;
  }
}
