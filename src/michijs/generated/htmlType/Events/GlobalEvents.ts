import { TypedOnErrorEventHandler } from "./TypedEventHandlers/TypedOnErrorEventHandler";
import { TypedAnimationEvent, TypedDragEvent, TypedEvent, TypedFocusEvent, TypedFormDataEvent, TypedMouseEvent, TypedKeyboardEvent, TypedPointerEvent, TypedProgressEvent, TypedSubmitEvent, TypedTouchEvent, TypedTransitionEvent, TypedWheelEvent, TypedUIEvent, TypedSecurityPolicyViolationEvent } from "./TypedEvents";
import { TypedInputEvent } from "./TypedEvents/TypedInputEvent";
export interface GlobalEvents<T extends EventTarget> {
    /**
     * Fires when the user aborts the download.
     * @param ev The event.
     */
    onabort?(ev: TypedUIEvent<T>): unknown;
    onanimationcancel?(ev: TypedAnimationEvent<T>): unknown;
    onanimationend?(ev: TypedAnimationEvent<T>): unknown;
    onanimationiteration?(ev: TypedAnimationEvent<T>): unknown;
    onanimationstart?(ev: TypedAnimationEvent<T>): unknown;
    onauxclick?(ev: TypedMouseEvent<T>): unknown;
    onbeforeinput?(ev: TypedInputEvent<T>): unknown;
    /**
     * Fires when the object loses the input focus.
     * @param ev The focus event.
     */
    onblur?(ev: TypedFocusEvent<T>): unknown;
    oncancel?(ev: TypedFocusEvent<T>): unknown;
    /**
     * Occurs when playback is possible, but would require further buffering.
     * @param ev The event.
     */
    oncanplay?(ev: TypedEvent<T>): unknown;
    oncanplaythrough?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the contents of the object or selection have changed.
     * @param ev The event.
     */
    onchange?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the user clicks the left mouse button on the object
     * @param ev The mouse event.
     */
    onclick?(ev: TypedMouseEvent<T>): unknown;
    onclose?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the user clicks the right mouse button in the client area, opening the context menu.
     * @param ev The mouse event.
     */
    oncontextmenu?(ev: TypedMouseEvent<T>): unknown;
    oncuechange?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the user double-clicks the object.
     * @param ev The mouse event.
     */
    ondblclick?(ev: TypedMouseEvent<T>): unknown;
    /**
     * Fires on the source object continuously during a drag operation.
     * @param ev The event.
     */
    ondrag?(ev: TypedDragEvent<T>): unknown;
    /**
     * Fires on the source object when the user releases the mouse at the close of a drag operation.
     * @param ev The event.
     */
    ondragend?(ev: TypedDragEvent<T>): unknown;
    /**
     * Fires on the target element when the user drags the object to a valid drop target.
     * @param ev The drag event.
     */
    ondragenter?(ev: TypedDragEvent<T>): unknown;
    /**
     * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
     * @param ev The drag event.
     */
    ondragleave?(ev: TypedDragEvent<T>): unknown;
    /**
     * Fires on the target element continuously while the user drags the object over a valid drop target.
     * @param ev The event.
     */
    ondragover?(ev: TypedDragEvent<T>): unknown;
    /**
     * Fires on the source object when the user starts to drag a text selection or selected object.
     * @param ev The event.
     */
    ondragstart?(ev: TypedDragEvent<T>): unknown;
    ondrop?(ev: TypedDragEvent<T>): unknown;
    /**
     * Occurs when the duration attribute is updated.
     * @param ev The event.
     */
    ondurationchange?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the media element is reset to its initial state.
     * @param ev The event.
     */
    onemptied?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the end of playback is reached.
     * @param ev The event
     */
    onended?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when an error occurs during object loading.
     * @param ev The event.
     */
    onerror?: TypedOnErrorEventHandler<T>;
    /**
     * Fires when the object receives focus.
     * @param ev The event.
     */
    onfocus?(ev: TypedFocusEvent<T>): unknown;
    onformdata?(ev: TypedFormDataEvent<T>): unknown;
    ongotpointercapture?(ev: TypedPointerEvent<T>): unknown;
    oninput?(ev: TypedEvent<T>): unknown;
    oninvalid?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the user presses a key.
     * @param ev The keyboard event
     */
    onkeydown?(ev: TypedKeyboardEvent<T>): unknown;
    /**
     * Fires when the user presses an alphanumeric key.
     * @param ev The event.
     * @deprecated
     */
    onkeypress?(ev: TypedKeyboardEvent<T>): unknown;
    /**
     * Fires when the user releases a key.
     * @param ev The keyboard event
     */
    onkeyup?(ev: TypedKeyboardEvent<T>): unknown;
    /**
     * Fires immediately after the browser loads the object.
     * @param ev The event.
     */
    onload?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when media data is loaded at the current playback position.
     * @param ev The event.
     */
    onloadeddata?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the duration and dimensions of the media have been determined.
     * @param ev The event.
     */
    onloadedmetadata?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when Internet Explorer begins looking for media data.
     * @param ev The event.
     */
    onloadstart?(ev: TypedEvent<T>): unknown;
    onlostpointercapture?(ev: TypedPointerEvent<T>): unknown;
    /**
     * Fires when the user clicks the object with either mouse button.
     * @param ev The mouse event.
     */
    onmousedown?(ev: TypedMouseEvent<T>): unknown;
    onmouseenter?(ev: TypedMouseEvent<T>): unknown;
    onmouseleave?(ev: TypedMouseEvent<T>): unknown;
    /**
     * Fires when the user moves the mouse over the object.
     * @param ev The mouse event.
     */
    onmousemove?(ev: TypedMouseEvent<T>): unknown;
    /**
     * Fires when the user moves the mouse pointer outside the boundaries of the object.
     * @param ev The mouse event.
     */
    onmouseout?(ev: TypedMouseEvent<T>): unknown;
    /**
     * Fires when the user moves the mouse pointer into the object.
     * @param ev The mouse event.
     */
    onmouseover?(ev: TypedMouseEvent<T>): unknown;
    /**
     * Fires when the user releases a mouse button while the mouse is over the object.
     * @param ev The mouse event.
     */
    onmouseup?(ev: TypedMouseEvent<T>): unknown;
    /**
     * Occurs when playback is paused.
     * @param ev The event.
     */
    onpause?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the play method is requested.
     * @param ev The event.
     */
    onplay?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the audio or video has started playing.
     * @param ev The event.
     */
    onplaying?(ev: TypedEvent<T>): unknown;
    onpointercancel?(ev: TypedPointerEvent<T>): unknown;
    onpointerdown?(ev: TypedPointerEvent<T>): unknown;
    onpointerenter?(ev: TypedPointerEvent<T>): unknown;
    onpointerleave?(ev: TypedPointerEvent<T>): unknown;
    onpointermove?(ev: TypedPointerEvent<T>): unknown;
    onpointerout?(ev: TypedPointerEvent<T>): unknown;
    onpointerover?(ev: TypedPointerEvent<T>): unknown;
    onpointerup?(ev: TypedPointerEvent<T>): unknown;
    /**
     * Occurs to indicate progress while downloading media data.
     * @param ev The event.
     */
    onprogress?(ev: TypedProgressEvent<T>): unknown;
    /**
     * Occurs when the playback rate is increased or decreased.
     * @param ev The event.
     */
    onratechange?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the user resets a form.
     * @param ev The event.
     */
    onreset?(ev: TypedEvent<T>): unknown;
    onresize?(ev: TypedUIEvent<T>): unknown;
    /**
     * Fires when the user repositions the scroll box in the scroll bar on the object.
     * @param ev The event.
     */
    onscroll?(ev: TypedEvent<T>): unknown;
    onsecuritypolicyviolation?(ev: TypedSecurityPolicyViolationEvent<T>): unknown;
    /**
     * Occurs when the seek operation ends.
     * @param ev The event.
     */
    onseeked?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the current playback position is moved.
     * @param ev The event.
     */
    onseeking?(ev: TypedEvent<T>): unknown;
    /**
     * Fires when the current selection changes.
     * @param ev The event.
     */
    onselect?(ev: TypedEvent<T>): unknown;
    onselectionchange?(ev: TypedEvent<T>): unknown;
    onselectstart?(ev: TypedEvent<T>): unknown;
    onslotchange?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when the download has stopped.
     * @param ev The event.
     */
    onstalled?(ev: TypedEvent<T>): unknown;
    onsubmit?(ev: TypedSubmitEvent<T>): unknown;
    /**
     * Occurs if the load operation has been intentionally halted.
     * @param ev The event.
     */
    onsuspend?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs to indicate the current playback position.
     * @param ev The event.
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
    /**
     * Occurs when the volume is changed, or playback is muted or unmuted.
     * @param ev The event.
     */
    onvolumechange?(ev: TypedEvent<T>): unknown;
    /**
     * Occurs when playback stops because the next frame of a video resource is not available.
     * @param ev The event.
     */
    onwaiting?(ev: TypedEvent<T>): unknown;
    onwebkitanimationend?(ev: TypedEvent<T>): unknown;
    onwebkitanimationiteration?(ev: TypedEvent<T>): unknown;
    onwebkitanimationstart?(ev: TypedEvent<T>): unknown;
    onwebkittransitionend?(ev: TypedEvent<T>): unknown;
    onwheel?(ev: TypedWheelEvent<T>): unknown;
}
