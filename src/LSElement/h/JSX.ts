import { GlobalAttributes } from './JSX/DOMAttributes/GlobalAttributes';
import { a } from './JSX/HTMLElements/a';
import { area } from './JSX/HTMLElements/area';
import { article } from './JSX/HTMLElements/article';
import { aside } from './JSX/HTMLElements/aside';
import { audio } from './JSX/HTMLElements/audio';
import { base } from './JSX/HTMLElements/base';
import { blockquote } from './JSX/HTMLElements/blockquote';
import { body } from './JSX/HTMLElements/body';
import { br } from './JSX/HTMLElements/br';
import { button } from './JSX/HTMLElements/button';
import { canvas } from './JSX/HTMLElements/canvas';
import { caption, datalist, dd, head, legend, main, nav, noscript } from './JSX/HTMLElements/commonElementsWithoutRoles';
import { colAndColGroup } from './JSX/HTMLElements/colAndColGroup';
import { abbr, address, b, bdi, bdo, cite, code, dfn, div, em, figure, i, kbd, mark } from './JSX/HTMLElements/commonElementsWithAllRoles';
import { data } from './JSX/HTMLElements/data';
import { insAndDel } from './JSX/HTMLElements/insAndDel';
import { details } from './JSX/HTMLElements/details';
import { embed } from './JSX/HTMLElements/embed';
import { fieldset } from './JSX/HTMLElements/fieldset';
import { form } from './JSX/HTMLElements/form';
import { html } from './JSX/HTMLElements/html';
import { iframe } from './JSX/HTMLElements/iframe';
import { img } from './JSX/HTMLElements/img';
import { input } from './JSX/HTMLElements/input';
import { q } from './JSX/HTMLElements/q';
import { LSAttributes } from './JSX/LSAttributes';
import { dialog } from './JSX/HTMLElements/dialog';
import { dl } from './JSX/HTMLElements/dl';
import { dt } from './JSX/HTMLElements/dt';
import { figcaptionAndFooterAndHeader } from './JSX/HTMLElements/figcaptionAndFooterAndHeader';
import { headingElement } from './JSX/HTMLElements/headingElement';
import { hr } from './JSX/HTMLElements/hr';
import { label } from './JSX/HTMLElements/label';
import { li } from './JSX/HTMLElements/li';
import { link } from './JSX/HTMLElements/link';
import { map } from './JSX/HTMLElements/map';
import { meta } from './JSX/HTMLElements/meta';
import { meter } from './JSX/HTMLElements/meter';

type LSTag<T extends Partial<GlobalAttributes> = GlobalAttributes, M extends keyof T = 'id'> = Exclude<T, M> & LSAttributes & Required<Pick<T, M>>;

export interface HTMLElements {
    /**
    * The HTML <a> element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address. Content within each <a> should indicate the link's destination. If the href attribute is present, pressing the enter key while focused on the <a> element will activate it.
    * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
    */
    a: LSTag<a>,
    /**
     * The HTML Abbreviation element (<abbr>) represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
     */
    abbr: LSTag<abbr>,
    /**
     * The HTML <address> element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
     */
    address: LSTag<address>;
    /**
     * The HTML <area> element defines an area inside an image map that has predefined clickable areas. An image map allows geometric areas on an image to be associated with hypertext link.
     * This element is used only within a <map> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
     */
    area: LSTag<area>;

    /**
     * The HTML <article> element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
     */
    article: LSTag<article>;
    /**
     * The HTML <aside> element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
     */
    aside: LSTag<aside>;
    /**
     * The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
     */
    audio: LSTag<audio>
    /**
     * The HTML Bring Attention To element (<b>) is used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. This was formerly known as the Boldface element, and most browsers still draw the text in boldface. However, you should not use <b> for styling text; instead, you should use the CSS font-weight property to create boldface text, or the <strong> element to indicate that text is of special importance.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
     */
    b: LSTag<b>,
    /**
     * The HTML <base> element specifies the base URL to use for all relative URLs in a document. There can be only one <base> element in a document.
     */
    base: LSTag<base>
    /**
     * The HTML Bidirectional Isolate element (<bdi>)  tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. It's particularly useful when a website dynamically inserts some text and doesn't know the directionality of the text being inserted.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
     */
    bdi: LSTag<bdi>,
    /**
     * The HTML Bidirectional Text Override element (<bdo>) overrides the current directionality of text, so that the text within is rendered in a different direction.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
     */
    bdo: LSTag<bdo>,
    /**
     * The HTML <blockquote> Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the <cite> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
     */
    blockquote: LSTag<blockquote>,
    /**
     * The HTML <body> Element represents the content of an HTML document. There can be only one <body> element in a document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
     */
    body: LSTag<body>,
    /**
     * The HTML <br> element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
     */
    br: LSTag<br>,
    /**
     * The HTML <button> element represents a clickable button, used to submit forms or anywhere in a document for accessible, standard button functionality. By default, HTML buttons are presented in a style resembling the platform the user agent runs on, but you can change buttons’ appearance with CSS.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
     */
    button: LSTag<button>,
    /**
     * Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
     */
    canvas: LSTag<canvas>,
    /**
     * The HTML <caption> element specifies the caption (or title) of a table.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
     */
    caption: LSTag<caption>;
    /**
     * The HTML Citation element (<cite>) is used to describe a reference to a cited creative work, and must include the title of that work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
     */
    cite: LSTag<cite>,
    /**
     * The HTML <code> element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
     */
    code: LSTag<code>,
    /**
     * The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
     */
    col: LSTag<colAndColGroup>,
    /**
     * The HTML <colgroup> element defines a group of columns within a table.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
     */
    colgroup: LSTag<colAndColGroup>,
    /**
     * The HTML <data> element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the <time> element must be used.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
     */
    data: LSTag<data>
    /**
     * The HTML <datalist> element contains a set of <option> elements that represent the permissible or recommended options available to choose from within other controls.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
     */
    datalist: LSTag<datalist>,
    /**
     * The HTML <dd> element provides the description, definition, or value for the preceding term (<dt>) in a description list (<dl>).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
     */
    dd: LSTag<dd>,
    /**
     * The HTML <del> element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The <ins> element can be used for the opposite purpose: to indicate text that has been added to the document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
     */
    del: LSTag<insAndDel>,
    /**
     * The HTML Details Element (<details>) creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label can be provided using the <summary> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
     */
    details: LSTag<details>,
    /**
     * The HTML Definition element (<dfn>) is used to indicate the term being defined within the context of a definition phrase or sentence. The <p> element, the <dt>/<dd> pairing, or the <section> element which is the nearest ancestor of the <dfn> is considered to be the definition of the term.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
     */
    dfn: LSTag<dfn>,
    /**
     * The HTML <dialog> element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
     */
    dialog: LSTag<dialog>,
    /**
     * The HTML Content Division element (<div>) is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
     */
    div: LSTag<div>,
    /**
     * The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
     */
    dl: LSTag<dl>,
    /**
     * The HTML <dt> element specifies a term in a description or definition list, and as such must be used inside a <dl> element. It is usually followed by a <dd> element; however, multiple <dt> elements in a row indicate several terms that are all defined by the immediate next <dd> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
     */
    dt: LSTag<dt>,
    /**
     * The HTML <em> element marks text that has stress emphasis. The <em> element can be nested, with each level of nesting indicating a greater degree of emphasis.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
     */
    em: LSTag<em>,
    /**
     * The HTML <embed> element embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
     */
    embed: LSTag<embed>,
    /**
     * The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
     */
    fieldset: LSTag<fieldset>,
    /**
     * The HTML <figcaption> or Figure Caption element represents a caption or legend describing the rest of the contents of its parent <figure> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
     */
    figcaption: LSTag<figcaptionAndFooterAndHeader>,
    /**
     * The HTML <figure> (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption, which is specified using the (<figcaption>) element. The figure, its caption, and its contents are referenced as a single unit.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
     */
    figure: LSTag<figure>,

    /**
     * The HTML <footer> element represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about the author of the section, copyright data or links to related documents.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
     */
    footer: LSTag<figcaptionAndFooterAndHeader>,
    /**
     * The HTML <form> element represents a document section containing interactive controls for submitting information.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
     */
    form: LSTag<form>,
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h1: LSTag<headingElement>,
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h2: LSTag<headingElement>,
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h3: LSTag<headingElement>,
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h4: LSTag<headingElement>,
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h5: LSTag<headingElement>,
    /**
     * The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
     */
    h6: LSTag<headingElement>,
    /**
     * The HTML <head> element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
     */
    head: LSTag<head>,
    /**
     * The HTML <header> element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
     */
    header: LSTag<figcaptionAndFooterAndHeader>,
    /**
     * The HTML <hr> element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
     */
    hr: LSTag<hr>,
    /**
     * The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
     */
    html: LSTag<html>,
    /**
     * The HTML Idiomatic Text element (<i>) represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. Historically, these have been presented using italicized type, which is the original source of the <i> naming of this element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
     */
    i: LSTag<i>;
    /**
     * The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     */
    iframe: LSTag<iframe>,
    /**
     * The HTML <img> element embeds an image into the document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     */
    img: LSTag<img>,
    /**
     * The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
     */
    input: LSTag<input>,
    /**
     * The HTML <ins> element represents a range of text that has been added to a document.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
     */
    ins: LSTag<insAndDel>,
    /**
     * The HTML Keyboard Input element (<kbd>) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a <kbd> element using its default monospace font, although this is not mandated by the HTML standard.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
     */
    kbd: LSTag<kbd>;
    /**
     * The HTML <label> element represents a caption for an item in a user interface.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
     */
    label: LSTag<label>;
    /**
     * The HTML <legend> element represents a caption for the content of its parent <fieldset>.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
     */
    legend: LSTag<legend>;
    /**
     * The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
     */
    li: LSTag<li>;
    /**
     * The HTML External Resource Link element (<link>) specifies relationships between the current document and an external resource. This element is most commonly used to link to stylesheets, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
     */
    link: LSTag<link>;
    /**
     * The HTML <main> element represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
     */
    main: LSTag<main>;
    /**
     * The HTML <map> element is used with <area> elements to define an image map (a clickable link area).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
     */
    map: LSTag<map>;
    /**
     * The HTML Mark Text element (<mark>) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
     */
    mark: LSTag<mark>;
    /**
     * The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
     */
    meta: LSTag<meta>;
    /**
     * The HTML <meter> element represents either a scalar value within a known range or a fractional value.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
     */
    meter: LSTag<meter>;
    /**
     * The HTML <nav> element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
     */
    nav: LSTag<nav>;
    /**
     * The HTML <noscript> element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
     */
    noscript: LSTag<noscript>;
    /**
     * The HTML <q> element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the <blockquote> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
     */
    q: LSTag<q>;
    /**
     * The HTML Ruby Fallback Parenthesis (<rp>) element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the <ruby> element. One <rp> element should enclose each of the opening and closing parentheses that wrap the <rt> element that contains the annotation's text.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
     */
    rp: LSTag;
    /**
     * The HTML Ruby Text (<rt>) element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The <rt> element must always be contained within a <ruby> element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
     */
    rt: LSTag;
    /**
     * The HTML <ruby> element represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. It can also be used for annotating other kinds of text, but this usage is less common.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
     */
    ruby: LSTag;
    /**
     * The HTML <s> element renders text with a strikethrough, or a line through it. Use the <s> element to represent things that are no longer relevant or no longer accurate. However, <s> is not appropriate when indicating document edits; for that, use the <del> and <ins> elements, as appropriate.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
     */
    s: LSTag;
    /**
     * The HTML Sample Element (<samp>) is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console).
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
     */
    samp: LSTag;
    /**
     * The HTML <small> element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
     */
    small: LSTag;
    /**
     * The HTML <span> element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. <span> is very much like a <div> element, but <div> is a block-level element whereas a <span> is an inline element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
     */
    span: LSTag;
    /**
     * The HTML Strong Importance Element (<strong>) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
     */
    strong: LSTag;
}

declare global {
    namespace JSX {

        interface IntrinsicElements extends HTMLElements {

        }
    }
}
