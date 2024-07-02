/**
 * @typedef {import('./AllAttributes').AllAttributes} AllAttributes
 */

/**
 * @typedef {import('./ValueSets').ValueSets} ValueSets
 */

/**
 * @typedef {import('../Events').GlobalEvents} GlobalEvents
 * @typedef {import('../Events').WindowEvents} WindowEvents
 */

/**
 * @typedef {import('../DataGlobalAttributes').DataGlobalAttributes} DataGlobalAttributes
 */

/**
 * @typedef {import('../../../types').MichiAttributes} MichiAttributes
 */

/**
 * @typedef {object} GlobalAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLAAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLAbbrAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLAddressAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLAreaAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLArticleAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLAsideAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLAudioAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBaseAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBdiAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBdoAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBlockquoteAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBodyAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLBrAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLButtonAttributes
 * @property {ValueSets["bt"]} [type] The type of the button. Possible values are:
 *
 * *   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.
 * *   `reset`: The button resets all the controls to their initial values.
 * *   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur.
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLCanvasAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLCaptionAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLCiteAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLCodeAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLColAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLColgroupAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDataAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDatalistAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDdAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDelAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDetailsAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDfnAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDialogAttributes
 * @property {ValueSets["default"]} [open] Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user.
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDivAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDlAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLDtAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLEmAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLEmbedAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLFieldsetAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLFigcaptionAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLFigureAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLFooterAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLFormAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLH1Attributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLH2Attributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLH3Attributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLH4Attributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLH5Attributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLH6Attributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLHeadAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLHeaderAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLHgroupAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLHrAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLHtmlAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLIAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLIframeAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLImgAttributes
 * @property {ValueSets["referrerpolicy"]} [referrerpolicy] A string indicating which referrer to use when fetching the resource:
 *
 * *   `no-referrer:` The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.
 * *   `no-referrer-when-downgrade:` No `Referer` header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.
 * *   `origin:` The `Referer` header will include the page of origin's scheme, the host, and the port.
 * *   `origin-when-cross-origin:` Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.
 * *   `unsafe-url:` The `Referer` header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLInputAttributes
 * @property {ValueSets["inputautocomplete"]} [autocomplete]
 * @property {ValueSets["im"]} [inputmode]
 * @property {ValueSets["t"]} [type]
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLInsAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLKbdAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLLabelAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLLegendAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLLiAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLLinkAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLMainAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLMapAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLMarkAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLMenuAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLMetaAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLMeterAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLNavAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLNoscriptAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLObjectAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLOlAttributes
 * @property {ValueSets["lt"]} [type] Indicates the numbering type:
 *
 * *   `'a'` indicates lowercase letters,
 * *   `'A'` indicates uppercase letters,
 * *   `'i'` indicates lowercase Roman numerals,
 * *   `'I'` indicates uppercase Roman numerals,
 * *   and `'1'` indicates numbers (default).
 *
 * The type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li "The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.") element.
 *
 * **Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.
 *
 * Unless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property should be used instead.
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLOptgroupAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLOptionAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLOutputAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLParamAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLPAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLPictureAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLPreAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLProgressAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLQAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLRbAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLRpAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLRtAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLRubyAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSampAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLScriptAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSectionAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSelectAttributes
 * @property {ValueSets["inputautocomplete"]} [autocomplete] A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") providing a hint for a [user agent's](https://developer.mozilla.org/en-US/docs/Glossary/user_agent "user agent's: A user agent is a computer program representing a person, for example, a browser in a Web context.") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete.
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSlotAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSmallAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSourceAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSpanAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLStrongAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLStyleAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSubAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSummaryAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLSupAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTableAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTbodyAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTdAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTemplateAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTextareaAttributes
 * @property {ValueSets["inputautocomplete"]} [autocomplete] This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:
 *
 * *   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.
 * *   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.
 *
 * If the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element's form owner. The form owner is either the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").
 * @property {ValueSets["im"]} [inputmode]
 * @property {ValueSets["w"]} [wrap] Indicates how the control wraps text. Possible values are:
 *
 * *   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.
 * *   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.
 * *   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.
 *
 * If this attribute is not specified, `soft` is its default value.
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTfootAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLThAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTheadAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTimeAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTitleAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTrackAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLTrAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLUAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLUlAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLVarAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLVideoAttributes
 */

/**
 * @template {Record<string, {}>} I
 * @typedef {object} HTMLWbrAttributes
 */

/**
 * @template {{}} [I = {}]
 * @typedef {object} HTMLElements
 * @property {HTMLAAttributes<I>} a If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/a }
 * @property {HTMLAbbrAttributes<I>} abbr The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/abbr }
 * @property {HTMLAddressAttributes<I>} address The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/address }
 * @property {HTMLAreaAttributes<I>} area The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/area }
 * @property {HTMLArticleAttributes<I>} article The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/article }
 * @property {HTMLAsideAttributes<I>} aside The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/aside }
 * @property {HTMLAudioAttributes<I>} audio An audio element represents a sound or audio stream.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/audio }
 * @property {HTMLBAttributes<I>} b The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/b }
 * @property {HTMLBaseAttributes<I>} base The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/base }
 * @property {HTMLBdiAttributes<I>} bdi The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/bdi }
 * @property {HTMLBdoAttributes<I>} bdo The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/bdo }
 * @property {HTMLBlockquoteAttributes<I>} blockquote The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/blockquote }
 * @property {HTMLBodyAttributes<I>} body The body element represents the content of the document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/body }
 * @property {HTMLBrAttributes<I>} br The br element represents a line break.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/br }
 * @property {HTMLButtonAttributes<I>} button The button element represents a button labeled by its contents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/button }
 * @property {HTMLCanvasAttributes<I>} canvas The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/canvas }
 * @property {HTMLCaptionAttributes<I>} caption The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/caption }
 * @property {HTMLCiteAttributes<I>} cite The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/cite }
 * @property {HTMLCodeAttributes<I>} code The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/code }
 * @property {HTMLColAttributes<I>} col If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/col }
 * @property {HTMLColgroupAttributes<I>} colgroup The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/colgroup }
 * @property {HTMLDataAttributes<I>} data The data element links a given piece of content with a machine-readable translation.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/data }
 * @property {HTMLDatalistAttributes<I>} datalist The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/datalist }
 * @property {HTMLDdAttributes<I>} dd The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/dd }
 * @property {HTMLDelAttributes<I>} del The del element represents a removal from the document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/del }
 * @property {HTMLDetailsAttributes<I>} details The details element represents a disclosure widget from which the user can obtain additional information or controls.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/details }
 * @property {HTMLDfnAttributes<I>} dfn The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/dfn }
 * @property {HTMLDialogAttributes<I>} dialog The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/dialog }
 * @property {HTMLDivAttributes<I>} div The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/div }
 * @property {HTMLDlAttributes<I>} dl The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/dl }
 * @property {HTMLDtAttributes<I>} dt The dt element represents the term, or name, part of a term-description group in a description list (dl element).
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/dt }
 * @property {HTMLEmAttributes<I>} em The em element represents stress emphasis of its contents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/em }
 * @property {HTMLEmbedAttributes<I>} embed The embed element provides an integration point for an external (typically non-HTML) application or interactive content.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/embed }
 * @property {HTMLFieldsetAttributes<I>} fieldset The fieldset element represents a set of form controls optionally grouped under a common name.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/fieldset }
 * @property {HTMLFigcaptionAttributes<I>} figcaption The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/figcaption }
 * @property {HTMLFigureAttributes<I>} figure The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/figure }
 * @property {HTMLFooterAttributes<I>} footer The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/footer }
 * @property {HTMLFormAttributes<I>} form The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/form }
 * @property {HTMLH1Attributes<I>} h1 The h1 element represents a section heading.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements }
 * @property {HTMLH2Attributes<I>} h2 The h2 element represents a section heading.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements }
 * @property {HTMLH3Attributes<I>} h3 The h3 element represents a section heading.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements }
 * @property {HTMLH4Attributes<I>} h4 The h4 element represents a section heading.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements }
 * @property {HTMLH5Attributes<I>} h5 The h5 element represents a section heading.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements }
 * @property {HTMLH6Attributes<I>} h6 The h6 element represents a section heading.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements }
 * @property {HTMLHeadAttributes<I>} head The head element represents a collection of metadata for the Document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/head }
 * @property {HTMLHeaderAttributes<I>} header The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/header }
 * @property {HTMLHgroupAttributes<I>} hgroup The hgroup element represents a heading and related content. It groups a single h1–h6 element with one or more p.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/hgroup }
 * @property {HTMLHrAttributes<I>} hr The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/hr }
 * @property {HTMLHtmlAttributes<I>} html The html element represents the root of an HTML document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/html }
 * @property {HTMLIAttributes<I>} i The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/i }
 * @property {HTMLIframeAttributes<I>} iframe The iframe element represents a nested browsing context.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/iframe }
 * @property {HTMLImgAttributes<I>} img An img element represents an image.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/img }
 * @property {HTMLInputAttributes<I>} input The input element represents a typed data field, usually with a form control to allow the user to edit the data.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/input }
 * @property {HTMLInsAttributes<I>} ins The ins element represents an addition to the document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/ins }
 * @property {HTMLKbdAttributes<I>} kbd The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/kbd }
 * @property {HTMLLabelAttributes<I>} label The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/label }
 * @property {HTMLLegendAttributes<I>} legend The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/legend }
 * @property {HTMLLiAttributes<I>} li The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/li }
 * @property {HTMLLinkAttributes<I>} link The link element allows authors to link their document to other resources.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/link }
 * @property {HTMLMainAttributes<I>} main The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/main }
 * @property {HTMLMapAttributes<I>} map The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/map }
 * @property {HTMLMarkAttributes<I>} mark The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/mark }
 * @property {HTMLMenuAttributes<I>} menu The menu element represents an unordered list of interactive items.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/menu }
 * @property {HTMLMetaAttributes<I>} meta The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/meta }
 * @property {HTMLMeterAttributes<I>} meter The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/meter }
 * @property {HTMLNavAttributes<I>} nav The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/nav }
 * @property {HTMLNoscriptAttributes<I>} noscript The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/noscript }
 * @property {HTMLObjectAttributes<I>} object The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/object }
 * @property {HTMLOlAttributes<I>} ol The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/ol }
 * @property {HTMLOptgroupAttributes<I>} optgroup The optgroup element represents a group of option elements with a common label.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/optgroup }
 * @property {HTMLOptionAttributes<I>} option The option element represents an option in a select element or as part of a list of suggestions in a datalist element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/option }
 * @property {HTMLOutputAttributes<I>} output The output element represents the result of a calculation performed by the application, or the result of a user action.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/output }
 * @property {HTMLPAttributes<I>} p The p element represents a paragraph.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/p }
 * @property {HTMLParamAttributes<I>} param The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/param }
 * @property {HTMLPictureAttributes<I>} picture The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/picture }
 * @property {HTMLPreAttributes<I>} pre The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/pre }
 * @property {HTMLProgressAttributes<I>} progress The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/progress }
 * @property {HTMLQAttributes<I>} q The q element represents some phrasing content quoted from another source.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/q }
 * @property {HTMLRbAttributes<I>} rb The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/rb }
 * @property {HTMLRpAttributes<I>} rp The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/rp }
 * @property {HTMLRtAttributes<I>} rt The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/rt }
 * @property {HTMLRubyAttributes<I>} ruby The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/ruby }
 * @property {HTMLSAttributes<I>} s The s element represents contents that are no longer accurate or no longer relevant.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/s }
 * @property {HTMLSampAttributes<I>} samp The samp element represents sample or quoted output from another program or computing system.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/samp }
 * @property {HTMLScriptAttributes<I>} script The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/script }
 * @property {HTMLSectionAttributes<I>} section The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/section }
 * @property {HTMLSelectAttributes<I>} select The select element represents a control for selecting amongst a set of options.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/select }
 * @property {HTMLSlotAttributes<I>} slot The slot element is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/slot }
 * @property {HTMLSmallAttributes<I>} small The small element represents side comments such as small print.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/small }
 * @property {HTMLSourceAttributes<I>} source The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/source }
 * @property {HTMLSpanAttributes<I>} span The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/span }
 * @property {HTMLStrongAttributes<I>} strong The strong element represents strong importance, seriousness, or urgency for its contents.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/strong }
 * @property {HTMLStyleAttributes<I>} style The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/style }
 * @property {HTMLSubAttributes<I>} sub The sub element represents a subscript.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/sub }
 * @property {HTMLSummaryAttributes<I>} summary The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/summary }
 * @property {HTMLSupAttributes<I>} sup The sup element represents a superscript.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/sup }
 * @property {HTMLTableAttributes<I>} table The table element represents data with more than one dimension, in the form of a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/table }
 * @property {HTMLTbodyAttributes<I>} tbody The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/tbody }
 * @property {HTMLTdAttributes<I>} td The td element represents a data cell in a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/td }
 * @property {HTMLTemplateAttributes<I>} template The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/template }
 * @property {HTMLTextareaAttributes<I>} textarea The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/textarea }
 * @property {HTMLTfootAttributes<I>} tfoot The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/tfoot }
 * @property {HTMLThAttributes<I>} th The th element represents a header cell in a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/th }
 * @property {HTMLTheadAttributes<I>} thead The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/thead }
 * @property {HTMLTimeAttributes<I>} time The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/time }
 * @property {HTMLTitleAttributes<I>} title The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/title }
 * @property {HTMLTrAttributes<I>} tr The tr element represents a row of cells in a table.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/tr }
 * @property {HTMLTrackAttributes<I>} track The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/track }
 * @property {HTMLUAttributes<I>} u The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/u }
 * @property {HTMLUlAttributes<I>} ul The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/ul }
 * @property {HTMLVarAttributes<I>} var The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/var }
 * @property {HTMLVideoAttributes<I>} video A video element is used for playing videos or movies, and audio files with captions.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/video }
 * @property {HTMLWbrAttributes<I>} wbr The wbr element represents a line break opportunity.
 *
 * [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Element/wbr }
 */
