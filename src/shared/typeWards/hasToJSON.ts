export const hasToJSON = <T extends {}>(el: T): el is T & { toJSON(): any } =>
  (el as any).toJSON;
