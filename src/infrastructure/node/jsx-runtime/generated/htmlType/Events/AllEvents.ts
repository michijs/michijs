export interface AllEvents<T extends EventTarget> {
    /**
    The loading of a resource has been aborted.
    */
    onabort?: string;
    /**
    Function to call after the user has printed the document.
    */
    onafterprint?: string;
    onanimationcancel?: string;
    onanimationend?: string;
    onanimationiteration?: string;
    onanimationstart?: string;
    onauxclick?: string;
    onbeforeinput?: string;
    /**
    Function to call when the user requests printing of the document.
    */
    onbeforeprint?: string;
    /**
    Function to call when the document is about to be unloaded.
    */
    onbeforeunload?: string;
    /**
    An element has lost focus (does not bubble).
    */
    onblur?: string;
    oncancel?: string;
    /**
    The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
    */
    oncanplay?: string;
    /**
    The user agent can play the media up to its end without having to stop for further buffering of content.
    */
    oncanplaythrough?: string;
    /**
    The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user.
    */
    onchange?: string;
    /**
    A pointing device button has been pressed and released on an element.
    */
    onclick?: string;
    onclose?: string;
    /**
    The right button of the mouse is clicked (before the context menu is displayed).
    */
    oncontextmenu?: string;
    oncopy?: string;
    oncuechange?: string;
    oncut?: string;
    /**
    A pointing device button is clicked twice on an element.
    */
    ondblclick?: string;
    /**
    An element or text selection is being dragged (every 350ms).
    */
    ondrag?: string;
    /**
    A drag operation is being ended (by releasing a mouse button or hitting the escape key).
    */
    ondragend?: string;
    /**
    A dragged element or text selection enters a valid drop target.
    */
    ondragenter?: string;
    /**
    A dragged element or text selection leaves a valid drop target.
    */
    ondragleave?: string;
    /**
    An element or text selection is being dragged over a valid drop target (every 350ms).
    */
    ondragover?: string;
    /**
    The user starts dragging an element or text selection.
    */
    ondragstart?: string;
    /**
    An element is dropped on a valid drop target.
    */
    ondrop?: string;
    /**
    The duration attribute has been updated.
    */
    ondurationchange?: string;
    /**
    The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.
    */
    onemptied?: string;
    /**
    Playback has stopped because the end of the media was reached.
    */
    onended?: string;
    onenterpictureinpicture?: string;
    /**
    A resource failed to load.
    */
    onerror?: string;
    /**
    An element has received focus (does not bubble).
    */
    onfocus?: string;
    onformdata?: string;
    onfullscreenchange?: string;
    onfullscreenerror?: string;
    ongamepadconnected?: string;
    ongamepaddisconnected?: string;
    ongotpointercapture?: string;
    /**
    Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed.
    */
    onhashchange?: string;
    /**
    The value of an element changes or the content of an element with the attribute contenteditable is modified.
    */
    oninput?: string;
    /**
    A submittable element has been checked and doesn't satisfy its constraints.
    */
    oninvalid?: string;
    /**
    A key is pressed down.
    */
    onkeydown?: string;
    /**
    A key is pressed down and that key normally produces a character value (use input instead).
    */
    onkeypress?: string;
    /**
    A key is released.
    */
    onkeyup?: string;
    /**
    Function to call when the preferred languages changed.
    */
    onlanguagechange?: string;
    onleavepictureinpicture?: string;
    /**
    A resource and its dependent resources have finished loading.
    */
    onload?: string;
    /**
    The first frame of the media has finished loading.
    */
    onloadeddata?: string;
    /**
    The metadata has been loaded.
    */
    onloadedmetadata?: string;
    /**
    Progress has begun.
    */
    onloadstart?: string;
    onlostpointercapture?: string;
    /**
    A pointing device button (usually a mouse) is pressed on an element.
    */
    onmousedown?: string;
    /**
    A pointing device is moved onto the element that has the listener attached.
    */
    onmouseenter?: string;
    /**
    A pointing device is moved off the element that has the listener attached.
    */
    onmouseleave?: string;
    /**
    Function to call when the document has received a message.
    */
    onmessage?: string;
    onmessageerror?: string;
    /**
    A pointing device is moved over an element.
    */
    onmousemove?: string;
    /**
    A pointing device is moved off the element that has the listener attached or off one of its children.
    */
    onmouseout?: string;
    /**
    A pointing device is moved onto the element that has the listener attached or onto one of its children.
    */
    onmouseover?: string;
    /**
    A pointing device button is released over an element.
    */
    onmouseup?: string;
    /**
    Function to call when network communication has failed.
    */
    onoffline?: string;
    /**
    Function to call when network communication has been restored.
    */
    ononline?: string;
    onpagehide?: string;
    onpageshow?: string;
    onpaste?: string;
    /**
    Playback has been paused.
    */
    onpause?: string;
    /**
    Playback has begun.
    */
    onplay?: string;
    /**
    Playback is ready to start after having been paused or delayed due to lack of data.
    */
    onplaying?: string;
    /**
    The pointer is unlikely to produce any more events.
    */
    onpointercancel?: string;
    /**
    The pointer enters the active buttons state.
    */
    onpointerdown?: string;
    /**
    Pointing device is moved inside the hit-testing boundary.
    */
    onpointerenter?: string;
    /**
    Pointing device is moved out of the hit-testing boundary.
    */
    onpointerleave?: string;
    /**
    The pointer changed coordinates.
    */
    onpointermove?: string;
    /**
    The pointing device moved out of hit-testing boundary or leaves detectable hover range.
    */
    onpointerout?: string;
    /**
    The pointing device is moved into the hit-testing boundary.
    */
    onpointerover?: string;
    /**
    The pointer leaves the active buttons state.
    */
    onpointerup?: string;
    /**
    Function to call when the user has navigated session history.
    */
    onpopstate?: string;
    /**
    In progress.
    */
    onprogress?: string;
    /**
    The playback rate has changed.
    */
    onratechange?: string;
    /**
    Function to call when the user has moved forward in undo transaction history.
    */
    onredo?: string;
    onrejectionhandled?: string;
    /**
    A form is reset.
    */
    onreset?: string;
    /**
    The document view has been resized.
    */
    onresize?: string;
    /**
    The document view or an element has been scrolled.
    */
    onscroll?: string;
    onsecuritypolicyviolation?: string;
    /**
    A seek operation completed.
    */
    onseeked?: string;
    /**
    A seek operation began.
    */
    onseeking?: string;
    /**
    Some text is being selected.
    */
    onselect?: string;
    onselectionchange?: string;
    onselectstart?: string;
    /**
    A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute
    */
    onshow?: string;
    onslotchange?: string;
    /**
    The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
    */
    onstalled?: string;
    /**
    Function to call when the storage area has changed.
    */
    onstorage?: string;
    /**
    A form is submitted.
    */
    onsubmit?: string;
    /**
    Media data loading has been suspended.
    */
    onsuspend?: string;
    /**
    The time indicated by the currentTime attribute has been updated.
    */
    ontimeupdate?: string;
    ontoggle?: string;
    ontouchcancel?: string;
    ontouchend?: string;
    ontouchmove?: string;
    ontouchstart?: string;
    ontransitioncancel?: string;
    ontransitionend?: string;
    ontransitionrun?: string;
    ontransitionstart?: string;
    onunhandledrejection?: string;
    /**
    Function to call when the user has moved backward in undo transaction history.
    */
    onundo?: string;
    /**
    Function to call when the document is going away.
    */
    onunload?: string;
    /**
    The volume has changed.
    */
    onvolumechange?: string;
    /**
    Playback has stopped because of a temporary lack of data.
    */
    onwaiting?: string;
    onwebkitanimationend?: string;
    onwebkitanimationiteration?: string;
    onwebkitanimationstart?: string;
    onwebkittransitionend?: string;
    onwheel?: string;
}
