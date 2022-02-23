import { createCustomElement, h, Host } from '../src';
import { getAttributeOrProperty } from '../src/LSElement/DOM/attributes/getAttributeOrProperty';
import { setAttributeOrProperty } from '../src/LSElement/DOM/attributes/setAttributeOrProperty';
import { HTMLElements } from '../src/LSElement/h/tags/HTMLElements';
import { Router } from './routes';
// // // import sheet from './a.css' assert { type: 'css' };
// // // console.log(sheet)
createCustomElement('ls-root-test-element', {
  reflectedAttributes: {
    arrayTest: [1, 2, 3, 4, 5]
  },
  shadow: false,
  transactions: {
    onClickArray() {
      this.arrayTest.push(this.arrayTest.length + 1);
    }
  },
  observe: {
    'arrayTest.6'() {
      console.log('6 Added');
    }
  },
  render() {
    return (
      <Host>
        <Router />
        {this.arrayTest.map(x => <div key={x} onclick={this.onClickArray}>{x}</div>)}
      </Host>
    );
  }
});

type TAttrs<k extends keyof HTMLElements> = Omit<HTMLElements[k], 'children'> & {
  children?: T[]
};

type TFunction<k extends keyof HTMLElements> = (attributes?: TAttrs<k>) => (
  TAttrs<k>
  & {
    setAttributes(attributes: HTMLElements[k]),
    element: T
  }
)

type T = { [k in keyof HTMLElements]: TFunction<k> }

const t = new Proxy<T>({} as T, {
  get(_1, p: keyof T) {
    const el = document.createElement(p);
    const tFunction: TFunction<typeof p> = ({ children, ...attributes }) => {
      Object.entries(attributes).forEach(([key, value]) => {
        setAttributeOrProperty(el, key, value);
      });
      return new Proxy<ReturnType<TFunction<typeof p>>>({} as ReturnType<TFunction<typeof p>>, {
        get(_2, propertyName: keyof ReturnType<TFunction<typeof p>>) {
          switch (propertyName) {
            case 'element':
              return el;
            case 'setAttributes':
              return (attributes) => {
                Object.entries(attributes).forEach(([key, value]) => {
                  setAttributeOrProperty(el, key, value);
                });
              };
            default: {
              // TODO: what if its an object?
              return getAttributeOrProperty(el, propertyName);
            }
          }
        },
        set(_2, p: string, value: any) {
          setAttributeOrProperty(el, p, value);
          return true;
        }
      });
    };
    return tFunction;
  }
});

const div = t.div({
  class: 'xd'
});

div.setAttributes({
  style: { backgroundColor: 'red', color: 'blue' }
});
div.class='asdf';
console.log(div.element);

// documentTransition test
// const titulo1 = document.createElement('h1');
// titulo1.textContent = 'hola 1'
// const titulo2 = document.createElement('h1');
// titulo2.textContent = 'hola 2'

// document.body.appendChild(titulo1)
// setTimeout(async () => {
//     if ('documentTransition' in document) {
//         // @ts-ignore
//         await document.documentTransition.prepare({
//             rootTransition: 'cover-up',
//             // sharedElements: [element1, element2, element3],
//         });
//         // This is a function within the web app:
//         document.body.appendChild(titulo2)
//         // Start the transition.
//         // @ts-ignore
//         await document.documentTransition.start({
//             // sharedElements: [element1, element4, element5],
//         });

//     }
// }, 300)

// const unproxyfy = (object: unknown) => {
//     if (typeof object === 'object') {
//         const unproxyfiedObject = {};
//         Object.entries(object).forEach(([key, value]) => {
//             unproxyfiedObject[key] = unproxyfy(value)
//         })

//         return unproxyfiedObject;
//     }else{
//         return object;
//     }
// }
// console.log(unproxyfy(a))