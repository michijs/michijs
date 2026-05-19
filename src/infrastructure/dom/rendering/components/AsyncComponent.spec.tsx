import { create } from "../create";
import { useObserve } from "#domain";
import { AsyncComponent } from "./AsyncComponent";
import { describe, it, expect } from "bun:test";
import { wait } from "#shared";

describe("AsyncComponent", () => {
  describe("When the promise resolves", () => {
    it("should render the resolved component", async () => {
      const promise = Promise.resolve(<span>Resolved</span>);
      const el = create(
        <AsyncComponent as="div" promise={promise} />,
      ) as ParentNode;

      await promise;
      await wait(0);
      expect(el.textContent).toBe("Resolved");
    });

    it("should render the loading component before resolving", async () => {
      let resolveFn!: (v: JSX.Element) => void;
      const promise = new Promise<JSX.Element>((res) => {
        resolveFn = res;
      });
      const el = create(
        <AsyncComponent
          as="div"
          promise={promise}
          loadingComponent={<span>Loading</span>}
        />,
      ) as ParentNode;

      expect(el.textContent).toBe("Loading");

      resolveFn(<span>Done</span>);
      await promise;
      await wait(0);
      expect(el.textContent).toBe("Done");
    });

    it("should use the `default` export when present", async () => {
      const promise = Promise.resolve({ default: <span>Default</span> });
      const el = create(
        <AsyncComponent as="div" promise={promise} />,
      ) as ParentNode;

      await promise;
      await wait(0);
      expect(el.textContent).toBe("Default");
    });

    it("should apply the `then` transformation to the resolved value", async () => {
      const promise = Promise.resolve("world");
      const el = create(
        <AsyncComponent
          as="div"
          promise={promise}
          then={(value) => <span>hello {value}</span>}
        />,
      ) as ParentNode;

      await promise;
      await wait(0);
      expect(el.textContent).toBe("hello world");
    });

    it("should accept a thunk returning a promise", async () => {
      const factory = () => Promise.resolve(<span>FromThunk</span>);
      const el = create(
        <AsyncComponent as="div" promise={factory} />,
      ) as ParentNode;

      await factory();
      await wait(0);
      expect(el.textContent).toBe("FromThunk");
    });

    it("should react when the promise observable changes", async () => {
      const first = Promise.resolve(<span>First</span>);
      const observable = useObserve<Promise<JSX.Element>>(first);
      const el = create(
        <AsyncComponent as="div" promise={observable} />,
      ) as ParentNode;

      await first;
      await wait(0);
      expect(el.textContent).toBe("First");

      const second = Promise.resolve(<span>Second</span>);
      observable(second);
      await second;
      await wait(0);
      expect(el.textContent).toBe("Second");
    });
  });

  describe("When the promise rejects", () => {
    it("should render only the `catch` component", async () => {
      const promise = Promise.reject(new Error("boom"));
      const el = create(
        <AsyncComponent
          as="div"
          promise={promise}
          catch={(e) => <span>error: {(e as Error).message}</span>}
        />,
      ) as ParentNode;

      await promise.catch(() => {});
      await wait(0);
      expect(el.textContent).toBe("error: boom");
    });

    it("should NOT apply the `then` transformation to the error component", async () => {
      const promise = Promise.reject(new Error("fail"));
      const el = create(
        <AsyncComponent
          as="div"
          promise={promise}
          then={(value) => <span>then:{String(value)}</span>}
          catch={() => <span>only-catch</span>}
        />,
      ) as ParentNode;

      await promise.catch(() => {});
      await wait(0);
      expect(el.textContent).toBe("only-catch");
      expect(el.textContent).not.toContain("then:");
    });
  });
});
