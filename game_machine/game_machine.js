const character = document.querySelector('.character');
const stop = document.querySelector('.stop');
const restart = document.querySelector('.restart');

stop.addEventListener('click', () => {
    character.style.animationPlayState = 'paused';
});

restart.addEventListener('click', () => {
    character.style.animationPlayState = 'running';
});
