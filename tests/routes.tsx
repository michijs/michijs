import { createRouter, wait, Redirect, AsyncComponent } from "@michijs/michijs";
import { Main } from "./pages/Main";

export const [urls, Router] = createRouter({
  performanceTests: (
    <AsyncComponent promise={() => import("./pages/PerformanceTests")} />
  ),
  asyncTests: <AsyncComponent promise={() => import("./pages/AsyncTests")} />,
  searchParamsAndHash: (
    <AsyncComponent promise={() => import("./pages/SearchParamsAndHash")} />
  ),
  counterTests: (
    <AsyncComponent promise={() => import("./pages/CounterTests")} />
  ),
  i18nTests: <AsyncComponent promise={() => import("./pages/I18nTests")} />,
  a11yTests: <AsyncComponent promise={() => import("./pages/A11YTests")} />,
  "/": <Main />,
});

export const [asyncTestsUrls, AsyncTestsRouter] = createRouter(
  {
    test1: (
      <AsyncComponent
        promise={async () => {
          await wait(5000);
          const importResult = await import("./SimpleCounter");
          return importResult.SimpleCounter;
        }}
        loadingComponent={<h1>loading...</h1>}
      />
    ),
    test2: (
      <AsyncComponent
        promise={async () => (await import("./SimpleCounter")).SimpleCounter}
      />
    ),
    test3: (
      <AsyncComponent
        promise={async () => {
          wait(3000);
          return 1;
        }}
        then={res => res * 2}
      />
    ),
    test4: <Redirect to={urls["/"]()} />,
  },
  urls.asyncTests,
);
