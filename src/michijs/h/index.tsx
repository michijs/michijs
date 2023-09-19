import { Fragment } from "../components/Fragment";

export const h = {
  createElement(jsxTag, attrs, ...childrenProps): JSX.Element {
    const { children: attrsChildren, key, ...finalAttrs } = attrs ?? {};

    return {
      jsxTag,
      attrs: {
        ...finalAttrs,
        children:
          childrenProps.length > 0 || !attrsChildren
            ? childrenProps
            : attrsChildren,
      },
      key,
    };
  },
  Fragment,
};
