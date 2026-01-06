# MichiJS Agent Guidelines

This document provides guidelines for AI agents working on the MichiJS codebase, a TypeScript library for building Web Components using hexagonal architecture.

## Architecture Overview

MichiJS follows hexagonal architecture principles, separating business logic from infrastructure concerns:

- **Domain Layer**: Core reactive system, component lifecycle, routing logic
- **Application Layer**: Hook orchestration, JSX runtime coordination
- **Infrastructure Layer**: Browser API adapters (DOM, Storage, Events, Styling)
- **Ports**: Interfaces defining contracts between layers
- **Shared**: Cross-cutting utilities and types

## Build, Lint, and Test Commands

### Build Commands
- `bun run build` - Build the project and documentation
- `bun run dist` - Create distribution build
- `bun run dist-w` - Create distribution build with watch mode

### Test Commands
- `bun test` - Run all tests
- `bun run test-w` - Run tests in watch mode
- `bun run test-tsc` - Run TypeScript type checking
- `bun run test-tsc-w` - Run TypeScript type checking in watch mode
- `bun run e2e` - Run end-to-end tests (performance benchmarks)
- `bun run coverage` - Run tests with coverage reporting
- `bun run usnap` - Update test snapshots
- `bun run run-all-tests` - Run all test suites (TypeScript + unit tests + E2E)

### Single Test Execution
To run a specific test file, use:
```bash
bun test <path-to-test-file>
```
Example:
```bash
bun test src/michijs/css/useStyleSheet.spec.ts
```

## TypeScript Configuration

### Compiler Options
- **Target**: ESNext (modern JavaScript)
- **Module**: ESNext modules
- **JSX**: React JSX with custom import source (`@michijs/michijs`)
- **Strict Mode**: Enabled with null checks and strict function types
- **Declaration Files**: Generated automatically
- **Module Resolution**: Bundler resolution
- **ES Modules**: Enforced with verbatim module syntax

### Key Settings
- No implicit `any` types allowed
- Strict null checking enabled
- Unchecked indexed access not allowed
- Isolated modules for better compilation performance
- Skip library checks for faster builds

### Path Mapping
- `@michijs/michijs/*` maps to `./src/*`
- `@michijs/michijs` maps to `./src/index`

## Linting and Formatting (Biome)

### Formatter Configuration
- **Indentation**: 2 spaces
- **Line Endings**: Auto-detected
- **Quote Style**: Double quotes preferred
- **Semicolons**: Required
- **Trailing Commas**: ES5 style

### Linting Rules

#### Enabled Rules
- All recommended rules enabled
- Strict TypeScript checking
- Accessibility warnings (non-blocking)
- Self-closing elements required
- Unused imports must be removed automatically
- Non-null assertions are errors
- Default parameters must come last
- Enum initializers required
- Template literals without substitutions flagged

#### Disabled Rules
- No organize imports (handled manually)
- Various complexity rules disabled for flexibility:
  - `noForEach` - forEach allowed
  - `noBannedTypes` - banned types allowed
  - `useSimplifiedLogicExpression` - complex logic allowed
  - `noCommaOperator` - comma operator allowed
  - `noUselessLoneBlockStatements` - lone blocks allowed

#### Suspicious Patterns (Warnings)
- `noTsIgnore` - ts-ignore comments flagged
- `noEmptyInterface` - empty interfaces flagged
- `noExplicitAny` - explicit any types flagged
- `noAssignInExpressions` - assignments in expressions flagged

## Code Style Guidelines

### Imports
- Use ES6 import syntax exclusively
- Group imports by source:
  1. External libraries (e.g., `@michijs/michijs`)
  2. Local imports (relative paths)
  3. Type-only imports use `import type`
- No side-effect imports except for JSX types and global registrations

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase with `.tsx` extension
- **Utilities**: camelCase with `.ts` extension
- **Tests**: Same name as source with `.spec.ts`/`.spec.tsx` extension
- **Directories**: kebab-case

#### Variables and Functions
- **Constants**: SCREAMING_SNAKE_CASE
- **Functions**: camelCase
- **Classes**: PascalCase
- **Interfaces**: PascalCase with `I` prefix optional
- **Types**: PascalCase
- **Generic Type Parameters**: Single uppercase letters (T, U, K, V)

#### Custom Elements
- **Tag Names**: kebab-case (automatically converted)
- **Properties**: camelCase
- **Attributes**: kebab-case (reflected attributes)
- **Events**: camelCase (converted to lowercase)

### TypeScript Patterns

#### Observable Types
- Use `ObservableOrConst<T>` for reactive values
- Prefer `useObserve()` for creating observables
- Use `useComputedObserve()` for derived values

#### Component Props
```typescript
interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
}
```

#### Generic Constraints
```typescript
function processItems<T extends object>(items: T[]): T[] {
  // Implementation
}
```

### Error Handling
- Use try-catch blocks for synchronous operations
- Use promise catch/reject for asynchronous operations
- Prefer typed errors over generic Error
- Log errors appropriately without exposing sensitive information

### JSX Patterns

#### Component Structure
```tsx
export const MyComponent = createCustomElement("my-component", {
  reflectedAttributes: {
    value: "",
  },
  render() {
    return (
      <>
        {/* JSX content */}
      </>
    );
  },
});
```

#### Conditional Rendering
```tsx
{
  condition ? <Element /> : <Fallback />
}
// Or use If utility for complex conditions
```

#### Event Handlers
```tsx
<button onpointerup={handleClick}>Click me</button>
```

### CSS and Styling

#### Constructable Stylesheets
```typescript
const styles = useStyleSheet({
  ':host': {
    display: 'block',
  },
  '.button': {
    color: 'blue',
  },
});
```

#### CSS-in-JS Objects
- Use camelCase for CSS properties
- Vendor prefixes handled automatically
- Observable values supported in styles

### Testing Patterns

#### Test Structure
```typescript
import { describe, it, expect } from "bun:test";

describe("ComponentName", () => {
  it("should behave correctly", () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

#### Mocking and Setup
- Use Happy DOM for browser environment simulation
- Test components in isolation
- Mock external dependencies as needed

### Performance Considerations
- Use observables for reactive updates (avoid full re-renders)
- Leverage constructable stylesheets for CSS performance
- Minimize DOM operations in favor of direct property updates
- Use computed observables for derived state

### Security Best Practices
- Validate all user inputs
- Use trusted types for dynamic content
- Avoid innerHTML when possible
- Sanitize data before rendering
- No secrets or credentials in source code

## Hexagonal Architecture Structure

```
src/
├── domain/                    # Core Business Logic (Pure, Testable)
│   ├── reactive/             # Observable system & reactivity engine
│   ├── component/            # Component lifecycle & composition logic
│   ├── routing/              # Route matching & navigation logic
│   └── i18n/                 # Translation resolution & formatting
├── application/              # Application Orchestration (Use Cases)
│   ├── hooks/                # Hook coordination & lifecycle management
│   ├── jsx/                  # JSX runtime & templating orchestration
│   └── components/           # Component composition & rendering logic
├── infrastructure/           # External Concerns & Adapters
│   ├── dom/                  # DOM manipulation implementations
│   ├── storage/              # Storage adapter implementations
│   ├── events/               # Event system implementations
│   ├── styling/              # CSS constructable stylesheet implementations
│   ├── browser/              # Browser API implementations
│   └── polyfills/            # Browser compatibility implementations
├── ports/                    # Interfaces & Contracts
│   ├── storage.port.ts       # Storage interface definitions
│   ├── dom.port.ts           # DOM interface definitions
│   ├── events.port.ts        # Event interface definitions
│   ├── browser.port.ts       # Browser API interface definitions
│   └── styling.port.ts       # Styling interface definitions
├── shared/                   # Cross-cutting Concerns
│   ├── types/                # Shared type definitions
│   ├── utils/                # Pure utility functions
│   └── constants/            # Application constants
├── jsx-runtime.tsx           # Main JSX exports
├── jsx-dev-runtime.tsx       # Dev JSX exports
└── index.tsx                 # Main library exports
```

## Dependency Injection

The hexagonal architecture uses dependency injection to provide infrastructure adapters:

```typescript
import { container } from './shared/di/container';

// Register custom adapters if needed
container.register('dom', new CustomDOMAdapter());
container.register('storage', new CustomStorageAdapter());
```

## Port Interfaces

All external dependencies are abstracted through port interfaces:

- **StoragePort**: localStorage, sessionStorage, IndexedDB operations
- **DOMPort**: DOM manipulation operations
- **BrowserPort**: Browser API operations (History, Location, etc.)
- **EventsPort**: Event creation and dispatching
- **StylingPort**: CSS constructable stylesheets

### File Organization (Legacy)
```
src/
├── michijs/
│   ├── classes/          # Core classes and utilities
│   ├── components/       # Reusable components
│   ├── css/             # Styling utilities
│   ├── customElements/  # Custom element definitions
│   ├── DOM/             # DOM manipulation utilities
│   ├── hooks/           # React-style hooks
│   ├── polyfill/        # Browser polyfills
│   ├── utils/           # General utilities
│   └── types.ts         # TypeScript type definitions
├── jsx-runtime.tsx      # JSX runtime
└── index.tsx           # Main exports
```