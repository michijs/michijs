export const setSearchParam = (url: URL, name: string, value: unknown) => {
  const valueOf = value?.valueOf()
  if (valueOf !== undefined)
    url.searchParams.set(
      name,
      typeof valueOf === "object" ? JSON.stringify(valueOf) : valueOf as string,
    );
};
