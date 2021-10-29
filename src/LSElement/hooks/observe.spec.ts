import { AnyObject } from '../types';
import { observe } from './observe';

const exampleValue = 1;
const exampleValue2 = 2;
const mockCallback = jest.fn(x => x);

const objectTests = (initialValue: () => AnyObject | Array<unknown>) => {
  describe('object tests', () => {
    let nonProxiedObject;
    let object;
    beforeEach(() => {
      nonProxiedObject = undefined;
      nonProxiedObject = initialValue();
      object = undefined;
      object = observe({ item: initialValue(), onChange: mockCallback, shouldValidatePropertyChange: () => true });
    });
    it('Setting the same value two times must call its callback just one time', () => {
      object[0] = exampleValue;
      object[0] = exampleValue;
      nonProxiedObject[0] = exampleValue;
      expect(mockCallback).toBeCalledTimes(1);
    });
    it('Setting another value must call its callback two times', () => {
      object[0] = exampleValue;
      object[0] = exampleValue2;
      nonProxiedObject[0] = exampleValue;
      nonProxiedObject[0] = exampleValue2;
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Setting the same value on another index must call its callback two times', () => {
      object[0] = exampleValue;
      object[1] = exampleValue;
      nonProxiedObject[0] = exampleValue;
      nonProxiedObject[1] = exampleValue;
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Setting a value on an index and deleting it must call its callback', () => {
      object[0] = exampleValue;
      delete object[0];
      nonProxiedObject[0] = exampleValue;
      delete nonProxiedObject[0];
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Deleting an existing index should call the callback', () => {
      object[0] = exampleValue;
      delete object[0];
      nonProxiedObject[0] = exampleValue;
      delete nonProxiedObject[0];
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Deleting an non-existent index should not call the callback', () => {
      delete object[0];
      delete nonProxiedObject[0];
      expect(mockCallback).toBeCalledTimes(0);
    });
    afterEach(() => {
      expect(object).toEqual(nonProxiedObject);
    });
  });
};

describe('Observe tests', () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });
  describe('When observing Objects', () => {
    objectTests(() => ({}));
  });
  describe('When observing Arrays', () => {
    objectTests(() => []);
  });
  describe('When observing Maps', () => {
    let nonProxiedMap: Map<any, any>;
    let map: Map<any, any>;
    beforeEach(() => {
      nonProxiedMap = undefined;
      nonProxiedMap = new Map();
      map = undefined;
      map = observe({ item: new Map(), onChange: mockCallback, shouldValidatePropertyChange: () => true });
    });
    it('Setting the same value two times must call its callback just one time', () => {
      map[0] = exampleValue;
      map[0] = exampleValue;
      nonProxiedMap[0] = exampleValue;
      expect(mockCallback).toBeCalledTimes(1);
    });
    it('Setting the same value two times must call its callback just one time (using set method)', () => {
      map.set(0, exampleValue);
      map.set(0, exampleValue);
      nonProxiedMap.set(0, exampleValue);
      expect(mockCallback).toBeCalledTimes(1);
    });
    it('Deleting an existing index should call the callback', () => {
      map.set(0, exampleValue);
      nonProxiedMap.set(0, exampleValue);
      map.delete(0);
      nonProxiedMap.delete(0);
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Deleting an non-existent index should not call the callback', () => {
      map.delete(0);
      nonProxiedMap.delete(0);
      expect(mockCallback).toBeCalledTimes(0);
    });
    it('Clearing a map with items should call the callback', () => {
      map.set(0, exampleValue);
      nonProxiedMap.set(0, exampleValue);
      map.clear();
      nonProxiedMap.clear();
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Clearing a map without items should not call the callback', () => {
      map.clear();
      nonProxiedMap.clear();
      expect(mockCallback).toBeCalledTimes(0);
    });
    afterEach(() => {
      expect(Array.from(map)).toEqual(Array.from(nonProxiedMap));
    });
  });
  describe('When observing Sets', () => {
    let nonProxiedSet: Set<any>;
    let set: Set<any>;
    beforeEach(() => {
      nonProxiedSet = undefined;
      nonProxiedSet = new Set();
      set = undefined;
      set = observe({ item: new Set(), onChange: mockCallback, shouldValidatePropertyChange: () => true });
    });
    it('Setting the same value two times must call its callback just one time', () => {
      set[0] = exampleValue;
      set[0] = exampleValue;
      nonProxiedSet[0] = exampleValue;
      expect(mockCallback).toBeCalledTimes(1);
    });
    it('Adding the same value two times must call its callback just one time (using set method)', () => {
      set.add(exampleValue);
      set.add(exampleValue);
      nonProxiedSet.add(exampleValue);
      expect(mockCallback).toBeCalledTimes(1);
    });
    it('Deleting an existing index should call the callback', () => {
      set.add(exampleValue);
      nonProxiedSet.add(exampleValue);
      set.delete(exampleValue);
      nonProxiedSet.delete(exampleValue);
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Deleting an non-existent index should not call the callback', () => {
      set.delete(exampleValue);
      nonProxiedSet.delete(exampleValue);
      expect(mockCallback).toBeCalledTimes(0);
    });
    it('Clearing a map with items should call the callback', () => {
      set.add(exampleValue);
      nonProxiedSet.add(exampleValue);
      set.clear();
      nonProxiedSet.clear();
      expect(mockCallback).toBeCalledTimes(2);
    });
    it('Clearing a map without items should not call the callback', () => {
      set.clear();
      nonProxiedSet.clear();
      expect(mockCallback).toBeCalledTimes(0);
    });
    afterEach(() => {
      expect(Array.from(set)).toEqual(Array.from(nonProxiedSet));
    });
  });
  describe('When observing Dates', () => {
    let nonProxiedDate: Date;
    let date: Date;
    beforeEach(() => {
      nonProxiedDate = undefined;
      nonProxiedDate = new Date();
      date = undefined;
      date = observe({ item: new Date(), onChange: mockCallback, shouldValidatePropertyChange: () => true });
    });
    it('Setting the same value two times must call its callback just one time', () => {
      date.setDate(exampleValue);
      date.setDate(exampleValue);
      nonProxiedDate.setDate(exampleValue);
      expect(mockCallback).toBeCalledTimes(1);
    });
    afterEach(() => {
      expect(date.getTime()).toEqual(nonProxiedDate.getTime());
    });
  });

});