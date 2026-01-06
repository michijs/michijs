import type { TypedEvent } from "./TypedEvent";
export interface TypedFormDataEvent<T> extends TypedEvent<T> {
    /**
     * Returns a FormData object representing names and values of elements associated to the target form. Operations on the FormData object will affect form data to be submitted.
     */
    readonly formData: FormData;
}
