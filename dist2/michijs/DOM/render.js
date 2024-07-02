import { create } from "../DOMDiff";

/**
 * @param {JSX.Element} Component
 * @param {ParentNode} [mountPoint=document.body]
 * @returns {ParentNode}
 */
export function renderSync(Component, mountPoint = document.body) {
  mountPoint.textContent = "";
  const renderResult = create(Component);
  mountPoint.append(renderResult);
  return mountPoint;
}

/**
 * @param {JSX.Element} Component
 * @param {ParentNode} mountPoint
 * @returns {Promise<ParentNode>}
 */
export async function render(Component, mountPoint) {
  return new Promise((resolve) => {
    if (document.readyState !== "complete")
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete")
          resolve(renderSync(Component, mountPoint));
      });
    else resolve(renderSync(Component, mountPoint));
  });
}
