import { h, renderFunctionalComponent } from '..';
import Element, { MainElement } from './MainElement';

function render<T extends HTMLElement>(Component): T {
  document.body.textContent = '';
  const result = renderFunctionalComponent(Component);
  document.body.appendChild(result);
  return document.getElementById(Component.attrs['id']) as T;
}

type Result =
    'create1000Rows'
    | 'replaceAllRows'
    | 'partialUpdate'
    | 'selectRow'
    | 'swapRows'
    | 'removeRow'
    | 'createManyRows'
    | 'appendRowsToLargeTable'
    | 'clearRows'


const results = new Map<Result, number>();

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
  return Array.from(document.getElementById('body').children);
};
const clear = () => {
  document.getElementById('clear').click();
};

describe('Performance tests', () => {

  const saveResult = (key: Result, functionToMeasure: () => void) => {
    const t0 = performance.now();
    functionToMeasure();
    const t1 = performance.now();
    results.set(key, Number(Number(t1 - t0).toFixed(2)));
  };
  let component: MainElement;

  beforeEach(() => {
    component = render(<Element id="test" />);
  });
  it('matches the snapshot on initial render', () => {
    expect(component.children).toMatchSnapshot();
  });
  it('creates 1000 rows when clicking run', () => {
    saveResult('create1000Rows', create1000Rows);
    expect(getTableBody().length).toEqual(1000);
  });
  it('replaces 1000 rows when clicking run', () => {
    create1000Rows();
    saveResult('replaceAllRows', create1000Rows);
    expect(getTableBody().length).toEqual(1000);
    getTableBody().forEach(element => {
      expect(Number(element['id'].split('-')[1])).toBeGreaterThan(1000);
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
    saveResult('selectRow', () => component._select(999));
    expect(document.getElementById('row-999').className).toEqual('danger');
  });
  it('swap a row (1000 rows)', () => {
    create1000Rows();
    saveResult('swapRows', swapRows);
    expect(getTableBody().findIndex(element => element.id === 'row-2')).toEqual(998);
    expect(getTableBody().findIndex(element => element.id === 'row-999')).toEqual(1);
  });
  it('remove a row (1000 rows)', () => {
    create1000Rows();
    saveResult('removeRow', () => component._remove(999));
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
  afterAll(() => {
    expect(results).toMatchSnapshot(new Date().getTime().toString());
  });
});