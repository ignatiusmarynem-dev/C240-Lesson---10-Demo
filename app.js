const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const timerLabel = document.getElementById('timer-label');
const sessionCounter = document.getElementById('session-counter');

const WORK_DURATION_SECONDS = 25 * 60;
let remainingSeconds = WORK_DURATION_SECONDS;
let timerIntervalId = null;

function initApp() {
  bindEventListeners();
  updateTimerDisplay(remainingSeconds);
  updateSessionCounter();
}

function bindEventListeners() {
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);
}

function loadState() {
  // TODO: load persisted state from localStorage
}

function saveState() {
  // TODO: save current state to localStorage
}

function startTimer() {
  if (timerIntervalId !== null) {
    return;
  }

  timerIntervalId = setInterval(tick, 1000);
}

function pauseTimer() {
  // TODO: pause timer logic
}

function resetTimer() {
  // TODO: reset timer logic
}

function switchMode(mode) {
  // TODO: switch between work and break modes
}

function tick() {
  if (remainingSeconds <= 0) {
    return;
  }

  remainingSeconds -= 1;
  updateTimerDisplay(remainingSeconds);

  if (remainingSeconds === 0) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    console.log('work complete');
  }
}

function updateDisplay(minutes, seconds) {
  const formatted = formatTime(minutes * 60 + seconds);
  timerLabel.textContent = formatted;
}

function updateTimerDisplay(seconds) {
  timerLabel.textContent = formatTime(seconds);
}

function updateProgress(elapsedSeconds, totalSeconds) {
  // TODO: update circular progress visual
}

function updateSessionCounter() {
  sessionCounter.textContent = 'Sessions completed: 0';
}

function playTransitionSound() {
  // TODO: play sound on mode transition
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

initApp();
