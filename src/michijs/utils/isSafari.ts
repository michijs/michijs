// @ts-ignore
export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  ((p) => p.toString() === "[object SafariRemoteNotification]")(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification),
  );
