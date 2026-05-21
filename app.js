const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const timerLabel = document.getElementById('timer-label');
const sessionCounter = document.getElementById('session-counter');

const WORK_DURATION_SECONDS = 25 * 60;
const BREAK_DURATION_SECONDS = 5 * 60;
let remainingSeconds = WORK_DURATION_SECONDS;
let timerIntervalId = null;
const state = {
  isRunning: false,
  phase: 'work',
};

const phaseLabel = document.getElementById('phase-label');

function initApp() {
  bindEventListeners();
  updateTimerDisplay(remainingSeconds);
  updatePhaseDisplay();
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
  state.isRunning = true;
}

function pauseTimer() {
  if (timerIntervalId === null) {
    return;
  }

  clearInterval(timerIntervalId);
  timerIntervalId = null;
  state.isRunning = false;
}

function resetTimer() {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }

  remainingSeconds = WORK_DURATION_SECONDS;
  state.phase = 'work';
  state.isRunning = false;
  updatePhaseDisplay();
  updateTimerDisplay(remainingSeconds);
}

function switchMode(mode) {
  state.phase = mode;

  if (mode === 'work') {
    remainingSeconds = WORK_DURATION_SECONDS;
  } else {
    remainingSeconds = BREAK_DURATION_SECONDS;
  }

  updatePhaseDisplay();
  updateTimerDisplay(remainingSeconds);
}

function tick() {
  if (remainingSeconds <= 0) {
    return;
  }

  remainingSeconds -= 1;
  updateTimerDisplay(remainingSeconds);

  if (remainingSeconds === 0) {
    const nextPhase = state.phase === 'work' ? 'break' : 'work';
    switchMode(nextPhase);
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

function updatePhaseDisplay() {
  if (!phaseLabel) {
    return;
  }

  phaseLabel.textContent = state.phase === 'work' ? 'Work' : 'Break';
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
