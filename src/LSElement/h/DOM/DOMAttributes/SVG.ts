import { SvgPropertiesHyphen } from "csstype";
import { AllAttributes } from "./AllAttributes";
import { AriaAttributes } from "./AriaAttributes";
import { AllRoles } from "./Roles";
import { Length, Type } from "./types";
import { GetRoles, GetType, GetValues, GetXY } from "./Utils";

export type SVGCoreAttributes = Pick<AllAttributes, 'id' | 'lang' | 'tabindex' | 'xml:base' | 'xml:lang'>;
export type SVGStylingAttributes = Pick<AllAttributes, 'style' | 'class'>;
export type SVGConditionalProcessingAttributes = Pick<AllAttributes, 'requiredExtensions' | 'systemLanguage'>;
export type SVGPresentationAttributes = SvgPropertiesHyphen;
export type SVGFilterPrimitiveAttributes<T = Length> = Pick<AllAttributes, 'height' | 'result' | 'width'> & GetXY<T>;
export type SVGTransferFunctionAttributes<T extends keyof Type> = GetType<T> & Pick<AllAttributes, 'tableValues' | 'intercept' | 'amplitude' | 'exponent'>// | 'offset' TODO: Investigar
export type SVGAnimationTargetElementAttributes = Pick<AllAttributes, 'href'>;
export type SVGAnimationAttributeTargetAttributes = Pick<AllAttributes, 'attributeName'>;
export type SVGAnimationTimingAttributes = Pick<AllAttributes, 'begin' | 'dur' | 'end' | 'min' | 'max' | 'restart' | 'repeatCount' | 'repeatDur' | 'fill'>;
export type SVGAnimationAdditionAttributes = Pick<AllAttributes, 'additive' | 'accumulate'>;
export type SVGAnimationValueAttributes<T = string> = Pick<AllAttributes, 'calcMode' | 'keyTimes' | 'keySplines' | 'from' | 'to' | 'by'> & GetValues<T>;//| 'autoReverse' | 'accelerate' | 'decelerate' TODO: Investigar
export type SVGAriaAttributes<T extends AllRoles = AllRoles> = AriaAttributes & GetRoles<T>;
//Values should be defined in each element https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/values
export type SVGGenericAttributes = SVGCoreAttributes & SVGStylingAttributes;
export type SVGFiltersAttributes<T extends keyof Type, Y = Length> = SVGFilterPrimitiveAttributes<Y> & SVGTransferFunctionAttributes<T>;
export type SVGAnimationAttributes = SVGAnimationTargetElementAttributes & SVGAnimationAttributeTargetAttributes & SVGAnimationTimingAttributes & SVGAnimationValueAttributes & SVGAnimationAdditionAttributes;