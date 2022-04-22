import { ListFactory } from '../DOMDiff/ListFactory';
import { ObjectFactory } from '../DOMDiff/ObjectFactory';

export function renderSync(Component: JSX.Element, mountPoint: ParentNode = document.body) {
  mountPoint.textContent = '';
  if (Array.isArray(Component))
    new ListFactory(Component).update(mountPoint, false);
  else
    ObjectFactory.updateChildren(mountPoint, [Component], false);
  return mountPoint;
}

export async function render(Component: JSX.Element, mountPoint: ParentNode): Promise<ParentNode> {
  return new Promise((resolve) => {
    if (document.readyState !== 'complete')
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete')
          resolve(renderSync(Component, mountPoint));
      });
    else
      resolve(renderSync(Component, mountPoint));
  });
}
