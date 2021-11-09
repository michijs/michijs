import type { FC } from '../types';
import { h } from '../h';
import { HTMLElements } from '../h/tags/HTMLElements';
import { SVGElements } from '../h/tags/SVGElements';
import { goTo } from '../routing';

type LinkProps = Omit<HTMLElements['a'] & SVGElements['a'], 'href'> & {
  state?: any,
  title?: string,
  url: URL | string
}

/**Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the goTo method. */
export const Link: FC<LinkProps> = ({ state = {}, title = document.title, url, ...attrs }, self) => {
  return <a {...attrs}
    href={typeof url === 'string' ? url : url.href}
    onclick={(e) => {
      e.preventDefault();
      goTo(url);
      attrs.onclick?.apply(self, [e]);
    }} />;
};