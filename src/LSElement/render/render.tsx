import { renderFunctionalComponent } from '../..';

export function render<T extends HTMLElement>(Component, placeToRender = document.body): T {
  placeToRender.innerHTML = '';
  const result = renderFunctionalComponent(Component);
  placeToRender.appendChild(result);
  return document.getElementById(Component.attrs['id']) as T;
}
