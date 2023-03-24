// Globals:
const timerEl = document.getElementById("timer");
const timerCard = document.querySelector(".timer-card");
const questionDisplay = document.getElementById("question");

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

let currentIndex = 0;
let response = "";


function nextQuestion(){
    if (currentIndex < qAndA.length - 1){
        currentIndex++;
        questionDispFunc();
    }
    else {
        gameOver();
    }
}

// Current Q&A Choices display:


function questionDispFunc() {
    questionDisplay.textContent = qAndA[currentIndex].q;
    document.getElementById("answer-one-label").innerText = qAndA[currentIndex].A;
    document.getElementById("answer-two-label").innerText = qAndA[currentIndex].B;
    document.getElementById("answer-three-label").innerText = [currentIndex].C;
    document.getElementById("answer-four-label").innerText = [currentIndex].D;


}
// Compares user selection to answers (array):
function answerFunc(){
    if ( response === answerKey[currentIndex].answer){
        nextQuestion();
        answerStatus.style.display = "none";
    }
    else {
        answerStatus.style.display = "block"
        answerStatus.textContent = "Oops, nearly there! Try again";
        incorrectAnswer();

    }
}
// initials input display set to none by default:
initialsInput.style.display = "none";   

// function to reset once game ends:
function gameOver(){
    clearInterval(timerInterval);
    form.style.display = "none";
    questionDisplay.style.display = "none";
    timerCard.style.display = "none";
    answerStatus.style.display = "none";
    initialsInput.style.display = "block";
    scoreDisplay.textContent = `Your Score is ${timerEl.innerText}!` ;

}
// High scores set to default none:
highScoresList.style.display = "none";
highScoresTitle.style.display = "none";

// Check local storage for high score and then responsd:
let highScores;
function getHighScores(){
    const savedHighScores = JSON.parse(localStorage.getItem("highScores"));
    if(savedHighScores){
        highScores = savedHighScores;
    }
    else {
        highScores = [];
    }
}

// Function to save score and enter their initials. User is alterted if input is less than two characters.
function saveScore(e) {
    e.preventDefault();
    if(initialsInput.value.length === 2){
        let hsInitials = initials.value.toUpperCase();
        let hsScore = timerEl.innerText;

        highScores.push({ Initials: hsInitials, Score: hsScore});
        localStorage.setitem("highScores", JSON.stringify(highScores));

        displayHighScores();
    }
    else {
        alert("You must enter at least two characters");
    }
}

// Display high Scores on page, default display and function to display following game:
restartBtn.style.display = "none";


function displayHighScores(){
    initialsInput.style.display = "none";
    highScoresList.style.display = "none";
    highScoresTitle.style.display = "block";
    highScoresList.textContent = "";

    highScores.sort(compare).reverse();

    for (let i = 0; i < highScores.length; i++){
        let li = document.createElement("li");

        li.id = i;
        li.innerHTML = `Initials: ${highScores[i].Initials} Score: ${highScores[i].Score}`;
        highScoresList.append(li);
    }

    restartBtn.style.display = "block";

}
// function to compare high scores:
function compare(a,b){
    const scoreA = a.score;
    const scoreB = b.score;
    let comparison = 0;

    if (scoreA > scoreB){
        comparison = 1;
    }
    else if (scoreA < scoreB){
        comparison = -1;
    }
    return comparison;
}

// Restarting the Quiz:

function restartQuiz(e){
    e.preventDefault();
    secondsLeft = 60;
    setTimer();
    currentIndex = 0;
    highScoresList = "none";
    highScoresTitle = "none";
    timerCard.style.display = "block";
    questionDisplay.style.display = "block";

    questionDispFunc();
    document.getElementById("header").innerText = "";
    startBtn.style.display = "none";
    restartBtn.style.display = "none";
    form.style.display = "initial";
}

// Event Listeners:
startBtn.addEventListener("click", startQuiz);
form.addEventListener("submit", getResponse);
initialsInput.addEventListener("submit", saveScore);
restartBtn.addEventListener("click", restartQuiz);

