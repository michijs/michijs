/**
 * @param {number} time
 * @returns {Promise<void>}
 */
export const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
