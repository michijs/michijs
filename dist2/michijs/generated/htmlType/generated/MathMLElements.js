/**
 * @typedef {import('./AllAttributes').AllAttributes} AllAttributes
 */

/**
 * @typedef {import('./ValueSets').ValueSets} ValueSets
 */

/**
 * @typedef {import('../Events').MathMLEvents} MathMLEvents
 */

/**
 * @typedef {import('../DataGlobalAttributes').DataGlobalAttributes} DataGlobalAttributes
 */

/**
 * @typedef {import('../../../types').MichiAttributes} MichiAttributes
 */

/**
 * @typedef {object} GlobalAttributes
 * @property {ValueSets["41"]} [dir] The text direction. Possible values are either `ltr` (left to right) or `rtl` (right to left).
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute }
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMathAttributes
 * @property {ValueSets["43"]} [xmlns] Specifies the URI for the MathML namespace.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute }
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMerrorAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMfracAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMiAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMmultiscriptsAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMnAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMoAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMoverAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMpaddedAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMphantomAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMrootAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMrowAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMsAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMspaceAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMsqrtAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMstyleAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMsubAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMsubsupAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMtableAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMtdAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMtextAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMtrAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMunderAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLMunderoverAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} MathMLSemanticsAttributes
 */

/**
 * @template {{}} [I = {}]
 * @typedef {object} MathMLElements
 * @property {MathMLMathAttributes<I>} math The `<math>` MathML element is the top-level MathML element, used to write a single mathematical formula. It can be placed in HTML content where flow content is permitted.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/math }
 * @property {MathMLMerrorAttributes<I>} merror The `<merror>` MathML element is used to display contents as error messages. The intent of this element is to provide a standard way for programs that generate MathML from other input to report syntax errors.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/merror }
 * @property {MathMLMfracAttributes<I>} mfrac The `<mfrac>` MathML element is used to display fractions. It can also be used to mark up fraction-like objects such as binomial coefficients and Legendre symbols.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac }
 * @property {MathMLMiAttributes<I>} mi The `<mi>` MathML element indicates that the content should be rendered as an identifier such as function names, variables or symbolic constants. You can also have arbitrary text in it to mark up terms.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi }
 * @property {MathMLMmultiscriptsAttributes<I>} mmultiscripts The `<mmultiscripts>` MathML element is used to attach an arbitrary number of subscripts and superscripts to an expression at once, generalizing the `<msubsup>` element. Scripts can be either prescripts (placed before the expression) or postscripts (placed after it).
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts }
 * @property {MathMLMnAttributes<I>} mn The `<mn>` MathML element represents a numeric literal which is normally a sequence of digits with a possible separator (a dot or a comma). However, it is also allowed to have arbitrary text in it which is actually a numeric quantity, for example "eleven".
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mn }
 * @property {MathMLMoAttributes<I>} mo The `<mo>` MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo }
 * @property {MathMLMoverAttributes<I>} mover The `<mover>` MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mover }
 * @property {MathMLMpaddedAttributes<I>} mpadded The `<mpadded>` MathML element is used to add extra padding and to set the general adjustment of position and size of enclosed contents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mpadded }
 * @property {MathMLMphantomAttributes<I>} mphantom The `<mphantom>` MathML element is rendered invisibly, but dimensions (such as height, width, and baseline position) are still kept.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mphantom }
 * @property {MathMLMrootAttributes<I>} mroot The `<mroot>` MathML element is used to display roots with an explicit index.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mroot }
 * @property {MathMLMrowAttributes<I>} mrow The `<mrow>` MathML element is used to group sub-expressions, which usually contain one or more operators with their respective operands. This element renders as a horizontal row containing its arguments.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mrow }
 * @property {MathMLMsAttributes<I>} ms The `<ms>` MathML element represents a string literal meant to be interpreted by programming languages and computer algebra systems.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms }
 * @property {MathMLMspaceAttributes<I>} mspace The `<mspace>` MathML element is used to display a blank space, whose size is set by its attributes.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mspace }
 * @property {MathMLMsqrtAttributes<I>} msqrt The `<msqrt>` MathML element is used to display square roots (no index is displayed). The square root accepts only one argument, which leads to the following syntax: `<msqrt> base </msqrt>`.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msqrt }
 * @property {MathMLMstyleAttributes<I>} mstyle The `<mstyle>` MathML element is used to change the style of its children.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle }
 * @property {MathMLMsubAttributes<I>} msub The `<msub>` MathML element is used to attach a subscript to an expression.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub }
 * @property {MathMLMsubsupAttributes<I>} msubsup The `<msubsup>` MathML element is used to attach both a subscript and a superscript, together, to an expression.
 *
 * It uses the following syntax: `<msubsup> base subscript superscript </msubsup>`.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup }
 * @property {MathMLMtableAttributes<I>} mtable The `<mtable>` MathML element allows you to create tables or matrices. Its children are `<mtr>` elements (representing rows), each of them having `<mtd>` elements as its children (representing cells). These elements are similar to `<table>`, `<tr>` and `<td>` elements of HTML.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable }
 * @property {MathMLMtdAttributes<I>} mtd The `<mtd>` MathML element represents a cell in a table or a matrix. It may only appear in a `<mtr>` element. This element is similar to the `<td>` element of HTML.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd }
 * @property {MathMLMtextAttributes<I>} mtext The `<mtext>` MathML element is used to render arbitrary text with no notational meaning, such as comments or annotations.
 * To display text with notational meaning, use `<mi>`, `<mn>`, `<mo>` or `<ms>` instead.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtext }
 * @property {MathMLMtrAttributes<I>} mtr The `<mtr>` MathML element represents a row in a table or a matrix. It may only appear in a `<mtable>` element and its children are `<mtd>` elements representing cells. This element is similar to the `<tr>` element of HTML.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr }
 * @property {MathMLMunderAttributes<I>} munder The `<munder>` MathML element is used to attach an accent or a limit under an expression. It uses the following syntax: `<munder> base underscript </munder>`
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munder }
 * @property {MathMLMunderoverAttributes<I>} munderover The `<munderover>` MathML element is used to attach accents or limits both under and over an expression.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munderover }
 * @property {MathMLSemanticsAttributes<I>} semantics The `<semantics>` MathML element associates annotations with a MathML expression, for example its text source as a lightweight markup language or mathematical meaning expressed in a special XML dialect.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics }
 */
