// file generated from @michijs/vscode-mathml 1.0.4
// HTML Data Version 1.1
import type { AllAttributes } from "./AllAttributes";
import type { ValueSets } from "./ValueSets";
import type { MathMLEvents } from "../Events";
import type { DataGlobalAttributes } from "../DataGlobalAttributes";
import type { MichiAttributes } from "../../../types";
interface GlobalAttributes
  extends Pick<
    AllAttributes,
    "displaystyle" | "href" | "id" | "mathvariant" | "scriptlevel"
  > {
  /**
   * The text direction. Possible values are either `ltr` (left to right) or `rtl` (right to left).
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
  dir?: ValueSets["42"];
}

export interface MathMLMathAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "display">,
    DataGlobalAttributes,
    MichiAttributes<
      I["math"] extends Element ? I["math"] : MathMLElementTagNameMap["math"]
    >,
    MathMLEvents<
      I["math"] extends Element ? I["math"] : MathMLElementTagNameMap["math"]
    >,
    GlobalAttributes {
  /**
   * Specifies the URI for the MathML namespace.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
  xmlns?: ValueSets["44"];
}
export interface MathMLMerrorAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["merror"] extends Element
        ? I["merror"]
        : MathMLElementTagNameMap["merror"]
    >,
    MathMLEvents<
      I["merror"] extends Element
        ? I["merror"]
        : MathMLElementTagNameMap["merror"]
    >,
    GlobalAttributes {}
export interface MathMLMfracAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "linethickness">,
    DataGlobalAttributes,
    MichiAttributes<
      I["mfrac"] extends Element ? I["mfrac"] : MathMLElementTagNameMap["mfrac"]
    >,
    MathMLEvents<
      I["mfrac"] extends Element ? I["mfrac"] : MathMLElementTagNameMap["mfrac"]
    >,
    GlobalAttributes {}
export interface MathMLMiAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mi"] extends Element ? I["mi"] : MathMLElementTagNameMap["mi"]
    >,
    MathMLEvents<
      I["mi"] extends Element ? I["mi"] : MathMLElementTagNameMap["mi"]
    >,
    GlobalAttributes {}
export interface MathMLMmultiscriptsAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mmultiscripts"] extends Element
        ? I["mmultiscripts"]
        : MathMLElementTagNameMap["mmultiscripts"]
    >,
    MathMLEvents<
      I["mmultiscripts"] extends Element
        ? I["mmultiscripts"]
        : MathMLElementTagNameMap["mmultiscripts"]
    >,
    GlobalAttributes {}
export interface MathMLMnAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mn"] extends Element ? I["mn"] : MathMLElementTagNameMap["mn"]
    >,
    MathMLEvents<
      I["mn"] extends Element ? I["mn"] : MathMLElementTagNameMap["mn"]
    >,
    GlobalAttributes {}
export interface MathMLMoAttributes<I extends Record<string, {}>>
  extends Pick<
      AllAttributes,
      | "fence"
      | "largeop"
      | "lspace"
      | "maxsize"
      | "minsize"
      | "movablelimits"
      | "rspace"
      | "separator"
      | "stretchy"
      | "symmetric"
    >,
    DataGlobalAttributes,
    MichiAttributes<
      I["mo"] extends Element ? I["mo"] : MathMLElementTagNameMap["mo"]
    >,
    MathMLEvents<
      I["mo"] extends Element ? I["mo"] : MathMLElementTagNameMap["mo"]
    >,
    GlobalAttributes {}
export interface MathMLMoverAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "accent">,
    DataGlobalAttributes,
    MichiAttributes<
      I["mover"] extends Element ? I["mover"] : MathMLElementTagNameMap["mover"]
    >,
    MathMLEvents<
      I["mover"] extends Element ? I["mover"] : MathMLElementTagNameMap["mover"]
    >,
    GlobalAttributes {}
export interface MathMLMpaddedAttributes<I extends Record<string, {}>>
  extends Pick<
      AllAttributes,
      "depth" | "height" | "lspace" | "voffset" | "width"
    >,
    DataGlobalAttributes,
    MichiAttributes<
      I["mpadded"] extends Element
        ? I["mpadded"]
        : MathMLElementTagNameMap["mpadded"]
    >,
    MathMLEvents<
      I["mpadded"] extends Element
        ? I["mpadded"]
        : MathMLElementTagNameMap["mpadded"]
    >,
    GlobalAttributes {}
export interface MathMLMphantomAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mphantom"] extends Element
        ? I["mphantom"]
        : MathMLElementTagNameMap["mphantom"]
    >,
    MathMLEvents<
      I["mphantom"] extends Element
        ? I["mphantom"]
        : MathMLElementTagNameMap["mphantom"]
    >,
    GlobalAttributes {}
export interface MathMLMrootAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mroot"] extends Element ? I["mroot"] : MathMLElementTagNameMap["mroot"]
    >,
    MathMLEvents<
      I["mroot"] extends Element ? I["mroot"] : MathMLElementTagNameMap["mroot"]
    >,
    GlobalAttributes {}
export interface MathMLMrowAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mrow"] extends Element ? I["mrow"] : MathMLElementTagNameMap["mrow"]
    >,
    MathMLEvents<
      I["mrow"] extends Element ? I["mrow"] : MathMLElementTagNameMap["mrow"]
    >,
    GlobalAttributes {}
export interface MathMLMsAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "lquote" | "rquote">,
    DataGlobalAttributes,
    MichiAttributes<
      I["ms"] extends Element ? I["ms"] : MathMLElementTagNameMap["ms"]
    >,
    MathMLEvents<
      I["ms"] extends Element ? I["ms"] : MathMLElementTagNameMap["ms"]
    >,
    GlobalAttributes {}
export interface MathMLMspaceAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "depth" | "height" | "width">,
    DataGlobalAttributes,
    MichiAttributes<
      I["mspace"] extends Element
        ? I["mspace"]
        : MathMLElementTagNameMap["mspace"]
    >,
    MathMLEvents<
      I["mspace"] extends Element
        ? I["mspace"]
        : MathMLElementTagNameMap["mspace"]
    >,
    GlobalAttributes {}
export interface MathMLMsqrtAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["msqrt"] extends Element ? I["msqrt"] : MathMLElementTagNameMap["msqrt"]
    >,
    MathMLEvents<
      I["msqrt"] extends Element ? I["msqrt"] : MathMLElementTagNameMap["msqrt"]
    >,
    GlobalAttributes {}
export interface MathMLMstyleAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mstyle"] extends Element
        ? I["mstyle"]
        : MathMLElementTagNameMap["mstyle"]
    >,
    MathMLEvents<
      I["mstyle"] extends Element
        ? I["mstyle"]
        : MathMLElementTagNameMap["mstyle"]
    >,
    GlobalAttributes {}
export interface MathMLMsubAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["msub"] extends Element ? I["msub"] : MathMLElementTagNameMap["msub"]
    >,
    MathMLEvents<
      I["msub"] extends Element ? I["msub"] : MathMLElementTagNameMap["msub"]
    >,
    GlobalAttributes {}
export interface MathMLMsubsupAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["msubsup"] extends Element
        ? I["msubsup"]
        : MathMLElementTagNameMap["msubsup"]
    >,
    MathMLEvents<
      I["msubsup"] extends Element
        ? I["msubsup"]
        : MathMLElementTagNameMap["msubsup"]
    >,
    GlobalAttributes {}
export interface MathMLMtableAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mtable"] extends Element
        ? I["mtable"]
        : MathMLElementTagNameMap["mtable"]
    >,
    MathMLEvents<
      I["mtable"] extends Element
        ? I["mtable"]
        : MathMLElementTagNameMap["mtable"]
    >,
    GlobalAttributes {}
export interface MathMLMtdAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "columnspan" | "rowspan">,
    DataGlobalAttributes,
    MichiAttributes<
      I["mtd"] extends Element ? I["mtd"] : MathMLElementTagNameMap["mtd"]
    >,
    MathMLEvents<
      I["mtd"] extends Element ? I["mtd"] : MathMLElementTagNameMap["mtd"]
    >,
    GlobalAttributes {}
export interface MathMLMtextAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mtext"] extends Element ? I["mtext"] : MathMLElementTagNameMap["mtext"]
    >,
    MathMLEvents<
      I["mtext"] extends Element ? I["mtext"] : MathMLElementTagNameMap["mtext"]
    >,
    GlobalAttributes {}
export interface MathMLMtrAttributes<I extends Record<string, {}>>
  extends DataGlobalAttributes,
    MichiAttributes<
      I["mtr"] extends Element ? I["mtr"] : MathMLElementTagNameMap["mtr"]
    >,
    MathMLEvents<
      I["mtr"] extends Element ? I["mtr"] : MathMLElementTagNameMap["mtr"]
    >,
    GlobalAttributes {}
export interface MathMLMunderAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "accentunder">,
    DataGlobalAttributes,
    MichiAttributes<
      I["munder"] extends Element
        ? I["munder"]
        : MathMLElementTagNameMap["munder"]
    >,
    MathMLEvents<
      I["munder"] extends Element
        ? I["munder"]
        : MathMLElementTagNameMap["munder"]
    >,
    GlobalAttributes {}
export interface MathMLMunderoverAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "accent" | "accentunder">,
    DataGlobalAttributes,
    MichiAttributes<
      I["munderover"] extends Element
        ? I["munderover"]
        : MathMLElementTagNameMap["munderover"]
    >,
    MathMLEvents<
      I["munderover"] extends Element
        ? I["munderover"]
        : MathMLElementTagNameMap["munderover"]
    >,
    GlobalAttributes {}
export interface MathMLSemanticsAttributes<I extends Record<string, {}>>
  extends Pick<AllAttributes, "encoding">,
    DataGlobalAttributes,
    MichiAttributes<
      I["semantics"] extends Element
        ? I["semantics"]
        : MathMLElementTagNameMap["semantics"]
    >,
    MathMLEvents<
      I["semantics"] extends Element
        ? I["semantics"]
        : MathMLElementTagNameMap["semantics"]
    >,
    GlobalAttributes {}
export interface MathMLElements<I extends {} = {}> {
  /**
   * The `<math>` MathML element is the top-level MathML element, used to write a single mathematical formula. It can be placed in HTML content where flow content is permitted.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/math} */
  math: MathMLMathAttributes<I>;
  /**
   * The `<merror>` MathML element is used to display contents as error messages. The intent of this element is to provide a standard way for programs that generate MathML from other input to report syntax errors.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/merror} */
  merror: MathMLMerrorAttributes<I>;
  /**
   * The `<mfrac>` MathML element is used to display fractions. It can also be used to mark up fraction-like objects such as binomial coefficients and Legendre symbols.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac} */
  mfrac: MathMLMfracAttributes<I>;
  /**
   * The `<mi>` MathML element indicates that the content should be rendered as an identifier such as function names, variables or symbolic constants. You can also have arbitrary text in it to mark up terms.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi} */
  mi: MathMLMiAttributes<I>;
  /**
   * The `<mmultiscripts>` MathML element is used to attach an arbitrary number of subscripts and superscripts to an expression at once, generalizing the `<msubsup>` element. Scripts can be either prescripts (placed before the expression) or postscripts (placed after it).
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts} */
  mmultiscripts: MathMLMmultiscriptsAttributes<I>;
  /**
   * The `<mn>` MathML element represents a numeric literal which is normally a sequence of digits with a possible separator (a dot or a comma). However, it is also allowed to have arbitrary text in it which is actually a numeric quantity, for example "eleven".
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mn} */
  mn: MathMLMnAttributes<I>;
  /**
   * The `<mo>` MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo} */
  mo: MathMLMoAttributes<I>;
  /**
   * The `<mover>` MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mover} */
  mover: MathMLMoverAttributes<I>;
  /**
   * The `<mpadded>` MathML element is used to add extra padding and to set the general adjustment of position and size of enclosed contents.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mpadded} */
  mpadded: MathMLMpaddedAttributes<I>;
  /**
   * The `<mphantom>` MathML element is rendered invisibly, but dimensions (such as height, width, and baseline position) are still kept.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mphantom} */
  mphantom: MathMLMphantomAttributes<I>;
  /**
   * The `<mroot>` MathML element is used to display roots with an explicit index.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mroot} */
  mroot: MathMLMrootAttributes<I>;
  /**
   * The `<mrow>` MathML element is used to group sub-expressions, which usually contain one or more operators with their respective operands. This element renders as a horizontal row containing its arguments.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mrow} */
  mrow: MathMLMrowAttributes<I>;
  /**
   * The `<ms>` MathML element represents a string literal meant to be interpreted by programming languages and computer algebra systems.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms} */
  ms: MathMLMsAttributes<I>;
  /**
   * The `<mspace>` MathML element is used to display a blank space, whose size is set by its attributes.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mspace} */
  mspace: MathMLMspaceAttributes<I>;
  /**
   * The `<msqrt>` MathML element is used to display square roots (no index is displayed). The square root accepts only one argument, which leads to the following syntax: `<msqrt> base </msqrt>`.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msqrt} */
  msqrt: MathMLMsqrtAttributes<I>;
  /**
   * The `<mstyle>` MathML element is used to change the style of its children.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle} */
  mstyle: MathMLMstyleAttributes<I>;
  /**
   * The `<msub>` MathML element is used to attach a subscript to an expression.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub} */
  msub: MathMLMsubAttributes<I>;
  /**
   * The `<msubsup>` MathML element is used to attach both a subscript and a superscript, together, to an expression.
   *
   * It uses the following syntax: `<msubsup> base subscript superscript </msubsup>`.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup} */
  msubsup: MathMLMsubsupAttributes<I>;
  /**
   * The `<mtable>` MathML element allows you to create tables or matrices. Its children are `<mtr>` elements (representing rows), each of them having `<mtd>` elements as its children (representing cells). These elements are similar to `<table>`, `<tr>` and `<td>` elements of HTML.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable} */
  mtable: MathMLMtableAttributes<I>;
  /**
   * The `<mtd>` MathML element represents a cell in a table or a matrix. It may only appear in a `<mtr>` element. This element is similar to the `<td>` element of HTML.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd} */
  mtd: MathMLMtdAttributes<I>;
  /**
   * The `<mtext>` MathML element is used to render arbitrary text with no notational meaning, such as comments or annotations.
   * To display text with notational meaning, use `<mi>`, `<mn>`, `<mo>` or `<ms>` instead.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtext} */
  mtext: MathMLMtextAttributes<I>;
  /**
   * The `<mtr>` MathML element represents a row in a table or a matrix. It may only appear in a `<mtable>` element and its children are `<mtd>` elements representing cells. This element is similar to the `<tr>` element of HTML.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr} */
  mtr: MathMLMtrAttributes<I>;
  /**
   * The `<munder>` MathML element is used to attach an accent or a limit under an expression. It uses the following syntax: `<munder> base underscript </munder>`
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munder} */
  munder: MathMLMunderAttributes<I>;
  /**
   * The `<munderover>` MathML element is used to attach accents or limits both under and over an expression.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munderover} */
  munderover: MathMLMunderoverAttributes<I>;
  /**
   * The `<semantics>` MathML element associates annotations with a MathML expression, for example its text source as a lightweight markup language or mathematical meaning expressed in a special XML dialect.
   *
   * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics} */
  semantics: MathMLSemanticsAttributes<I>;
}
