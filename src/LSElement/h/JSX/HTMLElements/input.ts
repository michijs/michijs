import { GetAttributes, GetMinAndMax, GetType, GetValue } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { Color, DateLocalString, DateString, MonthString, TimeString, Type, WeekString } from "../DOMAttributes/types";
import { AllAttributes } from "../DOMAttributes/AllAttributes";

export type inputType<T extends Type['Input']> = GetType<'Input', T>;

export type InputAttributeSet<A extends keyof AllAttributes, T extends Type['Input']> = inputType<T> & GetAttributes<A>;
export type InputValueSet<T extends Type['Input'], V> = inputType<T> & GetValue<V>;

type baseInput = GlobalAttributes & GetAttributes<
    'autocomplete'
    | 'autofocus'
    | 'disabled'
    | 'form'
    | 'list'
    | 'name'
    | 'readonly'
    | 'required'
>

export type input = Partial<baseInput & (
    InputAttributeSet<'accept', 'file'>
    | InputAttributeSet<'alt', 'image'>
    | InputAttributeSet<'capture', 'file'>
    | InputAttributeSet<'indeterminate', 'checkbox'>
    | InputAttributeSet<'checked', 'radio' | 'checkbox'>
    | InputAttributeSet<'dirname', 'text' | 'search'>
    | InputAttributeSet<'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget', 'image' | 'submit'>
    | InputAttributeSet<'height', 'image'>
    | InputAttributeSet<'multiple', 'email' | 'file'>
    | InputAttributeSet<'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength', 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'>
    | InputAttributeSet<'src', 'image'>
    | InputAttributeSet<'step', 'number' | 'date' | 'datetime-local' | 'month' | 'range'>
    | InputAttributeSet<'width', 'image'>
    | (GetMinAndMax<DateString> & inputType<'date'>)
    | (GetMinAndMax<DateLocalString> & inputType<'datetime-local'>)
    | (GetMinAndMax<MonthString> & inputType<'month'>)
    | (GetMinAndMax<TimeString> & inputType<'time'>)
    | (GetMinAndMax<WeekString> & inputType<'week'>)
    | (GetMinAndMax<number> & inputType<'number' | 'range'>)
    | InputValueSet<'button' | 'checkbox' | 'radio' | 'email' | 'file' | 'hidden' | 'password' | 'reset' | 'search' | 'email' | 'submit' | 'url' | 'text', string>
    | InputValueSet<'color', Color>
    | InputValueSet<'date', DateString>
    | InputValueSet<'datetime-local', DateLocalString>
    | InputValueSet<'month', MonthString>
    | InputValueSet<'time', TimeString>
    | InputValueSet<'week', WeekString>
    | InputValueSet<'number' | 'range', number>
)>;