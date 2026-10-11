const intro = document.getElementById('intro');
const celebration = document.getElementById('celebration');
const openButton = document.getElementById('openButton');
const replayButton = document.getElementById('replayButton');
const petalField = document.getElementById('petalField');

let petalTimer = null;
const petalSymbols = ['✿', '❀', '✾', '❁', '✧'];

function createPetal(initial = false) {
  if (document.hidden || !celebration.classList.contains('show')) return;
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  const duration = 8 + Math.random() * 7;
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${14 + Math.random() * 23}px`;
  petal.style.setProperty('--fall-time', `${duration}s`);
  petal.style.setProperty('--drift', `${Math.round(Math.random() * 180 - 90)}px`);
  if (initial) petal.style.animationDelay = `${Math.random() * 5}s`;
  petalField.appendChild(petal);
  window.setTimeout(() => petal.remove(), (duration + 6) * 1000);
}

function startPetals() {
  stopPetals();
  petalField.innerHTML = '';
  for (let i = 0; i < 22; i++) createPetal(true);
  petalTimer = window.setInterval(() => createPetal(), 650);
}

function stopPetals() {
  if (petalTimer) {
    window.clearInterval(petalTimer);
    petalTimer = null;
  }
}

function openGreeting() {
  intro.classList.add('hide');
  celebration.classList.add('show');
  celebration.setAttribute('aria-hidden', 'false');
  startPetals();
  window.setTimeout(() => document.getElementById('dedicatoria').focus?.(), 500);
}

function replayGreeting() {
  stopPetals();
  petalField.innerHTML = '';
  celebration.classList.remove('show');
  celebration.setAttribute('aria-hidden', 'true');
  intro.classList.remove('hide');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

openButton.addEventListener('click', openGreeting);
replayButton.addEventListener('click', replayGreeting);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopPetals();
  else if (celebration.classList.contains('show')) startPetals();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && celebration.classList.contains('show')) replayGreeting();
});
