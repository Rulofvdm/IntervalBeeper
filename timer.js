const intervalInput = document.getElementById("intervalSeconds");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const timerDisplay = document.getElementById("timer");

let interval = parseInt(intervalInput.value);
let worker;

function startCountdown() {
  stopWorker();
  interval = parseInt(intervalInput.value);
  timerDisplay.innerHTML = interval;
  startWorker();
}

function startWorker() {
  worker = new Worker("timer-worker.js");
  worker.onmessage = function(event) {
    const { data: { interval, done } } = event;
    timerDisplay.innerHTML = interval;
    if (done) {
      playBeep();
      startCountdown();
    }
  };
  worker.postMessage({ interval });
}

function playBeep() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.frequency.value = 440;
  oscillator.start(0);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);

  setTimeout(() => {
    oscillator.stop();
    context.close();
  }, 500);
}

function stopWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
}

function resetTimer() {
  stopWorker();
  interval = parseInt(intervalInput.value);
  timerDisplay.innerHTML = interval;
}

startButton.addEventListener("click", startCountdown);
resetButton.addEventListener("click", resetTimer);

// Initialize timer display
timerDisplay.innerHTML = intervalInput.value;