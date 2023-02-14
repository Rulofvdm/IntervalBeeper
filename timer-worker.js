let interval = parseInt(document.getElementById("intervalSeconds").value);

function startWorker() {
  interval--;
  if (interval === 0) {
    interval = parseInt(document.getElementById("intervalSeconds").value);
    postMessage(interval);
  } else {
    postMessage(interval);
  }
  setTimeout(startWorker, 1000);
}

startWorker();