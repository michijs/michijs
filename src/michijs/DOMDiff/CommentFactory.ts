import { ElementFactory } from "../..";

export const CommentFactory: ElementFactory = {
  compare(el: Element): boolean {
    return el.nodeType === Node.COMMENT_NODE;
  },
  create() {
    return document.createComment("");
  },
};
