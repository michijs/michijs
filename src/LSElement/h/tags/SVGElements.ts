import type {
  SVGElements
} from '@lsegurado/htmltype';
import { LSTag } from './LSTag';

export interface SVGElements {
    /**
    * The `<a>` SVG element creates a hyperlink to other web pages, files, locations in the same page, email addresses, or any other URL. It is very similar to HTML’s `<a>` element.
    * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a
    */
    a: LSTag<SVGElements.a, SVGElementTagNameMap['a']>;
    /**
    * The SVG `<animate>` element provides a way to animate an attribute of an element over time.
    * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
    */
    animate: LSTag<SVGElements.animate, SVGElementTagNameMap['animate']>;
    /**
     * The SVG `<animateMotion>` element let define how an element moves along a motion path.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion
     */
    animateMotion: LSTag<SVGElements.animate, SVGElementTagNameMap['animateMotion']>;
    /**
     * The animateTransform element animates a transformation attribute on its target element, thereby allowing animations to control translation, scaling, rotation, and/or skewing.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform
     */
    animateTransform: LSTag<SVGElements.animateTransform, SVGElementTagNameMap['animateTransform']>;
    /**
     * The `<circle>` SVG element is an SVG basic shape, used to draw circles based on a center point and a radius.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
     */
    circle: LSTag<SVGElements.circle, SVGElementTagNameMap['circle']>;
    /**
     * The `<clipPath>` SVG element defines a clipping path, to be used by the clip-path property.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
     */
    clipPath: LSTag<SVGElements.clipPath, SVGElementTagNameMap['clipPath']>;
    /**
     * The `<defs>` element is used to store graphical objects that will be used at a later time. Objects created inside a `<defs>` element are not rendered directly. To display them you have to reference them (with a `<use>` element for example).
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
     */
    defs: LSTag<SVGElements.defs, SVGElementTagNameMap['defs']>;
    /**
     * The `<desc>` element provides an accessible, long-text description of any SVG container element or graphics element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc
     */
    desc: LSTag<SVGElements.desc, SVGElementTagNameMap['desc']>;
    /**
     * The `<ellipse>` element is an SVG basic shape, used to create ellipses based on a center coordinate, and both their x and y radius.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse
     */
    ellipse: LSTag<SVGElements.ellipse, SVGElementTagNameMap['ellipse']>;
    /**
     * The `<feBlend>` SVG filter primitive composes two objects together ruled by a certain blending mode. This is similar to what is known from image editing software when blending two layers. The mode is defined by the mode attribute.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend
     */
    feBlend: LSTag<SVGElements.feBlend, SVGElementTagNameMap['feBlend']>;
    /**
     * The `<feColorMatrix>` SVG filter element changes colors based on a transformation matrix. Every pixel's color value [R,G,B,A] is matrix multiplied by a 5 by 5 color matrix to create new color [R',G',B',A'].
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix
     */
    feColorMatrix: LSTag<SVGElements.feColorMatrix, SVGElementTagNameMap['feColorMatrix']>;
    /**
     * The `<feComponentTransfer>` SVG filter primitive performs color-component-wise remapping of data for each pixel. It allows operations like brightness adjustment, contrast adjustment, color balance or thresholding.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer
     */
    feComponentTransfer: LSTag<SVGElements.feComponentTransfer, SVGElementTagNameMap['feComponentTransfer']>;
    /**
     * The `<feComposite>` SVG filter primitive performs the combination of two input images pixel-wise in image space using one of the Porter-Duff compositing operations: over, in, atop, out, xor, lighter, or arithmetic.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite
     */
    feComposite: LSTag<SVGElements.feComposite, SVGElementTagNameMap['feComposite']>;
    /**
     * The `<feConvolveMatrix>` SVG filter primitive applies a matrix convolution filter effect. A convolution combines pixels in the input image with neighboring pixels to produce a resulting image. A wide variety of imaging operations can be achieved through convolutions, including blurring, edge detection, sharpening, embossing and beveling.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix
     */
    feConvolveMatrix: LSTag<SVGElements.feConvolveMatrix, SVGElementTagNameMap['feConvolveMatrix']>;
    /**
     * The `<feDiffuseLighting>` SVG filter primitive lights an image using the alpha channel as a bump map. The resulting image, which is an RGBA opaque image, depends on the light color, light position and surface geometry of the input bump map.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting
     */
    feDiffuseLighting: LSTag<SVGElements.feDiffuseLighting, SVGElementTagNameMap['feDiffuseLighting']>;
    /**
     * The `<feDisplacementMap>` SVG filter primitive uses the pixel values from the image from in2 to spatially displace the image from in.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap
     */
    feDisplacementMap: LSTag<SVGElements.feDisplacementMap, SVGElementTagNameMap['feDisplacementMap']>;
    /**
     * The `<feDistantLight>` filter primitive defines a distant light source that can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDistantLight
     */
    feDistantLight: LSTag<SVGElements.feDistantLight, SVGElementTagNameMap['feDistantLight']>;
    /**
     * The `<feFlood>` SVG filter primitive fills the filter subregion with the color and opacity defined by flood-color and flood-opacity.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood
     */
    feFlood: LSTag<SVGElements.feFlood, SVGElementTagNameMap['feFlood']>;
    /**
     * The `<feFuncA>` SVG filter primitive defines the transfer function for the alpha component of the input graphic of its parent `<feComponentTransfer>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncA
     */
    feFuncA: LSTag<SVGElements.feFuncA, SVGElementTagNameMap['feFuncA']>;
    /**
     * The `<feFuncB>` SVG filter primitive defines the transfer function for the blue component of the input graphic of its parent `<feComponentTransfer>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncB
     */
    feFuncB: LSTag<SVGElements.feFuncB, SVGElementTagNameMap['feFuncB']>;
    /**
     * The `<feFuncG>` SVG filter primitive defines the transfer function for the green component of the input graphic of its parent `<feComponentTransfer>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncG
     */
    feFuncG: LSTag<SVGElements.feFuncG, SVGElementTagNameMap['feFuncG']>;
    /**
     * The `<feFuncR>` SVG filter primitive defines the transfer function for the red component of the input graphic of its parent `<feComponentTransfer>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncR
     */
    feFuncR: LSTag<SVGElements.feFuncR, SVGElementTagNameMap['feFuncR']>;
    /**
     * The `<feGaussianBlur>` SVG filter primitive blurs the input image by the amount specified in stdDeviation, which defines the bell-curve.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur
     */
    feGaussianBlur: LSTag<SVGElements.feGaussianBlur, SVGElementTagNameMap['feGaussianBlur']>;
    /**
     * The `<feImage>` SVG filter primitive fetches image data from an external source and provides the pixel data as output (meaning if the external source is an SVG image, it is rasterized.)
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage
     */
    feImage: LSTag<SVGElements.feImage, SVGElementTagNameMap['feImage']>;
    /**
     * The `<feMerge>` SVG element allows filter effects to be applied concurrently instead of sequentially. This is achieved by other filters storing their output via the result attribute and then accessing it in a `<feMergeNode>` child.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge
     */
    feMerge: LSTag<SVGElements.feMerge, SVGElementTagNameMap['feMerge']>;
    /**
     * The feMergeNode takes the result of another filter to be processed by its parent `<feMerge>`.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMergeNode
     */
    feMergeNode: LSTag<SVGElements.feMergeNode, SVGElementTagNameMap['feMergeNode']>;
    /**
     * The `<feMorphology>` SVG filter primitive is used to erode or dilate the input image. Its usefulness lies especially in fattening or thinning effects.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology
     */
    feMorphology: LSTag<SVGElements.feMorphology, SVGElementTagNameMap['feMorphology']>;
    /**
     * The `<feOffset>` SVG filter primitive allows to offset the input image. The input image as a whole is offset by the values specified in the dx and dy attributes.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset
     */
    feOffset: LSTag<SVGElements.feOffset, SVGElementTagNameMap['feOffset']>;
    /**
     * The `<fePointLight>` filter primitive defines a light source which allows to create a point light effect. It that can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/fePointLight
     */
    fePointLight: LSTag<SVGElements.fePointLight, SVGElementTagNameMap['fePointLight']>;
    /**
     * The `<feSpecularLighting>` SVG filter primitive lights a source graphic using the alpha channel as a bump map. The resulting image is an RGBA image based on the light color. The lighting calculation follows the standard specular component of the Phong lighting model. The resulting image depends on the light color, light position and surface geometry of the input bump map. The result of the lighting calculation is added. The filter primitive assumes that the viewer is at infinity in the z direction.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting
     */
    feSpecularLighting: LSTag<SVGElements.feSpecularLighting, SVGElementTagNameMap['feSpecularLighting']>;
    /**
     * The `<feSpotLight>` SVG filter primitive defines a light source which allows to create a spotlight effect. It that can be used within a lighting filter primitive: `<feDiffuseLighting>` or `<feSpecularLighting>`.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpotLight
     */
    feSpotLight: LSTag<SVGElements.feSpotLight, SVGElementTagNameMap['feSpotLight']>;
    /**
     * The `<feTile>` SVG filter primitive allows to fill a target rectangle with a repeated, tiled pattern of an input image. The effect is similar to the one of a `<pattern>`.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile
     */
    feTile: LSTag<SVGElements.feTile, SVGElementTagNameMap['feTile']>;
    /**
     * The `<feTurbulence>` SVG filter primitive creates an image using the Perlin turbulence function. It allows the synthesis of artificial textures like clouds or marble. The resulting image will fill the entire filter primitive subregion.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence
     */
    feTurbulence: LSTag<SVGElements.feTurbulence, SVGElementTagNameMap['feTurbulence']>;
    /**
     * The `<filter>` SVG element defines a custom filter effect by grouping atomic filter primitives. It is never rendered itself, but must be used by the filter attribute on SVG elements, or the filter CSS property for SVG/HTML elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
     */
    filter: LSTag<SVGElements.filter, SVGElementTagNameMap['filter']>;
    /**
     * The `<foreignObject>` SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject
     */
    foreignObject: LSTag<SVGElements.foreignObject, SVGElementTagNameMap['foreignObject']>;
    /**
     * The `<g>` SVG element is a container used to group other SVG elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
     */
    g: LSTag<SVGElements.g, SVGElementTagNameMap['g']>;
    /**
     * The `<image>` SVG element includes images inside SVG documents. It can display raster image files or other SVG files.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image
     */
    image: LSTag<SVGElements.image, SVGElementTagNameMap['image']>;
    /**
     * The `<line>` element is an SVG basic shape used to create a line connecting two points.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
     */
    line: LSTag<SVGElements.line, SVGElementTagNameMap['line']>;
    /**
     * The `<linearGradient>` element lets authors define linear gradients that can be applied to fill or stroke of graphical elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
     */
    linearGradient: LSTag<SVGElements.linearGradient, SVGElementTagNameMap['linearGradient']>;
    /**
     * The `<marker>` element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given `<path>`, `<line>`, `<polyline>` or `<polygon>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
     */
    marker: LSTag<SVGElements.marker, SVGElementTagNameMap['marker']>;
    /**
     * The `<mask>` element defines an alpha mask for compositing the current object into the background. A mask is used/referenced using the mask property.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask
     */
    mask: LSTag<SVGElements.mask, SVGElementTagNameMap['mask']>;
    /**
     * The `<metadata>` SVG element adds metadata to SVG content. Metadata is structured information about data. The contents of `<metadata>` should be elements from other XML namespaces such as RDF, FOAF, etc.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata
     */
    metadata: LSTag<SVGElements.metadata, SVGElementTagNameMap['metadata']>;
    /**
     * The `<mpath>` sub-element for the `<animateMotion>` element provides the ability to reference an external `<path>` element as the definition of a motion path.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mpath
     */
    mpath: LSTag<SVGElements.mpath, SVGElementTagNameMap['mpath']>;
    /**
     * The `<path>` SVG element is the generic element to define a shape. All the basic shapes can be created with a path element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
     */
    path: LSTag<SVGElements.path, SVGElementTagNameMap['path']>;
    /**
     * The `<pattern>` element defines a graphics object which can be redrawn at repeated x- and y-coordinate intervals ("tiled") to cover an area.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
     */
    pattern: LSTag<SVGElements.pattern, SVGElementTagNameMap['pattern']>;
    /**
     * The `<polygon>` element defines a closed shape consisting of a set of connected straight line segments. The last point is connected to the first point.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     */
    polygon: LSTag<SVGElements.polygon, SVGElementTagNameMap['polygon']>;
    /**
     * The `<polyline>` SVG element is an SVG basic shape that creates straight lines connecting several points. Typically a polyline is used to create open shapes as the last point doesn't have to be connected to the first point. For closed shapes see the `<polygon>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
     */
    polyline: LSTag<SVGElements.polyline, SVGElementTagNameMap['polyline']>;
    /**
     * The `<radialGradient>` element lets authors define radial gradients that can be applied to fill or stroke of graphical elements.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient
     */
    radialGradient: LSTag<SVGElements.radialGradient, SVGElementTagNameMap['radialGradient']>;
    /**
     * The `<rect>` element is a basic SVG shape that draws rectangles, defined by their position, width, and height. The rectangles may have their corners rounded.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
     */
    rect: LSTag<SVGElements.rect, SVGElementTagNameMap['rect']>;
    /**
     * The SVG script element allows to add scripts to an SVG document.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/script
     */
    script: LSTag<SVGElements.script, SVGElementTagNameMap['script']>;
    /**
     * The SVG `<set>` element provides a simple means of just setting the value of an attribute for a specified duration.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/set
     */
    set: LSTag<SVGElements.set, SVGElementTagNameMap['set']>;
    /**
     * The SVG `<stop>` element defines a color and its position to use on a gradient. This element is always a child of a `<linearGradient>` or `<radialGradient>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop
     */
    stop: LSTag<SVGElements.stop, SVGElementTagNameMap['stop']>;
    /**
     * The SVG `<style>` element allows style sheets to be embedded directly within SVG content.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style
     */
    style: LSTag<SVGElements.style, SVGElementTagNameMap['style']>;
    /**
     * The svg element is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
     */
    svg: LSTag<SVGElements.svg, SVGElementTagNameMap['svg']>;
    /**
     * The `<switch>` SVG element evaluates any requiredFeatures, requiredExtensions and systemLanguage attributes on its direct child elements in order, and then renders the first child where these attributes evaluate to true. Other direct children will be bypassed and therefore not rendered. If a child element is a container element, like `<g>`, then its subtree is also processed/rendered or bypassed/not rendered.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/switch
     */
    switch: LSTag<SVGElements._switch, SVGElementTagNameMap['switch']>;
    /**
     * The `<symbol>` element is used to define graphical template objects which can be instantiated by a `<use>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
     */
    symbol: LSTag<SVGElements._symbol, SVGElementTagNameMap['symbol']>;
    /**
     * The SVG `<text>` element draws a graphics element consisting of text. It's possible to apply a gradient, pattern, clipping path, mask, or filter to `<text>`, like any other SVG graphics element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
     */
    text: LSTag<SVGElements.text, SVGElementTagNameMap['text']>;
    /**
     * To render text along the shape of a `<path>`, enclose the text in a `<textPath>` element that has an href attribute with a reference to the `<path>` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
     */
    textPath: LSTag<SVGElements.textPath, SVGElementTagNameMap['textPath']>;
    /**
     * The `<title>` element provides an accessible, short-text description of any SVG container element or graphics element.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
     */
    title: LSTag<SVGElements.title, SVGElementTagNameMap['title']>;
    /**
     * The SVG `<tspan>` element defines a subtext within a `<text>` element or another `<tspan>` element. It allows for adjustment of the style and/or position of that subtext as needed.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan
     */
    tspan: LSTag<SVGElements.tspan, SVGElementTagNameMap['tspan']>;
    /**
     * The `<use>` element takes nodes from within the SVG document, and duplicates them somewhere else.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
     */
    use: LSTag<SVGElements.use, SVGElementTagNameMap['use']>;
    /**
     * A view is a defined way to view the image, like a zoom level or a detail view.
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view
     */
    view: LSTag<SVGElements.view, SVGElementTagNameMap['view']>;
}
