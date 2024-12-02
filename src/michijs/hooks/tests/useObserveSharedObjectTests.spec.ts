import type { AnyObject, ObservableType } from "../../types";
import { useObserve } from "../useObserve";
import { useObserveMutationTests } from "./useObserveMutation.spec";
import { describe, it, expect, beforeEach, jest, afterEach } from "bun:test";
const mockCallback = jest.fn((x) => x);
const exampleValue = 1;
const exampleValue2 = 2;

export const sharedObjectTests = (initialValue: () => AnyObject | unknown[]) => {
    useObserveMutationTests(initialValue)
    describe("shared object tests", () => {
      let nonProxiedObject;
      let object: ObservableType<any>;
      beforeEach(() => {
        mockCallback.mockClear();
        nonProxiedObject = undefined;
        nonProxiedObject = initialValue();
        object = undefined;
        object = useObserve(initialValue());
        object.subscribe(mockCallback);
      });
      it("Setting the same value two times must call its callback just one time", () => {
        object[0] = exampleValue;
        object[0] = exampleValue;
        nonProxiedObject[0] = exampleValue;
        expect(mockCallback).toHaveBeenCalledTimes(1);
      });
      it("Setting another value must call its callback two times", () => {
        object[0] = exampleValue;
        object[0] = exampleValue2;
        nonProxiedObject[0] = exampleValue;
        nonProxiedObject[0] = exampleValue2;
        expect(mockCallback).toHaveBeenCalledTimes(2);
      });
      it("Setting the same value on another index must call its callback two times", () => {
        object[0] = exampleValue;
        object[1] = exampleValue;
        nonProxiedObject[0] = exampleValue;
        nonProxiedObject[1] = exampleValue;
        expect(mockCallback).toHaveBeenCalledTimes(2);
      });
      it("Setting a value on an index and deleting it must call its callback", () => {
        object[0] = exampleValue;
        delete object[0];
        nonProxiedObject[0] = exampleValue;
        delete nonProxiedObject[0];
        expect(mockCallback).toHaveBeenCalledTimes(2);
      });
      it("Deleting an existing index should call the callback", () => {
        object[0] = exampleValue;
        delete object[0];
        nonProxiedObject[0] = exampleValue;
        delete nonProxiedObject[0];
        expect(mockCallback).toHaveBeenCalledTimes(2);
      });
      it("Deleting an non-existent index should not call the callback", () => {
        try {
          delete object[0];
          delete nonProxiedObject[0];
        } catch {}
        expect(mockCallback).toHaveBeenCalledTimes(0);
      });
      it("JSON versions of the objects should be the same", () => {
        object[0] = exampleValue;
        nonProxiedObject[0] = exampleValue;
        expect(JSON.stringify(object)).toStrictEqual(
          JSON.stringify(nonProxiedObject),
        );
      });
      it("keys of the objects should be the same", () => {
        object[0] = exampleValue;
        nonProxiedObject[0] = exampleValue;
        expect(Object.keys(object)).toStrictEqual(Object.keys(nonProxiedObject));
      });
      it("entries of the objects should be the same", () => {
        object[0] = exampleValue;
        nonProxiedObject[0] = exampleValue;
        // Doesnt work with bun:test
        // expect(Object.entries(object)).toStrictEqual(
        expect(Object.entries(object())).toStrictEqual(
          Object.entries(nonProxiedObject),
        );
      });
  
      it("should return proper type", () => {
        expect(object.typeof?.()).toStrictEqual("object");
      });
      afterEach(() => {
        expect(object.valueOf()).toStrictEqual(nonProxiedObject);
      });
    });
  };