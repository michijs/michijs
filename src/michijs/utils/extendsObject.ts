import { isPrototypeOfObject } from "./isPrototypeOfObject"

// This operation is expensive and should be avoided
export const extendsObject = (obj: unknown): boolean => typeof obj === 'object' && isPrototypeOfObject(obj)