export function hasToJSON<T extends {}>(el: T): el is T & { toJSON(): any } {
  return (el as any).toJSON;
}
