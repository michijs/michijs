/**
 * @typedef {object} Trace
 */

export const trace = (message) => {
    try {
        throw new Error();
    }
    catch (ex) {
        console.log(message, ex);
    }
};
