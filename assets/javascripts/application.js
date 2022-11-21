let dogClass = 'js-dog';
let inputClass = 'js-puppodoro-input';
let timerClass = 'js-puppodoro-timer';
let startClass = 'js-puppodoro-start';
let endClass = 'js-puppodoro-end';
let pomodoro = undefined;
let dog = document.getElementsByClassName(dogClass)[0];
let startButton = document.getElementsByClassName(startClass)[0];
let stopButton = document.getElementsByClassName(endClass)[0];
let timer = document.getElementsByClassName(timerClass)[0];
let timerInput = document.getElementsByClassName(inputClass)[0];

startButton.addEventListener('click', function () {
  var timerLength = document.getElementsByClassName(inputClass)[0].value;
  var now = new Date();
  var timerExpiresAt = addMinutes(now, timerLength)

  startButton.disabled = true;
  updateTimer(timerExpiresAt);
  startTimer(timerExpiresAt);
})

stopButton.addEventListener('click', function () {
  stopTimer();
})

function addMinutes(date, minutes) {
  return new Date(date.getTime() + (minutes * 60000));
}

function startTimer(expiresAt) {
  dog.classList.remove('animate');
  timerInput.classList.add('hidden');
  timer.classList.remove('hidden');

  pomodoro = setInterval(function () {
    updateTimer(expiresAt);
  }, 1000);
}

function stopTimer() {
  clearInterval(pomodoro);
  dog.classList.add('animate');
  timerInput.classList.remove('hidden');
  timer.classList.add('hidden');
  startButton.disabled = false;
}

function updateTimer(expiresAt) {
  var now = new Date().getTime();
  var distance = expiresAt - now;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  timer.innerHTML = minutes + ':' + seconds;

  if (distance <= 0) {
    var alertClass = '.js-alert'
    var alertPath = document.querySelector(alertClass + ':checked').value;
    var audio = new Audio(alertPath);

    audio.play();
    stopTimer();
  }
}
