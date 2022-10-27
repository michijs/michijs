import { TypedEvent } from '@lsegurado/htmltype/dist/Events';

export const getFormData = <T>(formOrEvent: TypedEvent<HTMLFormElement> | HTMLFormElement): T => {
  const form = (formOrEvent instanceof Event ? formOrEvent.target : formOrEvent) as HTMLFormElement;
  const formData = new FormData(form);
  const object = {};
  formData.forEach((value, key) => object[key] = value);
  return object as T;
};