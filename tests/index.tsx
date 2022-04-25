import { createCustomElement, h, Host, render } from '../src';
import { Router } from './routes';
// // import sheet from './a.css' assert { type: 'css' };
// // console.log(sheet)

createCustomElement('ls-root-test-element', {
  reflectedAttributes: {
    // arrayTest: new ElementList([0, 1, 2, 3, 4, 5, 6])
    arrayTest: [0, 1, 2, 3, 4, 5, 6]
  },
  shadow: false,
  transactions: {
    onClickArray() {
      // this.arrayTest.push(this.arrayTest.getData().length);
      this.arrayTest.push(this.arrayTest.length);
      // this.arrayTest.splice(1,1, 25);
    }
  },
  // observe: {
  //   'arrayTest.6'() {
  //     console.log('6 Added');
  //   }
  // },
  render() {
    return (
      <Host>
        <Router />
        {this.arrayTest.map(item => <div key={item} onclick={this.onClickArray}>{item}</div>)}
        {/* <this.arrayTest.target>
          {(item) => <div onclick={this.onClickArray}>{item}</div>}
        </this.arrayTest.target> */}
      </Host>
    );
  }
});
// TODO:
// Add a list element with as attribute
// Fix type
// update readme
// Unit tests arrays
// Unit tests some functions from element list
// const a = new CSSStyleSheet();
// a.replaceSync('fragment, ls-list, *:slotted(fragment) { display: contents }')
// document.adoptedStyleSheets = [a, ...document.adoptedStyleSheets];
// console.log()
// unlinked attributes ex: <div {bla ? ...obj1: ...obj2}/>
// and obj2 has an attribute that obj1 does not that attribute will be unlinked...
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