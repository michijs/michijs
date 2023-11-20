import { TypedMouseEvent } from "./TypedMouseEvent";
export interface TypedPointerEvent<T> extends TypedMouseEvent<T> {
    readonly height: number;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: "mouse" | "pen" | "touch";
    readonly pressure: number;
    readonly tangentialPressure: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly twist: number;
    readonly width: number;
    getCoalescedEvents(): PointerEvent[];
    getPredictedEvents(): PointerEvent[];
}
