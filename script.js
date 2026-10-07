// yahan par humne HTML elements ko select kiya hai jise hum quiz ke liye use karenge.-------------->

const question = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const answersContainer = document.querySelector(".answers");
const nextButton = document.getElementById("next-btn");
nextButton.disabled = true;
const resultBox = document.querySelector(".result-box");
const quizBox = document.querySelector(".quiz-box");
let finalScore = document.getElementById("final-score");
let restartButton = document.getElementById("restart-btn");

// yahan par questions ka array define kiya gaya hai jisme har question ke liye ek object hai jo question, possible answers aur correct answer ko store karta hai.----------------------->

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },

  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "What does JS stand for?",
    answers: ["JavaScript", "JavaSource", "JustScript", "JScript"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answers: ["<break>", "<lb>", "<br>", "<line>"],
    correctAnswer: "<br>",
  },
];

// Quiz ki current position aur score
let currentQuestionIndex = 0;
let score = 0;

// yahan par humne showQuestion function define kiya hai jo current question ko display karega aur possible answers ko buttons ke roop mein dikhayega.--------------------->

function showQuestion() {
  // yahan par humne questionNumber ko update kiya hai taki user ko pata chale ki wo kaunse question par hai.--------------------->
  const currentQuestion = questions[currentQuestionIndex];
  question.textContent = currentQuestion.question;
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  //  yahan par humne answersContainer ko clear kiya hai taki purane answers remove ho jayein aur naye answers display ho sakein.--------------------->
  answersContainer.innerHTML = "";
nextButton.disabled = true;
  // yahan par humne current question ke answers ko loop kiya hai aur har answer ke liye ek button create kiya hai.--------------------->
  currentQuestion.answers.forEach((answer) => {
    //    yahan par humne ek button create kiya hai jisme answer ka text content set kiya gaya hai aur usse answersContainer mein append kiya gaya hai.--------------------->

    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    answersContainer.appendChild(button);

    // yahan par humne har button ke liye click event listener add kiya hai jo check karega ki user ne sahi answer select kiya hai ya nahi.--------------------->

    button.addEventListener("click", () => {
      if (answer === currentQuestion.correctAnswer) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        button.style.backgroundColor = "#27ae60";
        button.style.color = "white";
      } else {
        button.style.backgroundColor = "#e74c3c";
        button.style.color = "white";

        // yahan par humne correct answer ko highlight kiya hai taki user ko pata chale ki sahi answer kya tha.--------------------->
        const answerButtons = answersContainer.querySelectorAll(".answer-btn");

        answerButtons.forEach((answerButton) => {
          if (answerButton.textContent === currentQuestion.correctAnswer) {
            answerButton.style.backgroundColor = "#27ae60";
            answerButton.style.color = "white";
          }
        });
      }
      nextButton.disabled = false;
      // yahan par humne saare answer buttons ko disable kar diya hai taki user ek hi answer select kar sake.--------------------->
      const answerButtons = answersContainer.querySelectorAll(".answer-btn");

      answerButtons.forEach((answerButton) => {
        answerButton.disabled = true;
      });
    });
  });
}

showQuestion();

// yahan par humne nextButton ke liye click event listener add kiya hai jo check karega ki agar current question last question nahi hai to next question show karega aur agar last question hai to result box show karega.--------------------->
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    finalScore.textContent = `${score} / ${questions.length}`;
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;

  scoreDisplay.textContent = `Score: ${score}`;
  nextButton.disabled = true;
  quizBox.style.display = "block";
  resultBox.style.display = "none";

  showQuestion();
});
