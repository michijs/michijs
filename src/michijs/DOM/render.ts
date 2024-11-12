import { create } from "./create";

export function renderSync(
  Component: JSX.Element,
  mountPoint: ParentNode = document.body,
): ParentNode {
  mountPoint.textContent = "";
  const renderResult = create(Component);
  mountPoint.append(renderResult);
  return mountPoint;
}

export async function render(
  Component: JSX.Element,
  mountPoint: ParentNode,
): Promise<ParentNode> {
  return new Promise((resolve) => {
    if (document.readyState !== "complete")
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete")
          resolve(renderSync(Component, mountPoint));
      });
    else resolve(renderSync(Component, mountPoint));
  });
}
