interface Point {
    x: number;
    y: number;
}
declare class Snake {
    private width;
    private height;
    private storageKey;
    private score;
    private footer;
    private bestScore;
    private currentScore;
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
    private init;
    private start;
    private play;
    private move;
    private drawBoard;
    private drawSnake;
    private drawFood;
    private setScore;
    private bind;
    private changeDirection;
}
declare const instance: Snake;
