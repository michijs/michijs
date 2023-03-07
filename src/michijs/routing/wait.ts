export const wait = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
