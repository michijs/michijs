import { useObserve } from "../useObserve";
import { useComputedObserve } from "../useComputedObserve";
import { describe, it, expect } from "bun:test";

describe("useComputedObserve — explicit deps", () => {
  it("should compute initial value from callback", () => {
    const count = useObserve(2);
    const doubled = useComputedObserve(() => count() * 2, { deps: [count] });
    expect(doubled()).toBe(4);
  });

  it("should recompute when a dependency changes", () => {
    const count = useObserve(1);
    const doubled = useComputedObserve(() => count() * 2, { deps: [count] });
    count(5);
    expect(doubled()).toBe(10);
  });

  it("should support multiple dependencies", () => {
    const a = useObserve(1);
    const b = useObserve(2);
    const sum = useComputedObserve(() => a() + b(), { deps: [a, b] });
    expect(sum()).toBe(3);
    a(10);
    expect(sum()).toBe(12);
    b(20);
    expect(sum()).toBe(30);
  });
});

describe("useComputedObserve — auto-tracking", () => {
  it("should detect dependencies automatically", () => {
    const count = useObserve(0);
    const computed = useComputedObserve(() => `${count}px`);
    expect(computed()).toBe("0px");
    count(5);
    expect(computed()).toBe("5px");
  });

  it("should track multiple dependencies", () => {
    const a = useObserve(1);
    const b = useObserve(2);
    const sum = useComputedObserve(() => a() + b());
    expect(sum()).toBe(3);
    a(10);
    expect(sum()).toBe(12);
    b(20);
    expect(sum()).toBe(30);
  });

  it("should handle dependency switching", () => {
    const flag = useObserve(true);
    const a = useObserve("A");
    const c = useObserve("C");
    const result = useComputedObserve(() => (flag() ? a() : c()));

    expect(result()).toBe("A");

    // Switch branch — should now track c, stop tracking a
    flag(false);
    expect(result()).toBe("C");

    c("C2");
    expect(result()).toBe("C2");

    // a is no longer a dependency — changing it should not recompute
    a("A2");
    expect(result()).toBe("C2");
  });

  it("should handle proxied observables via valueOf coercion", () => {
    const count = useObserve(3, true);
    const computed = useComputedObserve(() => count() * 2);
    expect(computed()).toBe(6);
    count(7);
    expect(computed()).toBe(14);
  });

  it("should handle template literal coercion", () => {
    const name = useObserve("world");
    const greeting = useComputedObserve(() => `Hello, ${name}!`);
    expect(greeting()).toBe("Hello, world!");
    name("Michi");
    expect(greeting()).toBe("Hello, Michi!");
  });

  it("should not loop infinitely on rapid updates", () => {
    const count = useObserve(0);
    const computed = useComputedObserve(() => `${count}px`);
    for (let i = 1; i <= 100; i++) count(i);
    expect(computed()).toBe("100px");
  });

  it("should pass options without deps", () => {
    let beforeCalled = 0;
    let afterCalled = 0;
    const count = useObserve(0);
    const computed = useComputedObserve(() => count() + 1, {
      onBeforeUpdate: () => beforeCalled++,
      onAfterUpdate: () => afterCalled++,
    });
    expect(computed()).toBe(1);
    count(5);
    expect(computed()).toBe(6);
    expect(beforeCalled).toBe(1);
    expect(afterCalled).toBe(1);
  });

  it("should support useProxied option", () => {
    const count = useObserve(0);
    const date = useComputedObserve(() => new Date(count()), {
      useProxied: true,
    });
    expect(date.getTime()).toBe(0);
    count(1000);
    expect(date.getTime()).toBe(1000);
  });
});
