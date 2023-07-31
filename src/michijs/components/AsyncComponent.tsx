import { create } from "../DOMDiff";
import { isChildNode } from "../typeWards/isChildNode";
import { CreateOptions } from "../types";

interface AsyncComponentProps<J> {
  promise: Promise<J>,
  render(promiseResult: J): JSX.Element,
  loadingComponent?: JSX.Element
}

export const AsyncComponent = <J extends unknown>(props: AsyncComponentProps<J>, context: CreateOptions) => {
  const el = props.loadingComponent ? create(props.loadingComponent, context) : document.createComment('');
  // Intentional
  const elChildNodes = Array.from(el.childNodes);

  props.promise.then(promiseResult => {
    const newEl = create(props.render(promiseResult), context);
    if (isChildNode(el))
      el.replaceWith(newEl)
    else {
      const firstNode = elChildNodes.pop();
      if (firstNode) {
        firstNode.replaceWith(newEl);
        elChildNodes.forEach(x => x.remove())
      } else 
        throw "Empty loading components are not allowed"
    }
  })

  return el;
}