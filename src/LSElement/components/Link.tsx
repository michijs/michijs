import type { FC } from '../types';
import { h } from '../h';
import { HTMLElements } from '../h/tags/HTMLElements';
import { SVGElements } from '../h/tags/SVGElements';
import { WINDOW_URL_CHANGE_EVENTS } from '../constants';

type LinkProps = Omit<HTMLElements['a'] & SVGElements['a'], 'href'> & {
    state?: any,
    title?: string,
    url: URL | string
}

export const Link: FC<LinkProps> = ({ state = {}, title = document.title, url, ...attrs }, children, self) => {
  return <a {...attrs} href={typeof url === 'string' ? url : url.href} onclick={(e) => { e.preventDefault(); window.history.pushState(state, title, url); window.dispatchEvent(new Event(WINDOW_URL_CHANGE_EVENTS.PUSH_STATE)); attrs.onclick?.apply(self, [e]); }}>{children}</a>;
};