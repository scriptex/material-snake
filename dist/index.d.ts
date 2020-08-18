import { TouchSweep } from './touchswipe.js';
export interface Point {
    x: number;
    y: number;
}
export interface IndexedList<T> {
    [key: string]: T;
}
export declare class Snake {
    touchSwipeInstance: TouchSweep;
    private width;
    private height;
    private storageKey;
    private score;
    private bestScore;
    private currentScore;
    private footerHeight;
    private canvas;
    private context;
    private snakePositionX;
    private snakePositionY;
    private velocityX;
    private velocityY;
    private gridSize;
    private tileCountX;
    private tileCountY;
    private foodPositionX;
    private foodPositionY;
    private trail;
    private tail;
    constructor();
    private resize;
    private init;
    private start;
    private play;
    private move;
    private drawBoard;
    private drawSnake;
    private drawFood;
    private setScore;
    private bindEvents;
    private bindKeyboardEvents;
    private bindTouchEvents;
    private respondToGesture;
}
export declare const instance: Snake;
export declare const isLocalhost: boolean;
