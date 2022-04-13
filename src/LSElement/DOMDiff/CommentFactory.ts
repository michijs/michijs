import { ElementFactory, EmptyType } from '../..';

export class CommentFactory implements ElementFactory {
    jsx: EmptyType;
    compare(el: Element): boolean {
      return el.nodeType === 8;
    }
    create() {
      return document.createComment('');
    }
}
