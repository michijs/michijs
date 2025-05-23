import type { CSSProperties } from "../types";
import type { ObservableOrConst } from "../../../types";
export interface ValueSets {
  45?: ObservableOrConst<"ltr" | "rtl" | undefined>;
  46?: ObservableOrConst<"block" | "inline" | undefined>;
  47?: ObservableOrConst<"http://www.w3.org/1998/Math/MathML" | undefined>;
  48?: ObservableOrConst<"normal" | undefined>;
  49?: ObservableOrConst<"prefix" | "infix" | "postfix" | undefined>;
  51?: ObservableOrConst<"none" | "sum" | undefined>;
  52?: ObservableOrConst<"replace" | "sum" | undefined>;
  53?: ObservableOrConst<"CSS" | "XML" | "auto" | undefined>;
  54?: ObservableOrConst<"indefinite" | undefined>;
  55?: ObservableOrConst<"always" | "whenNotActive" | "never" | undefined>;
  56?: ObservableOrConst<
    "discrete" | "linear" | "paced" | "spline" | undefined
  >;
  57?: ObservableOrConst<
    | "none meet"
    | "none slice"
    | "xMinYMin meet"
    | "xMinYMin slice"
    | "xMidYMin meet"
    | "xMidYMin slice"
    | "xMaxYMin meet"
    | "xMaxYMin slice"
    | "xMinYMid meet"
    | "xMinYMid slice"
    | "xMidYMid meet"
    | "xMidYMid slice"
    | "xMaxYMid meet"
    | "xMaxYMid slice"
    | "xMinYMax meet"
    | "xMinYMax slice"
    | "xMidYMax meet"
    | "xMidYMax slice"
    | "xMaxYMax meet"
    | "xMaxYMax slice"
    | undefined
  >;
  58?: ObservableOrConst<
    | "auto"
    | "baseline"
    | "before-edge"
    | "text-before-edge"
    | "middle"
    | "central"
    | "after-edge"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "inherit"
    | undefined
  >;
  59?: ObservableOrConst<"nonzero" | "evenodd" | "inherit" | undefined>;
  60?: ObservableOrConst<"auto" | "sRGB" | "linearRGB" | "inherit" | undefined>;
  61?: ObservableOrConst<"auto" | "sRGB" | "inherit" | undefined>;
  62?: ObservableOrConst<
    "auto" | "optimizeSpeed" | "optimizeQuality" | "inherit" | undefined
  >;
  63?: ObservableOrConst<
    | "auto"
    | "crosshair"
    | "default"
    | "pointer"
    | "move"
    | "e-resize"
    | "ne-resize"
    | "nw-resize"
    | "n-resize"
    | "se-resize"
    | "sw-resize"
    | "s-resize"
    | "w-resize| text"
    | "wait"
    | "help"
    | "inherit"
    | undefined
  >;
  64?: ObservableOrConst<"ltr" | "rtl" | "inherit" | undefined>;
  65?: ObservableOrConst<
    | "inline"
    | "block"
    | "list-item"
    | "run-in"
    | "compact"
    | "marker"
    | "table"
    | "inline-table"
    | "table-row-group"
    | "table-header-group"
    | "table-footer-group"
    | "table-row"
    | "table-column-group"
    | "table-column"
    | "table-cell"
    | "table-caption"
    | "none"
    | "inherit"
    | undefined
  >;
  66?: ObservableOrConst<
    | "auto"
    | "text-bottom"
    | "alphabetic"
    | "ideographic"
    | "middle"
    | "central"
    | "mathematical"
    | "hanging"
    | "text-top"
    | undefined
  >;
  67?: ObservableOrConst<
    | "normal"
    | "wider"
    | "narrower"
    | "ultra-condensed"
    | "extra-condensed"
    | "condensed"
    | "semi-condensed"
    | "semi-expanded"
    | "expanded"
    | "extra-expanded"
    | "ultra-expanded"
    | "inherit"
    | undefined
  >;
  68?: ObservableOrConst<
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "inherit"
    | undefined
  >;
  69?: ObservableOrConst<
    "auto" | "optimizeSpeed" | "optimizeQuality" | undefined
  >;
  70?: ObservableOrConst<"visible" | "hidden" | "scroll" | "auto" | undefined>;
  71?: ObservableOrConst<
    | "visiblePainted"
    | "visibleFill"
    | "visibleStroke"
    | "visible"
    | "painted"
    | "fill"
    | "stroke"
    | "all"
    | "none"
    | "inherit"
    | undefined
  >;
  72?: ObservableOrConst<
    "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | undefined
  >;
  73?: ObservableOrConst<"butt" | "round" | "square" | undefined>;
  74?: ObservableOrConst<
    "miter" | "round" | "bevel" | "miter-clip" | "round" | undefined
  >;
  75?: ObservableOrConst<"start" | "middle" | "end" | undefined>;
  76?: ObservableOrConst<
    | "none"
    | "underline"
    | "overline"
    | "line-through"
    | "blink"
    | "inherit"
    | undefined
  >;
  77?: ObservableOrConst<
    | "auto"
    | "optimizeSpeed"
    | "optimizeLegibility"
    | "geometricPrecision"
    | "inherit"
    | undefined
  >;
  78?: ObservableOrConst<
    | "none"
    | "non-scaling-stroke"
    | "non-scaling-size"
    | "non-rotation"
    | "fixed-position"
    | undefined
  >;
  79?: ObservableOrConst<
    "visible" | "hidden" | "collapse" | "inherit" | undefined
  >;
  80?: ObservableOrConst<
    "lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb" | "inherit" | undefined
  >;
  81?: ObservableOrConst<
    "identity" | "table" | "discrete" | "linear" | "gamma" | undefined
  >;
  82?: ObservableOrConst<"userSpaceOnUse" | "objectBoundingBox" | undefined>;
  83?: ObservableOrConst<
    | "SourceGraphic"
    | "SourceAlpha"
    | "BackgroundImage"
    | "BackgroundAlpha"
    | "FillPaint"
    | "StrokePaint"
    | undefined
  >;
  84?: ObservableOrConst<
    "normal" | "multiply" | "screen" | "darken" | "lighten" | undefined
  >;
  85?: ObservableOrConst<
    "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha" | undefined
  >;
  86?: ObservableOrConst<
    "over" | "in" | "out" | "atop" | "xor" | "arithmetic" | undefined
  >;
  87?: ObservableOrConst<"duplicate" | "wrap" | "none" | undefined>;
  88?: ObservableOrConst<"R" | "G" | "B" | "A" | undefined>;
  89?: ObservableOrConst<
    | "none"
    | "xMinYMin meet"
    | "xMinYMin slice"
    | "xMinYMid meet"
    | "xMinYMid slice"
    | "xMinYMax meet"
    | "xMinYMax slice"
    | "xMidYMin meet"
    | "xMidYMin slice"
    | "xMidYMid meet"
    | "xMidYMid slice"
    | "xMidYMax meet"
    | "xMidYMax slice"
    | "xMaxYMin meet"
    | "xMaxYMin slice"
    | "xMaxYMid meet"
    | "xMaxYMid slice"
    | "xMaxYMax meet"
    | "xMaxYMax slice"
    | undefined
  >;
  90?: ObservableOrConst<"noStitch" | "stitch" | undefined>;
  91?: ObservableOrConst<"fractalNoise" | "turbulence" | undefined>;
  92?: ObservableOrConst<"pad" | "reflect" | "repeat" | undefined>;
  93?: ObservableOrConst<"userSpaceOnUse" | "strokeWidth" | undefined>;
  94?: ObservableOrConst<"http://www.w3.org/2000/svg" | undefined>;
  95?: ObservableOrConst<"spacing" | "spacingAndGlyphs" | undefined>;
  96?: ObservableOrConst<"alignt" | "stretch" | undefined>;
  97?: ObservableOrConst<"auto" | "exact" | undefined>;
  autocomplete?: ObservableOrConst<
    "inline" | "list" | "both" | "none" | undefined
  >;
  b?: ObservableOrConst<"true" | "false" | undefined>;
  bt?: ObservableOrConst<"button" | "submit" | "reset" | "menu" | undefined>;
  current?: ObservableOrConst<
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false"
    | undefined
  >;
  d?: ObservableOrConst<"ltr" | "rtl" | "auto" | undefined>;
  decoding?: ObservableOrConst<"sync" | "async" | "auto" | undefined>;
  default?: ObservableOrConst<string | number | boolean | null | undefined>;
  dropeffect?: ObservableOrConst<
    "copy" | "move" | "link" | "execute" | "popup" | "none" | undefined
  >;
  enterkeyhint?: ObservableOrConst<
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send"
    | undefined
  >;
  et?: ObservableOrConst<
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | undefined
  >;
  fetchpriority?: ObservableOrConst<"high" | "low" | "auto" | undefined>;
  fm?: ObservableOrConst<"get" | "post" | undefined>;
  haspopup?: ObservableOrConst<
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog"
    | undefined
  >;
  href?: ObservableOrConst<URL | string | undefined>;
  im?: ObservableOrConst<
    | "verbatim"
    | "latin"
    | "latin-name"
    | "latin-prose"
    | "full-width-latin"
    | "kana"
    | "kana-name"
    | "katakana"
    | "numeric"
    | "tel"
    | "email"
    | "url"
    | undefined
  >;
  inputautocomplete?: ObservableOrConst<
    | "additional-name"
    | "address-level1"
    | "address-level2"
    | "address-level3"
    | "address-level4"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "bday"
    | "bday-year"
    | "bday-day"
    | "bday-month"
    | "billing"
    | "cc-additional-name"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-family-name"
    | "cc-given-name"
    | "cc-name"
    | "cc-number"
    | "cc-type"
    | "country"
    | "country-name"
    | "current-password"
    | "email"
    | "family-name"
    | "fax"
    | "given-name"
    | "home"
    | "honorific-prefix"
    | "honorific-suffix"
    | "impp"
    | "language"
    | "mobile"
    | "name"
    | "new-password"
    | "nickname"
    | "off"
    | "on"
    | "organization"
    | "organization-title"
    | "pager"
    | "photo"
    | "postal-code"
    | "sex"
    | "shipping"
    | "street-address"
    | "tel-area-code"
    | "tel"
    | "tel-country-code"
    | "tel-extension"
    | "tel-local"
    | "tel-local-prefix"
    | "tel-local-suffix"
    | "tel-national"
    | "transaction-amount"
    | "transaction-currency"
    | "url"
    | "username"
    | "work"
    | undefined
  >;
  invalid?: ObservableOrConst<
    "grammar" | "false" | "spelling" | "true" | undefined
  >;
  live?: ObservableOrConst<"off" | "polite" | "assertive" | undefined>;
  loading?: ObservableOrConst<"eager" | "lazy" | undefined>;
  lt?: ObservableOrConst<"1" | "a" | "A" | "i" | "I" | undefined>;
  m?: ObservableOrConst<"get" | "post" | "dialog" | undefined>;
  metanames?: ObservableOrConst<
    | "application-name"
    | "author"
    | "description"
    | "format-detection"
    | "generator"
    | "keywords"
    | "publisher"
    | "referrer"
    | "robots"
    | "theme-color"
    | "viewport"
    | undefined
  >;
  mit?: ObservableOrConst<"command" | "checkbox" | "radio" | undefined>;
  mt?: ObservableOrConst<"context" | "toolbar" | undefined>;
  o?: ObservableOrConst<"on" | "off" | undefined>;
  orientation?: ObservableOrConst<
    "vertical" | "horizontal" | "undefined" | undefined
  >;
  pl?: ObservableOrConst<"none" | "metadata" | "auto" | undefined>;
  popover?: ObservableOrConst<"auto" | "hint" | "manual" | undefined>;
  referrerpoliciy?: ObservableOrConst<
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url"
    | undefined
  >;
  referrerpolicy?: ObservableOrConst<
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url"
    | undefined
  >;
  relevant?: ObservableOrConst<
    "additions" | "removals" | "text" | "all" | "additions text" | undefined
  >;
  roles?: ObservableOrConst<
    | "alert"
    | "alertdialog"
    | "button"
    | "checkbox"
    | "dialog"
    | "gridcell"
    | "link"
    | "log"
    | "marquee"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "option"
    | "progressbar"
    | "radio"
    | "scrollbar"
    | "searchbox"
    | "slider"
    | "spinbutton"
    | "status"
    | "switch"
    | "tab"
    | "tabpanel"
    | "textbox"
    | "timer"
    | "tooltip"
    | "treeitem"
    | "combobox"
    | "grid"
    | "listbox"
    | "menu"
    | "menubar"
    | "radiogroup"
    | "tablist"
    | "tree"
    | "treegrid"
    | "application"
    | "article"
    | "cell"
    | "columnheader"
    | "definition"
    | "directory"
    | "document"
    | "feed"
    | "figure"
    | "group"
    | "heading"
    | "img"
    | "list"
    | "listitem"
    | "math"
    | "none"
    | "note"
    | "presentation"
    | "region"
    | "row"
    | "rowgroup"
    | "rowheader"
    | "separator"
    | "table"
    | "term"
    | "text"
    | "toolbar"
    | "banner"
    | "complementary"
    | "contentinfo"
    | "form"
    | "main"
    | "navigation"
    | "region"
    | "search"
    | "doc-abstract"
    | "doc-acknowledgments"
    | "doc-afterword"
    | "doc-appendix"
    | "doc-backlink"
    | "doc-biblioentry"
    | "doc-bibliography"
    | "doc-biblioref"
    | "doc-chapter"
    | "doc-colophon"
    | "doc-conclusion"
    | "doc-cover"
    | "doc-credit"
    | "doc-credits"
    | "doc-dedication"
    | "doc-endnote"
    | "doc-endnotes"
    | "doc-epigraph"
    | "doc-epilogue"
    | "doc-errata"
    | "doc-example"
    | "doc-footnote"
    | "doc-foreword"
    | "doc-glossary"
    | "doc-glossref"
    | "doc-index"
    | "doc-introduction"
    | "doc-noteref"
    | "doc-notice"
    | "doc-pagebreak"
    | "doc-pagelist"
    | "doc-part"
    | "doc-preface"
    | "doc-prologue"
    | "doc-pullquote"
    | "doc-qna"
    | "doc-subtitle"
    | "doc-tip"
    | "doc-toc"
    | undefined
  >;
  s?: ObservableOrConst<"row" | "col" | "rowgroup" | "colgroup" | undefined>;
  sb?: ObservableOrConst<
    | "allow-forms"
    | "allow-modals"
    | "allow-pointer-lock"
    | "allow-popups"
    | "allow-popups-to-escape-sandbox"
    | "allow-same-origin"
    | "allow-scripts"
    | "allow-top-navigation"
    | undefined
  >;
  sh?: ObservableOrConst<"circle" | "default" | "poly" | "rect" | undefined>;
  sort?: ObservableOrConst<
    "ascending" | "descending" | "none" | "other" | undefined
  >;
  style?: ObservableOrConst<CSSProperties | undefined>;
  t?: ObservableOrConst<
    | "hidden"
    | "text"
    | "search"
    | "tel"
    | "url"
    | "email"
    | "password"
    | "datetime"
    | "date"
    | "month"
    | "week"
    | "time"
    | "datetime-local"
    | "number"
    | "range"
    | "color"
    | "checkbox"
    | "radio"
    | "file"
    | "submit"
    | "image"
    | "reset"
    | "button"
    | undefined
  >;
  target?: ObservableOrConst<
    "_self" | "_blank" | "_parent" | "_top" | undefined
  >;
  tk?: ObservableOrConst<
    | "subtitles"
    | "captions"
    | "descriptions"
    | "chapters"
    | "metadata"
    | undefined
  >;
  tristate?: ObservableOrConst<
    "true" | "false" | "mixed" | "undefined" | undefined
  >;
  u?: ObservableOrConst<"true" | "false" | "undefined" | undefined>;
  v?: ObservableOrConst<boolean | undefined>;
  w?: ObservableOrConst<"soft" | "hard" | undefined>;
  xo?: ObservableOrConst<"anonymous" | "use-credentials" | undefined>;
  y?: ObservableOrConst<"yes" | "no" | undefined>;
}
