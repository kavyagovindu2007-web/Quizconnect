// ==================================
// QUIZCONNECT - ONLINE QUIZ SYSTEM
// ==================================
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
   ],

  "Python Programming": [
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/*", "<!--"],
      answer: 1
    },
    {
      question: "Which function displays output in Python?",
      options: ["echo()", "display()", "print()", "show()"],
      answer: 2
    },
    {
      question: "Which data type stores text in Python?",
      options: ["int", "str", "float", "bool"],
      answer: 1
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["function", "define", "fun", "def"],
      answer: 3
    },
    {
      question: "Which operator is used for exponentiation?",
      options: ["*", "**", "//", "%"],
      answer: 1
    }
  ],

  "C Programming": [
    {
      question: "Who developed the C programming language?",
      options: [
        "James Gosling",
        "Dennis Ritchie",
        "Guido van Rossum",
        "Bjarne Stroustrup"
      ],
      answer: 1
    },
    {
      question: "Which function is the entry point of a C program?",
      options: ["start()", "run()", "main()", "begin()"],
      answer: 2
    },
    {
      question: "Which symbol ends a statement in C?",
      options: [".", ":", ";", ","],
      answer: 2
    },
    {
      question: "Which format specifier is used for an integer?",
      options: ["%f", "%c", "%d", "%s"],
      answer: 2
    },
    {
      question: "Which header file is commonly used for printf()?",
      options: ["<math.h>", "<stdio.h>", "<string.h>", "<stdlib.h>"],
      answer: 1
    }
  ],

  "Data Structures": [
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: 1
    },
    {
      question: "Which data structure follows FIFO?",
      options: ["Stack", "Tree", "Queue", "Graph"],
      answer: 2
    },
    {
      question: "Which data structure stores elements in indexed positions?",
      options: ["Array", "Tree", "Graph", "Stack"],
      answer: 0
    },
    {
      question: "Which operation adds an element to a stack?",
      options: ["Pop", "Delete", "Push", "Search"],
      answer: 2
    },
    {
      question: "Which data structure consists of nodes connected by links?",
      options: ["Array", "Linked List", "Queue", "Matrix"],
      answer: 1
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
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const logoutBtn = document.getElementById("logoutBtn");

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
async function finishQuiz() {
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

  const wrongAnswers = currentQuiz.length - score;
  // Save completed quiz to Supabase
const { data: { user } } = await supabaseClient.auth.getUser();

if (user) {
  const { error } = await supabaseClient
    .from("quiz_completions")
    .insert([
      { user_id: user.id }
    ]);

  if (error) {
    console.error("Error saving quiz completion:", error.message);
  }
}
// Save quiz result for private quiz history
if (user) {
  const { error: resultError } = await supabaseClient
    .from("quiz_results")
    .insert([
      {
        user_id: user.id,
        quiz_name: quizTitle.textContent,
        score: score,
        total_questions: currentQuiz.length,
        percentage: percentage
      }
    ]);

  if (resultError) {
    console.error("Error saving quiz result:", resultError.message);
  }
}
console.log("QUIZ SUBMISSION REACHED RESULT DISPLAY");
console.log("Score:", score);
console.log("Percentage:", percentage);
console.log("Quiz result element:", quizResult);
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
questionCard.hidden = true;
quizNavigation.hidden = true;
quizResult.hidden = false;
// Refresh homepage statistics
await loadStudyStreak();
await loadStreakCalendar();
await loadQuizHistory();
await loadTotalQuizzes();
questionCard.hidden = true;
quizNavigation.hidden = true;
quizResult.hidden = false;
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
  console.log("REVIEW BUTTON CLICKED");
  console.log("Current Quiz:", currentQuiz);
  console.log("Selected Answers:", selectedAnswers);

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

// Open Student Community
document.getElementById("communityBtn").addEventListener("click", () => {
  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = false;
  loadCommunityMembers();

  document.getElementById("communitySection").scrollIntoView({
    behavior: "smooth"
  });
});
// Open My Achievements
document.getElementById("achievementsBtn").addEventListener("click", () => {
  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = true;
  document.getElementById("achievementsSection").hidden = false;
loadMyAchievements();
  document.getElementById("achievementsSection").scrollIntoView({
    behavior: "smooth"
  });
});
// ==========================================
// OPEN MY CERTIFICATES GALLERY
// ==========================================

document.getElementById("myCertificateBtn")
.addEventListener("click", async () => {

  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = true;
  document.getElementById("achievementsSection").hidden = true;

  const { data: { user } } =
    await supabaseClient.auth.getUser();

  if (!user) {
    alert("Please log in to view your certificates.");
    return;
  }

  const { data, error } = await supabaseClient
    .from("certificates")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    alert("Certificate Error: " + error.message);
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    alert("You haven't earned any certificates yet.");
    return;
  }

  const certificateList =
    document.getElementById("certificateList");

  certificateList.innerHTML = "";

document.getElementById("certificateMessage").hidden = true;
document.getElementById("certificateSection").hidden = false;

// Remove duplicate certificates from gallery display
const uniqueCertificates = Object.values(
  data.reduce((result, certificate) => {

    const examName = certificate.exam_name;
    const existing = result[examName];

    if (
      !existing ||
      Number(certificate.score) > Number(existing.score) ||
      (
        Number(certificate.score) === Number(existing.score) &&
        new Date(certificate.created_at) > new Date(existing.issued_at)
      )
    ) {
      result[examName] = certificate;
    }

    return result;

  }, {})
);

uniqueCertificates.forEach((certificate, index) => {

    const card = document.createElement("div");

    card.className = "certificate-paper";
    card.id = `certificate-card-${index}`;

    card.innerHTML = `
      <div class="certificate-header">
        <img src="quizconnect-logo.png"
             alt="QuizConnect Logo"
             class="certificate-logo">
        <p>LEARN • PRACTICE • EXCEL</p>
      </div>

      <div class="certificate-decoration">
        CERTIFICATE OF ACHIEVEMENT
      </div>

      <p class="certificate-intro">
        This certificate is proudly presented to
      </p>

      <h1 class="certificate-student"></h1>

      <p>For successfully completing</p>

      <h2 class="certificate-exam"></h2>

      <div class="certificate-score">
        <p class="certificate-marks"></p>
        <p class="certificate-percentage"></p>
      </div>

      <p class="certificate-date"></p>

      <div class="certificate-footer">
        <div class="certificate-signature">
          <div class="signature-line"></div>
          <p>Authorized Signatory</p>
          <p>QuizConnect</p>
        </div>

        <div class="certificate-qr">
          <div class="certificate-qr-code"></div>
          <p>Scan to Verify</p>
        </div>
      </div>

      <p class="certificate-id"></p>

      <button class="primary-btn certificate-download-btn">
        📥 Download Certificate
      </button>
    `;

    certificateList.appendChild(card);

    card.querySelector(".certificate-student").textContent =
      certificate.student_name;

    card.querySelector(".certificate-exam").textContent =
      certificate.exam_name;

    card.querySelector(".certificate-marks").textContent =
      `Score: ${certificate.score}/${certificate.total_questions}`;

    card.querySelector(".certificate-percentage").textContent =
      `${certificate.percentage}%`;

   card.querySelector(".certificate-date").textContent =
  certificate.issued_at
    ? new Date(certificate.issued_at).toLocaleDateString("en-IN")
    : "";

    card.querySelector(".certificate-id").textContent =
      `Certificate ID: ${certificate.certificate_id}`;

    const verificationURL =
      new URL("verify.html", window.location.href).href +
      "?id=" + encodeURIComponent(certificate.certificate_id);

    new QRCode(card.querySelector(".certificate-qr-code"), {
      text: verificationURL,
      width: 150,
      height: 150
    });

    card.querySelector(".certificate-download-btn")
      .addEventListener("click", () => {

        card.classList.add("print-target");
        window.print();
        card.classList.remove("print-target");

      });

  });

  document.getElementById("certificateEligibility").hidden = false;

  document.getElementById("certificateSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Back to Home from My Achievements
document.getElementById("backFromAchievements").addEventListener("click", () => {
  document.getElementById("achievementsSection").hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// Open Learning Paths
document.getElementById("learningPathsBtn").addEventListener("click", () => {

  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = true;
  document.getElementById("achievementsSection").hidden = true;
  document.getElementById("learningPathsSection").hidden = false;

  document.getElementById("learningPathsSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Open Online Examination
document.getElementById("examinationBtn").addEventListener("click", () => {

  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = true;
  document.getElementById("achievementsSection").hidden = true;
  document.getElementById("learningPathsSection").hidden = true;

  document.getElementById("examinationSection").hidden = false;

  document.getElementById("examinationSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Start or Resume Java Examination
document.getElementById("startExaminationBtn").addEventListener("click", async () => {

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    alert("Please log in first.");
    return;
  }

  examinationUserId = user.id;
  examinationSubmitted = false;

  const savedExam = loadExaminationProgress(user.id);
  if (savedExam && savedExam.endTime <= Date.now()) {

  examinationAnswers = savedExam.answers || {};
  examinationEndTime = savedExam.endTime;
  examinationTabSwitchCount = savedExam.tabSwitchCount || 0;

  examinationTimeLeft = 0;

  alert("⏰ Your examination time has expired. Your answers will be submitted automatically.");

  await finishExamination();
  return;
}
// Check eligibility only when starting a NEW examination
if (!savedExam) {

  const { count: eligibleQuizCount, error: eligibilityError } =
    await supabaseClient
      .from("quiz_results")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("total_questions", 5)
      .gte("score", 3)
      .neq("quiz_name", "Java Examination");

  if (eligibilityError) {
    console.error("Eligibility check error:", eligibilityError.message);
    alert("Unable to check examination eligibility. Please try again.");
    return;
  }

  if (eligibleQuizCount < 10) {
    alert(
      `You have completed ${eligibleQuizCount} qualifying quizzes out of 10.\n\nYou need at least 10 quizzes with a score of 3/5 or above in each quiz to attempt the examination.`
    );
    return;
  }
}
  if (savedExam) {

    // RESUME PREVIOUS EXAMINATION
    examinationAnswers = savedExam.answers || {};
    examinationEndTime = savedExam.endTime;
    examinationTabSwitchCount = savedExam.tabSwitchCount || 0;

    examinationTimeLeft = Math.ceil(
      (examinationEndTime - Date.now()) / 1000
    );

    alert("Your previous examination has been restored!");

  } else {

    // START A NEW EXAMINATION
    examinationAnswers = {};
    examinationTabSwitchCount = 0;
    examinationTimeLeft = 60 * 60;
    examinationEndTime = Date.now() + (60 * 60 * 1000);

    examinationSubmitted = false;

    saveExaminationProgress(user.id);

  }

  document.getElementById("examinationSection").hidden = true;
  document.getElementById("examinationQuizSection").hidden = false;

  try {
    displayAllExaminationQuestions();
  } catch (error) {
    alert("Examination Error: " + error.message);
    return;
  }

  startExaminationTimer();

  document.getElementById("examinationQuizSection").scrollIntoView({
    behavior: "smooth"
  });

});
// ==========================================
// JAVA EXAMINATION - QUESTION BANK
// ==========================================

const javaExaminationQuestions = [

  {
    question: "Who developed Java?",
    options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
    answer: 0
  },
  {
    question: "Which of these is not a Java feature?",
    options: ["Object-oriented", "Platform independent", "Pointer-based", "Secure"],
    answer: 2
  },
  {
    question: "Which keyword is used to create a class in Java?",
    options: ["function", "class", "struct", "define"],
    answer: 1
  },
  {
    question: "Which method is the entry point of a Java program?",
    options: ["start()", "run()", "main()", "execute()"],
    answer: 2
  },
  {
    question: "Which data type stores true or false?",
    options: ["int", "char", "boolean", "float"],
    answer: 2
  },
  {
    question: "Which keyword creates an object?",
    options: ["class", "new", "this", "object"],
    answer: 1
  },
  {
    question: "Which symbol terminates a Java statement?",
    options: [".", ":", ";", ","],
    answer: 2
  },
  {
    question: "Which concept allows multiple methods with the same name?",
    options: ["Inheritance", "Encapsulation", "Method overloading", "Abstraction"],
    answer: 2
  },
  {
    question: "Which keyword is used for inheritance in Java?",
    options: ["implements", "extends", "inherits", "super"],
    answer: 1
  },
  {
    question: "Which package is imported automatically in Java?",
    options: ["java.util", "java.io", "java.lang", "java.net"],
    answer: 2
  },
  {
    question: "What is the size of an int in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    answer: 2
  },
  {
    question: "Which operator checks equality?",
    options: ["=", "==", "!=", "==="],
    answer: 1
  },
  {
    question: "Which loop executes at least once?",
    options: ["for", "while", "do-while", "foreach"],
    answer: 2
  },
  {
    question: "Which keyword prevents inheritance?",
    options: ["static", "final", "private", "const"],
    answer: 1
  },
  {
    question: "Which keyword refers to the current object?",
    options: ["super", "this", "self", "current"],
    answer: 1
  },
  {
    question: "Which block handles exceptions?",
    options: ["try-catch", "if-else", "switch-case", "for-loop"],
    answer: 0
  },
  {
    question: "Which keyword is used to throw an exception?",
    options: ["throws", "throw", "catch", "final"],
    answer: 1
  },
  {
    question: "Which collection does not allow duplicate elements?",
    options: ["List", "ArrayList", "Set", "LinkedList"],
    answer: 2
  },
  {
    question: "Which class is used to read input from the keyboard?",
    options: ["Scanner", "Printer", "Writer", "File"],
    answer: 0
  },
  {
    question: "Which keyword is used to implement an interface?",
    options: ["extends", "implements", "interface", "inherits"],
    answer: 1
  },
  {
    question: "What does JVM stand for?",
    options: ["Java Variable Machine", "Java Virtual Machine", "Java Verified Method", "Java Visual Model"],
    answer: 1
  },
  {
    question: "What does JDK stand for?",
    options: ["Java Development Kit", "Java Design Kit", "Java Deployment Kernel", "Java Data Kit"],
    answer: 0
  },
  {
    question: "What does JRE stand for?",
    options: ["Java Runtime Environment", "Java Read Environment", "Java Remote Engine", "Java Runtime Editor"],
    answer: 0
  },
  {
    question: "Which access modifier provides the widest visibility?",
    options: ["private", "protected", "public", "default"],
    answer: 2
  },
  {
    question: "Which keyword declares a constant-like variable?",
    options: ["static", "final", "constant", "fixed"],
    answer: 1
  },
  {
    question: "Which method compares the contents of strings?",
    options: ["==", "compare", "equals()", "check()"],
    answer: 2
  },
  {
    question: "Which class represents a sequence of characters?",
    options: ["Integer", "String", "Boolean", "Character"],
    answer: 1
  },
  {
    question: "Which keyword is used to define an abstract class?",
    options: ["virtual", "abstract", "interface", "static"],
    answer: 1
  },
  {
    question: "Which keyword calls a parent class constructor?",
    options: ["this", "parent", "super", "base"],
    answer: 2
  },
  {
    question: "Which of these is a wrapper class for int?",
    options: ["Int", "Integer", "NumberInt", "Long"],
    answer: 1
  },
  {
    question: "Which statement exits a loop immediately?",
    options: ["continue", "skip", "break", "return"],
    answer: 2
  },
  {
    question: "Which statement skips the current loop iteration?",
    options: ["break", "continue", "exit", "stop"],
    answer: 1
  },
  {
    question: "Which keyword is used to create a subclass?",
    options: ["extends", "implements", "super", "new"],
    answer: 0
  },
  {
    question: "Which of these supports key-value pairs?",
    options: ["ArrayList", "HashMap", "HashSet", "LinkedList"],
    answer: 1
  },
  {
    question: "Which method returns the length of a String?",
    options: ["size()", "count()", "length()", "getLength()"],
    answer: 2
  },
  {
    question: "Which method starts a Java thread?",
    options: ["run()", "start()", "execute()", "begin()"],
    answer: 1
  },
  {
    question: "Which keyword makes a method belong to the class?",
    options: ["final", "static", "public", "abstract"],
    answer: 1
  },
  {
    question: "Which exception occurs when dividing an integer by zero?",
    options: ["IOException", "NullPointerException", "ArithmeticException", "ClassNotFoundException"],
    answer: 2
  },
  {
    question: "Which interface is commonly used to define a thread task?",
    options: ["Runnable", "Serializable", "Comparable", "Cloneable"],
    answer: 0
  },
  {
    question: "Which keyword is used to declare an interface?",
    options: ["class", "interface", "implements", "abstract"],
    answer: 1
  },
  {
    question: "Which collection maintains insertion order and allows duplicates?",
    options: ["HashSet", "TreeSet", "ArrayList", "HashMap"],
    answer: 2
  },
  {
    question: "Which operator performs logical AND?",
    options: ["||", "&&", "&!", "!"],
    answer: 1
  },
  {
    question: "Which keyword is used to return a value from a method?",
    options: ["break", "return", "yield", "send"],
    answer: 1
  },
  {
    question: "What is the default value of an instance int variable?",
    options: ["1", "null", "0", "undefined"],
    answer: 2
  },
  {
    question: "Which class is commonly used for file reading?",
    options: ["FileReader", "FileWriter", "PrintWriter", "ScannerOutput"],
    answer: 0
  },
  {
    question: "Which feature allows one interface to have multiple implementations?",
    options: ["Polymorphism", "Compilation", "Iteration", "Serialization"],
    answer: 0
  },
  {
    question: "Which keyword is used to handle a checked exception declaration?",
    options: ["throw", "throws", "catch", "finally"],
    answer: 1
  },
  {
    question: "Which method converts a string to an integer?",
    options: ["Integer.parseInt()", "String.toInt()", "int.convert()", "parse.String()"],
    answer: 0
  },
  {
    question: "Which component converts Java bytecode into machine instructions at runtime?",
    options: ["Javadoc", "JIT compiler", "Java editor", "Debugger"],
    answer: 1
  },
  {
    question: "What is the extension of a compiled Java bytecode file?",
    options: [".java", ".class", ".js", ".exe"],
    answer: 1
  }

];

// ==========================================
// JAVA EXAMINATION VARIABLES
// ==========================================

let examinationAnswers = {};
let examinationTimeLeft = 60 * 60;
let examinationTimerInterval = null;
let examinationSubmitted = false;
let examinationEndTime = null;
let examinationUserId = null;
// SAVE EXAMINATION PROGRESS
function saveExaminationProgress(userId) {

  localStorage.setItem(
    `javaExam_${userId}`,
    JSON.stringify({
      answers: examinationAnswers,
      endTime: examinationEndTime,
      tabSwitchCount: examinationTabSwitchCount
    })
  );

}
// RESTORE EXAMINATION PROGRESS
function loadExaminationProgress(userId) {

  const savedData = localStorage.getItem(
    `javaExam_${userId}`
  );

  if (!savedData) {
    return null;
  }

  const examData = JSON.parse(savedData);

  // Return saved data even if expired
  // so the student cannot start a fresh attempt.
  return examData;

}
// ==========================================
// JAVA EXAMINATION TIMER
// ==========================================

function updateExaminationTimer() {

  const minutes = Math.floor(examinationTimeLeft / 60);
  const seconds = examinationTimeLeft % 60;

  document.getElementById("examinationTimer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startExaminationTimer() {

  clearInterval(examinationTimerInterval);

  function updateTimer() {

    examinationTimeLeft = Math.max(
      0,
      Math.ceil((examinationEndTime - Date.now()) / 1000)
    );

    updateExaminationTimer();

    if (examinationUserId) {
      saveExaminationProgress(examinationUserId);
    }

    if (examinationTimeLeft <= 0) {
      clearInterval(examinationTimerInterval);
      finishExamination();
    }

  }

  updateTimer();

  if (examinationTimeLeft > 0) {
    examinationTimerInterval = setInterval(updateTimer, 1000);
  }

}
// Connect Submit Examination button
document.getElementById("examinationSubmitBtn").addEventListener("click", () => {
  finishExamination();
});
// ==========================================
// FINISH JAVA EXAMINATION
// ==========================================

async function finishExamination() {

  if (examinationSubmitted) return;

  examinationSubmitted = true;

  const { data: { user } } = await supabaseClient.auth.getUser();

  clearInterval(examinationTimerInterval);

  let score = 0;

  javaExaminationQuestions.forEach((question, index) => {
    const totalQuestions = javaExaminationQuestions.length;

    if (examinationAnswers[index] === question.answer) {
      score++;
    }

  });
const percentage = Math.round((score / totalQuestions) * 100);
  const wrongAnswers = totalQuestions - score;
  // Save Java Examination result in Supabase
if (user) {
  const { error: examSaveError } = await supabaseClient
    .from("quiz_results")
    .insert([
      {
        user_id: user.id,
        quiz_name: "Java Examination",
        score: score,
        total_questions: totalQuestions,
        percentage: percentage
      }
    ]);

  if (examSaveError) {
    console.error("Error saving examination result:", examSaveError.message);
 } else {
  console.log("Java Examination result saved successfully!");

  // Clear saved progress only after successful submission
  localStorage.removeItem(`javaExam_${user.id}`);
}
} else {
  console.error("No logged-in user found!");
}
// SAVE CERTIFICATE IN SUPABASE

let savedCertificate = null;

if (score >= 45 && user) {

  const studentName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Student";


// ==========================================
// SAVE OR UPDATE HIGHEST EXAMINATION CERTIFICATE
// ==========================================

const { data: existingCertificates, error: fetchError } =
  await supabaseClient
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .eq("exam_name", "Java Examination");

if (fetchError) {
  console.error("Certificate lookup failed:", fetchError.message);

} else if (!existingCertificates || existingCertificates.length === 0) {

  // FIRST PASSING ATTEMPT: CREATE CERTIFICATE

  const { data: certificateData, error: certificateError } =
    await supabaseClient
      .from("certificates")
      .insert([
        {
          user_id: user.id,
          student_name: studentName,
          exam_name: "Java Examination",
          score: score,
          total_questions: totalQuestions,
          percentage: percentage
        }
      ])
      .select()
      .single();

  if (certificateError) {
    console.error("Certificate saving failed:", certificateError.message);
  } else {
    savedCertificate = certificateData;
    console.log("First examination certificate created!");
  }

} else {

  // FIND THE HIGHEST EXISTING SCORE

  const bestCertificate = existingCertificates.reduce(
    (best, current) =>
      Number(current.score) > Number(best.score) ? current : best
  );

  if (Number(score) > Number(bestCertificate.score)) {

    // UPDATE CERTIFICATE IF NEW SCORE IS HIGHER

    const { data: updatedCertificate, error: updateError } =
      await supabaseClient
        .from("certificates")
        .update({
          score: score,
          total_questions: totalQuestions,
          percentage: percentage,
          student_name: studentName
        })
        .eq("certificate_id", bestCertificate.certificate_id)
        .select()
        .single();

    if (updateError) {
      console.error("Certificate update failed:", updateError.message);
      savedCertificate = bestCertificate;
    } else {
      savedCertificate = updatedCertificate;
      console.log("Certificate updated with new highest score!");
    }

  } else {

    // KEEP PREVIOUS HIGHEST SCORE

    savedCertificate = bestCertificate;
    console.log("Previous highest certificate retained!");

  }

  // REMOVE EXTRA DUPLICATE CERTIFICATES

  const { error: duplicateError } = await supabaseClient
    .from("certificates")
    .delete()
    .eq("user_id", user.id)
    .eq("exam_name", "Java Examination")
    .neq("certificate_id", savedCertificate.certificate_id);

    if (duplicateError) {
    console.error("Duplicate cleanup failed:", duplicateError.message);
  } else {
    console.log("Duplicate certificates cleaned successfully!");
  }

} // Close existing certificates block

} // Close score >= 45 condition

document.getElementById("examinationQuestionsContainer").hidden = true;
  document.getElementById("examinationTimer").parentElement.hidden = true;

  document.getElementById("examinationSubmitBtn").hidden = true;

  document.getElementById("examinationResult").hidden = false;

    document.getElementById("examinationResult").innerHTML = `
    <div class="result-card">
      <h2>Examination Completed!</h2>
      <h3>Your Score: ${score} / ${totalQuestions}</h3>
      <h3>Percentage: ${percentage}%</h3>
      <p>Thank you for attending the Java Examination.</p>

${
  savedCertificate !== null
    ? `<p>🎓 Congratulations! You are eligible for an examination certificate!</p>
       <button id="viewCertificateBtn" class="primary-btn">
         🏆 View My Certificate
       </button>`
    : `<p>Keep learning! You need at least 45 out of 50 marks to earn a certificate.</p>`
}

<button id="reviewAnswersBtn" class="secondary-btn">
        📋 Review Answers
      </button>

    </div>
  `;
  // VIEW MY CERTIFICATE GALLERY
const viewCertificateBtn =
  document.getElementById("viewCertificateBtn");

if (viewCertificateBtn) {
  viewCertificateBtn.addEventListener("click", () => {

    document.getElementById("examinationQuizSection").hidden = true;

    const myCertificateBtn =
      document.getElementById("myCertificateBtn");

    if (myCertificateBtn) {
      myCertificateBtn.click();
    }

  });
}
  document.getElementById("reviewAnswersBtn").addEventListener("click", () => {

    displayReviewAnswers();

    document.getElementById("reviewAnswersBtn").hidden = true;

  });
}
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
  alert(error.message);
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

await loadJavaScriptProgress(data.user.id);

authSection.hidden = true;
document.querySelector("main").hidden = false;

});


// Exit Java Examination
document.getElementById("exitExaminationBtn").addEventListener("click", () => {

  document.getElementById("examinationQuizSection").hidden = true;
  document.getElementById("examinationSection").hidden = false;

  document.getElementById("examinationSection").scrollIntoView({
    behavior: "smooth"
  });

});


// Back to Home from Examination
document.getElementById("backFromExamination").addEventListener("click", () => {

  document.getElementById("examinationSection").hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });

});


// Back to Home from Student Community
document.getElementById("backHomeBtn").addEventListener("click", () => {

  document.getElementById("communitySection").hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });

});


// Back to Home from Learning Paths
document.getElementById("backFromLearningPaths").addEventListener("click", () => {

  document.getElementById("learningPathsSection").hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });

});
// Load saved learning progress for any subject
async function loadLearningProgress(userId, subject) {

  const { data, error } = await supabaseClient
    .from("learning_progress")
    .select("completed_levels, unlocked_level")
    .eq("user_id", userId)
    .eq("subject", subject)
    .maybeSingle();

  if (error) {
    console.error("Learning progress error:", error.message);
    return null;
  }

  console.log(
    `Restored ${subject} level:`,
    data ? data.unlocked_level : 1
  );

  return data;
}

// Keep existing JavaScript progress restoration working
async function loadJavaScriptProgress(userId) {

  const data = await loadLearningProgress(userId, "JavaScript");

  unlockedJavaScriptLevel = data
    ? data.unlocked_level
    : 1;
}
// Save learning progress for any subject
async function saveLearningProgress(subject, currentLevel, unlockedLevel) {

  const { data: { user }, error: userError } =
    await supabaseClient.auth.getUser();

  if (userError || !user) {
    console.error("Unable to identify student.");
    return;
  }

  const { error } = await supabaseClient
    .from("learning_progress")
    .upsert({
      user_id: user.id,
      subject: subject,
      completed_levels: Math.max(currentLevel, unlockedLevel - 1),
      unlocked_level: unlockedLevel,
      updated_at: new Date().toISOString()
    }, {
      onConflict: "user_id,subject"
    });

  if (error) {
    console.error("Progress saving error:", error.message);
  } else {
    console.log(`${subject} progress saved!`);
  }
}

// Keep existing JavaScript saving calls working
async function saveJavaScriptProgress() {
  await saveLearningProgress(
    "JavaScript",
    currentJavaScriptLevel,
    unlockedJavaScriptLevel
  );
}
// Check whether the user is already logged in
async function checkLoginSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        authSection.hidden = true;
        document.querySelector("main").hidden = false;

        const user = session.user;
        await loadJavaScriptProgress(user.id);

        profileName.textContent =
            user.user_metadata.full_name || "Student";

        profileEmail.textContent = user.email;

    } else {
        authSection.hidden = false;
        document.querySelector("main").hidden = true;
    }
}

checkLoginSession();
// Student Logout
logoutBtn.addEventListener("click", async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Logout failed: " + error.message);
        return;
    }

    profileName.textContent = "Student Name";
    profileEmail.textContent = "student@email.com";

    authSection.hidden = false;
    document.querySelector("main").hidden = true;

    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================
// LOAD STUDYSTREAK FROM SUPABASE
// ==========================================

async function loadStudyStreak() {

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data, error } = await supabaseClient
    .from("quiz_completions")
    .select("completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: true });

  if (error) {
    console.error("Error loading StudyStreak:", error.message);
    return;
  }

  const dates = [...new Set(
    data.map(item =>
      new Date(item.completed_at).toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
      })
    )
  )];

  let streak = 0;

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const yesterday = yesterdayDate.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });

  let checkDate = dates.includes(today) ? today : yesterday;

  while (dates.includes(checkDate)) {

    streak++;

    const previousDate = new Date(checkDate + "T12:00:00");
    previousDate.setDate(previousDate.getDate() - 1);

    checkDate = previousDate.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata"
    });
  }

  document.getElementById("streakCount").textContent =
    streak + (streak === 1 ? " day" : " days");
}


// ==========================================
// LOAD STUDYSTREAK CALENDAR
// ==========================================

let calendarViewDate = new Date();

async function loadStreakCalendar() {

  const calendar = document.getElementById("streakCalendar");
  const calendarMonth = document.getElementById("calendarMonth");

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data, error } = await supabaseClient
    .from("quiz_completions")
    .select("completed_at")
    .eq("user_id", user.id);

  if (error) {
    console.error("Calendar error:", error.message);
    calendar.innerHTML = "<p>Unable to load calendar.</p>";
    return;
  }

  const completedDates = new Set(
    data.map(item =>
      new Date(item.completed_at).toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
      })
    )
  );

  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = `
    <div class="calendar-grid">
      ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        .map(day => `<div class="calendar-day">${day}</div>`)
        .join("")}
  `;

  for (let i = 0; i < firstDay; i++) {
    html += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {

    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const completed = completedDates.has(date);

    html += `
      <div class="calendar-date ${completed ? "completed" : ""}">
        ${day}
      </div>
    `;
  }

  html += `</div>`;

  calendarMonth.textContent = calendarViewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric"
  });

  calendar.innerHTML = html;
}


// ==========================================
// LOAD STUDENT COMMUNITY
// ==========================================

async function loadCommunityMembers() {

  const communityMembers = document.getElementById("communityMembers");

  communityMembers.innerHTML = "<p>Loading students...</p>";

  const { data, error } = await supabaseClient
    .rpc("get_community_stats");

  if (error) {
    communityMembers.innerHTML = "<p>Unable to load students.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    communityMembers.innerHTML = "<p>No students yet.</p>";
    return;
  }

  communityMembers.innerHTML = "";

  data.forEach(student => {

    const card = document.createElement("article");
    card.className = "community-card";

    const avatar = document.createElement("div");
    avatar.className = "community-avatar";

    avatar.textContent = (student.full_name || "Student")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);

    card.appendChild(avatar);

    const name = document.createElement("h3");
    name.textContent = `👩‍🎓 ${student.full_name}`;

    const streak = document.createElement("p");
    streak.textContent = `🔥 ${student.streak_days} day streak`;

    const badge = document.createElement("div");
    badge.className = "achievement-badge";

    if (student.streak_days >= 30) {
      badge.textContent = "🥇 Quiz Champion";
    } else if (student.streak_days >= 15) {
      badge.textContent = "🥈 Dedicated Learner";
    } else if (student.streak_days >= 7) {
      badge.textContent = "🥉 Consistent Learner";
    } else if (student.streak_days >= 3) {
      badge.textContent = "🔥 Starter";
    } else {
      badge.textContent = "🌱 Beginner";
    }

    const quizzes = document.createElement("p");
    quizzes.textContent = `📝 ${student.quiz_count} quizzes attended`;

    card.appendChild(name);
    card.appendChild(streak);
    card.appendChild(badge);
    card.appendChild(quizzes);

    communityMembers.appendChild(card);

  });

}


// Load StudyStreak and Calendar

loadStudyStreak();
loadStreakCalendar();
// Previous month button
document.getElementById("prevMonth").addEventListener("click", () => {
  calendarViewDate.setMonth(calendarViewDate.getMonth() - 1);
  loadStreakCalendar();
});

// Next month button
document.getElementById("nextMonth").addEventListener("click", () => {
  calendarViewDate.setMonth(calendarViewDate.getMonth() + 1);
  loadStreakCalendar();
});
// Load private Quiz History from Supabase
async function loadQuizHistory() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  const historyContainer = document.getElementById("quizHistory");
  const viewAllBtn = document.getElementById("viewAllHistoryBtn");

  if (!user) {
    historyContainer.innerHTML = "<p>Please log in to view your quiz history.</p>";
    viewAllBtn.hidden = true;
    return;
  }

  const { data, error } = await supabaseClient
    .from("quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Quiz history error:", error.message);
    historyContainer.innerHTML = "<p>Unable to load quiz history.</p>";
    viewAllBtn.hidden = true;
    return;
  }

  if (!data || data.length === 0) {
    historyContainer.innerHTML =
      "<p>No quiz attempts yet. Complete a quiz to see your history!</p>";
    viewAllBtn.hidden = true;
    return;
  }

  let showAllHistory = false;

  function displayHistory() {
    const visibleResults = showAllHistory ? data : data.slice(0, 5);

    historyContainer.innerHTML = visibleResults.map(result => `
      <div class="history-item">
        <h4>${result.quiz_name}</h4>
        <p>Date: ${new Date(result.completed_at).toLocaleDateString("en-IN")}</p>
        <p>Score: ${result.score}/${result.total_questions}</p>
        <p>Percentage: ${result.percentage}%</p>
        ${
          result.quiz_name === "Java Examination"
            ? result.score >= 45
              ? "<p>🎓 Certificate: Eligible</p>"
              : "<p>📚 Certificate: Not Eligible (45/50 required)</p>"
            : ""
        }
      </div>
    `).join("");

    if (data.length <= 5) {
      viewAllBtn.hidden = true;
    } else {
      viewAllBtn.hidden = false;
      viewAllBtn.textContent = showAllHistory
        ? "Show Less"
        : "View All History";
    }
  }

  displayHistory();

  viewAllBtn.onclick = () => {
    showAllHistory = !showAllHistory;
    displayHistory();
  };
}

loadQuizHistory();

// Load total quizzes attended from Supabase
async function loadTotalQuizzes() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  const counter = document.getElementById("totalQuizzes");

  if (!user) {
    counter.textContent = "0";
    return;
  }

  const { count, error } = await supabaseClient
    .from("quiz_completions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    console.error("Total quizzes error:", error.message);
    return;
  }

  counter.textContent = count;
}

loadTotalQuizzes();
// Load My Achievements
async function loadMyAchievements() {
  const myBadges = document.getElementById("myBadges");

  myBadges.innerHTML = "<p>Loading achievements...</p>";

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    myBadges.innerHTML = "<p>Please log in to view achievements.</p>";
    return;
  }

  const { data, error } = await supabaseClient
    .from("quiz_completions")
    .select("completed_at")
    .eq("user_id", user.id);

  if (error) {
    myBadges.innerHTML = "<p>Unable to load achievements.</p>";
    console.error(error);
    return;
  }

  const dates = [...new Set(
    data.map(item =>
      new Date(item.completed_at).toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
      })
    )
  )];

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const yesterday = yesterdayDate.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });

  let checkDate = dates.includes(today) ? today : yesterday;
  let streak = 0;

  while (dates.includes(checkDate)) {
    streak++;

    const previousDate = new Date(checkDate + "T12:00:00");
    previousDate.setDate(previousDate.getDate() - 1);

    checkDate = previousDate.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata"
    });
  }

  const badges = [
    { days: 3, name: "🔥 Starter", description: "3-day streak" },
    { days: 7, name: "🥉 Consistent Learner", description: "7-day streak" },
    { days: 15, name: "🥈 Dedicated Learner", description: "15-day streak" },
    { days: 30, name: "🥇 Quiz Champion", description: "30-day streak" }
  ];

  myBadges.innerHTML = "";

  badges.forEach(badge => {
  const card = document.createElement("article");
  card.className = "community-card";

  const title = document.createElement("h3");
  title.textContent = badge.name;

  const description = document.createElement("p");
  description.textContent = badge.description;

  const status = document.createElement("p");

  status.textContent = streak >= badge.days
    ? "✅ Unlocked"
    : "🔒 Locked";

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(status);

  myBadges.appendChild(card);
});

  const currentStreak = document.createElement("p");
  currentStreak.textContent =
  `🔥 Your current streak: ${streak} ${streak === 1 ? "day" : "days"}`;
// QUIZ COMPLETION BADGES

const quizCount = data.length;

const quizBadges = [
  { count: 5, name: "🌟 Quiz Explorer", description: "Complete 5 quizzes" },
  { count: 10, name: "🎯 Quiz Enthusiast", description: "Complete 10 quizzes" },
  { count: 25, name: "🏆 Quiz Master", description: "Complete 25 quizzes" },
  { count: 50, name: "👑 Quiz Legend", description: "Complete 50 quizzes" }
];

quizBadges.forEach(badge => {
  const card = document.createElement("article");
  card.className = "community-card";

  const title = document.createElement("h3");
  title.textContent = badge.name;

  const description = document.createElement("p");
  description.textContent = badge.description;
const progressBar = document.createElement("div");
progressBar.className = "achievement-progress";

const progressFill = document.createElement("div");
progressFill.className = "achievement-progress-fill";

const progressPercent = Math.min(
  (quizCount / badge.count) * 100,
  100
);

progressFill.style.width = `${progressPercent}%`;
progressBar.appendChild(progressFill);

const progressText = document.createElement("p");
progressText.textContent =
  `${Math.min(quizCount, badge.count)}/${badge.count} quizzes completed`;

  const status = document.createElement("p");

  status.textContent = quizCount >= badge.count
    ? "✅ Unlocked"
    : "🔒 Locked";

  card.appendChild(title);
card.appendChild(description);
card.appendChild(progressBar);
card.appendChild(progressText);
card.appendChild(status);

myBadges.appendChild(card);
});
  myBadges.prepend(currentStreak);
// Total Quizzes Summary
const totalQuizzesSummary = document.createElement("p");
totalQuizzesSummary.textContent =
  `📝 Total quizzes completed: ${quizCount}`;

myBadges.prepend(totalQuizzesSummary);
}
// ==========================================
// QUIZCONNECT - JAVASCRIPT LEARNING SYSTEM
// PART 1: ALL 10 LEARNING LEVELS
// ==========================================

const javascriptLevels = [
  {
    title: "Introduction to JavaScript",
    difficulty: "Beginner",
    content: `
      <h3>What is JavaScript?</h3>
      <p>JavaScript is a programming language used to make websites interactive and dynamic.</p>

      <h3>Where is JavaScript used?</h3>
      <ul>
        <li>Interactive websites</li>
        <li>Web applications</li>
        <li>Online games</li>
        <li>Form validation</li>
      </ul>

      <h3>Your First JavaScript Code</h3>
      <pre><code>console.log("Hello, World!");</code></pre>
      <p>console.log() displays output in the browser console.</p>
    `
  },

  {
    title: "Variables and Data Types",
    difficulty: "Beginner",
    content: `
      <h3>What are Variables?</h3>
      <p>Variables store information that can be used in a program.</p>

      <h3>Declaring Variables</h3>
      <pre><code>let name = "Kavya";
const age = 20;
var city = "Bengaluru";</code></pre>

      <h3>Data Types</h3>
      <ul>
        <li>String - Text</li>
        <li>Number - Numeric values</li>
        <li>Boolean - True or false</li>
        <li>Undefined - A variable without an assigned value</li>
        <li>Null - An intentional empty value</li>
      </ul>

      <h3>Example</h3>
      <pre><code>let student = "Ravi";
let marks = 85;
let passed = true;</code></pre>
    `
  },

  {
    title: "Operators and Expressions",
    difficulty: "Easy",
    content: `
      <h3>What are Operators?</h3>
      <p>Operators perform operations on values and variables.</p>

      <h3>Types of Operators</h3>
      <ul>
        <li>Arithmetic: +, -, *, /, %</li>
        <li>Comparison: ==, ===, !=, >, <</li>
        <li>Logical: &&, ||, !</li>
        <li>Assignment: =, +=, -=</li>
      </ul>

      <h3>Example</h3>
      <pre><code>let a = 10;
let b = 5;
console.log(a + b);
console.log(a > b);</code></pre>

      <p>Expressions combine values and operators to produce results.</p>
    `
  },

  {
    title: "Conditional Statements",
    difficulty: "Easy",
    content: `
      <h3>What are Conditional Statements?</h3>
      <p>They allow a program to make decisions based on conditions.</p>

      <h3>if Statement</h3>
      <pre><code>let age = 18;

if (age >= 18) {
  console.log("Eligible");
}</code></pre>

      <h3>if-else Statement</h3>
      <pre><code>let marks = 40;

if (marks >= 35) {
  console.log("Pass");
} else {
  console.log("Fail");
}</code></pre>

      <h3>Other Conditional Statements</h3>
      <ul>
        <li>if</li>
        <li>if-else</li>
        <li>else-if</li>
        <li>switch</li>
        <li>Ternary operator</li>
      </ul>
    `
  },

  {
    title: "Loops",
    difficulty: "Intermediate",
    content: `
      <h3>What are Loops?</h3>
      <p>Loops execute a block of code repeatedly while a condition is satisfied.</p>

      <h3>for Loop</h3>
      <pre><code>for (let i = 1; i <= 5; i++) {
  console.log(i);
}</code></pre>

      <h3>while Loop</h3>
      <pre><code>let i = 1;

while (i <= 5) {
  console.log(i);
  i++;
}</code></pre>

      <h3>Other Loops</h3>
      <ul>
        <li>for loop</li>
        <li>while loop</li>
        <li>do-while loop</li>
        <li>for...of loop</li>
        <li>for...in loop</li>
      </ul>

      <p>break stops a loop. continue skips the current iteration.</p>
    `
  },

  {
    title: "Functions",
    difficulty: "Intermediate",
    content: `
      <h3>What are Functions?</h3>
      <p>Functions are reusable blocks of code that perform specific tasks.</p>

      <h3>Function Declaration</h3>
      <pre><code>function greet() {
  console.log("Welcome!");
}

greet();</code></pre>

      <h3>Parameters and Return Values</h3>
      <pre><code>function add(a, b) {
  return a + b;
}

let result = add(10, 20);</code></pre>

      <h3>Arrow Functions</h3>
      <pre><code>const multiply = (a, b) => a * b;</code></pre>

      <p>Functions help organize code and avoid repetition.</p>
    `
  },

  {
    title: "Arrays",
    difficulty: "Intermediate",
    content: `
      <h3>What are Arrays?</h3>
      <p>Arrays store multiple values in a single variable.</p>

      <h3>Creating an Array</h3>
      <pre><code>let fruits = ["Apple", "Mango", "Orange"];</code></pre>

      <h3>Accessing Elements</h3>
      <pre><code>console.log(fruits[0]);</code></pre>

      <h3>Important Array Methods</h3>
      <ul>
        <li>push() - Adds an element at the end</li>
        <li>pop() - Removes the last element</li>
        <li>shift() - Removes the first element</li>
        <li>unshift() - Adds an element at the beginning</li>
        <li>map() - Creates a transformed array</li>
        <li>filter() - Selects matching elements</li>
      </ul>
    `
  },

  {
    title: "Objects",
    difficulty: "Advanced",
    content: `
      <h3>What are Objects?</h3>
      <p>Objects store related information as key-value pairs.</p>

      <h3>Creating an Object</h3>
      <pre><code>let student = {
  name: "Kavya",
  age: 20,
  branch: "ISE"
};</code></pre>

      <h3>Accessing Properties</h3>
      <pre><code>console.log(student.name);
console.log(student["age"]);</code></pre>

      <h3>Object Methods</h3>
      <pre><code>let person = {
  name: "Ravi",
  greet: function() {
    return "Hello!";
  }
};</code></pre>

      <p>Objects help represent real-world entities in programs.</p>
    `
  },

  {
    title: "DOM Manipulation",
    difficulty: "Advanced",
    content: `
      <h3>What is the DOM?</h3>
      <p>The Document Object Model represents an HTML page as a tree of objects.</p>

      <h3>Selecting HTML Elements</h3>
      <pre><code>document.getElementById("demo");
document.querySelector(".box");</code></pre>

      <h3>Changing Content</h3>
      <pre><code>document.getElementById("demo").textContent =
  "Hello JavaScript!";</code></pre>

      <h3>Changing Styles</h3>
      <pre><code>document.getElementById("demo").style.color =
  "blue";</code></pre>

      <p>DOM manipulation allows JavaScript to update webpage content and appearance.</p>
    `
  },

  {
    title: "Events and Mini Project",
    difficulty: "Expert",
    content: `
      <h3>What are JavaScript Events?</h3>
      <p>Events are actions that happen in a webpage, such as clicks, typing and form submission.</p>

      <h3>Click Event</h3>
      <pre><code>button.addEventListener("click", function() {
  alert("Button clicked!");
});</code></pre>

      <h3>Common Events</h3>
      <ul>
        <li>click</li>
        <li>mouseover</li>
        <li>keydown</li>
        <li>change</li>
        <li>submit</li>
      </ul>

      <h3>Mini Project: Counter</h3>
      <pre><code>let count = 0;

function increase() {
  count++;
  console.log(count);
}</code></pre>

      <p>Use variables, functions and events together to create interactive applications.</p>
    `
  }
];
// ==========================================
// DATABASE MANAGEMENT SYSTEM (DBMS)
// PART 1: ALL 10 LEARNING LEVELS
// ==========================================

const databaseLevels = [

  {
    title: "Introduction to DBMS",
    difficulty: "Beginner",
    content: `
      <h3>What is a Database?</h3>
      <p>A database is an organized collection of data that can be stored, accessed and managed easily.</p>

      <h3>What is DBMS?</h3>
      <p>A Database Management System (DBMS) is software used to create, store, retrieve and manage databases.</p>

      <h3>Examples of DBMS</h3>
      <ul>
        <li>MySQL</li>
        <li>Oracle Database</li>
        <li>PostgreSQL</li>
        <li>Microsoft SQL Server</li>
      </ul>

      <h3>Advantages of DBMS</h3>
      <ul>
        <li>Reduces data redundancy</li>
        <li>Improves data security</li>
        <li>Supports data sharing</li>
        <li>Maintains data consistency</li>
      </ul>
    `
  },

  {
    title: "Database Models and Architecture",
    difficulty: "Beginner",
    content: `
      <h3>What is a Database Model?</h3>
      <p>A database model defines how data is organized, stored and related.</p>

      <h3>Types of Database Models</h3>
      <ul>
        <li>Hierarchical Model</li>
        <li>Network Model</li>
        <li>Relational Model</li>
        <li>Object-Oriented Model</li>
      </ul>

      <h3>Three-Schema Architecture</h3>
      <ul>
        <li>External Level – User view of data.</li>
        <li>Conceptual Level – Overall logical structure.</li>
        <li>Internal Level – Physical storage of data.</li>
      </ul>

      <p>This architecture provides data abstraction and data independence.</p>
    `
  },

  {
    title: "Relational Database Concepts",
    difficulty: "Beginner",
    content: `
      <h3>What is a Relational Database?</h3>
      <p>A relational database stores data in tables consisting of rows and columns.</p>

      <h3>Important Terms</h3>
      <ul>
        <li>Table – Collection of related data.</li>
        <li>Row – A single record.</li>
        <li>Column – An attribute of a table.</li>
        <li>Schema – Structure of a database.</li>
        <li>Domain – Set of permitted values.</li>
      </ul>

      <h3>Example</h3>
      <pre><code>STUDENT
--------------------------------
USN       NAME       BRANCH
101       Ravi       ISE
102       Priya      CSE
103       Arun       ECE</code></pre>

      <p>Relational databases organize information using related tables.</p>
    `
  },

  {
    title: "Keys in DBMS",
    difficulty: "Easy",
    content: `
      <h3>What are Keys?</h3>
      <p>Keys are attributes used to identify records and establish relationships between tables.</p>

      <h3>Types of Keys</h3>
      <ul>
        <li>Primary Key – Uniquely identifies each record.</li>
        <li>Foreign Key – References a key in another table.</li>
        <li>Candidate Key – A minimal attribute set that uniquely identifies records.</li>
        <li>Super Key – Any attribute set that uniquely identifies records.</li>
        <li>Composite Key – A key formed using multiple attributes.</li>
        <li>Alternate Key – A candidate key not selected as the primary key.</li>
      </ul>

      <h3>Example</h3>
      <pre><code>STUDENT(
  Student_ID PRIMARY KEY,
  Name,
  Department_ID
)</code></pre>

      <p>Keys maintain uniqueness and relationships between database tables.</p>
    `
  },

  {
    title: "Entity Relationship Model",
    difficulty: "Easy",
    content: `
      <h3>What is an ER Model?</h3>
      <p>The Entity Relationship model represents database objects and their relationships.</p>

      <h3>Components of ER Model</h3>
      <ul>
        <li>Entity – A real-world object.</li>
        <li>Attribute – A property of an entity.</li>
        <li>Relationship – Association between entities.</li>
      </ul>

      <h3>Types of Attributes</h3>
      <ul>
        <li>Simple Attribute</li>
        <li>Composite Attribute</li>
        <li>Multivalued Attribute</li>
        <li>Derived Attribute</li>
      </ul>

      <h3>Types of Relationships</h3>
      <ul>
        <li>One-to-One (1:1)</li>
        <li>One-to-Many (1:M)</li>
        <li>Many-to-Many (M:N)</li>
      </ul>

      <p>ER diagrams help design databases before implementation.</p>
    `
   },

  {
    title: "Relational Algebra",
    difficulty: "Intermediate",
    content: `
      <h3>What is Relational Algebra?</h3>
      <p>Relational Algebra is a procedural query language used to retrieve and manipulate data in relational databases.</p>

      <h3>Basic Operations</h3>
      <ul>
        <li>Selection (σ) – Selects rows.</li>
        <li>Projection (π) – Selects columns.</li>
        <li>Union (∪) – Combines compatible relations.</li>
        <li>Set Difference (−) – Finds records in one relation but not another.</li>
        <li>Cartesian Product (×) – Combines tuples from two relations.</li>
        <li>Join (⋈) – Combines related records.</li>
      </ul>

      <h3>Example</h3>
      <pre><code>σ Branch = 'ISE' (STUDENT)</code></pre>
      <p>This selects students belonging to the ISE branch.</p>
    `
  },

  {
    title: "SQL Fundamentals",
    difficulty: "Intermediate",
    content: `
      <h3>What is SQL?</h3>
      <p>Structured Query Language (SQL) is used to communicate with relational databases.</p>

      <h3>Types of SQL Commands</h3>
      <ul>
        <li>DDL – CREATE, ALTER, DROP</li>
        <li>DML – INSERT, UPDATE, DELETE</li>
        <li>DQL – SELECT</li>
        <li>DCL – GRANT, REVOKE</li>
        <li>TCL – COMMIT, ROLLBACK, SAVEPOINT</li>
      </ul>

      <h3>Creating a Table</h3>
      <pre><code>CREATE TABLE Student (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  branch VARCHAR(20)
);</code></pre>

      <h3>Retrieving Records</h3>
      <pre><code>SELECT * FROM Student;</code></pre>
    `
  },

  {
    title: "SQL Queries and Joins",
    difficulty: "Advanced",
    content: `
      <h3>Filtering Data</h3>
      <pre><code>SELECT * FROM Student
WHERE branch = 'ISE';</code></pre>

      <h3>Sorting Data</h3>
      <pre><code>SELECT * FROM Student
ORDER BY name ASC;</code></pre>

      <h3>Aggregate Functions</h3>
      <ul>
        <li>COUNT() – Counts records.</li>
        <li>SUM() – Calculates total.</li>
        <li>AVG() – Calculates average.</li>
        <li>MIN() – Finds minimum value.</li>
        <li>MAX() – Finds maximum value.</li>
      </ul>

      <h3>Types of Joins</h3>
      <ul>
        <li>INNER JOIN</li>
        <li>LEFT JOIN</li>
        <li>RIGHT JOIN</li>
        <li>FULL OUTER JOIN</li>
      </ul>

      <h3>Example</h3>
      <pre><code>SELECT Student.name, Department.dept_name
FROM Student
INNER JOIN Department
ON Student.dept_id = Department.dept_id;</code></pre>
    `
  },

  {
    title: "Normalization and Functional Dependencies",
    difficulty: "Advanced",
    content: `
      <h3>What is Normalization?</h3>
      <p>Normalization organizes database tables to reduce redundancy and avoid modification anomalies.</p>

      <h3>Normal Forms</h3>
      <ul>
        <li>1NF – Each attribute contains atomic values.</li>
        <li>2NF – In 1NF and no partial dependency of non-prime attributes on a candidate key.</li>
        <li>3NF – In 2NF and no transitive dependency of non-prime attributes on candidate keys.</li>
        <li>BCNF – Every non-trivial functional dependency has a superkey as its determinant.</li>
      </ul>

      <h3>Functional Dependency</h3>
      <p>A functional dependency X → Y means that X uniquely determines Y.</p>

      <h3>Benefits</h3>
      <ul>
        <li>Reduces duplicate data.</li>
        <li>Improves data consistency.</li>
        <li>Prevents insertion, deletion and update anomalies.</li>
      </ul>
    `
  },

  {
    title: "Transactions, Concurrency and Recovery",
    difficulty: "Expert",
    content: `
      <h3>What is a Transaction?</h3>
      <p>A transaction is a logical unit of database work that must be completed reliably.</p>

      <h3>ACID Properties</h3>
      <ul>
        <li>Atomicity – All operations happen or none happen.</li>
        <li>Consistency – The database remains valid.</li>
        <li>Isolation – Concurrent transactions do not interfere incorrectly.</li>
        <li>Durability – Committed changes survive failures.</li>
      </ul>

      <h3>Concurrency Control</h3>
      <p>Concurrency control manages simultaneous transactions while preserving database consistency.</p>

      <ul>
        <li>Lock-based protocols</li>
        <li>Two-Phase Locking (2PL)</li>
        <li>Timestamp ordering</li>
      </ul>

      <h3>Database Recovery</h3>
      <p>Recovery restores the database after system failures using techniques such as logging, checkpoints and backups.</p>
    `
  }

];
// Current learning progress
let unlockedJavaScriptLevel = 1;
let currentJavaScriptLevel = 1;

let currentLearningSubject = "JavaScript";
let currentLearningLevel = 1;
let unlockedLearningLevel = 1;

const levelsContainer =
  document.getElementById("javascriptLevelsContainer");

  // ==========================================
// PART 2: 50 JAVASCRIPT QUIZ QUESTIONS
// ==========================================

const javascriptLevelQuestions = [

  // LEVEL 1 - INTRODUCTION
  [
    {
      question: "What is JavaScript?",
      options: ["Programming language", "Database", "Operating system", "Browser"],
      answer: 0
    },
    {
      question: "What is JavaScript mainly used for?",
      options: ["Hardware repair", "Making websites interactive", "Storing files", "Creating operating systems"],
      answer: 1
    },
    {
      question: "Which method displays output in the console?",
      options: ["print()", "display()", "console.log()", "show()"],
      answer: 2
    },
    {
      question: "Which HTML tag connects an external JavaScript file?",
      options: ["<style>", "<script>", "<link>", "<meta>"],
      answer: 1
    },
    {
      question: "Which statement about JavaScript is correct?",
      options: [
        "It only works with databases",
        "It cannot interact with HTML",
        "It can run in web browsers",
        "It is a type of CSS"
      ],
      answer: 2
    }
  ],

  // LEVEL 2 - VARIABLES AND DATA TYPES
  [
    {
      question: "Which keyword declares a block-scoped variable?",
      options: ["let", "print", "echo", "define"],
      answer: 0
    },
    {
      question: "Which keyword prevents reassignment?",
      options: ["var", "let", "const", "change"],
      answer: 2
    },
    {
      question: "What is the data type of 'Hello'?",
      options: ["Number", "String", "Boolean", "Object"],
      answer: 1
    },
    {
      question: "What is typeof 25?",
      options: ["string", "boolean", "number", "undefined"],
      answer: 2
    },
    {
      question: "What is the value of an uninitialized let variable?",
      options: ["null", "0", "false", "undefined"],
      answer: 3
    }
  ],

  // LEVEL 3 - OPERATORS AND EXPRESSIONS
  [
    {
      question: "What is 10 + 5 in JavaScript?",
      options: ["15", "105", "5", "50"],
      answer: 0
    },
    {
      question: "Which operator checks strict equality?",
      options: ["=", "==", "===", "!="],
      answer: 2
    },
    {
      question: "What is 10 % 3?",
      options: ["3", "1", "0", "10"],
      answer: 1
    },
    {
      question: "What is the result of true && false?",
      options: ["true", "1", "false", "undefined"],
      answer: 2
    },
    {
      question: "What is the result of 5 + 2 * 3?",
      options: ["21", "11", "15", "13"],
      answer: 1
    }
  ],

  // LEVEL 4 - CONDITIONAL STATEMENTS
  [
    {
      question: "Which statement is used to test a condition?",
      options: ["if", "repeat", "loop", "print"],
      answer: 0
    },
    {
      question: "Which block executes when an if condition is false?",
      options: ["try", "else", "for", "return"],
      answer: 1
    },
    {
      question: "What is the output if age = 20 and age >= 18?",
      options: ["false", "0", "true", "undefined"],
      answer: 2
    },
    {
      question: "Which statement is useful for checking multiple fixed cases?",
      options: ["while", "switch", "break", "continue"],
      answer: 1
    },
    {
      question: "What is the output of 10 > 5 ? 'Yes' : 'No'?",
      options: ["No", "true", "10", "Yes"],
      answer: 3
    }
  ],

  // LEVEL 5 - LOOPS
  [
    {
      question: "Which loop is commonly used when the number of iterations is known?",
      options: ["for", "if", "switch", "try"],
      answer: 0
    },
    {
      question: "Which statement stops a loop?",
      options: ["skip", "break", "continue", "next"],
      answer: 1
    },
    {
      question: "How many times does for(let i=0; i<3; i++) run?",
      options: ["2", "4", "3", "1"],
      answer: 2
    },
    {
      question: "Which loop executes its body at least once?",
      options: ["for", "while", "for...in", "do...while"],
      answer: 3
    },
    {
      question: "What does continue do inside a loop?",
      options: [
        "Stops the entire program",
        "Skips the current iteration",
        "Restarts the browser",
        "Deletes the loop"
      ],
      answer: 1
    }
  ],

  // LEVEL 6 - FUNCTIONS
  [
    {
      question: "Which keyword declares a function?",
      options: ["function", "method", "define", "create"],
      answer: 0
    },
    {
      question: "What is a function parameter?",
      options: [
        "A return value",
        "A variable in the function definition",
        "A loop",
        "An HTML element"
      ],
      answer: 1
    },
    {
      question: "Which keyword sends a value back from a function?",
      options: ["break", "continue", "return", "send"],
      answer: 2
    },
    {
      question: "What is the output of function add(a,b){return a+b;} add(2,3)?",
      options: ["23", "6", "2", "5"],
      answer: 3
    },
    {
      question: "Which syntax represents an arrow function?",
      options: [
        "function => ()",
        "() => {}",
        "arrow() {}",
        "function -> {}"
      ],
      answer: 1
    }
  ],

  // LEVEL 7 - ARRAYS
  [
    {
      question: "Which brackets create an array?",
      options: ["[]", "{}", "()", "<>"],
      answer: 0
    },
    {
      question: "What is the index of the first array element?",
      options: ["1", "-1", "0", "2"],
      answer: 2
    },
    {
      question: "Which method adds an element to the end?",
      options: ["pop()", "push()", "shift()", "remove()"],
      answer: 1
    },
    {
      question: "What does filter() return?",
      options: [
        "A new array containing matching elements",
        "A single number always",
        "The original array only",
        "An HTML element"
      ],
      answer: 0
    },
    {
      question: "What is the result of [2,4,6].map(x => x * 2)?",
      options: ["[2,4,6]", "[4,8,12]", "[2,8,18]", "[1,2,3]"],
      answer: 1
    }
  ],

  // LEVEL 8 - OBJECTS
  [
    {
      question: "How are object properties commonly stored?",
      options: ["Only as numbers", "As key-value pairs", "As loops", "As HTML tags"],
      answer: 1
    },
    {
      question: "Which syntax creates an object?",
      options: ["[]", "()", "{}", "<>"],
      answer: 2
    },
    {
      question: "How can you access the name property?",
      options: ["student.name", "student->name", "student/name", "student:name"],
      answer: 0
    },
    {
      question: "Which method returns an array of object keys?",
      options: ["Object.values()", "Object.keys()", "Object.entriesOnly()", "Object.get()"],
      answer: 1
    },
    {
      question: "What is the output of Object.keys({a:1,b:2}).length?",
      options: ["1", "3", "2", "undefined"],
      answer: 2
    }
  ],

  // LEVEL 9 - DOM MANIPULATION
  [
    {
      question: "What does DOM stand for?",
      options: [
        "Data Object Method",
        "Document Object Model",
        "Digital Output Management",
        "Document Online Mode"
      ],
      answer: 1
    },
    {
      question: "Which method selects an element by its ID?",
      options: ["getElementById()", "getClass()", "selectID()", "findElement()"],
      answer: 0
    },
    {
      question: "Which property changes the text of an element?",
      options: ["innerColor", "textContent", "fontSize", "src"],
      answer: 1
    },
    {
      question: "What does querySelector() return?",
      options: [
        "Every matching element",
        "The first matching element",
        "Only an array",
        "A CSS file"
      ],
      answer: 1
    },
    {
      question: "Which method creates a new HTML element?",
      options: ["append()", "createElement()", "newHTML()", "makeNode()"],
      answer: 1
    }
  ],

  // LEVEL 10 - EVENTS AND MINI PROJECT
  [
    {
      question: "Which event occurs when a user clicks a button?",
      options: ["change", "submit", "click", "load"],
      answer: 2
    },
    {
      question: "Which method attaches an event handler?",
      options: ["addEventListener()", "attachHTML()", "clickHandler()", "eventStart()"],
      answer: 0
    },
    {
      question: "What does preventDefault() do?",
      options: [
        "Deletes an event",
        "Stops the default browser action",
        "Refreshes the page",
        "Creates a new button"
      ],
      answer: 1
    },
    {
      question: "Which event is commonly used when a form is submitted?",
      options: ["mouseover", "keydown", "submit", "scroll"],
      answer: 2
    },
    {
      question: "In a counter project, which method updates an element's displayed text?",
      options: [
        "element.textContent",
        "element.database",
        "element.loop",
        "element.event"
      ],
      answer: 0
    }
  ]

];
// ==========================================
// DATABASE MANAGEMENT - 50 QUIZ QUESTIONS
// ==========================================

const databaseLevelQuestions = [

  // LEVEL 1 - INTRODUCTION TO DBMS
  [
    {
      question: "What does DBMS stand for?",
      options: [
        "Database Management System",
        "Data Backup Management Software",
        "Digital Base Management System",
        "Database Monitoring Service"
      ],
      answer: 0
    },
    {
      question: "What is the primary purpose of a DBMS?",
      options: [
        "Designing websites",
        "Managing and organizing data",
        "Creating operating systems",
        "Editing images"
      ],
      answer: 1
    },
    {
      question: "Which of the following is a DBMS?",
      options: ["HTML", "CSS", "MySQL", "JavaScript"],
      answer: 2
    },
    {
      question: "Which is an advantage of using a DBMS?",
      options: [
        "Increased data duplication",
        "No data security",
        "Limited data access",
        "Reduced data redundancy"
      ],
      answer: 3
    },
    {
      question: "What is a database?",
      options: [
        "An organized collection of data",
        "A programming language",
        "A computer network",
        "An operating system"
      ],
      answer: 0
    }
  ],

  // LEVEL 2 - DATABASE MODELS AND ARCHITECTURE
  [
    {
      question: "Which database model organizes data into tables?",
      options: ["Hierarchical", "Relational", "Network", "Object-only"],
      answer: 1
    },
    {
      question: "Which database model uses parent-child relationships?",
      options: ["Relational", "Network", "Hierarchical", "Document"],
      answer: 2
    },
    {
      question: "How many levels are present in the three-schema architecture?",
      options: ["Two", "Four", "Five", "Three"],
      answer: 3
    },
    {
      question: "Which schema describes the entire database structure?",
      options: ["External schema", "Conceptual schema", "Internal schema", "User schema"],
      answer: 1
    },
    {
      question: "Which level describes how data is physically stored?",
      options: ["Internal level", "External level", "Conceptual level", "View level"],
      answer: 0
    }
  ],

  // LEVEL 3 - RELATIONAL DATABASE CONCEPTS
  [
    {
      question: "In a relational database, a table is also called a:",
      options: ["Tuple", "Relation", "Attribute", "Domain"],
      answer: 1
    },
    {
      question: "A row in a relational table is called a:",
      options: ["Domain", "Attribute", "Tuple", "Schema"],
      answer: 2
    },
    {
      question: "A column in a relational table is called a:",
      options: ["Tuple", "Record", "Relation", "Attribute"],
      answer: 3
    },
    {
      question: "What does NULL generally represent in a database?",
      options: [
        "Unknown or missing value",
        "Zero",
        "Empty string in every case",
        "False"
      ],
      answer: 0
    },
    {
      question: "Which property ensures that each row can be uniquely identified?",
      options: [
        "Data duplication",
        "Unique identification",
        "Data redundancy",
        "Sorting"
      ],
      answer: 1
    }
  ],

  // LEVEL 4 - KEYS IN DBMS
  [
    {
      question: "Which key uniquely identifies each record in a table?",
      options: ["Foreign key", "Secondary key", "Primary key", "Duplicate key"],
      answer: 2
    },
    {
      question: "A foreign key is used to:",
      options: [
        "Delete every record",
        "Create duplicate rows",
        "Sort a table",
        "Establish a relationship between tables"
      ],
      answer: 3
    },
    {
      question: "Which key can uniquely identify a record and may contain multiple attributes?",
      options: ["Candidate key", "Composite key", "Foreign key", "Alternate key"],
      answer: 1
    },
    {
      question: "A candidate key that is not selected as the primary key is called:",
      options: ["Alternate key", "Foreign key", "Super table", "Duplicate key"],
      answer: 0
    },
    {
      question: "Which key is a minimal super key?",
      options: ["Foreign key", "Primary table", "Candidate key", "Secondary table"],
      answer: 2
    }
  ],

  // LEVEL 5 - ENTITY RELATIONSHIP MODEL
  [
    {
      question: "What does an entity represent in an ER model?",
      options: [
        "A database query",
        "A real-world object or concept",
        "A programming loop",
        "A database password"
      ],
      answer: 1
    },
    {
      question: "Which shape represents an entity in an ER diagram?",
      options: ["Oval", "Diamond", "Rectangle", "Triangle"],
      answer: 2
    },
    {
      question: "Which shape represents an attribute in an ER diagram?",
      options: ["Oval", "Rectangle", "Diamond", "Circle only"],
      answer: 0
    },
    {
      question: "Which shape represents a relationship in an ER diagram?",
      options: ["Rectangle", "Oval", "Triangle", "Diamond"],
      answer: 3
    },
    {
      question: "What does a one-to-many relationship mean?",
      options: [
        "One record relates to exactly one record",
        "One record can relate to multiple records",
        "Every record must be deleted",
        "No records are related"
      ],
      answer: 1
    }
  ],

  // LEVEL 6 - RELATIONAL ALGEBRA
  [
    {
      question: "Which relational algebra operation selects rows?",
      options: ["Projection", "Union", "Selection", "Join"],
      answer: 2
    },
    {
      question: "Which operation selects specific columns?",
      options: ["Projection", "Selection", "Difference", "Cartesian product"],
      answer: 0
    },
    {
      question: "Which symbol is commonly used for selection?",
      options: ["π", "σ", "∪", "×"],
      answer: 1
    },
    {
      question: "Which operation combines tuples from two relations?",
      options: ["Rename", "Projection", "Selection", "Join"],
      answer: 3
    },
    {
      question: "Which operation returns tuples present in either relation?",
      options: ["Intersection", "Difference", "Union", "Division"],
      answer: 2
    }
  ],

  // LEVEL 7 - SQL FUNDAMENTALS
  [
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Question Language",
        "System Query Logic",
        "Sequential Query List"
      ],
      answer: 0
    },
    {
      question: "Which SQL command retrieves data from a table?",
      options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
      answer: 1
    },
    {
      question: "Which command creates a new table?",
      options: ["SELECT", "INSERT", "CREATE", "UPDATE"],
      answer: 2
    },
    {
      question: "Which SQL command modifies existing records?",
      options: ["DROP", "SELECT", "CREATE", "UPDATE"],
      answer: 3
    },
    {
      question: "Which clause filters records based on a condition?",
      options: ["WHERE", "ORDER BY", "GROUP BY", "FROM"],
      answer: 0
    }
  ],

  // LEVEL 8 - SQL QUERIES AND JOINS
  [
    {
      question: "Which JOIN returns matching rows from both tables?",
      options: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"],
      answer: 1
    },
    {
      question: "Which JOIN returns all rows from the left table?",
      options: ["INNER JOIN", "CROSS JOIN", "LEFT JOIN", "SELF JOIN"],
      answer: 2
    },
    {
      question: "Which clause groups rows with common values?",
      options: ["ORDER BY", "WHERE", "HAVING", "GROUP BY"],
      answer: 3
    },
    {
      question: "Which function counts the number of rows?",
      options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
      answer: 0
    },
    {
      question: "Which clause sorts query results?",
      options: ["GROUP BY", "ORDER BY", "HAVING", "JOIN"],
      answer: 1
    }
  ],

  // LEVEL 9 - NORMALIZATION
  [
    {
      question: "What is the main purpose of normalization?",
      options: [
        "Increase duplicate data",
        "Delete all tables",
        "Reduce redundancy and anomalies",
        "Increase storage usage"
      ],
      answer: 2
    },
    {
      question: "Which normal form requires atomic values?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: 0
    },
    {
      question: "Second Normal Form eliminates:",
      options: [
        "All primary keys",
        "Partial dependencies",
        "All foreign keys",
        "All relationships"
      ],
      answer: 1
    },
    {
      question: "Third Normal Form eliminates:",
      options: [
        "Primary keys",
        "Candidate keys",
        "Atomic values",
        "Transitive dependencies"
      ],
      answer: 3
    },
    {
      question: "What is a functional dependency?",
      options: [
        "A relationship between two databases",
        "A type of SQL command",
        "A relationship where one attribute determines another",
        "A method of deleting records"
      ],
      answer: 2
    }
  ],

  // LEVEL 10 - TRANSACTIONS AND RECOVERY
  [
    {
      question: "What does ACID stand for?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Access, Control, Integrity, Data",
        "Atomicity, Control, Indexing, Database",
        "Accuracy, Consistency, Integration, Durability"
      ],
      answer: 0
    },
    {
      question: "Which ACID property ensures all operations complete or none do?",
      options: ["Consistency", "Atomicity", "Isolation", "Durability"],
      answer: 1
    },
    {
      question: "Which SQL command permanently saves a transaction?",
      options: ["ROLLBACK", "DELETE", "COMMIT", "DROP"],
      answer: 2
    },
    {
      question: "Which command cancels uncommitted transaction changes?",
      options: ["COMMIT", "SAVE", "UPDATE", "ROLLBACK"],
      answer: 3
    },
    {
      question: "What is the purpose of database recovery?",
      options: [
        "Restore the database after a failure",
        "Create duplicate records",
        "Remove every transaction",
        "Change table names"
      ],
      answer: 0
    }
  ]

];
console.log("DBMS question bank:", databaseLevelQuestions.length);
console.log("DBMS Level 1 questions:", databaseLevelQuestions[0].length);
// ==========================================
// PART 3: JAVASCRIPT LEARNING LEVEL NAVIGATION
// ==========================================

// Display learning levels for the selected subject
function displayJavaScriptLevels() {

  levelsContainer.innerHTML = "";

  // Select the correct subject content
  const selectedLevels =
    currentLearningSubject === "JavaScript"
      ? javascriptLevels
      : databaseLevels;

  // Select the correct unlocked level
  const unlockedLevel =
    currentLearningSubject === "JavaScript"
      ? unlockedJavaScriptLevel
      : unlockedLearningLevel;

  selectedLevels.forEach((level, index) => {

    const levelNumber = index + 1;
    const isUnlocked = levelNumber <= unlockedLevel;

    const card = document.createElement("article");
    card.className = "community-card";

    card.innerHTML = `
      <h3>Level ${levelNumber}</h3>
      <h4>${level.title}</h4>
      <p>Difficulty: ${level.difficulty}</p>
      <p>${isUnlocked ? "🔓 Unlocked" : "🔒 Locked"}</p>

      <button
        class="primary-btn"
        data-level="${levelNumber}"
        ${isUnlocked ? "" : "disabled"}>
        ${isUnlocked ? "Start Learning" : "Complete Previous Level"}
      </button>
    `;

    levelsContainer.appendChild(card);
  });
}

// Open JavaScript Learning Path
document.querySelector('[data-path="javascript"]')
  .addEventListener("click", () => {
    currentLearningSubject = "JavaScript";
    document.getElementById("learningPathLabel").textContent =
  "JAVASCRIPT LEARNING PATH";

document.getElementById("learningPathTitle").textContent =
  "💛 JavaScript – 10 Levels";

    document.getElementById("learningPathsSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });
});
// Open Database Management Learning Path
document.querySelector('[data-path="database"]')
  .addEventListener("click", async () => {

    currentLearningSubject = "Database";
    currentLearningLevel = 1;
currentLearningSubject = "Database";

document.getElementById("learningPathLabel").textContent =
  "DATABASE LEARNING PATH";

document.getElementById("learningPathTitle").textContent =
  "🗄️ Database Management – 10 Levels";

currentLearningLevel = 1;
    // Restore saved DBMS progress
    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (user) {
      const savedProgress =
        await loadLearningProgress(user.id, "Database");

      unlockedLearningLevel = savedProgress
        ? savedProgress.unlocked_level
        : 1;
    } else {
      unlockedLearningLevel = 1;
    }

    document.getElementById("learningPathsSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });
});

// Open a selected learning level
levelsContainer.addEventListener("click", (event) => {

  const button = event.target.closest("[data-level]");
  event.preventDefault();

  if (!button || button.disabled) return;

  const levelNumber = Number(button.dataset.level);

  // Select the correct subject and level
  let level;

  if (currentLearningSubject === "JavaScript") {
    currentJavaScriptLevel = levelNumber;
    currentLearningLevel = levelNumber;
    level = javascriptLevels[levelNumber - 1];
  } else if (currentLearningSubject === "Database") {
    currentLearningLevel = levelNumber;
    level = databaseLevels[levelNumber - 1];
  }

  if (!level) return;

  document.getElementById("learningLevelLabel").textContent =
    `${currentLearningSubject.toUpperCase()} • LEVEL ${levelNumber}`;

  document.getElementById("learningLevelTitle").textContent =
    level.title;

  document.getElementById("learningContent").innerHTML =
    level.content;

  document.getElementById("javascriptLevelsSection").hidden = true;

  document.getElementById("learningModuleSection").hidden = false;

  document.getElementById("learningModuleSection")
    .scrollIntoView({ behavior: "smooth" });
});


// Back to selected learning levels
document.getElementById("backToJavascriptLevels")
  .addEventListener("click", () => {

    document.getElementById("learningModuleSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();
  });


// Back to Learning Paths
document.getElementById("backToLearningPaths")
  .addEventListener("click", () => {

    document.getElementById("javascriptLevelsSection").hidden = true;

    document.getElementById("learningPathsSection").hidden = false;

  });
// Display levels when the page is ready
displayJavaScriptLevels();
// ==========================================
// PART 4: REUSABLE JAVASCRIPT QUIZ ENGINE
// ==========================================

let currentQuestionIndex = 0;
let learningSelectedAnswers = [];
let learningTimerInterval = null;
let learningTimeLeft = 600;
let learningQuizFinished = false;

// Start the selected level quiz
document.getElementById("startLearningQuizBtn")
  .addEventListener("click", () => {

    const levelNumber =
  currentLearningSubject === "JavaScript"
    ? currentJavaScriptLevel
    : currentLearningLevel;

    currentLearningLevel = levelNumber;

    currentQuestionIndex = 0;
    learningTimeLeft = 600;
    learningQuizFinished = false;

    learningSelectedAnswers = Array(5).fill(null);

    document.getElementById("learningModuleSection").hidden = true;
    document.getElementById("learningQuizSection").hidden = false;

    document.getElementById("learningQuizLabel").textContent =
      `${currentLearningSubject.toUpperCase()} • LEVEL ${levelNumber}`;

    const selectedLevels =
  currentLearningSubject === "JavaScript"
    ? javascriptLevels
    : databaseLevels;

document.getElementById("learningQuizTitle").textContent =
  selectedLevels[levelNumber - 1].title + " Quiz";

    document.getElementById("learningQuizResult").hidden = true;

    document.getElementById("learningQuestionProgress").hidden = false;
    document.getElementById("learningQuestionText").hidden = false;
    document.getElementById("learningAnswerOptions").hidden = false;

    document.getElementById("learningPreviousBtn").hidden = false;
    document.getElementById("learningNextBtn").hidden = false;
    document.getElementById("learningSubmitBtn").hidden = false;

    displayLearningQuestion();
    startLearningTimer();

    document.getElementById("learningQuizSection")
      .scrollIntoView({ behavior: "smooth" });
  });
// Display a question for the selected subject
function displayLearningQuestion() {

  let questions;

  if (currentLearningSubject === "JavaScript") {

  questions =
    javascriptLevelQuestions[currentJavaScriptLevel - 1];

} else if (currentLearningSubject === "Database") {

  questions =
    databaseLevelQuestions[currentLearningLevel - 1];

}
console.log("Current subject:", currentLearningSubject);
console.log("Current level:", currentLearningLevel);
console.log("Question index:", currentQuestionIndex);
console.log("Selected questions:", questions);
  const question = questions[currentQuestionIndex];

  document.getElementById("learningQuestionProgress").textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  document.getElementById("learningQuestionText").textContent =
    question.question;

  const optionsContainer =
    document.getElementById("learningAnswerOptions");

  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.className = "answer-option";
    button.textContent = option;

    if (learningSelectedAnswers[currentQuestionIndex] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {

      learningSelectedAnswers[currentQuestionIndex] = index;

      displayLearningQuestion();

    });

    optionsContainer.appendChild(button);
  });

  document.getElementById("learningPreviousBtn").disabled =
    currentQuestionIndex === 0;

  document.getElementById("learningNextBtn").hidden =
    currentQuestionIndex === questions.length - 1;

  document.getElementById("learningSubmitBtn").hidden =
    currentQuestionIndex !== questions.length - 1;
}

// Next question
document.getElementById("learningNextBtn")
  .addEventListener("click", () => {

    if (currentQuestionIndex < 4) {
      currentQuestionIndex++;
      displayLearningQuestion();
    }
  });

// Previous question
document.getElementById("learningPreviousBtn")
  .addEventListener("click", () => {

    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayLearningQuestion();
    }
  });

// Start the 10-minute timer
function startLearningTimer() {

  clearInterval(learningTimerInterval);

  updateLearningTimer();

  learningTimerInterval = setInterval(() => {

    learningTimeLeft--;

    updateLearningTimer();

    if (learningTimeLeft <= 0) {
      finishLearningQuiz();
    }

  }, 1000);
}

// Update timer display
function updateLearningTimer() {

  const minutes = Math.floor(learningTimeLeft / 60);
  const seconds = learningTimeLeft % 60;

  document.getElementById("learningQuizTimer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Submit quiz
document.getElementById("learningSubmitBtn")
  .addEventListener("click", () => {

    const unanswered = learningSelectedAnswers.filter(
      answer => answer === null
    ).length;

    if (unanswered > 0) {

      const confirmSubmit = confirm(
        `You have ${unanswered} unanswered questions. Submit anyway?`
      );

      if (!confirmSubmit) return;
    }

    finishLearningQuiz();
  });

// Calculate quiz result for the selected subject
async function finishLearningQuiz() {

  if (learningQuizFinished) return;

  learningQuizFinished = true;

  clearInterval(learningTimerInterval);

  let questions;

  if (currentLearningSubject === "JavaScript") {

  questions =
    javascriptLevelQuestions[currentJavaScriptLevel - 1];

} else if (currentLearningSubject === "Database") {

  questions =
    databaseLevelQuestions[currentLearningLevel - 1];

}else if (currentLearningSubject === "Database") {

  questions =
    databaseLevelQuestions[currentLearningLevel - 1];

} else if (currentLearningSubject === "Database") {
    questions =
      databaseLevelQuestions[currentLearningLevel - 1];
  }

  const currentLevel =
    currentLearningSubject === "JavaScript"
      ? currentJavaScriptLevel
      : currentLearningLevel;

 let score = 0;

// Calculate the actual score
questions.forEach((question, index) => {
  if (learningSelectedAnswers[index] === question.answer) {
    score++;
  }
});

// Save Learning Path quiz result for examination eligibility
const { data: { user }, error: userError } =
  await supabaseClient.auth.getUser();

if (user && !userError) {

  const { error: resultSaveError } =
    await supabaseClient
      .from("quiz_results")
      .insert([
       {
  user_id: user.id,
  quiz_name: `${currentLearningSubject} Learning Path - Level ${currentLevel}`,
  score: score,
  total_questions: questions.length,
  percentage: Math.round((score / questions.length) * 100)
}
      ]);

  if (resultSaveError) {
    console.error(
      "Learning quiz result saving error:",
      resultSaveError.message
    );
  } else {
    console.log("Learning quiz result saved successfully!");
  }
}

const passed = score >= 3;

  if (passed && currentLevel < 10) {

    if (currentLearningSubject === "JavaScript") {
      unlockedJavaScriptLevel = Math.max(
        unlockedJavaScriptLevel,
        currentLevel + 1
      );
    } else {
      unlockedLearningLevel = Math.max(
        unlockedLearningLevel,
        currentLevel + 1
      );
    }
  }

  if (passed) {
    if (currentLearningSubject === "JavaScript") {
      await saveJavaScriptProgress();
    } else {
      await saveLearningProgress(
        currentLearningSubject,
        currentLearningLevel,
        unlockedLearningLevel
      );
    }
  }

  document.getElementById("learningQuestionProgress").hidden = true;
  document.getElementById("learningQuestionText").hidden = true;
  document.getElementById("learningAnswerOptions").hidden = true;

  document.getElementById("learningPreviousBtn").hidden = true;
  document.getElementById("learningNextBtn").hidden = true;
  document.getElementById("learningSubmitBtn").hidden = true;

  document.getElementById("learningQuizResult").hidden = false;

  document.getElementById("learningScoreText").textContent =
    `You scored ${score} out of ${questions.length} (${Math.round(
  (score / questions.length) * 100
)}%).`;

  const resultMessage = document.createElement("p");
  resultMessage.className = "learning-pass-message";

  resultMessage.textContent = passed
    ? currentLevel === 10
      ? `🎉 Congratulations! You completed all 10 ${currentLearningSubject} levels!`
      : "🎉 Excellent! You unlocked the next level!"
    : "Keep practising! You need at least 3 correct answers to unlock the next level.";

  document.getElementById("learningQuizResult")
    .insertBefore(
      resultMessage,
      document.getElementById("learningReviewBtn")
    );

  document.getElementById("learningQuizResult")
    .scrollIntoView({ behavior: "smooth" });
}
// ==========================================
// PART 5: REVIEW LEARNING QUIZ ANSWERS
// ==========================================

document.getElementById("learningReviewBtn")
  .addEventListener("click", () => {

    const reviewContainer =
      document.getElementById("learningReviewContent") ||
      document.createElement("div");

    reviewContainer.id = "learningReviewContent";
    reviewContainer.innerHTML = "";

    let questions;

       if (currentLearningSubject === "JavaScript") {
      questions =
        javascriptLevelQuestions[currentJavaScriptLevel - 1];

    } else if (currentLearningSubject === "Database") {
      questions =
        databaseLevelQuestions[currentLearningLevel - 1];
    }

    questions.forEach((question, index) => {

      const card = document.createElement("div");
      card.className = "community-card";

      const selectedAnswer = learningSelectedAnswers[index];

      const questionTitle = document.createElement("h3");
      questionTitle.textContent =
        `Question ${index + 1}: ${question.question}`;

      const yourAnswer = document.createElement("p");
      yourAnswer.textContent =
        `Your answer: ${
          selectedAnswer === undefined
            ? "Not answered"
            : question.options[selectedAnswer]
        }`;

      const correctAnswer = document.createElement("p");
      correctAnswer.textContent =
        `Correct answer: ${question.options[question.answer]}`;

      const status = document.createElement("p");
      status.textContent =
        selectedAnswer === question.answer
          ? "✅ Correct"
          : "❌ Incorrect";

      card.appendChild(questionTitle);
      card.appendChild(yourAnswer);
      card.appendChild(correctAnswer);
      card.appendChild(status);

      reviewContainer.appendChild(card);
    });

    document.getElementById("learningQuizResult")
      .appendChild(reviewContainer);
  });
  // ==========================================
// PART 6: BACK TO SELECTED LEARNING PATH
// ==========================================

document.getElementById("learningQuizBackBtn")
  .addEventListener("click", () => {

    clearInterval(learningTimerInterval);

    document.getElementById("learningQuizSection").hidden = true;

    if (currentLearningSubject === "JavaScript") {

      document.getElementById("javascriptLevelsSection").hidden = false;

      displayJavaScriptLevels();

      document.getElementById("javascriptLevelsSection")
        .scrollIntoView({ behavior: "smooth" });

    }

  });
  // ==========================================
// PART 7: CLEAR PREVIOUS QUIZ RESULTS
// ==========================================

document.getElementById("startLearningQuizBtn")
  .addEventListener("click", () => {

    const oldMessage =
      document.querySelector(".learning-pass-message");

    if (oldMessage) {
      oldMessage.remove();
    }

    const oldReview =
      document.getElementById("learningReviewContent");

    if (oldReview) {
      oldReview.remove();
    }
  });
 
// ==========================================
// JAVA EXAMINATION - DISPLAY ALL QUESTIONS 
// ==========================================

function displayAllExaminationQuestions() {
  alert("Display function started! Questions: " + javaExaminationQuestions.length);

  const container = document.getElementById(
    "examinationQuestionsContainer"
  );
  alert("Container found: " + Boolean(container));

  container.innerHTML = "";

  javaExaminationQuestions.forEach((question, qIndex) => {

    const questionCard = document.createElement("div");
    questionCard.className = "question-card";

    const heading = document.createElement("h3");

    heading.textContent =
      `Question ${qIndex + 1}. ${question.question}`;

    questionCard.appendChild(heading);

    question.options.forEach((option, optionIndex) => {

      const label = document.createElement("label");

      label.style.display = "block";
      label.style.margin = "12px 0";
      label.style.padding = "10px";
      label.style.cursor = "pointer";

      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `examinationQuestion${qIndex}`;
      radio.value = optionIndex;

      radio.checked =
        examinationAnswers[qIndex] === optionIndex;

      radio.addEventListener("change", () => {

  examinationAnswers[qIndex] = optionIndex;

  saveExaminationProgress(examinationUserId);

});

      label.appendChild(radio);

      label.append(
        ` ${String.fromCharCode(65 + optionIndex)}. ${option}`
      );

      questionCard.appendChild(label);

    });

    container.appendChild(questionCard);

  });

}

// ==========================================
// REVIEW EXAMINATION ANSWERS
// ==========================================

function displayReviewAnswers() {

  const resultContainer = document.getElementById("examinationResult");
  document.getElementById("reviewAnswersContainer")?.remove();
  // PERFORMANCE ANALYTICS

let correctAnswers = 0;
let incorrectAnswers = 0;
let unansweredQuestions = 0;

javaExaminationQuestions.forEach((question, index) => {

  if (examinationAnswers[index] === undefined) {
    unansweredQuestions++;
  } 
  else if (examinationAnswers[index] === question.answer) {
    correctAnswers++;
  } 
  else {
    incorrectAnswers++;
  }

});

const performancePercentage = Math.round(
  (correctAnswers / javaExaminationQuestions.length) * 100
);

let performanceLevel = "";

if (performancePercentage >= 90) {
  performanceLevel = "Excellent 🏆";
} else if (performancePercentage >= 75) {
  performanceLevel = "Very Good 🌟";
} else if (performancePercentage >= 50) {
  performanceLevel = "Good 👍";
} else {
  performanceLevel = "Needs Improvement 📚";
}

  const reviewContainer = document.createElement("div");
  reviewContainer.id = "reviewAnswersContainer";

  reviewContainer.innerHTML = "<h2>📋 Review Your Answers</h2>";
  // DISPLAY PERFORMANCE ANALYTICS

const analyticsCard = document.createElement("div");

analyticsCard.className = "result-card";

analyticsCard.innerHTML = `
  <h2>📊 Your Performance Analytics</h2>

  <h3>Correct Answers: ${correctAnswers}</h3>
  <h3>Incorrect Answers: ${incorrectAnswers}</h3>
  <h3>Unanswered Questions: ${unansweredQuestions}</h3>

  <h3>Performance: ${performancePercentage}%</h3>

  <h2>${performanceLevel}</h2>

  <p>
    ${
      performancePercentage >= 90
        ? "Outstanding performance! Keep up the excellent work."
        : performancePercentage >= 75
        ? "Great work! Keep practising to reach excellence."
        : performancePercentage >= 50
        ? "Good effort! Revise the topics where you made mistakes."
        : "Don't give up! Practise regularly and improve step by step."
    }
  </p>
`;

reviewContainer.appendChild(analyticsCard);

  javaExaminationQuestions.forEach((question, qIndex) => {

    const card = document.createElement("div");
    card.className = "question-card";

    const heading = document.createElement("h3");
    heading.textContent = `Question ${qIndex + 1}. ${question.question}`;

    card.appendChild(heading);

    question.options.forEach((option, optionIndex) => {

      const answer = document.createElement("p");

      answer.textContent =
        `${String.fromCharCode(65 + optionIndex)}. ${option}`;

      if (optionIndex === question.answer) {
        answer.style.color = "green";
        answer.textContent += " ✓ Correct Answer";
      }

      if (
        examinationAnswers[qIndex] === optionIndex &&
        optionIndex !== question.answer
      ) {
        answer.style.color = "red";
        answer.textContent += " ✗ Your Answer";
      }

      card.appendChild(answer);

    });

    reviewContainer.appendChild(card);

  });

  resultContainer.appendChild(reviewContainer);
}


// ==========================================
// BACK FROM CERTIFICATE TO HOME
// ==========================================

document.getElementById("backFromCertificate")
  ?.addEventListener("click", function () {

    document.getElementById("certificateSection").hidden = true;

  });


// ==========================================
// EXAMINATION TAB SWITCH SECURITY
// ==========================================

let examinationTabSwitchCount = 0;

document.addEventListener("visibilitychange", function () {

  const examSection = document.getElementById("examinationQuizSection");

  if (
    document.hidden &&
    examSection &&
    !examSection.hidden &&
    !examinationSubmitted
  ) {

    examinationTabSwitchCount++;
    saveExaminationProgress(examinationUserId);

    if (examinationTabSwitchCount >= 3) {

      alert("🚫 Maximum tab-switch limit reached! Your examination will be submitted automatically.");

      finishExamination();

    } else {

      alert(
        `⚠️ Warning ${examinationTabSwitchCount}/3! Switching tabs is not allowed.`
      );

    }

  }

});
// ==========================================
// EXAMINATION REFRESH AND CLOSE PROTECTION
// ==========================================

window.addEventListener("beforeunload", function (event) {

  const examSection = document.getElementById("examinationQuizSection");

  if (
    examSection &&
    !examSection.hidden &&
    !examinationSubmitted
  ) {
    event.preventDefault();
    event.returnValue = "";
  }

});