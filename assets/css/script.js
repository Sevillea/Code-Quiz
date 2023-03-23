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
// function to start Quiz:
function startQuiz(){
    setTimer();
    questionDispFunc();
    document.getElementById("header").innerText = "";
    instructions.style.display = "none";
    startBtn.style.display = "initial";
    answerStatus.style.dispaly = "initial"
}