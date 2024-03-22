import type { ObserveHandlerProps } from "../observe";

export const customMapAndSetClear = (
  {
    onChange,
    propertyPath,
  }: Pick<ObserveHandlerProps, "onChange" | "propertyPath">,
  target: Map<any, any> | Set<any>,
  clearFn: Map<any, any>["clear"] | Set<any>["clear"],
): Map<any, any>["clear"] | Set<any>["clear"] => {
  return () => {
    const notifyChange = target.size !== 0;
    const result = clearFn();
    if (notifyChange) onChange(propertyPath); //TODO: Should send each index?
    return result;
  };
};

export const customMapAndSetDelete = (
  { propertyPath, onChange, shouldValidatePropertyChange }: ObserveHandlerProps,
  target: Map<any, any> | Set<any>,
  deleteFn: Map<any, any>["delete"] | Set<any>["delete"],
): Map<any, any>["delete"] | Set<any>["delete"] => {
  //In Map is key, in Set is value
  return (key) => {
    const newPropertyPath = `${propertyPath}.${key}`;
    const notifyChange =
      shouldValidatePropertyChange(newPropertyPath) && target.has(key);
    const result = deleteFn(key);
    if (notifyChange) onChange(newPropertyPath); //TODO: ?
    return result;
  };
};
