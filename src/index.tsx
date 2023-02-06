import './michijs/prototypeAddons';
export { h } from './michijs/h';
export { jsx, jsxs, jsxDEV, Fragment } from './michijs/h/jsx-runtime';
export * from './michijs/constants';
export * from './michijs/components';
export * from './michijs/classes';
export * from './michijs/hooks';
export * from './michijs/routing';
export * from './michijs/types';
export * from './michijs/DOM';
export * from './michijs/DOMDiff';
export * from './michijs/i18n';
// Fix for unit tests
export type { Attributes, Events, HTMLElements, SVGElements } from '@michijs/htmltype';
import './michijs/h/JSX';
export * from './michijs/customElements';
export * from './michijs/css';
export * from './michijs/utils';