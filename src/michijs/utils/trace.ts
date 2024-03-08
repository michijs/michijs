export const trace = (message?: unknown) => {
  try {
    throw new Error(message);
  } catch (ex) {
    console.log(ex);
  }
};
