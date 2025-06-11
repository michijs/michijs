import type { CSSProperties } from "../types";
import type { ObservableOrConst } from "../../../types";
export interface ValueSets {
  45?: ObservableOrConst<"ltr" | "rtl" | undefined | null>;
  46?: ObservableOrConst<"block" | "inline" | undefined | null>;
  47?: ObservableOrConst<
    "http://www.w3.org/1998/Math/MathML" | undefined | null
  >;
  48?: ObservableOrConst<"normal" | undefined | null>;
  49?: ObservableOrConst<"prefix" | "infix" | "postfix" | undefined | null>;
  51?: ObservableOrConst<"none" | "sum" | undefined | null>;
  52?: ObservableOrConst<"replace" | "sum" | undefined | null>;
  53?: ObservableOrConst<"CSS" | "XML" | "auto" | undefined | null>;
  54?: ObservableOrConst<"indefinite" | undefined | null>;
  55?: ObservableOrConst<
    "always" | "whenNotActive" | "never" | undefined | null
  >;
  56?: ObservableOrConst<
    "discrete" | "linear" | "paced" | "spline" | undefined | null
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
    | null
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
    | null
  >;
  59?: ObservableOrConst<"nonzero" | "evenodd" | "inherit" | undefined | null>;
  60?: ObservableOrConst<
    "auto" | "sRGB" | "linearRGB" | "inherit" | undefined | null
  >;
  61?: ObservableOrConst<"auto" | "sRGB" | "inherit" | undefined | null>;
  62?: ObservableOrConst<
    "auto" | "optimizeSpeed" | "optimizeQuality" | "inherit" | undefined | null
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
    | null
  >;
  64?: ObservableOrConst<"ltr" | "rtl" | "inherit" | undefined | null>;
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
    | null
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
    | null
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
    | null
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
    | null
  >;
  69?: ObservableOrConst<
    "auto" | "optimizeSpeed" | "optimizeQuality" | undefined | null
  >;
  70?: ObservableOrConst<
    "visible" | "hidden" | "scroll" | "auto" | undefined | null
  >;
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
    | null
  >;
  72?: ObservableOrConst<
    | "auto"
    | "optimizeSpeed"
    | "crispEdges"
    | "geometricPrecision"
    | undefined
    | null
  >;
  73?: ObservableOrConst<"butt" | "round" | "square" | undefined | null>;
  74?: ObservableOrConst<
    "miter" | "round" | "bevel" | "miter-clip" | "round" | undefined | null
  >;
  75?: ObservableOrConst<"start" | "middle" | "end" | undefined | null>;
  76?: ObservableOrConst<
    | "none"
    | "underline"
    | "overline"
    | "line-through"
    | "blink"
    | "inherit"
    | undefined
    | null
  >;
  77?: ObservableOrConst<
    | "auto"
    | "optimizeSpeed"
    | "optimizeLegibility"
    | "geometricPrecision"
    | "inherit"
    | undefined
    | null
  >;
  78?: ObservableOrConst<
    | "none"
    | "non-scaling-stroke"
    | "non-scaling-size"
    | "non-rotation"
    | "fixed-position"
    | undefined
    | null
  >;
  79?: ObservableOrConst<
    "visible" | "hidden" | "collapse" | "inherit" | undefined | null
  >;
  80?: ObservableOrConst<
    | "lr-tb"
    | "rl-tb"
    | "tb-rl"
    | "lr"
    | "rl"
    | "tb"
    | "inherit"
    | undefined
    | null
  >;
  81?: ObservableOrConst<
    "identity" | "table" | "discrete" | "linear" | "gamma" | undefined | null
  >;
  82?: ObservableOrConst<
    "userSpaceOnUse" | "objectBoundingBox" | undefined | null
  >;
  83?: ObservableOrConst<
    | "SourceGraphic"
    | "SourceAlpha"
    | "BackgroundImage"
    | "BackgroundAlpha"
    | "FillPaint"
    | "StrokePaint"
    | undefined
    | null
  >;
  84?: ObservableOrConst<
    "normal" | "multiply" | "screen" | "darken" | "lighten" | undefined | null
  >;
  85?: ObservableOrConst<
    "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha" | undefined | null
  >;
  86?: ObservableOrConst<
    "over" | "in" | "out" | "atop" | "xor" | "arithmetic" | undefined | null
  >;
  87?: ObservableOrConst<"duplicate" | "wrap" | "none" | undefined | null>;
  88?: ObservableOrConst<"R" | "G" | "B" | "A" | undefined | null>;
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
    | null
  >;
  90?: ObservableOrConst<"noStitch" | "stitch" | undefined | null>;
  91?: ObservableOrConst<"fractalNoise" | "turbulence" | undefined | null>;
  92?: ObservableOrConst<"pad" | "reflect" | "repeat" | undefined | null>;
  93?: ObservableOrConst<"userSpaceOnUse" | "strokeWidth" | undefined | null>;
  94?: ObservableOrConst<"http://www.w3.org/2000/svg" | undefined | null>;
  95?: ObservableOrConst<"spacing" | "spacingAndGlyphs" | undefined | null>;
  96?: ObservableOrConst<"alignt" | "stretch" | undefined | null>;
  97?: ObservableOrConst<"auto" | "exact" | undefined | null>;
  autocomplete?: ObservableOrConst<
    "inline" | "list" | "both" | "none" | undefined | null
  >;
  b?: ObservableOrConst<"true" | "false" | undefined | null>;
  bt?: ObservableOrConst<
    "button" | "submit" | "reset" | "menu" | undefined | null
  >;
  current?: ObservableOrConst<
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false"
    | undefined
    | null
  >;
  d?: ObservableOrConst<"ltr" | "rtl" | "auto" | undefined | null>;
  decoding?: ObservableOrConst<"sync" | "async" | "auto" | undefined | null>;
  default?: ObservableOrConst<
    string | number | boolean | null | undefined | null
  >;
  dropeffect?: ObservableOrConst<
    "copy" | "move" | "link" | "execute" | "popup" | "none" | undefined | null
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
    | null
  >;
  et?: ObservableOrConst<
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | undefined
    | null
  >;
  fetchpriority?: ObservableOrConst<"high" | "low" | "auto" | undefined | null>;
  fm?: ObservableOrConst<"get" | "post" | undefined | null>;
  haspopup?: ObservableOrConst<
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog"
    | undefined
    | null
  >;
  href?: ObservableOrConst<URL | string | undefined | null>;
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
    | null
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
    | null
  >;
  invalid?: ObservableOrConst<
    "grammar" | "false" | "spelling" | "true" | undefined | null
  >;
  live?: ObservableOrConst<"off" | "polite" | "assertive" | undefined | null>;
  loading?: ObservableOrConst<"eager" | "lazy" | undefined | null>;
  lt?: ObservableOrConst<"1" | "a" | "A" | "i" | "I" | undefined | null>;
  m?: ObservableOrConst<"get" | "post" | "dialog" | undefined | null>;
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
    | null
  >;
  mit?: ObservableOrConst<"command" | "checkbox" | "radio" | undefined | null>;
  mt?: ObservableOrConst<"context" | "toolbar" | undefined | null>;
  o?: ObservableOrConst<"on" | "off" | undefined | null>;
  orientation?: ObservableOrConst<
    "vertical" | "horizontal" | "undefined" | undefined | null
  >;
  pl?: ObservableOrConst<"none" | "metadata" | "auto" | undefined | null>;
  popover?: ObservableOrConst<"auto" | "hint" | "manual" | undefined | null>;
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
    | null
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
    | null
  >;
  relevant?: ObservableOrConst<
    | "additions"
    | "removals"
    | "text"
    | "all"
    | "additions text"
    | undefined
    | null
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
    | null
  >;
  s?: ObservableOrConst<
    "row" | "col" | "rowgroup" | "colgroup" | undefined | null
  >;
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
    | null
  >;
  sh?: ObservableOrConst<
    "circle" | "default" | "poly" | "rect" | undefined | null
  >;
  sort?: ObservableOrConst<
    "ascending" | "descending" | "none" | "other" | undefined | null
  >;
  style?: ObservableOrConst<CSSProperties | undefined | null>;
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
    | null
  >;
  target?: ObservableOrConst<
    "_self" | "_blank" | "_parent" | "_top" | undefined | null
  >;
  tk?: ObservableOrConst<
    | "subtitles"
    | "captions"
    | "descriptions"
    | "chapters"
    | "metadata"
    | undefined
    | null
  >;
  tristate?: ObservableOrConst<
    "true" | "false" | "mixed" | "undefined" | undefined | null
  >;
  u?: ObservableOrConst<"true" | "false" | "undefined" | undefined | null>;
  v?: ObservableOrConst<boolean | undefined | null>;
  w?: ObservableOrConst<"soft" | "hard" | undefined | null>;
  xo?: ObservableOrConst<"anonymous" | "use-credentials" | undefined | null>;
  y?: ObservableOrConst<"yes" | "no" | undefined | null>;
}
