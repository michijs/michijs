import { ElementFactory } from '../..';

export const CommentFactory: ElementFactory = {
  compare(el: Element): boolean {
    return el.nodeType === 8;
  },
  create() {
    return document.createComment('');
  }
};
