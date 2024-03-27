 import { HTMLElements as HTMLElementsHTMLType, MathMLElements, SVGElements as SVGElementsHTMLType } from "./htmlType";
  import { SingleJSXElement } from '../types';

  interface ElementsInterfaceOverride {
    title: HTMLElementTagNameMap['title'] & SVGElementTagNameMap['title'],
style: HTMLElementTagNameMap['style'] & SVGElementTagNameMap['style'],
a: HTMLElementTagNameMap['a'] & SVGElementTagNameMap['a'],
script: HTMLElementTagNameMap['script'] & SVGElementTagNameMap['script']
  }
  type HTMLElements = HTMLElementsHTMLType<ElementsInterfaceOverride>;
  type SVGElements = SVGElementsHTMLType<ElementsInterfaceOverride>;

  declare global {
    namespace JSX {
      type Element = SingleJSXElement
      interface ElementChildrenAttribute {
        children: SingleJSXElement; // specify children name to use
      }
      // interface IntrinsicAttributes {
      //   children?: SingleJSXElement;
      // }
      interface IntrinsicElements extends HTMLElements, MathMLElements, SVGElements {
        a: HTMLElements["a"] & SVGElements["a"];
script: HTMLElements["script"] & SVGElements["script"];
style: HTMLElements["style"] & SVGElements["style"];
title: HTMLElements["title"] & SVGElements["title"];
      }
    }
  }