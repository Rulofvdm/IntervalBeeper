let interval;

self.onmessage = function(event) {
  const { data: { interval } } = event;
  startWorker({ interval });
};

function startWorker({ interval }) {
  interval--;
  if (interval === 0) {
    self.postMessage({ interval, done: true });
  } else {
    self.postMessage({ interval });
    setTimeout(() => startWorker({ interval }), 1000);
  }
}