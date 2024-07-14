// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
const canvasSize = 400;
const gridCount = canvasSize / gridSize;

let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let powerUp = { x: null, y: null };
let score = 0;
let gameInterval;

document.addEventListener('keydown', changeDirection);
gameInterval = setInterval(updateGame, 100);

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over!');
        return;
    }
    if (checkFood()) {
        snake.push({});
        score += 10;
        updateScore();
        placeFood();
        if (Math.random() < 0.1) placePowerUp();
    }
    if (checkPowerUp()) {
        score += 50;
        updateScore();
        powerUp = { x: null, y: null };
    }
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    if (powerUp.x !== null && powerUp.y !== null) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(powerUp.x * gridSize, powerUp.y * gridSize, gridSize, gridSize);
    }
}

function moveSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }
    snake[0].x += snakeDirection.x;
    snake[0].y += snakeDirection.y;
    snake[0].x = (snake[0].x + gridCount) % gridCount;
    snake[0].y = (snake[0].y + gridCount) % gridCount;
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && snakeDirection.x === 0) {
        snakeDirection = { x: -1, y: 0 };
    } else if (key === 38 && snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: -1 };
    } else if (key === 39 && snakeDirection.x === 0) {
        snakeDirection = { x: 1, y: 0 };
    } else if (key === 40 && snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: 1 };
    }
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function checkFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function checkPowerUp() {
    return snake[0].x === powerUp.x && snake[0].y === powerUp.y;
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * gridCount),
        y: Math.floor(Math.random() * gridCount)
    };
}

function placePowerUp() {
    powerUp = {
        x: Math.floor(Math.random() * gridCount),
        y: Math.floor(Math.random() * gridCount)
    };
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}
