const boss = document.getElementById('boss');
const healthBar = document.getElementById('health-bar');
const status = document.getElementById('status');
const timerDisplay = document.getElementById('timer');

const bosses = [
    { health: 100, image: '../img/jjj.png', timeLimit: 20 },
    { health: 200, image: '../img/1123.png', timeLimit: 15 },
    { health: 250, image: '../img/11212.png', timeLimit: 10 }
];

let currentBossIndex = 0;
let bossHealth = bosses[currentBossIndex].health;
let timer = null;
let timeLeft = bosses[currentBossIndex].timeLimit;

function updateBoss() {
    bossHealth = bosses[currentBossIndex].health;
    timeLeft = bosses[currentBossIndex].timeLimit;
    healthBar.style.width = '100%';
    boss.style.backgroundImage = `url(${bosses[currentBossIndex].image})`;
    status.textContent = `보스를 클릭하여 체력을 제거하세요! 현재 보스 체력: ${bossHealth}`;
    timerDisplay.textContent = `남은 시간: ${timeLeft}초`;
    boss.style.display = 'flex';

    startTimer();
}

function startTimer() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `남은 시간: ${timeLeft}초`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    status.textContent = '게임 오버! 보스를 물리치지 못했습니다.';
    boss.style.display = 'none';
    timerDisplay.textContent = '';
}

boss.addEventListener('click', () => {
    if (currentBossIndex >= bosses.length) return;

    bossHealth -= 10;
    if (bossHealth <= 0) {
        bossHealth = 0;
        healthBar.style.width = '0%';
        boss.style.display = 'none';
        clearInterval(timer);

        currentBossIndex++;

        if (currentBossIndex < bosses.length) {
            setTimeout(() => {
                updateBoss();
            }, 1000);
        } else {
            status.textContent = '축하합니다! 모든 보스를 물리쳤습니다!';
            timerDisplay.textContent = '';
        }
    } else {
        healthBar.style.width = `${(bossHealth / bosses[currentBossIndex].health) * 100}%`;
        status.textContent = `보스를 공격 중... 체력: ${bossHealth}`;
    }

    boss.style.transform = 'scale(1.1)';
    setTimeout(() => {
        boss.style.transform = 'scale(1)';
    }, 100);
});

updateBoss();
