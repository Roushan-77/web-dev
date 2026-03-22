// DOM elements

const startscreen = document.getElementById("start-screen")
const quizscreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startbutton = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answercontainer = document.getElementById("answers-container")
const currentquestionspan = document.getElementById("current-question")
const Totalquestionspan = document.getElementById("total-questions")
const scoresSpan = document.getElementById("Score")
const finalscorespan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("max-score")
const resultmessage = document.getElementById("result-message")
const restartbutton = document.getElementById("restart-btn")
const progressbar = document.getElementById("progress")


const quizQuestions = [
  {
    question : "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// quiz state wars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

Totalquestionspan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length

// event listener

startbutton.addEventListener("click", startQuiz)
restartbutton.addEventListener("click", restartQuiz)

function startQuiz(){
    // console.log("quiz started")
    currentQuestionIndex = 0;
    score= 0;
    scoresSpan.textContent = score;

    startscreen.classList.remove("active")
    quizscreen.classList.add("active")
    showQuestion()
}

function showQuestion(){
    // reset states
    answerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentquestionspan.textContent = currentQuestionIndex+1
    const progresspercent = (currentQuestionIndex/quizQuestions.length)*100;
    progressbar.style.width = progresspercent + "%"
    questionText.textContent = currentQuestion.question

    // explain this in a second
    answercontainer.innerHTML = "";

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button")
        button.textContent = answers.text
        button.classList.add("answer-btn")

        button.dataset.correct = answers.correct

        button.addEventListener("click", selectAnswer)
        answercontainer.appendChild(button)
    })
}

function selectAnswer(event){
    if(answerDisabled){
        return
    }

    answerDisabled = true
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answercontainer.children).forEach(button =>{
        if(button.dataset.correct === "true"){
        button.classList.add("correct")
        }
        else if(button === selectedButton){
            button.classList.add("incorrect")
        }
    })

    if(isCorrect){
        score++;
        scoresSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()

        }
        else{
            showResult()
        }
    },1000)
}

function showResult(){
    quizscreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalscorespan.textContent = score

    const percentage = (score/showQuestion.length)*100

    if(percentage === 100){
        resultmessage.textContent  = "Perfect! You're a genius"
    }
    else if(percentage >= 80){
        resultmessage.textContent = "Good job! You know your stuff"
    }
    else if(percentage >= 60){
        resultmessage.textContent = "Good effor! keep learning"
    }
    else if(percentage >= 40){
        resultmessage.textContent = "Not bad! try again to improve"
    }
    else{
        resultmessage.textContent = "Keep studying! You'll get better"
    }
}

function restartQuiz(){
    // console.log("quiz restarted")
    resultScreen.classList.remove("active")
    startQuiz();
}