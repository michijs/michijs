const h = {
  createElement(tag, attrs, ...childrenProps): JSX.Element {
    const el = document.createElement(tag);
    const { children: attrsChildren, key, ...finalAttrs } = attrs ?? {};

    Object.entries(finalAttrs).forEach(([key, value]) => {
      if (typeof value === "function" && value.subscribe) {
        value.subscribe(() => {
          el.setAttribute(key, value());
        });
        el.setAttribute(key, value());
      } else {
        el.setAttribute(key, value);
      }
    });

    return el;
  },
};

type Observable<T> = (T extends object
  ? { [K in keyof T]: Observable<T[K]> }
  : (newValue: T) => T) & { subscribe(): void };

const callbacks = [];

const createObservable = <T extends object>(obj: T): Observable<T> => {
  return new Proxy<T>(obj, {
    get(target, p) {
      if (typeof target[p] !== "object") {
        const notify = () => {
          callbacks.forEach((callback) => callback());
        };

        const observableValue = (newValue) => {
          if (newValue !== undefined && target[p] !== newValue) {
            target[p] = newValue;
            notify();
          }
          return target[p];
        };
        observableValue.subscribe = (callback) => callbacks.push(callback);
        return observableValue;
      }
    },
  }) as unknown as Observable<T>;
};

const b = createObservable({
  count: "123",
});

const a = <input type="text" value={b.count} />;

const button = document.createElement("button");
button.textContent = "xd";

button.onclick = () => {
  b.count(Math.random().toString());
  console.log(a);
};

document.body.innerHTML = "";
document.body.append(button);
document.body.append(a);

const A = {
  valueOf() {
    return 3;
  },

  toString() {
    return "3";
  },

  subscribe() {
    console.log("xd");
  },
} as unknown as number & { subscribe(): void };

const tests = 2 + A;

console.log(tests, A.subscribe);
