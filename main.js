var categoriesSect = document.getElementById('categories');
var studyBox = document.getElementById('study-box');
var meditateBox = document.getElementById('meditate-box');
var exerciseBox = document.getElementById('exercise-box');
var mainBox = document.getElementById('main-box');
var startBtn = document.getElementById('start-btn');
var accomplishmentInput = document.getElementById('accomplish-input');
var minsInput = document.getElementById('mins-input');
var secsInput = document.getElementById('secs-input');
var inputForm = document.getElementById('input-form');

startBtn.addEventListener('click', loadTimer);
mainBox.addEventListener('click', function() {
  startTimer(event);
  refreshButton(event);
})

var actions = [studyBox, meditateBox, exerciseBox];

actions.forEach(action => action.addEventListener('click', function() {
  toggleOutline(action);
}));

function toggleOutline(section) {
  actions.forEach(element => {
    if (element === section) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  })
}

function setCircleColor() {
  var border;
  if (studyBox.classList.contains('active')) {
    border = 'green';
  } else if (meditateBox.classList.contains('active')) {
    border = 'purple';
  } else if (exerciseBox.classList.contains('active')) {
    border = 'orange';
  }
  return border;
}

function enableStartButton() {
  if (accomplishmentInput.value && minsInput.value && secsInput.value) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = false;
  }
}

function refreshButton(event) {
  if (event.target.classList.contains('refresh')) {
    window.location.reload();
  }
}

function loadTimer(){
  var color = setCircleColor();
  var activity = accomplishmentInput.value;
  var mins = minsInput.value;
  var secs = secsInput.value;
  secs = ('0' + secs).slice(-2);
  var timerHTML = `<div class="timer-container">
    <h4>${activity}</h4>
    <div class="time-box">
      <p class="time"><span class="mins">${mins}</span>:<span class="secs">${secs}</span></p>
    </div>
    <div class="circle ${color}">
      <p class="start-timer">START</p>
    </div>
    <button class='refresh'>New Timer</button>`
  mainBox.innerHTML = timerHTML;
}

function startTimer(event){
  if (event.target.classList.contains('start-timer')) {
    console.log('click');
    startTime();
  }
}


inputForm.addEventListener('keyup', function() {
  validateForm(event);
});

function validateForm(event) {
  if (!event.target.value) {
    var warningHTML = `<p class="warning"><img src="assets/warning.svg">This field is required</p>`
    event.target.classList.add('error');
    event.target.insertAdjacentHTML('afterend', warningHTML)
    enableStartButton();
  } else {
    event.target.classList.remove('error');
  }
};

function startTime() {
  var mins = parseInt(document.querySelector('.mins').innerText);
  var secs = parseInt(document.querySelector('.secs').innerText);
  var timeBox = document.querySelector('.time-box');
  var endTime = new Date().getTime() + (((mins * 60) + secs) * 1000);
  var chime = new Audio('assets/chime.mp3');
  var timer = setInterval(function () {
    console.log('hi')
    var now = new Date().getTime();
    var diff = endTime - now;
    var minsLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secsLeft = Math.floor((diff % (1000 * 60)) / 1000);
    secsLeft = ('0' + secsLeft).slice(-2);
    if (minsLeft == 0 && secsLeft == 0) {
      timeBox.innerHTML = `<p class="time">0:00</p>`;
      clearInterval(timer);
      chime.play();
      window.alert(`Time's up!`);
    } else {
      timeBox.innerHTML = `<p class="time">${minsLeft}:${secsLeft}</p>`;
    }
  }, 100)
}
