const timerEl = document.getElementById("timer");
const timerCard = document.querySelector(".timer-card");

//Set Timer Function to change color on count down depending on how many seconds are left:

function setTimer() {
    secondsLeft = 60;
    timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent.content = secondsLeft;
        if (secondsLeft === 0 || secondsLeft > 21) {
            timerEl.style.color = "black";
        }
        if (secondsLeft > 10 && secondsLeft < 21) {
            timerEl.style.color = "yellow";
        }
        if (secondsLeft < 10) {
            timerEl.style.color = "red";
        }
        if (secondsLeft<= 0){
            gameOver();
        }
    })
}

let timerInterval;

// const questionDisplay = document.GetElementById("question-here");

const startBtn = document.getElementById("Begin-quiz-btn");
const answerStatus = document.getElementById("answer-status");
const instructions = document.getElementById("instructions");

// function to start Quiz:
function startQuiz(){
    setTimer();
    questionDispFunc();
    document.getElementById("header").innerText = "";
    instructions.style.display = "none";
    startBtn.style.display = "initial";
    answerStatus.style.dispaly = "initial"
}

const form = document.querySelector(".answer-list");

// Function for answer choices from form:
function getResponse(e) {
    e.preventDefault();
    response = form.answer.value;
    answerFunc();
}

let secondsLeft; 
// INcorrect answers:
function incorrectAnswer() {
    secondsLeft -= 15;
    timerEl.textContent = secondsLeft;
}

// Q&A Choices:
const qAndA = [
    {
        q: "What does html stand for?",
        A: "Ham, Tomato Mustard, Leek?",
        B: "How do You like My Lasagna?",
        C: "Hyper Text Markup Language",
        D: "Hi Tom, My Lady",
    },
    {
        q: "What does CSS do?",
        A: "Adds style my HTML",
        B: "Adds functionality to my web page",
        C: "Creates a server for my web page",
        D: "It's a code used to signal the help of other coders in the area",
    },
    {
        q: "What is Bootstrap?",
        A: "The things I pull myself up by",
        B: "A JavaScript framework",
        C: "A HTML library",
        D: "A CSS library",
    },
    {
        q: "What command do I need to run my React app?",
        A: "NPM build",
        B: "NPM Start",
        C: "NPM Install",
        D: "NPM Run Build",
    },

];

// Answers:

const answerKey = [
    { answer: "C" },
    { answer: "A" },
    { answer: "C" },
    { answer: "B"},
];

function nextQuestion(){
    if (currentIndex < qAndA.length - 1){
        currentIndex++;
        questionDispFunc();
    }
    else {
        gameOver();
    }
}

