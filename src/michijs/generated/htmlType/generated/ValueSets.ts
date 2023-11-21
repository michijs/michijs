import { CSSProperties } from '../types';
      import { ObservableLike } from "../../../types"
      export interface ValueSets {
  41?: "ltr" | "rtl" | ObservableLike<"ltr" | "rtl" | undefined>;
42?: "block" | "inline" | ObservableLike<"block" | "inline" | undefined>;
43?: "http://www.w3.org/1998/Math/MathML" | ObservableLike<"http://www.w3.org/1998/Math/MathML" | undefined>;
45?: "none" | "sum" | ObservableLike<"none" | "sum" | undefined>;
46?: "replace" | "sum" | ObservableLike<"replace" | "sum" | undefined>;
47?: "CSS" | "XML" | "auto" | ObservableLike<"CSS" | "XML" | "auto" | undefined>;
48?: "indefinite" | ObservableLike<"indefinite" | undefined>;
49?: "always" | "whenNotActive" | "never" | ObservableLike<"always" | "whenNotActive" | "never" | undefined>;
50?: "discrete" | "linear" | "paced" | "spline" | ObservableLike<"discrete" | "linear" | "paced" | "spline" | undefined>;
51?: "none meet" | "none slice" | "xMinYMin meet" | "xMinYMin slice" | "xMidYMin meet" | "xMidYMin slice" | "xMaxYMin meet" | "xMaxYMin slice" | "xMinYMid meet" | "xMinYMid slice" | "xMidYMid meet" | "xMidYMid slice" | "xMaxYMid meet" | "xMaxYMid slice" | "xMinYMax meet" | "xMinYMax slice" | "xMidYMax meet" | "xMidYMax slice" | "xMaxYMax meet" | "xMaxYMax slice" | ObservableLike<"none meet" | "none slice" | "xMinYMin meet" | "xMinYMin slice" | "xMidYMin meet" | "xMidYMin slice" | "xMaxYMin meet" | "xMaxYMin slice" | "xMinYMid meet" | "xMinYMid slice" | "xMidYMid meet" | "xMidYMid slice" | "xMaxYMid meet" | "xMaxYMid slice" | "xMinYMax meet" | "xMinYMax slice" | "xMidYMax meet" | "xMidYMax slice" | "xMaxYMax meet" | "xMaxYMax slice" | undefined>;
52?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | ObservableLike<"auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | undefined>;
53?: "nonzero" | "evenodd" | "inherit" | ObservableLike<"nonzero" | "evenodd" | "inherit" | undefined>;
54?: "auto" | "sRGB" | "linearRGB" | "inherit" | ObservableLike<"auto" | "sRGB" | "linearRGB" | "inherit" | undefined>;
55?: "auto" | "sRGB" | "inherit" | ObservableLike<"auto" | "sRGB" | "inherit" | undefined>;
56?: "auto" | "optimizeSpeed" | "optimizeQuality" | "inherit" | ObservableLike<"auto" | "optimizeSpeed" | "optimizeQuality" | "inherit" | undefined>;
57?: "auto" | "crosshair" | "default" | "pointer" | "move" | "e-resize" | "ne-resize" | "nw-resize" | "n-resize" | "se-resize" | "sw-resize" | "s-resize" | "w-resize| text" | "wait" | "help" | "inherit" | ObservableLike<"auto" | "crosshair" | "default" | "pointer" | "move" | "e-resize" | "ne-resize" | "nw-resize" | "n-resize" | "se-resize" | "sw-resize" | "s-resize" | "w-resize| text" | "wait" | "help" | "inherit" | undefined>;
58?: "ltr" | "rtl" | "inherit" | ObservableLike<"ltr" | "rtl" | "inherit" | undefined>;
59?: "inline" | "block" | "list-item" | "run-in" | "compact" | "marker" | "table" | "inline-table" | "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-column-group" | "table-column" | "table-cell" | "table-caption" | "none" | "inherit" | ObservableLike<"inline" | "block" | "list-item" | "run-in" | "compact" | "marker" | "table" | "inline-table" | "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-column-group" | "table-column" | "table-cell" | "table-caption" | "none" | "inherit" | undefined>;
60?: "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top" | ObservableLike<"auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top" | undefined>;
61?: "normal" | "wider" | "narrower" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded" | "inherit" | ObservableLike<"normal" | "wider" | "narrower" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded" | "inherit" | undefined>;
62?: "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "inherit" | ObservableLike<"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "inherit" | undefined>;
63?: "auto" | "optimizeSpeed" | "optimizeQuality" | ObservableLike<"auto" | "optimizeSpeed" | "optimizeQuality" | undefined>;
64?: "visible" | "hidden" | "scroll" | "auto" | ObservableLike<"visible" | "hidden" | "scroll" | "auto" | undefined>;
65?: "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all" | "none" | "inherit" | ObservableLike<"visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all" | "none" | "inherit" | undefined>;
66?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | ObservableLike<"auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | undefined>;
67?: "butt" | "round" | "square" | ObservableLike<"butt" | "round" | "square" | undefined>;
68?: "miter" | "round" | "bevel" | "miter-clip" | "round" | ObservableLike<"miter" | "round" | "bevel" | "miter-clip" | "round" | undefined>;
69?: "start" | "middle" | "end" | ObservableLike<"start" | "middle" | "end" | undefined>;
70?: "none" | "underline" | "overline" | "line-through" | "blink" | "inherit" | ObservableLike<"none" | "underline" | "overline" | "line-through" | "blink" | "inherit" | undefined>;
71?: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision" | "inherit" | ObservableLike<"auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision" | "inherit" | undefined>;
72?: "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position" | ObservableLike<"none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position" | undefined>;
73?: "visible" | "hidden" | "collapse" | "inherit" | ObservableLike<"visible" | "hidden" | "collapse" | "inherit" | undefined>;
74?: "lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb" | "inherit" | ObservableLike<"lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb" | "inherit" | undefined>;
75?: "identity" | "table" | "discrete" | "linear" | "gamma" | ObservableLike<"identity" | "table" | "discrete" | "linear" | "gamma" | undefined>;
76?: "userSpaceOnUse" | "objectBoundingBox" | ObservableLike<"userSpaceOnUse" | "objectBoundingBox" | undefined>;
77?: "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint" | ObservableLike<"SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint" | undefined>;
78?: "normal" | "multiply" | "screen" | "darken" | "lighten" | ObservableLike<"normal" | "multiply" | "screen" | "darken" | "lighten" | undefined>;
79?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic" | ObservableLike<"over" | "in" | "out" | "atop" | "xor" | "arithmetic" | undefined>;
80?: "duplicate" | "wrap" | "none" | ObservableLike<"duplicate" | "wrap" | "none" | undefined>;
81?: "R" | "G" | "B" | "A" | ObservableLike<"R" | "G" | "B" | "A" | undefined>;
82?: "none" | "xMinYMin meet" | "xMinYMin slice" | "xMinYMid meet" | "xMinYMid slice" | "xMinYMax meet" | "xMinYMax slice" | "xMidYMin meet" | "xMidYMin slice" | "xMidYMid meet" | "xMidYMid slice" | "xMidYMax meet" | "xMidYMax slice" | "xMaxYMin meet" | "xMaxYMin slice" | "xMaxYMid meet" | "xMaxYMid slice" | "xMaxYMax meet" | "xMaxYMax slice" | ObservableLike<"none" | "xMinYMin meet" | "xMinYMin slice" | "xMinYMid meet" | "xMinYMid slice" | "xMinYMax meet" | "xMinYMax slice" | "xMidYMin meet" | "xMidYMin slice" | "xMidYMid meet" | "xMidYMid slice" | "xMidYMax meet" | "xMidYMax slice" | "xMaxYMin meet" | "xMaxYMin slice" | "xMaxYMid meet" | "xMaxYMid slice" | "xMaxYMax meet" | "xMaxYMax slice" | undefined>;
83?: "noStitch" | "stitch" | ObservableLike<"noStitch" | "stitch" | undefined>;
84?: "fractalNoise" | "turbulence" | ObservableLike<"fractalNoise" | "turbulence" | undefined>;
85?: "pad" | "reflect" | "repeat" | ObservableLike<"pad" | "reflect" | "repeat" | undefined>;
86?: "userSpaceOnUse" | "strokeWidth" | ObservableLike<"userSpaceOnUse" | "strokeWidth" | undefined>;
87?: "http://www.w3.org/2000/svg" | ObservableLike<"http://www.w3.org/2000/svg" | undefined>;
88?: "spacing" | "spacingAndGlyphs" | ObservableLike<"spacing" | "spacingAndGlyphs" | undefined>;
89?: "alignt" | "stretch" | ObservableLike<"alignt" | "stretch" | undefined>;
90?: "auto" | "exact" | ObservableLike<"auto" | "exact" | undefined>;
autocomplete?: "inline" | "list" | "both" | "none" | ObservableLike<"inline" | "list" | "both" | "none" | undefined>;
b?: "true" | "false" | ObservableLike<"true" | "false" | undefined>;
bt?: "button" | "submit" | "reset" | "menu" | ObservableLike<"button" | "submit" | "reset" | "menu" | undefined>;
current?: "page" | "step" | "location" | "date" | "time" | "true" | "false" | ObservableLike<"page" | "step" | "location" | "date" | "time" | "true" | "false" | undefined>;
d?: "ltr" | "rtl" | "auto" | ObservableLike<"ltr" | "rtl" | "auto" | undefined>;
decoding?: "sync" | "async" | "auto" | ObservableLike<"sync" | "async" | "auto" | undefined>;
default?: string | number | boolean | ObservableLike<string | number | boolean | undefined>;
dropeffect?: "copy" | "move" | "link" | "execute" | "popup" | "none" | ObservableLike<"copy" | "move" | "link" | "execute" | "popup" | "none" | undefined>;
et?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | ObservableLike<"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | undefined>;
fm?: "get" | "post" | ObservableLike<"get" | "post" | undefined>;
haspopup?: "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | ObservableLike<"false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined>;
im?: "verbatim" | "latin" | "latin-name" | "latin-prose" | "full-width-latin" | "kana" | "kana-name" | "katakana" | "numeric" | "tel" | "email" | "url" | ObservableLike<"verbatim" | "latin" | "latin-name" | "latin-prose" | "full-width-latin" | "kana" | "kana-name" | "katakana" | "numeric" | "tel" | "email" | "url" | undefined>;
inputautocomplete?: "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "bday" | "bday-year" | "bday-day" | "bday-month" | "billing" | "cc-additional-name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-type" | "country" | "country-name" | "current-password" | "email" | "family-name" | "fax" | "given-name" | "home" | "honorific-prefix" | "honorific-suffix" | "impp" | "language" | "mobile" | "name" | "new-password" | "nickname" | "off" | "on" | "organization" | "organization-title" | "pager" | "photo" | "postal-code" | "sex" | "shipping" | "street-address" | "tel-area-code" | "tel" | "tel-country-code" | "tel-extension" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-national" | "transaction-amount" | "transaction-currency" | "url" | "username" | "work" | ObservableLike<"additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "bday" | "bday-year" | "bday-day" | "bday-month" | "billing" | "cc-additional-name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-type" | "country" | "country-name" | "current-password" | "email" | "family-name" | "fax" | "given-name" | "home" | "honorific-prefix" | "honorific-suffix" | "impp" | "language" | "mobile" | "name" | "new-password" | "nickname" | "off" | "on" | "organization" | "organization-title" | "pager" | "photo" | "postal-code" | "sex" | "shipping" | "street-address" | "tel-area-code" | "tel" | "tel-country-code" | "tel-extension" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-national" | "transaction-amount" | "transaction-currency" | "url" | "username" | "work" | undefined>;
invalid?: "grammar" | "false" | "spelling" | "true" | ObservableLike<"grammar" | "false" | "spelling" | "true" | undefined>;
live?: "off" | "polite" | "assertive" | ObservableLike<"off" | "polite" | "assertive" | undefined>;
loading?: "eager" | "lazy" | ObservableLike<"eager" | "lazy" | undefined>;
lt?: "1" | "a" | "A" | "i" | "I" | ObservableLike<"1" | "a" | "A" | "i" | "I" | undefined>;
m?: "get" | "post" | "dialog" | ObservableLike<"get" | "post" | "dialog" | undefined>;
metanames?: "application-name" | "author" | "description" | "format-detection" | "generator" | "keywords" | "publisher" | "referrer" | "robots" | "theme-color" | "viewport" | ObservableLike<"application-name" | "author" | "description" | "format-detection" | "generator" | "keywords" | "publisher" | "referrer" | "robots" | "theme-color" | "viewport" | undefined>;
mit?: "command" | "checkbox" | "radio" | ObservableLike<"command" | "checkbox" | "radio" | undefined>;
mt?: "context" | "toolbar" | ObservableLike<"context" | "toolbar" | undefined>;
o?: "on" | "off" | ObservableLike<"on" | "off" | undefined>;
orientation?: "vertical" | "horizontal" | "undefined" | ObservableLike<"vertical" | "horizontal" | "undefined" | undefined>;
pl?: "none" | "metadata" | "auto" | ObservableLike<"none" | "metadata" | "auto" | undefined>;
referrerpoliciy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | ObservableLike<"no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined>;
referrerpolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | ObservableLike<"no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | undefined>;
relevant?: "additions" | "removals" | "text" | "all" | "additions text" | ObservableLike<"additions" | "removals" | "text" | "all" | "additions text" | undefined>;
roles?: "alert" | "alertdialog" | "button" | "checkbox" | "dialog" | "gridcell" | "link" | "log" | "marquee" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "option" | "progressbar" | "radio" | "scrollbar" | "searchbox" | "slider" | "spinbutton" | "status" | "switch" | "tab" | "tabpanel" | "textbox" | "timer" | "tooltip" | "treeitem" | "combobox" | "grid" | "listbox" | "menu" | "menubar" | "radiogroup" | "tablist" | "tree" | "treegrid" | "application" | "article" | "cell" | "columnheader" | "definition" | "directory" | "document" | "feed" | "figure" | "group" | "heading" | "img" | "list" | "listitem" | "math" | "none" | "note" | "presentation" | "region" | "row" | "rowgroup" | "rowheader" | "separator" | "table" | "term" | "text" | "toolbar" | "banner" | "complementary" | "contentinfo" | "form" | "main" | "navigation" | "region" | "search" | "doc-abstract" | "doc-acknowledgments" | "doc-afterword" | "doc-appendix" | "doc-backlink" | "doc-biblioentry" | "doc-bibliography" | "doc-biblioref" | "doc-chapter" | "doc-colophon" | "doc-conclusion" | "doc-cover" | "doc-credit" | "doc-credits" | "doc-dedication" | "doc-endnote" | "doc-endnotes" | "doc-epigraph" | "doc-epilogue" | "doc-errata" | "doc-example" | "doc-footnote" | "doc-foreword" | "doc-glossary" | "doc-glossref" | "doc-index" | "doc-introduction" | "doc-noteref" | "doc-notice" | "doc-pagebreak" | "doc-pagelist" | "doc-part" | "doc-preface" | "doc-prologue" | "doc-pullquote" | "doc-qna" | "doc-subtitle" | "doc-tip" | "doc-toc" | ObservableLike<"alert" | "alertdialog" | "button" | "checkbox" | "dialog" | "gridcell" | "link" | "log" | "marquee" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "option" | "progressbar" | "radio" | "scrollbar" | "searchbox" | "slider" | "spinbutton" | "status" | "switch" | "tab" | "tabpanel" | "textbox" | "timer" | "tooltip" | "treeitem" | "combobox" | "grid" | "listbox" | "menu" | "menubar" | "radiogroup" | "tablist" | "tree" | "treegrid" | "application" | "article" | "cell" | "columnheader" | "definition" | "directory" | "document" | "feed" | "figure" | "group" | "heading" | "img" | "list" | "listitem" | "math" | "none" | "note" | "presentation" | "region" | "row" | "rowgroup" | "rowheader" | "separator" | "table" | "term" | "text" | "toolbar" | "banner" | "complementary" | "contentinfo" | "form" | "main" | "navigation" | "region" | "search" | "doc-abstract" | "doc-acknowledgments" | "doc-afterword" | "doc-appendix" | "doc-backlink" | "doc-biblioentry" | "doc-bibliography" | "doc-biblioref" | "doc-chapter" | "doc-colophon" | "doc-conclusion" | "doc-cover" | "doc-credit" | "doc-credits" | "doc-dedication" | "doc-endnote" | "doc-endnotes" | "doc-epigraph" | "doc-epilogue" | "doc-errata" | "doc-example" | "doc-footnote" | "doc-foreword" | "doc-glossary" | "doc-glossref" | "doc-index" | "doc-introduction" | "doc-noteref" | "doc-notice" | "doc-pagebreak" | "doc-pagelist" | "doc-part" | "doc-preface" | "doc-prologue" | "doc-pullquote" | "doc-qna" | "doc-subtitle" | "doc-tip" | "doc-toc" | undefined>;
s?: "row" | "col" | "rowgroup" | "colgroup" | ObservableLike<"row" | "col" | "rowgroup" | "colgroup" | undefined>;
sb?: "allow-forms" | "allow-modals" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-same-origin" | "allow-scripts" | "allow-top-navigation" | ObservableLike<"allow-forms" | "allow-modals" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-same-origin" | "allow-scripts" | "allow-top-navigation" | undefined>;
sh?: "circle" | "default" | "poly" | "rect" | ObservableLike<"circle" | "default" | "poly" | "rect" | undefined>;
sort?: "ascending" | "descending" | "none" | "other" | ObservableLike<"ascending" | "descending" | "none" | "other" | undefined>;
style?: CSSProperties | ObservableLike<CSSProperties | undefined>;
t?: "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "submit" | "image" | "reset" | "button" | ObservableLike<"hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "submit" | "image" | "reset" | "button" | undefined>;
target?: "_self" | "_blank" | "_parent" | "_top" | ObservableLike<"_self" | "_blank" | "_parent" | "_top" | undefined>;
tk?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata" | ObservableLike<"subtitles" | "captions" | "descriptions" | "chapters" | "metadata" | undefined>;
tristate?: "true" | "false" | "mixed" | "undefined" | ObservableLike<"true" | "false" | "mixed" | "undefined" | undefined>;
u?: "true" | "false" | "undefined" | ObservableLike<"true" | "false" | "undefined" | undefined>;
v?: boolean | ObservableLike<boolean | undefined>;
w?: "soft" | "hard" | ObservableLike<"soft" | "hard" | undefined>;
xo?: "anonymous" | "use-credentials" | ObservableLike<"anonymous" | "use-credentials" | undefined>;
y?: "yes" | "no" | ObservableLike<"yes" | "no" | undefined>;
    }
