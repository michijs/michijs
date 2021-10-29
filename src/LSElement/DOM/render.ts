import { ObjectJSXElement } from '../types';
import { renderFunctionalComponent } from './renderFunctionalComponent';

function renderSync<T extends HTMLElement>(Component: JSX.Element, placeToRender: Element = document.body) {
  placeToRender.textContent = '';
  const result = renderFunctionalComponent(Component);
  placeToRender.appendChild(result);
  return document.getElementById((Component as ObjectJSXElement).attrs['id']) as T;
}

export async function render<T extends HTMLElement>(Component: JSX.Element, placeToRender?: Element): Promise<T> {
  return new Promise((resolve) => {
    if (document.readyState !== 'complete') {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          resolve(renderSync<T>(Component, placeToRender));
        }
      });
    } else {
      resolve(renderSync<T>(Component, placeToRender));
    }
  });
}
