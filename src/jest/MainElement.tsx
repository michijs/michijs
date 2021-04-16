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
      <div id="container" class="container" _dynamicAttributes={[]}>
        <div id="jumbotron" class="jumbotron" _dynamicAttributes={[]} _staticChildren>
          <div id="1" class="row">
            <div id="2" class="col-md-6">
              <h1 id="3">LS-Element keyed</h1>
            </div>
            <div id="4" class="col-md-6">
              <div id="5" class="row">
                <div id="6" class="col-sm-6 smallpad">
                  <button type="button" class="btn btn-primary btn-block" id="run" onclick={this.run}>Create 1,000 rows</button>
                </div>
                <div id="7" class="col-sm-6 smallpad">
                  <button type="button" class="btn btn-primary btn-block" id="runlots" onclick={this.runLots}>Create 10,000 rows</button>
                </div>
                <div id="8" class="col-sm-6 smallpad">
                  <button type="button" class="btn btn-primary btn-block" id="add" onclick={this.add}>Append 1,000 rows</button>
                </div>
                <div id="9" class="col-sm-6 smallpad">
                  <button type="button" class="btn btn-primary btn-block" id="update" onclick={() => this.update()}>Update every 10th row</button>
                </div>
                <div id="10" class="col-sm-6 smallpad">
                  <button type="button" class="btn btn-primary btn-block" id="clear" onclick={this.clear}>Clear</button>
                </div>
                <div id="11" class="col-sm-6 smallpad">
                  <button type="button" class="btn btn-primary btn-block" id="swaprows" onclick={this.swapRows}>Swap Rows</button>
                </div >
              </div >
            </div >
          </div >
        </div >
        <table id="table" class="table table-hover table-striped test-data" _dynamicAttributes={[]}>
          <tbody id="tbody" _dynamicAttributes={[]}>{this.rows.map(item => (
            <tr id={`row-${item.id}`} class={item.id === this.selected ? 'danger' : undefined} _dynamicAttributes={['class']}>
              <td id={`row-${item.id}-1`} class="col-md-1" _dynamicAttributes={[]} _staticChildren>{item.id}</td>
              <td id={`row-${item.id}-2`} class="col-md-4" _dynamicAttributes={[]}>
                <a id={`row-${item.id}-3`} onclick={() => this.select(item.id)} _dynamicAttributes={[]}>{item.label}</a>
              </td>
              <td id={`row-${item.id}-4`} class="col-md-1" _dynamicAttributes={[]} _staticChildren>
                <a id={`row-${item.id}-5`} onclick={() => this.delete(item.id)}>
                  <span id={`row-${item.id}-6`} class="glyphicon glyphicon-remove" aria-hidden="true" />
                </a>
              </td>
              <td id={`row-${item.id}-7`} class="col-md-6" _dynamicAttributes={[]} _staticChildren />
            </tr>))}
          </tbody>
        </table >
        <span id="icon" class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" _dynamicAttributes={[]} _staticChildren />
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
      const d998 = this.rows[998];

      this.rows = this.rows.map((data, i) => {
        if (i === 1) {
          return d998;
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