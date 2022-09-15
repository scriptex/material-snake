import TouchSweep from 'touchsweep';

type Point = Record<'x' | 'y', number>;
type IndexedList<T> = Record<string, T>;

export class Snake {
	public touchSwipeInstance: TouchSweep | void = undefined;

	private width: number = 0;
	private height: number = 0;

	private storageKey: string;

	private score: HTMLElement;
	private bestScore: HTMLElement;
	private currentScore: HTMLElement;
	private footerHeight: number = 77;

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	private snakePositionX: number;
	private snakePositionY: number;

	private velocityX: number;
	private velocityY: number;

	private gridSize: number;

	private tileCountX: number;
	private tileCountY: number;

	private foodPositionX: number;
	private foodPositionY: number;

	private trail: Point[];
	private tail: number;

	constructor() {
		const doc: Document = document;

		this.score = doc.querySelector('#score') as HTMLElement;
		this.bestScore = doc.querySelector('#best') as HTMLElement;
		this.currentScore = doc.querySelector('#current') as HTMLElement;

		this.storageKey = 'material-snake-best-score';

		this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.resize();

		this.snakePositionX = this.snakePositionY = 10;

		this.velocityX = this.velocityY = 0;

		this.gridSize = 20;

		this.tileCountX = Math.round(this.width / 20);
		this.tileCountY = Math.round(this.height / 20);

		this.foodPositionX = this.foodPositionY = 15;

		this.trail = [];
		this.tail = 5;

		this.init();
	}

	private resize = (): void => {
		const { innerWidth, innerHeight } = window;

		this.width = innerWidth;
		this.height = innerHeight - this.score.offsetHeight - this.footerHeight;

		this.canvas.setAttribute('width', this.width.toString());
		this.canvas.setAttribute('height', this.height.toString());

		this.canvas.width = this.width;
		this.canvas.height = this.height;
	};

	private init = (): void => {
		this.bindEvents();
		this.start();
		this.resize();
	};

	private start = (): void => {
		setInterval(this.play, 1000 / 12);
	};

	private play = (): void => {
		this.move();
		this.drawBoard();
		this.drawSnake();
		this.drawFood();
		this.setScore();
	};

	private move = (): void => {
		this.snakePositionX += this.velocityX;
		this.snakePositionY += this.velocityY;

		if (this.snakePositionX < 0) {
			this.snakePositionX = this.tileCountX - 1;
		}

		if (this.snakePositionX > this.tileCountX - 1) {
			this.snakePositionX = 0;
		}

		if (this.snakePositionY < 0) {
			this.snakePositionY = this.tileCountY - 1;
		}

		if (this.snakePositionY > this.tileCountY - 1) {
			this.snakePositionY = 0;
		}
	};

	private drawBoard = (): void => {
		this.context.fillStyle = '#546e7a';
		this.context.fillRect(0, 0, this.width, this.height);
	};

	private drawSnake = (): void => {
		this.context.fillStyle = 'lime';

		for (const item of this.trail) {
			this.context.fillRect(item.x * this.gridSize, item.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);

			if (item.x === this.snakePositionX && item.y === this.snakePositionY) {
				this.tail = 5;
			}
		}

		this.trail.push({ x: this.snakePositionX, y: this.snakePositionY });

		while (this.trail.length > this.tail) {
			this.trail.shift();
		}
	};

	private drawFood = (): void => {
		if (this.foodPositionX === this.snakePositionX && this.foodPositionY === this.snakePositionY) {
			this.tail++;
			this.foodPositionX = Math.floor(Math.random() * this.tileCountX);
			this.foodPositionY = Math.floor(Math.random() * this.tileCountY);
		}

		this.context.fillStyle = 'red';
		this.context.fillRect(
			this.foodPositionX * this.gridSize,
			this.foodPositionY * this.gridSize,
			this.gridSize - 2,
			this.gridSize - 2
		);
	};

	private setScore = (): void => {
		const bestScore: string = localStorage.getItem(this.storageKey) || '';
		const currentScore: number = this.tail - 5;

		this.currentScore.innerHTML = currentScore.toString();

		if (!bestScore) {
			localStorage.setItem(this.storageKey, currentScore.toString());
		}

		if (bestScore && currentScore > parseInt(bestScore, 10)) {
			localStorage.setItem(this.storageKey, currentScore.toString());
		}

		this.bestScore.innerHTML = localStorage.getItem(this.storageKey) || '';
	};

	private bindEvents = (): void => {
		document.addEventListener('keydown', this.bindKeyboardEvents);

		this.bindTouchEvents();

		window.addEventListener('resize', () => {
			this.resize();
			this.drawBoard();
		});
	};

	private bindKeyboardEvents = (event: KeyboardEvent): void => {
		this.respondToGesture(event.keyCode);
	};

	private bindTouchEvents = (): void => {
		const board: HTMLCanvasElement = this.canvas;
		const touchEvents: IndexedList<number> = {
			swipeleft: 37,
			swipeup: 38,
			swiperight: 39,
			swipedown: 40
		};

		this.touchSwipeInstance = new TouchSweep(board);

		Object.keys(touchEvents).forEach((name: string): void => {
			board.addEventListener(name, (event: any): void => {
				this.respondToGesture(touchEvents[event.detail.eventName]);
			});
		});
	};

	private respondToGesture = (keyCode: number): void => {
		switch (keyCode) {
			case 37:
				this.velocityX = -1;
				this.velocityY = 0;
				break;
			case 38:
				this.velocityX = 0;
				this.velocityY = -1;
				break;
			case 39:
				this.velocityX = 1;
				this.velocityY = 0;
				break;
			case 40:
				this.velocityX = 0;
				this.velocityY = 1;
				break;
		}
	};
}
