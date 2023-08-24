import { h, createRouter, wait } from "../src";
import { AsyncComponent } from "../src/michijs/components/AsyncComponent";
import { Main } from "./pages/Main";

export const { urls, Router, pages } = createRouter({
  performanceTests: {
    component: <AsyncComponent promise={() => import("./pages/PerformanceTests")} />,
    title: "Performance tests Page",
  },
  asyncTests: {
    component: <AsyncComponent promise={() => import("./pages/AsyncTests")} />,
    title: "Async tests",
  },
  searchParamsAndHash: {
    searchParams: {
      counterParam: Number,
      textParam: String,
      complexObjectParam: Object,
    },
    hash: ["#hashTest"],
    component: <AsyncComponent promise={() => import("./pages/SearchParamsAndHash")} />,
    title: "Search params and hash tests",
  },
  counterTests: {
    component: <AsyncComponent promise={() => import("./pages/CounterTests")} />,
    title: "Counter tests Page",
  },
  i18nTests: {
    component: <AsyncComponent promise={() => import("./pages/I18nTests")} />,
    title: "I18n tests Page",
  },
  a11yTests: {
    searchParams: { disableFieldset: Boolean },
    component: <AsyncComponent promise={() => import("./pages/A11YTests")} />,
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
      component: (
        <AsyncComponent
          promise={async () => {
            await wait(5000);
            const importResult = await import("./SimpleCounter");
            return importResult.SimpleCounter;
          }}
          loadingComponent={<h1>loading...</h1>}
        />
      )
    },
    test2: {
      component: <AsyncComponent promise={async () => (await import("./SimpleCounter")).SimpleCounter} />,
    },
    test3: {
      component: <div>test</div>,
    },
  },
  urls.asyncTests,
);
