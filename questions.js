/* =========================================
   QUESTIONS / ANSWERS
========================================= */

const questions = [
    {
        question: "Apa klub bola terbaik di dunia?",
        answer: "MANCHESTER UNITED"
    },

    {
        question: "Apa nama stadion Manchester United?",
        answer: "OLD TRAFFORD"
    },

    {
        question: "Ada berapa trofi Liga Inggris yang dimiliki Manchester United?",
        answer: "20"
    },

    {
        question: "Ada berapa trofi UCL yang dimiliki Manchester United?",
        answer: "3"
    }
];


/* =========================================
   ELEMENTS
========================================= */

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");

const answerInput = document.getElementById("answerInput");
const submitButton = document.getElementById("submitButton");

const feedback = document.getElementById("feedback");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const questionArea = document.getElementById("questionArea");
const successArea = document.getElementById("successArea");

const bottomMessage = document.getElementById("bottomMessage");


/* =========================================
   STATE
========================================= */

let currentQuestion = 0;


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    questionText.textContent = current.question;

    progressText.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / 04`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answerInput.value = "";

    feedback.textContent = "";
    feedback.className = "feedback";

    answerInput.focus();
}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer() {

    const userAnswer = answerInput.value.trim();

    const correctAnswer =
        questions[currentQuestion].answer;

    /* Empty answer */

    if (userAnswer === "") {

        feedback.textContent = "PLEASE ENTER AN ANSWER.";
        feedback.className = "feedback wrong";

        answerInput.focus();

        return;
    }


    /* Exact answer check
       Capital letters are required.
    */

    if (userAnswer === correctAnswer) {

        feedback.textContent = "CORRECT.";
        feedback.className = "feedback correct";

        submitButton.disabled = true;

        setTimeout(() => {

            currentQuestion++;

            if (currentQuestion >= questions.length) {

                showSuccess();

            } else {

                submitButton.disabled = false;

                loadQuestion();

            }

        }, 650);

    } else {

        feedback.textContent = "NOT QUITE. TRY AGAIN.";
        feedback.className = "feedback wrong";

        answerInput.classList.remove("shake");

        void answerInput.offsetWidth;

        answerInput.classList.add("shake");

        answerInput.select();
    }
}


/* =========================================
   SUCCESS
========================================= */

function showSuccess() {

    questionArea.style.display = "none";

    progressText.textContent = "04 / 04";
    progressFill.style.width = "100%";

    successArea.style.display = "block";

    bottomMessage.textContent =
        "you knew exactly what to do.";

    answerInput.blur();
}


/* =========================================
   BUTTON
========================================= */

submitButton.addEventListener("click", checkAnswer);


/* =========================================
   ENTER KEY
========================================= */

answerInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        checkAnswer();
    }
});


/* =========================================
   FORCE UPPERCASE VISUALLY
========================================= */

answerInput.addEventListener("input", function() {

    /*
       The value itself is NOT automatically changed
       to uppercase.

       This is intentional.

       The player has to actually type the answer
       in CAPITAL LETTERS, as instructed.
    */

    feedback.textContent = "";
    feedback.className = "feedback";
});


/* =========================================
   SHAKE ANIMATION
========================================= */

const shakeStyle = document.createElement("style");

shakeStyle.textContent = `
    .shake {
        animation: shakeInput 0.35s ease;
    }

    @keyframes shakeInput {
        0%, 100% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-5px);
        }

        50% {
            transform: translateX(5px);
        }

        75% {
            transform: translateX(-3px);
        }
    }
`;

document.head.appendChild(shakeStyle);


/* =========================================
   START
========================================= */

loadQuestion();