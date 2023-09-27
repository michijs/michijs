import { useStringTemplate } from "../hooks";
import { FC, ObservableType } from "../types";
import { bindObservable } from "../utils";

export const Title: FC<{ children: ObservableType<string> }> = ({ children }) => {
  const template = useStringTemplate`<Title>${children[0]}<Title>`
  const comment = document.createComment('');
  bindObservable(template, (newValue) => comment.textContent = newValue);
  bindObservable(children[0], (newValue) => document.title = newValue);
  return comment;
}