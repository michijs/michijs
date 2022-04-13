
export function runInWorker<T extends (...args: any) => any>(computation: T, ...message: Parameters<T>) {
  const delegate = () => {
    onmessage = ({ data: { computation, message } }) => {
      const wrapper = (fn) => Function(`"use strict"; return (${  fn.toString()  })`)();
      const result = wrapper(computation)(...message);
      postMessage(result);
    };
  };
  const functionBody = delegate.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
  return new Promise((resolve, reject) => {
    const worker = new Worker(URL.createObjectURL(
      new Blob([functionBody], { type: 'text/javascript' })
    ));
    worker.onmessage = ({ data }) => {
      resolve(data);
      worker.terminate();
    };
    worker.onerror = worker.onmessageerror = reject;
    worker.postMessage({ computation: computation.toString(), message });
    return worker;
  });
}