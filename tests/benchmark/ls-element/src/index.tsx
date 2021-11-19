import { h, lsStore, createCustomElement } from '../../../../src';

function _random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];

type Row = { label: string, id: number };
function buildData(count = 1000) {
  const data = new Array<Row>();
  for (let i = 0; i < count; i++)
    data.push({ id: state.nextId++, label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}` });
  return data;
}

const { state, transactions, ...store } = lsStore({
  state: {
    data: new Array<Row>(),
    selected: null as number,
    nextId: 1
  },
  transactions: {
    updateData(mod = 10) {
      for (let i = 0; i < state.data.length; i += mod) {
        state.data[i].label += ' !!!';
        // this.data[i] = Object.assign({}, this.data[i], {label: this.data[i].label +' !!!'});
      }
    },
    delete(id: number) {
      // state.data = state.data.filter(x => x.id !== id);
      const index = state.data.findIndex(x => x.id === id);
      state.data.splice(index, 1);

      // const idx = this.data.findIndex(d => d.id == id);
      // this.data = this.data.filter((_e, i) => i != idx);
      // return this;
    },
    run() {
      state.data = buildData();
      state.selected = null;
    },
    add() {
      // state.data = state.data.concat(buildData());
      state.data.push(...buildData());
      state.selected = null;
    },
    update() {
      transactions.updateData();
      state.selected = null;
    },
    select(id: number) {
      state.selected = id;
    },
    runLots() {
      state.data = buildData(10000);
      state.selected = null;
    },
    clear() {
      state.data = [];
      state.selected = null;
    },
    swapRows() {
      if (state.data.length > 998) {
        const a = state.data[1];
        state.data[1] = state.data[998];
        state.data[998] = a;
      }
    }
  }
});

export const Trow = createCustomElement(
  {
    tag: 'ls-table-row',
    extends: 'tr',
    class: HTMLTableRowElement
  },
  {
    attributes: {
      labelId: undefined as number,
      label: undefined,
    },
    render() {
      return <>
        <td _className="col-md-1" _textContent={this.labelId.toString()} />
        <td _className="col-md-4">
          <a onclick={() => transactions.select(this.labelId)} _textContent={this.label} />
        </td>
        <td _className="col-md-1">
          <a onclick={() => transactions.delete(this.labelId)}>
            <span _className="glyphicon glyphicon-remove" aria-hidden="true" />
          </a>
        </td>
        <td _className="col-md-6" />
      </>;
    }
  }
);

export const Tbody = createCustomElement(
  {
    tag: 'ls-table-body',
    extends: 'tbody',
    class: HTMLTableSectionElement
  },
  {
    subscribeTo: {
      store
    },
    render() {
      return state.data.map(({ id, label }) => <Trow key={id} _labelId={id} _label={label} class={id === state.selected ? 'danger' : undefined} />);
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
            <button _type="button" _className="btn btn-primary btn-block" id="run" onclick={transactions.run} _textContent="Create 1,000 rows" />
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="runlots" onclick={transactions.runLots} _textContent="Create 10,000 rows" />
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="add" onclick={transactions.add} _textContent="Append 1,000 rows" />
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="update" onclick={transactions.update} _textContent="Update every 10th row" />
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="clear" onclick={transactions.clear} _textContent="Clear" />
          </div>
          <div _className="col-sm-6 smallpad">
            <button _type="button" _className="btn btn-primary btn-block" id="swaprows" onclick={transactions.swapRows} _textContent="Swap Rows" />
          </div>
        </>
      );
    }
  }
);