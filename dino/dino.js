var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var restartButton = document.getElementById('restart');
var gameOverMessage = document.getElementById('game-over-message');

canvas.width = 800;
canvas.height = 400;

var dino = {
    x: 50,
    y: canvas.height - 150,
    width: 70,
    height: 70,
    frameX: 0,
    frameCount: 6,
    spriteWidth: 5103 / 6,
    spriteHeight: 853,
    draw() {
        ctx.drawImage(
            img1,
            this.spriteWidth * this.frameX,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );

        if (timer % 10 === 0) {
            this.frameX = (this.frameX + 1) % this.frameCount;
        }
    }
};

class Cactus {
    constructor() {
        this.x = canvas.width + Math.random() * 500;
        this.y = canvas.height - 110;
        this.width = 50;
        this.height = 70;
    }
    draw() {
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }
}

var img1 = new Image();
var img2 = new Image();
img1.src = '../img/QQEE.png';
img2.src = '../img/qqww.png';

var timer = 0;
var cactusList = [];
var jumpTimer = 0;
var animation;
var jump = false;
var isGameOver = false;
var cactusSpeed = 3;

function move() {
    animation = requestAnimationFrame(move);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameOver) return;

    timer++;

    if (timer % (200 - Math.min(Math.floor(timer / 300), 50)) === 0) {
        var cactus = new Cactus();
        cactusList.push(cactus);
    }

    cactusList.forEach((cactus, i, o) => {
        if (cactus.x < 0) {
            o.splice(i, 1);
        }
        crash(dino, cactus);

        cactus.x -= cactusSpeed;
        cactus.draw();
    });

    if (timer % 500 === 0) {
        cactusSpeed += 0.1;
    }

    if (jump) {
        dino.y -= 5;
        jumpTimer++;
    } else {
        if (dino.y < canvas.height - dino.height - 30) {
            dino.y += 4;
        }
    }

    if (jumpTimer > 40) {
        jump = false;
        jumpTimer = 0;
    }

    dino.draw();
}

function crash(dino, cactus) {
    var xCalc = cactus.x + cactus.width / 2 - (dino.x + dino.width / 2);
    var yCalc = cactus.y + cactus.height / 2 - (dino.y + dino.height / 2);

    if (Math.abs(xCalc) < dino.width / 2 + cactus.width / 4 && Math.abs(yCalc) < dino.height / 2 + cactus.height / 4) {
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(animation);
    restartButton.style.display = 'block';
    gameOverMessage.style.display = 'block';
}

function resetGame() {
    timer = 0;
    cactusList = [];
    jumpTimer = 0;
    jump = false;
    isGameOver = false;
    dino.y = canvas.height - 150;
    restartButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    cactusSpeed = 3;
    move();
}

restartButton.addEventListener('click', resetGame);

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isGameOver) {
        jump = true;
    }
});

move();
