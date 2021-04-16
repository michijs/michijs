import { h, render } from '..';
import Element, { MainElement } from './MainElement';
import { makePerformanceTests, Result } from './shared';

describe('Performance tests - LS-Element', () => {
  let component: MainElement;

  beforeEach(() => {
    component = render(<Element id="test" />);
  });

  it('matches the snapshot on initial render', () => {
    component.rows = component.buildData(3);
    expect(component.children).toMatchSnapshot();
  });

  const getComponent = () => {
    return component;
  };

  const results = makePerformanceTests(getComponent, false);
  afterAll(() => {
    expect(
      new Map<Result, number>([
        ['create1000Rows', 628.04],
        ['replaceAllRows', 1338.53],
        ['partialUpdate', 89.95],
        ['selectRow', 61.77],
        ['swapRows', 64.19],
        ['removeRow', 56.07],
        ['createManyRows', 7013.5],
        ['appendRowsToLargeTable', 1579.74],
        ['clearRows', 67.7]
      ])).toMatchSnapshot('LS-Element 1.2.6');
    expect(results).toMatchSnapshot(new Date().getTime().toString());
  });
});
