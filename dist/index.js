class Snake {
    constructor() {
        this.init = () => {
            this.bind();
            this.start();
        };
        this.start = () => {
            setInterval(this.play, 1000 / 12);
        };
        this.play = () => {
            this.move();
            this.drawBoard();
            this.drawSnake();
            this.drawFood();
            this.setScore();
        };
        this.move = () => {
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
        this.drawBoard = () => {
            this.context.fillStyle = '#546e7a';
            this.context.fillRect(0, 0, this.width, this.height);
        };
        this.drawSnake = () => {
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
        this.drawFood = () => {
            if (this.foodPositionX === this.snakePositionX && this.foodPositionY === this.snakePositionY) {
                this.tail++;
                this.foodPositionX = Math.floor(Math.random() * this.tileCountX);
                this.foodPositionY = Math.floor(Math.random() * this.tileCountY);
            }
            this.context.fillStyle = 'red';
            this.context.fillRect(this.foodPositionX * this.gridSize, this.foodPositionY * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        };
        this.setScore = () => {
            const bestScore = localStorage.getItem(this.storageKey);
            const currentScore = this.tail - 5;
            this.currentScore.innerHTML = currentScore.toString();
            if (!bestScore) {
                localStorage.setItem(this.storageKey, currentScore.toString());
            }
            if (bestScore && currentScore > parseInt(bestScore, 10)) {
                localStorage.setItem(this.storageKey, currentScore.toString());
            }
            this.bestScore.innerHTML = localStorage.getItem(this.storageKey);
        };
        this.bind = () => {
            document.addEventListener('keydown', this.changeDirection);
        };
        this.changeDirection = (event) => {
            switch (event.keyCode) {
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
        const doc = document;
        const { innerWidth, innerHeight } = window;
        this.score = doc.querySelector('#score');
        this.footer = doc.querySelector('footer');
        this.bestScore = doc.querySelector('#best');
        this.currentScore = doc.querySelector('#current');
        this.width = innerWidth;
        this.height = innerHeight - this.score.offsetHeight - this.footer.offsetHeight;
        this.storageKey = 'material-snake-best-score';
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.setAttribute('width', this.width.toString());
        this.canvas.setAttribute('height', this.height.toString());
        this.canvas.width = this.width;
        this.canvas.height = this.height;
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
}
const instance = new Snake();
