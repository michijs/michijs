/** Cookies read so far (shared by CookieStorage and the code that fills it at startup). */
export const mainCookieStorage = new Map<string, string | null>();

export const getCookieValue = (
  value: string | null | undefined,
): string | null => {
  try {
    return value ? decodeURIComponent(value) : null;
  } catch {
    return value ?? null;
  }
};
