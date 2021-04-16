export const h = {
  createElement(tag, attrs, ...children): JSX.Element {
    return { tag, attrs, children };
  },
};