const scoreElement = document.querySelector('.score');
const levelElement = document.querySelector('.level');
const timerElement = document.querySelector('#time');
const messageElement = document.querySelector('.message');
const startButton = document.querySelector('#startButton');

let score = 0;
let timeLeft = 20;
let level = 1;
let gameOver = false;
let gameStarted = false;
let timer;

const monsterImages = [
    '../img/12312.png',
    '../img/11q.png',
    '../img/12q.png',
    '../img/13q.png',
    '../img/14q.png',
    '../img/15q.png'
];

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0 && !gameOver) {
            timeLeft--;
            timerElement.textContent = timeLeft;
        } else if (timeLeft === 0) {
            endGame("You Win!", "blue");
        }
    }, 1000);
}

function increaseScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;

    if (score % 10 === 0) {
        level++;
        levelElement.textContent = `Level: ${level}`;
    }
}

function createMonster() {
    if (gameOver) return;

    const monster = document.createElement('div');
    monster.classList.add('monster');

    const size = Math.random() * (150 - 50) + 50;
    const randomImage = monsterImages[Math.floor(Math.random() * monsterImages.length)];

    monster.style.width = `${size}px`;
    monster.style.height = `${size}px`;
    monster.style.backgroundImage = `url(${randomImage})`;
    monster.style.left = `${Math.random() * (window.innerWidth - size)}px`;
    monster.style.top = `${Math.random() * (window.innerHeight - size)}px`;

    monster.addEventListener('click', () => {
        increaseScore();
        monster.remove();
    });

    document.body.appendChild(monster);
    setTimeout(() => monster.remove(), 3000);
}

function endGame(message, color) {
    clearInterval(timer);
    gameOver = true;
    messageElement.textContent = message;
    messageElement.style.color = color;
}

startButton.addEventListener('click', () => {
    if (gameStarted) return;

    gameStarted = true;
    startButton.disabled = true;
    startTimer();

    setInterval(createMonster, 1000);
});
