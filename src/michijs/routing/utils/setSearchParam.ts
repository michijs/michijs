import { isNil } from "../../../shared/utils/isNil";

export const setSearchParam = (
  url: URL,
  name: string,
  value: unknown,
): void => {
  const valueOfResult = value?.valueOf();
  if (isNil(valueOfResult)) url.searchParams.delete(name);
  else
    url.searchParams.set(
      name,
      typeof valueOfResult === "object"
        ? JSON.stringify(valueOfResult)
        : (valueOfResult as string),
    );
};
