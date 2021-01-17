//query selectors
var quizEl = document.querySelector("#quiz");
var scorePageEl = document.querySelector("#score-page");
var startBtnEl = document.querySelector("#startBtn");
var questionsEl = document.querySelector('#question');
var answersEl = document.querySelector('#answers')
var timeSpanEl = document.querySelector("#timeSpan");
var introEl = document.querySelector("#introduction");
var resultsEl = document.querySelector("#results");
var highScoresList = document.querySelector("#highScoresList");
var initialsEl = document.querySelector("#initials");
var clearHighscoresBtnEl = document.querySelector("#clearHighscoresBtn");
var submit = document.querySelector("#submit");

//declarations
var questionTracker = 0;
var totalTime = 120;
var timeLeft = totalTime
var secondsPassed = 0;
var secondsPenalty = 0;
var correctAnswers = 0;
var overallScore = 0;
var justRegistered = false;
var highscoresArray = [];
var time = setInterval(timer, 1000);
//questions
var questionObjArr = [{
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>","<javascript>", "<js>", "<scripting>"],
        correct: 0
    },{
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        options: ['<script src="xxx.js">','<script name="xxx.js">','<script href="xxx.js">','<script value="xxx.js">'],
        correct: 0
    },{
        question: "Where is the correct place to insert a JavaScript?",
        options: ["The end of <body> section is a correct place to put it","Anywhere is fine","The <head> section is a correct place to put it","The <footer> section is a correct place to put it"],
        correct: 0
    },{
        question: 'How do you write "Hello" in an alert box?',
        options: ['alert("Hello")','msgBox("Hello")','alertBox("Hello")','alertBox=("Hello")'],
        correct: 0
    },{
        question: "How do you create a function?",
        options: ["var myFunction = function()","var function() = myFunction()","function myFunction","create myFunction"],
        correct: 0
    },{
        question: "How do you call a function",
        options: ["myFunction()","call myFunction()","call function myFunction","call.myFunction()"],
        correct: 0
    },{
        question: "How do you write a conditional statement for executing some statements only if 'i' is equal to 5?",
        options: ["if(i===5)","if i=5 then","if(i=5)","if i===5"],
        correct: 0
    },{
        question: "How do you write a condiditon statement for executing some statements only if 'i' is not equal to 5?",
        options: ["if(i!=5)","if not 5","if =! 5","if != 5"],
        correct: 0
    },{
        question: 'How does a "for" loop start?',
        options: ["for (i = 0; i <= 5; i++)","for (i = 0; i <= 5)","for (i = 0; i++)","for (i++; i <= 5)"],
        correct: 0
    },{
        question: "How do you comment in JavaScript",
        options: ["//","<!---->",";","comments:"],
        correct: 0
    }];
//question/declarations/queryselectors end
// init for fresh page
function init() {
    timeSpanEl.textContent = timeLeft;
    quizEl.style.display = "none";
    scorePageEl.style.display = "none";
    introEl.style.display = "block";
    startBtnEl.style.display = "block";
    questionTracker = 0;
    totalTime = 120;
    timeLeft = totalTime;
    secondsPassed = 0;
    secondsPenalty = 0;
    correctAnswers = 0;
    justRegistered = false;
    timeSpanEl.textContent = timeLeft;
    if (localStorage.getItem("highscore")) {
        highscoresArray = localStorage.getItem("highscore").split(",");
    }
    clearInterval(time);
    scorePageEl.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
    submit.setAttribute("class", "btn btn-info");
}
//init end
//Creates the questions and options for questions
function createQuestion() {
    questionsEl.textContent = questionObjArr[questionTracker].question;
    var indexArray = [];
    for (i = 0; i < questionObjArr[questionTracker].options.length; i++) {
        var questionBtn = document.createElement("button");
        questionBtn.setAttribute("type", "button");
        questionBtn.setAttribute("class", "list-group-item list-group-item-action list-group-item-info mt-1 answerButton");
        questionBtn.setAttribute("data-index", i);
        if (i === 0) {
            questionBtn.setAttribute("correct", "yes");
        } else {
            questionBtn.setAttribute("correct", "no");
        }
        questionBtn.textContent = questionObjArr[questionTracker].options[i];
        answersEl.append(questionBtn);
        indexArray.push(i);
    }
    //randomizes options so they are not in the same place
    answersEl.childNodes.forEach(function (child) {
        var rndIndex = Math.floor(Math.random() * indexArray.length);
        answersEl.append(answersEl.children[rndIndex]);
        indexArray.splice(rndIndex, 1);
    });
}
//createquestion end
//functions when answers are clicked and increment quesitontracker ++
function answersClicked(event) {
    if (event.target.matches("button")) {
        var index = parseInt(event.target.getAttribute("data-index"));
        var timeInterval = 1000;
        disableQuestions();
        if (event.target.getAttribute("correct") === "yes") {
            displayResult(true);
            correctAnswers++;
        } else {
            secondsPenalty += 6;
            clearInterval(time);
            time = setInterval(timer, 1000);
            displayResult(false);
        }
        questionTracker++;
        if (questionTracker === questionObjArr.length) {
            timeInterval = 5000;
            gameOver("questions_done");
        } else {
            setTimeout(removeQuestionsButtons, 1000);
            setTimeout(createQuestion, 1001);
        }
        setTimeout(function () {
            resultsEl.style.display = "none";
        }, timeInterval);
    }
}
//answerclicked end 
// display if you got it correct or incorrect
function displayResult(correct) {
    if (correct) {
        resultsEl.setAttribute("class","alert alert-success mt-0 mb-0 pt-0 pb-0 text-center");
        resultsEl.innerHTML = "<strong>Correct!</strong> Nice Job!";
        resultsEl.style.display = "block";
    } else {
        resultsEl.setAttribute("class","alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center");
        resultsEl.innerHTML ="<strong>Incorrect!</strong> Better Luck Next Time!";
        resultsEl.style.display = "block";
        timeSpanEl.style.color = "red";
        setTimeout(function () {
            timeSpanEl.style.color = "black";
        }, 1000);
    }
}
//displayresult end
//remove questions and its answers/options
function removeQuestionsButtons() {
    questionsEl.textContent = "";
    var child = answersEl.lastElementChild;
    while (child) {
        answersEl.removeChild(child);
        child = answersEl.lastElementChild;
    }
}
//removequestionsbutton end
//function to disable skipping a head and make sure its is unclickable
function disableQuestions() {
    var questionsButton = document.querySelectorAll(".answerButton");
    questionsButton.forEach((element) => {
        element.setAttribute("class","list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled");
        if (parseInt(element.getAttribute("data-index")) === questionObjArr[questionTracker].correct) {
            element.setAttribute("class", "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled");
        }
    });
}
//disablequestion end
//function for timer 
function timer() {
    timeLeft = totalTime - secondsPassed - 1 - secondsPenalty;
    timeSpanEl.textContent = timeLeft;
    secondsPassed++;
    if (timeLeft <= 0) {
      clearInterval(time);
      disableQuestions();
      gameOver("time_out");
    }
}
//timer end
//fucntion to start quiz
function startQuiz() {
    introEl.style.display = "none";
    startBtnEl.style.display = "none";
    quiz.style.display = "block";
    time = setInterval(timer, 1000);  
    createQuestion();
}
//startquiz end
//function to end quiz 
function gameOver(cause) {
    if (cause === "questions_done") {
        setTimeout(() => {
            resultsEl.setAttribute("class", "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center");
            resultsEl.innerHTML = "<strong>Quiz Finished</strong>";
        }, 1500);
        clearInterval(time);
    } else if (cause === "time_out") {
        disableQuestions();
        resultsEl.setAttribute("class", "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center");
        resultsEl.innerHTML = "<strong>Time Ran Out</strong>";
    } else {
        return false;
    }
    resultsEl.style.display = "block";
    setTimeout(function () {
        overallScore = correctAnswers + timeLeft;
        finalScore.textContent = overallScore;
        quiz.style.display = "none";
        scorePageEl.style.display = "block";
        resultsEl.style.display = "none";
        removeQuestionsButtons();
    }, 5000);
}
//gameover end 
//function for inputing scores and adding it to the modal
function inputHighscores() {
    var highScoreEl = document.createElement("li");
    var highscoreStr = initialsEl.value + " - " + overallScore;
    highscoresArray.push(highscoreStr);
    highScoreEl.textContent = highscoreStr;
    highScoresList.append(highScoreEl);
    localStorage.setItem("highscore", highscoresArray);
    justRegistered = true;
    initialsEl.value = "";
    $("#staticBackdrop").modal("show");
}
// inputhighscores end
//function to load highscore and order them
function loadHighScores() {
    var tempHighscoresArray = [];
    var tempHighscoresObject = {};
    var tempHighscoresObjectsArray = [];
    var tempLocalSCoreArray = [];
    while (highScoresList.hasChildNodes()) {
        highScoresList.removeChild(highScoresList.childNodes[0]);
    }
    var lastPos;
    var lastChar = "";
    var localScore = 0;
    var localStrScore = "";
    var tempHighscore = "";
    for (i = 0; i < highscoresArray.length; i++) {
        for (j = highscoresArray[i].length - 1; j >= 0; j--) {
            lastPos = highscoresArray[i].length - 1;
            lastChar = highscoresArray[i][lastPos - j];
        if (lastChar && lastChar >= 0 && lastChar <= 9) {
            localScore += lastChar;
        }
        if (j > 1) {
            if (j === 2 && lastChar === "1") {
            }
            localStrScore += lastChar;
        }
        localScore = parseInt(localScore);
        }
        tempHighscore = localScore + localStrScore;
        tempHighscoresArray.push(tempHighscore);
        tempHighscoresObject.score = localScore;
        tempHighscoresObject.scoreStr = localStrScore;
        tempHighscoresObjectsArray.push(tempHighscoresObject);
        tempLocalSCoreArray.push(localScore);
        localScore = 0;
        localStrScore = "";
        tempHighscoresObject = {};
    }
    tempLocalSCoreArray.sort(function (a, b) {
        return b - a;
    });
    var sortedScoresCompleteArray = [];
    var flagged = [];
    tempLocalSCoreArray.forEach(function (element) {
        tempHighscoresObjectsArray.forEach(function (object, index) {
            if (element === object.score && !flagged.includes(index)) {
                flagged.push(index);
                var tempScoreString = object.scoreStr + " " + object.score;
                sortedScoresCompleteArray.push(tempScoreString);
            }
        });
    });
    for (i = 0; i < sortedScoresCompleteArray.length; i++) {
        var highScoreElement = document.createElement("li");
        highScoreElement.textContent = sortedScoresCompleteArray[i];
        for (j = sortedScoresCompleteArray[i].length - 1; j >= 0; j--) {
            lastPos = sortedScoresCompleteArray[i].length - 1;
            lastChar = sortedScoresCompleteArray[i][lastPos - j];
            if (lastChar && lastChar >= 0 && lastChar <= 9) {
                localScore += lastChar;
            }
            if (j > 1) {
                localStrScore += lastChar;
            }
            localScore = parseInt(localScore);
        }
        tempHighscore = localScore + localStrScore;
        if (localScore > 80 && localScore <= 100) {
            highScoreElement.setAttribute("class", "list-group-item list-group-item-success");
        } else if (localScore > 70 && localScore <= 80) {
            highScoreElement.setAttribute("class","list-group-item list-group-item-info");
        } else if (localScore > 60 && localScore <= 70) {
            highScoreElement.setAttribute("class","list-group-item list-group-item-primary");
        } else if (localScore > 50 && localScore <= 60) {
            highScoreElement.setAttribute("class","list-group-item list-group-item-warning");
        } else if (localScore <= 50) {
            highScoreElement.setAttribute("class","list-group-item list-group-item-danger");
        }
        highScoresList.append(highScoreElement);
        tempHighscoresArray.push(tempHighscore);
        tempHighscoresObject.score = localScore;
        tempHighscoresObject.scoreStr = localStrScore;
        tempHighscoresObjectsArray.push(tempHighscoresObject);
        tempLocalSCoreArray.push(localScore);
        localScore = 0;
        localStrScore = "";
        tempHighscoresObject = {};
    }
}
// loadhighscore end
//function to clear all scores
function clearHighscores() {
    highscoresArray = [];
    localStorage.setItem("highscore", HighscoresArray);
    loadHighScores();
}
// clearhighscore end
//event listeners
startBtnEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", answersClicked);
submit.addEventListener("click", inputHighscores);
clearHighscoresBtnEl.addEventListener("click", clearHighscores);
$("#staticBackdrop").on("shown.bs.modal", function (e) {
  loadHighScores();
});
$("#staticBackdrop").on("hidden.bs.modal", function (e) {
  if (justRegistered) {
    init();
  }
});

//init start
init();



