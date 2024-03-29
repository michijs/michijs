import { createCustomElement, h, Host } from "../src";
import { ColorSelector } from "./ColorSelector";
import { Router } from "./routes";
// // import sheet from './a.css' assert { type: 'css' };
// // console.log(sheet)

createCustomElement("root-test-element", {
  reflectedAttributes: {
    // arrayTest: new ElementList(0, 1, 2, 3, 4, 5, 6),
    arrayTest: [0, 1, 2, 3, 4, 5],
  },
  shadow: false,
  transactions: {
    onClickArray() {
      this.arrayTest.push(7, 8);
      // this.arrayTest = [0, 1, 2, 3, 6]
      // this.arrayTest.reverse();
      // this.arrayTest.pop();
      // this.arrayTest.shift();
      // Scenario
      // this.arrayTest = [6, 3, 2, 1, 0]
    },
  },
  fakeRoot: false,
  observe: {
    "arrayTest.6"() {
      console.log("6 Added");
    },
  },
  render() {
    return (
      <Host>
        <Router />
        <math display="block">
          <mfrac>
            <mn>{this.arrayTest.length}</mn>
            <msqrt>
              <mn>2</mn>
            </msqrt>
          </mfrac>
        </math>
        {/* <List
          as='div'
          data={this.arrayTest}
          renderItem={item => <div key={item} onclick={this.onClickArray}>{item}</div>}
        /> */}
        <ColorSelector />
        {this.arrayTest.map((item) => (
          <div key={item} onclick={this.onClickArray}>
            {item}
          </div>
        ))}
        {/* <this.arrayTest.List
          renderItem={(item) => <div onclick={this.onClickArray}>{item}</div>}
        /> */}
      </Host>
    );
  },
});

// const a = indexeddbObservable<
//   {
//     logs: {
//       test: string
//     }
//   }
// >('testdb', {
//   logs: {
//     keyPath: 'test'
//   }
// })

// await wait(2000);
// a.logs.add({
//   test: 'xd2'
// })
// a.logs.add({
//   test: 'xd3'
// })
// console.log(a.logs.getAll().result)
// TODO:
// Update readme
// check blank space in template
// Deploy live demo
// Remove param from htmlElements since is deprecated
// Unit tests some functions from element list
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
