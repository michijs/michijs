export const setSearchParam = (url: URL, name: string, value: unknown) => {
  if (value !== undefined)
    url.searchParams.set(
      name,
      typeof value === 'object' ? JSON.stringify(value) : (value as string),
    );
};
