import { useStringTemplate } from "../hooks";
import { FC } from "../types";
import { bindObservable } from "../utils";

export const Title: FC<{ children: string }> = ({ children }) => {
  const template = useStringTemplate`<Title>${children}<Title>`
  const comment = document.createComment('');
  bindObservable(template, (newValue) => {
    if (newValue)
      comment.textContent = newValue
  });
  bindObservable(children, (newValue) => {
    if (newValue)
      document.title = newValue
  });
  return comment;
}