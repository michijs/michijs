interface Trace {
  (message?: unknown): void;
}

export const trace: Trace = (message) => {
  try {
    throw new Error();
  } catch (ex) {
    console.log(message, ex);
  }
};
