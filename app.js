// ==================================
// QUIZCONNECT - ONLINE QUIZ SYSTEM
// ==================================
const SUPABASE_URL = "https://xazwlnpcvlxvslyytgfx.supabase.co";
const SUPABASE_KEY = "sb_publishable_NRS-d80t7sd5UjpFFSMONQ_q0DFBxIw"

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const quizzes = {
  "JavaScript Basics": [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["int", "let", "string", "define"],
      answer: 1
    },
    {
      question: "Which symbol is used for single-line comments?",
      options: ["//", "/*", "#", "<!--"],
      answer: 0
    },
    {
      question: "Which method displays a message in the console?",
      options: ["print()", "display()", "console.log()", "show()"],
      answer: 2
    },
    {
      question: "Which data type represents true or false?",
      options: ["String", "Boolean", "Number", "Array"],
      answer: 1
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["function", "method", "define", "create"],
      answer: 0
    }
  ],

  "Database Basics": [
    {
      question: "What does DBMS stand for?",
      options: [
        "Data Backup Management System",
        "Database Management System",
        "Digital Base Management Software",
        "Database Main Server"
      ],
      answer: 1
    },
    {
      question: "Which language is commonly used to query databases?",
      options: ["HTML", "CSS", "SQL", "JavaScript"],
      answer: 2
    },
    {
      question: "What is a primary key?",
      options: [
        "A unique identifier for a record",
        "A duplicate value",
        "A database password",
        "A table name"
      ],
      answer: 0
    },
    {
      question: "Which command retrieves data from a table?",
      options: ["INSERT", "DELETE", "UPDATE", "SELECT"],
      answer: 3
    },
    {
      question: "What is a database table made up of?",
      options: [
        "Slides and pages",
        "Rows and columns",
        "Images and videos",
        "Files and folders"
      ],
      answer: 1
    }
  ],

  "Web Development": [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Main Language",
        "Home Tool Markup Language"
      ],
      answer: 0
    },
    {
      question: "Which language is used to style web pages?",
      options: ["HTML", "CSS", "SQL", "Python"],
      answer: 1
    },
    {
      question: "Which HTML tag creates a hyperlink?",
      options: ["<p>", "<img>", "<a>", "<h1>"],
      answer: 2
    },
    {
      question: "Which tag is used to insert an image?",
      options: ["<image>", "<img>", "<picture-text>", "<src>"],
      answer: 1
    },
    {
      question: "Which language makes web pages interactive?",
      options: ["CSS", "HTML", "JavaScript", "SQL"],
      answer: 2
    }
  ]
};

// HTML elements
const quizButtons = document.querySelectorAll("[data-quiz]");
const quizSection = document.getElementById("quizSection");

const quizTitle = document.getElementById("quizTitle");
const questionText = document.getElementById("questionText");
const questionProgress = document.getElementById("questionProgress");
const answerOptions = document.getElementById("answerOptions");

const timerDisplay = document.getElementById("timer");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const questionCard = document.querySelector(".question-card");
const quizNavigation = document.querySelector(".quiz-navigation");

const quizResult = document.getElementById("quizResult");
const scoreText = document.getElementById("scoreText");
const homeBtn = document.getElementById("homeBtn");

const welcomeSection = document.querySelector(".welcome");
const statsSection = document.querySelector(".stats");
const homeQuizSection = document.querySelector(".container > .section:not(.community)");

const message = document.getElementById("message");

// Quiz variables
let currentQuiz = [];
let currentQuestion = 0;
let selectedAnswers = [];
let timeLeft = 600;
let timerInterval = null;
let quizSubmitted = false;

// Start a quiz
quizButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const quizName = button.dataset.quiz;

    currentQuiz = quizzes[quizName];

    if (!currentQuiz) {
      alert("Quiz not found!");
      return;
    }

    currentQuestion = 0;
    selectedAnswers = Array(currentQuiz.length).fill(null);
    quizSubmitted = false;

    timeLeft = 600;

    welcomeSection.hidden = true;
    statsSection.hidden = true;
    homeQuizSection.hidden = true;

    quizSection.hidden = false;
    quizResult.hidden = true;
    questionCard.hidden = false;
    quizNavigation.hidden = false;

    quizTitle.textContent = quizName;

    displayQuestion();
    startTimer();

    quizSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Display question
function displayQuestion() {
  const question = currentQuiz[currentQuestion];

  questionText.textContent = question.question;

  questionProgress.textContent =
    `Question ${currentQuestion + 1} of ${currentQuiz.length}`;

  answerOptions.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "answer-option";
    button.textContent = option;

    if (selectedAnswers[currentQuestion] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      selectedAnswers[currentQuestion] = index;
      displayQuestion();
    });

    answerOptions.appendChild(button);
  });

  previousBtn.disabled = currentQuestion === 0;

  nextBtn.hidden = currentQuestion === currentQuiz.length - 1;

  submitBtn.hidden = currentQuestion !== currentQuiz.length - 1;
}

// Next question
nextBtn.addEventListener("click", () => {
  if (currentQuestion < currentQuiz.length - 1) {
    currentQuestion++;
    displayQuestion();
  }
});

// Previous question
previousBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
});

// Start countdown timer
function startTimer() {
  clearInterval(timerInterval);

  updateTimer();

  timerInterval = setInterval(() => {
    timeLeft--;

    updateTimer();

    if (timeLeft <= 0) {
      finishQuiz();
    }
  }, 1000);
}

// Update timer display
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Submit quiz
submitBtn.addEventListener("click", () => {
  const unanswered = selectedAnswers.filter(
    answer => answer === null
  ).length;

  if (unanswered > 0) {
    const confirmSubmit = confirm(
      `You have ${unanswered} unanswered questions. Submit anyway?`
    );

    if (!confirmSubmit) {
      return;
    }
  }

  finishQuiz();
});

// Calculate result
function finishQuiz() {
  if (quizSubmitted) return;

  quizSubmitted = true;

  clearInterval(timerInterval);

  let score = 0;

  currentQuiz.forEach((question, index) => {
    if (selectedAnswers[index] === question.answer) {
      score++;
    }
  });

  const percentage = Math.round(
    (score / currentQuiz.length) * 100
  );

  questionCard.hidden = true;
  quizNavigation.hidden = true;
  quizResult.hidden = false;

  const wrongAnswers = currentQuiz.length - score;

scoreText.innerHTML = `
  <div class="result-summary">
    <h2>🎉 Quiz Completed!</h2>

    <h1>${percentage}%</h1>
    <p>You scored ${score} out of ${currentQuiz.length}</p>

    <div class="result-details">
      <div class="result-box">
        <h3>${currentQuiz.length}</h3>
        <p>Total Questions</p>
      </div>

      <div class="result-box">
        <h3>${score}</h3>
        <p>Correct Answers</p>
      </div>

      <div class="result-box">
        <h3>${wrongAnswers}</h3>
        <p>Wrong Answers</p>
      </div>
    </div>

    <p>
      ${percentage >= 80
        ? "Excellent work! 🌟"
        : percentage >= 50
        ? "Good effort! Keep practising! 💪"
        : "Keep learning. You can do better! ❤️"}
    </p>
  </div>
`;

  quizResult.scrollIntoView({ behavior: "smooth" });
}
// Review answers button
const reviewBtn = document.getElementById("reviewBtn");

function reviewAnswers() {
  let reviewHTML = `
    <div class="review-section">
      <h2>📋 Review Your Answers</h2>
  `;

  currentQuiz.forEach((question, index) => {
    const selected = selectedAnswers[index];
    const correct = question.answer;

    reviewHTML += `
      <div class="review-card">
        <h3>Question ${index + 1}</h3>
        <p>${question.question}</p>

        <p>
          Your Answer:
          <strong>
            ${selected === null
              ? "Not Answered"
              : question.options[selected]}
          </strong>
        </p>

        <p>
          Correct Answer:
          <strong>${question.options[correct]}</strong>
        </p>

        <p>
          ${selected === correct
            ? "✅ Correct"
            : "❌ Incorrect"}
        </p>
      </div>
    `;
  });

  reviewHTML += `</div>`;

  quizResult.insertAdjacentHTML("beforeend", reviewHTML);
}

reviewBtn.addEventListener("click", () => {
  reviewAnswers();
});

// Return to homepage

homeBtn.addEventListener("click", () => {
  clearInterval(timerInterval);

  quizSection.hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  questionCard.hidden = false;
  quizNavigation.hidden = false;
  quizResult.hidden = true;

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Community button
document.getElementById("communityBtn").addEventListener("click", () => {
  message.textContent =
    "Your learning community is coming soon! ❤️";
});
// ==================================
// SUPABASE SIGNUP AND LOGIN
// ==================================

const authSection = document.getElementById("authSection");
const authMessage = document.getElementById("authMessage");

const signupName = document.getElementById("signupName");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

// Hide the quiz homepage until login
document.querySelector("main").hidden = true;

// Create account
signupBtn.addEventListener("click", async () => {
  const name = signupName.value.trim();
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!name || !email || !password) {
    authMessage.textContent = "Please fill in all fields.";
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: name
      }
    }
  });

  if (error) {
    authMessage.textContent = error.message;
    return;
  }

  authMessage.textContent =
    "Account created! Check your email if confirmation is required.";
});

// Login
loginBtn.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    authMessage.textContent = "Enter your email and password.";
    return;
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
    authMessage.textContent = error.message;
    return;
  }

  authMessage.textContent = "Login successful! 🎉";

  authSection.hidden = true;
  document.querySelector("main").hidden = false;
});