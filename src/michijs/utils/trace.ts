export const trace = (message?: unknown) => {
  try {
    throw new Error();
  } catch (ex) {
    console.log(message, ex);
  }
};
