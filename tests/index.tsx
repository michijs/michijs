import { createCustomElement, Host, If, useObserve } from "../src";
import { ColorSelector } from "./ColorSelector";
import { Router } from "./routes";

const FALSE_VALUE = useObserve(false);
console.log(FALSE_VALUE ? 'false': 'true')
// import sheet from './a.css' assert { type: 'css' };
// console.log(sheet)

createCustomElement("root-test-element", {
  reflectedAttributes: {
    // arrayTest: new ElementList(0, 1, 2, 3, 4, 5, 6),
    arrayTest: [0, 1, 2, 3, 4, 5],
  },
  shadow: false,
  methods: {
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
        <div onclick={this.onClickArray}>
          {this.arrayTest}
        </div>
        {/* <this.arrayTest.List
          renderItem={(item) => <div onclick={this.onClickArray}>{item}</div>}
        /> */}
      </Host>
    );
  },
});

// TODO:
// Fix Title component
// Fix List beign undefined not allowed as jsx
// Finish map and set
// 




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
