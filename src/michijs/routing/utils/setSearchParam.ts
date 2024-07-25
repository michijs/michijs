import { isNil } from "../../utils/isNil";

export const setSearchParam = (
  url: URL,
  name: string,
  value: unknown,
): void => {
  const valueOf = value?.valueOf();
  if (isNil(valueOf)) url.searchParams.delete(name);
  else
    url.searchParams.set(
      name,
      typeof valueOf === "object"
        ? JSON.stringify(valueOf)
        : (valueOf as string),
    );
};
