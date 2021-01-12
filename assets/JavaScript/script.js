var startBtn = document.getElementById('start');
var timerEl = document.getElementById('placeholder');
var questionsEl = document.getElementById('questions');
var timeLeft = 100; //global var for timer
var questionTracker = 0;
var timeInterval = "";
var op1Btn = document.getElementById('op1-btn');
var op2Btn = document.getElementById('op2-btn');
var op3Btn = document.getElementById('op3-btn');
var op4Btn = document.getElementById('op4-btn');


var questionObjArr = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        op: ["<javascript>", "<js>", "<script>", "<scripting>"],
        correct: "<script>"
    },{
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        op: ['<script src="xxx.js">','<script name="xxx.js">','<script href="xxx.js">','<script value="xxx.js">'],
        correct: '<script src="xxx.js">'
    },{
        question: "Where is the correct place to insert a JavaScript?",
        op: ["The <body> section is a correct place to put it","The <head> section is a correct place to put it","The <footer> section is a correct place to put it","Both A and B is a correct place to put it"],
        correct: "Both A and B is a correct place to put it"
    },{
        question: 'How do you write "Hello" in an alert box?',
        op: ['alert("Hello")','msgBox("Hello")','alertBox("Hello")','alertBox=("Hello")'],
        correct: 'alert("Hello")'
    },{
        question: "How do you create a function?",
        op: ["var myFunction = function()","var function() = myFunction()","function myFunction","create myFunction"],
        correct: "var myFunction = function()"
    },{
        question: "How do you call a function",
        op: ["call myFunction()","myFunction()","call function myFunction","call.myFunction()"],
        correct: "myFunction()"
    },{
        question: "How do you write a conditional statement for executing some statements only if 'i' is equal to 5?",
        op: ["if i=5 then","if(i===5)","if(i=5)","if i===5"],
        correct: "if(i===5)"
    },{
        question: "How do you write a condiditon statement for executing some statements only if 'i' is not equal to 5?",
        op: ["if(i!=5)","if not 5","if =! 5","if != 5"],
        correct: "if(i!=5)"
    },{
        question: 'How does a "for" loop start?',
        op: ["for (i = 0; i <= 5)","for (i = 0; i <= 5; i++)","for (i = 0; i++)","for (i++; i <= 5)"],
        correct: "for (i = 0; i <= 5; i++)"
    },{
        question: "How do you comment in JavaScript",
        op: ["//","<!---->",";","comments:"],
        correct: "//"
    }
]

var timerStart = function() {
    timeLeft--;
    if(timeLeft > 1) {
        timerEl.textContent="Time: " + timeLeft + "s";
    }else if(timeLeft === 1) {
        timerEl.textContent="Time: " + timeLeft + "s";
    }else {
        timerEl.textContent="Time: " + timeLeft + "s";
        clearInterval(timeInterval);
        alert("time is up");

    }
}

var makequestion = function() {
    var questionContainer = document.createElement("div");
    questionsEl.appendChild(questionContainer);
    //quesiton
    var actualQuestion = document.createElement("h3");
    actualQuestion.textContent = questionObjArr[questionTracker].question;
    questionContainer.appendChild(actualQuestion);
    //op1
    var op1ButtonEl = document.createElement("button");
    op1ButtonEl.textContent = questionObjArr[questionTracker].op[0];
    op1ButtonEl.setAttribute("id", "op1-btn");
    questionContainer.appendChild(op1ButtonEl);
    //op2
    var op2ButtonEl = document.createElement("button");
    op2ButtonEl.textContent = questionObjArr[questionTracker].op[1];
    op2ButtonEl.setAttribute("id", "op1-btn");
    questionContainer.appendChild(op2ButtonEl);
    //op3
    var op3ButtonEl = document.createElement("button");
    op3ButtonEl.textContent = questionObjArr[questionTracker].op[2];
    op3ButtonEl.setAttribute("id", "op1-btn");
    questionContainer.appendChild(op3ButtonEl);
    //op4
    var op4ButtonEl = document.createElement("button");
    op4ButtonEl.textContent = questionObjArr[questionTracker].op[3];
    op4ButtonEl.setAttribute("id", "op1-btn");
    questionContainer.appendChild(op4ButtonEl);
}

function countdown() {
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(timerStart, 1000);
    startBtn.remove();
    makequestion();
}

function nextQuestion() {
    if(questionTracker < 10) {
        questionTracker ++;
        makequestion();
    }
}



startBtn.onclick = countdown;
op1Btn.addEventListener=("onclick", nextQuestion);
op1Btn.onclick = nextQuestion;
op2Btn.onclick = nextQuestion;
op3Btn.onclick = nextQuestion;
op4Btn.onclick = nextQuestion;



