const box = document.querySelector('.box');
const hoop = document.getElementById('hoop');
const h1 = document.querySelector('h1');
const timerDisplay = document.getElementById('timer');
const teamAPoints = document.getElementById('teamAPoints');
const resetButton = document.getElementById('resetButton');

let startX, startY, endX, endY, isDragging = false;
let scoreA = 0;
let timeLeft = 15;
let countdown;

box.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        endX = e.clientX;
        endY = e.clientY;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        shootBall();
    }
});

function startCountdown() {
    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

function endGame() {
    h1.innerHTML = 'Game over! Time out!';
    box.style.pointerEvents = 'none';
    resetButton.style.display = 'block';
}

function shootBall() {
    const dx = endX - startX;
    const dy = endY - startY;
    box.style.transition = "transform 0.5s";
    box.style.transform = `translate(${dx}px, ${dy}px)`;

    setTimeout(() => {
        checkScore();
        box.style.transition = "transform 0s";
        box.style.transform = "translateX(-50%)";
    }, 500);
}

function moveHoop() {
    hoop.style.transition = "all 1s linear";
    hoop.style.left = `${Math.random() * 80}%`;
}

function checkScore() {
    const boxRect = box.getBoundingClientRect();
    const hoopRect = hoop.getBoundingClientRect();

    if (
        boxRect.left < hoopRect.right &&
        boxRect.right > hoopRect.left &&
        boxRect.top < hoopRect.bottom &&
        boxRect.bottom > hoopRect.top
    ) {
        scoreA += 2;
        updateScore(teamAPoints, scoreA);
        h1.innerHTML = 'Scoring success!';

        if (scoreA >= 4) moveHoop(); 

        if (scoreA >= 12) {
            clearInterval(countdown);
            h1.innerHTML = '승리! 목표 점수 도달!';
            resetButton.style.display = 'block';
        }
    } else {
        h1.innerHTML = 'Failed to score!';
    }
}

function updateScore(element, score) {
    element.innerHTML = score;  
}

resetButton.addEventListener('click', () => {
    scoreA = 0;
    timeLeft = 15;
    updateScore(teamAPoints, scoreA);
    timerDisplay.innerHTML = "00:15";
    h1.innerHTML = '사이버펑크 슬램덩크 액션!';
    box.style.pointerEvents = 'auto';
    resetButton.style.display = 'none';
    startCountdown();
});

startCountdown();
