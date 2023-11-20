import { ValueSets } from "./ValueSets"
      export interface AllAttributes {
  /**
* This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.
* 
* **Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute. */
abbr?: ValueSets['default'];
/**
* A `<boolean>` indicating whether the over script should be treated as an accent (i.e. drawn bigger and closer to the base expression).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
accent?: ValueSets['b'];
/**
* A `<boolean>` indicating whether the under script should be treated as an accent (i.e. drawn bigger and closer to the base expression).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
accentunder?: ValueSets['b'];
/**
* A comma-separated list of content types that the server accepts.
* 
* **Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) attribute of the specific [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element. */
accept?: ValueSets['default'];
/**
* A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  
* In previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters. */
["accept-charset"]?: ValueSets['default'];
/**
* Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey} */
accesskey?: ValueSets['default'];
/**
* This attribute controls whether or not the animation is cumulative.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/accumulate} */
accumulate?: ValueSets['45'];
/**
* The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element. */
action?: ValueSets['default'];
/**
* This attribute controls whether or not the animation is additive.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/additive} */
additive?: ValueSets['46'];
/**
* Sets the alignment of the rule on the page. If no value is specified, the default value is `left`. */
align?: ValueSets['default'];
/**
* The alignment-baseline attribute specifies how an object is aligned with respect to its parent. This property specifies which baseline of this element is to be aligned with the corresponding baseline of the parent. For example, this allows alphabetic baselines in Roman text to stay aligned across font size changes. It defaults to the baseline with the same name as the computed value of the alignment-baseline property.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline} */
["alignment-baseline"]?: ValueSets['52'];
/**
* Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._ */
alink?: ValueSets['default'];
/**
* Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the `<iframe>`. */
allow?: ValueSets['default'];
/**
* Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen "The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.") method.
* This attribute is considered a legacy attribute and redefined as `allow="fullscreen"`. */
allowfullscreen?: ValueSets['v'];
/**
* Set to `true` if a cross-origin `<iframe>` should be allowed to invoke the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API). */
allowpaymentrequest?: ValueSets['default'];
/**
* This attribute defines an alternative text description of the image.
* 
* **Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element's `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.
* 
* **Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering. */
alt?: ValueSets['default'];
/**
* Controls the amplitude of the gamma function of a component transfer element when its type attribute is gamma.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/amplitude} */
amplitude?: ValueSets['default'];
/**
* A space-separated list of URIs for archives of resources for the object. */
archive?: ValueSets['default'];
/**
* Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant} */
["aria-activedescendant"]?: ValueSets['default'];
/**
* Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-atomic} */
["aria-atomic"]?: ValueSets['b'];
/**
* Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete} */
["aria-autocomplete"]?: ValueSets['autocomplete'];
/**
* Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-busy} */
["aria-busy"]?: ValueSets['b'];
/**
* Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-checked} */
["aria-checked"]?: ValueSets['tristate'];
/**
* Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-colcount} */
["aria-colcount"]?: ValueSets['default'];
/**
* Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-colindex} */
["aria-colindex"]?: ValueSets['default'];
/**
* Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-colspan} */
["aria-colspan"]?: ValueSets['default'];
/**
* Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-controls} */
["aria-controls"]?: ValueSets['default'];
/**
* Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-current} */
["aria-current"]?: ValueSets['current'];
/**
* Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-describedby} */
["aria-describedby"]?: ValueSets['default'];
/**
* Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby). */
["aria-details"]?: ValueSets['default'];
/**
* Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-disabled} */
["aria-disabled"]?: ValueSets['b'];
/**
* \[Deprecated in ARIA 1.1\] Indicates what functions can be performed when a dragged object is released on the drop target.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect} */
["aria-dropeffect"]?: ValueSets['dropeffect'];
/**
* Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage} */
["aria-errormessage"]?: ValueSets['default'];
/**
* Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-expanded} */
["aria-expanded"]?: ValueSets['u'];
/**
* Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-flowto} */
["aria-flowto"]?: ValueSets['default'];
/**
* \[Deprecated in ARIA 1.1\] Indicates an element's "grabbed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed} */
["aria-grabbed"]?: ValueSets['u'];
/**
* Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup} */
["aria-haspopup"]?: ValueSets['haspopup'];
/**
* Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-hidden} */
["aria-hidden"]?: ValueSets['b'];
/**
* Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-invalid} */
["aria-invalid"]?: ValueSets['invalid'];
/**
* Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
["aria-keyshortcuts"]?: ValueSets['default'];
/**
* Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-label} */
["aria-label"]?: ValueSets['default'];
/**
* Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby} */
["aria-labelledby"]?: ValueSets['default'];
/**
* Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level} */
["aria-level"]?: ValueSets['default'];
/**
* Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-live} */
["aria-live"]?: ValueSets['live'];
/**
* Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-modal} */
["aria-modal"]?: ValueSets['b'];
/**
* Indicates whether a text box accepts multiple lines of input or only a single line.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-multiline} */
["aria-multiline"]?: ValueSets['b'];
/**
* Indicates that the user may select more than one item from the current selectable descendants.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable} */
["aria-multiselectable"]?: ValueSets['b'];
/**
* Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-orientation} */
["aria-orientation"]?: ValueSets['orientation'];
/**
* Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-owns} */
["aria-owns"]?: ValueSets['default'];
/**
* Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder} */
["aria-placeholder"]?: ValueSets['default'];
/**
* Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-posinset} */
["aria-posinset"]?: ValueSets['default'];
/**
* Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-pressed} */
["aria-pressed"]?: ValueSets['tristate'];
/**
* Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-readonly} */
["aria-readonly"]?: ValueSets['b'];
/**
* Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-relevant} */
["aria-relevant"]?: ValueSets['relevant'];
/**
* Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-required} */
["aria-required"]?: ValueSets['b'];
/**
* Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription} */
["aria-roledescription"]?: ValueSets['default'];
/**
* Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount} */
["aria-rowcount"]?: ValueSets['default'];
/**
* Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex} */
["aria-rowindex"]?: ValueSets['default'];
/**
* Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan} */
["aria-rowspan"]?: ValueSets['default'];
/**
* Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-selected} */
["aria-selected"]?: ValueSets['u'];
/**
* Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-setsize} */
["aria-setsize"]?: ValueSets['default'];
/**
* Indicates if items in a table or grid are sorted in ascending or descending order.
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-sort} */
["aria-sort"]?: ValueSets['sort'];
/**
* Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax} */
["aria-valuemax"]?: ValueSets['default'];
/**
* Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin} */
["aria-valuemin"]?: ValueSets['default'];
/**
* Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow} */
["aria-valuenow"]?: ValueSets['default'];
/**
* Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).
* 
* [WAI-ARIA Reference] {@link https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext} */
["aria-valuetext"]?: ValueSets['default'];
/**
* This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.") request header. */
as?: ValueSets['default'];
/**
* This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.
* 
* This attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.
* 
* Browsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async="false"`) during HTML parsing.
* 
* Dynamically inserted scripts (using [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async="false"`.
* 
* See [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts). */
async?: ValueSets['v'];
/**
* This attribute indicates the name of the attribute in the parent element that is going to be changed during an animation. 
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/attributeName} */
attributeName?: ValueSets['default'];
/**
* This attribute specifies the namespace in which the target attribute and its associated values are defined. 
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/attributeType} */
attributeType?: ValueSets['47'];
/**
* Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:
* 
* *   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)
* *   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase
* *   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase
* *   `characters`, all letters should default to uppercase
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize} */
autocapitalize?: ValueSets['default'];
/**
* Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:
* 
* *   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.
* *   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.
* 
* For most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields).
* **Note:** If you set `autocomplete` to `off` in a form because the document provides its own auto-completion, then you should also set `autocomplete` to `off` for each of the form's `input` elements that the document can auto-complete. For details, see the note regarding Google Chrome in the [Browser Compatibility chart](#compatChart). */
autocomplete?: ValueSets['o'];
autofocus?: ValueSets['v'];
/**
* A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.
* **Note**: Sites that automatically play audio (or video with an audio track) can be an unpleasant experience for users, so it should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.
* 
* To disable video autoplay, `autoplay="false"` will not work; the video will autoplay if the attribute is there in the `<video>` tag at all. To remove autoplay the attribute needs to be removed altogether.
* 
* In some browsers (e.g. Chrome 70.0) autoplay is not working if no `muted` attribute is present. */
autoplay?: ValueSets['v'];
/**
* This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.
* 
* **Note:** Do not use this attribute as it is obsolete in the latest standard. */
axis?: ValueSets['default'];
/**
* The azimuth attribute represent the direction angle for the light source on the XY plane (clockwise), in degrees from the x axis.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/azimuth} */
azimuth?: ValueSets['default'];
/**
* URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._ */
background?: ValueSets['default'];
/**
* The baseFrequency attribute represent The base frequencies parameter for the noise function of the <feturbulence> primitive. If two <number>s are provided, the first number represents a base frequency in the X direction and the second value represents a base frequency in the Y direction. If one number is provided, then that value is used for both X and Y.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/baseFrequency} */
baseFrequency?: ValueSets['default'];
/**
* The baseline-shift attribute allows repositioning of the dominant-baseline relative to the dominant-baseline of the parent text content element. The shifted object might be a sub- or superscript.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/baseline-shift} */
["baseline-shift"]?: ValueSets['default'];
/**
* Defines when an animation should begin or when an element should be discarded.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/begin} */
begin?: ValueSets['default'];
/**
* Background color for the document. _This method is non-conforming, use CSS [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._ */
bgcolor?: ValueSets['default'];
/**
* The bias attribute shifts the range of the filter. After applying the kernelMatrix of the <feconvolvematrix> element to the input image to yield a number and applied the divisor attribute, the bias attribute is added to each component. This allows representation of values that would otherwise be clamped to 0 or 1.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/bias} */
bias?: ValueSets['default'];
/**
* The width of a border around the control, in pixels. */
border?: ValueSets['default'];
/**
* The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
bottommargin?: ValueSets['default'];
/**
* specifies a relative offset value for an attribute that will be modified during an animation.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/by} */
by?: ValueSets['default'];
/**
* This attribute specifies the interpolation mode for the animation. The default mode is linear, however if the attribute does not support linear interpolation (e.g. for strings), the calcMode attribute is ignored and discrete interpolation is used.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/calcMode} */
calcMode?: ValueSets['50'];
/**
* This attribute declares the page's character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn't request a specific encoding, it suggests:
* 
* *   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).
* *   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.
* 
* **Note:** ASCII-incompatible encodings are those that don't map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)
* 
* *   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.
* *   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.
* 
* **Notes:**
* 
* *   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.
* *   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.
* *   This [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page's character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.
* *   It is strongly recommended to define the character encoding. If a page's encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).
* *   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended. */
charset?: ValueSets['default'];
checked?: ValueSets['v'];
/**
* A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote. */
cite?: ValueSets['default'];
/**
* A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](https://developer.mozilla.org/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](https://developer.mozilla.org/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class} */
class?: ValueSets['default'];
/**
* The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute. */
classid?: ValueSets['default'];
/**
* Indicates where to begin the next line after the break. */
clear?: ValueSets['default'];
/**
* The clip-path attribute binds the element it is applied to with a given <clipPath> element
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clip-path} */
["clip-path"]?: ValueSets['default'];
/**
* The clip-rule attribute only applies to graphics elements that are contained within a <clipPath> element. The clip-rule attribute basically works as the fill-rule attribute, except that it applies to <clipPath> definitions.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clip-rule} */
["clip-rule"]?: ValueSets['53'];
/**
* Defines the coordinate system for the contents of the <clippath> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clipPathUnits} */
clipPathUnits?: ValueSets['76'];
/**
* The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document. */
codebase?: ValueSets['default'];
/**
* The content type of the data specified by **classid**. */
codetype?: ValueSets['default'];
/**
* Sets the color of the rule through color name or hexadecimal value. */
color?: ValueSets['default'];
/**
* The color-interpolation attribute specifies the color space for gradient interpolations, color animations, and alpha compositing.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation} */
["color-interpolation"]?: ValueSets['54'];
/**
* The color-interpolation-filters attribute specifies the color space for imaging operations performed via filter effects.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation-filters} */
["color-interpolation-filters"]?: ValueSets['54'];
/**
* The color-profile attribute is used to define which color profile a raster image included through the <image> element should use.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-profile} */
["color-profile"]?: ValueSets['55'];
/**
* The color-rendering attribute provides a hint to the SVG user agent about how to optimize its color interpolation and compositing operations.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-rendering} */
["color-rendering"]?: ValueSets['56'];
/**
* Contains the _preferred_ count of characters that a line should have. It was a non-standard synonym of [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element's width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead. */
cols?: ValueSets['default'];
colspan?: ValueSets['default'];
/**
* A non-negative integer value that indicates on how many columns does the cell extend.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
columnspan?: ValueSets['default'];
/**
* This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn't work in all browsers.
* 
* **Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`. */
compact?: ValueSets['default'];
/**
* This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used. */
content?: ValueSets['default'];
/**
* An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:
* 
* *   `true` or the _empty string_, which indicates that the element must be editable;
* *   `false`, which indicates that the element must not be editable.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable} */
contenteditable?: ValueSets['default'];
/**
* The `[**id**](#attr-id)` of a [`<menu>`](https://developer.mozilla.org/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu} */
contextmenu?: ValueSets['default'];
controls?: ValueSets['v'];
coords?: ValueSets['default'];
/**
* This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:
* 
* `anonymous`
* 
* A cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn't disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.
* 
* `use-credentials`
* 
* A cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request's credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.
* 
* If the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information. */
crossorigin?: ValueSets['xo'];
/**
* A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced for the embedded resource. See [`HTMLIFrameElement.csp`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp "The csp property of the HTMLIFrameElement interface specifies the Content Security Policy that an embedded document must agree to enforce upon itself.") for details. */
csp?: ValueSets['default'];
/**
* The cursor attribute specifies the mouse cursor displayed when the mouse pointer is over an element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cursor} */
cursor?: ValueSets['57'];
/**
* For the <circle> and the <ellipse> element, this attribute define the x-axis coordinate of the center of the element. If the attribute is not specified, the effect is as if a value of "0" were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx} */
cx?: ValueSets['default'];
/**
* For the <circle> and the <ellipse> element, this attribute define the y-axis coordinate of the center of the element. If the attribute is not specified, the effect is as if a value of "0" were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cy} */
cy?: ValueSets['default'];
/**
* This attribute defines a path to follow.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d} */
d?: ValueSets['default'];
/**
* The address of the resource as a valid URL. At least one of **data** and **type** must be defined. */
data?: ValueSets['default'];
/**
* This attribute indicates the time and/or date of the element and must be in one of the formats described below. */
datetime?: ValueSets['default'];
/**
* The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused. */
declare?: ValueSets['default'];
/**
* Provides an image decoding hint to the browser. The allowed values are:
* `sync`
* 
* Decode the image synchronously for atomic presentation with other content.
* 
* `async`
* 
* Decode the image asynchronously to reduce delay in presenting other content.
* 
* `auto`
* 
* Default mode, which indicates no preference for the decoding mode. The browser decides what is best for the user. */
decoding?: ValueSets['decoding'];
/**
* This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element. */
default?: ValueSets['v'];
/**
* This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").
* 
* Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.
* 
* This attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.
* 
* To achieve a similar effect for dynamically inserted scripts use `async="false"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document. */
defer?: ValueSets['v'];
/**
* A `<length-percentage>` indicating the desired depth (below the baseline) of the element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
depth?: ValueSets['default'];
/**
* The diffuseConstant attribute represant the kd value in the Phong lighting model. In SVG, this can be any non-negative number.If the attribute is not specified, then the effect is as if a value of 1 were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/diffuseConstant} */
diffuseConstant?: ValueSets['default'];
/**
* An enumerated attribute indicating the directionality of the element's text. It can have the following values:
* 
* *   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);
* *   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);
* *   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir} */
dir?: ValueSets['d'];
/**
* The direction attribute specifies the base writing direction of text and the direction of embeddings and overrides (see unicode-bidi) for the Unicode bidirectional algorithm. For the direction attribute to have any effect on an element that does not by itself establish a new text chunk (such as a <tspan> element without absolute position adjustments due to x or y attributes), the unicode-bidi property's value must be embed or bidi-override.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/direction} */
direction?: ValueSets['58'];
dirname?: ValueSets['default'];
disabled?: ValueSets['v'];
/**
* Specifies the rendering mode. The values `block` and `inline` are allowed.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
display?: ValueSets['42'];
/**
* A `<boolean>` specifying whether to set the math-style to `normal` (if true) or `compact` (otherwise).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
displaystyle?: ValueSets['b'];
/**
* After applying the kernelMatrix of the <feconvolvematrix> element to the input image to yield a number, that number is divided by the value given to the divisor attribute to yield the final destination color value. A divisor that is the sum of all the matrix values tends to have an evening effect on the overall color intensity of the result.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/divisor} */
divisor?: ValueSets['default'];
/**
* The dominant-baseline attribute is used to determine or re-determine a scaled-baseline-table. A scaled-baseline-table is a compound value with three components: a baseline-identifier for the dominant-baseline, a baseline-table and a baseline-table font-size. Some values of the property re-determine all three values; other only re-establish the baseline-table font-size. When the initial value, auto, would give an undesired result, this property can be used to explicitly set the desire scaled-baseline-table.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline} */
["dominant-baseline"]?: ValueSets['60'];
/**
* This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.
* 
* **Notes:**
* 
* *   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
* *   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.
* *   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.
* *   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute. */
download?: ValueSets['default'];
/**
* An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](https://developer.mozilla.org/docs/DragDrop/Drag_and_Drop). It can have the following values:
* 
* *   `true`, which indicates that the element may be dragged
* *   `false`, which indicates that the element may not be dragged.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable} */
draggable?: ValueSets['b'];
/**
* An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](https://developer.mozilla.org/docs/DragDrop/Drag_and_Drop). It can have the following values:
* 
* *   `copy`, which indicates that dropping will create a copy of the element that was dragged
* *   `move`, which indicates that the element that was dragged will be moved to this new location.
* *   `link`, will create a link to the dragged data. */
dropzone?: ValueSets['default'];
/**
* This attribute indicates the simple duration of the animation.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dur} */
dur?: ValueSets['default'];
/**
* The dx attribute indicates a shift along the x-axis on the position of an element or its content. What exactly is shifted depends on the element for which this attribute is set.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx} */
dx?: ValueSets['default'];
/**
* The dy attribute indicates a shift along the y-axis on the position of an element or its content. What exactly is shifted depends on the element for which this attribute is set.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy} */
dy?: ValueSets['default'];
/**
* The edgeMode attribute determines how to extend the input image as necessary with color values so that the matrix operations can be applied when the kernel is positioned at or near the edge of the input image.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/edgeMode} */
edgeMode?: ValueSets['80'];
/**
* The elevation attribute represent the direction angle for the light source from the XY plane towards the z axis, in degrees. Note the positive Z-axis points towards the viewer of the content.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/elevation} */
elevation?: ValueSets['default'];
/**
* The encoding of the semantic information in the annotation.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
encoding?: ValueSets['default'];
/**
* When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:
* 
* *   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.
* *   `multipart/form-data`: The value used for an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".
* *   `text/plain`: (HTML5)
* 
* This value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element. */
enctype?: ValueSets['et'];
/**
* This attribute defines an end value for the animation that can constrain the active duration.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/end} */
end?: ValueSets['default'];
/**
* Defines the exponent of the gamma function.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/exponent} */
exponent?: ValueSets['default'];
/**
* Used to transitively export shadow parts from a nested shadow tree into a containing light tree.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts} */
exportparts?: ValueSets['default'];
/**
* A `<boolean>` indicating whether the operator is a fence (such as parentheses). There is no visual effect for this attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
fence?: ValueSets['b'];
/**
* The fill attribute has two meanings based on the context it's used.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill} */
fill?: ValueSets['default'];
/**
* This attribute specifies the opacity of the color or the content the current object is filled with.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity} */
["fill-opacity"]?: ValueSets['default'];
/**
* The fill-rule attribute indicates how to determine what side of a path is inside a shape, to determine how the fill property paints the shape. For a simple, non-intersecting path, it is intuitively clear what region lies "inside"; however, for a more complex path, such as a path that intersects itself or where one subpath encloses another, the interpretation of "inside" is not so obvious.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule} */
["fill-rule"]?: ValueSets['53'];
/**
* The filter attribute defines the filter effects define by the <filter> element that shall be applied to its element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/filter} */
filter?: ValueSets['default'];
/**
* defines the coordinate system for the attributes x, y, width and height.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/filterUnits} */
filterUnits?: ValueSets['76'];
/**
* The flood-color attribute indicates what color to use to flood the current filter primitive subregion defined through the <feflood> element. The keyword currentColor and ICC colors can be specified in the same manner as within a <paint> specification for the fill and stroke attributes.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/flood-color} */
["flood-color"]?: ValueSets['default'];
/**
* The flood-opacity attribute indicates the opacity value to use across the current filter primitive subregion defined through the <feflood> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/flood-opacity} */
["flood-opacity"]?: ValueSets['default'];
/**
* The font-family attribute indicates which font family will be used to render the text, specified as a prioritized list of font family names and/or generic family names.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family} */
["font-family"]?: ValueSets['default'];
/**
* The font-size attribute refers to the size of the font from baseline to baseline when multiple lines of text are set solid in a multiline layout environment. For SVG, if a <length> is provided without a unit identifier (e.g., an unqualified number such as 128), the browser processes the <length> as a height value in the current user coordinate system.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size} */
["font-size"]?: ValueSets['default'];
/**
* The font-size-adjust attribute allows authors to specify an aspect value for an element that will preserve the x-height of the first choice font in a substitute font.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-size-adjust} */
["font-size-adjust"]?: ValueSets['default'];
/**
* The font-stretch attribute indicates the desired amount of condensing or expansion in the glyphs used to render the text.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-stretch} */
["font-stretch"]?: ValueSets['61'];
/**
* The font-style attribute specifies whether the text is to be rendered using a normal, italic or oblique face.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style} */
["font-style"]?: ValueSets['default'];
/**
* The font-variant attribute indicates whether the text is to be rendered using the normal glyphs for lowercase characters or using small-caps glyphs for lowercase characters.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-variant} */
["font-variant"]?: ValueSets['default'];
/**
* The font-weight attribute refers to the boldness or lightness of the glyphs used to render the text, relative to other fonts in the same font family.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight} */
["font-weight"]?: ValueSets['62'];
/**
* The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.
* 
* **Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element. */
for?: ValueSets['default'];
/**
* The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. */
form?: ValueSets['default'];
formaction?: ValueSets['default'];
formenctype?: ValueSets['et'];
formmethod?: ValueSets['fm'];
formnovalidate?: ValueSets['v'];
formtarget?: ValueSets['default'];
/**
* Defines the radius of the start circle of the radial gradient. The gradient will be drawn such that the 0% <stop> is mapped to the perimeter of the start circle.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fr} */
fr?: ValueSets['default'];
/**
* This attribute indicates the initial value of the attribute that will be modified during the animation. When used with the to attribute, the animation will change the modified attribute from the from value to the to value.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/from} */
from?: ValueSets['default'];
/**
* For the <radialGradient> element, this attribute define the x-axis coordinate of the focal point for radial gradient. If the attribute is not specified, it's assumed to be at the same place as the center point.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fx} */
fx?: ValueSets['default'];
/**
* For the <radialGradient> element, this attribute define the y-axis coordinate of the focal point for radial gradient. If the attribute is not specified, it's assumed to be at the same place as the center point.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fy} */
fy?: ValueSets['default'];
/**
* The gradientTransform attribute contains the definition of an optional additional transformation from the gradient coordinate system onto the target coordinate system (i.e., userSpaceOnUse or objectBoundingBox). This allows for things such as skewing the gradient. This additional transformation matrix is post-multiplied to (i.e., inserted to the right of) any previously defined transformations, including the implicit transformation necessary to convert from object bounding box units to user space.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientTransform} */
gradientTransform?: ValueSets['default'];
/**
* The gradientUnits attribute defines the coordinate system for attributes x1, y1, x2 and y2 on the <lineargradient> element or for attributes cx, cy, r, fx, and fy on the <radialgradient>.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientUnits} */
gradientUnits?: ValueSets['76'];
headers?: ValueSets['default'];
/**
* The intrinsic height of the image in pixels. */
height?: ValueSets['default'];
/**
* A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden} */
hidden?: ValueSets['v'];
/**
* The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value. */
high?: ValueSets['default'];
/**
* The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed. */
href?: ValueSets['default'];
/**
* This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present. */
hreflang?: ValueSets['default'];
/**
* Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:
* 
* *   `"content-language"`  
*     Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.
*     
*     **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.
*     
* *   `"content-security-policy"`  
*     Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.
* *   `"content-type"`  
*     Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string '`text/html`' followed by a character set with the following syntax: '`; charset=_IANAcharset_`', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)
*     
*     **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.
*     
*     **Note:** As [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can't change documents' types in XHTML or HTML5's XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.
*     
* *   `"refresh"`  
*     This instruction specifies:
*     *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.
*     *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string '`;url=`', and a valid URL.
* *   `"set-cookie"`  
*     Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).
*     
*     **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead. */
["http-equiv"]?: ValueSets['default'];
/**
* Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id} */
id?: ValueSets['default'];
/**
* The image-rendering attribute provides a hint to the browser about how to make speed vs. quality tradeoffs as it performs image processing.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/image-rendering} */
["image-rendering"]?: ValueSets['63'];
/**
* Indicates the relative importance of the resource. Priority hints are delegated using the values: */
importance?: ValueSets['default'];
/**
* The in attribute identifies input for the given filter primitive.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in} */
in?: ValueSets['77'];
/**
* The in2 attribute identifies the second input for the given filter primitive. It works exactly like the in attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in2} */
in2?: ValueSets['77'];
/**
* Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](https://developer.mozilla.org/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode} */
inputmode?: ValueSets['default'];
/**
* Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). */
integrity?: ValueSets['default'];
/**
* Defines the intercept of the linear function of color component transfers when the type attribute is set to linear.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/intercept} */
intercept?: ValueSets['default'];
/**
* This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in this attribute. [Explainer](https://github.com/ojanvafai/intrinsicsize-attribute), [examples](https://googlechrome.github.io/samples/intrinsic-size/index.html) */
intrinsicsize?: ValueSets['default'];
/**
* Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements) for more details).
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is} */
is?: ValueSets['default'];
/**
* This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.
* 
* **Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute. */
ismap?: ValueSets['v'];
/**
* The unique, global identifier of an item.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid} */
itemid?: ValueSets['default'];
/**
* Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop} */
itemprop?: ValueSets['default'];
/**
* Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref} */
itemref?: ValueSets['default'];
/**
* `itemscope` (usually) works along with `[itemtype](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope} */
itemscope?: ValueSets['v'];
/**
* Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype} */
itemtype?: ValueSets['default'];
/**
* The k1 attribute defines one of the value to be used within the the arithmetic operation of the <fecomposite> filter primitive. If this attribute is not set, its default value is 0.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/k1} */
k1?: ValueSets['default'];
/**
* The k1 attribute defines one of the value to be used within the the arithmetic operation of the <fecomposite> filter primitive. If this attribute is not set, its default value is 0.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/k2} */
k2?: ValueSets['default'];
/**
* The k1 attribute defines one of the value to be used within the the arithmetic operation of the <fecomposite> filter primitive. If this attribute is not set, its default value is 0.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/k3} */
k3?: ValueSets['default'];
/**
* The k1 attribute defines one of the value to be used within the the arithmetic operation of the <fecomposite> filter primitive. If this attribute is not set, its default value is 0.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/k4} */
k4?: ValueSets['default'];
/**
* the order attribute defines the list of <number>s that make up the kernel matrix for the <feconvolvematrix> element. Values are separated by space characters and/or a comma. The number of entries in the list must equal to <orderX> by <orderY> as defined in the order attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kernelMatrix} */
kernelMatrix?: ValueSets['default'];
/**
* The kernelUnitLength attribute has two meaning based on the context it's used.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kernelUnitLength} */
kernelUnitLength?: ValueSets['default'];
/**
* The kerning attribute indicates whether the browser should adjust inter-glyph spacing based on kerning tables that are included in the relevant font (i.e., enable auto-kerning) or instead disable auto-kerning and instead set inter-character spacing to a specific length (typically, zero).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kerning} */
kerning?: ValueSets['default'];
/**
* This attribute indicate, in the range [0,1], how far is the object along the path for each keyTimes associated values.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyPoints} */
keyPoints?: ValueSets['default'];
/**
* The keySplines attribute define a set of Bézier control points associated with the keyTimes list, defining a cubic Bézier function that controls interval pacing. The attribute value is a semicolon-separated list of control point descriptions. Each control point description is a set of four values: x1 y1 x2 y2, describing the Bézier control points for one time segment. The keyTimes values that define the associated segment are the Bézier "anchor points", and the keySplines values are the control points. Thus, there must be one fewer sets of control points than there are keyTimes.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keySplines} */
keySplines?: ValueSets['default'];
/**
* The keyTimes attribute is a semicolon-separated list of time values used to control the pacing of the animation. Each time in the list corresponds to a value in the values attribute list, and defines when the value is used in the animation. Each time value in the keyTimes list is specified as a floating point value between 0 and 1 (inclusive), representing a proportional offset into the duration of the animation element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyTimes} */
keyTimes?: ValueSets['default'];
/**
* How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:
* 
* *   `subtitles`
*     *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.
*     *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.
* *   `captions`
*     *   Closed captions provide a transcription and possibly a translation of audio.
*     *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).
*     *   Suitable for users who are deaf or when the sound is muted.
* *   `descriptions`
*     *   Textual description of the video content.
*     *   Suitable for users who are blind or where the video cannot be seen.
* *   `chapters`
*     *   Chapter titles are intended to be used when the user is navigating the media resource.
* *   `metadata`
*     *   Tracks used by scripts. Not visible to the user. */
kind?: ValueSets['tk'];
/**
* A user-readable title of the text track which is used by the browser when listing available text tracks. */
label?: ValueSets['default'];
/**
* Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang} */
lang?: ValueSets['default'];
/**
* A `<boolean>` indicating whether the operator should be drawn bigger when math-style is set to normal.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
largeop?: ValueSets['b'];
/**
* The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
leftmargin?: ValueSets['default'];
/**
* How the text is stretched or compressed to fit the width defined by the textLength attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/lengthAdjust} */
lengthAdjust?: ValueSets['88'];
/**
* The letter-spacing attribute specifies spacing behavior between text characters supplemental to any spacing due to the kerning attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing} */
["letter-spacing"]?: ValueSets['default'];
/**
* The lighting-color attribute defines the color of the light source for filter primitives elements <fediffuselighting> and <fespecularlighting>.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/lighting-color} */
["lighting-color"]?: ValueSets['default'];
/**
* The limitingConeAngle attribute represents the angle in degrees between the spot light axis (i.e. the axis between the light source and the point to which it is pointing at) and the spot light cone. So it defines a limiting cone which restricts the region where the light is projected. No light is projected outside the cone.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/limitingConeAngle} */
limitingConeAngle?: ValueSets['default'];
/**
* A `<length-percentage>` indicating the thickness of the horizontal fraction line.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
linethickness?: ValueSets['default'];
/**
* Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.") pseudo-class instead._ */
link?: ValueSets['default'];
list?: ValueSets['default'];
/**
* Indicates how the browser should load the image. */
loading?: ValueSets['loading'];
loop?: ValueSets['v'];
/**
* The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value. */
low?: ValueSets['default'];
/**
* The opening quote to enclose the content.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
lquote?: ValueSets['default'];
/**
* A `<length-percentage>` indicating the amount of space before the operator.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
lspace?: ValueSets['default'];
/**
* Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details. */
manifest?: ValueSets['default'];
/**
* The marker-end defines the arrowhead or polymarker that will be drawn at the final vertex of the given <path> element or basic shape. Note that for a <path> element which ends with a closed sub-path, the last vertex is the same as the initial vertex on the given sub-path. In this case, if marker-end does not equal none, then it is possible that two markers will be rendered on the given vertex. One way to prevent this is to set marker-end to none. (Note that the same comment applies to <polygon> elements.)
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/marker-end} */
["marker-end"]?: ValueSets['default'];
/**
* The marker-mid defines the arrowhead or polymarker that shall be drawn at every vertex other than the first and last vertex of the given <path> element or basic shape.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/marker-mid} */
["marker-mid"]?: ValueSets['default'];
/**
* The marker-start attribute defines the arrowhead or polymarker that will be drawn at the first vertex of the given <path> element or basic shape.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/marker-start} */
["marker-start"]?: ValueSets['default'];
/**
* The markerHeight represents the height of the viewport into which the <marker> is to be fitted when it is rendered.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/markerHeight} */
markerHeight?: ValueSets['default'];
/**
* The markerUnits attribute defines the coordinate system for the attributes markerWidth, markerHeight and the contents of the <marker>.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/markerUnits} */
markerUnits?: ValueSets['86'];
/**
* The markerWidth represents the width of the viewport into which the <marker> is to be fitted when it is rendered.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/markerWidth} */
markerWidth?: ValueSets['default'];
/**
* The mask attribute binds the element it is applied to with a given <mask> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/mask} */
mask?: ValueSets['default'];
/**
* Defines the coordinate system for the contents of the <mask>.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/maskContentUnits} */
maskContentUnits?: ValueSets['76'];
/**
* This attribute defines the coordinate system for attributes x, y, width and height on the <mask>.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/maskUnits} */
maskUnits?: ValueSets['76'];
/**
* The logical class of token elements, which varies in typography.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
mathvariant?: ValueSets['default'];
max?: ValueSets['default'];
maxlength?: ValueSets['default'];
/**
* A `<length-percentage>` indicating the maximum size of the operator when it is stretchy.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
maxsize?: ValueSets['default'];
/**
* This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.
* 
* **Notes:**
* 
* *   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.
* *   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4. */
media?: ValueSets['default'];
mediagroup?: ValueSets['default'];
/**
* The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:
* 
* *   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.
* *   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.
* *   `dialog`: Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.
* 
* This value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element. */
method?: ValueSets['m'];
min?: ValueSets['default'];
minlength?: ValueSets['default'];
/**
* A `<length-percentage>` indicating the minimum size of the operator when it is stretchy.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
minsize?: ValueSets['default'];
/**
* The mode attribute defines the blending mode on the <feblend> filter primitive.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/mode} */
mode?: ValueSets['78'];
/**
* A `<boolean>` indicating whether attached under- and overscripts move to sub- and superscript positions when math-style is set to compact.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
movablelimits?: ValueSets['b'];
/**
* Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext "The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.") instead. */
["moz-opaque"]?: ValueSets['default'];
multiple?: ValueSets['v'];
muted?: ValueSets['v'];
/**
* This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.
* 
* This metadata name is associated with the value contained by the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:
* 
* *   `application-name` which defines the name of the application running in the web page.
*     
*     **Note:**
*     
*     *   Browsers may use this to identify the application. It is different from the [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab.") element, which usually contain the application name, but may also contain information like the document name or a status.
*     *   Simple web pages shouldn't define an application-name.
*     
* *   `author` which defines the name of the document's author.
* *   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
* *   `generator` which contains the identifier of the software that generated the page.
* *   `keywords` which contains words relevant to the page's content separated by commas.
* *   `referrer` which controls the [`Referer` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:
*     
*     Values for the `content` attribute of `<meta name="referrer">`
*     
*     `no-referrer`
*     
*     Do not send a HTTP `Referrer` header.
*     
*     `origin`
*     
*     Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.
*     
*     `no-referrer-when-downgrade`
*     
*     Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.
*     
*     `origin-when-cross-origin`
*     
*     Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.
*     
*     `same-origin`
*     
*     A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.
*     
*     `strict-origin`
*     
*     Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).
*     
*     `strict-origin-when-cross-origin`
*     
*     Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).
*     
*     `unsafe-URL`
*     
*     Send the full URL (stripped of parameters) for same-origin or cross-origin requests.
*     
*     **Notes:**
*     
*     *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.
*     *   Dynamically inserting `<meta name="referrer">` (with [`document.write`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.
*     *   When several conflicting policies are defined, the no-referrer policy is applied.
*     
* 
* This attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:
* 
* *   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.
* *   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).
* *   `publisher` which defines the name of the document's publisher.
* *   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:
*     
*     Values for the content of `<meta name="robots">`
*     
*     Value
*     
*     Description
*     
*     Used by
*     
*     `index`
*     
*     Allows the robot to index the page (default).
*     
*     All
*     
*     `noindex`
*     
*     Requests the robot to not index the page.
*     
*     All
*     
*     `follow`
*     
*     Allows the robot to follow the links on the page (default).
*     
*     All
*     
*     `nofollow`
*     
*     Requests the robot to not follow the links on the page.
*     
*     All
*     
*     `none`
*     
*     Equivalent to `noindex, nofollow`
*     
*     [Google](https://support.google.com/webmasters/answer/79812)
*     
*     `noodp`
*     
*     Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.
*     
*     [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
*     
*     `noarchive`
*     
*     Requests the search engine not to cache the page content.
*     
*     [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
*     
*     `nosnippet`
*     
*     Prevents displaying any description of the page in search engine results.
*     
*     [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
*     
*     `noimageindex`
*     
*     Requests this page not to appear as the referring page of an indexed image.
*     
*     [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)
*     
*     `nocache`
*     
*     Synonym of `noarchive`.
*     
*     [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
*     
*     **Notes:**
*     
*     *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.
*     *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.
*     *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.
*     *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot's behaviour is undefined and may vary between them.
*     *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.
*     
* *   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.
* *   `viewport`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.
*     
*     Values for the content of `<meta name="viewport">`
*     
*     Value
*     
*     Possible subvalues
*     
*     Description
*     
*     `width`
*     
*     A positive integer number, or the text `device-width`
*     
*     Defines the pixel width of the viewport that you want the web site to be rendered at.
*     
*     `height`
*     
*     A positive integer, or the text `device-height`
*     
*     Defines the height of the viewport. Not used by any browser.
*     
*     `initial-scale`
*     
*     A positive number between `0.0` and `10.0`
*     
*     Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.
*     
*     `maximum-scale`
*     
*     A positive number between `0.0` and `10.0`
*     
*     Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
*     
*     `minimum-scale`
*     
*     A positive number between `0.0` and `10.0`
*     
*     Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
*     
*     `user-scalable`
*     
*     `yes` or `no`
*     
*     If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.
*     
*     Specification
*     
*     Status
*     
*     Comment
*     
*     [CSS Device Adaptation  
*     The definition of '<meta name="viewport">' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)
*     
*     Working Draft
*     
*     Non-normatively describes the Viewport META element
*     
*     See also: [`@viewport`](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")
*     
*     **Notes:**
*     
*     *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.
*     *   The default values may vary between devices and browsers.
*     *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag"). */
name?: ValueSets['default'];
/**
* This Boolean attribute is set to indicate that the script should not be executed in browsers that support [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code. */
nomodule?: ValueSets['default'];
/**
* A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial. */
nonce?: ValueSets['default'];
/**
* Sets the rule to have no shading. */
noshade?: ValueSets['default'];
/**
* This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form. */
novalidate?: ValueSets['v'];
/**
* If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`. */
nowrap?: ValueSets['default'];
/**
* The numOctaves parameter for the noise function of the <feturbulence> primitive.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/numOctaves} */
numOctaves?: ValueSets['default'];
/**
* The opacity attribute specifies the transparency of an object or of a group of objects, that is, the degree to which the background behind the element is overlaid.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/opacity} */
opacity?: ValueSets['default'];
/**
* This Boolean attribute indicates whether or not the details — that is, the contents of the `<details>` element — are currently visible. The default, `false`, means the details are not visible. */
open?: ValueSets['v'];
/**
* The operator attribute as two meaning based on the context it's used.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/operator} */
operator?: ValueSets['79'];
/**
* This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred. */
optimum?: ValueSets['default'];
/**
* the order attribute indicates the size of the matrix to be used by a <feconvolvematrix> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/order} */
order?: ValueSets['default'];
/**
* Indicates how a marker is rotated when it is placed at its position on the shape.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient} */
orient?: ValueSets['default'];
/**
* The overflow attribute has the same parameter values as defined for the css overflow property.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/overflow} */
overflow?: ValueSets['64'];
/**
* A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](https://developer.mozilla.org/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part} */
part?: ValueSets['default'];
/**
* This attribute defines the path of the motion, using the same syntax as the d attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/path} */
path?: ValueSets['default'];
/**
* This attribute lets the author specify a total length for the path, in whatever units the author chooses. This value is then used to calibrate the browser's distance calculations with those of the author, by scaling all distance computations using the ratio pathLength / (computed value of path length).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pathLength} */
pathLength?: ValueSets['default'];
pattern?: ValueSets['default'];
/**
* The patternContentUnits attribute defines the coordinate system for the contents of the <pattern>. Note that this attribute has no effect if attribute viewBox is specified on the <pattern> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/patternContentUnits} */
patternContentUnits?: ValueSets['76'];
/**
* The patternTransform attribute contains the definition of an optional additional transformation from the pattern coordinate system onto the target coordinate system. This allows for things such as skewing the pattern tiles. This additional transformation matrix is post-multiplied to (i.e., inserted to the right of) any previously defined transformations, including the implicit transformation necessary to convert from object bounding box units to user space.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/patternTransform} */
patternTransform?: ValueSets['default'];
/**
* The patternUnits attribute defines the coordinate system for attributes x, y, width and height.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/patternUnits} */
patternUnits?: ValueSets['76'];
/**
* Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST "The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking. */
ping?: ValueSets['default'];
placeholder?: ValueSets['default'];
/**
* The pointer-events attribute allows authors to control whether or when an element may be the target of a mouse event. This attribute is used to specify under which circumstance (if any) a mouse event should go "through" an element and target whatever is "underneath" that element instead.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointer-events} */
["pointer-events"]?: ValueSets['65'];
/**
* The points attribute define a list of points required to draw a  <polyline> or <polygon> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points} */
points?: ValueSets['default'];
/**
* The pointsAtX attribute represent the X location in the coordinate system established by attribute primitiveUnits on the <filter> element of the point at which the light source is pointing.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointsAtX} */
pointsAtX?: ValueSets['default'];
/**
* The pointsAtY attribute represent the Y location in the coordinate system established by attribute primitiveUnits on the <filter> element of the point at which the light source is pointing.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointsAtY} */
pointsAtY?: ValueSets['default'];
/**
* The pointsAtZ attribute represent the Z location in the coordinate system established by attribute primitiveUnits on the <filter> element of the point at which the light source is pointing.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointsAtZ} */
pointsAtZ?: ValueSets['default'];
poster?: ValueSets['default'];
preload?: ValueSets['pl'];
/**
* the preserveAlpha attribute indicates how a <feconvolvematrix> element handled alpha transparency.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAlpha} */
preserveAlpha?: ValueSets['b'];
/**
* In some cases, typically when using the viewBox attribute, it is desirable that the graphics stretch to fit non-uniformly to take up the entire viewport. In other cases, it is desirable that uniform scaling be used for the purposes of preserving the aspect ratio of the graphics.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio} */
preserveAspectRatio?: ValueSets['82'];
/**
* The primitiveUnits attribute specifies the coordinate system for the various length values within the filter primitives and for the attributes that define the filter primitive subregion.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/primitiveUnits} */
primitiveUnits?: ValueSets['76'];
/**
* The URIs of one or more metadata profiles, separated by white space. */
profile?: ValueSets['default'];
/**
* For the <circle> this attribute defines the radius of the element. A value of zero disables rendering of the circle.
* 
*   For the <radialgradient> element, this attribute defines the radius of the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. A value of zero will cause the area to be painted as a single color using the color and opacity of the last gradient <stop>. If the attribute is not specified, the effect is as if a value of 50% were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/r} */
r?: ValueSets['default'];
/**
* The radius attribute represent the radius for the operation on a given <femorphology> filter primitive. If two <number>s are provided, the first number represents a x-radius and the second value represents a y-radius. If one number is provided, then that value is used for both X and Y. The values are in the coordinate system established by the primitiveUnits attribute on the <filter> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/radius} */
radius?: ValueSets['default'];
readonly?: ValueSets['v'];
/**
* A string indicating which referrer to use when fetching the resource:
* 
* *   `no-referrer` means that the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.
* *   `no-referrer-when-downgrade` means that no [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.
* *   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.
* *   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer's path.
* *   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins. */
referrerpolicy?: ValueSets['default'];
/**
* Defines the x coordinate for the reference point of the marker.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/refX} */
refX?: ValueSets['default'];
/**
* Defines the y coordinate for the reference point of the marker.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/refY} */
refY?: ValueSets['default'];
/**
* This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). */
rel?: ValueSets['default'];
/**
* This attribute indicates the number of time the animation will take place.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/repeatCount} */
repeatCount?: ValueSets['default'];
/**
* This attribute specifies the total duration for repeat.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/repeatDur} */
repeatDur?: ValueSets['48'];
required?: ValueSets['v'];
/**
* This attribute indicates when animation can or can not restart.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/restart} */
restart?: ValueSets['49'];
/**
* The result attribute defines the assigned name for this filter primitive. If supplied, then graphics that result from processing this filter primitive can be referenced by an in attribute on a subsequent filter primitive within the same <filter> element. If no value is provided, the output will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its in attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/result} */
result?: ValueSets['51'];
/**
* This Boolean attribute specifies that the items of the list are specified in reversed order. */
reversed?: ValueSets['v'];
/**
* The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
rightmargin?: ValueSets['default'];
role?: ValueSets['roles'];
/**
* defines a rotation applied to the element animated along a path, usually to make it pointing in the direction of the animation.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rotate} */
rotate?: ValueSets['default'];
/**
* The number of visible text lines for the control. */
rows?: ValueSets['default'];
rowspan?: ValueSets['default'];
/**
* The closing quote to enclose the content.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
rquote?: ValueSets['default'];
/**
* A `<length-percentage>` indicating the amount of space after the operator.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
rspace?: ValueSets['default'];
/**
* The radius of the ellipse on the x axis.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx} */
rx?: ValueSets['default'];
/**
* For the <circle> and the <ellipse> element, The radius of the ellipse on the y axis.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/ry} */
ry?: ValueSets['default'];
/**
* Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:
* 
* *   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.
* *   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).
* *   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).
* *   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).
* *   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.
* *   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.
* *   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).
* *   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy "same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.").
* *   `allow-scripts`: Lets the resource run scripts (but not create popup windows).
* *   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent's storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
* *   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).
* *   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.
* 
* **Notes about sandboxing:**
* 
* *   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.
* *   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.
* *   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier. */
sandbox?: ValueSets['sb'];
/**
* The scale attribute define the displacement scale factor to be used on a <fedisplacementmap> filter primitive. The amount is expressed in the coordinate system established by the primitiveUnits attribute on the <filter> element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/scale} */
scale?: ValueSets['default'];
/**
* This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) value, like a format.
* 
* **Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it. */
scheme?: ValueSets['default'];
scope?: ValueSets['s'];
scoped?: ValueSets['v'];
/**
* Specifies a math-depth for the element. See the scriptlevel page for accepted values and mapping.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
scriptlevel?: ValueSets['default'];
seamless?: ValueSets['v'];
/**
* The seed attribute represents the starting number for the pseudo random number generator of the <feTurbulence> primitive.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/seed} */
seed?: ValueSets['default'];
/**
* If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `<option>` of this [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element may have the `selected` attribute. */
selected?: ValueSets['v'];
/**
* A `<boolean>` indicating whether the operator is a separator (such as commas). There is no visual effect for this attribute.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
separator?: ValueSets['b'];
shape?: ValueSets['sh'];
/**
* The creator of SVG content might want to provide a hint about what tradeoffs to make as the browser renders <path> element or basic shapes. The shape-rendering attribute provides these hints.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering} */
["shape-rendering"]?: ValueSets['66'];
/**
* Sets the height, in pixels, of the rule. */
size?: ValueSets['default'];
/**
* This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:
* 
* *   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.
* *   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.
* 
* **Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it. */
sizes?: ValueSets['default'];
/**
* Assigns a slot in a [shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](https://developer.mozilla.org/docs/Web/HTML/Element/slot "The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.") element whose `[name](https://developer.mozilla.org/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot} */
slot?: ValueSets['default'];
sorted?: ValueSets['default'];
/**
* How space between glyphs should be handled.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spacing} */
spacing?: ValueSets['90'];
span?: ValueSets['default'];
/**
* The specularConstant attribute represents the ks value in the Phong lighting model. In SVG, this can be any non-negative number.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/specularConstant} */
specularConstant?: ValueSets['default'];
/**
* The specularExponent attribute controls the focus for the light source, a larger value indicate a more "shiny" light.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/specularExponent} */
specularExponent?: ValueSets['default'];
/**
* An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:
* 
* *   `true`, which indicates that the element should be, if possible, checked for spelling errors;
* *   `false`, which indicates that the element should not be checked for spelling errors.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck} */
spellcheck?: ValueSets['b'];
/**
* The spreadMethod attribute determines how a shape is filled beyond the defined edges of a gradient.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/spreadMethod} */
spreadMethod?: ValueSets['85'];
/**
* The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors. */
src?: ValueSets['default'];
/**
* Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute. */
srcdoc?: ValueSets['default'];
/**
* Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined. */
srclang?: ValueSets['default'];
/**
* A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:
* 
* 1.  a URL to an image,
* 2.  optionally, whitespace followed by one of:
*     *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.
*     *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.
* 
* If no descriptor is specified, the source is assigned the default descriptor: `1x`.
* 
* It is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.
* 
* The user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example. */
srcset?: ValueSets['default'];
/**
* A message that the browser can show while loading the object's implementation and data. */
standby?: ValueSets['default'];
/**
* This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.
* 
* **Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5. */
start?: ValueSets['default'];
/**
* The stdDeviation attribute defines the standard deviation for the blur operation. If two <number>s are provided, the first number represents a standard deviation value along the x-axis. The second value represents a standard deviation along the y-axis. If one number is provided, then that value is used for both X and Y.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stdDeviation} */
stdDeviation?: ValueSets['default'];
step?: ValueSets['default'];
/**
* The stitchTiles attribute defines how the Perlin tiles behave at the border.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stitchTiles} */
stitchTiles?: ValueSets['83'];
/**
* The stop-color attribute indicates what color to use at that gradient stop. The keyword currentColor and ICC colors can be specified in the same manner as within a <paint> specification for the fill and stroke attributes.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stop-color} */
["stop-color"]?: ValueSets['default'];
/**
* The stop-opacity attribute defines the opacity of a given gradient stop.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stop-opacity} */
["stop-opacity"]?: ValueSets['default'];
/**
* A `<boolean>` indicating whether the operator stretches to the size of the adjacent element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
stretchy?: ValueSets['b'];
/**
* The stroke attribute defines the color of the outline on a given graphical element. The default value for the stroke attribute is none.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke} */
stroke?: ValueSets['default'];
/**
* the stroke-dasharray attribute controls the pattern of dashes and gaps used to stroke paths.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} */
["stroke-dasharray"]?: ValueSets['default'];
/**
* the stroke-dashoffset attribute specifies the distance into the dash pattern to start the dash.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset} */
["stroke-dashoffset"]?: ValueSets['default'];
/**
* the stroke-linecap attribute specifies the shape to be used at the end of open subpaths when they are stroked.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap} */
["stroke-linecap"]?: ValueSets['67'];
/**
* the stroke-linejoin attribute specifies the shape to be used at the corners of paths or basic shapes when they are stroked.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin} */
["stroke-linejoin"]?: ValueSets['68'];
/**
* When two line segments meet at a sharp angle and miter joins have been specified for stroke-linejoin, it is possible for the miter to extend far beyond the thickness of the line stroking the path. The stroke-miterlimit imposes a limit on the ratio of the miter length to the stroke-width. When the limit is exceeded, the join is converted from a miter to a bevel.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit} */
["stroke-miterlimit"]?: ValueSets['default'];
/**
* the stroke-opacity attribute specifies the opacity of the outline on the current object. Its default value is 1.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-opacity} */
["stroke-opacity"]?: ValueSets['default'];
/**
* the stroke-width attribute specifies the width of the outline on the current object. Its default value is 1. If a <percentage> is used, the value represents a percentage of the current viewport. If a value of 0 is used the outline will never be drawn.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width} */
["stroke-width"]?: ValueSets['default'];
/**
* Contains [CSS](https://developer.mozilla.org/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](https://developer.mozilla.org/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style} */
style?: ValueSets['style'];
/**
* The surfaceScale attribute represent the height of the surface for a light filter primitive. If the attribute is not specified, then the effect is as if a value of 1 were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/surfaceScale} */
surfaceScale?: ValueSets['default'];
/**
* A `<boolean>` indicating whether a stretchy operator should be vertically symmetric around the imaginary math axis (centered fraction line).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
symmetric?: ValueSets['b'];
/**
* represents a list of supported language tags. This list is matched against the language defined in the user preferences.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/systemLanguage} */
systemLanguage?: ValueSets['default'];
/**
* An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:
* 
* *   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
* *   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
* *   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex} */
tabindex?: ValueSets['default'];
/**
* Defines a list of numbers defining a lookup table of values for a color component transfer function.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/tableValues} */
tableValues?: ValueSets['default'];
/**
* A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:
* 
* *   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.
* *   `_blank`: Load the result into a new unnamed browsing context.
* *   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
* *   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.
* 
* If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. */
target?: ValueSets['target'];
/**
* The targetX attribute determines the positioning in X of the convolution matrix relative to a given target pixel in the input image. The leftmost column of the matrix is column number zero. The value must be such that: 0 <= targetX < orderX. By default, the convolution matrix is centered in X over each pixel of the input image (i.e., targetX = floor ( orderX / 2 )).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/targetX} */
targetX?: ValueSets['default'];
/**
* The targetY attribute determines the positioning in Y of the convolution matrix relative to a given target pixel in the input image. The leftmost column of the matrix is column number zero. The value must be such that: 0 <= targetX < orderX. By default, the convolution matrix is centered in X over each pixel of the input image (i.e., targetX = floor ( orderX / 2 )).
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/targetY} */
targetY?: ValueSets['default'];
/**
* Foreground color of text. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property on the element instead._ */
text?: ValueSets['default'];
/**
* The text-anchor attribute is used to align (start-, middle- or end-alignment) a string of text relative to a given point.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor} */
["text-anchor"]?: ValueSets['69'];
/**
* The text-decoration attribute works exactly like the css text decoration property except that it's an attribute. See css text decoration for further information.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-decoration} */
["text-decoration"]?: ValueSets['70'];
/**
* The creator of SVG content might want to provide a hint about what tradeoffs to make as the browser renders text. The text-rendering attribute provides these hints.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-rendering} */
["text-rendering"]?: ValueSets['71'];
/**
* A width that the text should be scaled to fit.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/textLength} */
textLength?: ValueSets['default'];
/**
* Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title} */
title?: ValueSets['default'];
/**
* This attribute indicates the final value of the attribute that will be modified during the animation. The value of the attribute will change between the from attribute value and this value. By default the change will be linear.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/to} */
to?: ValueSets['default'];
/**
* The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._ */
topmargin?: ValueSets['default'];
/**
* The transform attribute defines a list of transform definitions that are applied to an element and the element's children. The items in the transform list are separated by whitespace and/or commas, and are applied from right to left.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform} */
transform?: ValueSets['default'];
/**
* An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](https://developer.mozilla.org/docs/Web/API/Text "The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:
* 
* *   empty string and `yes`, which indicates that the element will be translated.
* *   `no`, which indicates that the element will not be translated.
* 
* [MDN Reference] {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate} */
translate?: ValueSets['y'];
/**
* This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports. */
type?: ValueSets['default'];
/**
* This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used. */
typemustmatch?: ValueSets['v'];
/**
* The partial URL (starting with '#') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.
* 
* **Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") element. */
usemap?: ValueSets['default'];
/**
* This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).
* 
* **Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.
* 
* **Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed. */
value?: ValueSets['default'];
/**
* Has different meanings, depending upon the context where it's used, either it defines a sequence of values used over the course of an animation, or it's a list of numbers for a color matrix, which is interpreted differently depending on the type of color change to be performed.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/values} */
values?: ValueSets['default'];
/**
* Specifies the type of the `value` attribute. Possible values are:
* 
* *   data: Default value. The value is passed to the object's implementation as a string.
* *   ref: The value is a URI to a resource where run-time values are stored.
* *   object: An ID of another [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document. */
valuetype?: ValueSets['default'];
/**
* The vector-effect property specifies the vector effect to use when drawing an object. Vector effects are applied before any of the other compositing operations, i.e. filters, masks and clips.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect} */
["vector-effect"]?: ValueSets['72'];
/**
* Specifies the version of the HTML [Document Type Definition](https://developer.mozilla.org/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the "<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration. */
version?: ValueSets['default'];
/**
* The viewBox attribute allows you to specify that a given set of graphics stretch to fit a particular container element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox} */
viewBox?: ValueSets['default'];
/**
* Depending on the value of attribute pointer-events, graphics elements which have their visibility attribute set to hidden still might receive events.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/visibility} */
visibility?: ValueSets['73'];
/**
* Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._ */
vlink?: ValueSets['default'];
/**
* A `<length-percentage>` indicating the vertical location of the positioning point of the child content with respect to the positioning point of the element.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute} */
voffset?: ValueSets['default'];
/**
* Sets the length of the rule on the page through a pixel or percentage value. */
width?: ValueSets['default'];
/**
* The word-spacing attribute specifies spacing behavior between words.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/word-spacing} */
["word-spacing"]?: ValueSets['default'];
/**
* Is a _hint_ indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space "The white-space CSS property sets how white space inside an element is handled.") instead. */
wrap?: ValueSets['default'];
/**
* The writing-mode attribute specifies whether the initial inline-progression-direction for a <text> element shall be left-to-right, right-to-left, or top-to-bottom. The writing-mode attribute applies only to <text> elements; the attribute is ignored for <tspan>, <tref>, <altGlyph> and <textPath> sub-elements. (Note that the inline-progression-direction can change within a <text> element due to the Unicode bidirectional algorithm and properties direction and unicode-bidi.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/writing-mode} */
["writing-mode"]?: ValueSets['74'];
/**
* This attribute indicates an x-axis coordinate in the user coordinate system. The exact effect of this coordinate depend on each element. Most of the time, it represent the x-axis coordinate of the upper-left corner of the rectangular region of the reference element (see each individual element's documentation for exceptions).Its syntax is the same as that for <length>
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x} */
x?: ValueSets['default'];
/**
* Define the 1 x-axis coordinate
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x1} */
x1?: ValueSets['default'];
/**
* Define the 2 x-axis coordinate
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x2} */
x2?: ValueSets['default'];
/**
* For a <fedisplacementmap> filter primitive, The xChannelSelector attribute indicates which channel from in2 to use to displace the pixels in in along the x-axis. If attribute xChannelSelector is not specified, then the effect is as if a value of A were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xChannelSelector} */
xChannelSelector?: ValueSets['81'];
/**
* Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents. */
xmlns?: ValueSets['default'];
/**
* This attribute indicates an y-axis coordinate in the user coordinate system. The exact effect of this coordinate depend on each element. Most of the time, it represent the x-axis coordinate of the upper-left corner of the rectangular region of the reference element (see each individual element's documentation for exceptions).Its syntax is the same as that for <length>
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y} */
y?: ValueSets['default'];
/**
* Define the 1 y-axis coordinate
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y1} */
y1?: ValueSets['default'];
/**
* Define the 2 y-axis coordinate
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y2} */
y2?: ValueSets['default'];
/**
* For a <fedisplacementmap> filter primitive, The xChannelSelector attribute indicates which channel from in2 to use to displace the pixels in in along the y-axis. If attribute yChannelSelector is not specified, then the effect is as if a value of A were specified.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/yChannelSelector} */
yChannelSelector?: ValueSets['81'];
/**
* The z attribute difine the location along the Z-axis for a light source in the coordinate system established by the primitiveUnits attribute on the <filter> element, assuming that, in the initial coordinate system, the positive Z-axis comes out towards the person viewing the content and assuming that one unit along the Z-axis equals on unit in X and Z.
* 
* [MDN Reference] {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/z} */
z?: ValueSets['default'];
    }