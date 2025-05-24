import type { TypedOnErrorEventHandler } from "./TypedEventHandlers/TypedOnErrorEventHandler";
import type {
  TypedAnimationEvent,
  TypedDragEvent,
  TypedEvent,
  TypedFocusEvent,
  TypedFormDataEvent,
  TypedMouseEvent,
  TypedKeyboardEvent,
  TypedPointerEvent,
  TypedProgressEvent,
  TypedSubmitEvent,
  TypedTouchEvent,
  TypedTransitionEvent,
  TypedWheelEvent,
  TypedUIEvent,
  TypedSecurityPolicyViolationEvent,
  TypedClipboardEvent,
} from "./TypedEvents";
import type { TypedInputEvent } from "./TypedEvents/TypedInputEvent";
import type { TypedBeforeUnloadEvent } from "./TypedEvents/TypedBeforeUnloadEvent";
import type { TypedMessageEvent } from "./TypedEvents/TypedMessageEvent";
import type { TypedPageTransitionEvent } from "./TypedEvents/TypedPageTransitionEvent";
import type { TypedPopStateEvent } from "./TypedEvents/TypedPopStateEvent";
import type { TypedPromiseRejectionEvent } from "./TypedEvents/TypedPromiseRejectionEvent";
import type { TypedStorageEvent } from "./TypedEvents/TypedStorageEvent";
export interface AllEvents<T extends EventTarget> {
  /**
  The loading of a resource has been aborted.
  */
  onabort?(ev: TypedUIEvent<T>): unknown;
  /**
  Function to call after the user has printed the document.
  */
  onafterprint?(ev: TypedEvent<T>): unknown;
  onanimationcancel?(ev: TypedAnimationEvent<T>): unknown;
  onanimationend?(ev: TypedAnimationEvent<T>): unknown;
  onanimationiteration?(ev: TypedAnimationEvent<T>): unknown;
  onanimationstart?(ev: TypedAnimationEvent<T>): unknown;
  onauxclick?(ev: TypedMouseEvent<T>): unknown;
  onbeforeinput?(ev: TypedInputEvent<T>): unknown;
  /**
  Function to call when the user requests printing of the document.
  */
  onbeforeprint?(ev: TypedEvent<T>): unknown;
  /**
  Function to call when the document is about to be unloaded.
  */
  onbeforeunload?(ev: TypedBeforeUnloadEvent<T>): unknown;
  /**
  An element has lost focus (does not bubble).
  */
  onblur?(ev: TypedFocusEvent<T>): unknown;
  oncancel?(ev: TypedFocusEvent<T>): unknown;
  /**
  The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
  */
  oncanplay?(ev: TypedEvent<T>): unknown;
  /**
  The user agent can play the media up to its end without having to stop for further buffering of content.
  */
  oncanplaythrough?(ev: TypedEvent<T>): unknown;
  /**
  The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user.
  */
  onchange?(ev: TypedEvent<T>): unknown;
  /**
  A pointing device button has been pressed and released on an element.
  */
  onclick?(ev: TypedMouseEvent<T>): unknown;
  onclose?(ev: TypedEvent<T>): unknown;
  /**
  The right button of the mouse is clicked (before the context menu is displayed).
  */
  oncontextmenu?(ev: TypedMouseEvent<T>): unknown;
  oncopy?(ev: TypedClipboardEvent<T>): unknown;
  oncuechange?(ev: TypedEvent<T>): unknown;
  oncut?(ev: TypedClipboardEvent<T>): unknown;
  /**
  A pointing device button is clicked twice on an element.
  */
  ondblclick?(ev: TypedMouseEvent<T>): unknown;
  /**
  An element or text selection is being dragged (every 350ms).
  */
  ondrag?(ev: TypedDragEvent<T>): unknown;
  /**
  A drag operation is being ended (by releasing a mouse button or hitting the escape key).
  */
  ondragend?(ev: TypedDragEvent<T>): unknown;
  /**
  A dragged element or text selection enters a valid drop target.
  */
  ondragenter?(ev: TypedDragEvent<T>): unknown;
  /**
  A dragged element or text selection leaves a valid drop target.
  */
  ondragleave?(ev: TypedDragEvent<T>): unknown;
  /**
  An element or text selection is being dragged over a valid drop target (every 350ms).
  */
  ondragover?(ev: TypedDragEvent<T>): unknown;
  /**
  The user starts dragging an element or text selection.
  */
  ondragstart?(ev: TypedDragEvent<T>): unknown;
  /**
  An element is dropped on a valid drop target.
  */
  ondrop?(ev: TypedDragEvent<T>): unknown;
  /**
  The duration attribute has been updated.
  */
  ondurationchange?(ev: TypedEvent<T>): unknown;
  /**
  The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.
  */
  onemptied?(ev: TypedEvent<T>): unknown;
  /**
  Playback has stopped because the end of the media was reached.
  */
  onended?(ev: TypedEvent<T>): unknown;
  onenterpictureinpicture?(ev: TypedEvent<T>): unknown;
  /**
  A resource failed to load.
  */
  onerror?: TypedOnErrorEventHandler<T>;
  /**
  An element has received focus (does not bubble).
  */
  onfocus?(ev: TypedFocusEvent<T>): unknown;
  onformdata?(ev: TypedFormDataEvent<T>): unknown;
  onfullscreenchange?(ev: TypedEvent<T>): unknown;
  onfullscreenerror?(ev: TypedEvent<T>): unknown;
  ongamepadconnected?(ev: TypedEvent<T>): unknown;
  ongamepaddisconnected?(ev: TypedEvent<T>): unknown;
  ongotpointercapture?(ev: TypedPointerEvent<T>): unknown;
  /**
  Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed.
  */
  onhashchange?(ev: TypedEvent<T>): unknown;
  /**
  The value of an element changes or the content of an element with the attribute contenteditable is modified.
  */
  oninput?(ev: TypedEvent<T>): unknown;
  /**
  A submittable element has been checked and doesn't satisfy its constraints.
  */
  oninvalid?(ev: TypedEvent<T>): unknown;
  /**
  A key is pressed down.
  */
  onkeydown?(ev: TypedKeyboardEvent<T>): unknown;
  /**
  A key is pressed down and that key normally produces a character value (use input instead).
  */
  onkeypress?(ev: TypedKeyboardEvent<T>): unknown;
  /**
  A key is released.
  */
  onkeyup?(ev: TypedKeyboardEvent<T>): unknown;
  /**
  Function to call when the preferred languages changed.
  */
  onlanguagechange?(ev: TypedEvent<T>): unknown;
  onleavepictureinpicture?(ev: TypedEvent<T>): unknown;
  /**
  A resource and its dependent resources have finished loading.
  */
  onload?(ev: TypedEvent<T>): unknown;
  /**
  The first frame of the media has finished loading.
  */
  onloadeddata?(ev: TypedEvent<T>): unknown;
  /**
  The metadata has been loaded.
  */
  onloadedmetadata?(ev: TypedEvent<T>): unknown;
  /**
  Progress has begun.
  */
  onloadstart?(ev: TypedEvent<T>): unknown;
  onlostpointercapture?(ev: TypedPointerEvent<T>): unknown;
  /**
  A pointing device button (usually a mouse) is pressed on an element.
  */
  onmousedown?(ev: TypedMouseEvent<T>): unknown;
  /**
  A pointing device is moved onto the element that has the listener attached.
  */
  onmouseenter?(ev: TypedMouseEvent<T>): unknown;
  /**
  A pointing device is moved off the element that has the listener attached.
  */
  onmouseleave?(ev: TypedMouseEvent<T>): unknown;
  /**
  Function to call when the document has received a message.
  */
  onmessage?(ev: TypedMessageEvent<T>): unknown;
  onmessageerror?(ev: TypedMessageEvent<T>): unknown;
  /**
  A pointing device is moved over an element.
  */
  onmousemove?(ev: TypedMouseEvent<T>): unknown;
  /**
  A pointing device is moved off the element that has the listener attached or off one of its children.
  */
  onmouseout?(ev: TypedMouseEvent<T>): unknown;
  /**
  A pointing device is moved onto the element that has the listener attached or onto one of its children.
  */
  onmouseover?(ev: TypedMouseEvent<T>): unknown;
  /**
  A pointing device button is released over an element.
  */
  onmouseup?(ev: TypedMouseEvent<T>): unknown;
  /**
  Function to call when network communication has failed.
  */
  onoffline?(ev: TypedEvent<T>): unknown;
  /**
  Function to call when network communication has been restored.
  */
  ononline?(ev: TypedEvent<T>): unknown;
  onpagehide?(ev: TypedPageTransitionEvent<T>): unknown;
  onpageshow?(ev: TypedPageTransitionEvent<T>): unknown;
  onpaste?(ev: TypedClipboardEvent<T>): unknown;
  /**
  Playback has been paused.
  */
  onpause?(ev: TypedEvent<T>): unknown;
  /**
  Playback has begun.
  */
  onplay?(ev: TypedEvent<T>): unknown;
  /**
  Playback is ready to start after having been paused or delayed due to lack of data.
  */
  onplaying?(ev: TypedEvent<T>): unknown;
  /**
  The pointer is unlikely to produce any more events.
  */
  onpointercancel?(ev: TypedPointerEvent<T>): unknown;
  /**
  The pointer enters the active buttons state.
  */
  onpointerdown?(ev: TypedPointerEvent<T>): unknown;
  /**
  Pointing device is moved inside the hit-testing boundary.
  */
  onpointerenter?(ev: TypedPointerEvent<T>): unknown;
  /**
  Pointing device is moved out of the hit-testing boundary.
  */
  onpointerleave?(ev: TypedPointerEvent<T>): unknown;
  /**
  The pointer changed coordinates.
  */
  onpointermove?(ev: TypedPointerEvent<T>): unknown;
  /**
  The pointing device moved out of hit-testing boundary or leaves detectable hover range.
  */
  onpointerout?(ev: TypedPointerEvent<T>): unknown;
  /**
  The pointing device is moved into the hit-testing boundary.
  */
  onpointerover?(ev: TypedPointerEvent<T>): unknown;
  /**
  The pointer leaves the active buttons state.
  */
  onpointerup?(ev: TypedPointerEvent<T>): unknown;
  /**
  Function to call when the user has navigated session history.
  */
  onpopstate?(ev: TypedPopStateEvent<T>): unknown;
  /**
  In progress.
  */
  onprogress?(ev: TypedProgressEvent<T>): unknown;
  /**
  The playback rate has changed.
  */
  onratechange?(ev: TypedEvent<T>): unknown;
  /**
  Function to call when the user has moved forward in undo transaction history.
  */
  onredo?(ev: TypedEvent<T>): unknown;
  onrejectionhandled?(ev: TypedPromiseRejectionEvent<T>): unknown;
  /**
  A form is reset.
  */
  onreset?(ev: TypedEvent<T>): unknown;
  /**
  The document view has been resized.
  */
  onresize?(ev: TypedUIEvent<T>): unknown;
  /**
  The document view or an element has been scrolled.
  */
  onscroll?(ev: TypedEvent<T>): unknown;
  onsecuritypolicyviolation?(ev: TypedSecurityPolicyViolationEvent<T>): unknown;
  /**
  A seek operation completed.
  */
  onseeked?(ev: TypedEvent<T>): unknown;
  /**
  A seek operation began.
  */
  onseeking?(ev: TypedEvent<T>): unknown;
  /**
  Some text is being selected.
  */
  onselect?(ev: TypedEvent<T>): unknown;
  onselectionchange?(ev: TypedEvent<T>): unknown;
  onselectstart?(ev: TypedEvent<T>): unknown;
  /**
  A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute
  */
  onshow?(ev: TypedEvent<T>): unknown;
  onslotchange?(ev: TypedEvent<T>): unknown;
  /**
  The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
  */
  onstalled?(ev: TypedEvent<T>): unknown;
  /**
  Function to call when the storage area has changed.
  */
  onstorage?(ev: TypedStorageEvent<T>): unknown;
  /**
  A form is submitted.
  */
  onsubmit?(ev: TypedSubmitEvent<T>): unknown;
  /**
  Media data loading has been suspended.
  */
  onsuspend?(ev: TypedEvent<T>): unknown;
  /**
  The time indicated by the currentTime attribute has been updated.
  */
  ontimeupdate?(ev: TypedEvent<T>): unknown;
  ontoggle?(ev: TypedEvent<T>): unknown;
  ontouchcancel?(ev: TypedTouchEvent<T>): unknown;
  ontouchend?(ev: TypedTouchEvent<T>): unknown;
  ontouchmove?(ev: TypedTouchEvent<T>): unknown;
  ontouchstart?(ev: TypedTouchEvent<T>): unknown;
  ontransitioncancel?(ev: TypedTransitionEvent<T>): unknown;
  ontransitionend?(ev: TypedTransitionEvent<T>): unknown;
  ontransitionrun?(ev: TypedTransitionEvent<T>): unknown;
  ontransitionstart?(ev: TypedTransitionEvent<T>): unknown;
  onunhandledrejection?(ev: TypedPromiseRejectionEvent<T>): unknown;
  /**
  Function to call when the user has moved backward in undo transaction history.
  */
  onundo?(ev: TypedEvent<T>): unknown;
  /**
  Function to call when the document is going away.
  */
  onunload?(ev: TypedEvent<T>): unknown;
  /**
  The volume has changed.
  */
  onvolumechange?(ev: TypedEvent<T>): unknown;
  /**
  Playback has stopped because of a temporary lack of data.
  */
  onwaiting?(ev: TypedEvent<T>): unknown;
  onwebkitanimationend?(ev: TypedEvent<T>): unknown;
  onwebkitanimationiteration?(ev: TypedEvent<T>): unknown;
  onwebkitanimationstart?(ev: TypedEvent<T>): unknown;
  onwebkittransitionend?(ev: TypedEvent<T>): unknown;
  onwheel?(ev: TypedWheelEvent<T>): unknown;
}
