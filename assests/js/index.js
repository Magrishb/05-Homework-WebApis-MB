// List all the variables.
var questions = document.getElementById("questions");
var timer = document.getElementById("time");
var choices = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initial = document.getElementById("initials");
var feedback = document.getElementById("feedback");

function startQuiz() {
    // hide starting container
    var startScreen = document.getElementById("starting-container");
    startScreen.setAttribute("class", "hide");
  
    // un-hide questions section
    questions.removeAttribute("class");
  
    // start timer
    timerId = setInterval(clockTick, 1000);
  
    // show starting time
    timer.textContent = time;
  
    getQuestion();
  }
  