import { describe, it, expect, beforeEach } from "bun:test";
import type { ObservableType } from "../../types";
import { useObserve } from "../useObserve";
import { CommonObjectProxyHandler } from "../proxyHandlers/CommonObjectProxyHandler";
import { ArrayProxyHandler } from "../proxyHandlers/ArrayProxyHandler";
import { PrimitiveProxyHandler } from "../proxyHandlers/PrimitiveProxyHandler";
import { DateProxyHandler } from "../proxyHandlers/DateProxyHandler";
import { SetProxyHandler } from "../proxyHandlers/SetProxyHandler";
import { MapProxyHandler } from "../proxyHandlers/MapProxyHandler";
import { FunctionProxyHandler } from "../proxyHandlers/FunctionProxyHandler";

export const useObserveMutationTests = (initialValue: () => unknown) => {
  describe("useObserve mutation tests", () => {
    let object: ObservableType<any>;
    beforeEach(() => {
      object = useObserve(initialValue());
    });
    const matchHandlerAndValue = (
      handler: any,
      newValue: unknown,
      instanceType?: any,
    ) => {
      object(newValue);
      if (instanceType) expect(object.$value).toBeInstanceOf(instanceType);
      else expect(object.$value).toBeTypeOf(typeof newValue);
      expect(object.handler).toBeInstanceOf(handler);
    };

    it("Setting a new object should match handler and value", () => {
      matchHandlerAndValue(CommonObjectProxyHandler, {}, Object);
    });
    it("Setting a new array should match handler and value", () => {
      matchHandlerAndValue(ArrayProxyHandler, [], Array);
    });
    it("Setting a new primitive value should match handler and value", () => {
      matchHandlerAndValue(PrimitiveProxyHandler, false);
      matchHandlerAndValue(PrimitiveProxyHandler, null);
      matchHandlerAndValue(PrimitiveProxyHandler, undefined);
      matchHandlerAndValue(PrimitiveProxyHandler, 1);
      matchHandlerAndValue(PrimitiveProxyHandler, "1");
    });
    it("Setting a new Date should match handler and value", () => {
      matchHandlerAndValue(DateProxyHandler, new Date(), Date);
    });
    it("Setting a new Set should match handler and value", () => {
      matchHandlerAndValue(SetProxyHandler, new Set(), Map);
    });
    it("Setting a new Map should match handler and value", () => {
      matchHandlerAndValue(MapProxyHandler, new Map(), Map);
    });
    it("Setting a new Function should match handler and value", () => {
      matchHandlerAndValue(FunctionProxyHandler, () => "test", Function);
    });
  });
};
