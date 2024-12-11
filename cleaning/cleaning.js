let score = 0;
let timeLeft = 30; // 기본 시간
let currentRound = 1; // 현재 라운드
let maxRounds = 3; // 최대 라운드
let timerInterval;

// 게임 시작 함수
function startGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ''; // 초기화
    score = 0;
    timeLeft = 30;
    currentRound = 1;

    document.getElementById('score').textContent = score;
    document.getElementById('time-left').textContent = timeLeft;

    // 타이머 초기화
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    startRound(); // 첫 라운드 시작
}

// 라운드 시작 함수
function startRound() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    const itemCount = currentRound * 5; // 라운드당 먼지 수 증가

    spawnItems(gameArea, itemCount);
}

// 타이머 업데이트 함수
function updateTimer() {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;

    const progressBar = document.getElementById('timer-progress');
    const percentage = (timeLeft / 30) * 100;
    progressBar.style.width = percentage + '%';

    if (timeLeft <= 0) {
        clearInterval(timerInterval);

        // 현재 라운드 성공 여부 확인
        if (document.querySelectorAll('.item').length === 0) {
            if (currentRound < maxRounds) {
                currentRound++;
                timeLeft = 30; // 시간 초기화
                startRound();
            } else {
                alert(`게임 클리어! 최종 점수: ${score}`);
            }
        } else {
            alert(`게임 오버! 최종 점수: ${score}`);
        }
    }
}

// 아이템 생성 함수
function spawnItems(gameArea, itemCount) {
    const itemSize = 40;
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;

    for (let i = 0; i < itemCount; i++) {
        const item = document.createElement('div');
        item.classList.add('item');

        const leftPosition = Math.random() * (gameAreaWidth - itemSize);
        const topPosition = Math.random() * (gameAreaHeight - itemSize);

        item.style.left = `${leftPosition}px`;
        item.style.top = `${topPosition}px`;

        // 먼지 이미지 추가
        const imageChoice = Math.random() < 0.5 ? '../img/ii.png' : '../img/iii.png';
        item.style.backgroundImage = `url(${imageChoice})`;
        item.style.backgroundSize = 'cover';

        // 클릭 이벤트
        item.addEventListener('click', () => {
            score += 10;
            document.getElementById('score').textContent = score;
            item.remove();

            // 모든 먼지 제거 시 다음 라운드로 이동
            if (document.querySelectorAll('.item').length === 0 && currentRound < maxRounds) {
                currentRound++;
                timeLeft = 30;
                startRound();
            } else if (document.querySelectorAll('.item').length === 0 && currentRound === maxRounds) {
                clearInterval(timerInterval);
                alert(`게임 클리어! 최종 점수: ${score}`);
            }
        });

        gameArea.appendChild(item);
    }
}
