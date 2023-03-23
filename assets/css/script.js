const timerEl = document.getElementById("timer");
const timerCard = documentGetElementById("timer-card");

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