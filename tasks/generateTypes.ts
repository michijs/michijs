import {
  supportedHTMLElements,
  supportedMathMLElements,
  supportedSVGElements,
} from '@michijs/htmltype/supported';
import { writeFileSync, rmSync, mkdirSync } from 'fs';

const elements = new Map<string, string[]>();

supportedHTMLElements.forEach((x) => {
  elements.set(x.tagName, [
    `HTMLElements["${x.tagName}"]`,
    `Tag<${x.elementInterface}>`,
  ]);
});
supportedMathMLElements.forEach((x) => {
  elements.set(x.tagName, [
    `MathMLElements["${x.tagName}"]`,
    `Tag<${x.elementInterface}>`,
  ]);
});
supportedSVGElements.forEach((x) => {
  const newItems = [
    `SVGElements["${x.tagName}"]`,
    `Tag<${x.elementInterface}>`,
  ];
  elements.get(x.tagName)?.push(...newItems) ??
    elements.set(x.tagName, newItems);
});

rmSync('./src/michijs/h/generated', { recursive: true, force: true });
mkdirSync('./src/michijs/h/generated');

writeFileSync(
  './src/michijs/h/generated/JSX.ts',
  ` import { HTMLElements, MathMLElements, SVGElements } from "@michijs/htmltype";
  import { Tag } from "../Tag";
  import { SingleJSXElement } from '../../types';
  
  declare global {
    namespace JSX {
      type Element = SingleJSXElement;
      interface ElementChildrenAttribute {
        children: JSX.Element; // specify children name to use
      }
      interface IntrinsicElements extends HTMLElements, MathMLElements, SVGElements {
        ${Array.from(elements)
          .sort()
          .map(([key, types]) => `${key}: ${types.join(' & ')};`)
          .join('\n')}
      }
    }
  }`,
);
