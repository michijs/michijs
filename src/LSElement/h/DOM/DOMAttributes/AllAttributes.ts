import { SVGOnlyAttributes } from "./SVGOnlyAttributes";
import { As, Autocapitalize, Autocomplete, Capture, Charset, Crossorigin, CSSProperties, DateTime, Decoding, Dir, Enctype, EnterKeyHint, HTTPEquiv, InputMode, Kind, Language, Length, Loading, Method, Preload, Rel, Sandbox, Scope, Shape, StringBoolean, Target, Wrap, YesNo } from "./types";

export interface AllAttributes extends SVGOnlyAttributes {
    /**
     * The abbr attribute specifies a shorter version of the content in a header cell.
     */
    abbr: string;
    /**
     * Specifies the types of files that the server accepts (only for type="file")
     */
    accept: string;
    /**
     * The accept-charset attribute specifies the character encodings that are to be used for the form submission
     */
    'accept-charset': Charset;
    /**
     * Specifies a shortcut key to activate/focus an element
     */
    accessKey: string;
    /**
     * Specifies where to send the form-data when a form is submitted
     */
    action: string;
    /**
     * The policy defines what features are available to the `<iframe>` based on the origin of the request
     */
    allow: string;
    /**
     * Specifies an alternate text when the original element fails to display
     */
    alt: string;
    /**
     * Specifies that the script is executed asynchronously (only for external scripts)
     */
    async: boolean;
    /**
     * The autocapitalize global attribute is an enumerated attribute that controls whether and how text input is automatically capitalized as it is entered/edited by the user
     */
    autocapitalize: Autocapitalize;
    /**
     * Specifies whether the `<form>` or the `<input>` element should have autocomplete enabled
     */
    autocomplete: Autocomplete;
    /**
     * Specifies that the element should automatically get focus when the page loads
     */
    autofocus: boolean;
    /**
     * Specifies that the audio/video will start playing as soon as it is ready
     */
    autoplay: boolean;
    /**
     * This attribute is only used when rel="preload" or rel="prefetch" has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`
     */
    as: As;
    /**
     * Media capture input method in file upload controls
     */
    capture: Capture;
    /**
     * Specifies the character encoding
     */
    charset: Charset;
    /**
     * Specifies that an `<input>` element should be pre-selected when the page loads (for type="checkbox" or type="radio")
     */
    checked: boolean;
    /**
     * Specifies a URL which explains the quote/deleted/inserted text
     */
    cite: string;
    /**
     * Specifies one or more classnames for an element (refers to a class in a style sheet)
     */
    class: string,
    /**
     * Specifies the visible width of a text area
     */
    cols: number;
    /**
     * Specifies the number of columns a table cell should span
     */
    colspan: number;
    /**
     * Gives the value associated with the http-equiv or name attribute
     */
    content: string;
    /**
     * Specifies whether the content of an element is editable or not
     */
    contenteditable: boolean;
    /**
     * Specifies that audio/video controls should be displayed (such as a play/pause button etc)
     */
    controls: boolean;
    /**
     * Specifies the coordinates of the area
     */
    coords: string;// TODO: Revisar coords
    crossorigin: Crossorigin;
    /**
     * Specifies the URL of the resource to be used by the object
     */
    data: string;
    /**
     * Specifies the date and time
     */
    datetime: DateTime;
    /**
     * Provides an image decoding hint to the browser.
     */
    decoding: Decoding;
    /**
     * Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate
     */
    default: boolean;
    /**
     * Specifies that the script is executed when the page has finished parsing (only for external scripts)
     */
    defer: boolean;
    /**
     * Specifies the text direction for the content in an element
     */
    dir: Dir,
    /**
     * Specifies that the text direction will be submitted
     */
    dirname: string;
    /**
     * Specifies that the specified element/group of elements should be disabled
     */
    disabled: boolean;
    /**
     * Specifies that the target will be downloaded when a user clicks on the hyperlink
     */
    download: boolean;
    /**
     * Specifies whether an element is draggable or not
     */
    draggable: StringBoolean,
    /**
     * Specifies how the form-data should be encoded when submitting it to the server (only for method="post")
     */
    enctype: Enctype;
    /**
     * The enterkeyhint global attribute is an enumerated attribute defining what action label (or icon) to present for the enter key on virtual keyboards
     */
    enterkeyhint: EnterKeyHint;
    /**
     * Specifies which form element(s) a label/calculation is bound to
     */
    for: string;
    /**
     * Specifies the name of the form the element belongs to
     */
    form: string;
    /**
     * Specifies where to send the form-data when a form is submitted. Only for type="submit"
     */
    formaction: string;
    /**
     * If the button is a submit button (it's inside/associated with a `<form>` and doesn't have type="button"), specifies how to encode the form data that is submitted
     */
    formenctype: Enctype;
    /**
     * Specifies the HTTP method to use when sending form-data
     */
    formmethod: Method;
    /**
     * Specifies that the form should not be validated when submitted
     */
    formnovalidate: boolean;
    /**
     * Specifies the target for where to open the linked document or where to submit the form
     */
    formtarget: Target;
    /**
     * Specifies one or more headers cells a cell is related to
     */
    headers: string;
    /**
     * Specifies the height of the element
     */
    height: Length;
    /**
     * Specifies that an element is not yet, or is no longer, relevant
     */
    hidden: boolean;
    /**
     * Specifies the range that is considered to be a high value
     */
    high: number;
    /**
     * Specifies the URL of the page the link goes to
     */
    href: string;
    /**
     * Specifies the language of the linked document
     */
    hreflang: Language;
    /**
     * Provides an HTTP header for the information/value of the content attribute
     */
    'http-equiv': HTTPEquiv;
    /**
     * Specifies a unique id for an element
     */
    id: string;
    /**
     * Specifies an image as a server-side image map
     */
    ismap: boolean;
    /**
     * For rel="preload" and as="image" only, the imagesizes attribute is a sizes attribute that indicates to preload the appropriate resource used by an img element with corresponding values for its srcset and sizes attributes.
     */
    imagesizes: string;
    /**
     * For rel="preload" and as="image" only, the imagesrcset attribute is a sourceset attribute that indicates to preload the appropriate resource used by an img element with corresponding values for its srcset and sizes attributes.
     */
    imagesrcset: string;
    /**
     * A Boolean which, if present, indicates that the value of the checkbox is indeterminate rather than true or false
     */
    indeterminate: boolean;
    /**
     * The inputmode global attribute is an enumerated attribute that hints at the type of data that might be entered by the user while editing the element or its contents
     */
    inputmode: InputMode;
    /**
     * This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See Subresource Integrity.
     */
    integrity: string;
    /**
     * Allows you to specify that a standard HTML element should behave like a defined custom built-in element (see Using custom elements for more details)
     */
    is: string;
    /**
     * Provides microdata in the form of a unique, global identifier of an item. An itemid attribute can only be specified for an element that has both itemscope and itemtype attributes. Also, itemid can only be specified on elements that possess an itemscope attribute whose corresponding itemtype refers to or defines a vocabulary that supports global identifiers
     */
    itemid: string;
    /**
     * Is used to add properties to an item. An itemprop consists of a name-value pair. Each name-value pair is called a property, and a group of one or more properties forms an item. Property values are either a string or a URL
     */
    itemprop: string;
    /**
     * Provides a list of element IDs (not itemids) elsewhere in the document, with additional properties
     */
    itemref: string;
    /**
     * Defines the scope of associated metadata. Specifying the itemscope attribute for an element creates a new item, which results in a number of name-value pairs that are associated with the element
     */
    itemscope: boolean;
    /**
     * Specifies the URL of the vocabulary that will be used to define itemprop's (item properties) in the data structure. itemscope is used to set the scope of where in the data structure the vocabulary set by itemtype will be active
     */
    itemtype: string;
    /**
     * Specifies the kind of text track
     */
    kind: Kind;
    /**
     * Specifies the title of the text track
     */
    label: string;
    /**
     * Specifies the language of the element's content
     */
    lang: Language;
    /**
     * Refers to a `<datalist>` element that contains pre-defined options for an `<input>` element
     */
    list: string;
    /**
     * Indicates how the browser should load the image
     */
    loading: Loading;
    /**
     * Specifies that the audio/video will start over again, every time it is finished
     */
    loop: boolean;
    /**
     * Specifies the range that is considered to be a low value
     */
    low: number;
    /**
     * Specifies the maximum number of characters allowed in an element
     */
    maxlength: number;
    /**
     * Specifies what media/device the linked document is optimized for
     */
    media: string;
    /**
     * Specifies the HTTP method to use when sending form-data
     */
    method: Method;
    /**
     * Specifies the minimum number of characters allowed in an element
     */
    minlength: number;
    /**
     * Specifies that a user can enter more than one value
     */
    multiple: boolean;
    /**
     * Specifies that the audio output of the video should be muted
     */
    muted: boolean;
    /**
     * Specifies the name of the element
     */
    name: string;
    /**
     * Specifies that the form should not be validated when submitted
     */
    novalidate: boolean;
    /**
     * This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES2015 modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.
     */
    nomodule: boolean;
    /**
     * Content attribute defining a cryptographic nonce ("number used once") which can be used by Content Security Policy to determine whether or not a given fetch will be allowed to proceed for a given element
     */
    nonce: string;
    /**
     * Specifies that the details should be visible (open) to the user
     */
    open: boolean;
    /**
     * Specifies what value is the optimal value for the gauge
     */
    optimum: number;
    /**
     * Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element
     */
    part: string;
    /**
     * Specifies a regular expression that an `<input>` element's value is checked against
     */
    pattern: string;//TODO: Could be a regex?
    /**
    * A space-separated list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking
    */
    ping: string;
    /**
     * Specifies a short hint that describes the expected value of the element
     */
    placeholder: string;
    /**
     * A Boolean attribute indicating that the video is to be played "inline", that is within the element's playback area. Note that the absence of this attribute does not imply that the video will always be played in fullscreen.
     */
    playsinline: boolean;
    /**
     * Specifies an image to be shown while the video is downloading, or until the user hits the play button
     */
    poster: string;
    /**
     * Specifies if and how the author thinks the audio/video should be loaded when the page loads
     */
    preload: Preload;
    /**
     * Specifies that the element is read-only
     */
    readonly: boolean;
    /**
     * Indicates which referrer to send when fetching the frame's resource:
     */
    referrerpolicy: ReferrerPolicy;
    /**
     * Specifies the relationship between the current document and the linked document
     */
    rel: Rel;
    /**
     * Specifies that the element must be filled out before submitting the form
     */
    required: boolean;
    /**
     * Specifies that the list order should be descending (9,8,7...)
     */
    reversed: boolean;
    /**
     * Specifies the visible number of lines in a text area
     */
    rows: number;
    /**
     * Specifies the number of rows a table cell should span
     */
    rowspan: number;
    /**
     * Enables an extra set of restrictions for the content in an `<iframe>`
     */
    sandbox: Sandbox;
    /**
     * Specifies whether a header cell is a header for a column, row, or group of columns or rows
     */
    scope: Scope;
    /**
     * Specifies that an option should be pre-selected when the page loads
     */
    selected: boolean;
    /**
     * Specifies the shape of the area
     */
    shape: Shape
    /**
     * Specifies the width, in characters (for `<input>`) or specifies the number of visible options (for `<select>`)
     */
    size: number;
    /**
     * Specifies the size of the linked resource
     */
    sizes: string;
    /**
     * Assigns a slot in a shadow DOM shadow tree to an element: An element with a slot attribute is assigned to the slot created by the `<slot>` element whose name attribute's value matches that slot attribute's value
     */
    slot: string;
    /**
     * Specifies the number of columns to span
     */
    span: number;
    /**
     * Specifies whether the element is to have its spelling and grammar checked or not
     */
    spellcheck: StringBoolean;
    /**
     * Specifies the URL of the media file
     */
    src: string;
    /**
     * Specifies the HTML content of the page to show in the `<iframe>`
     */
    srcdoc: string;
    /**
     * Specifies the language of the track text data (required if kind="subtitles")
     */
    srclang: Language;
    /**
     * Specifies the URL of the image to use in different situations
     */
    srcset: string;
    /**
     * Specifies the start value of an ordered list
     */
    start: number;
    /**
     * Specifies the legal number intervals for an input field
     */
    step: number;
    /**
     * Specifies an inline CSS style for an element
     */
    style: CSSProperties;
    /**
     * Specifies the tabbing order of an element
     */
    tabindex: number;
    /**
     * Specifies the target for where to open the linked document or where to submit the form
     */
    target: Target;
    /**
     * Specifies extra information about an element
     */
    title: string;
    /**
     * Specifies whether the content of an element should be translated or not
     */
    translate: YesNo;
    /**
     * This Boolean attribute indicates if the type attribute and the actual content type of the resource must match to be used.
     */
    typemustmatch: boolean;
    /**
     * Specifies an image as a client-side image map
     */
    usemap: string;
    /**
     * Specifies the width of the element
     */
    width: Length;
    /**
     * Specifies how the text in a text area is to be wrapped when submitted in a form
     */
    wrap: Wrap;
    /**
     * Specifies the XML Namespace of the document
     */
    xmlns: string;
}

// "min" should be defined in each element
// "max" should be defined in each element
// "type" should be defined in each element
// "value" should be defined in each element