
var currentQuestionIndex = 0;
var time = challenges.length * 15;
var timerId;
var challengesEl = document.getElementById('challenges');
var timerEl = document.getElementById('time');
var multiplechoicesEl = document.getElementById('multiplechoices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('startquiz');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function beginQuiz() {
  var beginScreenEl = document.getElementById('begin');
  beginScreenEl.setAttribute('class', 'hide');

  //  how questions
  challengesEl.removeAttribute('class');

  // get the timer started
  timerId = setInterval(clockTick, 1000);

  // what is the starting time
  timerEl.textContent = time;
  getQuestion();
}
function getQuestion() {
  var currentQuestion = challenges[currentQuestionIndex];
var titleEl = document.getElementById('challengetitle');
  titleEl.textContent = currentQuestion.title;
multiplechoicesEl.innerHTML = '';

  for (var i = 0; i < currentQuestion.multiplechoices.length; i++) {
    var multiplechoice = currentQuestion.multiplechoices[i];
    var multiplechoiceNode = document.createElement('button');
    multiplechoiceNode.setAttribute('class', 'multiplechoice');
    multiplechoiceNode.setAttribute('value', multiplechoice);
    multiplechoiceNode.textContent = i + 1 + '. ' + multiplechoice;
    multiplechoicesEl.appendChild(multiplechoiceNode);
  }
}
function questionClick(event) {
  var buttonEl = event.target;
  if (!buttonEl.matches('.multiplechoice')) {
    return;
  }
  if (buttonEl.value !== challenges[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
  } else {
    feedbackEl.textContent = 'Correct!';
  }
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);
  currentQuestionIndex++;
  if (time <= 0 || currentQuestionIndex === challenges.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById('endscreen');
  endScreenEl.removeAttribute('class');
  var scoreEl = document.getElementById('score');
  scoreEl.textContent = time;
  challengesEl.setAttribute('class', 'hide');
}
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}
function savestudentmark() {
  var initials = initialsEl.value.trim();
  if (initials !== '') { 
    var studentmarks =
      JSON.parse(window.localStorage.getItem('studentmartks')) || [];
    var newmark = {
      mark: time,
      initials: initials,
    }; 
    studentmarks.push(newmark);
    window.localStorage.setItem('studentmarks', JSON.stringify(studentmarks));
    window.location.href = 'mark.html';
  }
}
function checkForEnter(event) {
  if (event.key === 'Enter') {
    savestudentmark();
  }
}
startBtn.onclick = beginQuiz;
multiplechoicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
submitBtn.onclick = savestudentmark;