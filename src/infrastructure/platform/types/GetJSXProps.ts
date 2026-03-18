
export type GetJSXProps<El> = El extends (...args: infer Y) => any
  ? Y[0]
  : El extends {
        new (...args: infer T): any;
      }
    ? T[0]
    : El extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[El]
      : {};