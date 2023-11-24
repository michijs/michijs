export function cloneDate<T extends Date>(date: T): T {
  try {
    return structuredClone(date);
  } catch {
    return new Date(date) as T;
  }
}