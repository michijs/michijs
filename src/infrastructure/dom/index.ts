// JSX runtime
export * from "./jsx-runtime";
export * from "./jsx-runtime/generated/htmlType";

// Trusted types
export * from "./trusted-types";

// Routing
export * from "./routing";

// Custom elements
export * from "./custom-elements";
export { getMountPoint } from "./custom-elements/getMountPoint";
export { getShadowRoot } from "./custom-elements/getShadowRoot";
export { ElementInternals, type ElementInternalsProps } from "./custom-elements/components/ElementInternals";
export { Host } from "./custom-elements/components/Host";
export { Slot } from "./custom-elements/components/Slot";
export { defineEvent } from "./custom-elements/properties/defineEvent";
export { defineMethod } from "./custom-elements/properties/defineMethod";
export { definePropertyFromObservable } from "./custom-elements/properties/definePropertyFromObservable";
export { defineReflectedAttributes } from "./custom-elements/properties/defineReflectedAttributes";
export { isMichiCustomElement } from "./custom-elements/typewards/isMichiCustomElement";

// Rendering - core
export * from "./rendering/render";
export * from "./rendering/create";
export * from "./rendering/types";
export { VirtualFragment } from "./rendering/VirtualFragment";
export { AttributeManager, ElementFactory, ElementFactoryWithNamespace } from "./rendering/ElementFactory";
export { CloneFactory } from "./rendering/CloneFactory";
export { setAttribute } from "./rendering/setAttribute";
export { getAttributeValue } from "./rendering/getAttributeValue";
export { createTextElement } from "./rendering/createTextElement";
export { createObservableTextElement } from "./rendering/createObservableTextElement";
export { createTextNodeContentCallback } from "./rendering/createTextNodeContentCallback";
export { updateTextElement } from "./rendering/updateTextElement";
export { updateObservableTextElement } from "./rendering/updateObservableTextElement";
export { classJSXToObjectJSXElement } from "./rendering/classJSXToObjectJSXElement";

// Rendering - components
export * from "./rendering/components/AsyncComponent";
export * from "./rendering/components/Fragment";
export * from "./rendering/components/GenericElement";
export * from "./rendering/components/If";
export * from "./rendering/components/List";

// Rendering - typewards
export { isClassJSXElement } from "./rendering/typewards/isClassJSXElement";
export { isDOMElement } from "./rendering/typewards/isDOMElement";
export { isElement } from "./rendering/typewards/isElement";
export { isFragmentElement } from "./rendering/typewards/isFragmentElement";
export { isFunctionOrClassJSXElement } from "./rendering/typewards/isFunctionOrClassJSXElement";
export { isHTMLElement } from "./rendering/typewards/isHTMLElement";
export { isNotAPrimitiveJSX } from "./rendering/typewards/isNotAPrimitiveJSX";

// Styles - core
export * from "./styles/css";
export * from "./styles/types";
export { addStylesheetsToDocumentOrShadowRoot } from "./styles/addStylesheetsToDocumentOrShadowRoot";
export { cloneStylesheet } from "./styles/cloneStylesheet";
export { convertCssObjectToCssVariablesObject } from "./styles/convertCssObjectToCssVariablesObject";

// Styles - hooks
export * from "./styles/hooks/useStyleSheet";
export * from "./styles/hooks/useCssVariables";
export { useAnimation } from "./styles/hooks/useAnimation";
export { useTransition } from "./styles/hooks/useTransition";

// Styles - typewards
export { isCSSObject } from "./styles/typewards/isCSSObject";
export { isCSSVariable } from "./styles/typewards/isCSSVariable";

// Storage - types
export * from "./storage/types";

// Storage - entities
export { CookieStorage } from "./storage/entities/CookieStorage";

// Storage - hooks
export { useStorage } from "./storage/hooks/useStorage";
export { useIndexedDB } from "./storage/hooks/useIndexedDB";

// Storage - typewards
export { storageIsCookieStorage } from "./storage/typewards/storageIsCookieStorage";

// Routing
export { HistoryManager } from "./routing/entities/HistoryManager";
export { handleNavigation } from "./routing/entities/HistoryManager/handleNavigation";
export { LegacyHistoryManager } from "./routing/entities/HistoryManager/LegacyHistoryManager";
export { ModernHistoryManager } from "./routing/entities/HistoryManager/ModernHistoryManager";
export { Router } from "./routing/components/Router";
export { Redirect, type RedirectProps } from "./routing/components/Redirect";
export { Title, type TitleProps } from "./routing/components/Title";
export { useTitle } from "./routing/hooks/useTitle";
export { useHash } from "./routing/hooks/useHash";
export { useSearchParams } from "./routing/hooks/useSearchParams";

// Polyfills (internal)
export { createBuiltInElement } from "./polyfills";

// Global type augmentations (side-effect imports)
import "./jsx-runtime/generated/JSX";

export { ElementArrayTarget } from "./entities/ElementArrayTarget";
export { ElementProxiedArrayTarget } from "./entities/ElementProxiedArrayTarget";