let currentQuestion = 0
let time = 60;
let timerInterval;
let highScores

let startBtn = document.getElementById('start-button')
let questionContainer = document.getElementById('question')
let choicesContainer = document.getElementById('choices')
let submitBtn = document.getElementById('submit-quiz')
let userName = document.getElementById('user')
let timerDisplay = document.getElementById('timer')

const questionsArray = [
{
    question: "Question: JavaScript is a ________ -side programming language. ",
    answerChoice: ["A) <Client>", "B) <Server>", "C) <Dark>", "D) <Both>"],
    answer: 1
}, 
{
    question: "Question: What is the  Correct Syntax for adding a comment in javascript ",
    answerChoice: ["A) //This is a comment", "B) This is a comment", "C)<!--This is a comment--!> ", "D) None of the above"],
    answer: 0
},

{
    question: "Question: Which method adds a new items to the end of an element?",
    answerChoice: ["A) shift()", "B) return() ", "C) prepend() ", "D) append()"],
    answer: 3
}, 
{
    question: "Question: Which of the following function of Array objects joins all elements into a string",
    answerChoice: ["A) Concat()", "B) Pop()", "C) Join()", "D) Map()"],
    answer: 0
},
{
    question: "Question: What keyword is used to declare a function asynchronous?",
    answerChoice: ["A) await", "B) setTimeout", "C) async", "D) None of the above"],
    answer: 2
}];
startBtn.addEventListener('click', startDaQuiz)

function startDaQuiz() {
    startBtn.style.display = 'none'
    userName.style.display = 'none'
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion()
}



// make questions display
function displayQuestion() {
    const currentQuizData = questionsArray[currentQuestion];
    questionContainer.innerText = `Question ${currentQuestion + 1}: ${currentQuizData.question}`;
    choicesContainer.innerText = "";

    for (let i = 0; i < currentQuizData.answerChoice.length; i++) {
        const item = document.createElement("li");
        const option = document.createElement("button");
        option.textContent = currentQuizData.answerChoice[i];
        option.dataset.index = i;
        option.addEventListener("click", () => checkAnswer(parseInt(option.dataset.index)));
        item.appendChild(option);
        choicesContainer.appendChild(option);
    }
}
// Checks if user answer is correct
function checkAnswer(answerIndex) {
    const currentQuizData = questionsArray[currentQuestion];

    if (answerIndex === currentQuizData.answer) {
        if (currentQuestion < questionsArray.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        time -= 10; // Takes away 10 seconds from quiz timer if they get the question wrong
    }
    // saveScore();
}
// updates timer while quiz is running
function updateTimer() {
    time--;
    if (time <= 0) {
        endQuiz();
    }
    timer.textContent = time;
}

function endQuiz() {
    clearInterval(timerInterval);
    timerDisplay.style.display = "none";
    questionContainer.innerText = "Completed!";
    choicesContainer.innerHTML = "";
    userName.style.display = "block";
    submitBtn.style.display = "block";
}

submitBtn.addEventListener("click", saveScore);

function saveScore() {
    const initials = userName.value;
    const scoreData = { initials: initials, score: time };
    highScores.push(scoreData);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
}









