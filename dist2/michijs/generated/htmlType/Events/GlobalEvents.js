/**
 * @typedef {import('./TypedEventHandlers/TypedOnErrorEventHandler').TypedOnErrorEventHandler} TypedOnErrorEventHandler
 */

/**
 * @typedef {import('./TypedEvents').TypedAnimationEvent} TypedAnimationEvent
 * @typedef {import('./TypedEvents').TypedDragEvent} TypedDragEvent
 * @typedef {import('./TypedEvents').TypedEvent} TypedEvent
 * @typedef {import('./TypedEvents').TypedFocusEvent} TypedFocusEvent
 * @typedef {import('./TypedEvents').TypedFormDataEvent} TypedFormDataEvent
 * @typedef {import('./TypedEvents').TypedMouseEvent} TypedMouseEvent
 * @typedef {import('./TypedEvents').TypedKeyboardEvent} TypedKeyboardEvent
 * @typedef {import('./TypedEvents').TypedPointerEvent} TypedPointerEvent
 * @typedef {import('./TypedEvents').TypedProgressEvent} TypedProgressEvent
 * @typedef {import('./TypedEvents').TypedSubmitEvent} TypedSubmitEvent
 * @typedef {import('./TypedEvents').TypedTouchEvent} TypedTouchEvent
 * @typedef {import('./TypedEvents').TypedTransitionEvent} TypedTransitionEvent
 * @typedef {import('./TypedEvents').TypedWheelEvent} TypedWheelEvent
 * @typedef {import('./TypedEvents').TypedUIEvent} TypedUIEvent
 * @typedef {import('./TypedEvents').TypedSecurityPolicyViolationEvent} TypedSecurityPolicyViolationEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedInputEvent').TypedInputEvent} TypedInputEvent
 */

/**
 * @template {EventTarget} T
 * @typedef {object} GlobalEvents
 * @property {TypedOnErrorEventHandler<T>} [onerror] Fires when an error occurs during object loading.
 * @property {(ev: TypedUIEvent<T>) => unknown} [onabort] Fires when the user aborts the download.
 * @property {(ev: TypedAnimationEvent<T>) => unknown} [onanimationcancel]
 * @property {(ev: TypedAnimationEvent<T>) => unknown} [onanimationend]
 * @property {(ev: TypedAnimationEvent<T>) => unknown} [onanimationiteration]
 * @property {(ev: TypedAnimationEvent<T>) => unknown} [onanimationstart]
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onauxclick]
 * @property {(ev: TypedInputEvent<T>) => unknown} [onbeforeinput]
 * @property {(ev: TypedFocusEvent<T>) => unknown} [onblur] Fires when the object loses the input focus.
 * @property {(ev: TypedFocusEvent<T>) => unknown} [oncancel]
 * @property {(ev: TypedEvent<T>) => unknown} [oncanplay] Occurs when playback is possible, but would require further buffering.
 * @property {(ev: TypedEvent<T>) => unknown} [oncanplaythrough]
 * @property {(ev: TypedEvent<T>) => unknown} [onchange] Fires when the contents of the object or selection have changed.
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onclick] Fires when the user clicks the left mouse button on the object
 * @property {(ev: TypedEvent<T>) => unknown} [onclose]
 * @property {(ev: TypedMouseEvent<T>) => unknown} [oncontextmenu] Fires when the user clicks the right mouse button in the client area, opening the context menu.
 * @property {(ev: TypedEvent<T>) => unknown} [oncuechange]
 * @property {(ev: TypedMouseEvent<T>) => unknown} [ondblclick] Fires when the user double-clicks the object.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondrag] Fires on the source object continuously during a drag operation.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondragend] Fires on the source object when the user releases the mouse at the close of a drag operation.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondragenter] Fires on the target element when the user drags the object to a valid drop target.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondragleave] Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondragover] Fires on the target element continuously while the user drags the object over a valid drop target.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondragstart] Fires on the source object when the user starts to drag a text selection or selected object.
 * @property {(ev: TypedDragEvent<T>) => unknown} [ondrop]
 * @property {(ev: TypedEvent<T>) => unknown} [ondurationchange] Occurs when the duration attribute is updated.
 * @property {(ev: TypedEvent<T>) => unknown} [onemptied] Occurs when the media element is reset to its initial state.
 * @property {(ev: TypedEvent<T>) => unknown} [onended] Occurs when the end of playback is reached.
 * @property {(ev: TypedFocusEvent<T>) => unknown} [onfocus] Fires when the object receives focus.
 * @property {(ev: TypedFormDataEvent<T>) => unknown} [onformdata]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [ongotpointercapture]
 * @property {(ev: TypedEvent<T>) => unknown} [oninput]
 * @property {(ev: TypedEvent<T>) => unknown} [oninvalid]
 * @property {(ev: TypedKeyboardEvent<T>) => unknown} [onkeydown] Fires when the user presses a key.
 * @property {(ev: TypedKeyboardEvent<T>) => unknown} [onkeypress] Fires when the user presses an alphanumeric key.
 * @property {(ev: TypedKeyboardEvent<T>) => unknown} [onkeyup] Fires when the user releases a key.
 * @property {(ev: TypedEvent<T>) => unknown} [onload] Fires immediately after the browser loads the object.
 * @property {(ev: TypedEvent<T>) => unknown} [onloadeddata] Occurs when media data is loaded at the current playback position.
 * @property {(ev: TypedEvent<T>) => unknown} [onloadedmetadata] Occurs when the duration and dimensions of the media have been determined.
 * @property {(ev: TypedEvent<T>) => unknown} [onloadstart] Occurs when Internet Explorer begins looking for media data.
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onlostpointercapture]
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmousedown] Fires when the user clicks the object with either mouse button.
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmouseenter]
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmouseleave]
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmousemove] Fires when the user moves the mouse over the object.
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmouseout] Fires when the user moves the mouse pointer outside the boundaries of the object.
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmouseover] Fires when the user moves the mouse pointer into the object.
 * @property {(ev: TypedMouseEvent<T>) => unknown} [onmouseup] Fires when the user releases a mouse button while the mouse is over the object.
 * @property {(ev: TypedEvent<T>) => unknown} [onpause] Occurs when playback is paused.
 * @property {(ev: TypedEvent<T>) => unknown} [onplay] Occurs when the play method is requested.
 * @property {(ev: TypedEvent<T>) => unknown} [onplaying] Occurs when the audio or video has started playing.
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointercancel]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointerdown]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointerenter]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointerleave]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointermove]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointerout]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointerover]
 * @property {(ev: TypedPointerEvent<T>) => unknown} [onpointerup]
 * @property {(ev: TypedProgressEvent<T>) => unknown} [onprogress] Occurs to indicate progress while downloading media data.
 * @property {(ev: TypedEvent<T>) => unknown} [onratechange] Occurs when the playback rate is increased or decreased.
 * @property {(ev: TypedEvent<T>) => unknown} [onreset] Fires when the user resets a form.
 * @property {(ev: TypedUIEvent<T>) => unknown} [onresize]
 * @property {(ev: TypedEvent<T>) => unknown} [onscroll] Fires when the user repositions the scroll box in the scroll bar on the object.
 * @property {(ev: TypedSecurityPolicyViolationEvent<T>) => unknown} [onsecuritypolicyviolation]
 * @property {(ev: TypedEvent<T>) => unknown} [onseeked] Occurs when the seek operation ends.
 * @property {(ev: TypedEvent<T>) => unknown} [onseeking] Occurs when the current playback position is moved.
 * @property {(ev: TypedEvent<T>) => unknown} [onselect] Fires when the current selection changes.
 * @property {(ev: TypedEvent<T>) => unknown} [onselectionchange]
 * @property {(ev: TypedEvent<T>) => unknown} [onselectstart]
 * @property {(ev: TypedEvent<T>) => unknown} [onslotchange]
 * @property {(ev: TypedEvent<T>) => unknown} [onstalled] Occurs when the download has stopped.
 * @property {(ev: TypedSubmitEvent<T>) => unknown} [onsubmit]
 * @property {(ev: TypedEvent<T>) => unknown} [onsuspend] Occurs if the load operation has been intentionally halted.
 * @property {(ev: TypedEvent<T>) => unknown} [ontimeupdate] Occurs to indicate the current playback position.
 * @property {(ev: TypedEvent<T>) => unknown} [ontoggle]
 * @property {(ev: TypedTouchEvent<T>) => unknown} [ontouchcancel]
 * @property {(ev: TypedTouchEvent<T>) => unknown} [ontouchend]
 * @property {(ev: TypedTouchEvent<T>) => unknown} [ontouchmove]
 * @property {(ev: TypedTouchEvent<T>) => unknown} [ontouchstart]
 * @property {(ev: TypedTransitionEvent<T>) => unknown} [ontransitioncancel]
 * @property {(ev: TypedTransitionEvent<T>) => unknown} [ontransitionend]
 * @property {(ev: TypedTransitionEvent<T>) => unknown} [ontransitionrun]
 * @property {(ev: TypedTransitionEvent<T>) => unknown} [ontransitionstart]
 * @property {(ev: TypedEvent<T>) => unknown} [onvolumechange] Occurs when the volume is changed, or playback is muted or unmuted.
 * @property {(ev: TypedEvent<T>) => unknown} [onwaiting] Occurs when playback stops because the next frame of a video resource is not available.
 * @property {(ev: TypedEvent<T>) => unknown} [onwebkitanimationend]
 * @property {(ev: TypedEvent<T>) => unknown} [onwebkitanimationiteration]
 * @property {(ev: TypedEvent<T>) => unknown} [onwebkitanimationstart]
 * @property {(ev: TypedEvent<T>) => unknown} [onwebkittransitionend]
 * @property {(ev: TypedWheelEvent<T>) => unknown} [onwheel]
 */
