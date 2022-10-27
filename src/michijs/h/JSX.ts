import { SingleJSXElement } from '../types';
import type {
  HTMLElements, SVGElements
} from '@lsegurado/htmltype';
import { Tag } from './Tag';

declare global {
    namespace JSX {
        // interface ElementClass {
        //     render: () => JSX.Element;
        // }
        interface ElementAttributesProperty {
            props; // specify the property name to use
        }
        // Will show an error because of dist folder
        type Element = SingleJSXElement;
        interface ElementChildrenAttribute {
            children: JSX.Element; // specify children name to use
        }
        interface IntrinsicElements {
            // HTML elements
            /**
             * The HTML Abbreviation element (`<abbr>`) represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
             */
            abbr: Tag<HTMLElements.abbr, HTMLElementTagNameMap['abbr']>;
            /**
             * The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
             */
            address: Tag<HTMLElements.address, HTMLElementTagNameMap['address']>;
            /**
             * The HTML `<area>` element defines an area inside an image map that has predefined clickable areas. An image map allows geometric areas on an image to be associated with hypertext link.
             * This element is used only within a `<map>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
             */
            area: Tag<HTMLElements.area, HTMLElementTagNameMap['area']>;

            /**
             * The HTML `<article>` element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
             */
            article: Tag<HTMLElements.article, HTMLElementTagNameMap['article']>;
            /**
             * The HTML `<aside>` element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
             */
            aside: Tag<HTMLElements.aside, HTMLElementTagNameMap['aside']>;
            /**
             * The HTML `<audio>` element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the `<source>` element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
             */
            audio: Tag<HTMLElements.audio, HTMLElementTagNameMap['audio']>;
            /**
             * The HTML Bring Attention To element (`<b>`) is used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. This was formerly known as the Boldface element, and most browsers still draw the text in boldface. However, you should not use `<b>` for styling text; instead, you should use the CSS font-weight property to create boldface text, or the `<strong>` element to indicate that text is of special importance.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
             */
            b: Tag<HTMLElements.b, HTMLElementTagNameMap['b']>;
            /**
             * The HTML `<base>` element specifies the base URL to use for all relative URLs in a document. There can be only one `<base>` element in a document.
             */
            base: Tag<HTMLElements.base, HTMLElementTagNameMap['base']>;
            /**
             * The HTML Bidirectional Isolate element (`<bdi>`)  tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. It's particularly useful when a website dynamically inserts some text and doesn't know the directionality of the text being inserted.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
             */
            bdi: Tag<HTMLElements.bdi, HTMLElementTagNameMap['bdi']>;
            /**
             * The HTML Bidirectional Text Override element (`<bdo>`) overrides the current directionality of text, so that the text within is rendered in a different direction.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
             */
            bdo: Tag<HTMLElements.bdo, HTMLElementTagNameMap['bdo']>;
            /**
             * The HTML `<blockquote>` Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `<cite>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
             */
            blockquote: Tag<HTMLElements.blockquote, HTMLElementTagNameMap['blockquote']>;
            /**
             * The HTML `<body>` Element represents the content of an HTML document. There can be only one `<body>` element in a document.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
             */
            body: Tag<HTMLElements.body, HTMLElementTagNameMap['body']>;
            /**
             * The HTML `<br>` element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
             */
            br: Tag<HTMLElements.br, HTMLElementTagNameMap['br']>;
            /**
             * The HTML `<button>` element represents a clickable button, used to submit forms or anywhere in a document for accessible, standard button functionality. By default, HTML buttons are presented in a style resembling the platform the user agent runs on, but you can change buttons’ appearance with CSS.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
             */
            button: Tag<HTMLElements.button, HTMLElementTagNameMap['button']>;
            /**
             * Use the HTML `<canvas>` element with either the canvas scripting API or the WebGL API to draw graphics and animations.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
             */
            canvas: Tag<HTMLElements.canvas, HTMLElementTagNameMap['canvas']>;
            /**
             * The HTML `<caption>` element specifies the caption (or title) of a table.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
             */
            caption: Tag<HTMLElements.caption, HTMLElementTagNameMap['caption']>;
            /**
             * The HTML Citation element (`<cite>`) is used to describe a reference to a cited creative work, and must include the title of that work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
             */
            cite: Tag<HTMLElements.cite, HTMLElementTagNameMap['cite']>;
            /**
             * The HTML `<code>` element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
             */
            code: Tag<HTMLElements.code, HTMLElementTagNameMap['code']>;
            /**
             * The HTML `<col>` element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a `<colgroup>` element
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
             */
            col: Tag<HTMLElements.col, HTMLElementTagNameMap['col']>;
            /**
             * The HTML `<colgroup>` element defines a group of columns within a table.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
             */
            colgroup: Tag<HTMLElements.colgroup, HTMLElementTagNameMap['colgroup']>;
            /**
             * The HTML `<data>` element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the `<time>` element must be used.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
             */
            data: Tag<HTMLElements.data, HTMLElementTagNameMap['data']>;
            /**
             * The HTML `<datalist>` element contains a set of `<option>` elements that represent the permissible or recommended options available to choose from within other controls.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
             */
            datalist: Tag<HTMLElements.datalist, HTMLElementTagNameMap['datalist']>;
            /**
             * The HTML `<dd>` element provides the description, definition, or value for the preceding term (`<dt>`) in a description list (`<dl>`).
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
             */
            dd: Tag<HTMLElements.dd, HTMLElementTagNameMap['dd']>;
            /**
             * The HTML `<del>` element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The `<ins>` element can be used for the opposite purpose: to indicate text that has been added to the document.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
             */
            del: Tag<HTMLElements.del, HTMLElementTagNameMap['del']>;
            /**
             * The HTML Details Element (`<details>`) creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label can be provided using the `<summary>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
             */
            details: Tag<HTMLElements.details, HTMLElementTagNameMap['details']>;
            /**
             * The HTML Definition element (`<dfn>`) is used to indicate the term being defined within the context of a definition phrase or sentence. The `<p>` element, the `<dt>`/`<dd>` pairing, or the `<section>` element which is the nearest ancestor of the `<dfn>` is considered to be the definition of the term.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
             */
            dfn: Tag<HTMLElements.dfn, HTMLElementTagNameMap['dfn']>;
            /**
             * The HTML `<dialog>` element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
             */
            dialog: Tag<HTMLElements.dialog, HTMLElementTagNameMap['dialog']>;
            /**
             * The HTML Content Division element (`<div>`) is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
             */
            div: Tag<HTMLElements.div, HTMLElementTagNameMap['div']>;
            /**
             * The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
             */
            dl: Tag<HTMLElements.dl, HTMLElementTagNameMap['dl']>;
            /**
             * The HTML `<dt>` element specifies a term in a description or definition list, and as such must be used inside a `<dl>` element. It is usually followed by a `<dd>` element; however, multiple `<dt>` elements in a row indicate several terms that are all defined by the immediate next `<dd>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
             */
            dt: Tag<HTMLElements.dt, HTMLElementTagNameMap['dt']>;
            /**
             * The HTML `<em>` element marks text that has stress emphasis. The `<em>` element can be nested, with each level of nesting indicating a greater degree of emphasis.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
             */
            em: Tag<HTMLElements.em, HTMLElementTagNameMap['em']>;
            /**
             * The HTML `<embed>` element embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
             */
            embed: Tag<HTMLElements.embed, HTMLElementTagNameMap['embed']>;
            /**
             * The HTML `<fieldset>` element is used to group several controls as well as labels (`<label>`) within a web form.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
             */
            fieldset: Tag<HTMLElements.fieldset, HTMLElementTagNameMap['fieldset']>;
            /**
             * The HTML `<figcaption>` or Figure Caption element represents a caption or legend describing the rest of the contents of its parent `<figure>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
             */
            figcaption: Tag<HTMLElements.figcaption, HTMLElementTagNameMap['figcaption']>;
            /**
             * The HTML `<figure>` (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption, which is specified using the (`<figcaption>`) element. The figure, its caption, and its contents are referenced as a single unit.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
             */
            figure: Tag<HTMLElements.figure, HTMLElementTagNameMap['figure']>;

            /**
             * The HTML `<footer>` element represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about the author of the section, copyright data or links to related documents.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
             */
            footer: Tag<HTMLElements.footer, HTMLElementTagNameMap['footer']>;
            /**
             * The HTML `<form>` element represents a document section containing interactive controls for submitting information.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
             */
            form: Tag<HTMLElements.form, HTMLElementTagNameMap['form']>;
            /**
             * The HTML `<h1>`–`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
             */
            h1: Tag<HTMLElements.h1, HTMLElementTagNameMap['h1']>;
            /**
             * The HTML `<h1>`–`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
             */
            h2: Tag<HTMLElements.h2, HTMLElementTagNameMap['h2']>;
            /**
             * The HTML `<h1>`–`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
             */
            h3: Tag<HTMLElements.h3, HTMLElementTagNameMap['h3']>;
            /**
             * The HTML `<h1>`–`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
             */
            h4: Tag<HTMLElements.h4, HTMLElementTagNameMap['h4']>;
            /**
             * The HTML `<h1>`–`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
             */
            h5: Tag<HTMLElements.h5, HTMLElementTagNameMap['h5']>;
            /**
             * The HTML `<h1>`–`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
             */
            h6: Tag<HTMLElements.h6, HTMLElementTagNameMap['h6']>;
            /**
             * The HTML `<head>` element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
             */
            head: Tag<HTMLElements.head, HTMLElementTagNameMap['head']>;
            /**
             * The HTML `<header>` element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
             */
            header: Tag<HTMLElements.header, HTMLElementTagNameMap['header']>;
            /**
             * The HTML `<hr>` element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
             */
            hr: Tag<HTMLElements.hr, HTMLElementTagNameMap['hr']>;
            /**
             * The HTML `<html>` element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
             */
            html: Tag<HTMLElements.html, HTMLElementTagNameMap['html']>;
            /**
             * The HTML Idiomatic Text element (`<i>`) represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. Historically, these have been presented using italicized type, which is the original source of the `<i>` naming of this element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
             */
            i: Tag<HTMLElements.i, HTMLElementTagNameMap['i']>;
            /**
             * The HTML Inline Frame element (`<iframe>`) represents a nested browsing context, embedding another HTML page into the current one.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
             */
            iframe: Tag<HTMLElements.iframe, HTMLElementTagNameMap['iframe']>;
            /**
             * The HTML `<img>` element embeds an image into the document.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
             */
            img: Tag<HTMLElements.img, HTMLElementTagNameMap['img']>;
            /**
             * The HTML `<input>` element is used to create interactive controls for web-based forms in order to accept data from the user.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
             */
            input: Tag<HTMLElements.input, HTMLElementTagNameMap['input']>;
            /**
             * The HTML `<ins>` element represents a range of text that has been added to a document.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
             */
            ins: Tag<HTMLElements.ins, HTMLElementTagNameMap['ins']>;
            /**
             * The HTML Keyboard Input element (`<kbd>`) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a `<kbd>` element using its default monospace font, although this is not mandated by the HTML standard.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
             */
            kbd: Tag<HTMLElements.kbd, HTMLElementTagNameMap['kbd']>;
            /**
             * The HTML `<label>` element represents a caption for an item in a user interface.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
             */
            label: Tag<HTMLElements.label, HTMLElementTagNameMap['label']>;
            /**
             * The HTML `<legend>` element represents a caption for the content of its parent `<fieldset>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
             */
            legend: Tag<HTMLElements.legend, HTMLElementTagNameMap['legend']>;
            /**
             * The HTML `<li>` element is used to represent an item in a list. It must be contained in a parent element: an ordered list (`<ol>`), an unordered list (`<ul>`), or a menu (`<menu>`). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
             */
            li: Tag<HTMLElements.li, HTMLElementTagNameMap['li']>;
            /**
             * The HTML External Resource Link element (`<link>`) specifies relationships between the current document and an external resource. This element is most commonly used to link to stylesheets, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
             */
            link: Tag<HTMLElements.link, HTMLElementTagNameMap['link']>;
            /**
             * The HTML `<main>` element represents the dominant content of the `<body>` of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
             */
            main: Tag<HTMLElements.main, HTMLElementTagNameMap['main']>;
            /**
             * The HTML `<map>` element is used with `<area>` elements to define an image map (a clickable link area).
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
             */
            map: Tag<HTMLElements.map, HTMLElementTagNameMap['map']>;
            /**
             * The HTML Mark Text element (`<mark>`) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
             */
            mark: Tag<HTMLElements.mark, HTMLElementTagNameMap['mark']>;
            /**
             * The HTML `<meta>` element represents metadata that cannot be represented by other HTML meta-related elements, like `<base>`, `<link>`, `<script>`, `<style>` or `<title>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
             */
            meta: Tag<HTMLElements.meta, HTMLElementTagNameMap['meta']>;
            /**
             * The HTML `<meter>` element represents either a scalar value within a known range or a fractional value.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
             */
            meter: Tag<HTMLElements.meter, HTMLElementTagNameMap['meter']>;
            /**
             * The HTML `<nav>` element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
             */
            nav: Tag<HTMLElements.nav, HTMLElementTagNameMap['nav']>;
            /**
             * The HTML `<noscript>` element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
             */
            noscript: Tag<HTMLElements.noscript, HTMLElementTagNameMap['noscript']>;
            /**
             * The HTML `<object>` element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
             */
            object: Tag<HTMLElements._object, HTMLElementTagNameMap['object']>;
            /**
             * The HTML `<ol>` element represents an ordered list of items — typically rendered as a numbered list.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
             */
            ol: Tag<HTMLElements.ol, HTMLElementTagNameMap['ol']>;
            /**
             * The HTML `<optgroup>` element creates a grouping of options within a `<select>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
             */
            optgroup: Tag<HTMLElements.optgroup, HTMLElementTagNameMap['optgroup']>;
            /**
             * The HTML `<option>` element is used to define an item contained in a `<select>`, an `<optgroup>`, or a `<datalist>` element. As such, `<option>` can represent menu items in popups and other lists of items in an HTML document.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
             */
            option: Tag<HTMLElements.option, HTMLElementTagNameMap['option']>;
            /**
             * The HTML Output element (`<output>`) is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
             */
            output: Tag<HTMLElements.output, HTMLElementTagNameMap['output']>;
            /**
             * The HTML `<p>` element represents a paragraph. Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, but HTML paragraphs can be any structural grouping of related content, such as images or form fields.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
             */
            p: Tag<HTMLElements.p, HTMLElementTagNameMap['p']>;
            /**
             * The HTML `<picture>` element contains zero or more `<source>` elements and one `<img>` element to offer alternative versions of an image for different display/device scenarios.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
             */
            picture: Tag<HTMLElements.picture, HTMLElementTagNameMap['picture']>;
            /**
             * The HTML `<pre>` element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional ("monospace") font. Whitespace inside this element is displayed as written.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
             */
            pre: Tag<HTMLElements.pre, HTMLElementTagNameMap['pre']>;
            /**
             * The HTML `<progress>` element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
             */
            progress: Tag<HTMLElements.progress, HTMLElementTagNameMap['progress']>;
            /**
             * The HTML `<q>` element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the `<blockquote>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
             */
            q: Tag<HTMLElements.q, HTMLElementTagNameMap['q']>;
            /**
             * The HTML Ruby Fallback Parenthesis (`<rp>`) element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the `<ruby>` element. One `<rp>` element should enclose each of the opening and closing parentheses that wrap the `<rt>` element that contains the annotation's text.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
             */
            rp: Tag<HTMLElements.rp, HTMLElementTagNameMap['rp']>;
            /**
             * The HTML Ruby Text (`<rt>`) element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The `<rt>` element must always be contained within a `<ruby>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
             */
            rt: Tag<HTMLElements.rt, HTMLElementTagNameMap['rt']>;
            /**
             * The HTML `<ruby>` element represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. It can also be used for annotating other kinds of text, but this usage is less common.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
             */
            ruby: Tag<HTMLElements.ruby, HTMLElementTagNameMap['ruby']>;
            /**
             * The HTML `<s>` element renders text with a strikethrough, or a line through it. Use the `<s>` element to represent things that are no longer relevant or no longer accurate. However, `<s>` is not appropriate when indicating document edits; for that, use the `<del>` and `<ins>` elements, as appropriate.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
             */
            s: Tag<HTMLElements.s, HTMLElementTagNameMap['s']>;
            /**
             * The HTML Sample Element (`<samp>`) is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console).
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
             */
            samp: Tag<HTMLElements.samp, HTMLElementTagNameMap['samp']>;
            /**
             * The HTML `<section>` element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
             */
            section: Tag<HTMLElements.section, HTMLElementTagNameMap['section']>;
            /**
             * The HTML `<select>` element represents a control that provides a menu of options:
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
             */
            select: Tag<HTMLElements.select, HTMLElementTagNameMap['select']>;
            /**
             * The HTML `<slot>` element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
             */
            slot: Tag<HTMLElements.slot, HTMLElementTagNameMap['slot']>;
            /**
             * The HTML `<small>` element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
             */
            small: Tag<HTMLElements.small, HTMLElementTagNameMap['small']>;
            /**
             * The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element. It is an empty element, meaning that it has no content and does not have a closing tag. It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
             */
            source: Tag<HTMLElements.source, HTMLElementTagNameMap['source']>;
            /**
             * The HTML `<span>` element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. `<span>` is very much like a `<div>` element, but `<div>` is a block-level element whereas a `<span>` is an inline element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
             */
            span: Tag<HTMLElements.span, HTMLElementTagNameMap['span']>;
            /**
             * The HTML Strong Importance Element (`<strong>`) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
             */
            strong: Tag<HTMLElements.strong, HTMLElementTagNameMap['strong']>;
            /**
             * The HTML Subscript element (`<sub>`) specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
             */
            sub: Tag<HTMLElements.sub, HTMLElementTagNameMap['sub']>;
            /**
             * The HTML Disclosure Summary element (`<summary>`) element specifies a summary, caption, or legend for a `<details>` element's disclosure box. Clicking the `<summary>` element toggles the state of the parent `<details>` element open and closed.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
             */
            summary: Tag<HTMLElements.summary, HTMLElementTagNameMap['summary']>;
            /**
             * The HTML Superscript element (`<sup>`) specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
             */
            sup: Tag<HTMLElements.sup, HTMLElementTagNameMap['sup']>;
            /**
             * The HTML `<table>` element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
             */
            table: Tag<HTMLElements.table, HTMLElementTagNameMap['table']>;
            /**
             * The HTML Table Body element (`<tbody>`) encapsulates a set of table rows (`<tr>` elements), indicating that they comprise the body of the table (`<table>`).
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
             */
            tbody: Tag<HTMLElements.tbody, HTMLElementTagNameMap['tbody']>;
            /**
             * The HTML `<td>` element defines a cell of a table that contains data. It participates in the table model.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
             */
            td: Tag<HTMLElements.td, HTMLElementTagNameMap['td']>;
            /**
             * The HTML Content Template (`<template>`) element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
             */
            template: Tag<HTMLElements.template, HTMLElementTagNameMap['template']>;
            /**
             * The HTML `<textarea>` element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
             */
            textarea: Tag<HTMLElements.textarea, HTMLElementTagNameMap['textarea']>;
            /**
             * The HTML `<tfoot>` element defines a set of rows summarizing the columns of the table.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
             */
            tfoot: Tag<HTMLElements.tfoot, HTMLElementTagNameMap['tfoot']>;
            /**
             * The HTML `<th>` element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
             */
            th: Tag<HTMLElements.th, HTMLElementTagNameMap['th']>;
            /**
             * The HTML `<thead>` element defines a set of rows defining the head of the columns of the table.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
             */
            thead: Tag<HTMLElements.thead, HTMLElementTagNameMap['thead']>;
            /**
             * The HTML `<time>` element represents a specific period in time. It may include the datetime attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
             */
            time: Tag<HTMLElements.time, HTMLElementTagNameMap['time']>;
            /**
             * The HTML `<tr>` element defines a row of cells in a table. The row's cells can then be established using a mix of `<td>` (data cell) and `<th>` (header cell) elements.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
             */
            tr: Tag<HTMLElements.tr, HTMLElementTagNameMap['tr']>;
            /**
             * The HTML `<track>` element is used as a child of the media elements, `<audio>` and `<video>`. It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
             */
            track: Tag<HTMLElements.track, HTMLElementTagNameMap['track']>;
            /**
             * The HTML Unarticulated Annotation element (`<u>`) represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. This is rendered by default as a simple solid underline, but may be altered using CSS.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
             */
            u: Tag<HTMLElements.u, HTMLElementTagNameMap['u']>;
            /**
             * The HTML `<ul>` element represents an unordered list of items, typically rendered as a bulleted list.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
             */
            ul: Tag<HTMLElements.ul, HTMLElementTagNameMap['ul']>;
            /**
             * The HTML Variable element (`<var>`) represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
             */
            var: Tag<HTMLElements._var, HTMLElementTagNameMap['var']>;
            /**
             * The HTML Video element (`<video>`) embeds a media player which supports video playback into the document. You can use `<video>` for audio content as well, but the `<audio>` element may provide a more appropriate user experience.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
             */
            video: Tag<HTMLElements.video, HTMLElementTagNameMap['video']>;
            /**
             * The HTML `<wbr>` element represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
             */
            wbr: Tag<HTMLElements.wbr, HTMLElementTagNameMap['wbr']>;
            // Mixed svg / html elements
            /**
              * The HTML `<a>` element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address. Content within each `<a>` should indicate the link's destination. If the href attribute is present, pressing the enter key while focused on the `<a>` element will activate it.
              * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
              * 
              * The `<a>` SVG element creates a hyperlink to other web pages, files, locations in the same page, email addresses, or any other URL. It is very similar to HTML’s `<a>` element.
              * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a
              */
            a: Tag<HTMLElements.a, HTMLElementTagNameMap['a']> | Tag<SVGElements.a, SVGElementTagNameMap['a']>;

            /**
             * The HTML `<script>` element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code. The `<script>` element can also be used with other languages, such as WebGL's GLSL shader programming language and JSON.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
             * 
             * The SVG script element allows to add scripts to an SVG document.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/script
             */
            script: Tag<SVGElements.script, SVGElementTagNameMap['script']> | Tag<HTMLElements.script, HTMLElementTagNameMap['script']>;
            /**
             * The HTML `<style>` element contains style information for a document, or part of a document. It contains CSS, which is applied to the contents of the document containing the `<style>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
             * 
             * The SVG `<style>` element allows style sheets to be embedded directly within SVG content.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style
             */
            style: Tag<SVGElements.style, SVGElementTagNameMap['style']> | Tag<HTMLElements.style, HTMLElementTagNameMap['style']>;
            /**
             * The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text; tags within the element are ignored.
             * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
             * 
             * The `<title>` element provides an accessible, short-text description of any SVG container element or graphics element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
             */
            title: Tag<SVGElements.title, SVGElementTagNameMap['title']> | Tag<HTMLElements.title, HTMLElementTagNameMap['title']>;
            //  SVG elements
            /**
            * The SVG `<animate>` element provides a way to animate an attribute of an element over time.
            * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
            */
            animate: Tag<SVGElements.animate, SVGElementTagNameMap['animate']>;
            /**
             * The SVG `<animateMotion>` element let define how an element moves along a motion path.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion
             */
            animateMotion: Tag<SVGElements.animate, SVGElementTagNameMap['animateMotion']>;
            /**
             * The animateTransform element animates a transformation attribute on its target element, thereby allowing animations to control translation, scaling, rotation, and/or skewing.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform
             */
            animateTransform: Tag<SVGElements.animateTransform, SVGElementTagNameMap['animateTransform']>;
            /**
             * The `<circle>` SVG element is an SVG basic shape, used to draw circles based on a center point and a radius.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
             */
            circle: Tag<SVGElements.circle, SVGElementTagNameMap['circle']>;
            /**
             * The `<clipPath>` SVG element defines a clipping path, to be used by the clip-path property.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
             */
            clipPath: Tag<SVGElements.clipPath, SVGElementTagNameMap['clipPath']>;
            /**
             * The `<defs>` element is used to store graphical objects that will be used at a later time. Objects created inside a `<defs>` element are not rendered directly. To display them you have to reference them (with a `<use>` element for example).
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
             */
            defs: Tag<SVGElements.defs, SVGElementTagNameMap['defs']>;
            /**
             * The `<desc>` element provides an accessible, long-text description of any SVG container element or graphics element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc
             */
            desc: Tag<SVGElements.desc, SVGElementTagNameMap['desc']>;
            /**
             * The `<ellipse>` element is an SVG basic shape, used to create ellipses based on a center coordinate, and both their x and y radius.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse
             */
            ellipse: Tag<SVGElements.ellipse, SVGElementTagNameMap['ellipse']>;
            /**
             * The `<feBlend>` SVG filter primitive composes two objects together ruled by a certain blending mode. This is similar to what is known from image editing software when blending two layers. The mode is defined by the mode attribute.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend
             */
            feBlend: Tag<SVGElements.feBlend, SVGElementTagNameMap['feBlend']>;
            /**
             * The `<feColorMatrix>` SVG filter element changes colors based on a transformation matrix. Every pixel's color value [R,G,B,A] is matrix multiplied by a 5 by 5 color matrix to create new color [R',G',B',A'].
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix
             */
            feColorMatrix: Tag<SVGElements.feColorMatrix, SVGElementTagNameMap['feColorMatrix']>;
            /**
             * The `<feComponentTransfer>` SVG filter primitive performs color-component-wise remapping of data for each pixel. It allows operations like brightness adjustment, contrast adjustment, color balance or thresholding.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer
             */
            feComponentTransfer: Tag<SVGElements.feComponentTransfer, SVGElementTagNameMap['feComponentTransfer']>;
            /**
             * The `<feComposite>` SVG filter primitive performs the combination of two input images pixel-wise in image space using one of the Porter-Duff compositing operations: over, in, atop, out, xor, lighter, or arithmetic.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite
             */
            feComposite: Tag<SVGElements.feComposite, SVGElementTagNameMap['feComposite']>;
            /**
             * The `<feConvolveMatrix>` SVG filter primitive applies a matrix convolution filter effect. A convolution combines pixels in the input image with neighboring pixels to produce a resulting image. A wide variety of imaging operations can be achieved through convolutions, including blurring, edge detection, sharpening, embossing and beveling.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix
             */
            feConvolveMatrix: Tag<SVGElements.feConvolveMatrix, SVGElementTagNameMap['feConvolveMatrix']>;
            /**
             * The `<feDiffuseLighting>` SVG filter primitive lights an image using the alpha channel as a bump map. The resulting image, which is an RGBA opaque image, depends on the light color, light position and surface geometry of the input bump map.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting
             */
            feDiffuseLighting: Tag<SVGElements.feDiffuseLighting, SVGElementTagNameMap['feDiffuseLighting']>;
            /**
             * The `<feDisplacementMap>` SVG filter primitive uses the pixel values from the image from in2 to spatially displace the image from in.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap
             */
            feDisplacementMap: Tag<SVGElements.feDisplacementMap, SVGElementTagNameMap['feDisplacementMap']>;
            /**
             * The `<feDistantLight>` filter primitive defines a distant light source that can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDistantLight
             */
            feDistantLight: Tag<SVGElements.feDistantLight, SVGElementTagNameMap['feDistantLight']>;
            /**
             * The `<feFlood>` SVG filter primitive fills the filter subregion with the color and opacity defined by flood-color and flood-opacity.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood
             */
            feFlood: Tag<SVGElements.feFlood, SVGElementTagNameMap['feFlood']>;
            /**
             * The `<feFuncA>` SVG filter primitive defines the transfer function for the alpha component of the input graphic of its parent `<feComponentTransfer>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncA
             */
            feFuncA: Tag<SVGElements.feFuncA, SVGElementTagNameMap['feFuncA']>;
            /**
             * The `<feFuncB>` SVG filter primitive defines the transfer function for the blue component of the input graphic of its parent `<feComponentTransfer>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncB
             */
            feFuncB: Tag<SVGElements.feFuncB, SVGElementTagNameMap['feFuncB']>;
            /**
             * The `<feFuncG>` SVG filter primitive defines the transfer function for the green component of the input graphic of its parent `<feComponentTransfer>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncG
             */
            feFuncG: Tag<SVGElements.feFuncG, SVGElementTagNameMap['feFuncG']>;
            /**
             * The `<feFuncR>` SVG filter primitive defines the transfer function for the red component of the input graphic of its parent `<feComponentTransfer>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncR
             */
            feFuncR: Tag<SVGElements.feFuncR, SVGElementTagNameMap['feFuncR']>;
            /**
             * The `<feGaussianBlur>` SVG filter primitive blurs the input image by the amount specified in stdDeviation, which defines the bell-curve.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur
             */
            feGaussianBlur: Tag<SVGElements.feGaussianBlur, SVGElementTagNameMap['feGaussianBlur']>;
            /**
             * The `<feImage>` SVG filter primitive fetches image data from an external source and provides the pixel data as output (meaning if the external source is an SVG image, it is rasterized.)
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage
             */
            feImage: Tag<SVGElements.feImage, SVGElementTagNameMap['feImage']>;
            /**
             * The `<feMerge>` SVG element allows filter effects to be applied concurrently instead of sequentially. This is achieved by other filters storing their output via the result attribute and then accessing it in a `<feMergeNode>` child.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge
             */
            feMerge: Tag<SVGElements.feMerge, SVGElementTagNameMap['feMerge']>;
            /**
             * The feMergeNode takes the result of another filter to be processed by its parent `<feMerge>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMergeNode
             */
            feMergeNode: Tag<SVGElements.feMergeNode, SVGElementTagNameMap['feMergeNode']>;
            /**
             * The `<feMorphology>` SVG filter primitive is used to erode or dilate the input image. Its usefulness lies especially in fattening or thinning effects.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology
             */
            feMorphology: Tag<SVGElements.feMorphology, SVGElementTagNameMap['feMorphology']>;
            /**
             * The `<feOffset>` SVG filter primitive allows to offset the input image. The input image as a whole is offset by the values specified in the dx and dy attributes.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset
             */
            feOffset: Tag<SVGElements.feOffset, SVGElementTagNameMap['feOffset']>;
            /**
             * The `<fePointLight>` filter primitive defines a light source which allows to create a point light effect. It that can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/fePointLight
             */
            fePointLight: Tag<SVGElements.fePointLight, SVGElementTagNameMap['fePointLight']>;
            /**
             * The `<feSpecularLighting>` SVG filter primitive lights a source graphic using the alpha channel as a bump map. The resulting image is an RGBA image based on the light color. The lighting calculation follows the standard specular component of the Phong lighting model. The resulting image depends on the light color, light position and surface geometry of the input bump map. The result of the lighting calculation is added. The filter primitive assumes that the viewer is at infinity in the z direction.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting
             */
            feSpecularLighting: Tag<SVGElements.feSpecularLighting, SVGElementTagNameMap['feSpecularLighting']>;
            /**
             * The `<feSpotLight>` SVG filter primitive defines a light source which allows to create a spotlight effect. It that can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpotLight
             */
            feSpotLight: Tag<SVGElements.feSpotLight, SVGElementTagNameMap['feSpotLight']>;
            /**
             * The `<feTile>` SVG filter primitive allows to fill a target rectangle with a repeated, tiled pattern of an input image. The effect is similar to the one of a `<pattern>`.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile
             */
            feTile: Tag<SVGElements.feTile, SVGElementTagNameMap['feTile']>;
            /**
             * The `<feTurbulence>` SVG filter primitive creates an image using the Perlin turbulence function. It allows the synthesis of artificial textures like clouds or marble. The resulting image will fill the entire filter primitive subregion.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence
             */
            feTurbulence: Tag<SVGElements.feTurbulence, SVGElementTagNameMap['feTurbulence']>;
            /**
             * The `<filter>` SVG element defines a custom filter effect by grouping atomic filter primitives. It is never rendered itself, but must be used by the filter attribute on SVG elements, or the filter CSS property for SVG/HTML elements.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
             */
            filter: Tag<SVGElements.filter, SVGElementTagNameMap['filter']>;
            /**
             * The `<foreignObject>` SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject
             */
            foreignObject: Tag<SVGElements.foreignObject, SVGElementTagNameMap['foreignObject']>;
            /**
             * The `<g>` SVG element is a container used to group other SVG elements.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
             */
            g: Tag<SVGElements.g, SVGElementTagNameMap['g']>;
            /**
             * The `<image>` SVG element includes images inside SVG documents. It can display raster image files or other SVG files.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image
             */
            image: Tag<SVGElements.image, SVGElementTagNameMap['image']>;
            /**
             * The `<line>` element is an SVG basic shape used to create a line connecting two points.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
             */
            line: Tag<SVGElements.line, SVGElementTagNameMap['line']>;
            /**
             * The `<linearGradient>` element lets authors define linear gradients that can be applied to fill or stroke of graphical elements.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
             */
            linearGradient: Tag<SVGElements.linearGradient, SVGElementTagNameMap['linearGradient']>;
            /**
             * The `<marker>` element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given `<path>`, `<line>`, `<polyline>` or `<polygon>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
             */
            marker: Tag<SVGElements.marker, SVGElementTagNameMap['marker']>;
            /**
             * The `<mask>` element defines an alpha mask for compositing the current object into the background. A mask is used/referenced using the mask property.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask
             */
            mask: Tag<SVGElements.mask, SVGElementTagNameMap['mask']>;
            /**
             * The `<metadata>` SVG element adds metadata to SVG content. Metadata is structured information about data. The contents of `<metadata>` should be elements from other XML namespaces such as RDF, FOAF, etc.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata
             */
            metadata: Tag<SVGElements.metadata, SVGElementTagNameMap['metadata']>;
            /**
             * The `<mpath>` sub-element for the `<animateMotion>` element provides the ability to reference an external `<path>` element as the definition of a motion path.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mpath
             */
            mpath: Tag<SVGElements.mpath, SVGElementTagNameMap['mpath']>;
            /**
             * The `<path>` SVG element is the generic element to define a shape. All the basic shapes can be created with a path element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
             */
            path: Tag<SVGElements.path, SVGElementTagNameMap['path']>;
            /**
             * The `<pattern>` element defines a graphics object which can be redrawn at repeated x- and y-coordinate intervals ("tiled") to cover an area.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
             */
            pattern: Tag<SVGElements.pattern, SVGElementTagNameMap['pattern']>;
            /**
             * The `<polygon>` element defines a closed shape consisting of a set of connected straight line segments. The last point is connected to the first point.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
             */
            polygon: Tag<SVGElements.polygon, SVGElementTagNameMap['polygon']>;
            /**
             * The `<polyline>` SVG element is an SVG basic shape that creates straight lines connecting several points. Typically a polyline is used to create open shapes as the last point doesn't have to be connected to the first point. For closed shapes see the `<polygon>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
             */
            polyline: Tag<SVGElements.polyline, SVGElementTagNameMap['polyline']>;
            /**
             * The `<radialGradient>` element lets authors define radial gradients that can be applied to fill or stroke of graphical elements.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient
             */
            radialGradient: Tag<SVGElements.radialGradient, SVGElementTagNameMap['radialGradient']>;
            /**
             * The `<rect>` element is a basic SVG shape that draws rectangles, defined by their position, width, and height. The rectangles may have their corners rounded.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
             */
            rect: Tag<SVGElements.rect, SVGElementTagNameMap['rect']>;
            /**
             * The SVG `<set>` element provides a simple means of just setting the value of an attribute for a specified duration.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/set
             */
            set: Tag<SVGElements.set, SVGElementTagNameMap['set']>;
            /**
             * The SVG `<stop>` element defines a color and its position to use on a gradient. This element is always a child of a `<linearGradient>` or `<radialGradient>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop
             */
            stop: Tag<SVGElements.stop, SVGElementTagNameMap['stop']>;
            /**
             * The svg element is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
             */
            svg: Tag<SVGElements.svg, SVGElementTagNameMap['svg']>;
            /**
             * The `<switch>` SVG element evaluates any requiredFeatures, requiredExtensions and systemLanguage attributes on its direct child elements in order, and then renders the first child where these attributes evaluate to true. Other direct children will be bypassed and therefore not rendered. If a child element is a container element, like `<g>`, then its subtree is also processed/rendered or bypassed/not rendered.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/switch
             */
            switch: Tag<SVGElements._switch, SVGElementTagNameMap['switch']>;
            /**
             * The `<symbol>` element is used to define graphical template objects which can be instantiated by a `<use>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
             */
            symbol: Tag<SVGElements._symbol, SVGElementTagNameMap['symbol']>;
            /**
             * The SVG `<text>` element draws a graphics element consisting of text. It's possible to apply a gradient, pattern, clipping path, mask, or filter to `<text>`, like any other SVG graphics element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
             */
            text: Tag<SVGElements.text, SVGElementTagNameMap['text']>;
            /**
             * To render text along the shape of a `<path>`, enclose the text in a `<textPath>` element that has an href attribute with a reference to the `<path>` element.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
             */
            textPath: Tag<SVGElements.textPath, SVGElementTagNameMap['textPath']>;
            /**
             * The SVG `<tspan>` element defines a subtext within a `<text>` element or another `<tspan>` element. It allows for adjustment of the style and/or position of that subtext as needed.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan
             */
            tspan: Tag<SVGElements.tspan, SVGElementTagNameMap['tspan']>;
            /**
             * The `<use>` element takes nodes from within the SVG document, and duplicates them somewhere else.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
             */
            use: Tag<SVGElements.use, SVGElementTagNameMap['use']>;
            /**
             * A view is a defined way to view the image, like a zoom level or a detail view.
             * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view
             */
            view: Tag<SVGElements.view, SVGElementTagNameMap['view']>;
        }
    }
}
