import { goTo } from './goTo';

export const hash = new Proxy(
  {},
  {
    get(_target, key: string) {
      return location.hash === key;
    },
    set(_target, key: string, newValue) {
      const oldValue = location.hash === key;
      if (oldValue !== newValue) {
        let newHash = '';
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
