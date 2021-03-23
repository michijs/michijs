import { Properties, Property, Globals } from "csstype";

export type Accumulate = 'none' | 'sum';
export type Additive = 'replace' | 'sum';
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
export type Angle = `${number}${"deg" | "grad" | "rad"}`
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
    | 'photo';
export type BeginValueList = string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/begin
export type BlendMode = Exclude<Property.MixBlendMode, Globals>
export type CalcMode = 'discrete' | 'linear' | 'paced' | 'spline';
export type Capture = 'user' | 'environment';
export type Coordinate = Length;
export type Charset = string; //TODO: find all charset
export type ClockValue = string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#clock-value
export type Color = `#${string}`;
export type Crossorigin = 'anonymous' | 'use-credentials'
export type CSSProperties = Properties & { [selector: string]: string };
export type Dur = ClockValue | 'media' | 'indefinite';
export type EndValueList = string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/end
export type YearString = `${number}`
export type WeekString = `${number}-W${number}`;
export type TimeString = `${number}:${number}` | `${number}:${number}.${number}`;
export type MonthString = `${YearString}-${number}`;
export type YearlessDateString = `${number}-${number}`
export type DateString = `${MonthString}-${number}`;
export type DateLocalString = `${DateString}T${TimeString}`;
export type GlobalDateAndTimeString = `${DateString}${'T' | ' '}${TimeString}Z` | `${DateString}${'T' | ' '}${TimeString}-${number | `${number}:${number}`}`;
export type DateTime = YearString | MonthString | DateString | YearlessDateString | WeekString | TimeString | DateLocalString | GlobalDateAndTimeString;
export type Decoding = 'sync' | 'async' | 'auto';
export type Dir = 'ltr' | 'rtl' | 'auto';
export type EdgeMode = 'duplicate' | 'wrap' | 'none'
export type Enctype = string;
export type EnterKeyHint = 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
export type FilterPrimitiveReference = string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in
export type HTTPEquiv = 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
export type ICCColor = string;//TODO:https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#icccolor
export type In = 'SourceGraphic' | 'SourceAlpha' | 'BackgroundImage' | 'BackgroundAlpha' | 'FillPaint' | 'StrokePaint' | FilterPrimitiveReference
export type InputMode = 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
export type IRI = string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#iri
export type Kind = 'captions'
    | 'chapters'
    | 'descriptions'
    | 'metadata'
    | 'subtitles'
export type Language = string; //TODO: find all languages
export type Length = number | `${number}${"em" | "ex" | "px" | "in" | "cm" | "mm" | "pt" | "pc" | "%"}`
export type LengthAdjust = 'spacing' | 'spacingAndGlyphs';
export type ListOfNumbers = string; //TODO:https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#list-of-ts
export type Loading = 'eager' | 'lazy';
export type Method = 'get' | 'post';
export type MIMEType = string;
export type NumberOptionalNumber = string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#number-optional-number
export type Offset = number | Percentage;
export type OnOff = 'on' | 'off';
export type Opacity = string;//TODO:https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop
export type Operator = 'over' | 'in' | 'out' | 'atop' | 'xor' | 'lighter' | 'arithmetic';
export type Orient = 'auto' | 'auto-start-reverse' | Angle;
export type Percentage = `${number}%`;
export type Points = string;//TODO:https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points
export type Preload = 'auto' | 'metadata' | 'none';
type MinMidMax = 'min' | 'mid' | 'max';
export type PreserveAspectRatio = 'none' | `x${MinMidMax}Y${MinMidMax}${'' | ' meet' | ' slice'}`
export type Ratio = Length | 'auto';
export type Repeat = number | 'indefinite';
export type Ref = 'left' | 'center' | 'right' | Coordinate;
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
export type Restart = 'always' | 'whenNotActive' | 'never';
export type RGBA = 'R' | 'G' | 'B' | 'A';
export type Rotate = 'auto' | 'auto-reverse' | number;
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
export type SpreadMethod = 'pad' | 'reflect' | 'repeat';
export type StringBoolean = "true" | "false";
export type Stich = 'noStitch' | 'stitch';
export type Target = '_self' | '_blank' | '_parent' | '_top';
export type TransformFunction = string;//TODO: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function
export type TransformList = string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#transform-list
export type Type = {
    A: string,
    AnimateTransform: 'translate' | 'scale' | 'rotate' | 'skewX' | 'skewY',
    Button: 'button' | 'submit' | 'reset',
    Embed: MimeType,
    FeColorMatrix: 'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha',
    FeFunc: 'identity' | 'table' | 'discrete' | 'linear' | 'gamma',
    FeTurbulence: 'fractalNoise' | 'turbulence',
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
    Link: string,
    Object: MimeType,
    Ol: 'a' | 'A' | 'i' | 'I' | 1,
    Script: 'module' | 'application/ecmascript' | 'application/javascript',
    Source: MIMEType,
    Style: MIMEType,
}
export type Units = 'userSpaceOnUse' | 'objectBoundingBox';
export type Wrap = 'soft' | 'hard';
export type YesNo = 'yes' | 'no';
