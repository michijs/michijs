// Hexagonal Architecture Entry Point for MichiJS

// Note: Bootstrap is removed - adapters should be registered explicitly by the user

// Domain exports
export { Observable } from "./domain/reactive/Observable";
export { ObservableWithValue } from "./domain/reactive/ObservableWithValue";
export { PrimitiveValue } from "./domain/reactive/PrimitiveValue";
export { RouterDomain } from "./domain/routing/Router";

// Application exports
export { useObserve, useStorage, useTitle } from "./application/hooks/reactive";
export { jsx, jsxs } from "./application/jsx/runtime";

// Infrastructure exports (for custom adapters)
export { container } from "./shared/di/container";
export type { Adapters } from "./shared/di/container";

// Port interfaces (for implementing custom adapters)
export type { DOMPort } from "./ports/dom.port";
export type { StoragePort } from "./ports/storage.port";
export type { BrowserPort } from "./ports/browser.port";
export type { EventsPort } from "./ports/events.port";
export type { StylingPort } from "./ports/styling.port";

// Shared utilities
export * from "./shared/utils";
