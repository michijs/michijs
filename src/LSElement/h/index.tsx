import { Fragment } from '../components/Fragment';

export const h = {
  createElement(tag, attrs, ...children): JSX.Element {
    return { tag, attrs: { ...attrs, children: attrs?.children ?? children }, };
  },
  Fragment
};
