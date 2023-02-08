import type { Events } from '@michijs/htmltype';

export const getFormData = <T>(formOrEvent: Events.TypedEvent<HTMLFormElement> | HTMLFormElement): T => {
  const form = (formOrEvent instanceof Event ? formOrEvent.target : formOrEvent) as HTMLFormElement;
  // @ts-ignore
  return Object.fromEntries(new FormData(form)) as T;
};