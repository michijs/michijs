import { describe, it, expect, jest } from "bun:test";
import { useObserve } from "../useObserve";
import { CommonObjectProxyHandler } from "../proxyHandlers/CommonObjectProxyHandler";
import { ArrayProxyHandler } from "../proxyHandlers/ArrayProxyHandler";
import { PrimitiveProxyHandler } from "../proxyHandlers/PrimitiveProxyHandler";
import { DateProxyHandler } from "../proxyHandlers/DateProxyHandler";
import { SetProxyHandler } from "../proxyHandlers/SetProxyHandler";
import { MapProxyHandler } from "../proxyHandlers/MapProxyHandler";
import { FunctionProxyHandler } from "../proxyHandlers/FunctionProxyHandler";
const mockCallback = jest.fn((x) => x);

export const useObserveMutationTests = (initialValue: () => unknown) => {
    describe("useObserve mutation tests", () => {
        const matchHandlerAndValue = (handler: any, newValue: unknown, instanceType?: any) => {
            mockCallback.mockClear();
            const object = useObserve(initialValue());
            object.subscribe(mockCallback);
            const oldHandler = object.handler;
            object(newValue);
            if (instanceType)
                expect(object.$value).toBeInstanceOf(instanceType)
            else
                expect(object.$value).toBeTypeOf(typeof newValue);
            // If the handler changed should call the callback
            if (!(oldHandler instanceof handler))
                expect(mockCallback).toHaveBeenCalledTimes(1);
        }

        it("Setting a new object should match handler and value", () => {
            matchHandlerAndValue(CommonObjectProxyHandler, {}, Object);
        });
        it("Setting a new array should match handler and value", () => {
            matchHandlerAndValue(ArrayProxyHandler, [], Array)
        });
        it("Setting a new primitive value should match handler and value", () => {
            matchHandlerAndValue(PrimitiveProxyHandler, false)
            matchHandlerAndValue(PrimitiveProxyHandler, null)
            matchHandlerAndValue(PrimitiveProxyHandler, undefined)
            matchHandlerAndValue(PrimitiveProxyHandler, 1)
            matchHandlerAndValue(PrimitiveProxyHandler, "1")
        });
        it("Setting a new Date should match handler and value", () => {
            matchHandlerAndValue(DateProxyHandler, new Date(), Date)
        });
        it("Setting a new Set should match handler and value", () => {
            matchHandlerAndValue(SetProxyHandler, new Set(), Map)
        });
        it("Setting a new Map should match handler and value", () => {
            matchHandlerAndValue(MapProxyHandler, new Map(), Map)
        });
        it("Setting a new Function should match handler and value", () => {
            matchHandlerAndValue(FunctionProxyHandler, () => "test", Function)
        });
    });
};