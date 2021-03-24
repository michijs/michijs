import { GetAttributes, GetMinAndMax, GetRoles, GetType, GetValue } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { Color, DateLocalString, DateString, MonthString, TimeString, Type, WeekString } from '../DOMAttributes/types';
import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { AllRoles } from '../DOMAttributes/Roles';

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

export type InputFactory<T extends Type['Input'], A extends keyof AllAttributes = 'id', R extends AllRoles = never> = Partial<
    baseInput &
    GetType<'Input', T> &
    Pick<AllAttributes, A> &
    GetRoles<R>
>

type InputFactoryWithValue<T extends Type['Input'], A extends keyof AllAttributes = 'id', R extends AllRoles = never, V = string> = & InputFactory<T, A, R> & Partial<GetValue<V>>
type NumericInputFactoryWithValue<T extends Type['Input'], A extends keyof AllAttributes = 'id', R extends AllRoles = never, V = number> = InputFactoryWithValue<T, A, R, V> & Partial<GetMinAndMax<V>>

export interface ImageInput extends InputFactory<'image',
    'alt' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget' | 'height' | 'src' | 'width',
    'link' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'radio' | 'switch'
> { }

export interface FileInput extends InputFactoryWithValue<'file', 'accept' | 'capture' | 'multiple'> { }
export interface CheckboxInput extends InputFactoryWithValue<'checkbox',
    'checked' | 'indeterminate',
    'button' | 'menuitemcheckbox' | 'option' | 'switch'
> { }
export interface RadioInput extends InputFactoryWithValue<'radio', 'checked', 'menuitemradio'> { }
export interface TextInput extends InputFactoryWithValue<'text',
    'dirname' | 'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength',
    'combobox' | 'searchbox' | 'spinbutton'
> { }
export interface SearchInput extends InputFactoryWithValue<'search', 'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength'> { }
export interface SubmitInput extends InputFactoryWithValue<'submit', 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget'> { }
export interface EmailInput extends InputFactoryWithValue<'email', 'multiple' | 'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength'> { }
export interface PasswordInput extends InputFactoryWithValue<'password', 'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength'> { }
export interface TelInput extends InputFactoryWithValue<'tel', 'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength'> { }
export interface UrlInput extends InputFactoryWithValue<'url', 'pattern' | 'placeholder' | 'size' | 'maxlength' | 'minlength'> { }
export interface ButtonInput extends InputFactoryWithValue<'button', 
'id',
'link' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'radio' | 'switch' | 'tab'
> { }
export interface ResetInput extends InputFactoryWithValue<'reset', 'id'> { }
export interface HiddenInput extends InputFactoryWithValue<'hidden', 'id'> { }
export interface ColorInput extends InputFactoryWithValue<'color', 'id', never, Color> { }

export interface NumberInput extends NumericInputFactoryWithValue<'number', 'step', never, number> { }
export interface RangeInput extends NumericInputFactoryWithValue<'range', 'step', never, number> { }
export interface DateInput extends NumericInputFactoryWithValue<'date', 'step', never, DateString> { }
export interface DatetimeLocalInput extends NumericInputFactoryWithValue<'datetime-local', 'step', never, DateLocalString> { }
export interface MonthInput extends NumericInputFactoryWithValue<'month', 'step', never, MonthString> { }
export interface TimeInput extends NumericInputFactoryWithValue<'time', 'id', never, TimeString> { }
export interface WeekInput extends NumericInputFactoryWithValue<'week', 'id', never, WeekString> { }

export type input = ImageInput
    | FileInput
    | CheckboxInput
    | RadioInput
    | TextInput
    | SearchInput
    | SubmitInput
    | EmailInput
    | PasswordInput
    | TelInput
    | UrlInput
    | ButtonInput
    | ResetInput
    | HiddenInput
    | ColorInput
    | NumberInput
    | RangeInput
    | DateInput
    | DatetimeLocalInput
    | MonthInput
    | TimeInput
    | WeekInput