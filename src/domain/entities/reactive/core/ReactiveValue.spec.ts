import { describe, it, expect, mock } from "bun:test";
import { ReactiveValue } from "./ReactiveValue";

describe("ReactiveValue - Symbol.dispose", () => {
  it("should expose a Symbol.dispose method", () => {
    const rv = new ReactiveValue(1);
    expect(typeof rv[Symbol.dispose]).toBe("function");
  });

  it("should clear all subscribers when disposed", () => {
    const rv = new ReactiveValue(0);
    const subscriber = mock(() => {});
    rv.subscribe(subscriber);
    expect(rv.observers.size).toBe(1);

    rv[Symbol.dispose]();

    expect(rv.observers.size).toBe(0);
  });

  it("should not notify previously subscribed observers after disposal", () => {
    const rv = new ReactiveValue(0) as unknown as ReactiveValue<number> & {
      (value?: number): number | undefined;
    };
    const subscriber = mock(() => {});
    rv.subscribe(subscriber);

    rv[Symbol.dispose]();
    rv(42);

    expect(subscriber).not.toHaveBeenCalled();
  });

  it("should release the held value reference", () => {
    const rv = new ReactiveValue({ heavy: "object" });
    rv[Symbol.dispose]();
    expect(rv.$value).toBeUndefined();
  });

  it("should work with the `using` declaration", () => {
    let captured: ReactiveValue<number> | undefined;
    {
      using rv = new ReactiveValue(123);
      captured = rv;
      const subscriber = mock(() => {});
      rv.subscribe(subscriber);
      expect(rv.observers.size).toBe(1);
      expect(rv.$value).toBe(123);
    }
    expect(captured!.observers.size).toBe(0);
    expect(captured!.$value).toBeUndefined();
  });

  it("should be idempotent (safe to dispose multiple times)", () => {
    const rv = new ReactiveValue("hello");
    rv[Symbol.dispose]();
    expect(() => rv[Symbol.dispose]()).not.toThrow();
    expect(rv.observers.size).toBe(0);
    expect(rv.$value).toBeUndefined();
  });
});
