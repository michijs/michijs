import {
  supportedHTMLElements,
  supportedMathMLElements,
  supportedSVGElements,
} from '@michijs/htmltype/supported';
import { writeFileSync, rmSync, mkdirSync } from 'fs';

const elements = new Map<string, string[]>();

supportedHTMLElements.forEach((x) => {
  elements.set(x, [`Tag<HTMLElementTagNameMap["${x}"], HTMLElements["${x}"]>`]);
});
supportedMathMLElements.forEach((x) => {
  elements.set(x, [`Tag<MathMLElement, MathMLElements["${x}"]>`]);
});
supportedSVGElements.forEach((x) => {
  const newItems = [`Tag<SVGElementTagNameMap["${x}"], SVGElements["${x}"]>`];
  elements.get(x)?.push(...newItems) ?? elements.set(x, newItems);
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
