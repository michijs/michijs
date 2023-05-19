import { h, createRouter, wait } from "../src";
import { Main } from "./pages/Main";

export const { urls, Router, pages } = createRouter({
  performanceTests: {
    promise: async () =>
      (await import("./pages/PerformanceTests")).PerformanceTests,
    title: "Performance tests Page",
  },
  asyncTests: {
    promise: async () => (await import("./pages/AsyncTests")).AsyncTests,
    title: "Async tests",
  },
  searchParamsAndHash: {
    searchParams: {
      counterParam: Number,
      textParam: String,
      complexObjectParam: Object,
    },
    hash: ["#hashTest"],
    promise: async () =>
      (await import("./pages/SearchParamsAndHash")).SearchParamsAndHash,
    title: "Search params and hash tests",
  },
  counterTests: {
    promise: async () => (await import("./pages/CounterTests")).CounterTests,
    title: "Counter tests Page",
  },
  i18nTests: {
    promise: async () => (await import("./pages/I18nTests")).I18nTests,
    title: "I18n tests Page",
  },
  a11yTests: {
    searchParams: { disableFieldset: Boolean },
    promise: async () => (await import("./pages/A11YTests")).A11yTests,
    title: "A11Y tests Page",
  },
  "/": {
    component: <Main />,
    title: "Main Page",
  },
});

export const { urls: asyncTestsUrls, Router: AsyncTestsRouter } = createRouter(
  {
    test1: {
      promise: async () => {
        await wait(5000);
        const importResult = await import("./SimpleCounter");
        return importResult.SimpleCounter;
      },
      loadingComponent: <h1>loading...</h1>,
    },
    test2: {
      promise: async () => (await import("./SimpleCounter")).SimpleCounter,
    },
    test3: {
      component: <div>test</div>,
    },
  },
  urls.asyncTests,
);
