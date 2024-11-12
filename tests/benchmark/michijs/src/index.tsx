import {
  type ObservableType,
  createCustomElement,
  observeCommonObject,
  ProxiedArray,
} from "@michijs/michijs";

interface Row {
  label: ObservableType<string>;
  id: number;
  selected: ObservableType<string | undefined>;
}
const adjectives = [
  "pretty",
  "large",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "handsome",
  "plain",
  "quaint",
  "clean",
  "elegant",
  "easy",
  "angry",
  "crazy",
  "helpful",
  "mushy",
  "odd",
  "unsightly",
  "adorable",
  "important",
  "inexpensive",
  "cheap",
  "expensive",
  "fancy",
],
  colours = [
    "red",
    "yellow",
    "blue",
    "green",
    "pink",
    "brown",
    "purple",
    "brown",
    "white",
    "black",
    "orange",
  ],
  nouns = [
    "table",
    "chair",
    "house",
    "bbq",
    "desk",
    "car",
    "pony",
    "cookie",
    "sandwich",
    "burger",
    "pizza",
    "mouse",
    "keyboard",
  ],
  adjectivesLength = adjectives.length,
  coloursLength = colours.length,
  nounsLength = nouns.length,
  _random = (max: number) => Math.round(Math.random() * 1000) % max,
  buildData = (count = 1000) => {
    const data = new Array<Row>(count);
    for (let i = 0; i < count; i++)
      data[i] = {
        selected: observeCommonObject<string | undefined>(undefined),
        id: nextId++,
        label: observeCommonObject(
          `${adjectives[_random(adjectivesLength)]} ${colours[_random(coloursLength)]} ${nouns[_random(nounsLength)]}`,
        ),
      };
    return data;
  },
  rows = new ProxiedArray<Row>([], undefined, true),
  run = () => rows.$replace(buildData()),
  runLots = () => rows.$replace(buildData(10000)),
  add = () => rows.push(...buildData()),
  update = () => {
    const array = rows.$value,
      length = array.length;
    for (let i = 0; i < length; i += 10) {
      const label = array[i].label;
      label(`${label()} !!!`);
    }
  },
  clear = () => rows.$clear(),
  select = (row: Row) => {
    row.selected("danger");
    if (selectedItem) selectedItem.selected(undefined);
    selectedItem = row;
  },
  deleteItem = (id: number) =>
    rows.$remove(rows.$value.findIndex((x) => x.id === id)),
  swapRows = () => rows.$swap(1, 998);

let nextId = 1,
  selectedItem: Row | null = null;

export const Table = createCustomElement("michi-table", {
  extends: {
    tag: "table",
    class: HTMLTableElement,
  },
  render() {
    return (
      <rows.List
        as="tbody"
        id="tbody"
        // useTemplate
        renderItem={(row) => (
          <tr class={row.selected}>
            <td _={{ className: "col-md-1" }}>{row.id}</td>
            <td _={{ className: "col-md-4" }}>
              <a _={{ onclick: () => select(row) }}>{row.label}</a>
            </td>
            <td _={{ className: "col-md-1" }}>
              <a _={{ onclick: () => deleteItem(row.id) }}>
                <span _={{ className: "glyphicon glyphicon-remove", ariaHidden: "true" }} />
              </a>
            </td>
            <td _={{ className: "col-md-6" }} />
          </tr>
        )}
      />
    );
  },
});

export const TableManager = createCustomElement("michi-table-manager", {
  extends: {
    tag: "div",
    class: HTMLDivElement,
  },
  render() {
    return (
      <div _={{ className: "row" }}>
        <div _={{ className: "col-sm-6 smallpad" }}>
          <button
            _={{
              type: "button",
              className: "btn btn-primary btn-block",
              id: "run",
              onclick: run,
            }}
          >
            Create 1,000 rows
          </button>
        </div>
        <div _={{ className: "col-sm-6 smallpad" }}>
          <button
            _={{
              type: "button",
              className: "btn btn-primary btn-block",
              id: "runlots",
              onclick: runLots,
            }}
          >
            Create 10,000 rows
          </button>
        </div>
        <div _={{ className: "col-sm-6 smallpad" }}>
          <button
            _={{
              type: "button",
              className: "btn btn-primary btn-block",
              id: "add",
              onclick: add,
            }}
          >
            Append 1,000 rows
          </button>
        </div>
        <div _={{ className: "col-sm-6 smallpad" }}>
          <button
            _={{
              type: "button",
              className: "btn btn-primary btn-block",
              id: "update",
              onclick: update,
            }}
          >
            Update every 10th row
          </button>
        </div>
        <div _={{ className: "col-sm-6 smallpad" }}>
          <button
            _={{
              type: "button",
              className: "btn btn-primary btn-block",
              id: "clear",
              onclick: clear,
            }}
          >
            Clear
          </button>
        </div>
        <div _={{ className: "col-sm-6 smallpad" }}>
          <button
            _={{
              type: "button",
              className: "btn btn-primary btn-block",
              id: "swaprows",
              onclick: swapRows,
            }}
          >
            Swap Rows
          </button>
        </div>
      </div>
    );
  },
});
