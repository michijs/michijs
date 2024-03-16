import type { TypedEvent } from "./TypedEvent";
export interface TypedSecurityPolicyViolationEvent<T> extends TypedEvent<T> {
  readonly blockedURI: string;
  readonly columnNumber: number;
  readonly disposition: SecurityPolicyViolationEventDisposition;
  readonly documentURI: string;
  readonly effectiveDirective: string;
  readonly lineNumber: number;
  readonly originalPolicy: string;
  readonly referrer: string;
  readonly sample: string;
  readonly sourceFile: string;
  readonly statusCode: number;
  readonly violatedDirective: string;
}
