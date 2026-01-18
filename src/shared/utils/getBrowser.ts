import type { Browser } from "../../michijs/types";

export const getBrowser = (): Browser => {
  const { userAgent } = navigator;

  return userAgent.match(/edg/i)
    ? "edge"
    : userAgent.match(/chrome|chromium|crios/i)
      ? "chrome"
      : userAgent.match(/firefox|fxios/i)
        ? "firefox"
        : userAgent.match(/safari/i)
          ? "safari"
          : userAgent.match(/opr\//i)
            ? "opera"
            : userAgent.match(/android/i)
              ? "android"
              : userAgent.match(/iphone/i)
                ? "iphone"
                : // Playwright
                  userAgent.match(/AppleWebKit/i)
                  ? "safari"
                  : "unknown";
};
