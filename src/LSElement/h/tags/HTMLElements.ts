import { a } from '../DOM/HTMLElements/a';
import { area } from '../DOM/HTMLElements/area';
import { article } from '../DOM/HTMLElements/article';
import { aside } from '../DOM/HTMLElements/aside';
import { audio } from '../DOM/HTMLElements/audio';
import { base } from '../DOM/HTMLElements/base';
import { blockquote } from '../DOM/HTMLElements/blockquote';
import { body } from '../DOM/HTMLElements/body';
import { br } from '../DOM/HTMLElements/br';
import { button } from '../DOM/HTMLElements/button';
import { canvas } from '../DOM/HTMLElements/canvas';
import { caption, datalist, dd, head, legend, main, nav, noscript, summary, tbody, template, title, _var } from '../DOM/HTMLElements/commonElementsWithoutRoles';
import { colAndColGroup } from '../DOM/HTMLElements/colAndColGroup';
import { abbr, address, b, bdi, bdo, cite, code, dfn, div, em, figure, i, kbd, mark, p, picture, pre, rp, rt, ruby, s, samp, small, span, strong, sub, sup, table, tfoot, thead, tr, u, wbr } from '../DOM/HTMLElements/commonElementsWithAllRoles';
import { data } from '../DOM/HTMLElements/data';
import { mod } from '../DOM/HTMLElements/mod';
import { details } from '../DOM/HTMLElements/details';
import { embed } from '../DOM/HTMLElements/embed';
import { fieldset } from '../DOM/HTMLElements/fieldset';
import { form } from '../DOM/HTMLElements/form';
import { html } from '../DOM/HTMLElements/html';
import { iframe } from '../DOM/HTMLElements/iframe';
import { img } from '../DOM/HTMLElements/img';
import { input } from '../DOM/HTMLElements/input';
import { q } from '../DOM/HTMLElements/q';
import { dialog } from '../DOM/HTMLElements/dialog';
import { dl } from '../DOM/HTMLElements/dl';
import { dt } from '../DOM/HTMLElements/dt';
import { figcaptionAndFooterAndHeader } from '../DOM/HTMLElements/figcaptionAndFooterAndHeader';
import { headingElement } from '../DOM/HTMLElements/headingElement';
import { hr } from '../DOM/HTMLElements/hr';
import { label } from '../DOM/HTMLElements/label';
import { li } from '../DOM/HTMLElements/li';
import { link } from '../DOM/HTMLElements/link';
import { map } from '../DOM/HTMLElements/map';
import { meta } from '../DOM/HTMLElements/meta';
import { meter } from '../DOM/HTMLElements/meter';
import { _object } from '../DOM/HTMLElements/object';
import { ol } from '../DOM/HTMLElements/ol';
import { optgroup } from '../DOM/HTMLElements/optgroup';
import { option } from '../DOM/HTMLElements/option';
import { output } from '../DOM/HTMLElements/output';
import { param } from '../DOM/HTMLElements/param';
import { progress } from '../DOM/HTMLElements/progress';
import { script } from '../DOM/HTMLElements/script';
import { section } from '../DOM/HTMLElements/section';
import { select } from '../DOM/HTMLElements/select';
import { slot } from '../DOM/HTMLElements/slot';
import { source } from '../DOM/HTMLElements/source';
import { style } from '../DOM/HTMLElements/style';
import { td } from '../DOM/HTMLElements/td';
import { textarea } from '../DOM/HTMLElements/textarea';
import { th } from '../DOM/HTMLElements/th';
import { time } from '../DOM/HTMLElements/time';
import { track } from '../DOM/HTMLElements/track';
import { ul } from '../DOM/HTMLElements/ul';
import { video } from '../DOM/HTMLElements/video';
import { LSTag } from './LSTag';

export interface HTMLElements {
    /**
    * The HTML <a> element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address. Content within each <a> should indicate the link's destination. If the href attribute is present, pressing the enter key while focused on the <a> element will activate it.
    * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
    */
    a: LSTag<a, HTMLElementTagNameMap['a']>;
    /**
     * The HTML Abbreviation element (<abbr>) represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
     */
    abbr: LSTag<abbr, HTMLElementTagNameMap['abbr']>;
    /**
     * The HTML <address> element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
     */
    address: LSTag<address, HTMLElementTagNameMap['address']>;
    /**
     * The HTML <area> element defines an area inside an image map that has predefined clickable areas. An image map allows geometric areas on an image to be associated with hypertext link.
     * This element is used only within a <map> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
     */
    area: LSTag<area, HTMLElementTagNameMap['area']>;

    /**
     * The HTML <article> element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
     */
    article: LSTag<article, HTMLElementTagNameMap['article']>;
    /**
     * The HTML <aside> element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
     */
    aside: LSTag<aside, HTMLElementTagNameMap['aside']>;
    /**
     * The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
     */
    audio: LSTag<audio, HTMLElementTagNameMap['audio']>;
    /**
     * The HTML Bring Attention To element (<b>) is used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. This was formerly known as the Boldface element, and most browsers still draw the text in boldface. However, you should not use <b> for styling text; instead, you should use the CSS font-weight property to create boldface text, or the <strong> element to indicate that text is of special importance.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
     */
    b: LSTag<b, HTMLElementTagNameMap['b']>;
    /**
     * The HTML <base> element specifies the base URL to use for all relative URLs in a document. There can be only one <base> element in a document.
     */
    base: LSTag<base, HTMLElementTagNameMap['base']>;
    /**
     * The HTML Bidirectional Isolate element (<bdi>)  tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. It's particularly useful when a website dynamically inserts some text and doesn't know the directionality of the text being inserted.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
     */
    bdi: LSTag<bdi, HTMLElementTagNameMap['bdi']>;
    /**
     * The HTML Bidirectional Text Override element (<bdo>) overrides the current directionality of text, so that the text within is rendered in a different direction.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
     */
    bdo: LSTag<bdo, HTMLElementTagNameMap['bdo']>;
    /**
     * The HTML <blockquote> Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the <cite> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
     */
    blockquote: LSTag<blockquote, HTMLElementTagNameMap['blockquote']>;
    /**
     * The HTML <body> Element represents the content of an HTML document. There can be only one <body> element in a document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
     */
    body: LSTag<body, HTMLElementTagNameMap['body']>;
    /**
     * The HTML <br> element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
     */
    br: LSTag<br, HTMLElementTagNameMap['br']>;
    /**
     * The HTML <button> element represents a clickable button, used to submit forms or anywhere in a document for accessible, standard button functionality. By default, HTML buttons are presented in a style resembling the platform the user agent runs on, but you can change buttons’ appearance with CSS.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
     */
    button: LSTag<button, HTMLElementTagNameMap['button']>;
    /**
     * Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
     */
    canvas: LSTag<canvas, HTMLElementTagNameMap['canvas']>;
    /**
     * The HTML <caption> element specifies the caption (or title) of a table.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
     */
    caption: LSTag<caption, HTMLElementTagNameMap['caption']>;
    /**
     * The HTML Citation element (<cite>) is used to describe a reference to a cited creative work, and must include the title of that work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
     */
    cite: LSTag<cite, HTMLElementTagNameMap['cite']>;
    /**
     * The HTML <code> element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
     */
    code: LSTag<code, HTMLElementTagNameMap['code']>;
    /**
     * The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
     */
    col: LSTag<colAndColGroup, HTMLElementTagNameMap['col']>;
    /**
     * The HTML <colgroup> element defines a group of columns within a table.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
     */
    colgroup: LSTag<colAndColGroup, HTMLElementTagNameMap['colgroup']>;
    /**
     * The HTML <data> element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the <time> element must be used.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
     */
    data: LSTag<data, HTMLElementTagNameMap['data']>;
    /**
     * The HTML <datalist> element contains a set of <option> elements that represent the permissible or recommended options available to choose from within other controls.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
     */
    datalist: LSTag<datalist, HTMLElementTagNameMap['datalist']>;
    /**
     * The HTML <dd> element provides the description, definition, or value for the preceding term (<dt>) in a description list (<dl>).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
     */
    dd: LSTag<dd, HTMLElementTagNameMap['dd']>;
    /**
     * The HTML <del> element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The <ins> element can be used for the opposite purpose: to indicate text that has been added to the document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
     */
    del: LSTag<mod, HTMLElementTagNameMap['del']>;
    /**
     * The HTML Details Element (<details>) creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label can be provided using the <summary> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
     */
    details: LSTag<details, HTMLElementTagNameMap['details']>;
    /**
     * The HTML Definition element (<dfn>) is used to indicate the term being defined within the context of a definition phrase or sentence. The <p> element, the <dt>/<dd> pairing, or the <section> element which is the nearest ancestor of the <dfn> is considered to be the definition of the term.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
     */
    dfn: LSTag<dfn, HTMLElementTagNameMap['dfn']>;
    /**
     * The HTML <dialog> element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
     */
    dialog: LSTag<dialog, HTMLElementTagNameMap['dialog']>;
    /**
     * The HTML Content Division element (<div>) is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
     */
    div: LSTag<div, HTMLElementTagNameMap['div']>;
    /**
     * The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
     */
    dl: LSTag<dl, HTMLElementTagNameMap['dl']>;
    /**
     * The HTML <dt> element specifies a term in a description or definition list, and as such must be used inside a <dl> element. It is usually followed by a <dd> element; however, multiple <dt> elements in a row indicate several terms that are all defined by the immediate next <dd> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
     */
    dt: LSTag<dt, HTMLElementTagNameMap['dt']>;
    /**
     * The HTML <em> element marks text that has stress emphasis. The <em> element can be nested, with each level of nesting indicating a greater degree of emphasis.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
     */
    em: LSTag<em, HTMLElementTagNameMap['em']>;
    /**
     * The HTML <embed> element embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
     */
    embed: LSTag<embed, HTMLElementTagNameMap['embed']>;
    /**
     * The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
     */
    fieldset: LSTag<fieldset, HTMLElementTagNameMap['fieldset']>;
    /**
     * The HTML <figcaption> or Figure Caption element represents a caption or legend describing the rest of the contents of its parent <figure> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
     */
    figcaption: LSTag<figcaptionAndFooterAndHeader, HTMLElementTagNameMap['figcaption']>;
    /**
     * The HTML <figure> (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption, which is specified using the (<figcaption>) element. The figure, its caption, and its contents are referenced as a single unit.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
     */
    figure: LSTag<figure, HTMLElementTagNameMap['figure']>;

    /**
     * The HTML <footer> element represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about the author of the section, copyright data or links to related documents.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
     */
    footer: LSTag<figcaptionAndFooterAndHeader, HTMLElementTagNameMap['footer']>;
    /**
     * The HTML <form> element represents a document section containing interactive controls for submitting information.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
     */
    form: LSTag<form, HTMLElementTagNameMap['form']>;
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h1: LSTag<headingElement, HTMLElementTagNameMap['h1']>;
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h2: LSTag<headingElement, HTMLElementTagNameMap['h2']>;
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h3: LSTag<headingElement, HTMLElementTagNameMap['h3']>;
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h4: LSTag<headingElement, HTMLElementTagNameMap['h4']>;
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h5: LSTag<headingElement, HTMLElementTagNameMap['h5']>;
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h6: LSTag<headingElement, HTMLElementTagNameMap['h6']>;
    /**
     * The HTML <head> element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
     */
    head: LSTag<head, HTMLElementTagNameMap['head']>;
    /**
     * The HTML <header> element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
     */
    header: LSTag<figcaptionAndFooterAndHeader, HTMLElementTagNameMap['header']>;
    /**
     * The HTML <hr> element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
     */
    hr: LSTag<hr, HTMLElementTagNameMap['hr']>;
    /**
     * The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
     */
    html: LSTag<html, HTMLElementTagNameMap['html']>;
    /**
     * The HTML Idiomatic Text element (<i>) represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. Historically, these have been presented using italicized type, which is the original source of the <i> naming of this element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
     */
    i: LSTag<i, HTMLElementTagNameMap['i']>;
    /**
     * The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     */
    iframe: LSTag<iframe, HTMLElementTagNameMap['iframe']>;
    /**
     * The HTML <img> element embeds an image into the document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     */
    img: LSTag<img, HTMLElementTagNameMap['img']>;
    /**
     * The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
     */
    input: LSTag<input, HTMLElementTagNameMap['input']>;
    /**
     * The HTML <ins> element represents a range of text that has been added to a document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
     */
    ins: LSTag<mod, HTMLElementTagNameMap['ins']>;
    /**
     * The HTML Keyboard Input element (<kbd>) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a <kbd> element using its default monospace font, although this is not mandated by the HTML standard.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
     */
    kbd: LSTag<kbd, HTMLElementTagNameMap['kbd']>;
    /**
     * The HTML <label> element represents a caption for an item in a user interface.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
     */
    label: LSTag<label, HTMLElementTagNameMap['label']>;
    /**
     * The HTML <legend> element represents a caption for the content of its parent <fieldset>.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
     */
    legend: LSTag<legend, HTMLElementTagNameMap['legend']>;
    /**
     * The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
     */
    li: LSTag<li, HTMLElementTagNameMap['li']>;
    /**
     * The HTML External Resource Link element (<link>) specifies relationships between the current document and an external resource. This element is most commonly used to link to stylesheets, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
     */
    link: LSTag<link, HTMLElementTagNameMap['link']>;
    /**
     * The HTML <main> element represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
     */
    main: LSTag<main, HTMLElementTagNameMap['main']>;
    /**
     * The HTML <map> element is used with <area> elements to define an image map (a clickable link area).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
     */
    map: LSTag<map, HTMLElementTagNameMap['map']>;
    /**
     * The HTML Mark Text element (<mark>) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
     */
    mark: LSTag<mark, HTMLElementTagNameMap['mark']>;
    /**
     * The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
     */
    meta: LSTag<meta, HTMLElementTagNameMap['meta']>;
    /**
     * The HTML <meter> element represents either a scalar value within a known range or a fractional value.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
     */
    meter: LSTag<meter, HTMLElementTagNameMap['meter']>;
    /**
     * The HTML <nav> element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
     */
    nav: LSTag<nav, HTMLElementTagNameMap['nav']>;
    /**
     * The HTML <noscript> element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
     */
    noscript: LSTag<noscript, HTMLElementTagNameMap['noscript']>;
    /**
     * The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
     */
    object: LSTag<_object, HTMLElementTagNameMap['object']>;
    /**
     * The HTML <ol> element represents an ordered list of items — typically rendered as a numbered list.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
     */
    ol: LSTag<ol, HTMLElementTagNameMap['ol']>;
    /**
     * The HTML <optgroup> element creates a grouping of options within a <select> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
     */
    optgroup: LSTag<optgroup, HTMLElementTagNameMap['optgroup']>;
    /**
     * The HTML <option> element is used to define an item contained in a <select>, an <optgroup>, or a <datalist> element. As such, <option> can represent menu items in popups and other lists of items in an HTML document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
     */
    option: LSTag<option, HTMLElementTagNameMap['option']>;
    /**
     * The HTML Output element (<output>) is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
     */
    output: LSTag<output, HTMLElementTagNameMap['output']>;
    /**
     * The HTML <p> element represents a paragraph. Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, but HTML paragraphs can be any structural grouping of related content, such as images or form fields.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
     */
    p: LSTag<p, HTMLElementTagNameMap['p']>;
    /**
     * The HTML <param> element defines parameters for an <object> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param
     */
    param: LSTag<param, HTMLElementTagNameMap['param']>;
    /**
     * The HTML <picture> element contains zero or more <source> elements and one <img> element to offer alternative versions of an image for different display/device scenarios.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
     */
    picture: LSTag<picture, HTMLElementTagNameMap['picture']>;
    /**
     * The HTML <pre> element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional ("monospace") font. Whitespace inside this element is displayed as written.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
     */
    pre: LSTag<pre, HTMLElementTagNameMap['pre']>;
    /**
     * The HTML <progress> element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
     */
    progress: LSTag<progress, HTMLElementTagNameMap['progress']>;
    /**
     * The HTML <q> element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the <blockquote> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
     */
    q: LSTag<q, HTMLElementTagNameMap['q']>;
    /**
     * The HTML Ruby Fallback Parenthesis (<rp>) element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the <ruby> element. One <rp> element should enclose each of the opening and closing parentheses that wrap the <rt> element that contains the annotation's text.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
     */
    rp: LSTag<rp, HTMLElementTagNameMap['rp']>;
    /**
     * The HTML Ruby Text (<rt>) element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The <rt> element must always be contained within a <ruby> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
     */
    rt: LSTag<rt, HTMLElementTagNameMap['rt']>;
    /**
     * The HTML <ruby> element represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. It can also be used for annotating other kinds of text, but this usage is less common.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
     */
    ruby: LSTag<ruby, HTMLElementTagNameMap['ruby']>;
    /**
     * The HTML <s> element renders text with a strikethrough, or a line through it. Use the <s> element to represent things that are no longer relevant or no longer accurate. However, <s> is not appropriate when indicating document edits; for that, use the <del> and <ins> elements, as appropriate.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
     */
    s: LSTag<s, HTMLElementTagNameMap['s']>;
    /**
     * The HTML Sample Element (<samp>) is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
     */
    samp: LSTag<samp, HTMLElementTagNameMap['samp']>;
    /**
     * The HTML <script> element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code. The <script> element can also be used with other languages, such as WebGL's GLSL shader programming language and JSON.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
     */
    script: LSTag<script, HTMLElementTagNameMap['script']>;
    /**
     * The HTML <section> element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
     */
    section: LSTag<section, HTMLElementTagNameMap['section']>;
    /**
     * The HTML <select> element represents a control that provides a menu of options:
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
     */
    select: LSTag<select, HTMLElementTagNameMap['select']>;
    /**
     * The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
     */
    slot: LSTag<slot, HTMLElementTagNameMap['slot']>;
    /**
     * The HTML <small> element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
     */
    small: LSTag<small, HTMLElementTagNameMap['small']>;
    /**
     * The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element. It is an empty element, meaning that it has no content and does not have a closing tag. It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
     */
    source: LSTag<source, HTMLElementTagNameMap['source']>;
    /**
     * The HTML <span> element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. <span> is very much like a <div> element, but <div> is a block-level element whereas a <span> is an inline element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
     */
    span: LSTag<span, HTMLElementTagNameMap['span']>;
    /**
     * The HTML Strong Importance Element (<strong>) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
     */
    strong: LSTag<strong, HTMLElementTagNameMap['strong']>;
    /**
     * The HTML <style> element contains style information for a document, or part of a document. It contains CSS, which is applied to the contents of the document containing the <style> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
     */
    style: LSTag<style, HTMLElementTagNameMap['style']>;
    /**
     * The HTML Subscript element (<sub>) specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
     */
    sub: LSTag<sub, HTMLElementTagNameMap['sub']>;
    /**
     * The HTML Disclosure Summary element (<summary>) element specifies a summary, caption, or legend for a <details> element's disclosure box. Clicking the <summary> element toggles the state of the parent <details> element open and closed.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
     */
    summary: LSTag<summary, HTMLElementTagNameMap['summary']>;
    /**
     * The HTML Superscript element (<sup>) specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
     */
    sup: LSTag<sup, HTMLElementTagNameMap['sup']>;
    /**
     * The HTML <table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
     */
    table: LSTag<table, HTMLElementTagNameMap['table']>;
    /**
     * The HTML Table Body element (<tbody>) encapsulates a set of table rows (<tr> elements), indicating that they comprise the body of the table (<table>).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
     */
    tbody: LSTag<tbody, HTMLElementTagNameMap['tbody']>;
    /**
     * The HTML <td> element defines a cell of a table that contains data. It participates in the table model.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
     */
    td: LSTag<td, HTMLElementTagNameMap['td']>;
    /**
     * The HTML Content Template (<template>) element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
     */
    template: LSTag<template, HTMLElementTagNameMap['template']>;
    /**
     * The HTML <textarea> element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
     */
    textarea: LSTag<textarea, HTMLElementTagNameMap['textarea']>;
    /**
     * The HTML <tfoot> element defines a set of rows summarizing the columns of the table.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
     */
    tfoot: LSTag<tfoot, HTMLElementTagNameMap['tfoot']>;
    /**
     * The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
     */
    th: LSTag<th, HTMLElementTagNameMap['th']>;
    /**
     * The HTML <thead> element defines a set of rows defining the head of the columns of the table.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
     */
    thead: LSTag<thead, HTMLElementTagNameMap['thead']>;
    /**
     * The HTML <time> element represents a specific period in time. It may include the datetime attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
     */
    time: LSTag<time, HTMLElementTagNameMap['time']>;
    /**
     * The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text; tags within the element are ignored.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
     */
    title: LSTag<title, HTMLElementTagNameMap['title']>;
    /**
     * The HTML <tr> element defines a row of cells in a table. The row's cells can then be established using a mix of <td> (data cell) and <th> (header cell) elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
     */
    tr: LSTag<tr, HTMLElementTagNameMap['tr']>;
    /**
     * The HTML <track> element is used as a child of the media elements, <audio> and <video>. It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
     */
    track: LSTag<track, HTMLElementTagNameMap['track']>;
    /**
     * The HTML Unarticulated Annotation element (<u>) represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. This is rendered by default as a simple solid underline, but may be altered using CSS.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
     */
    u: LSTag<u, HTMLElementTagNameMap['u']>;
    /**
     * The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
     */
    ul: LSTag<ul, HTMLElementTagNameMap['ul']>;
    /**
     * The HTML Variable element (<var>) represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
     */
    var: LSTag<_var, HTMLElementTagNameMap['var']>;
    /**
     * The HTML Video element (<video>) embeds a media player which supports video playback into the document. You can use <video> for audio content as well, but the <audio> element may provide a more appropriate user experience.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
     */
    video: LSTag<video, HTMLElementTagNameMap['video']>;
    /**
     * The HTML <wbr> element represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
     */
    wbr: LSTag<wbr, HTMLElementTagNameMap['wbr']>;
}
