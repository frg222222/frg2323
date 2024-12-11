const wrap = document.getElementById('wrap');
const message = document.getElementById('message');
const progress = document.getElementById('progress');

const cards = ['A', 'B', 'C', 'D', 'E', 'F'];
const shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let matchedCount = 0;

shuffledCards.forEach((value) => {
    const card = document.createElement('li');
    card.className = 'flip';
    card.innerHTML = `
        <div class="front"></div>
        <div class="back">${value}</div>
    `;
    card.dataset.value = value;
    card.addEventListener('click', () => handleCardClick(card));
    wrap.appendChild(card);
});

function handleCardClick(card) {
    if (card.classList.contains('flipped') || (firstCard && secondCard)) return;

    card.classList.add('clicked');
    setTimeout(() => card.classList.remove('clicked'), 200);

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        matchedCount += 2;
        updateProgress();
        firstCard = null;
        secondCard = null;

        if (matchedCount === shuffledCards.length) {
            message.textContent = '🎉 You matched all the cards! 🎉';
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

function updateProgress() {
    progress.textContent = `Matched: ${matchedCount} / ${shuffledCards.length}`;
}
