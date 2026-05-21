const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const resetSessionsButton = document.getElementById('reset-sessions-button');
const timerLabel = document.getElementById('timer-label');
const sessionCounter = document.getElementById('session-counter');

const WORK_DURATION_SECONDS = 25 * 60;
const BREAK_DURATION_SECONDS = 5 * 60;
let remainingSeconds = WORK_DURATION_SECONDS;
let timerIntervalId = null;
let audioContext = null;
let completedSessions = 0;
const state = {
  isRunning: false,
  phase: 'work',
};

const phaseLabel = document.getElementById('phase-label');

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  return audioContext;
}

function initApp() {
  bindEventListeners();
  loadSessionCount();
  updateTimerDisplay(remainingSeconds);
  updatePhaseDisplay();
  updateSessionCounter();
}

function bindEventListeners() {
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);
  resetSessionsButton.addEventListener('click', resetSessions);
}

function loadSessionCount() {
  const stored = localStorage.getItem('pomodoroSessions');
  const parsed = parseInt(stored, 10);
  completedSessions = Number.isNaN(parsed) ? 0 : parsed;
}

function saveSessionCount() {
  localStorage.setItem('pomodoroSessions', String(completedSessions));
}

function startTimer() {
  if (timerIntervalId !== null) {
    return;
  }

  getAudioContext();
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

function resetSessions() {
  completedSessions = 0;
  saveSessionCount();
  updateSessionCounter();
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
    if (state.phase === 'work') {
      completedSessions += 1;
      saveSessionCount();
      updateSessionCounter();
    }
    switchMode(nextPhase);
    playTransitionSound(nextPhase);
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
  sessionCounter.textContent = `Sessions: ${completedSessions}`;
}

function updatePhaseDisplay() {
  if (!phaseLabel) {
    return;
  }

  phaseLabel.textContent = state.phase === 'work' ? 'Work' : 'Break';
}

function playTransitionSound(phase) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const frequency = phase === 'break' ? 440 : 660;
  const duration = 0.2;
  const now = ctx.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
  };
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

initApp();
