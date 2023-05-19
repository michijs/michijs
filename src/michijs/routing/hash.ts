import { goTo } from "./goTo";

export const hash = new Proxy(
  {},
  {
    get(_target, key) {
      if (typeof key === "string") {
        return location.hash === key;
      }
      return () => false;
    },
    set(_target, key: string, newValue) {
      const oldValue = location.hash === key;
      if (oldValue !== newValue) {
        let newHash = "";
        if (newValue) {
          newHash = key;
        }
        const newUrl = new URL(location.href);
        newUrl.hash = newHash;
        goTo(newUrl);
        return true;
      }
      return true;
    },
  },
);
