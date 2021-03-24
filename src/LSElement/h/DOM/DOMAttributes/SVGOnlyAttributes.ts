import { SvgPropertiesHyphen } from 'csstype';
import { Accumulate, Additive, BeginValueList, BlendMode, CalcMode, Units, ClockValue, Dur, EdgeMode, EndValueList, In, IRI, Language, Length, NumberOptionalNumber, Operator, PreserveAspectRatio, Ratio, Repeat, Restart, RGBA, Rotate, SpreadMethod, Stich, StringBoolean, TransformFunction, Orient, Ref, ListOfNumbers, TransformList, Points, Offset, LengthAdjust } from './types';

export interface SVGOnlyAttributes extends SvgPropertiesHyphen {
    /**
     * The accumulate attribute controls whether or not an animation is cumulative.
     */
    accumulate: Accumulate;
    /**
     * The additive attribute controls whether or not an animation is additive.
     */
    additive: Additive;
    /**
     * The amplitude attribute controls the amplitude of the gamma function of a component transfer element when its type attribute is gamma.
     */
    amplitude: number;
    /**
     * The attributeName attribute indicates the name of the CSS property or attribute of the target element that is going to be changed during an animation.
     */
    attributeName: string;
    /**
     * The azimuth attribute specifies the direction angle for the light source on the XY plane (clockwise), in degrees from the x axis.
     */
    azimuth: number;
    /**
     * The baseFrequency attribute represents the base frequency parameter for the noise function of the `<feTurbulence>` filter primitive.
     */
    baseFrequency: NumberOptionalNumber;
    /**
     * The begin attribute defines when an animation should begin or when an element should be discarded.
     */
    begin: BeginValueList;
    /**
     * The bias attribute shifts the range of the filter. After applying the kernelMatrix of the `<feConvolveMatrix>` element to the input image to yield a number and applied the divisor attribute, the bias attribute is added to each component. This allows representation of values that would otherwise be clamped to 0 or 1.
     */
    bias: number;
    /**
     * The by attribute specifies a relative offset value for an attribute that will be modified during an animation.
     */
    by: string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/by
    /**
     * The calcMode attribute specifies the interpolation mode for the animation.
     */
    calcMode: CalcMode;
    /**
     * Defines the coordinate system for the contents of the `<clipPath>` element.
     */
    clipPathUnits: Units;
    /**
     * The x-axis coordinate of the center of the element.
     */
    cx: Length;
    /**
     * The y-axis coordinate of the center of the element.
     */
    cy: Length;
    /**
     * This attribute defines the shape of the path.
     */
    d: string;
    /**
     * The diffuseConstant attribute represents the kd value in the Phong lighting model. In SVG, this can be any non-negative number.
     */
    diffuseConstant: number;
    /**
     * The divisor attribute specifies the value by which the resulting number of applying the kernelMatrix of a `<feConvolveMatrix>` element to the input image color value is divided to yield the destination color value. A divisor that is the sum of all the matrix values tends to have an evening effect on the overall color intensity of the result.
     */
    divisor: number;
    /**
     * The dur attribute indicates the simple duration of an animation.
     */
    dur: Dur;
    /**
     * Shifts the text position horizontally from a previous text element.
     */
    dx: Length;
    /**
     * Shifts the text position vertically from a previous text element.
     */
    dy: Length;
    /**
     * The edgeMode attribute determines how to extend the input image as necessary with color values so that the matrix operations can be applied when the kernel is positioned at or near the edge of the input image.
     */
    edgeMode: EdgeMode;
    /**
     * The elevation attribute specifies the direction angle for the light source from the XY plane towards the Z-axis, in degrees. Note that the positive Z-axis points towards the viewer of the content.
     */
    elevation: number;
    /**
     * The end attribute defines an end value for the animation that can constrain the active duration.
     */
    end: EndValueList;
    /**
     * The exponent attribute defines the exponent of the gamma function.
     */
    exponent: number;
    /**
     * The filterUnits attribute defines the coordinate system for the attributes x, y, width and height.
     */
    filterUnits: Units;
    /**
     * This attribute defines the radius of the start circle of the radial gradient. The gradient will be drawn such that the 0% `<stop>` is mapped to the perimeter of the start circle.
     */
    fr: Length;
    /**
     * The from attribute indicates the initial value of the attribute that will be modified during the animation. When used with the to attribute, the animation will change the modified attribute from the from value to the to value. When used with the by attribute, the animation will change the attribute relatively from the from value by the value specified in by.
     */
    from: string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/From
    /**
     * This attribute defines the x coordinate of the start circle of the radial gradient.
     */
    fx: Length;
    /**
     * This attribute defines the y coordinate of the start circle of the radial gradient.
     */
    fy: Length;
    /**
     * The gradientUnits attribute defines the coordinate system used for attributes specified on the gradient elements.
     */
    gradientUnits: Units;
    /**
     * The gradientTransform attribute contains the definition of an optional additional transformation from the gradient coordinate system onto the target coordinate system
     */
    gradientTransform: TransformFunction;
    /**
     * The in attribute identifies input for the given filter primitive.
     */
    in: In;
    /**
     * The in2 attribute identifies the second input for the given filter primitive. It works exactly like the in attribute.
     */
    in2: In;
    /**
     * The intercept attribute defines the intercept of the linear function of color component transfers when the type attribute is set to linear.
     */
    intercept: number;
    /**
     * Defines one of the values to be used within the arithmetic operation of the `<feComposite>` filter primitive.
     */
    k1: number;
    /**
     * Defines one of the values to be used within the arithmetic operation of the `<feComposite>` filter primitive.
     */
    k2: number;
    /**
     * Defines one of the values to be used within the arithmetic operation of the `<feComposite>` filter primitive.
     */
    k3: number;
    /**
     * Defines one of the values to be used within the arithmetic operation of the `<feComposite>` filter primitive.
     */
    k4: number;
    /**
     * the kernelMatrix attribute defines the list of numbers that make up the kernel matrix for the `<feConvolveMatrix>` element.
     */
    kernelMatrix: string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kernelMatrix
    /**
     * The keyPoints attribute indicates the simple duration of an animation.
     */
    keyPoints: string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyPoints
    /**
     * The keyTimes attribute represents a list of time values used to control the pacing of the animation. Each time in the list corresponds to a value in the values attribute list, and defines when the value is used in the animation. Each time value in the keyTimes list is specified as a floating point value between 0 and 1 (inclusive), representing a proportional offset into the duration of the animation element.
     */
    keyTimes: string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyTimes
    /**
     * The keySplines attribute defines a set of Bézier curve control points associated with the keyTimes list, defining a cubic Bézier function that controls interval pacing.
     */
    keySplines: string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keySplines
    /**
     * How the text is stretched or compressed to fit the width defined by the textLength attribute.
     */
    lengthAdjust: LengthAdjust;
    /**
     * The limitingConeAngle attribute represents the angle in degrees between the spot light axis (i.e. the axis between the light source and the point to which it is pointing at) and the spot light cone. So it defines a limiting cone which restricts the region where the light is projected. No light is projected outside the cone.
     */
    limitingConeAngle: number;
    /**
     * The min attribute specifies the minimum value of the active animation duration.
     */
    min: ClockValue;
    /**
     * This attribute defines the height of the marker viewport.
     */
    markerHeight: Length;
    /**
     * This attribute defines the coordinate system for the attributes markerWidth, markerHeight and the contents of the `<marker>`.
     */
    markerUnits: Units;
    /**
     * This attribute defines the width of the marker viewport.
     */
    markerWidth: Length;
    /**
     * This attribute defines the coordinate system for the contents of the `<mask>`.
     */
    maskContentUnits: Units;
    /**
     * This attribute defines the coordinate system for attributes x, y, width and height on the `<mask>`.
     */
    maskUnits: Units;
    /**
     * The max attribute specifies the maximum value of the active animation duration.
     */
    max: ClockValue;
    /**
     * The mode attribute defines the blending mode on the `<feBlend>` filter primitive.
     */
    mode: BlendMode;
    /**
     * The numOctaves attribute defines the number of octaves for the noise function of the `<feTurbulence>` primitive.
     */
    numOctaves: number;
    /**
     * This attribute defines where the gradient stop is placed along the gradient vector.
     */
    offset: Offset;
    /**
     * The operator attribute has two meanings based on the context it's used in. Either it defines the compositing or morphing operation to be performed.
     */
    operator: Operator;
    /**
     * the order attribute indicates the size of the matrix to be used by a `<feConvolveMatrix>` element.
     */
    order: string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/order
    /**
     * This attribute defines the orientation of the marker relative to the shape it is attached to.
     */
    orient: Orient;
    /**
     * This attribute defines the coordinate system for the contents of the `<pattern>`.
     */
    patternContentUnits: Units;
    /**
     * This attribute contains the definition of an optional additional transformation from the pattern coordinate system onto the target coordinate system.
     */
    patternTransform: TransformList;
    /**
     * This attribute defines the coordinate system for attributes x, y, width, and height.
     */
    patternUnits: Units;
    /**
     * The path attribute has two different meanings, either it defines a text path along which the characters of a text are rendered, or a motion path along which a referenced element is animated.
     */
    path: string;
    /**
     * The total length for the element, in user units.
     */
    pathLength: number;
    /**
     * The points attribute defines a list of points. Each point is defined by a pair of number representing a X and a Y coordinate in the user coordinate system. If the attribute contains an odd number of coordinates, the last one will be ignored.
     */
    points: Points;
    /**
     * The pointsAtX attribute represents the x location in the coordinate system established by attribute primitiveUnits on the `<filter>` element of the point at which the light source is pointing.
     */
    pointsAtX: number;
    /**
     * The pointsAtY attribute represents the y location in the coordinate system established by attribute primitiveUnits on the `<filter>` element of the point at which the light source is pointing.
     */
    pointsAtY: number;
    /**
     * The pointsAtZ attribute represents the y location in the coordinate system established by attribute primitiveUnits on the `<filter>` element of the point at which the light source is pointing, assuming that, in the initial local coordinate system, the positive z-axis comes out towards the person viewing the content and assuming that one unit along the z-axis equals one unit in x and y.
     */
    pointsAtZ: number;
    /**
     * The preserveAlpha attribute indicates how a `<feConvolveMatrix>` element handled alpha transparency.
     */
    preserveAlpha: StringBoolean;
    /**
     * The preserveAspectRatio attribute indicates how an element with a viewBox providing a given aspect ratio must fit into a viewport with a different aspect ratio.
     */
    preserveAspectRatio: PreserveAspectRatio;
    /**
     * The primitiveUnits attribute specifies the coordinate system for the various length values within the filter primitives and for the attributes that define the filter primitive subregion.
     */
    primitiveUnits: Units;
    /**
     * The radius of the circle. A value lower or equal to zero disables rendering of the circle.
     */
    r: number;
    /**
     * The radius attribute represents the radius (or radii) for the operation on a given `<feMorphology>` filter primitive.
     */
    radius: NumberOptionalNumber;
    /**
     * This attribute defines the x coordinate for the reference point of the marker.
     */
    refX: Ref;
    /**
     * This attribute defines the y coordinate for the reference point of the marker.
     */
    refY: Ref;
    /**
     * The repeatCount attribute indicates the number of times an animation will take place.
     */
    repeatCount: Repeat;
    /**
     * The repeatDur attribute specifies the total duration for repeating an animation.
     */
    repeatDur: Repeat;
    /**
     * The restart attribute specifies whether or not an animation can restart.
     */
    restart: Restart;
    /**
     * defines the assigned name for this filter primitive. If supplied, then graphics that result from processing this filter primitive can be referenced by an in attribute on a subsequent filter primitive within the same `<filter>` element. If no value is provided, the output will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its in attribute.
     */
    result: string;
    /**
     * List all the browser specific capabilities that must be supported by the browser to be allowed to render the associated element.
     */
    requiredExtensions: string; //TODO: A list of space-separated URI
    /**
     * The rotate attribute specifies how the animated element rotates as it travels along a path specified in an `<animateMotion>` element.
     */
    rotate: Rotate;
    /**
     * The rx attribute defines a radius on the x-axis.
     */
    rx: Ratio;
    /**
     * The ry attribute defines a radius on the y-axis.
     */
    ry: Ratio;
    /**
     * The scale attribute defines the displacement scale factor to be used on a `<feDisplacementMap>` filter primitive. The amount is expressed in the coordinate system established by the primitiveUnits attribute on the `<filter>` element.
     */
    scale: number;
    /**
     * The seed attribute represents the starting number for the pseudo random number generator of the `<feTurbulence>` filter primitive.
     */
    seed: number;
    /**
     * The specularConstant attribute controls the ratio of reflection of the specular lighting. It represents the ks value in the Phong lighting model. The bigger the value the stronger the reflection.
     */
    specularConstant: number;
    /**
     * The specularExponent attribute controls the focus for the light source. The bigger the value the brighter the light.
     */
    specularExponent: number;
    /**
     * The spreadMethod attribute determines how a shape is filled beyond the defined edges of a gradient.
     */
    spreadMethod: SpreadMethod;
    /**
     * The stdDeviation attribute defines the standard deviation for the blur operation.
     */
    stdDeviation: string;//TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stdDeviation
    /**
     * The stitchTiles attribute defines how the Perlin Noise tiles behave at the border.
     */
    stitchTiles: Stich;
    /**
     * The surfaceScale attribute represents the height of the surface for a light filter primitive.
     */
    surfaceScale: number;
    /**
     * Indicates which language the user must have chosen to render the associated element.
     */
    systemLanguage: string; //TODO:  A list of comma-separated language ID
    /**
     * The tableValues attribute defines a list of numbers defining a lookup table of values for a for a color component transfer function.
     */
    tableValues: string; //TODO: This value holds a comma- and/or space-separated list of numbers
    /**
     * The targetX attribute determines the positioning in horizontal direction of the convolution matrix relative to a given target pixel in the input image. The leftmost column of the matrix is column number zero. The value must be such that: 0 <= targetX < orderX.
     */
    targetX: number;
    /**
     * The targetY attribute determines the positioning in vertical direction of the convolution matrix relative to a given target pixel in the input image. The topmost row of the matrix is row number zero. The value must be such that: 0 <= targetY < orderY.
     */
    targetY: number;
    /**
     * A width that the text should be scaled to fit.
     */
    textLength: Length;
    /**
     * The to attribute indicates the final value of the attribute that will be modified during the animation. The value of the attribute will change between the from attribute value and this value.
     */
    to: string; //TODO: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/To
    /**
     * This attribute defines the bound of the SVG viewport for the current SVG fragment.
     */
    viewBox: ListOfNumbers;
    /**
     * Defines the x-axis coordinate of the line starting point.
     */
    x1: Length;
    /**
     * Defines the x-axis coordinate of the line ending point.
     */
    x2: Length;
    /**
     * The xChannelSelector attribute indicates which color channel from in2 to use to displace the pixels in in along the x-axis.
     */
    xChannelSelector: RGBA;
    /**
     * Specifies a base IRI other than the base IRI of the document.
     */
    'xml:base': IRI;
    /**
     * It is a universal attribute allowed in all XML dialects to mark up the natural human language that an element contains. It's almost identical in usage to HTML's lang, but in conforming XML 1.0 documents, it does not allow the use of a null attribute value (xml:lang="") to indicate an unknown language. Instead, use xml:lang="und"
     */
    'xml:lang': Language;
    /**
     * Defines the y-axis coordinate of the line starting point.
     */
    y1: Length;
    /**
     * Defines the y-axis coordinate of the line ending point.
     */
    y2: Length;
    /**
     * The yChannelSelector attribute indicates which color channel from in2 to use to displace the pixels in in along the y-axis.
     */
    yChannelSelector: RGBA;
}

// "values" should be defined in each element
// "dx" should be defined in each element
// "dy" should be defined in each element
// "x" should be defined in each element
// "y" should be defined in each element
// "z" should be defined in each element