import { useObserve } from "..";

/**
 * @typedef {import('../../types').AnyObject} AnyObject
 * @typedef {import('../../types').ObservableComplexObject} ObservableComplexObject
 * @typedef {import('../../types').ObservableType} ObservableType
 */

const exampleValue = 1;
const exampleValue2 = 2;
const mockCallback = jest.fn((x) => x);

/**
 * @param {() => AnyObject | unknown[]} initialValue
 */
const objectTests = (initialValue) => {
    describe("object tests", () => {
        let nonProxiedObject;
        let object;
        beforeEach(() => {
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
        it.skip("Setting a value on an index and deleting it must call its callback", () => {
            object[0] = exampleValue;
            delete object[0];
            nonProxiedObject[0] = exampleValue;
            delete nonProxiedObject[0];
            expect(mockCallback).toHaveBeenCalledTimes(2);
        });
        it.skip("Deleting an existing index should call the callback", () => {
            object[0] = exampleValue;
            delete object[0];
            nonProxiedObject[0] = exampleValue;
            delete nonProxiedObject[0];
            expect(mockCallback).toHaveBeenCalledTimes(2);
        });
        it("Deleting an non-existent index should not call the callback", () => {
            delete object[0];
            delete nonProxiedObject[0];
            expect(mockCallback).toHaveBeenCalledTimes(0);
        });
        it("JSON versions of the objects should be the same", () => {
            object[0] = exampleValue;
            nonProxiedObject[0] = exampleValue;
            expect(JSON.stringify(object)).toStrictEqual(JSON.stringify(nonProxiedObject));
        });
        it("keys of the objects should be the same", () => {
            object[0] = exampleValue;
            nonProxiedObject[0] = exampleValue;
            expect(Object.keys(object)).toStrictEqual(Object.keys(nonProxiedObject));
        });
        it("entries of the objects should be the same", () => {
            object[0] = exampleValue;
            nonProxiedObject[0] = exampleValue;
            expect(Object.entries(object)).toStrictEqual(Object.entries(nonProxiedObject));
        });

        it("should return proper type", () => {
            expect(object.typeof?.()).toStrictEqual("object");
        });
        afterEach(() => {
            expect(object.valueOf()).toStrictEqual(nonProxiedObject);
        });
    });
};

describe("Observe tests", () => {
    beforeEach(() => {
        mockCallback.mockClear();
    });
    describe("When observing Objects", () => {
        objectTests(() => ({}));
    });
    describe("When observing Arrays", () => {
        objectTests(() => []);
    });
    describe("When observing Maps", () => {
        let nonProxiedMap;
        let map;
        beforeEach(() => {
            nonProxiedMap = new Map();
            map = useObserve(new Map());
            map.subscribe(mockCallback);
        });
        it("Setting the same value two times must call its callback just one time", () => {
            map[0] = exampleValue;
            map[0] = exampleValue;
            nonProxiedMap[0] = exampleValue;
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
        it("Setting the same value two times must call its callback just one time (using set method)", () => {
            map.set(0, exampleValue);
            map.set(0, exampleValue);
            nonProxiedMap.set(0, exampleValue);
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
        it("Deleting an existing index should call the callback", () => {
            map.set(0, exampleValue);
            nonProxiedMap.set(0, exampleValue);
            map.delete(0);
            nonProxiedMap.delete(0);
            expect(mockCallback).toHaveBeenCalledTimes(2);
        });
        it("Deleting an non-existent index should not call the callback", () => {
            map.delete(0);
            nonProxiedMap.delete(0);
            expect(mockCallback).toHaveBeenCalledTimes(0);
        });
        it("Clearing a map with items should call the callback", () => {
            map.set(0, exampleValue);
            nonProxiedMap.set(0, exampleValue);
            map.clear();
            nonProxiedMap.clear();
            expect(mockCallback).toHaveBeenCalledTimes(2);
        });
        it("Clearing a map without items should not call the callback", () => {
            map.clear();
            nonProxiedMap.clear();
            expect(mockCallback).toHaveBeenCalledTimes(0);
        });
        afterEach(() => {
            expect(map.size).toStrictEqual(nonProxiedMap.size);
            expect(Array.from(map)).toEqual(Array.from(nonProxiedMap));
            expect(Object.keys(map)).toEqual(Object.keys(nonProxiedMap));
            // expect(Object.values(map)).toEqual(Object.values(nonProxiedMap));
        });
    });
    describe("When observing Sets", () => {
        let nonProxiedSet;
        let set;
        beforeEach(() => {
            nonProxiedSet = new Set();
            set = useObserve(new Set());
            set.subscribe(mockCallback);
        });
        it("Setting the same value two times must call its callback just one time", () => {
            set[0] = exampleValue;
            set[0] = exampleValue;
            nonProxiedSet[0] = exampleValue;
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
        it("Adding the same value two times must call its callback just one time (using add method)", () => {
            set.add(exampleValue);
            set.add(exampleValue);
            nonProxiedSet.add(exampleValue);
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
        it("Deleting an existing index should call the callback", () => {
            set.add(exampleValue);
            nonProxiedSet.add(exampleValue);
            set.delete(exampleValue);
            nonProxiedSet.delete(exampleValue);
            expect(mockCallback).toHaveBeenCalledTimes(2);
        });
        it("Deleting an non-existent index should not call the callback", () => {
            set.delete(exampleValue);
            nonProxiedSet.delete(exampleValue);
            expect(mockCallback).toHaveBeenCalledTimes(0);
        });
        it("Clearing a set with items should call the callback", () => {
            set.add(exampleValue);
            nonProxiedSet.add(exampleValue);
            set.clear();
            nonProxiedSet.clear();
            expect(mockCallback).toHaveBeenCalledTimes(2);
        });
        it("Clearing a set without items should not call the callback", () => {
            set.clear();
            nonProxiedSet.clear();
            expect(mockCallback).toHaveBeenCalledTimes(0);
        });
        afterEach(() => {
            expect(set.size).toStrictEqual(nonProxiedSet.size);
            expect(Array.from(set)).toEqual(Array.from(nonProxiedSet));
            expect(Object.keys(set)).toEqual(Object.keys(nonProxiedSet));
            // expect(Object.values(set)).toEqual(Object.values(nonProxiedSet));
        });
    });
    describe("When observing Dates", () => {
        let nonProxiedDate;
        let date;
        beforeEach(() => {
            nonProxiedDate = new Date();
            date = useObserve(new Date());
            date.subscribe(mockCallback);
        });
        it("Setting the same value two times must call its callback just one time", () => {
            const newExampleValue = date.getTime() + 1;
            date.setTime(newExampleValue);
            date.setTime(newExampleValue);
            nonProxiedDate.setTime(newExampleValue);
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
        afterEach(() => {
            expect(date.getTime()).toEqual(nonProxiedDate.getTime());
            expect(Object.keys(date)).toEqual(Object.keys(nonProxiedDate));
            expect(Object.values(date)).toEqual(Object.values(nonProxiedDate));
        });
    });
    describe("When observing objects with nullable fields", () => {
        const object = useObserve(undefined);
        it("Getting test doesnt throw exception", () => {
            expect(() => object.test.test2).not.toThrow();
            expect(object.test.test2()).toBe(undefined);
            expect(object()).toStrictEqual({ test: { test2: undefined } });
            object.test.test2(1);
            expect(object()).toStrictEqual({ test: { test2: 1 } });
            object.test(null);
            expect(object()).toStrictEqual({ test: null });
            object.test({ test2: undefined });
            expect(object()).toStrictEqual({ test: { test2: undefined } });
        });
    });
    describe("When observing Complex objects", () => {
        const obj = useObserve(new File([""], "test"));

        it("Getting the value should return same instance type", () => {
            expect(obj() instanceof File).toBe(true);
        });
    });
});
