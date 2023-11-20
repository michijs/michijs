import { TypedEvent } from "./TypedEvent";
export interface TypedSubmitEvent<T> extends TypedEvent<T>, Pick<SubmitEvent, "submitter"> {
}
