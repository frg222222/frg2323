var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

var rect1 = { x: 10, y: 50, width: 70, height: 70, dx: 5, dy: 5, img: new Image(), draw() { ctx.drawImage(this.img, this.x, this.y, this.width, this.height); } };
rect1.img.src = '../img/xx.png';

var rect2 = { x: 100, y: 100, width: 52, height: 52, dx: 3, dy: 3, img: new Image(), draw() { ctx.drawImage(this.img, this.x, this.y, this.width, this.height); } };
rect2.img.src = '../img/zz.png';

var player = { x: canvas.width / 2, y: canvas.height / 2, img: new Image(), width: 230, height: 120, draw() { ctx.shadowColor = "rgba(0, 255, 255, 0.8)"; ctx.shadowBlur = 30; ctx.drawImage(this.img, this.x - this.width * 0.225, this.y - this.height * 0.225, this.width * 0.45, this.height * 0.45); ctx.shadowColor = "transparent"; } };
player.img.src = '../img/qqqq.png';

canvas.addEventListener("mousemove", function (e) {
    if (gameStarted) { player.x = e.clientX; player.y = e.clientY; }
});

function isCollision(rect, player) {
    var distX = Math.abs(player.x - (rect.x + rect.width / 2));
    var distY = Math.abs(player.y - (rect.y + rect.height / 2));
    return distX <= rect.width / 2 + player.width * 0.3 && distY <= rect.height / 2 + player.height * 0.3;
}

var gameStarted = false, gameLoopId, startTime, timerInterval;
var timerDisplay = document.getElementById("timer");

function updateTimer() {
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var remaining = 25 - elapsed;
    if (remaining <= 0) {
        clearInterval(timerInterval);
        winGame();
    } else {
        timerDisplay.textContent = remaining;
    }
}

function move() {
    gameLoopId = requestAnimationFrame(move);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    [rect1, rect2].forEach(rect => {
        if (rect.x >= canvas.width - rect.width || rect.x <= 0) rect.dx *= -1;
        if (rect.y >= canvas.height - rect.height || rect.y <= 0) rect.dy *= -1;
        rect.x += rect.dx; rect.y += rect.dy; rect.draw();
    });

    player.draw();

    if (isCollision(rect1, player) || isCollision(rect2, player)) gameOver();
}

function gameOver() {
    cancelAnimationFrame(gameLoopId);
    clearInterval(timerInterval);
    document.getElementById("gameOver").style.display = "block";
}

function winGame() {
    cancelAnimationFrame(gameLoopId);
    clearInterval(timerInterval);
    document.getElementById("gameWin").style.display = "block";
}

window.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        if (!gameStarted) {
            gameStarted = true;
            startTime = Date.now();
            document.getElementById("startScreen").style.display = "none";
            timerDisplay.style.display = "block"; // 게임 시작 시 타이머 표시
            timerDisplay.textContent = "25";
            timerInterval = setInterval(updateTimer, 1000);
            move();
        } else {
            rect1.x = 10; rect1.y = 50; rect2.x = 100; rect2.y = 100;
            player.x = canvas.width / 2; player.y = canvas.height / 2;
            gameStarted = true;
            startTime = Date.now();
            document.getElementById("gameOver").style.display = "none";
            document.getElementById("gameWin").style.display = "none";
            timerDisplay.style.display = "block"; // 게임 재시작 시 타이머 표시
            timerDisplay.textContent = "25";
            timerInterval = setInterval(updateTimer, 1000);
            move();
        }
    }
});
