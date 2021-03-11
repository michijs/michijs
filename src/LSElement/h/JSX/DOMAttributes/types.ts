import { Properties } from "csstype";

export type As = 'audio'
    | 'document'
    | 'embed'
    | 'fetch'
    | 'font'
    | 'image'
    | 'object'
    | 'script'
    | 'style'
    | 'track'
    | 'video'
    | 'worker'
export type Autocapitalize = OnOff | 'none' | 'sentences' | 'words' | 'characters';
export type Autocomplete = OnOff
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level1'
    | 'address-level2'
    | 'address-level3'
    | 'address-level4'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
export type Capture = 'user' | 'environment'
export type Charset = string; //TODO: find all languages
export type Color = `#${string}`;
export type Crossorigin = 'anonymous' | 'use-credentials'
export type CSSProperties = Properties & { [selector: string]: string };
export type WeekString = `${number}-W${number}`;
export type TimeString = `${number}:${number}`;
export type MonthString = `${number}-${number}`;
export type DateString = `${MonthString}-${number}`;
export type DateLocalString = `${DateString}T${TimeString}`;
export type Decoding = 'sync' | 'async' | 'auto';
export type Dir = 'ltr'
    | 'rtl'
    | 'auto';
export type Enctype = string;
export type EnterKeyHint = 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
export type HTTPEquiv = 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
export type InputMode = 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
export type Kind = 'captions'
    | 'chapters'
    | 'descriptions'
    | 'metadata'
    | 'subtitles'
export type Language = string; //TODO: find all languages
export type Loading = 'eager' | 'lazy';
export type Method = 'get' | 'post';
export type MIMEType = string;
export type OnOff = 'on' | 'off';
export type Preload = 'auto' | 'metadata' | 'none';
export type ReferrerPolicy = 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
export type Rel = 'alternate' |
    'author' |
    'bookmark' |
    'external' |
    'help' |
    'license' |
    'next' |
    'nofollow' |
    'noopener' |
    'noreferrer' |
    'prev' |
    'search' |
    'tag';
export type Sandbox = true
    | 'allow-downloads'
    | 'allow-forms'
    | 'allow-modals'
    | 'allow-orientation-lock'
    | 'allow-pointer-lock'
    | 'allow-popups'
    | 'allow-popups-to-escape-sandbox'
    | 'allow-presentation'
    | 'allow-same-origin'
    | 'allow-scripts'
    | 'allow-top-navigation'
    | 'allow-top-navigation-by-user-activation';
export type Scope = 'col' | 'row' | 'colgroup' | 'rowgroup';
export type Shape = 'rect' | 'circle' | 'poly' | 'default';
export type StringBoolean = "true" | "false";
export type Target = '_self' | '_blank' | '_parent' | '_top';
export type Type = {
    Button: 'button' | 'submit' | 'reset',
    Input: 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    Link: string
}
export type Wrap = 'soft' | 'hard';
export type YesNo = 'yes' | 'no';
