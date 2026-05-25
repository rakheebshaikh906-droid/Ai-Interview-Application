const interviewQuestions = {

    javascript: [

        {
            question: "What is JavaScript?",
            answer: "JavaScript is a programming language used to create interactive web pages.",
            difficulty: "easy"
        },

        {
            question: "What is DOM?",
            answer: "DOM stands for Document Object Model.",
            difficulty: "easy"
        },

        {
            question: "Explain closures in JavaScript.",
            answer: "A closure gives access to an outer function scope from an inner function.",
            difficulty: "medium"
        }

    ],

    html: [

        {
            question: "What does HTML stand for?",
            answer: "HTML stands for Hyper Text Markup Language.",
            difficulty: "easy"
        },

        {
            question: "What is semantic HTML?",
            answer: "Semantic HTML uses meaningful tags.",
            difficulty: "medium"
        }

    ],

    css: [

        {
            question: "What is CSS?",
            answer: "CSS is used to style web pages.",
            difficulty: "easy"
        },

        {
            question: "What is Flexbox?",
            answer: "Flexbox is a CSS layout model.",
            difficulty: "medium"
        }

    ]

};

const categorySelect =
    document.getElementById("category");

const difficultySelect =
    document.getElementById("difficulty");

const startBtn =
    document.getElementById("startBtn");

const questionElement =
    document.getElementById("question");

const answerElement =
    document.getElementById("answer");

const showAnswerBtn =
    document.getElementById("showAnswerBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const timerElement =
    document.getElementById("timer");

const scoreElement =
    document.getElementById("score");

const speakBtn =
    document.getElementById("speakBtn");

let currentCategory = [];

let currentQuestionIndex = 0;

let score = 0;

let timer;

let timeLeft = 15;

startBtn.addEventListener("click", function () {

    const selectedCategory =
        categorySelect.value;

    const selectedDifficulty =
        difficultySelect.value;

    currentCategory =
        interviewQuestions[selectedCategory]

            .filter(function (question) {

                return question.difficulty ===
                    selectedDifficulty;

            })

            .sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;

    if (currentCategory.length === 0) {

        questionElement.innerHTML =
            "No questions available 😭";

        return;
    }

    showQuestion();

});

function showQuestion() {

    clearInterval(timer);

    timeLeft = 15;

    timerElement.innerHTML =
        `Time Left: ${timeLeft}s`;

    timer = setInterval(function () {

        timeLeft--;

        timerElement.innerHTML =
            `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            nextBtn.click();

        }

    }, 1000);

    const currentQuestion =
        currentCategory[currentQuestionIndex];

    questionElement.innerHTML =
        currentQuestion.question;

    answerElement.style.display =
        "none";

    answerElement.innerHTML =
        currentQuestion.answer;

    const progress =
        ((currentQuestionIndex + 1)
            / currentCategory.length) * 100;

    progressBar.style.width =
        `${progress}%`;

}

showAnswerBtn.addEventListener("click", function () {

    answerElement.style.display =
        "block";

    score++;

    scoreElement.innerHTML =
        `Score: ${score}`;

});

nextBtn.addEventListener("click", function () {

    currentQuestionIndex++;

    if (currentQuestionIndex
        < currentCategory.length) {

        showQuestion();

    } else {

        clearInterval(timer);

        questionElement.innerHTML =
            "Interview Completed 🎉";

        answerElement.style.display =
            "none";

    }

});

speakBtn.addEventListener("click", function () {

    const speech =
        new SpeechSynthesisUtterance(
            questionElement.innerHTML
        );

    window.speechSynthesis.speak(speech);

});