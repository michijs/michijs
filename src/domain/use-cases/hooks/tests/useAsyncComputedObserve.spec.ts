import { useObserve } from "../useObserve";
import { useAsyncComputedObserve } from "../useAsyncComputedObserve";
import { describe, it, expect } from "bun:test";

const tick = () => new Promise((r) => setTimeout(r, 10));

describe("useAsyncComputedObserve — explicit deps", () => {
  it("should resolve async callback and update observable", async () => {
    const count = useObserve(2);
    const doubled = useAsyncComputedObserve(async () => count() * 2, 0, {
      deps: [count],
    });
    await tick();
    expect(doubled()).toBe(4);
  });

  it("should recompute when a dependency changes", async () => {
    const count = useObserve(1);
    const doubled = useAsyncComputedObserve(async () => count() * 2, 0, {
      deps: [count],
    });
    await tick();
    expect(doubled()).toBe(2);
    count(5);
    await tick();
    expect(doubled()).toBe(10);
  });
});

describe("useAsyncComputedObserve — auto-tracking", () => {
  it("should detect dependencies automatically", async () => {
    const count = useObserve(0);
    const computed = useAsyncComputedObserve(async () => `${count}px`, "init");
    expect(computed()).toBe("init");
    await tick();
    expect(computed()).toBe("0px");
    count(5);
    await tick();
    expect(computed()).toBe("5px");
  });

  it("should track multiple dependencies", async () => {
    const a = useObserve(1);
    const b = useObserve(2);
    const sum = useAsyncComputedObserve(async () => a() + b(), 0);
    await tick();
    expect(sum()).toBe(3);
    a(10);
    await tick();
    expect(sum()).toBe(12);
  });

  it("should handle dependency switching", async () => {
    const flag = useObserve(true);
    const a = useObserve("A");
    const c = useObserve("C");
    const result = useAsyncComputedObserve(
      async () => (flag() ? a() : c()),
      "",
    );
    await tick();
    expect(result()).toBe("A");

    flag(false);
    await tick();
    expect(result()).toBe("C");

    c("C2");
    await tick();
    expect(result()).toBe("C2");

    // a no longer tracked
    a("A2");
    await tick();
    expect(result()).toBe("C2");
  });

  it("should abort previous invocation when deps change", async () => {
    const count = useObserve(0);
    const aborted: boolean[] = [];
    const result = useAsyncComputedObserve(
      async (signal) => {
        const val = count();
        await new Promise((r) => setTimeout(r, 50));
        aborted.push(signal.aborted);
        return val;
      },
      -1,
      { deps: [count] },
    );
    // Trigger rapid updates — only last should resolve without abort
    count(1);
    count(2);
    count(3);
    await new Promise((r) => setTimeout(r, 200));
    expect(result()).toBe(3);
    expect(aborted.filter(Boolean).length).toBeGreaterThan(0);
  });

  it("should pass options without deps", async () => {
    let beforeCalled = 0;
    let afterCalled = 0;
    const count = useObserve(0);
    const computed = useAsyncComputedObserve(async () => count() + 1, 0, {
      onBeforeUpdate: () => beforeCalled++,
      onAfterUpdate: () => afterCalled++,
    });
    await tick();
    expect(computed()).toBe(1);
    count(5);
    await tick();
    expect(computed()).toBe(6);
    expect(beforeCalled).toBeGreaterThanOrEqual(1);
    expect(afterCalled).toBeGreaterThanOrEqual(1);
  });
});
