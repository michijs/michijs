import { MainElement } from './MainElement';

export type Result =
    'create1000Rows'
    | 'replaceAllRows'
    | 'partialUpdate'
    | 'selectRow'
    | 'swapRows'
    | 'removeRow'
    | 'createManyRows'
    | 'appendRowsToLargeTable'
    | 'clearRows'

const create1000Rows = () => {
  document.getElementById('run').click();
};
const add1000Rows = () => {
  document.getElementById('add').click();
};
const create10000Rows = () => {
  document.getElementById('runlots').click();
};
const updateEvery10Rows = () => {
  document.getElementById('update').click();
};
const swapRows = () => {
  document.getElementById('swaprows').click();
};
const getTableBody = () => {
  return Array.from(document.getElementById('tbody').children);
};
const clear = () => {
  document.getElementById('clear').click();
};
const getRowId = (element: Element) => {
  return Number(element.childNodes.item(0).childNodes.item(0).textContent);
};

export function makePerformanceTests(dataController: () => MainElement, selectByIndex: boolean) {
  const results = new Map<Result, number>();
  const saveResult = (key: Result, functionToMeasure: () => void) => {
    const t0 = performance.now();
    functionToMeasure();
    const t1 = performance.now();
    results.set(key, Number(Number(t1 - t0).toFixed(2)));
  };
  it('creates 1000 rows when clicking run', () => {
    saveResult('create1000Rows', create1000Rows);
    expect(getTableBody().length).toEqual(1000);
  });
  it('replaces 1000 rows when clicking run', () => {
    create1000Rows();
    saveResult('replaceAllRows', create1000Rows);
    expect(getTableBody().length).toEqual(1000);
    getTableBody().forEach(element => {
      expect(getRowId(element)).toBeGreaterThan(1000);
    });
  });
  it('update every 10th row 1000 rows on a table with 1000 rows when clicking update', () => {
    create1000Rows();
    saveResult('partialUpdate', updateEvery10Rows);
    expect(getTableBody().length).toEqual(1000);
    getTableBody().forEach((element, index) => {
      if (index % 10 === 0) {
        expect(element.innerHTML.includes('!!!')).toBeTruthy();
      } else {
        expect(element.innerHTML.includes('!!!')).toBeFalsy();
      }
    });
  });
  it('select a row (1000 rows)', () => {
    create1000Rows();
    saveResult('selectRow', () => dataController().select(999));
    expect(getTableBody()[selectByIndex ? 999 : 998].className).toEqual('danger');
  });
  it('swap a row (1000 rows)', () => {
    create1000Rows();
    saveResult('swapRows', swapRows);
    expect(getRowId(getTableBody()[1])).toEqual(999);
    expect(getRowId(getTableBody()[998])).toEqual(2);
  });
  it('remove a row (1000 rows)', () => {
    create1000Rows();
    saveResult('removeRow', () => dataController().delete(999));
    expect(getTableBody().length).toEqual(999);
  });
  it('creates 10000 rows when clicking runlots', () => {
    saveResult('createManyRows', create10000Rows);
    expect(getTableBody().length).toEqual(10000);
  });
  it('append 1000 rows on a large table', () => {
    create10000Rows();
    saveResult('appendRowsToLargeTable', add1000Rows);
    expect(getTableBody().length).toEqual(11000);
  });
  it('clear rows', () => {
    create1000Rows();
    saveResult('clearRows', clear);
    expect(getTableBody().length).toEqual(0);
  });
  return results;
}