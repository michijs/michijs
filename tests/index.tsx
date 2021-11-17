import { createCustomElement, h, Host } from '../src';
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
  render() {
    return (
      <Host>
        <Router />
        {this.arrayTest.map(x => <div key={x} onclick={this.onClickArray}>{x}</div>)}
      </Host>
    );
  }
});

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