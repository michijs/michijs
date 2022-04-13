import { h, createCustomElement, ElementList } from '../../../../src';

function _random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];

type Row = { label: string, id: number, selected?: boolean };
let nextId = 1;
function buildData(count = 1000) {
  const data = new Array<Row>();
  for (let i = 0; i < count; i++)
    data.push({ id: nextId++, label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}` });
  return data;
}

const list = new ElementList<Row>();

const run = () => list.replace(...buildData());
const runLots = () => list.replace(...buildData(10000));
const add = () => list.push(...buildData());
const update = () => {
  for (let i = 0; i < list.getData().length; i += 10) {
    list.update(i, (value) => {
      value.label += ' !!!';
      return value;
    });
  }
};
const clear = () => list.clear();
const select = (i) => {
  const selectedIndex = list.getData().findIndex(x => x.selected);
  if (i !== selectedIndex) {
    if (selectedIndex >= 0)
      list.update(selectedIndex, (value) => {
        value.selected = undefined;
        return value;
      });

    list.update(i, (value) => {
      value.selected = true;
      return value;
    });
  }
};
const deleteItem = (i) => list.remove(i);
const swapRows = () => list.swap(1, 998);

export const Tbody = createCustomElement(
  {
    tag: 'ls-table',
    extends: 'table',
    class: HTMLTableElement
  },
  {
    render() {
      return (
        <list.target as="tbody" _id="tbody">
          {({ id, label, selected }, index) => (
            <tr class={selected ? 'danger' : undefined}>
              <td _className="col-md-1">
                {id.toString()}
              </td>
              <td _className="col-md-4">
                {/* TODO: _onclick vs onclick */}
                <a onclick={() => select(index)}>
                  {label}
                </a>
              </td>
              <td _className="col-md-1">
                <a onclick={() => deleteItem(index)}>
                  <span _className="glyphicon glyphicon-remove" _ariaHidden="true" />
                </a>
              </td>
              <td _className="col-md-6" />
            </tr>
          )}
        </list.target>
      );
    }
  }
);

export const TableManager = createCustomElement(
  {
    tag: 'ls-table-manager',
    extends: 'div',
    class: HTMLDivElement
  },
  {
    render() {
      return (
        <>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="run" onclick={run}>
              Create 1,000 rows
            </button>
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="runlots" onclick={runLots}>
              Create 10,000 rows
            </button>
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="add" onclick={add}>
              Append 1,000 rows
            </button>
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="update" onclick={update}>
              Update every 10th row
            </button>
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="clear" onclick={clear}>
              Clear
            </button>
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="swaprows" onclick={swapRows}>
              Swap Rows
            </button>
          </div>
        </>
      );
    }
  }
);