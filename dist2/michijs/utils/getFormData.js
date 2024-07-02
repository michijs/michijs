/**
 * @typedef {import('../generated/htmlType').TypedEvent} TypedEvent
 */

/**
 * @template T
 * @param {TypedEvent<HTMLFormElement> | HTMLFormElement} formOrEvent
 * @returns {T}
 */
export const getFormData = (formOrEvent) => {
    const form = (formOrEvent instanceof Event ? formOrEvent.target : formOrEvent);
    // @ts-ignore
    return Object.fromEntries(new FormData(form));
};
