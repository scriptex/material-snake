export interface TouchCoordinates {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export declare class TouchSweep {
    private coords;
    private element;
    private threshold;
    constructor(element?: HTMLElement, threshold?: number);
    unbind: () => void;
    private onStart;
    private onEnd;
    private bind;
    private getEventName;
    private dispatch;
}
