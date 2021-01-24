const minDOM = document.getElementById("min");
const secDOM = document.getElementById("sec");
const dsDOM = document.getElementById("ms");

const pauseBtn = document.getElementById("pause-timer");
const resetBtn = document.getElementById("reset-timer");

// set global variables for timer
let RUN_TIMER = true; // give it a default value of true (so it runs when page first loads)
const timerState = {
  min: 0,
  sec: 0,
  ds: 0,
}; // set the default original value for the timer
const intervalId = {
  min: undefined,
  sec: undefined,
  ds: undefined,
};

const pauseTimer = () => {
  timerState.ds = parseInt(dsDOM.innerHTML);
  timerState.sec = parseInt(secDOM.innerHTML);
  timerState.min = parseInt(minDOM.innerHTML);

  Object.keys(intervalId).forEach((type) => {
    clearInterval(intervalId[type]);
  });
};

const continueTimer = () => {
  runTimer();
};

const runTimer = () => {
  // setting interval for every milisecond update
  const dsInterval = setInterval(() => {
    let currentMs = parseInt(dsDOM.innerHTML);
    currentMs++;

    if (currentMs > 9) {
      currentMs = 0;
    }

    dsDOM.innerHTML = currentMs;
  }, 100);

  //   interval for second update
  const secInterval = setInterval(() => {
    let currentSec = parseInt(secDOM.innerHTML);
    currentSec++;

    if (currentSec > 60) {
      currentSec = 0;
    }

    secDOM.innerHTML = currentSec;
  }, 1000);

  //   interval for minute update
  const minInterval = setInterval(() => {
    let currentMin = parseInt(minDOM.innerHTML);
    currentMin++;

    if (currentMin > 60) {
      currentMin = 0;
    }

    minDOM.innerHTML = currentMin;
  }, 60000);

  intervalId.ds = dsInterval;
  intervalId.sec = secInterval;
  intervalId.min = minInterval;
};

pauseBtn.addEventListener("click", (e) => {
  RUN_TIMER = !RUN_TIMER;
  if (RUN_TIMER) {
    continueTimer();
    pauseBtn.innerText = "Pause";
  } else {
    pauseTimer();
    pauseBtn.innerText = "Continue";
  }
});

resetBtn.addEventListener("click", (e) => {
  minDOM.innerHTML = 0;
  secDOM.innerHTML = 0;
  dsDOM.innerHTML = 0;
});

if (RUN_TIMER) runTimer();
