export interface BaseProps {
    children?: ComponentChildren;
}

export type ComponentFactory = (props: BaseProps) => JSX.Element;

export type ComponentChild = JSX.Element | string | number | boolean | undefined | null;
export type ComponentChildren = ComponentChild | ComponentChild[];

type StyleAttributes = { [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] };

type EventHandler<E extends Event> = (event: E) => void;

type ClipboardEventHandler = EventHandler<ClipboardEvent>;
type CompositionEventHandler = EventHandler<CompositionEvent>;
type DragEventHandler = EventHandler<DragEvent>;
type FocusEventHandler = EventHandler<FocusEvent>;
type KeyboardEventHandler = EventHandler<KeyboardEvent>;
type MouseEventHandler = EventHandler<MouseEvent>;
type TouchEventHandler = EventHandler<TouchEvent>;
type UIEventHandler = EventHandler<UIEvent>;
type WheelEventHandler = EventHandler<WheelEvent>;
type AnimationEventHandler = EventHandler<AnimationEvent>;
type TransitionEventHandler = EventHandler<TransitionEvent>;
type GenericEventHandler = EventHandler<Event>;
type PointerEventHandler = EventHandler<PointerEvent>;

interface DOMAttributes {
    children?: ComponentChildren[] | ComponentChildren;

    // Image Events
    onLoad?: GenericEventHandler;
    onLoadCapture?: GenericEventHandler;

    // Clipboard Events
    onCopy?: ClipboardEventHandler;
    onCopyCapture?: ClipboardEventHandler;
    onCut?: ClipboardEventHandler;
    onCutCapture?: ClipboardEventHandler;
    onPaste?: ClipboardEventHandler;
    onPasteCapture?: ClipboardEventHandler;

    // Composition Events
    onCompositionEnd?: CompositionEventHandler;
    onCompositionEndCapture?: CompositionEventHandler;
    onCompositionStart?: CompositionEventHandler;
    onCompositionStartCapture?: CompositionEventHandler;
    onCompositionUpdate?: CompositionEventHandler;
    onCompositionUpdateCapture?: CompositionEventHandler;

    // Focus Events
    onFocus?: FocusEventHandler;
    onFocusCapture?: FocusEventHandler;
    onBlur?: FocusEventHandler;
    onBlurCapture?: FocusEventHandler;

    // Form Events
    onChange?: GenericEventHandler;
    onChangeCapture?: GenericEventHandler;
    onInput?: GenericEventHandler;
    onInputCapture?: GenericEventHandler;
    onSearch?: GenericEventHandler;
    onSearchCapture?: GenericEventHandler;
    onSubmit?: GenericEventHandler;
    onSubmitCapture?: GenericEventHandler;

    // Keyboard Events
    onKeyDown?: KeyboardEventHandler;
    onKeyDownCapture?: KeyboardEventHandler;
    onKeyPress?: KeyboardEventHandler;
    onKeyPressCapture?: KeyboardEventHandler;
    onKeyUp?: KeyboardEventHandler;
    onKeyUpCapture?: KeyboardEventHandler;

    // Media Events
    onAbort?: GenericEventHandler;
    onAbortCapture?: GenericEventHandler;
    onCanPlay?: GenericEventHandler;
    onCanPlayCapture?: GenericEventHandler;
    onCanPlayThrough?: GenericEventHandler;
    onCanPlayThroughCapture?: GenericEventHandler;
    onDurationChange?: GenericEventHandler;
    onDurationChangeCapture?: GenericEventHandler;
    onEmptied?: GenericEventHandler;
    onEmptiedCapture?: GenericEventHandler;
    onEncrypted?: GenericEventHandler;
    onEncryptedCapture?: GenericEventHandler;
    onEnded?: GenericEventHandler;
    onEndedCapture?: GenericEventHandler;
    onLoadedData?: GenericEventHandler;
    onLoadedDataCapture?: GenericEventHandler;
    onLoadedMetadata?: GenericEventHandler;
    onLoadedMetadataCapture?: GenericEventHandler;
    onLoadStart?: GenericEventHandler;
    onLoadStartCapture?: GenericEventHandler;
    onPause?: GenericEventHandler;
    onPauseCapture?: GenericEventHandler;
    onPlay?: GenericEventHandler;
    onPlayCapture?: GenericEventHandler;
    onPlaying?: GenericEventHandler;
    onPlayingCapture?: GenericEventHandler;
    onProgress?: GenericEventHandler;
    onProgressCapture?: GenericEventHandler;
    onRateChange?: GenericEventHandler;
    onRateChangeCapture?: GenericEventHandler;
    onSeeked?: GenericEventHandler;
    onSeekedCapture?: GenericEventHandler;
    onSeeking?: GenericEventHandler;
    onSeekingCapture?: GenericEventHandler;
    onStalled?: GenericEventHandler;
    onStalledCapture?: GenericEventHandler;
    onSuspend?: GenericEventHandler;
    onSuspendCapture?: GenericEventHandler;
    onTimeUpdate?: GenericEventHandler;
    onTimeUpdateCapture?: GenericEventHandler;
    onVolumeChange?: GenericEventHandler;
    onVolumeChangeCapture?: GenericEventHandler;
    onWaiting?: GenericEventHandler;
    onWaitingCapture?: GenericEventHandler;

    // MouseEvents
    onClick?: MouseEventHandler;
    onClickCapture?: MouseEventHandler;
    onContextMenu?: MouseEventHandler;
    onContextMenuCapture?: MouseEventHandler;
    onDblClick?: MouseEventHandler;
    onDblClickCapture?: MouseEventHandler;
    onDrag?: DragEventHandler;
    onDragCapture?: DragEventHandler;
    onDragEnd?: DragEventHandler;
    onDragEndCapture?: DragEventHandler;
    onDragEnter?: DragEventHandler;
    onDragEnterCapture?: DragEventHandler;
    onDragExit?: DragEventHandler;
    onDragExitCapture?: DragEventHandler;
    onDragLeave?: DragEventHandler;
    onDragLeaveCapture?: DragEventHandler;
    onDragOver?: DragEventHandler;
    onDragOverCapture?: DragEventHandler;
    onDragStart?: DragEventHandler;
    onDragStartCapture?: DragEventHandler;
    onDrop?: DragEventHandler;
    onDropCapture?: DragEventHandler;
    onMouseDown?: MouseEventHandler;
    onMouseDownCapture?: MouseEventHandler;
    onMouseEnter?: MouseEventHandler;
    onMouseEnterCapture?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    onMouseLeaveCapture?: MouseEventHandler;
    onMouseMove?: MouseEventHandler;
    onMouseMoveCapture?: MouseEventHandler;
    onMouseOut?: MouseEventHandler;
    onMouseOutCapture?: MouseEventHandler;
    onMouseOver?: MouseEventHandler;
    onMouseOverCapture?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
    onMouseUpCapture?: MouseEventHandler;

    // Selection Events
    onSelect?: GenericEventHandler;
    onSelectCapture?: GenericEventHandler;

    // Touch Events
    onTouchCancel?: TouchEventHandler;
    onTouchCancelCapture?: TouchEventHandler;
    onTouchEnd?: TouchEventHandler;
    onTouchEndCapture?: TouchEventHandler;
    onTouchMove?: TouchEventHandler;
    onTouchMoveCapture?: TouchEventHandler;
    onTouchStart?: TouchEventHandler;
    onTouchStartCapture?: TouchEventHandler;

    // Pointer Events
    onPointerOver?: PointerEventHandler;
    onPointerOverCapture?: PointerEventHandler;
    onPointerEnter?: PointerEventHandler;
    onPointerEnterCapture?: PointerEventHandler;
    onPointerDown?: PointerEventHandler;
    onPointerDownCapture?: PointerEventHandler;
    onPointerMove?: PointerEventHandler;
    onPointerMoveCapture?: PointerEventHandler;
    onPointerUp?: PointerEventHandler;
    onPointerUpCapture?: PointerEventHandler;
    onPointerCancel?: PointerEventHandler;
    onPointerCancelCapture?: PointerEventHandler;
    onPointerOut?: PointerEventHandler;
    onPointerOutCapture?: PointerEventHandler;
    onPointerLeave?: PointerEventHandler;
    onPointerLeaveCapture?: PointerEventHandler;
    onGotPointerCapture?: PointerEventHandler;
    onGotPointerCaptureCapture?: PointerEventHandler;
    onLostPointerCapture?: PointerEventHandler;
    onLostPointerCaptureCapture?: PointerEventHandler;

    // UI Events
    onScroll?: UIEventHandler;
    onScrollCapture?: UIEventHandler;

    // Wheel Events
    onWheel?: WheelEventHandler;
    onWheelCapture?: WheelEventHandler;

    // Animation Events
    onAnimationStart?: AnimationEventHandler;
    onAnimationStartCapture?: AnimationEventHandler;
    onAnimationEnd?: AnimationEventHandler;
    onAnimationEndCapture?: AnimationEventHandler;
    onAnimationIteration?: AnimationEventHandler;
    onAnimationIterationCapture?: AnimationEventHandler;

    // Transition Events
    onTransitionEnd?: TransitionEventHandler;
    onTransitionEndCapture?: TransitionEventHandler;
}

export interface HTMLAttributes extends DOMAttributes {
    // Standard HTML Attributes
    accept?: string;
    acceptCharset?: string;
    accessKey?: string;
    action?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    alt?: string;
    async?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    autoPlay?: boolean;
    capture?: boolean;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charSet?: string;
    challenge?: string;
    checked?: boolean;
    class?: string;
    // className?: string;
    cols?: number;
    colSpan?: number;
    content?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    controls?: boolean;
    controlsList?: string;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    default?: boolean;
    defer?: boolean;
    dir?: string;
    disabled?: boolean;
    download?: string;
    draggable?: boolean;
    encType?: string;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    hidden?: boolean;
    high?: number;
    href?: string;
    hrefLang?: string;
    for?: string;
    httpEquiv?: string;
    icon?: string;
    id?: string;
    inputMode?: string;
    integrity?: string;
    is?: string;
    keyParams?: string;
    keyType?: string;
    kind?: string;
    label?: string;
    lang?: string;
    list?: string;
    loop?: boolean;
    low?: number;
    manifest?: string;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    mediaGroup?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    noValidate?: boolean;
    open?: boolean;
    optimum?: number;
    pattern?: string;
    placeholder?: string;
    playsInline?: boolean;
    poster?: string;
    preload?: string;
    radioGroup?: string;
    readOnly?: boolean;
    rel?: string;
    required?: boolean;
    role?: string;
    rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scoped?: boolean;
    scrolling?: string;
    seamless?: boolean;
    selected?: boolean;
    shape?: string;
    size?: number;
    sizes?: string;
    slot?: string;
    span?: number;
    spellcheck?: boolean;
    src?: string;
    srcset?: string;
    srcDoc?: string;
    srcLang?: string;
    srcSet?: string;
    start?: number;
    step?: number | string;
    style?: string | StyleAttributes;
    summary?: string;
    tabIndex?: number;
    target?: string;
    title?: string;
    type?: string;
    useMap?: string;
    value?: string | string[] | number;
    width?: number | string;
    wmode?: string;
    wrap?: string;

    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: boolean;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
}

interface SVGAttributes extends HTMLAttributes {
    'color'?: string;
    'height'?: number | string;
    'id'?: string;
    'lang'?: string;
    'max'?: number | string;
    'media'?: string;
    'method'?: string;
    'min'?: number | string;
    'name'?: string;
    'style'?: {
        [key: string]: string | undefined;
    };
    'target'?: string;
    'type'?: string;
    'width'?: number | string;
    'role'?: string;
    'tabindex'?: number;
    'accent-height'?: number | string;
    'accumulate'?: 'none' | 'sum';
    'additive'?: 'replace' | 'sum';
    'alignment-baseline'?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit';
    'allowReorder'?: 'no' | 'yes';
    'alphabetic'?: number | string;
    'amplitude'?: number | string;
    'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated';
    'ascent'?: number | string;
    'attributeName'?: string;
    'attributeType'?: string;
    'autoReverse'?: number | string;
    'azimuth'?: number | string;
    'baseFrequency'?: number | string;
    'baseline-shift'?: number | string;
    'baseProfile'?: number | string;
    'bbox'?: number | string;
    'begin'?: number | string;
    'bias'?: number | string;
    'by'?: number | string;
    'calcMode'?: number | string;
    'cap-height'?: number | string;
    'clip'?: number | string;
    'clip-path'?: string;
    'clipPathUnits'?: number | string;
    'clip-rule'?: number | string;
    'color-interpolation'?: number | string;
    'color-interpolation-filters'?: 'auto' | 's-rGB' | 'linear-rGB' | 'inherit';
    'color-profile'?: number | string;
    'color-rendering'?: number | string;
    'contentScriptType'?: number | string;
    'contentStyleType'?: number | string;
    'cursor'?: number | string;
    'cx'?: number | string;
    'cy'?: number | string;
    'd'?: string;
    'decelerate'?: number | string;
    'descent'?: number | string;
    'diffuseConstant'?: number | string;
    'direction'?: number | string;
    'display'?: number | string;
    'divisor'?: number | string;
    'dominant-baseline'?: number | string;
    'dur'?: number | string;
    'dx'?: number | string;
    'dy'?: number | string;
    'edge-mode'?: number | string;
    'elevation'?: number | string;
    'enable-background'?: number | string;
    'end'?: number | string;
    'exponent'?: number | string;
    'externalResourcesRequired'?: number | string;
    'fill'?: string;
    'fill-opacity'?: number | string;
    'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit';
    'filter'?: string;
    'filterRes'?: number | string;
    'filterUnits'?: number | string;
    'flood-color'?: number | string;
    'flood-opacity'?: number | string;
    'focusable'?: number | string;
    'font-family'?: string;
    'font-size'?: number | string;
    'font-size-adjust'?: number | string;
    'font-stretch'?: number | string;
    'font-style'?: number | string;
    'font-variant'?: number | string;
    'font-weight'?: number | string;
    'format'?: number | string;
    'from'?: number | string;
    'fx'?: number | string;
    'fy'?: number | string;
    'g1'?: number | string;
    'g2'?: number | string;
    'glyph-name'?: number | string;
    'glyph-orientation-horizontal'?: number | string;
    'glyph-orientation-vertical'?: number | string;
    'glyphRef'?: number | string;
    'gradientTransform'?: string;
    'gradientUnits'?: string;
    'hanging'?: number | string;
    'horiz-adv-x'?: number | string;
    'horiz-origin-x'?: number | string;
    'href'?: string;
    'ideographic'?: number | string;
    'image-rendering'?: number | string;
    'in2'?: number | string;
    'in'?: string;
    'intercept'?: number | string;
    'k1'?: number | string;
    'k2'?: number | string;
    'k3'?: number | string;
    'k4'?: number | string;
    'k'?: number | string;
    'kernelMatrix'?: number | string;
    'kernelUnitLength'?: number | string;
    'kerning'?: number | string;
    'keyPoints'?: number | string;
    'keySplines'?: number | string;
    'keyTimes'?: number | string;
    'lengthAdjust'?: number | string;
    'letter-spacing'?: number | string;
    'lighting-color'?: number | string;
    'limitingConeAngle'?: number | string;
    'local'?: number | string;
    'marker-end'?: string;
    'markerHeight'?: number | string;
    'marker-mid'?: string;
    'marker-start'?: string;
    'markerUnits'?: number | string;
    'markerWidth'?: number | string;
    'mask'?: string;
    'maskContentUnits'?: number | string;
    'maskUnits'?: number | string;
    'mathematical'?: number | string;
    'mode'?: number | string;
    'numOctaves'?: number | string;
    'offset'?: number | string;
    'opacity'?: number | string;
    'operator'?: number | string;
    'order'?: number | string;
    'orient'?: number | string;
    'orientation'?: number | string;
    'origin'?: number | string;
    'overflow'?: number | string;
    'overline-position'?: number | string;
    'overline-thickness'?: number | string;
    'paint-order'?: number | string;
    'panose1'?: number | string;
    'pathLength'?: number | string;
    'patternContentUnits'?: string;
    'patternTransform'?: number | string;
    'patternUnits'?: string;
    'pointer-events'?: number | string;
    'points'?: string;
    'pointsAtX'?: number | string;
    'pointsAtY'?: number | string;
    'pointsAtZ'?: number | string;
    'preserveAlpha'?: number | string;
    'preserveAspectRatio'?: string;
    'primitiveUnits'?: number | string;
    'r'?: number | string;
    'radius'?: number | string;
    'ref-x'?: number | string;
    'ref-y'?: number | string;
    'rendering-intent'?: number | string;
    'repeatCount'?: number | string;
    'repeatDur'?: number | string;
    'requiredextensions'?: number | string;
    'requiredFeatures'?: number | string;
    'restart'?: number | string;
    'result'?: string;
    'rotate'?: number | string;
    'rx'?: number | string;
    'ry'?: number | string;
    'scale'?: number | string;
    'seed'?: number | string;
    'shape-rendering'?: number | string;
    'slope'?: number | string;
    'spacing'?: number | string;
    'specularConstant'?: number | string;
    'specularExponent'?: number | string;
    'speed'?: number | string;
    'spreadMethod'?: string;
    'startOffset'?: number | string;
    'stdDeviation'?: number | string;
    'stemh'?: number | string;
    'stemv'?: number | string;
    'stitchTiles'?: number | string;
    'stop-color'?: string;
    'stop-opacity'?: number | string;
    'strikethrough-position'?: number | string;
    'strikethrough-thickness'?: number | string;
    'string'?: number | string;
    'stroke'?: string;
    'stroke-dasharray'?: string | number;
    'stroke-dashoffset'?: string | number;
    'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit';
    'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit';
    'stroke-miterlimit'?: string;
    'stroke-opacity'?: number | string;
    'stroke-width'?: number | string;
    'surfaceScale'?: number | string;
    'systemLanguage'?: number | string;
    'tableValues'?: number | string;
    'targetX'?: number | string;
    'targetY'?: number | string;
    'text-anchor'?: string;
    'text-decoration'?: number | string;
    'textLength'?: number | string;
    'text-rendering'?: number | string;
    'to'?: number | string;
    'transform'?: string;
    'u1'?: number | string;
    'u2'?: number | string;
    'underline-position'?: number | string;
    'underline-thickness'?: number | string;
    'unicode'?: number | string;
    'unicode-bidi'?: number | string;
    'unicode-range'?: number | string;
    'units-per-em'?: number | string;
    'v-alphabetic'?: number | string;
    'values'?: string;
    'vector-effect'?: number | string;
    'version'?: string;
    'vert-adv-y'?: number | string;
    'vert-origin-x'?: number | string;
    'vert-origin-y'?: number | string;
    'v-hanging'?: number | string;
    'v-ideographic'?: number | string;
    'viewBox'?: string;
    'viewTarget'?: number | string;
    'visibility'?: number | string;
    'v-mathematical'?: number | string;
    'widths'?: number | string;
    'word-spacing'?: number | string;
    'writing-mode'?: number | string;
    'x1'?: number | string;
    'x2'?: number | string;
    'x'?: number | string;
    'x-channel-selector'?: string;
    'x-height'?: number | string;
    'xlinkActuate'?: string;
    'xlinkArcrole'?: string;
    'xlinkHref'?: string;
    'xlinkRole'?: string;
    'xlinkShow'?: string;
    'xlinkTitle'?: string;
    'xlinkType'?: string;
    'xmlBase'?: string;
    'xmlLang'?: string;
    'xmlns'?: string;
    'xmlSpace'?: string;
    'y1'?: number | string;
    'y2'?: number | string;
    'y'?: number | string;
    'yChannelSelector'?: string;
    'z'?: number | string;
    'zoomAndPan'?: string;
}

declare global {
    export namespace JSX {
        type Element = HTMLElement;

        interface ElementAttributesProperty {
            props: any; // specify the property name to use
        }

        interface ElementChildrenAttribute {
            children: ComponentChildren[] | ComponentChildren;
        }

        type IntrinsicElementsHTML = { [K in keyof HTMLElementTagNameMap]?: HTMLAttributes & {id: string} } & { [K in keyof SVGElementTagNameMap]?: SVGAttributes & {id: string} };

        interface IntrinsicElements extends IntrinsicElementsHTML { }
    }
}
