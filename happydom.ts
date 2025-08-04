import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

// Temporary fix until happy-dom gets updated
// Add your globals
const globalAny = globalThis as any;

// Add your globals
globalAny.cookieStore = {
  getAll() {
    return [];
  },
  addEventListener() {},
};
