// List all the variables.
var questions = document.getElementById("questions");
var timer = document.getElementById("time");
var choices = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initial = document.getElementById("initials");
var feedback = document.getElementById("feedback");

// Keep track of quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

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

  function getQuestion() {
    // get current question from array
    var currentQuestion = questions[currentQuestionIndex];

    var title = document.getElementById("title");
    title.textContent = currentQuestion.title;
  
    choices.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = questionClick;
        choices.appendChild(choiceNode);
      });
  }
  
  function questionClick() {

    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if (time < 0) {
          time = 0;
        }
    
        // New Time
        timer.textContent = time;

        feedback.textContent = "Wrong!";
    } else {  
        feedback.textContent = "Correct!";
    }      
    
      // flash right/wrong feedback on page for half a second
      feedback.setAttribute("class", "feedback");
      setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
      }, 1000);
      
        // click to next question
        currentQuestionIndex++;
  
 
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  function clockTick() {
    time--;
    timer.textContent = time;

    // check timer for end
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function quizEnd() {
    clearInterval(timerId);
  
    // show the end of the screen
    var endScreen = document.getElementById("end-screen");
    endScreen.removeAttribute("class");
  
    // show the final score
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
  
    // hide questions container
    questions.setAttribute("class", "hide");
  }

  function saveHighscore() {
    // get value of input box
    var initials = initials.value.trim();
  
    if (initials !== "") {
      // get saved scores from localstorage
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // new score formatter
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // next page
      window.location.href = "highscores.html";
    }
  }