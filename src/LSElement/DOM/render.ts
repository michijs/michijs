import { renderFunctionalComponent } from './renderFunctionalComponent';

export function render<T extends HTMLElement>(Component, placeToRender = document.body): T {
  placeToRender.textContent = '';
  const result = renderFunctionalComponent(Component);
  placeToRender.appendChild(result);
  return document.getElementById(Component.attrs['id']) as T;
}
