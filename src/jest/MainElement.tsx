import { Attribute, AutonomousCustomElement, CustomElementWrapper, h, LSCustomElement } from '../index';

function random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const A = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean',
  'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive',
  'cheap', 'expensive', 'fancy'];
const C = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const N = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse',
  'keyboard'];

@AutonomousCustomElement({ shadow: false })
export class MainElement extends HTMLElement implements LSCustomElement {
  @Attribute() rows = [];
  @Attribute() selected = 0;
  nextId = 1;

  buildData(count) {
    const data = new Array(count);
    for (let i = 0; i < count; i++) {
      data[i] = {
        id: this.nextId++,
        label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]}`,
      };
    }
    return data;
  }

  render() {
    return (
      <div id="container" _className="container" _dynamicAttributes={[]}>
        <div id="jumbotron" _className="jumbotron" _dynamicAttributes={[]} _staticChildren>
          <div id="1" _className="row">
            <div id="2" _className="col-md-6">
              <h1 id="3" _textContent="LS-Element keyed" />
            </div>
            <div id="4" _className="col-md-6">
              <div id="5" _className="row">
                <div id="6" _className="col-sm-6 smallpad">
                  <button _type="button" _className="btn btn-primary btn-block" id="run" onclick={this.run} _textContent="Create 1,000 rows" />
                </div>
                <div id="7" _className="col-sm-6 smallpad">
                  <button _type="button" _className="btn btn-primary btn-block" id="runlots" onclick={this.runLots} _textContent="Create 10,000 rows" />
                </div>
                <div id="8" _className="col-sm-6 smallpad">
                  <button _type="button" _className="btn btn-primary btn-block" id="add" onclick={this.add} _textContent="Append 1,000 rows" />
                </div>
                <div id="9" _className="col-sm-6 smallpad">
                  <button _type="button" _className="btn btn-primary btn-block" id="update" onclick={() => this.update()} _textContent="Update every 10th row" />
                </div>
                <div id="10" _className="col-sm-6 smallpad">
                  <button _type="button" _className="btn btn-primary btn-block" id="clear" onclick={this.clear} _textContent="Clear" />
                </div>
                <div id="11" _className="col-sm-6 smallpad">
                  <button _type="button" _className="btn btn-primary btn-block" id="swaprows" onclick={this.swapRows} _textContent="Swap Rows" />
                </div >
              </div >
            </div >
          </div >
        </div >
        <table id="table" _className="table table-hover table-striped test-data" _dynamicAttributes={[]}>
          <tbody id="tbody" _dynamicAttributes={[]}>{this.rows.map(({ id, label }) => (
            <tr id={`row-${id}`} class={id === this.selected ? 'danger' : undefined} _dynamicAttributes={['class']}>
              <td id={`row-${id}-1`} _className="col-md-1" _dynamicAttributes={[]} _staticChildren _textContent={id} />
              <td id={`row-${id}-2`} _className="col-md-4" _dynamicAttributes={[]}>
                <a id={`row-${id}-3`} onclick={() => this.select(id)} _staticChildren _dynamicAttributes={['_textContent']} _textContent={label} />
              </td>
              <td id={`row-${id}-4`} _className="col-md-1" _dynamicAttributes={[]} _staticChildren>
                <a id={`row-${id}-5`} onclick={() => this.delete(id)}>
                  <span id={`row-${id}-6`} _className="glyphicon glyphicon-remove" aria-hidden="true" />
                </a>
              </td>
              <td id={`row-${id}-7`} _className="col-md-6" _dynamicAttributes={[]} _staticChildren />
            </tr>))}
          </tbody>
        </table >
        <span id="icon" _className="preloadicon glyphicon glyphicon-remove" aria-hidden="true" _dynamicAttributes={[]} _staticChildren />
      </div >
    );
  }
  run() {
    this.rows = this.buildData(1000);
    this.selected = 0;
  }
  runLots() {
    this.rows = this.buildData(10000);
    this.selected = 0;
  }
  add() {
    this.rows = this.rows.concat(this.buildData(1000));
  }
  delete(id) {
    this.rows = this.rows.filter(x => x.id !== id);
  }
  select(id) {
    this.selected = id;
  }
  update(mod = 10) {
    this.rows = this.rows.map((row, i) => {
      return i % mod === 0 ? { ...row, label: `${row.label} !!!` } : row;
    });
  }
  clear() {
    this.rows = [];
    this.selected = 0;
  }
  swapRows() {
    if (this.rows.length > 998) {
      const d1 = this.rows[1];

      this.rows = this.rows.map((data, i) => {
        if (i === 1) {
          return this.rows[998];
        }
        else if (i === 998) {
          return d1;
        }
        return data;
      });
    }
  }
}

export default CustomElementWrapper()(MainElement);