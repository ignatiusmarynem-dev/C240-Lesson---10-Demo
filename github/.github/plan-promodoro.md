## File Responsibilities

- `index.html`
  - Defines the app structure: timer display, circular progress container, controls, session counter, and audio source.
  - Holds semantic markup so the JavaScript can query elements and the CSS can style the layout.

- `style.css`
  - Styles the Pomodoro UI with a centered layout, circular progress visualization, and responsive button states.
  - Implements the visual progress ring, transitions, and overall app theme.

- `app.js`
  - Manages timer state, mode transitions, pause/resume/reset behavior, localStorage persistence, and sound playback.
  - Updates the DOM in response to timer ticks and user actions.

## Function Signatures

### `app.js`
- `initApp()`
- `bindEventListeners()`
- `loadState()`
- `saveState()`
- `startTimer()`
- `pauseTimer()`
- `resetTimer()`
- `switchMode(mode)`
- `tick()`
- `updateDisplay(minutes, seconds)`
- `updateProgress(elapsedSeconds, totalSeconds)`
- `updateSessionCounter()`
- `playTransitionSound()`
- `formatTime(seconds)`

### `index.html`
- No JavaScript functions; markup only.

### `style.css`
- No functions; styling only.

## Build Order

1. Create `index.html` with the timer display, controls, progress ring markup, session counter, and audio element.
2. Create `style.css` for layout, circular progress styling, and button presentation.
3. Create `app.js` with initialization, event binding, timer loop, persistence, and transition sound handling.
4. Wire the files together by linking `style.css` and `app.js` from `index.html`.
5. Test the full flow: start, pause, resume, reset, transition sounds, and session counter persistence.