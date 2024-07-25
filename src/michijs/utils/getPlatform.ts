import type { Platform } from "../types";

export const getPlatform = (): Platform => {
  const { userAgent } = navigator;
  return /iPad|iPhone|iPod/.test(userAgent)
    ? "ios"
    : /android/i.test(userAgent)
      ? "android"
      : /Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(userAgent)
        ? "macos"
        : /CrOS/gi.test(userAgent)
          ? "chromeos"
          : /Win32|Win64|Windows|Windows NT|WinCE/gi.test(userAgent)
            ? "windows"
            : "unknown";
};
