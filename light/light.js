const subtitleDark = document.querySelector('.subtitle-dark');
const darkOverlay = document.querySelector('.dark-overlay');
const lights = document.querySelectorAll('.light');
const highlight = document.getElementById('highlight');
const content = document.querySelector('.content');
const clickCountDisplay = document.getElementById('click-count');
const completeMessage = document.getElementById('complete-message');
let clickCount = 0;

// 각 빛 클릭 이벤트
lights.forEach(light => {
    light.addEventListener('click', function () {
        const comment = light.getAttribute('data-comment');
        darkOverlay.style.display = 'block';
        subtitleDark.textContent = comment; // 자막 변경
        subtitleDark.style.display = 'block';
        clickCount++;
        clickCountDisplay.textContent = clickCount; // 클릭 카운트 업데이트

        light.style.display = 'none'; // 선택한 빛 숨기기

        setTimeout(() => {
            darkOverlay.style.display = 'none';
            subtitleDark.style.display = 'none';

            // 모든 빛을 찾았는지 확인
            if (clickCount === lights.length) {
                document.body.style.animation = "background-glow 3s infinite"; // 배경 애니메이션 추가
                darkOverlay.style.display = 'block'; // 어두운 배경 표시
                completeMessage.style.display = 'block';
                spawnNewLights(); // 새로운 빛 생성
            }
        }, 2000);
    });
});

// 새로운 빛 생성 함수
function spawnNewLights() {
    for (let i = 0; i < 6; i++) {
        const newLight = document.createElement('div');
        newLight.classList.add('new-light');
        const randomX = Math.random() * 736; // 랜덤 X 위치
        const randomY = Math.random() * 426; // 랜덤 Y 위치
        newLight.style.left = `${randomX}px`;
        newLight.style.top = `${randomY}px`;
        content.appendChild(newLight);
    }
}

// 마우스 움직임 이벤트
document.addEventListener('mousemove', function (e) {
    const rect = content.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // 콘텐츠 내 상대 X 좌표
    const mouseY = e.clientY - rect.top;  // 콘텐츠 내 상대 Y 좌표

    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        // 하이라이트 표시
        highlight.style.left = `${e.clientX}px`;
        highlight.style.top = `${e.clientY}px`;
        highlight.style.display = 'block';
    } else {
        // 하이라이트 숨기기
        highlight.style.display = 'none';
    }
});
