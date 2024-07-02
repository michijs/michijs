/**
 * @typedef {import('../types').Browser} Browser
 */

/**
 * @returns {Browser}
 */
export const getBrowser = () => {
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
                : "unknown";
};
