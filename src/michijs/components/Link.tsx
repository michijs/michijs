import type { FC } from '../types';
import { h } from '../h';
import { goTo } from '../routing';
import { HTMLElements } from '@michijs/htmltype';
import { Tag } from '../h/Tag';

type LinkProps = {
  state?: any,
  title?: string,
  url: URL | string
} & Tag<HTMLElements['a'], HTMLElementTagNameMap['a']>

/**Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the goTo method. */
export const Link: FC<LinkProps> = ({ state = {}, title = document.title, url, ...attrs }, self) => {
  const href = typeof url === 'string' ? url : url.href;
  return <a {...attrs}
    href={href}
    onclick={(e) => {
      try {
        e.preventDefault();
        goTo(url);
        attrs.onclick?.apply(self, [e]);
      } catch {
        window.location.href = href;
      }
    }}
  />;
};