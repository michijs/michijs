import { h, createRoute, registerRoutes, wait, createAsyncRoute } from 'src';
import { Main } from './pages/Main';

export const { urls, Router, components } = registerRoutes({
  performanceTests: createAsyncRoute()({
    promise: () => import('./pages/PerformanceTests'),
    key: 'PerformanceTests',
    title: 'Performance tests Page'
  }),
  asyncTests: createAsyncRoute()({
    promise: () => import('./pages/AsyncTests'),
    key: 'AsyncTests',
    title: 'Async tests'
  }),
  searchParamsAndHash: createAsyncRoute<{ counterParam: number, textParam: string, complexObjectParam: object }, '#hashTest' | ''>()({
    promise: () => import('./pages/SearchParamsAndHash'),
    key: 'SearchParamsAndHash',
    title: 'Search params and hash tests'
  }),
  counterTests: createAsyncRoute()({
    promise: () => import('./pages/CounterTests'),
    key: 'CounterTests',
    title: 'Counter tests Page'
  }),
  '/': createRoute({
    component: <Main />,
    title: 'Main Page',
  })
});
export const { urls: asyncTestsUrls, Router: AsyncTestsRouter } = registerRoutes({
  test1: createAsyncRoute()({
    promise: async () => {
      await wait(5000);
      return await import('./SimpleCounterTest');
    },
    key: 'SimpleCounter',
    loadingComponent: <h1 id="loading">loading...</h1>,
  }),
  test2: createAsyncRoute()({
    promise: () => import('./SimpleCounterTest'),
    key: 'SimpleCounter'
  }),
  test3: createRoute({
    component: <div id="test3">test</div>,
  }),
}, urls.asyncTests);