import { createCustomElement, Host, useObserve } from "@michijs/michijs";
import { Router } from "./routes";
// import sheet from './a.css' assert { type: 'css' };
// console.log(sheet)

createCustomElement("root-test-element", {
  shadow: false,
  render() {
    return (
      <Host>
        <Router />
      </Host>
    );
  },
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
