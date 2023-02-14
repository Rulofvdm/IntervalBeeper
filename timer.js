const intervalInput = document.getElementById("intervalSeconds");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const timerDisplay = document.getElementById("timer");

let interval = parseInt(intervalInput.value);
let timer;

function startCountdown() {
  interval = parseInt(intervalInput.value);
  timerDisplay.innerHTML = interval;
  timer = setInterval(function() {
    interval--;
    timerDisplay.innerHTML = interval;
    if (interval === 0) {
      clearInterval(timer);
      startCountdown();
      playBeep();
    }
  }, 1000);
}

function playBeep() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect( gainNode );
  gainNode.connect( context.destination );
  oscillator.frequency.value = 440;
  oscillator.start(0);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
}

startButton.addEventListener("click", startCountdown);

resetButton.addEventListener("click", function() {
  clearInterval(timer);
  interval = parseInt(intervalInput.value);
  timerDisplay.innerHTML = interval;
});

// Web Worker
if (typeof(Worker) !== "undefined") {
  const worker = new Worker("timer-worker.js");
  worker.onmessage = function(event) {
    timerDisplay.innerHTML = event.data;
  };
} else {
  console.log("Web Worker not supported in this browser.");
}