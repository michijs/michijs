import { TypedEvent } from '@lsegurado/htmltype/dist/Events';

export const getFormData = <T>(formOrEvent: TypedEvent<HTMLFormElement> | HTMLFormElement): T => {
  const form = (formOrEvent instanceof Event ? formOrEvent.target : formOrEvent) as HTMLFormElement;
  // @ts-ignore
  return Object.fromEntries(new FormData(form)) as T;
};