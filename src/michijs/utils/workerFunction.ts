const workerFunctionBody = (() => {
  onmessage = ({ data: { functionToExecute, args } }) => {
    const wrapper = (fn: Function) =>
      Function(`"use strict"; return (${fn.toString()})`)();
    const result = wrapper(functionToExecute)(...args);
    postMessage(result);
  };
  // Removes first () => { and last }
})
  .toString()
  .replace(/^[^{]*{\s*/, "")
  .replace(/\s*}[^}]*$/, "");

export function workerFunction<T extends (...args: any) => any>(
  functionToExecute: T,
) {
  return (...args: Parameters<T>) =>
    new Promise<ReturnType<T>>((resolve, reject) => {
      const worker = new Worker(
        URL.createObjectURL(
          new Blob([workerFunctionBody], { type: "text/javascript" }),
        ),
      );
      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };
      worker.onerror = worker.onmessageerror = reject;
      worker.postMessage({
        functionToExecute: functionToExecute.toString(),
        args,
      });
      return worker;
    });
}
