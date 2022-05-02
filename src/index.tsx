import './LSElement/prototypeAddons';
export { h } from './LSElement/h';
export * from './LSElement/constants';
export * from './LSElement/components';
export * from './LSElement/classes';
export * from './LSElement/hooks';
export * from './LSElement/routing';
export * from './LSElement/types';
export * from './LSElement/DOM';
export * from './LSElement/DOMDiff';
export * from './LSElement/i18n';
// Fix for unit tests
export type { Attributes, Events, HTMLElements, SVGElements } from '@lsegurado/htmltype';
import './LSElement/h/JSX';
export { createCustomElement } from './LSElement/customElements/createCustomElement';
export { createStyleSheet, css } from './LSElement/css/createStyleSheet';