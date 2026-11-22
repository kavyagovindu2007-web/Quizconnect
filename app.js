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
// Open Student Development Journey
document.getElementById("studentJourneyBtn").addEventListener("click", () => {

  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = true;
  document.getElementById("achievementsSection").hidden = true;
  document.getElementById("learningPathsSection").hidden = true;
  document.getElementById("placementHubSection").hidden = true;

  document.getElementById("studentJourneySection").hidden = false;

  document.getElementById("studentJourneySection").scrollIntoView({
    behavior: "smooth"
  });

});
// Back to Home from Student Development Journey
document.getElementById("backFromStudentJourney").addEventListener("click", () => {

  document.getElementById("studentJourneySection").hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
// Open Startup & Placement Hub
document.getElementById("placementHubBtn").addEventListener("click", () => {

  welcomeSection.hidden = true;
  statsSection.hidden = true;
  homeQuizSection.hidden = true;

  document.getElementById("communitySection").hidden = true;
  document.getElementById("achievementsSection").hidden = true;
  document.getElementById("learningPathsSection").hidden = true;

  document.getElementById("placementHubSection").hidden = false;

  document.getElementById("placementHubSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Open Startup Companies
document.getElementById("exploreCompaniesBtn").addEventListener("click", () => {

  document.getElementById("placementHubSection").hidden = true;
  document.getElementById("startupCompaniesSection").hidden = false;

  document.getElementById("startupCompaniesSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Open Internships
document.getElementById("exploreInternshipsBtn").addEventListener("click", () => {

  document.getElementById("placementHubSection").hidden = true;
  document.getElementById("internshipsSection").hidden = false;

  document.getElementById("internshipsSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Open Fresher Jobs
document.getElementById("exploreJobsBtn").addEventListener("click", () => {

  document.getElementById("placementHubSection").hidden = true;
  document.getElementById("fresherJobsSection").hidden = false;

  document.getElementById("fresherJobsSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Open Industry Required Skills
document.getElementById("exploreSkillsBtn").addEventListener("click", () => {

  document.getElementById("placementHubSection").hidden = true;
  document.getElementById("requiredSkillsSection").hidden = false;

  document.getElementById("requiredSkillsSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Back to Placement Hub from Required Skills
document.getElementById("backFromSkills").addEventListener("click", () => {

  document.getElementById("requiredSkillsSection").hidden = true;
  document.getElementById("placementHubSection").hidden = false;

  document.getElementById("placementHubSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Back to Placement Hub from Fresher Jobs
document.getElementById("backFromJobs").addEventListener("click", () => {

  document.getElementById("fresherJobsSection").hidden = true;
  document.getElementById("placementHubSection").hidden = false;

  document.getElementById("placementHubSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Back to Placement Hub from Internships
document.getElementById("backFromInternships").addEventListener("click", () => {

  document.getElementById("internshipsSection").hidden = true;
  document.getElementById("placementHubSection").hidden = false;

  document.getElementById("placementHubSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Back to Placement Hub from Startup Companies
document.getElementById("backToPlacementHub").addEventListener("click", () => {

  document.getElementById("startupCompaniesSection").hidden = true;
  document.getElementById("placementHubSection").hidden = false;

  document.getElementById("placementHubSection").scrollIntoView({
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
// START OR RESUME PYTHON EXAMINATION
// ==========================================

document.getElementById("startPythonExaminationBtn")
  .addEventListener("click", async () => {

    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    pythonExaminationUserId = user.id;
    pythonExaminationSubmitted = false;

    const savedExam = loadPythonExaminationProgress(user.id);

    // CHECK EXPIRED EXAMINATION

    if (savedExam && savedExam.endTime <= Date.now()) {

      pythonExaminationAnswers = savedExam.answers || {};
      pythonExaminationEndTime = savedExam.endTime;

      pythonExaminationTabSwitchCount =
        savedExam.tabSwitchCount || 0;

      pythonExaminationTimeLeft = 0;

      alert(
        "⏰ Your Python examination time has expired. Your answers will be submitted automatically."
      );

      await finishPythonExamination();
      return;
    }

    // CHECK ELIGIBILITY FOR NEW EXAMINATION

    if (!savedExam) {

      const { count: eligibleQuizCount, error: eligibilityError } =
        await supabaseClient
          .from("quiz_results")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("total_questions", 5)
          .gte("score", 3)
          .neq("quiz_name", "Python Programming Examination");

      if (eligibilityError) {
        console.error(
          "Python eligibility error:",
          eligibilityError.message
        );

        alert("Unable to check eligibility. Please try again.");
        return;
      }

      if (eligibleQuizCount < 10) {
        alert(
          `You have completed ${eligibleQuizCount} qualifying quizzes out of 10.\n\nYou need at least 10 quizzes with a score of 3/5 or above in each quiz.`
        );
        return;
      }
    }

    // RESUME OR START EXAMINATION

    if (savedExam) {

      pythonExaminationAnswers = savedExam.answers || {};

      pythonExaminationEndTime = savedExam.endTime;

      pythonExaminationTabSwitchCount =
        savedExam.tabSwitchCount || 0;

      pythonExaminationTimeLeft = Math.ceil(
        (pythonExaminationEndTime - Date.now()) / 1000
      );

      alert("Your previous Python examination has been restored!");

    } else {

      pythonExaminationAnswers = {};
      pythonExaminationTabSwitchCount = 0;

      pythonExaminationTimeLeft = 60 * 60;

      pythonExaminationEndTime =
        Date.now() + (60 * 60 * 1000);

      pythonExaminationSubmitted = false;

      savePythonExaminationProgress(user.id);
    }

    // SHOW PYTHON EXAMINATION SCREEN

    document.getElementById("examinationSection").hidden = true;

    document.getElementById("pythonExaminationQuizSection").hidden = false;

    try {
      displayAllPythonExaminationQuestions();
    } catch (error) {
      alert("Python Examination Error: " + error.message);
      return;
    }

    startPythonExaminationTimer();

    document.getElementById("pythonExaminationQuizSection")
      .scrollIntoView({ behavior: "smooth" });

});
// ==========================================
// START OR RESUME C PROGRAMMING EXAMINATION
// ==========================================

document.getElementById("startCExaminationBtn")
  .addEventListener("click", async () => {

    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    cExaminationUserId = user.id;
    cExaminationSubmitted = false;

    const savedExam = loadCExaminationProgress(user.id);

    // CHECK EXPIRED EXAMINATION

    if (savedExam && savedExam.endTime <= Date.now()) {

      cExaminationAnswers = savedExam.answers || {};
      cExaminationEndTime = savedExam.endTime;

      cExaminationTabSwitchCount =
        savedExam.tabSwitchCount || 0;

      cExaminationTimeLeft = 0;

      alert(
        "⏰ Your C Programming examination time has expired. Your answers will be submitted automatically."
      );

      await finishCExamination();
      return;
    }

    // CHECK ELIGIBILITY FOR NEW EXAMINATION

    if (!savedExam) {

      const { count: eligibleQuizCount, error: eligibilityError } =
        await supabaseClient
          .from("quiz_results")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("total_questions", 5)
          .gte("score", 3)
          .neq("quiz_name", "C Programming Examination");

      if (eligibilityError) {
        console.error(
          "C eligibility error:",
          eligibilityError.message
        );

        alert("Unable to check eligibility. Please try again.");
        return;
      }

      if (eligibleQuizCount < 10) {
        alert(
          `You have completed ${eligibleQuizCount} qualifying quizzes out of 10.\n\nYou need at least 10 quizzes with a score of 3/5 or above in each quiz.`
        );
        return;
      }
    }

    // RESUME OR START EXAMINATION

    if (savedExam) {

      cExaminationAnswers = savedExam.answers || {};

      cExaminationEndTime = savedExam.endTime;

      cExaminationTabSwitchCount =
        savedExam.tabSwitchCount || 0;

      cExaminationTimeLeft = Math.ceil(
        (cExaminationEndTime - Date.now()) / 1000
      );

      alert("Your previous C Programming examination has been restored!");

    } else {

      cExaminationAnswers = {};
      cExaminationTabSwitchCount = 0;

      cExaminationTimeLeft = 60 * 60;

      cExaminationEndTime =
        Date.now() + (60 * 60 * 1000);

      cExaminationSubmitted = false;

      saveCExaminationProgress(user.id);
    }

    // SHOW C EXAMINATION SCREEN

    document.getElementById("examinationSection").hidden = true;

    document.getElementById("cExaminationQuizSection").hidden = false;

    try {
      displayAllCExaminationQuestions();
    } catch (error) {
      alert("C Examination Error: " + error.message);
      return;
    }

    startCExaminationTimer();

    document.getElementById("cExaminationQuizSection")
      .scrollIntoView({ behavior: "smooth" });

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
// PYTHON EXAMINATION - QUESTION BANK
// ==========================================

const pythonExaminationQuestions = [

  {
    question: "Who created Python?",
    options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"],
    answer: 1
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/*", "--"],
    answer: 1
  },
  {
    question: "Which function displays output in Python?",
    options: ["echo()", "display()", "print()", "output()"],
    answer: 2
  },
  {
    question: "Which keyword defines a function?",
    options: ["function", "def", "fun", "define"],
    answer: 1
  },
  {
    question: "Which data type stores True or False?",
    options: ["int", "str", "bool", "float"],
    answer: 2
  },
  {
    question: "Which operator performs exponentiation?",
    options: ["^", "**", "//", "%%"],
    answer: 1
  },
  {
    question: "Which collection is ordered and mutable?",
    options: ["Tuple", "Set", "List", "String"],
    answer: 2
  },
  {
    question: "Which brackets are used to create a list?",
    options: ["()", "{}", "[]", "<>"],
    answer: 2
  },
  {
    question: "Which data type stores key-value pairs?",
    options: ["List", "Tuple", "Dictionary", "Set"],
    answer: 2
  },
  {
    question: "Which keyword is used for a conditional statement?",
    options: ["when", "if", "check", "condition"],
    answer: 1
  },
  {
    question: "Which loop iterates over a sequence?",
    options: ["repeat", "for", "loop", "iterate"],
    answer: 1
  },
  {
    question: "Which keyword exits a loop?",
    options: ["stop", "exit", "break", "skip"],
    answer: 2
  },
  {
    question: "Which keyword skips the current iteration?",
    options: ["break", "continue", "pass", "return"],
    answer: 1
  },
  {
    question: "What does len() return?",
    options: ["Data type", "Length", "Memory size", "Index"],
    answer: 1
  },
  {
    question: "Which function converts a value to an integer?",
    options: ["str()", "float()", "int()", "bool()"],
    answer: 2
  },
  {
    question: "What is the index of the first element in a Python list?",
    options: ["1", "-1", "0", "2"],
    answer: 2
  },
  {
    question: "Which method adds an item to the end of a list?",
    options: ["add()", "append()", "insertEnd()", "push()"],
    answer: 1
  },
  {
    question: "Which method removes an item from a list?",
    options: ["delete()", "remove()", "discard()", "erase()"],
    answer: 1
  },
  {
    question: "Which collection does not allow duplicate elements?",
    options: ["List", "Tuple", "Set", "String"],
    answer: 2
  },
  {
    question: "Which brackets are used to create a tuple?",
    options: ["[]", "{}", "()", "<>"],
    answer: 2
  },
  {
    question: "Which operator checks equality?",
    options: ["=", "==", "!=", "==="],
    answer: 1
  },
  {
    question: "Which operator represents logical AND?",
    options: ["&&", "&", "and", "AND"],
    answer: 2
  },
  {
    question: "Which keyword handles exceptions?",
    options: ["try", "check", "error", "handle"],
    answer: 0
  },
  {
    question: "Which block executes whether an exception occurs or not?",
    options: ["except", "finally", "else", "try"],
    answer: 1
  },
  {
    question: "Which keyword is used to import a module?",
    options: ["include", "using", "import", "require"],
    answer: 2
  },
  {
    question: "Which module provides mathematical functions?",
    options: ["random", "math", "os", "sys"],
    answer: 1
  },
  {
    question: "Which function returns the largest value?",
    options: ["min()", "high()", "max()", "largest()"],
    answer: 2
  },
  {
    question: "Which function returns the smallest value?",
    options: ["min()", "low()", "small()", "least()"],
    answer: 0
  },
  {
    question: "What does range(5) generate?",
    options: ["1 to 5", "0 to 4", "0 to 5", "1 to 4"],
    answer: 1
  },
  {
    question: "Which keyword creates an anonymous function?",
    options: ["def", "lambda", "anonymous", "function"],
    answer: 1
  },
  {
    question: "Which keyword represents an empty placeholder statement?",
    options: ["empty", "skip", "pass", "null"],
    answer: 2
  },
  {
    question: "Which method converts a string to lowercase?",
    options: ["lower()", "small()", "tolower()", "down()"],
    answer: 0
  },
  {
    question: "Which method converts a string to uppercase?",
    options: ["capital()", "upper()", "up()", "uppercase()"],
    answer: 1
  },
  {
    question: "Which method splits a string into a list?",
    options: ["divide()", "split()", "separate()", "cut()"],
    answer: 1
  },
  {
    question: "Which function opens a file?",
    options: ["file()", "read()", "open()", "load()"],
    answer: 2
  },
  {
    question: "Which file mode is used for reading?",
    options: ["w", "a", "r", "x"],
    answer: 2
  },
  {
    question: "Which file mode is used for writing?",
    options: ["r", "w", "a", "read"],
    answer: 1
  },
  {
    question: "Which keyword defines a class?",
    options: ["object", "class", "struct", "define"],
    answer: 1
  },
  {
    question: "Which method is commonly used as a constructor?",
    options: ["__start__()", "__init__()", "constructor()", "__newclass__()"],
    answer: 1
  },
  {
    question: "What does self represent in a class?",
    options: ["Parent class", "Current instance", "Module", "Global variable"],
    answer: 1
  },
  {
    question: "Which concept allows a class to inherit another class?",
    options: ["Encapsulation", "Inheritance", "Iteration", "Compilation"],
    answer: 1
  },
  {
    question: "Which function returns the type of an object?",
    options: ["typeof()", "type()", "datatype()", "checktype()"],
    answer: 1
  },
  {
    question: "Which keyword is used to return a value from a function?",
    options: ["send", "print", "return", "yield"],
    answer: 2
  },
  {
    question: "Which keyword creates a generator?",
    options: ["return", "yield", "generate", "next"],
    answer: 1
  },
  {
    question: "Which operator performs floor division?",
    options: ["/", "//", "%", "**"],
    answer: 1
  },
  {
    question: "Which operator returns the remainder?",
    options: ["/", "//", "%", "**"],
    answer: 2
  },
  {
    question: "Which built-in function gets input from the user?",
    options: ["scan()", "get()", "input()", "read()"],
    answer: 2
  },
  {
    question: "Which statement is used to test multiple conditions?",
    options: ["if-elif-else", "switch-only", "repeat-until", "case-loop"],
    answer: 0
  },
  {
    question: "Which built-in function returns an absolute value?",
    options: ["abs()", "absolute()", "positive()", "magnitude()"],
    answer: 0
  },
  {
    question: "Which keyword is used to create a subclass?",
    options: ["extends", "inherits", "class", "super"],
    answer: 2
  }

];

console.log("Python Examination questions:", pythonExaminationQuestions.length);
// ==========================================
// C PROGRAMMING EXAMINATION - QUESTION BANK
// ==========================================

const cExaminationQuestions = [

  {
    question: "Who developed the C programming language?",
    options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
    answer: 1
  },
  {
    question: "Where was C language developed?",
    options: ["Microsoft", "Bell Laboratories", "Google", "IBM"],
    answer: 1
  },
  {
    question: "Which extension is commonly used for C source files?",
    options: [".cpp", ".java", ".c", ".py"],
    answer: 2
  },
  {
    question: "Which function is the entry point of a C program?",
    options: ["start()", "main()", "begin()", "run()"],
    answer: 1
  },
  {
    question: "Which header file is required for printf()?",
    options: ["<conio.h>", "<string.h>", "<stdio.h>", "<math.h>"],
    answer: 2
  },
  {
    question: "Which symbol terminates a C statement?",
    options: [":", ".", ";", ","],
    answer: 2
  },
  {
    question: "Which format specifier is used for an integer?",
    options: ["%f", "%c", "%d", "%s"],
    answer: 2
  },
  {
    question: "Which data type stores a single character?",
    options: ["int", "char", "float", "double"],
    answer: 1
  },
  {
    question: "Which keyword declares a constant variable?",
    options: ["fixed", "constant", "const", "static"],
    answer: 2
  },
  {
    question: "Which operator is used to obtain the address of a variable?",
    options: ["*", "&", "%", "#"],
    answer: 1
  },
  {
    question: "Which operator performs modulus operation?",
    options: ["/", "*", "%", "+"],
    answer: 2
  },
  {
    question: "What is the result of 10 / 3 in integer division?",
    options: ["3.33", "3", "4", "1"],
    answer: 1
  },
  {
    question: "Which operator represents logical AND in C?",
    options: ["&", "&&", "||", "!"],
    answer: 1
  },
  {
    question: "Which operator represents logical OR?",
    options: ["&&", "!", "||", "&"],
    answer: 2
  },
  {
    question: "Which statement is used for decision-making?",
    options: ["for", "if", "break", "continue"],
    answer: 1
  },
  {
    question: "Which statement selects one option from multiple cases?",
    options: ["if", "switch", "while", "goto"],
    answer: 1
  },
  {
    question: "Which keyword exits a loop immediately?",
    options: ["continue", "return", "break", "skip"],
    answer: 2
  },
  {
    question: "Which loop executes at least once?",
    options: ["for", "while", "do-while", "nested for"],
    answer: 2
  },
  {
    question: "Which loop is commonly used when the number of iterations is known?",
    options: ["for", "do-while", "while", "goto"],
    answer: 0
  },
  {
    question: "What is the index of the first element in an array?",
    options: ["1", "-1", "0", "2"],
    answer: 2
  },
  {
    question: "How are array elements stored in C?",
    options: ["Random locations", "Contiguous memory locations", "Only registers", "Separate files"],
    answer: 1
  },
  {
    question: "Which character terminates a string in C?",
    options: ["\\n", "\\t", "\\0", "\\r"],
    answer: 2
  },
  {
    question: "Which function reads formatted input?",
    options: ["printf()", "scanf()", "puts()", "getchar()"],
    answer: 1
  },
  {
    question: "Which function calculates the length of a string?",
    options: ["strsize()", "strlen()", "strcount()", "length()"],
    answer: 1
  },
  {
    question: "Which header file declares string functions?",
    options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
    answer: 2
  },
  {
    question: "Which function allocates memory dynamically?",
    options: ["free()", "malloc()", "sizeof()", "printf()"],
    answer: 1
  },
  {
    question: "Which function releases dynamically allocated memory?",
    options: ["delete()", "remove()", "free()", "clear()"],
    answer: 2
  },
  {
    question: "Which operator accesses the value stored at a pointer address?",
    options: ["&", "*", "%", "#"],
    answer: 1
  },
  {
    question: "What does a NULL pointer represent?",
    options: ["Address zero or no valid object address", "A character", "An integer variable", "A function"],
    answer: 0
  },
  {
    question: "Which keyword is used to define a structure?",
    options: ["union", "record", "struct", "class"],
    answer: 2
  },
  {
    question: "Which operator accesses a structure member using a structure variable?",
    options: ["->", ".", "::", "*"],
    answer: 1
  },
  {
    question: "Which operator accesses a structure member through a pointer?",
    options: [".", "->", "&", "%"],
    answer: 1
  },
  {
    question: "Which feature allows different members to share the same memory?",
    options: ["Structure", "Array", "Union", "Function"],
    answer: 2
  },
  {
    question: "Which keyword defines a user-defined type alias?",
    options: ["define", "typedef", "type", "alias"],
    answer: 1
  },
  {
    question: "Which storage class preserves a local variable's value between function calls?",
    options: ["auto", "register", "static", "extern"],
    answer: 2
  },
  {
    question: "Which function opens a file in C?",
    options: ["open()", "fopen()", "fileopen()", "readfile()"],
    answer: 1
  },
  {
    question: "Which function closes an opened file?",
    options: ["close()", "fclose()", "endfile()", "stop()"],
    answer: 1
  },
  {
    question: "Which file mode opens a file for reading?",
    options: ["w", "a", "r", "x"],
    answer: 2
  },
  {
    question: "Which file mode opens a file for appending?",
    options: ["r", "w", "a", "x"],
    answer: 2
  },
  {
    question: "Which function writes formatted data to a file?",
    options: ["fscanf()", "fprintf()", "fread()", "fopen()"],
    answer: 1
  },
  {
    question: "Which function reads formatted data from a file?",
    options: ["fprintf()", "fwrite()", "fscanf()", "fclose()"],
    answer: 2
  },
  {
    question: "Which function moves the file position indicator?",
    options: ["fseek()", "fopen()", "fclose()", "fgets()"],
    answer: 0
  },
  {
    question: "Which preprocessor directive includes a header file?",
    options: ["#define", "#include", "#ifdef", "#pragma"],
    answer: 1
  },
  {
    question: "Which directive is used to define a macro?",
    options: ["#include", "#define", "#endif", "#error"],
    answer: 1
  },
  {
    question: "Which function returns the absolute value of an integer?",
    options: ["sqrt()", "abs()", "pow()", "ceil()"],
    answer: 1
  },
  {
    question: "Which function is commonly used to compare two strings?",
    options: ["strcpy()", "strcat()", "strcmp()", "strlen()"],
    answer: 2
  },
  {
    question: "Which function copies one string into another?",
    options: ["strcmp()", "strcpy()", "strcat()", "strlen()"],
    answer: 1
  },
  {
    question: "What is recursion in C?",
    options: ["A loop inside another loop", "A function calling itself", "A pointer operation", "A file operation"],
    answer: 1
  },
  {
    question: "Which function terminates a program normally?",
    options: ["stop()", "break()", "exit()", "end()"],
    answer: 2
  },
  {
    question: "What is the return type of the standard main function when it returns a status code?",
    options: ["void", "char", "int", "float"],
    answer: 2
  }

];

console.log("C Examination questions:", cExaminationQuestions.length);

// ==========================================
// DATA STRUCTURES EXAMINATION - QUESTION BANK
// ==========================================

const dataStructuresExaminationQuestions = [

  {
    question: "What is a data structure?",
    options: ["A programming language", "A way of organizing and storing data", "An operating system", "A database only"],
    answer: 1
  },
  {
    question: "Which data structure stores elements in contiguous memory locations?",
    options: ["Linked List", "Tree", "Array", "Graph"],
    answer: 2
  },
  {
    question: "What is the index of the first element in an array?",
    options: ["1", "0", "-1", "2"],
    answer: 1
  },
  {
    question: "Which operation adds an element to an array?",
    options: ["Insertion", "Deletion", "Searching", "Sorting"],
    answer: 0
  },
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Graph"],
    answer: 1
  },
  {
    question: "What is the time complexity of accessing an array element by index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    answer: 2
  },
  {
    question: "Which data structure stores elements using nodes and pointers?",
    options: ["Array", "Linked List", "Stack", "Queue"],
    answer: 1
  },
  {
    question: "What does a node in a singly linked list contain?",
    options: ["Only data", "Data and a pointer to the next node", "Only an index", "Two arrays"],
    answer: 1
  },
  {
    question: "Which pointer indicates the end of a singly linked list?",
    options: ["Head", "Tail", "NULL", "Root"],
    answer: 2
  },
  {
    question: "Which linked list allows traversal in both directions?",
    options: ["Singly Linked List", "Doubly Linked List", "Circular Queue", "Stack"],
    answer: 1
  },
  {
    question: "What is the first node of a linked list called?",
    options: ["Root", "Head", "Leaf", "Tail"],
    answer: 1
  },
  {
    question: "Which operation removes a node from a linked list?",
    options: ["Insertion", "Deletion", "Traversal", "Sorting"],
    answer: 1
  },
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: 1
  },
  {
    question: "Which operation inserts an element into a stack?",
    options: ["Pop", "Push", "Dequeue", "Peek"],
    answer: 1
  },
  {
    question: "Which operation removes the top element from a stack?",
    options: ["Push", "Pop", "Enqueue", "Search"],
    answer: 1
  },
  {
    question: "What happens when we try to pop an element from an empty stack?",
    options: ["Overflow", "Underflow", "Insertion", "Traversal"],
    answer: 1
  },
  {
    question: "Which data structure is commonly used to evaluate expressions?",
    options: ["Stack", "Queue", "Graph", "Array only"],
    answer: 0
  },
  {
    question: "Which principle does a queue follow?",
    options: ["LIFO", "FIFO", "Random order", "Sorted order"],
    answer: 1
  },
  {
    question: "Which operation inserts an element into a queue?",
    options: ["Push", "Pop", "Enqueue", "Dequeue"],
    answer: 2
  },
  {
    question: "Which operation removes an element from a queue?",
    options: ["Enqueue", "Dequeue", "Push", "Peek"],
    answer: 1
  },
  {
    question: "From which end is an element removed in a standard queue?",
    options: ["Rear", "Front", "Middle", "Any position"],
    answer: 1
  },
  {
    question: "Which queue connects its last position back to the first position?",
    options: ["Simple Queue", "Circular Queue", "Priority Stack", "Linear List"],
    answer: 1
  },
  {
    question: "Which searching algorithm checks elements one by one?",
    options: ["Binary Search", "Linear Search", "Merge Sort", "Quick Sort"],
    answer: 1
  },
  {
    question: "What is required before applying binary search?",
    options: ["Elements must be sorted", "Elements must be duplicated", "Array must be empty", "Elements must be reversed"],
    answer: 0
  },
  {
    question: "What is the average time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2
  },
  {
    question: "Which searching algorithm is suitable for an unsorted array?",
    options: ["Binary Search", "Linear Search", "Merge Sort", "Heap Sort"],
    answer: 1
  },
  {
    question: "Which sorting algorithm repeatedly compares adjacent elements?",
    options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
    answer: 0
  },
  {
    question: "Which sorting algorithm repeatedly selects the smallest element?",
    options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"],
    answer: 1
  },
  {
    question: "Which sorting algorithm uses the divide-and-conquer technique?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Linear Search"],
    answer: 2
  },
  {
    question: "What is the average time complexity of Merge Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    answer: 1
  },
  {
    question: "Which data structure represents hierarchical relationships?",
    options: ["Queue", "Stack", "Tree", "Array"],
    answer: 2
  },
  {
    question: "What is the topmost node of a tree called?",
    options: ["Leaf", "Root", "Edge", "Child"],
    answer: 1
  },
  {
    question: "What is a node with no children called?",
    options: ["Root", "Parent", "Leaf", "Sibling"],
    answer: 2
  },
  {
    question: "In a binary tree, what is the maximum number of children a node can have?",
    options: ["1", "2", "3", "4"],
    answer: 1
  },
  {
    question: "Which traversal visits the root, left subtree, and right subtree?",
    options: ["Inorder", "Preorder", "Postorder", "Level order"],
    answer: 1
  },
  {
    question: "Which data structure is commonly used in level-order tree traversal?",
    options: ["Stack", "Queue", "Hash Table", "Array only"],
    answer: 1
  },
  {
    question: "Which data structure represents connections between vertices?",
    options: ["Stack", "Queue", "Graph", "Array"],
    answer: 2
  },
  {
    question: "What are the connecting links between vertices in a graph called?",
    options: ["Nodes", "Edges", "Roots", "Leaves"],
    answer: 1
  },
  {
    question: "Which graph has edges with no direction?",
    options: ["Directed Graph", "Undirected Graph", "Weighted Tree", "Binary Tree"],
    answer: 1
  },
  {
    question: "Which algorithm is commonly used for Breadth-First Search?",
    options: ["Stack", "Queue", "Heap", "Linked List only"],
    answer: 1
  },
  {
    question: "Which algorithm is commonly used for Depth-First Search?",
    options: ["Queue", "Stack", "Hash Table", "Priority Queue"],
    answer: 1
  },
  {
    question: "What is hashing used for?",
    options: ["Sorting only", "Mapping keys to positions", "Creating trees", "Deleting arrays"],
    answer: 1
  },
  {
    question: "Which data structure commonly uses a hash function?",
    options: ["Hash Table", "Stack", "Queue", "Binary Tree only"],
    answer: 0
  },
  {
    question: "What is a collision in hashing?",
    options: ["Deleting a key", "Two keys mapping to the same index", "Sorting a table", "Emptying a table"],
    answer: 1
  },
  {
    question: "Which technique handles collisions using linked lists?",
    options: ["Linear Search", "Separate Chaining", "Bubble Sort", "Binary Search"],
    answer: 1
  },
  {
    question: "Which operation is used to find an element in a data structure?",
    options: ["Insertion", "Searching", "Deletion", "Traversal only"],
    answer: 1
  },
  {
    question: "What does time complexity describe?",
    options: ["Memory used by a program", "How execution time grows with input size", "The size of a file", "The number of variables"],
    answer: 1
  },
  {
    question: "What does space complexity measure?",
    options: ["Execution speed", "Memory required by an algorithm", "Number of functions", "Network speed"],
    answer: 1
  },
  {
    question: "Which notation describes an upper bound on algorithm growth?",
    options: ["Big O", "Big Omega", "Big Theta only", "Little o only"],
    answer: 0
  },
  {
    question: "Which data structure is suitable for implementing undo operations?",
    options: ["Queue", "Stack", "Graph", "Hash Table"],
    answer: 1
  }

];

console.log(
  "Data Structures Examination questions:",
  dataStructuresExaminationQuestions.length
);
// ==========================================
// WEB DEVELOPMENT EXAMINATION - QUESTION BANK
// ==========================================

const webDevelopmentExaminationQuestions = [

  // HTML FUNDAMENTALS

  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Management Language", "Home Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which HTML tag defines the main heading?",
    options: ["<head>", "<h1>", "<title>", "<header>"],
    answer: 1
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: 2
  },
  {
    question: "Which HTML attribute specifies an image location?",
    options: ["alt", "src", "href", "link"],
    answer: 1
  },
  {
    question: "Which tag creates an ordered list?",
    options: ["<ul>", "<li>", "<ol>", "<dl>"],
    answer: 2
  },
  {
    question: "Which HTML element is used to create a table row?",
    options: ["<td>", "<th>", "<tr>", "<table-row>"],
    answer: 2
  },
  {
    question: "Which input type is used for email addresses?",
    options: ["text", "email", "mail", "address"],
    answer: 1
  },
  {
    question: "Which attribute makes a form field compulsory?",
    options: ["required", "validate", "important", "mandatory-field"],
    answer: 0
  },
  {
    question: "Which semantic HTML element represents navigation links?",
    options: ["<section>", "<nav>", "<article>", "<footer>"],
    answer: 1
  },
  {
    question: "Which HTML tag is used to play video files?",
    options: ["<media>", "<movie>", "<video>", "<play>"],
    answer: 2
  },

  // CSS FUNDAMENTALS

  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Styling System", "Colorful Style Syntax"],
    answer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "background-color", "color", "text-decoration"],
    answer: 2
  },
  {
    question: "Which symbol selects an HTML element by its ID?",
    options: [".", "#", "*", "&"],
    answer: 1
  },
  {
    question: "Which symbol selects elements by class?",
    options: ["#", ".", "@", "$"],
    answer: 1
  },
  {
    question: "Which CSS property changes the background color?",
    options: ["color", "background-color", "bg-style", "background-text"],
    answer: 1
  },
  {
    question: "Which property controls the size of text?",
    options: ["font-size", "text-weight", "font-color", "text-style"],
    answer: 0
  },
  {
    question: "Which CSS layout system is designed for one-dimensional layouts?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    answer: 1
  },
  {
    question: "Which CSS property adds space inside an element's border?",
    options: ["margin", "padding", "spacing", "outline"],
    answer: 1
  },
  {
    question: "Which CSS property adds space outside an element's border?",
    options: ["padding", "border", "margin", "width"],
    answer: 2
  },
  {
    question: "Which CSS rule is used to apply styles based on screen size?",
    options: ["@keyframes", "@media", "@import", "@font-face"],
    answer: 1
  },

  // JAVASCRIPT FUNDAMENTALS

  {
    question: "Which language is commonly used to add interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 2
  },
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    answer: 1
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["var", "let", "const", "new"],
    answer: 2
  },
  {
    question: "Which operator checks both value and type equality?",
    options: ["=", "==", "===", "!="],
    answer: 2
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "##", "<!--", "**"],
    answer: 0
  },
  {
    question: "Which method displays a message in the browser console?",
    options: ["console.write()", "console.log()", "print.console()", "display()"],
    answer: 1
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    answer: 2
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
    answer: 1
  },
  {
    question: "Which statement is used to make decisions in JavaScript?",
    options: ["if", "repeat", "define", "include"],
    answer: 0
  },
  {
    question: "Which loop executes a block while a condition is true?",
    options: ["if", "while", "switch", "break"],
    answer: 1
  },

  // DOM AND EVENTS

  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Digital Ordinance Model", "Document Oriented Method"],
    answer: 0
  },
  {
    question: "Which method selects an element using its ID?",
    options: ["getElementsByClassName()", "queryAll()", "getElementById()", "selectId()"],
    answer: 2
  },
  {
    question: "Which property changes the text content of an element?",
    options: ["innerText", "src", "href", "valueOnly"],
    answer: 0
  },
  {
    question: "Which method attaches an event handler to an element?",
    options: ["addEventListener()", "attachStyle()", "createEvent()", "eventHandler()"],
    answer: 0
  },
  {
    question: "Which event occurs when a user clicks an element?",
    options: ["mouseover", "change", "click", "submit"],
    answer: 2
  },
  {
    question: "Which event is commonly used when a form is submitted?",
    options: ["load", "submit", "scroll", "resize"],
    answer: 1
  },
  {
    question: "Which method creates a new HTML element using JavaScript?",
    options: ["document.createElement()", "document.newTag()", "document.addTag()", "document.make()"],
    answer: 0
  },

  // BACKEND AND APIs

  {
    question: "What is the main purpose of backend development?",
    options: ["Designing colors", "Managing server-side logic and data", "Creating images only", "Writing HTML headings"],
    answer: 1
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Program Internet", "Application Process Integration", "Automated Programming Instruction"],
    answer: 0
  },
  {
    question: "Which HTTP method is commonly used to retrieve data?",
    options: ["POST", "DELETE", "GET", "PATCH"],
    answer: 2
  },
  {
    question: "Which HTTP method is commonly used to create or submit data?",
    options: ["GET", "POST", "HEAD", "OPTIONS"],
    answer: 1
  },
  {
    question: "What does HTTP status code 404 indicate?",
    options: ["Success", "Server error", "Resource not found", "Request accepted"],
    answer: 2
  },
  {
    question: "What is JSON commonly used for?",
    options: ["Styling web pages", "Exchanging structured data", "Creating images", "Compiling CSS"],
    answer: 1
  },
  {
    question: "Which JavaScript function can make an HTTP request?",
    options: ["fetch()", "display()", "prompt()", "alert()"],
    answer: 0
  },
  {
    question: "What is a database used for?",
    options: ["Storing and managing data", "Designing page layouts", "Playing videos", "Changing font sizes"],
    answer: 0
  },

  // DEPLOYMENT AND WEB SECURITY

  {
    question: "What is web hosting?",
    options: ["Writing JavaScript", "Making a website accessible on the internet", "Creating a database table", "Designing a logo"],
    answer: 1
  },
  {
    question: "What does HTTPS provide?",
    options: ["Encrypted communication", "Faster typing", "Automatic website design", "Free domain names"],
    answer: 0
  },
  {
    question: "What is responsive web design?",
    options: ["A website that works only on desktops", "A website that adapts to different screen sizes", "A website without images", "A website with fixed width"],
    answer: 1
  },
  {
    question: "Which tool is commonly used for version control?",
    options: ["Photoshop", "Git", "Excel", "PowerPoint"],
    answer: 1
  },
  {
    question: "What is the purpose of GitHub?",
    options: ["Hosting and collaborating on code repositories", "Editing videos", "Creating database queries only", "Designing animations"],
    answer: 0
  }
  
];

console.log(
  "Web Development Examination questions:",
  webDevelopmentExaminationQuestions.length
);

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
// ==========================================
// PYTHON EXAMINATION VARIABLES
// ==========================================

let pythonExaminationAnswers = {};
let pythonExaminationTimeLeft = 60 * 60;
let pythonExaminationTimerInterval = null;
let pythonExaminationSubmitted = false;
let pythonExaminationEndTime = null;
let pythonExaminationUserId = null;
let pythonExaminationTabSwitchCount = 0;

// SAVE PYTHON EXAMINATION PROGRESS
function savePythonExaminationProgress(userId) {

  localStorage.setItem(
    `pythonExam_${userId}`,
    JSON.stringify({
      answers: pythonExaminationAnswers,
      endTime: pythonExaminationEndTime,
      tabSwitchCount: pythonExaminationTabSwitchCount
    })
  );

}
// ==========================================
// C PROGRAMMING EXAMINATION VARIABLES
// ==========================================

let cExaminationAnswers = {};
let cExaminationTimeLeft = 60 * 60;
let cExaminationTimerInterval = null;
let cExaminationSubmitted = false;
let cExaminationEndTime = null;
let cExaminationUserId = null;
let cExaminationTabSwitchCount = 0;
// ==========================================
// DATA STRUCTURES EXAMINATION VARIABLES
// ==========================================

let dataStructuresExaminationAnswers = {};
let dataStructuresExaminationTimeLeft = 60 * 60;
let dataStructuresExaminationTimerInterval = null;
let dataStructuresExaminationSubmitted = false;
let dataStructuresExaminationEndTime = null;
let dataStructuresExaminationUserId = null;
let dataStructuresExaminationTabSwitchCount = 0;
// SAVE C EXAMINATION PROGRESS
function saveCExaminationProgress(userId) {

  localStorage.setItem(
    `cExam_${userId}`,
    JSON.stringify({
      answers: cExaminationAnswers,
      endTime: cExaminationEndTime,
      tabSwitchCount: cExaminationTabSwitchCount
    })
  );

}
// SAVE DATA STRUCTURES EXAMINATION PROGRESS
function saveDataStructuresExaminationProgress(userId) {

  localStorage.setItem(
    `dataStructuresExam_${userId}`,
    JSON.stringify({
      answers: dataStructuresExaminationAnswers,
      endTime: dataStructuresExaminationEndTime,
      tabSwitchCount: dataStructuresExaminationTabSwitchCount
    })
  );

}
// ==========================================
// WEB DEVELOPMENT EXAMINATION VARIABLES
// ==========================================

let webDevelopmentExaminationAnswers = {};
let webDevelopmentExaminationTimeLeft = 60 * 60;
let webDevelopmentExaminationTimerInterval = null;
let webDevelopmentExaminationSubmitted = false;
let webDevelopmentExaminationEndTime = null;
let webDevelopmentExaminationUserId = null;
let webDevelopmentExaminationTabSwitchCount = 0;

// SAVE WEB DEVELOPMENT EXAMINATION PROGRESS
function saveWebDevelopmentExaminationProgress(userId) {

  localStorage.setItem(
    `webDevelopmentExam_${userId}`,
    JSON.stringify({
      answers: webDevelopmentExaminationAnswers,
      endTime: webDevelopmentExaminationEndTime,
      tabSwitchCount: webDevelopmentExaminationTabSwitchCount
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
// RESTORE PYTHON EXAMINATION PROGRESS
function loadPythonExaminationProgress(userId) {

  const savedData = localStorage.getItem(
    `pythonExam_${userId}`
  );

  if (!savedData) {
    return null;
  }

  const examData = JSON.parse(savedData);

  return examData;
}
// RESTORE C EXAMINATION PROGRESS
function loadCExaminationProgress(userId) {

  const savedData = localStorage.getItem(
    `cExam_${userId}`
  );

  if (!savedData) {
    return null;
  }

  const examData = JSON.parse(savedData);

  return examData;
}
// RESTORE DATA STRUCTURES EXAMINATION PROGRESS
function loadDataStructuresExaminationProgress(userId) {

  const savedData = localStorage.getItem(
    `dataStructuresExam_${userId}`
  );

  if (!savedData) {
    return null;
  }

  const examData = JSON.parse(savedData);

  return examData;
}
// RESTORE WEB DEVELOPMENT EXAMINATION PROGRESS
function loadWebDevelopmentExaminationProgress(userId) {

  const savedData = localStorage.getItem(
    `webDevelopmentExam_${userId}`
  );

  if (!savedData) {
    return null;
  }

  const examData = JSON.parse(savedData);

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
// ==========================================
// PYTHON EXAMINATION TIMER
// ==========================================

function updatePythonExaminationTimer() {

  const minutes = Math.floor(pythonExaminationTimeLeft / 60);
  const seconds = pythonExaminationTimeLeft % 60;

  document.getElementById("pythonExaminationTimer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startPythonExaminationTimer() {

  clearInterval(pythonExaminationTimerInterval);

  function updateTimer() {

    pythonExaminationTimeLeft = Math.max(
      0,
      Math.ceil((pythonExaminationEndTime - Date.now()) / 1000)
    );

    updatePythonExaminationTimer();

    if (pythonExaminationUserId) {
      savePythonExaminationProgress(pythonExaminationUserId);
    }

    if (pythonExaminationTimeLeft <= 0) {
      clearInterval(pythonExaminationTimerInterval);
      finishPythonExamination();
    }

  }

  updateTimer();

  if (pythonExaminationTimeLeft > 0) {
    pythonExaminationTimerInterval = setInterval(updateTimer, 1000);
  }

}
// ==========================================
// C PROGRAMMING EXAMINATION TIMER
// ==========================================

function updateCExaminationTimer() {

  const minutes = Math.floor(cExaminationTimeLeft / 60);
  const seconds = cExaminationTimeLeft % 60;

  document.getElementById("cExaminationTimer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startCExaminationTimer() {

  clearInterval(cExaminationTimerInterval);

  function updateTimer() {

    cExaminationTimeLeft = Math.max(
      0,
      Math.ceil((cExaminationEndTime - Date.now()) / 1000)
    );

    updateCExaminationTimer();

    if (cExaminationUserId) {
      saveCExaminationProgress(cExaminationUserId);
    }

    if (cExaminationTimeLeft <= 0) {
      clearInterval(cExaminationTimerInterval);
      finishCExamination();
    }

  }

  updateTimer();

  if (cExaminationTimeLeft > 0) {
    cExaminationTimerInterval = setInterval(updateTimer, 1000);
  }

}
// ==========================================
// DATA STRUCTURES EXAMINATION TIMER
// ==========================================

function updateDataStructuresExaminationTimer() {

  const minutes = Math.floor(dataStructuresExaminationTimeLeft / 60);
  const seconds = dataStructuresExaminationTimeLeft % 60;

  document.getElementById("dataStructuresExaminationTimer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startDataStructuresExaminationTimer() {

  clearInterval(dataStructuresExaminationTimerInterval);

  function updateTimer() {

    dataStructuresExaminationTimeLeft = Math.max(
      0,
      Math.ceil((dataStructuresExaminationEndTime - Date.now()) / 1000)
    );

    updateDataStructuresExaminationTimer();

    if (dataStructuresExaminationUserId) {
      saveDataStructuresExaminationProgress(
        dataStructuresExaminationUserId
      );
    }

    if (dataStructuresExaminationTimeLeft <= 0) {
      clearInterval(dataStructuresExaminationTimerInterval);
      finishDataStructuresExamination();
    }

  }

  updateTimer();

  if (dataStructuresExaminationTimeLeft > 0) {
    dataStructuresExaminationTimerInterval = setInterval(updateTimer, 1000);
  }

}
// ==========================================
// WEB DEVELOPMENT EXAMINATION TIMER
// ==========================================

function updateWebDevelopmentExaminationTimer() {

  const minutes = Math.floor(
    webDevelopmentExaminationTimeLeft / 60
  );

  const seconds = webDevelopmentExaminationTimeLeft % 60;

  document.getElementById(
    "webDevelopmentExaminationTimer"
  ).textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startWebDevelopmentExaminationTimer() {

  clearInterval(webDevelopmentExaminationTimerInterval);

  function updateTimer() {

    webDevelopmentExaminationTimeLeft = Math.max(
      0,
      Math.ceil(
        (webDevelopmentExaminationEndTime - Date.now()) / 1000
      )
    );

    updateWebDevelopmentExaminationTimer();

    if (webDevelopmentExaminationUserId) {
      saveWebDevelopmentExaminationProgress(
        webDevelopmentExaminationUserId
      );
    }

    if (webDevelopmentExaminationTimeLeft <= 0) {
      clearInterval(webDevelopmentExaminationTimerInterval);
      finishWebDevelopmentExamination();
    }

  }

  updateTimer();

  if (webDevelopmentExaminationTimeLeft > 0) {
    webDevelopmentExaminationTimerInterval =
      setInterval(updateTimer, 1000);
  }

}
// Connect Java Submit Examination button
document.getElementById("examinationSubmitBtn")
  .addEventListener("click", () => {
    finishExamination();
  });

// Connect Python Submit Examination button
document.getElementById("pythonExaminationSubmitBtn")
  .addEventListener("click", () => {
    finishPythonExamination();
  });
  // Connect C Submit Examination button
document.getElementById("cExaminationSubmitBtn")
  .addEventListener("click", () => {
    finishCExamination();
  });
  // Connect Data Structures Submit Examination button

document.getElementById("dataStructuresExaminationSubmitBtn")
  .addEventListener("click", () => {
    finishDataStructuresExamination();
  });
  // Connect Web Development Submit Examination button

document.getElementById("webDevelopmentExaminationSubmitBtn")
  .addEventListener("click", () => {
    finishWebDevelopmentExamination();
  });
// START DATA STRUCTURES EXAMINATION

document.getElementById("startDataStructuresExaminationBtn")
  .addEventListener("click", async () => {

    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    dataStructuresExaminationUserId = user.id;
    dataStructuresExaminationSubmitted = false;

    const savedExam = loadDataStructuresExaminationProgress(user.id);

    // Check whether saved examination time has expired
    if (savedExam && savedExam.endTime <= Date.now()) {

      dataStructuresExaminationAnswers = savedExam.answers || {};
      dataStructuresExaminationEndTime = savedExam.endTime;
      dataStructuresExaminationTabSwitchCount = savedExam.tabSwitchCount || 0;
      dataStructuresExaminationTimeLeft = 0;

      alert("Your Data Structures examination time has expired. Your answers will be submitted automatically.");

      await finishDataStructuresExamination();
      return;
    }

    // Check examination eligibility for a new attempt
    if (!savedExam) {

      const { count: eligibleQuizCount, error: eligibilityError } =
        await supabaseClient
          .from("quiz_results")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("total_questions", 5)
          .gte("score", 3);

      if (eligibilityError) {
        console.error(eligibilityError);
        alert("Unable to check examination eligibility.");
        return;
      }

      if (eligibleQuizCount < 10) {
        alert(
          `You have completed ${eligibleQuizCount} qualifying quizzes out of 10.\n\nYou need at least 10 quizzes with a score of 3/5 or above.`
        );
        return;
      }
    }

    // Restore previous examination
    if (savedExam) {

      dataStructuresExaminationAnswers = savedExam.answers || {};
      dataStructuresExaminationEndTime = savedExam.endTime;
      dataStructuresExaminationTabSwitchCount = savedExam.tabSwitchCount || 0;

      dataStructuresExaminationTimeLeft = Math.ceil(
        (dataStructuresExaminationEndTime - Date.now()) / 1000
      );

      alert("Your previous Data Structures examination has been restored!");

    } else {

      // Start a new examination
      dataStructuresExaminationAnswers = {};
      dataStructuresExaminationTabSwitchCount = 0;
      dataStructuresExaminationTimeLeft = 60 * 60;

      dataStructuresExaminationEndTime = Date.now() + (60 * 60 * 1000);

      saveDataStructuresExaminationProgress(user.id);
    }

    document.getElementById("examinationSection").hidden = true;

    document.getElementById(
      "dataStructuresExaminationQuizSection"
    ).hidden = false;

    try {
      displayAllDataStructuresExaminationQuestions();
    } catch (error) {
      alert("Data Structures Examination Error: " + error.message);
      console.error(error);
      return;
    }

    startDataStructuresExaminationTimer();

    document.getElementById(
      "dataStructuresExaminationQuizSection"
    ).scrollIntoView({ behavior: "smooth" });

  });
// START WEB DEVELOPMENT EXAMINATION

document.getElementById("startWebDevelopmentExaminationBtn")
  .addEventListener("click", async () => {

    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    webDevelopmentExaminationUserId = user.id;
    webDevelopmentExaminationSubmitted = false;

    const savedExam = loadWebDevelopmentExaminationProgress(user.id);

    // Check whether saved examination time has expired
    if (savedExam && savedExam.endTime <= Date.now()) {

      webDevelopmentExaminationAnswers = savedExam.answers || {};
      webDevelopmentExaminationEndTime = savedExam.endTime;
      webDevelopmentExaminationTabSwitchCount = savedExam.tabSwitchCount || 0;
      webDevelopmentExaminationTimeLeft = 0;

      alert("Your Web Development examination time has expired. Your answers will be submitted automatically.");

      await finishWebDevelopmentExamination();
      return;
    }

    // Check examination eligibility for a new attempt
    if (!savedExam) {

      const { count: eligibleQuizCount, error: eligibilityError } =
        await supabaseClient
          .from("quiz_results")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("total_questions", 5)
          .gte("score", 3);

      if (eligibilityError) {
        console.error(eligibilityError);
        alert("Unable to check examination eligibility.");
        return;
      }

      if (eligibleQuizCount < 10) {
        alert(
          `You have completed ${eligibleQuizCount} qualifying quizzes out of 10.\n\nYou need at least 10 quizzes with a score of 3/5 or above.`
        );
        return;
      }
    }

    // Restore previous examination
    if (savedExam) {

      webDevelopmentExaminationAnswers = savedExam.answers || {};
      webDevelopmentExaminationEndTime = savedExam.endTime;
      webDevelopmentExaminationTabSwitchCount = savedExam.tabSwitchCount || 0;

      webDevelopmentExaminationTimeLeft = Math.ceil(
        (webDevelopmentExaminationEndTime - Date.now()) / 1000
      );

      alert("Your previous Web Development examination has been restored!");

    } else {

      // Start a new examination
      webDevelopmentExaminationAnswers = {};
      webDevelopmentExaminationTabSwitchCount = 0;
      webDevelopmentExaminationTimeLeft = 60 * 60;

      webDevelopmentExaminationEndTime = Date.now() + (60 * 60 * 1000);

      saveWebDevelopmentExaminationProgress(user.id);
    }

    document.getElementById("examinationSection").hidden = true;

    document.getElementById(
      "webDevelopmentExaminationQuizSection"
    ).hidden = false;

    try {
      displayAllWebDevelopmentExaminationQuestions();
    } catch (error) {
      alert("Web Development Examination Error: " + error.message);
      console.error(error);
      return;
    }

    startWebDevelopmentExaminationTimer();

    document.getElementById(
      "webDevelopmentExaminationQuizSection"
    ).scrollIntoView({ behavior: "smooth" });

  });
// ==========================================
// FINISH JAVA EXAMINATION
// ==========================================

async function finishExamination() {

  if (examinationSubmitted) return;

  examinationSubmitted = true;

  const { data: { user } } = await supabaseClient.auth.getUser();

  clearInterval(examinationTimerInterval);

 const totalQuestions = javaExaminationQuestions.length;

let score = 0;

javaExaminationQuestions.forEach((question, index) => {
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
// ==========================================
// PYTHON EXAMINATION - REVIEW ANSWERS
// ==========================================

function displayPythonReviewAnswers() {

  const resultContainer = document.getElementById(
    "pythonExaminationResult"
  );

  document.getElementById("pythonReviewAnswersContainer")?.remove();

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  pythonExaminationQuestions.forEach((question, index) => {

    if (pythonExaminationAnswers[index] === undefined) {
      unansweredQuestions++;
    } else if (
      pythonExaminationAnswers[index] === question.answer
    ) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

  });

  const performancePercentage = Math.round(
    (correctAnswers / pythonExaminationQuestions.length) * 100
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
  reviewContainer.id = "pythonReviewAnswersContainer";

  reviewContainer.innerHTML = "<h2>📋 Review Your Python Answers</h2>";

  // PERFORMANCE ANALYTICS

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

  // DISPLAY ALL QUESTIONS AND ANSWERS

  pythonExaminationQuestions.forEach((question, qIndex) => {

    const card = document.createElement("div");
    card.className = "question-card";

    const heading = document.createElement("h3");

    heading.textContent =
      `Question ${qIndex + 1}. ${question.question}`;

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
        pythonExaminationAnswers[qIndex] === optionIndex &&
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
// FINISH PYTHON EXAMINATION
// ==========================================

async function finishPythonExamination() {

  if (pythonExaminationSubmitted) return;

  pythonExaminationSubmitted = true;

  clearInterval(pythonExaminationTimerInterval);

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    alert("Please log in again.");
    pythonExaminationSubmitted = false;
    return;
  }

  const totalQuestions = pythonExaminationQuestions.length;

  let score = 0;

  pythonExaminationQuestions.forEach((question, index) => {

    if (pythonExaminationAnswers[index] === question.answer) {
      score++;
    }

  });

  const wrongAnswers = totalQuestions - score;

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  // SAVE EXAMINATION RESULT

  const { error: resultError } = await supabaseClient
    .from("quiz_results")
    .insert({
      user_id: user.id,
      quiz_name: "Python Programming Examination",
      score: score,
      total_questions: totalQuestions,
      percentage: percentage
    });

  if (resultError) {

    console.error("Python result saving error:", resultError);

    alert("Unable to save your examination result. Please try again.");

    pythonExaminationSubmitted = false;
    return;

  }

  localStorage.removeItem(`pythonExam_${user.id}`);

  // CERTIFICATE GENERATION

  let certificateAwarded = false;

  if (score >= 45) {

    const studentName =
      user.user_metadata?.full_name || user.email;

    const { data: existingCertificate, error: certificateFetchError } =
      await supabaseClient
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .eq("exam_name", "Python Programming Examination")
        .maybeSingle();

    if (certificateFetchError) {

      console.error("Certificate lookup error:", certificateFetchError);

    } else if (
      !existingCertificate ||
      score > existingCertificate.score
    ) {

      const certificateData = {
        user_id: user.id,
        student_name: studentName,
        exam_name: "Python Programming Examination",
        score: score,
        total_questions: totalQuestions,
        percentage: percentage
      };

      let certificateError;

if (existingCertificate) {

  console.log("Existing certificate:", existingCertificate);

  const { error } = await supabaseClient
    .from("certificates")
    .update(certificateData)
    .eq("certificate_id", existingCertificate.certificate_id);

  console.log("Certificate update response:", error);
  console.log("Updated certificate data:", certificateData);

  certificateError = error;

} else {

  const { error } = await supabaseClient
    .from("certificates")
    .insert(certificateData);

  console.log("Certificate insert response:", error);

  certificateError = error;

}

if (certificateError) {

  console.error("Certificate creation error:", certificateError);

} else {

  certificateAwarded = true;

}

} else {

  certificateAwarded = true;

}
  // DISPLAY EXAMINATION RESULT

  const resultContainer = document.getElementById(
    "pythonExaminationResult"
  );

  document.getElementById(
    "pythonExaminationQuestionsContainer"
  ).hidden = true;

  document.getElementById(
    "pythonExaminationTimer"
  ).closest(".timer-box").hidden = true;

  document.getElementById(
    "pythonExaminationSubmitBtn"
  ).hidden = true;

  resultContainer.hidden = false;

  resultContainer.innerHTML = `

    <div class="result-card">

      <h2>🎉 Python Examination Completed!</h2>

      <h1>${score} / ${totalQuestions}</h1>

      <h2>${percentage}%</h2>

      <p>Correct Answers: ${score}</p>

      <p>Incorrect / Unanswered: ${wrongAnswers}</p>

      <h3>
        ${
          percentage >= 90
            ? "Excellent Performance! 🏆"
            : percentage >= 75
            ? "Very Good! 🌟"
            : percentage >= 50
            ? "Good Effort! 👍"
            : "Keep Practising! 📚"
        }
      </h3>

      ${
        score >= 45
          ? "<h2>🏆 Congratulations! You qualified for a certificate.</h2>"
          : "<p>You need at least 45/50 marks to earn a certificate.</p>"
      }

      ${
        certificateAwarded
          ? '<button class="primary-btn" id="pythonViewCertificateBtn">View My Certificate</button>'
          : ""
      }

      <button class="secondary-btn" id="pythonReviewAnswersBtn">
        Review Answers
      </button>

    </div>

  `;

  // VIEW CERTIFICATE

  document.getElementById("pythonViewCertificateBtn")
    ?.addEventListener("click", () => {

      document.getElementById(
        "pythonExaminationQuizSection"
      ).hidden = true;

      document.getElementById("myCertificateBtn")?.click();

    });

  // REVIEW ANSWERS

  document.getElementById("pythonReviewAnswersBtn")
    .addEventListener("click", () => {

      displayPythonReviewAnswers();

      document.getElementById(
        "pythonReviewAnswersBtn"
      ).hidden = true;

    });

}
// ==========================================
// C EXAMINATION - REVIEW ANSWERS
// ==========================================

function displayCReviewAnswers() {

  const resultContainer = document.getElementById(
    "cExaminationResult"
  );

  document.getElementById("cReviewAnswersContainer")?.remove();

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  cExaminationQuestions.forEach((question, index) => {

    if (cExaminationAnswers[index] === undefined) {
      unansweredQuestions++;
    } else if (
      cExaminationAnswers[index] === question.answer
    ) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

  });

  const performancePercentage = Math.round(
    (correctAnswers / cExaminationQuestions.length) * 100
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
  reviewContainer.id = "cReviewAnswersContainer";

  reviewContainer.innerHTML =
    "<h2>📋 Review Your C Programming Answers</h2>";

  // PERFORMANCE ANALYTICS

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

  // DISPLAY ALL QUESTIONS AND ANSWERS

  cExaminationQuestions.forEach((question, qIndex) => {

    const card = document.createElement("div");
    card.className = "question-card";

    const heading = document.createElement("h3");

    heading.textContent =
      `Question ${qIndex + 1}. ${question.question}`;

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
        cExaminationAnswers[qIndex] === optionIndex &&
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
// DATA STRUCTURES EXAMINATION - REVIEW ANSWERS
// ==========================================

function displayDataStructuresReviewAnswers() {

  const resultContainer = document.getElementById(
    "dataStructuresExaminationResult"
  );

  document.getElementById(
    "dataStructuresReviewAnswersContainer"
  )?.remove();

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  dataStructuresExaminationQuestions.forEach((question, index) => {

    if (dataStructuresExaminationAnswers[index] === undefined) {
      unansweredQuestions++;
    } else if (
      dataStructuresExaminationAnswers[index] === question.answer
    ) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

  });

  const performancePercentage = Math.round(
    (correctAnswers / dataStructuresExaminationQuestions.length) * 100
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
  reviewContainer.id = "dataStructuresReviewAnswersContainer";

  reviewContainer.innerHTML =
    "<h2>📋 Review Your Data Structures Answers</h2>";

  // PERFORMANCE ANALYTICS

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

  // DISPLAY ALL QUESTIONS AND ANSWERS

  dataStructuresExaminationQuestions.forEach((question, qIndex) => {

    const card = document.createElement("div");
    card.className = "question-card";

    const heading = document.createElement("h3");

    heading.textContent =
      `Question ${qIndex + 1}. ${question.question}`;

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
        dataStructuresExaminationAnswers[qIndex] === optionIndex &&
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
// WEB DEVELOPMENT EXAMINATION - REVIEW ANSWERS
// ==========================================

function displayWebDevelopmentReviewAnswers() {

  const resultContainer = document.getElementById(
    "webDevelopmentExaminationResult"
  );

  document.getElementById(
    "webDevelopmentReviewAnswersContainer"
  )?.remove();

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  webDevelopmentExaminationQuestions.forEach((question, index) => {

    if (webDevelopmentExaminationAnswers[index] === undefined) {
      unansweredQuestions++;
    } else if (
      webDevelopmentExaminationAnswers[index] === question.answer
    ) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

  });

  const performancePercentage = Math.round(
    (correctAnswers / webDevelopmentExaminationQuestions.length) * 100
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
  reviewContainer.id = "webDevelopmentReviewAnswersContainer";

  reviewContainer.innerHTML =
    "<h2>📋 Review Your Web Development Answers</h2>";

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

  webDevelopmentExaminationQuestions.forEach((question, qIndex) => {

    const card = document.createElement("div");
    card.className = "question-card";

    const heading = document.createElement("h3");

    heading.textContent =
      `Question ${qIndex + 1}. ${question.question}`;

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
        webDevelopmentExaminationAnswers[qIndex] === optionIndex &&
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
// FINISH C PROGRAMMING EXAMINATION
// ==========================================

async function finishCExamination() {

  if (cExaminationSubmitted) return;

  cExaminationSubmitted = true;

  clearInterval(cExaminationTimerInterval);

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    alert("Please log in again.");
    cExaminationSubmitted = false;
    return;
  }

  const totalQuestions = cExaminationQuestions.length;

  let score = 0;

  cExaminationQuestions.forEach((question, index) => {

    if (cExaminationAnswers[index] === question.answer) {
      score++;
    }

  });

  const wrongAnswers = totalQuestions - score;

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  // SAVE EXAMINATION RESULT

  const { error: resultError } = await supabaseClient
    .from("quiz_results")
    .insert({
      user_id: user.id,
      quiz_name: "C Programming Examination",
      score: score,
      total_questions: totalQuestions,
      percentage: percentage
    });

  if (resultError) {

    console.error("C result saving error:", resultError);

    alert("Unable to save your examination result. Please try again.");

    cExaminationSubmitted = false;
    return;

  }

  localStorage.removeItem(`cExam_${user.id}`);

  // CERTIFICATE GENERATION

  let certificateAwarded = false;

  if (score >= 45) {

    const studentName =
      user.user_metadata?.full_name || user.email;

    const { data: existingCertificate, error: certificateFetchError } =
      await supabaseClient
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .eq("exam_name", "C Programming Examination")
        .maybeSingle();

    if (certificateFetchError) {

      console.error("Certificate lookup error:", certificateFetchError);

    } else if (
      !existingCertificate ||
      score > existingCertificate.score
    ) {

      const certificateData = {
        user_id: user.id,
        student_name: studentName,
        exam_name: "C Programming Examination",
        score: score,
        total_questions: totalQuestions,
        percentage: percentage
      };

      let certificateError;

      if (existingCertificate) {

        const { error } = await supabaseClient
          .from("certificates")
          .update(certificateData)
          .eq("certificate_id", existingCertificate.certificate_id);

        certificateError = error;

      } else {

        const { error } = await supabaseClient
          .from("certificates")
          .insert(certificateData);

        certificateError = error;

      }

      if (certificateError) {

        console.error("C certificate creation error:", certificateError);

      } else {

        certificateAwarded = true;

      }

    } else {

      certificateAwarded = true;

    }

  }

  // DISPLAY EXAMINATION RESULT

  const resultContainer = document.getElementById(
    "cExaminationResult"
  );

  document.getElementById(
    "cExaminationQuestionsContainer"
  ).hidden = true;

  document.getElementById(
    "cExaminationTimer"
  ).closest(".timer-box").hidden = true;

  document.getElementById(
    "cExaminationSubmitBtn"
  ).hidden = true;

  resultContainer.hidden = false;

  resultContainer.innerHTML = `

    <div class="result-card">

      <h2>🎉 C Programming Examination Completed!</h2>

      <h1>${score} / ${totalQuestions}</h1>

      <h2>${percentage}%</h2>

      <p>Correct Answers: ${score}</p>

      <p>Incorrect / Unanswered: ${wrongAnswers}</p>

      <h3>
        ${
          percentage >= 90
            ? "Excellent Performance! 🏆"
            : percentage >= 75
            ? "Very Good! 🌟"
            : percentage >= 50
            ? "Good Effort! 👍"
            : "Keep Practising! 📚"
        }
      </h3>

      ${
        score >= 45
          ? "<h2>🏆 Congratulations! You qualified for a certificate.</h2>"
          : "<p>You need at least 45/50 marks to earn a certificate.</p>"
      }

      ${
        certificateAwarded
          ? '<button class="primary-btn" id="cViewCertificateBtn">View My Certificate</button>'
          : ""
      }

      <button class="secondary-btn" id="cReviewAnswersBtn">
        Review Answers
      </button>

    </div>

  `;
    }
  // VIEW CERTIFICATE

  document.getElementById("cViewCertificateBtn")
    ?.addEventListener("click", () => {

      document.getElementById(
        "cExaminationQuizSection"
      ).hidden = true;

      document.getElementById("myCertificateBtn")?.click();

    });

  // REVIEW ANSWERS

  document.getElementById("cReviewAnswersBtn")
    .addEventListener("click", () => {

      displayCReviewAnswers();

      document.getElementById(
        "cReviewAnswersBtn"
      ).hidden = true;

    });

}
// ==========================================
// FINISH DATA STRUCTURES EXAMINATION
// ==========================================

async function finishDataStructuresExamination() {

  if (dataStructuresExaminationSubmitted) return;

  dataStructuresExaminationSubmitted = true;

  clearInterval(dataStructuresExaminationTimerInterval);

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    alert("Please log in again.");
    dataStructuresExaminationSubmitted = false;
    return;
  }

  const totalQuestions = dataStructuresExaminationQuestions.length;

  let score = 0;

  dataStructuresExaminationQuestions.forEach((question, index) => {

    if (dataStructuresExaminationAnswers[index] === question.answer) {
      score++;
    }

  });

  const wrongAnswers = totalQuestions - score;

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  // SAVE EXAMINATION RESULT

  const { error: resultError } = await supabaseClient
    .from("quiz_results")
    .insert({
      user_id: user.id,
      quiz_name: "Data Structures Examination",
      score: score,
      total_questions: totalQuestions,
      percentage: percentage
    });

  if (resultError) {

    console.error("Data Structures result saving error:", resultError);

    alert("Unable to save your examination result. Please try again.");

    dataStructuresExaminationSubmitted = false;
    return;

  }

  localStorage.removeItem(`dataStructuresExam_${user.id}`);

  // CERTIFICATE GENERATION

  let certificateAwarded = false;

  if (score >= 45) {

    const studentName =
      user.user_metadata?.full_name || user.email;

    const { data: existingCertificate, error: certificateFetchError } =
      await supabaseClient
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .eq("exam_name", "Data Structures Examination")
        .maybeSingle();

    if (certificateFetchError) {

      console.error("Certificate lookup error:", certificateFetchError);

    } else if (
      !existingCertificate ||
      score > existingCertificate.score
    ) {

      const certificateData = {
        user_id: user.id,
        student_name: studentName,
        exam_name: "Data Structures Examination",
        score: score,
        total_questions: totalQuestions,
        percentage: percentage
      };

      let certificateError;

      if (existingCertificate) {

        const { error } = await supabaseClient
          .from("certificates")
          .update(certificateData)
          .eq("certificate_id", existingCertificate.certificate_id);

        certificateError = error;

      } else {

        const { error } = await supabaseClient
          .from("certificates")
          .insert(certificateData);

        certificateError = error;

      }

      if (certificateError) {

        console.error("Data Structures certificate creation error:", certificateError);

      } else {

        certificateAwarded = true;

      }

    } else {

      certificateAwarded = true;

    }

  }

  // DISPLAY EXAMINATION RESULT

  const resultContainer = document.getElementById(
    "dataStructuresExaminationResult"
  );

  document.getElementById(
    "dataStructuresExaminationQuestionsContainer"
  ).hidden = true;

  document.getElementById(
    "dataStructuresExaminationTimer"
  ).closest(".timer-box").hidden = true;

  document.getElementById(
    "dataStructuresExaminationSubmitBtn"
  ).hidden = true;

  resultContainer.hidden = false;

  resultContainer.innerHTML = `

    <div class="result-card">

      <h2>🎉 Data Structures Examination Completed!</h2>

      <h1>${score} / ${totalQuestions}</h1>

      <h2>${percentage}%</h2>

      <p>Correct Answers: ${score}</p>

      <p>Incorrect / Unanswered: ${wrongAnswers}</p>

      <h3>
        ${
          percentage >= 90
            ? "Excellent Performance! 🏆"
            : percentage >= 75
            ? "Very Good! 🌟"
            : percentage >= 50
            ? "Good Effort! 👍"
            : "Keep Practising! 📚"
        }
      </h3>

      ${
        score >= 45
          ? "<h2>🏆 Congratulations! You qualified for a certificate.</h2>"
          : "<p>You need at least 45/50 marks to earn a certificate.</p>"
      }

      ${
        certificateAwarded
          ? '<button class="primary-btn" id="dataStructuresViewCertificateBtn">View My Certificate</button>'
          : ""
      }

      <button class="secondary-btn" id="dataStructuresReviewAnswersBtn">
        Review Answers
      </button>

    </div>

  `;

  // VIEW CERTIFICATE

  document.getElementById("dataStructuresViewCertificateBtn")
    ?.addEventListener("click", () => {

      document.getElementById(
        "dataStructuresExaminationQuizSection"
      ).hidden = true;

      document.getElementById("myCertificateBtn")?.click();

    });

  // REVIEW ANSWERS

  document.getElementById("dataStructuresReviewAnswersBtn")
    .addEventListener("click", () => {

      displayDataStructuresReviewAnswers();

      document.getElementById(
        "dataStructuresReviewAnswersBtn"
      ).hidden = true;

    });

}
// ==========================================
// FINISH WEB DEVELOPMENT EXAMINATION
// ==========================================

async function finishWebDevelopmentExamination() {

  if (webDevelopmentExaminationSubmitted) return;

  webDevelopmentExaminationSubmitted = true;

  clearInterval(webDevelopmentExaminationTimerInterval);

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    alert("Please log in again.");
    webDevelopmentExaminationSubmitted = false;
    return;
  }

  const totalQuestions = webDevelopmentExaminationQuestions.length;

  let score = 0;

  webDevelopmentExaminationQuestions.forEach((question, index) => {

    if (webDevelopmentExaminationAnswers[index] === question.answer) {
      score++;
    }

  });

  const wrongAnswers = totalQuestions - score;

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  // SAVE EXAMINATION RESULT

  const { error: resultError } = await supabaseClient
    .from("quiz_results")
    .insert({
      user_id: user.id,
      quiz_name: "Web Development Examination",
      score: score,
      total_questions: totalQuestions,
      percentage: percentage
    });

  if (resultError) {

    console.error("Web Development result saving error:", resultError);

    alert("Unable to save your examination result. Please try again.");

    webDevelopmentExaminationSubmitted = false;
    return;

  }

  localStorage.removeItem(`webDevelopmentExam_${user.id}`);

  // CERTIFICATE GENERATION

let certificateAwarded = false;

if (score >= 45) {

  const studentName =
    user.user_metadata?.full_name || user.email;

  const { data: existingCertificate, error: certificateFetchError } =
    await supabaseClient
      .from("certificates")
      .select("*")
      .eq("user_id", user.id)
      .eq("exam_name", "Web Development Examination")
      .maybeSingle();

  if (certificateFetchError) {

    console.error(
      "Web Development certificate lookup error:",
      certificateFetchError
    );

  } else if (
    !existingCertificate ||
    percentage > Number(existingCertificate.percentage) ||
    (
      percentage === Number(existingCertificate.percentage) &&
      score > Number(existingCertificate.score)
    )
  ) {

    const certificateData = {
      user_id: user.id,
      student_name: studentName,
      exam_name: "Web Development Examination",
      score: score,
      total_questions: totalQuestions,
      percentage: percentage
    };

    let certificateError;

    if (existingCertificate) {

      console.log("Existing Web Development certificate:", existingCertificate);

const { data: updatedCertificate, error } = await supabaseClient
  .from("certificates")
  .update(certificateData)
  .eq("certificate_id", existingCertificate.certificate_id)
  .select();

console.log("Existing certificate:", existingCertificate);
console.log("New certificate data:", certificateData);
console.log("Updated certificate rows:", updatedCertificate);
console.log("Certificate update error:", error);

certificateError = error;

    } else {

      const { error } = await supabaseClient
        .from("certificates")
        .insert(certificateData);

      certificateError = error;

    }

    if (certificateError) {

      console.error(
        "Web Development certificate save error:",
        certificateError
      );

    } else {

      certificateAwarded = true;

    }

  } else {

    certificateAwarded = true;

  }

}
  // DISPLAY EXAMINATION RESULT

  const resultContainer = document.getElementById(
    "webDevelopmentExaminationResult"
  );

  document.getElementById(
    "webDevelopmentExaminationQuestionsContainer"
  ).hidden = true;

  document.getElementById(
    "webDevelopmentExaminationTimer"
  ).closest(".timer-box").hidden = true;

  document.getElementById(
    "webDevelopmentExaminationSubmitBtn"
  ).hidden = true;

  resultContainer.hidden = false;

  resultContainer.innerHTML = `

    <div class="result-card">

      <h2>🎉 Web Development Examination Completed!</h2>

      <h1>${score} / ${totalQuestions}</h1>

      <h2>${percentage}%</h2>

      <p>Correct Answers: ${score}</p>

      <p>Incorrect / Unanswered: ${wrongAnswers}</p>

      <h3>
        ${
          percentage >= 90
            ? "Excellent Performance! 🏆"
            : percentage >= 75
            ? "Very Good! 🌟"
            : percentage >= 50
            ? "Good Effort! 👍"
            : "Keep Practising! 📚"
        }
      </h3>

      ${
        score >= 45
          ? "<h2>🏆 Congratulations! You qualified for a certificate.</h2>"
          : "<p>You need at least 45/50 marks to earn a certificate.</p>"
      }

      ${
        certificateAwarded
          ? '<button class="primary-btn" id="webDevelopmentViewCertificateBtn">View My Certificate</button>'
          : ""
      }

      <button class="secondary-btn" id="webDevelopmentReviewAnswersBtn">
        Review Answers
      </button>

    </div>

  `;

  // VIEW CERTIFICATE

  document.getElementById("webDevelopmentViewCertificateBtn")
    ?.addEventListener("click", () => {

      document.getElementById(
        "webDevelopmentExaminationQuizSection"
      ).hidden = true;

      document.getElementById("myCertificateBtn")?.click();

    });

  // REVIEW ANSWERS

  document.getElementById("webDevelopmentReviewAnswersBtn")
    .addEventListener("click", () => {

      displayWebDevelopmentReviewAnswers();

      document.getElementById(
        "webDevelopmentReviewAnswersBtn"
      ).hidden = true;

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
// Exit C Programming Examination
document.getElementById("cExitExaminationBtn").addEventListener("click", () => {

  document.getElementById("cExaminationQuizSection").hidden = true;
  document.getElementById("examinationSection").hidden = false;

  document.getElementById("examinationSection").scrollIntoView({
    behavior: "smooth"
  });

});
// Exit Data Structures Examination
document.getElementById("dataStructuresExitExaminationBtn")
  .addEventListener("click", () => {

    document.getElementById(
      "dataStructuresExaminationQuizSection"
    ).hidden = true;

    document.getElementById("examinationSection").hidden = false;

    document.getElementById("examinationSection").scrollIntoView({
      behavior: "smooth"
    });

});
// Exit Web Development Examination

document.getElementById("webDevelopmentExitExaminationBtn")
  .addEventListener("click", () => {

    document.getElementById(
      "webDevelopmentExaminationQuizSection"
    ).hidden = true;

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
// Back to Home from Placement Hub
document.getElementById("backFromPlacementHub").addEventListener("click", () => {

  document.getElementById("placementHubSection").hidden = true;

  welcomeSection.hidden = false;
  statsSection.hidden = false;
  homeQuizSection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

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

// Keep existing JavaScript progress restoration working
async function loadJavaScriptProgress(userId) {

  const data = await loadLearningProgress(userId, "JavaScript");

  unlockedJavaScriptLevel = data
    ? data.unlocked_level
    : 1;
}
// Check whether the user is already logged in
async function checkLoginSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        authSection.hidden = true;
        document.querySelector("main").hidden = false;

        const user = session.user;

        // Restore learning progress for all subjects
        const subjects = [
            "JavaScript",
            "Database",
            "Python",
            "C",
            "Data Structures",
            "Web Development"
        ];

       for (const subject of subjects) {
    const progress = await loadLearningProgress(user.id, subject);

    unlockedLevels[subject] = progress
    ? progress.unlocked_level
    : 1;
console.log(
    `${subject} unlocked level:`,
    unlockedLevels[subject]
);
}
// Restore C Job-Ready progress
await restoreCJobProgress();

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
// QUIZCONNECT - DATA STRUCTURES LEARNING SYSTEM
// PART 1: ALL 10 LEARNING LEVELS
// ==========================================

const dataStructuresLevels = [

  {
    title: "Introduction to Data Structures",
    difficulty: "Beginner",
    content: `
      <h3>What are Data Structures?</h3>
      <p>Data structures are ways of organizing and storing data so it can be accessed and modified efficiently.</p>

      <h3>Why are they important?</h3>
      <ul>
        <li>Organize large amounts of data</li>
        <li>Improve program efficiency</li>
        <li>Make searching and sorting easier</li>
      </ul>

      <h3>Types of Data Structures</h3>
      <ul>
        <li>Linear: Arrays, Linked Lists, Stacks and Queues</li>
        <li>Non-linear: Trees and Graphs</li>
      </ul>

      <h3>Example</h3>
      <pre><code>int marks[5] = {80, 85, 90, 75, 95};</code></pre>
      <p>This array stores five student marks.</p>
    `
  },

  {
    title: "Arrays",
    difficulty: "Beginner",
    content: `
      <h3>What are Arrays?</h3>
      <p>An array stores multiple elements of the same data type in consecutive memory locations.</p>

      <h3>Creating an Array in C</h3>
      <pre><code>int numbers[5] = {10, 20, 30, 40, 50};</code></pre>

      <h3>Accessing Elements</h3>
      <pre><code>printf("%d", numbers[0]);</code></pre>
      <p>Array indexing starts from 0.</p>

      <h3>Common Operations</h3>
      <ul>
        <li>Traversal</li>
        <li>Insertion</li>
        <li>Deletion</li>
        <li>Searching</li>
        <li>Updating</li>
      </ul>
    `
  },

  {
    title: "Linked Lists",
    difficulty: "Beginner",
    content: `
      <h3>What is a Linked List?</h3>
      <p>A linked list is a linear data structure consisting of nodes. Each node stores data and a link to another node.</p>

      <h3>Node Structure in C</h3>
      <pre><code>struct Node {
    int data;
    struct Node *next;
};</code></pre>

      <h3>Types of Linked Lists</h3>
      <ul>
        <li>Singly Linked List</li>
        <li>Doubly Linked List</li>
        <li>Circular Linked List</li>
      </ul>

      <h3>Advantages</h3>
      <p>Linked lists allow dynamic memory allocation and flexible insertion and deletion.</p>
    `
  },

  {
    title: "Stacks",
    difficulty: "Easy",
    content: `
      <h3>What is a Stack?</h3>
      <p>A stack is a linear data structure that follows LIFO (Last In, First Out).</p>

      <h3>Stack Operations</h3>
      <ul>
        <li>Push - Adds an element</li>
        <li>Pop - Removes the top element</li>
        <li>Peek - Displays the top element</li>
      </ul>

      <h3>Example</h3>
      <pre><code>int stack[5];
int top = -1;

top++;
stack[top] = 10;</code></pre>

      <h3>Applications</h3>
      <ul>
        <li>Undo operations</li>
        <li>Function calls</li>
        <li>Expression evaluation</li>
      </ul>
    `
  },

  {
    title: "Queues",
    difficulty: "Easy",
    content: `
      <h3>What is a Queue?</h3>
      <p>A queue is a linear data structure that follows FIFO (First In, First Out).</p>

      <h3>Queue Operations</h3>
      <ul>
        <li>Enqueue - Inserts an element</li>
        <li>Dequeue - Removes an element</li>
        <li>Front - Returns the first element</li>
        <li>Rear - Returns the last element</li>
      </ul>

      <h3>Types of Queues</h3>
      <ul>
        <li>Simple Queue</li>
        <li>Circular Queue</li>
        <li>Priority Queue</li>
        <li>Double Ended Queue</li>
      </ul>

      <h3>Applications</h3>
      <p>CPU scheduling, printer scheduling and task management.</p>
    `
  },

  {
    title: "Searching Algorithms",
    difficulty: "Intermediate",
    content: `
      <h3>What is Searching?</h3>
      <p>Searching is the process of finding a particular element in a collection of data.</p>

      <h3>Linear Search</h3>
      <p>Checks each element one by one.</p>

      <pre><code>for (int i = 0; i < n; i++) {
    if (arr[i] == key) {
        printf("Found");
        break;
    }
}</code></pre>

      <h3>Binary Search</h3>
      <p>Repeatedly divides a sorted array into two halves.</p>

      <h3>Time Complexity</h3>
      <ul>
        <li>Linear Search: O(n)</li>
        <li>Binary Search: O(log n)</li>
      </ul>
    `
  },

  {
    title: "Sorting Algorithms",
    difficulty: "Intermediate",
    content: `
      <h3>What is Sorting?</h3>
      <p>Sorting arranges data in ascending or descending order.</p>

      <h3>Common Sorting Algorithms</h3>
      <ul>
        <li>Bubble Sort</li>
        <li>Selection Sort</li>
        <li>Insertion Sort</li>
        <li>Merge Sort</li>
        <li>Quick Sort</li>
      </ul>

      <h3>Bubble Sort Example</h3>
      <pre><code>for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}</code></pre>

      <p>Bubble Sort repeatedly compares adjacent elements and swaps them when necessary.</p>
    `
  },

  {
    title: "Trees",
    difficulty: "Advanced",
    content: `
      <h3>What is a Tree?</h3>
      <p>A tree is a non-linear hierarchical data structure consisting of nodes connected by edges.</p>

      <h3>Important Terms</h3>
      <ul>
        <li>Root - Topmost node</li>
        <li>Parent - Node with children</li>
        <li>Child - Node connected below a parent</li>
        <li>Leaf - Node without children</li>
        <li>Height - Longest path from root to a leaf</li>
      </ul>

      <h3>Types of Trees</h3>
      <ul>
        <li>Binary Tree</li>
        <li>Binary Search Tree</li>
        <li>AVL Tree</li>
        <li>Heap</li>
      </ul>

      <h3>Tree Traversals</h3>
      <p>Preorder, Inorder and Postorder are common tree traversal methods.</p>
    `
  },

  {
    title: "Graphs",
    difficulty: "Advanced",
    content: `
      <h3>What is a Graph?</h3>
      <p>A graph is a non-linear data structure made up of vertices (nodes) and edges (connections).</p>

      <h3>Types of Graphs</h3>
      <ul>
        <li>Directed Graph</li>
        <li>Undirected Graph</li>
        <li>Weighted Graph</li>
        <li>Unweighted Graph</li>
      </ul>

      <h3>Graph Representation</h3>
      <ul>
        <li>Adjacency Matrix</li>
        <li>Adjacency List</li>
      </ul>

      <h3>Graph Traversal</h3>
      <ul>
        <li>BFS - Breadth First Search</li>
        <li>DFS - Depth First Search</li>
      </ul>

      <h3>Applications</h3>
      <p>Social networks, navigation systems and computer networks.</p>
    `
  },

  {
    title: "Hashing and Applications",
    difficulty: "Expert",
    content: `
      <h3>What is Hashing?</h3>
      <p>Hashing is a technique that converts a key into an index using a hash function.</p>

      <h3>Hash Table</h3>
      <p>A hash table stores data using key-value pairs for efficient searching and retrieval.</p>

      <h3>Collision</h3>
      <p>A collision occurs when two different keys produce the same hash index.</p>

      <h3>Collision Resolution Techniques</h3>
      <ul>
        <li>Separate Chaining</li>
        <li>Linear Probing</li>
        <li>Quadratic Probing</li>
        <li>Double Hashing</li>
      </ul>

      <h3>Applications</h3>
      <ul>
        <li>Database indexing</li>
        <li>Password storage</li>
        <li>Caching</li>
        <li>Fast data retrieval</li>
      </ul>
    `
  }

];

console.log("Data Structures levels:", dataStructuresLevels.length);
// ==========================================
// QUIZCONNECT - PYTHON LEARNING SYSTEM
// PART 1: ALL 10 LEARNING LEVELS
// ==========================================

const pythonLevels = [
  {
    title: "Introduction to Python",
    difficulty: "Beginner",
    content: `
      <h3>What is Python?</h3>
      <p>Python is a high-level, interpreted programming language known for its simple syntax.</p>

      <h3>Where is Python Used?</h3>
      <ul>
        <li>Web development</li>
        <li>Artificial Intelligence</li>
        <li>Data Science</li>
        <li>Automation</li>
      </ul>

      <h3>First Python Program</h3>
      <pre><code>print("Hello, World!")</code></pre>
    `
  },

  {
    title: "Variables and Data Types",
    difficulty: "Beginner",
    content: `
      <h3>What are Variables?</h3>
      <p>Variables store data values in a program.</p>

      <h3>Example</h3>
      <pre><code>name = "Kavya"
age = 20
marks = 85.5
passed = True</code></pre>

      <h3>Common Data Types</h3>
      <ul>
        <li>int - Integer</li>
        <li>float - Decimal number</li>
        <li>str - Text</li>
        <li>bool - True or False</li>
        <li>list - Collection of values</li>
      </ul>
    `
  },

  {
    title: "Operators and Expressions",
    difficulty: "Beginner",
    content: `
      <h3>Python Operators</h3>
      <ul>
        <li>Arithmetic: +, -, *, /, %, **, //</li>
        <li>Comparison: ==, !=, >, <</li>
        <li>Logical: and, or, not</li>
        <li>Assignment: =, +=, -=</li>
      </ul>

      <h3>Example</h3>
      <pre><code>a = 10
b = 5
print(a + b)
print(a * b)</code></pre>
    `
  },

  {
    title: "Conditional Statements",
    difficulty: "Beginner",
    content: `
      <h3>Making Decisions</h3>
      <p>Conditional statements execute code based on conditions.</p>

      <h3>if-else Example</h3>
      <pre><code>age = 18

if age >= 18:
    print("Eligible")
else:
    print("Not Eligible")</code></pre>

      <h3>Types</h3>
      <ul>
        <li>if</li>
        <li>if-else</li>
        <li>if-elif-else</li>
        <li>Nested if</li>
      </ul>
    `
  },

  {
    title: "Loops",
    difficulty: "Intermediate",
    content: `
      <h3>What are Loops?</h3>
      <p>Loops execute statements repeatedly.</p>

      <h3>for Loop</h3>
      <pre><code>for i in range(1, 6):
    print(i)</code></pre>

      <h3>while Loop</h3>
      <pre><code>i = 1
while i <= 5:
    print(i)
    i += 1</code></pre>

      <p>break stops a loop and continue skips an iteration.</p>
    `
  },

  {
    title: "Functions",
    difficulty: "Intermediate",
    content: `
      <h3>What are Functions?</h3>
      <p>Functions are reusable blocks of code.</p>

      <h3>Defining a Function</h3>
      <pre><code>def greet():
    print("Welcome!")

greet()</code></pre>

      <h3>Parameters and Return</h3>
      <pre><code>def add(a, b):
    return a + b

print(add(10, 20))</code></pre>
    `
  },

  {
    title: "Lists, Tuples and Sets",
    difficulty: "Intermediate",
    content: `
      <h3>Lists</h3>
      <p>Lists are ordered and mutable collections.</p>
      <pre><code>fruits = ["Apple", "Mango", "Orange"]
fruits.append("Banana")</code></pre>

      <h3>Tuples</h3>
      <p>Tuples are ordered and immutable.</p>
      <pre><code>numbers = (10, 20, 30)</code></pre>

      <h3>Sets</h3>
      <p>Sets store unique elements.</p>
      <pre><code>values = {1, 2, 3}</code></pre>
    `
  },

  {
    title: "Dictionaries and Strings",
    difficulty: "Advanced",
    content: `
      <h3>Dictionaries</h3>
      <p>Dictionaries store information as key-value pairs.</p>

      <pre><code>student = {
    "name": "Kavya",
    "age": 20
}

print(student["name"])</code></pre>

      <h3>String Operations</h3>
      <pre><code>text = "Python Programming"
print(text.upper())
print(text.lower())
print(len(text))</code></pre>
    `
  },

  {
    title: "Object-Oriented Programming",
    difficulty: "Advanced",
    content: `
      <h3>What is OOP?</h3>
      <p>Object-Oriented Programming organizes code using classes and objects.</p>

      <h3>Class and Object</h3>
      <pre><code>class Student:
    def greet(self):
        print("Hello Student")

s1 = Student()
s1.greet()</code></pre>

      <h3>Main Concepts</h3>
      <ul>
        <li>Class and Object</li>
        <li>Inheritance</li>
        <li>Encapsulation</li>
        <li>Polymorphism</li>
      </ul>
    `
  },

  {
    title: "File Handling and Mini Project",
    difficulty: "Expert",
    content: `
      <h3>File Handling</h3>
      <p>Python can create, read and write files.</p>

      <h3>Writing to a File</h3>
      <pre><code>with open("demo.txt", "w") as file:
    file.write("Hello Python")</code></pre>

      <h3>Reading a File</h3>
      <pre><code>with open("demo.txt", "r") as file:
    print(file.read())</code></pre>

      <h3>Mini Project: Student Marks</h3>
      <pre><code>marks = [80, 90, 85]
average = sum(marks) / len(marks)
print("Average:", average)</code></pre>
    `
  }
];
// ==========================================
// QUIZCONNECT - C PROGRAMMING LEARNING SYSTEM
// ALL 10 LEARNING LEVELS
// ==========================================

const cLevels = [
  {
    title: "Introduction to C Programming",
    difficulty: "Beginner",
    content: `
      <h3>What is C?</h3>
      <p>C is a general-purpose, procedural programming language developed by Dennis Ritchie.</p>
      <h3>Features of C</h3>
      <ul>
        <li>Simple and efficient</li>
        <li>Structured programming</li>
        <li>Portable</li>
        <li>Fast execution</li>
      </ul>
      <h3>First C Program</h3>
      <pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello, World!");
    return 0;
}</code></pre>
    `
  },
  {
    title: "Variables and Data Types",
    difficulty: "Beginner",
    content: `
      <h3>What are Variables?</h3>
      <p>Variables are named memory locations used to store data.</p>
      <h3>Common Data Types</h3>
      <ul>
        <li>int - Integer</li>
        <li>float - Decimal number</li>
        <li>char - Character</li>
        <li>double - Double precision number</li>
      </ul>
      <h3>Example</h3>
      <pre><code>int age = 20;
float marks = 85.5;
char grade = 'A';
double salary = 25000.50;</code></pre>
    `
  },
  {
    title: "Operators and Expressions",
    difficulty: "Beginner",
    content: `
      <h3>Types of Operators</h3>
      <ul>
        <li>Arithmetic: +, -, *, /, %</li>
        <li>Relational: ==, !=, &gt;, &lt;, &gt;=, &lt;=</li>
        <li>Logical: &amp;&amp;, ||, !</li>
        <li>Assignment: =, +=, -=</li>
        <li>Increment and decrement: ++, --</li>
      </ul>
      <h3>Example</h3>
      <pre><code>int a = 10, b = 5;
printf("%d", a + b);
printf("%d", a * b);</code></pre>
    `
  },
  {
    title: "Conditional Statements",
    difficulty: "Beginner",
    content: `
      <h3>Decision Making</h3>
      <p>Conditional statements execute code based on conditions.</p>
      <h3>if-else Example</h3>
      <pre><code>int age = 18;

if (age >= 18) {
    printf("Eligible");
} else {
    printf("Not Eligible");
}</code></pre>
      <h3>Types</h3>
      <ul>
        <li>if</li>
        <li>if-else</li>
        <li>else-if ladder</li>
        <li>Nested if</li>
        <li>switch</li>
      </ul>
    `
  },
  {
    title: "Loops",
    difficulty: "Intermediate",
    content: `
      <h3>What are Loops?</h3>
      <p>Loops execute a block of statements repeatedly.</p>
      <h3>for Loop</h3>
      <pre><code>for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}</code></pre>
      <h3>while Loop</h3>
      <pre><code>int i = 1;
while (i <= 5) {
    printf("%d\\n", i);
    i++;
}</code></pre>
      <h3>do-while Loop</h3>
      <pre><code>int j = 1;
do {
    printf("%d\\n", j);
    j++;
} while (j <= 5);</code></pre>
    `
  },
  {
    title: "Functions",
    difficulty: "Intermediate",
    content: `
      <h3>What are Functions?</h3>
      <p>Functions are reusable blocks of code that perform specific tasks.</p>
      <h3>Function Example</h3>
      <pre><code>int add(int a, int b) {
    return a + b;
}

int main() {
    printf("%d", add(10, 20));
    return 0;
}</code></pre>
      <h3>Function Concepts</h3>
      <ul>
        <li>Function declaration</li>
        <li>Function definition</li>
        <li>Function calling</li>
        <li>Arguments and return values</li>
        <li>Recursion</li>
      </ul>
    `
  },
  {
    title: "Arrays and Strings",
    difficulty: "Intermediate",
    content: `
      <h3>Arrays</h3>
      <p>Arrays store multiple values of the same data type.</p>
      <pre><code>int numbers[5] = {10, 20, 30, 40, 50};

printf("%d", numbers[0]);</code></pre>
      <h3>Strings</h3>
      <p>Strings are character arrays ending with the null character \\0.</p>
      <pre><code>char name[] = "QuizConnect";
printf("%s", name);</code></pre>
      <h3>String Functions</h3>
      <ul>
        <li>strlen()</li>
        <li>strcpy()</li>
        <li>strcat()</li>
        <li>strcmp()</li>
      </ul>
    `
  },
  {
    title: "Pointers",
    difficulty: "Advanced",
    content: `
      <h3>What are Pointers?</h3>
      <p>Pointers are variables that store the memory addresses of other variables.</p>
      <h3>Pointer Example</h3>
      <pre><code>int number = 10;
int *ptr = &number;

printf("%d", *ptr);
printf("%p", (void*)ptr);</code></pre>
      <h3>Pointer Concepts</h3>
      <ul>
        <li>Address operator (&amp;)</li>
        <li>Dereference operator (*)</li>
        <li>Pointer arithmetic</li>
        <li>Pointer and arrays</li>
        <li>Null pointers</li>
      </ul>
    `
  },
  {
    title: "Structures and Unions",
    difficulty: "Advanced",
    content: `
      <h3>Structures</h3>
      <p>Structures group variables of different data types under one name.</p>
      <pre><code>struct Student {
    int id;
    char grade;
    float marks;
};

int main() {
    struct Student s1 = {1, 'A', 90.5};
    printf("%d", s1.id);
    return 0;
}</code></pre>
      <h3>Unions</h3>
      <p>Unions allow different members to share the same memory location.</p>
      <pre><code>union Data {
    int number;
    float value;
};</code></pre>
    `
  },
  {
    title: "File Handling and Mini Project",
    difficulty: "Expert",
    content: `
      <h3>File Handling</h3>
      <p>C supports creating, reading and writing files.</p>
      <h3>Writing to a File</h3>
      <pre><code>FILE *fp = fopen("demo.txt", "w");

if (fp != NULL) {
    fprintf(fp, "Hello C Programming");
    fclose(fp);
}</code></pre>
      <h3>Reading a File</h3>
      <pre><code>FILE *fp = fopen("demo.txt", "r");

if (fp != NULL) {
    char text[100];
    fgets(text, sizeof(text), fp);
    printf("%s", text);
    fclose(fp);
}</code></pre>
      <h3>Mini Project: Student Marks Calculator</h3>
      <pre><code>int marks[] = {80, 90, 85};
int total = 0;

for (int i = 0; i < 3; i++) {
    total += marks[i];
}

printf("Average = %.2f", total / 3.0);</code></pre>
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
// ==========================================
// WEB DEVELOPMENT - 10 LEARNING LEVELS
// ==========================================

const webDevelopmentLevels = [

  {
    title: "Introduction to Web Development",
    difficulty: "Beginner",
    content: `
      <h3>What is Web Development?</h3>
      <p>Web development is the process of creating websites and web applications.</p>

      <h3>Types of Web Development</h3>
      <ul>
        <li>Frontend Development – User interface.</li>
        <li>Backend Development – Server-side functionality.</li>
        <li>Full Stack Development – Frontend and backend.</li>
      </ul>

      <h3>Core Technologies</h3>
      <ul>
        <li>HTML – Structure of a webpage.</li>
        <li>CSS – Styling and layout.</li>
        <li>JavaScript – Interactivity.</li>
      </ul>
    `
  },

  {
    title: "HTML Fundamentals",
    difficulty: "Beginner",
    content: `
      <h3>What is HTML?</h3>
      <p>HTML stands for HyperText Markup Language. It defines webpage structure.</p>

      <h3>Basic HTML Structure</h3>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;My Website&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello World&lt;/h1&gt;
  &lt;p&gt;Welcome to my website.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

      <h3>Common HTML Tags</h3>
      <ul>
        <li>Headings – h1 to h6</li>
        <li>Paragraph – p</li>
        <li>Link – a</li>
        <li>Image – img</li>
        <li>List – ul, ol, li</li>
      </ul>
    `
  },

  {
    title: "HTML Forms and Semantic Elements",
    difficulty: "Beginner",
    content: `
      <h3>HTML Forms</h3>
      <p>Forms collect information from users.</p>

      <pre><code>&lt;form&gt;
  &lt;label&gt;Name:&lt;/label&gt;
  &lt;input type="text"&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

      <h3>Common Input Types</h3>
      <ul>
        <li>text</li>
        <li>email</li>
        <li>password</li>
        <li>number</li>
        <li>date</li>
        <li>checkbox</li>
        <li>radio</li>
      </ul>

      <h3>Semantic Elements</h3>
      <p>header, nav, main, section, article, aside and footer give meaning to webpage structure.</p>
    `
  },

  {
    title: "CSS Fundamentals",
    difficulty: "Easy",
    content: `
      <h3>What is CSS?</h3>
      <p>CSS stands for Cascading Style Sheets. It controls the appearance of webpages.</p>

      <h3>Types of CSS</h3>
      <ul>
        <li>Inline CSS</li>
        <li>Internal CSS</li>
        <li>External CSS</li>
      </ul>

      <h3>CSS Example</h3>
      <pre><code>h1 {
  color: blue;
  font-size: 30px;
}

p {
  color: gray;
}</code></pre>

      <h3>CSS Selectors</h3>
      <ul>
        <li>Element selector</li>
        <li>Class selector</li>
        <li>ID selector</li>
        <li>Universal selector</li>
      </ul>
    `
  },

  {
    title: "CSS Box Model and Layout",
    difficulty: "Intermediate",
    content: `
      <h3>CSS Box Model</h3>
      <p>Every HTML element is represented as a rectangular box.</p>

      <ul>
        <li>Content – Actual content.</li>
        <li>Padding – Space around content.</li>
        <li>Border – Surrounds padding and content.</li>
        <li>Margin – Space outside the border.</li>
      </ul>

      <h3>CSS Layout Techniques</h3>
      <ul>
        <li>Flexbox – One-dimensional layouts.</li>
        <li>CSS Grid – Two-dimensional layouts.</li>
        <li>Position – Controls element positioning.</li>
      </ul>

      <h3>Example</h3>
      <pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
    `
  },

  {
    title: "Responsive Web Design",
    difficulty: "Intermediate",
    content: `
      <h3>What is Responsive Design?</h3>
      <p>Responsive design makes websites adapt to different screen sizes and devices.</p>

      <h3>Important Techniques</h3>
      <ul>
        <li>Flexible layouts</li>
        <li>Relative units such as %, rem and vw</li>
        <li>Responsive images</li>
        <li>Media queries</li>
      </ul>

      <h3>Media Query Example</h3>
      <pre><code>@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
}</code></pre>

      <p>Responsive design improves usability on mobiles, tablets and desktops.</p>
    `
  },

  {
    title: "JavaScript for Web Development",
    difficulty: "Intermediate",
    content: `
      <h3>JavaScript in Websites</h3>
      <p>JavaScript adds dynamic behavior and interactivity to webpages.</p>

      <h3>Variables</h3>
      <pre><code>let name = "Kavya";
const age = 20;</code></pre>

      <h3>Functions</h3>
      <pre><code>function greet() {
  alert("Welcome!");
}</code></pre>

      <h3>Events</h3>
      <p>Events allow webpages to respond to user actions such as clicks, typing and form submissions.</p>
    `
  },

  {
    title: "DOM Manipulation and Events",
    difficulty: "Advanced",
    content: `
      <h3>What is the DOM?</h3>
      <p>The Document Object Model represents an HTML page as a tree of objects.</p>

      <h3>Selecting Elements</h3>
      <pre><code>document.getElementById("demo");
document.querySelector(".heading");</code></pre>

      <h3>Changing Content</h3>
      <pre><code>document.getElementById("demo")
  .textContent = "Hello!";</code></pre>

      <h3>Event Listener</h3>
      <pre><code>button.addEventListener("click", function() {
  alert("Button clicked!");
});</code></pre>
    `
  },

  {
    title: "Backend Development and APIs",
    difficulty: "Advanced",
    content: `
      <h3>What is Backend Development?</h3>
      <p>Backend development handles server-side logic, data processing and database communication.</p>

      <h3>Important Concepts</h3>
      <ul>
        <li>Server – Processes client requests.</li>
        <li>Database – Stores application data.</li>
        <li>API – Allows different applications to communicate.</li>
        <li>HTTP – Protocol used for web communication.</li>
      </ul>

      <h3>HTTP Methods</h3>
      <ul>
        <li>GET – Retrieve data.</li>
        <li>POST – Create data.</li>
        <li>PUT – Update data.</li>
        <li>DELETE – Remove data.</li>
      </ul>

      <h3>JSON Example</h3>
      <pre><code>{
  "name": "Student",
  "course": "Web Development"
}</code></pre>
    `
  },

  {
    title: "Web Hosting, Deployment and Mini Project",
    difficulty: "Expert",
    content: `
      <h3>What is Web Hosting?</h3>
      <p>Web hosting makes websites accessible through the internet.</p>

      <h3>Deployment Steps</h3>
      <ul>
        <li>Prepare HTML, CSS and JavaScript files.</li>
        <li>Test the website locally.</li>
        <li>Upload the project to a hosting platform.</li>
        <li>Configure deployment settings.</li>
        <li>Test the live website.</li>
      </ul>

      <h3>Version Control</h3>
      <p>Git helps track changes in source code. GitHub hosts repositories and supports collaboration.</p>

      <h3>Mini Project</h3>
      <p>Create a responsive student portfolio website containing:</p>
      <ul>
        <li>Home section</li>
        <li>About section</li>
        <li>Skills section</li>
        <li>Projects section</li>
        <li>Contact form</li>
      </ul>
    `
  }

];

console.log("Web Development levels:", webDevelopmentLevels.length);
// Current learning progress
let unlockedJavaScriptLevel = 1;
let currentJavaScriptLevel = 1;

let currentLearningSubject = "JavaScript";
let currentLearningLevel = 1;

// Separate unlocked progress for every subject
const unlockedLevels = {
  "JavaScript": 1,
  "Database": 1,
  "Python": 1,
  "C": 1,
  "C Programming": 1,
  "Data Structures": 1,
  "Web Development": 1
};

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
// PYTHON - 50 LEARNING QUIZ QUESTIONS
// ==========================================

const pythonLevelQuestions = [

  // LEVEL 1 - INTRODUCTION TO PYTHON
  [
    {
      question: "Who created Python?",
      options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"],
      answer: 1
    },
    {
      question: "Which type of programming language is Python?",
      options: ["High-level", "Machine-level", "Assembly-only", "Hardware language"],
      answer: 0
    },
    {
      question: "Which function displays output in Python?",
      options: ["echo()", "display()", "print()", "show()"],
      answer: 2
    },
    {
      question: "Which file extension is used for Python files?",
      options: [".java", ".html", ".cpp", ".py"],
      answer: 3
    },
    {
      question: "Python is known for its:",
      options: ["Complex syntax", "Readable syntax", "Hardware dependency", "Lack of libraries"],
      answer: 1
    }
  ],

  // LEVEL 2 - VARIABLES AND DATA TYPES
  [
    {
      question: "How do you assign the value 10 to a variable?",
      options: ["x == 10", "int x = 10", "x = 10", "let x = 10"],
      answer: 2
    },
    {
      question: "Which data type stores text?",
      options: ["int", "str", "float", "bool"],
      answer: 1
    },
    {
      question: "What is the data type of 12.5?",
      options: ["int", "str", "bool", "float"],
      answer: 3
    },
    {
      question: "Which value represents Boolean true in Python?",
      options: ["TRUE", "true", "True", "1True"],
      answer: 2
    },
    {
      question: "Which function checks a variable's data type?",
      options: ["type()", "check()", "datatype()", "typeof()"],
      answer: 0
    }
  ],

  // LEVEL 3 - OPERATORS
  [
    {
      question: "What is the result of 10 + 5?",
      options: ["15", "105", "5", "50"],
      answer: 0
    },
    {
      question: "Which operator is used for exponentiation?",
      options: ["^", "**", "//", "%"],
      answer: 1
    },
    {
      question: "What is the result of 10 % 3?",
      options: ["3", "0", "1", "10"],
      answer: 2
    },
    {
      question: "Which operator checks equality?",
      options: ["=", "!=", ">", "=="],
      answer: 3
    },
    {
      question: "What is the result of 10 // 3?",
      options: ["3", "3.33", "1", "0"],
      answer: 0
    }
  ],

  // LEVEL 4 - CONDITIONAL STATEMENTS
  [
    {
      question: "Which keyword starts a conditional statement?",
      options: ["for", "if", "while", "def"],
      answer: 1
    },
    {
      question: "Which keyword checks another condition?",
      options: ["else", "then", "elif", "switch"],
      answer: 2
    },
    {
      question: "Which symbol is used after an if condition?",
      options: [";", ".", "!", ":"],
      answer: 3
    },
    {
      question: "What is printed if x = 10 and x > 5?",
      options: ["False", "True", "None", "Error"],
      answer: 1
    },
    {
      question: "Which block executes when all previous conditions are false?",
      options: ["if", "elif", "for", "else"],
      answer: 3
    }
  ],

  // LEVEL 5 - LOOPS
  [
    {
      question: "Which loop iterates over a sequence?",
      options: ["for", "if", "switch", "try"],
      answer: 0
    },
    {
      question: "Which loop continues while a condition is true?",
      options: ["for", "while", "if", "def"],
      answer: 1
    },
    {
      question: "What does range(5) generate?",
      options: ["1 to 5", "1 to 4", "0 to 4", "0 to 5"],
      answer: 2
    },
    {
      question: "Which keyword stops a loop?",
      options: ["skip", "pass", "continue", "break"],
      answer: 3
    },
    {
      question: "Which keyword skips the current iteration?",
      options: ["continue", "break", "stop", "exit"],
      answer: 0
    }
  ],

  // LEVEL 6 - FUNCTIONS
  [
    {
      question: "Which keyword defines a function?",
      options: ["function", "def", "define", "fun"],
      answer: 1
    },
    {
      question: "Which keyword returns a value from a function?",
      options: ["print", "break", "return", "yield"],
      answer: 2
    },
    {
      question: "What is a parameter?",
      options: ["A loop", "An output", "A data type", "A variable in a function definition"],
      answer: 3
    },
    {
      question: "Which statement calls a function named greet?",
      options: ["greet()", "call greet", "function greet", "run greet"],
      answer: 0
    },
    {
      question: "What does a function without a return statement return by default?",
      options: ["0", "None", "False", "Empty string"],
      answer: 1
    }
  ],

  // LEVEL 7 - LISTS AND TUPLES
  [
    {
      question: "Which brackets create a Python list?",
      options: ["{}", "()", "[]", "<>"],
      answer: 2
    },
    {
      question: "Which collection is immutable?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      answer: 3
    },
    {
      question: "Which method adds an item to a list?",
      options: ["append()", "addEnd()", "insertEnd()", "push()"],
      answer: 0
    },
    {
      question: "What is the index of the first list element?",
      options: ["1", "0", "-1", "2"],
      answer: 1
    },
    {
      question: "Which method removes the last list item by default?",
      options: ["delete()", "remove()", "pop()", "clear()"],
      answer: 2
    }
  ],

  // LEVEL 8 - DICTIONARIES AND SETS
  [
    {
      question: "Which brackets create a dictionary?",
      options: ["[]", "()", "{}", "<>"],
      answer: 2
    },
    {
      question: "A dictionary stores data as:",
      options: ["Key-value pairs", "Only numbers", "Only strings", "Indexed rows"],
      answer: 0
    },
    {
      question: "Which collection stores unique elements?",
      options: ["List", "Tuple", "String", "Set"],
      answer: 3
    },
    {
      question: "Which method returns dictionary keys?",
      options: ["values()", "keys()", "itemsOnly()", "getKeys()"],
      answer: 1
    },
    {
      question: "Which method retrieves a dictionary value using a key?",
      options: ["fetch()", "find()", "get()", "value()"],
      answer: 2
    }
  ],

  // LEVEL 9 - FILE HANDLING AND EXCEPTIONS
  [
    {
      question: "Which function opens a file?",
      options: ["open()", "file()", "readFile()", "load()"],
      answer: 0
    },
    {
      question: "Which mode opens a file for reading?",
      options: ["w", "r", "a", "x"],
      answer: 1
    },
    {
      question: "Which keyword handles exceptions?",
      options: ["check", "error", "try", "catch"],
      answer: 2
    },
    {
      question: "Which block handles an exception?",
      options: ["finally", "else", "try", "except"],
      answer: 3
    },
    {
      question: "Which keyword executes code whether an exception occurs or not?",
      options: ["finally", "except", "break", "raise"],
      answer: 0
    }
  ],

  // LEVEL 10 - OOP AND ADVANCED PYTHON
  [
    {
      question: "Which keyword defines a class?",
      options: ["object", "class", "struct", "define"],
      answer: 1
    },
    {
      question: "What is an object?",
      options: ["A loop", "A function only", "An instance of a class", "A module"],
      answer: 2
    },
    {
      question: "Which method is commonly used as a constructor?",
      options: ["start()", "create()", "main()", "__init__()"],
      answer: 3
    },
    {
      question: "What does inheritance allow?",
      options: ["A class to reuse another class's features", "Deleting objects", "Stopping a program", "Changing file extensions"],
      answer: 0
    },
    {
      question: "Which keyword is used to import a module?",
      options: ["include", "import", "using", "require"],
      answer: 1
    }
  ]

];

console.log("Python question bank:", pythonLevelQuestions.length);
console.log("Python Level 1 questions:", pythonLevelQuestions[0].length);

// ==========================================
// C PROGRAMMING - 50 LEARNING QUIZ QUESTIONS
// ==========================================

const cLevelQuestions = [

  // LEVEL 1 - INTRODUCTION TO C
  [
    {
      question: "Who developed the C programming language?",
      options: ["James Gosling", "Dennis Ritchie", "Guido van Rossum", "Bjarne Stroustrup"],
      answer: 1
    },
    {
      question: "In which year was C developed?",
      options: ["1972", "1980", "1990", "1965"],
      answer: 0
    },
    {
      question: "C is primarily a:",
      options: ["Markup language", "Database language", "Procedural programming language", "Scripting-only language"],
      answer: 2
    },
    {
      question: "Which extension is used for C source files?",
      options: [".java", ".py", ".html", ".c"],
      answer: 3
    },
    {
      question: "Which function is the starting point of a C program?",
      options: ["start()", "main()", "begin()", "run()"],
      answer: 1
    }
  ],

  // LEVEL 2 - VARIABLES AND DATA TYPES
  [
    {
      question: "Which data type is used to store integers in C?",
      options: ["int", "float", "char", "double"],
      answer: 0
    },
    {
      question: "Which data type stores a single character?",
      options: ["int", "char", "float", "double"],
      answer: 1
    },
    {
      question: "Which format specifier is used for an integer?",
      options: ["%f", "%c", "%d", "%s"],
      answer: 2
    },
    {
      question: "Which keyword declares a constant in C?",
      options: ["var", "constant", "static", "const"],
      answer: 3
    },
    {
      question: "Which of the following is a valid variable name?",
      options: ["2value", "student_age", "float", "my-name"],
      answer: 1
    }
  ],

  // LEVEL 3 - OPERATORS AND EXPRESSIONS
  [
    {
      question: "Which operator is used for addition?",
      options: ["+", "-", "*", "/"],
      answer: 0
    },
    {
      question: "What is the result of 10 % 3?",
      options: ["3", "1", "0", "10"],
      answer: 1
    },
    {
      question: "Which operator checks equality?",
      options: ["=", "!=", "==", ">"],
      answer: 2
    },
    {
      question: "What is the result of 5 * 4?",
      options: ["9", "15", "25", "20"],
      answer: 3
    },
    {
      question: "Which operator represents logical AND?",
      options: ["&&", "||", "!", "&"],
      answer: 0
    }
  ],

  // LEVEL 4 - CONDITIONAL STATEMENTS
  [
    {
      question: "Which keyword is used for decision-making?",
      options: ["for", "if", "while", "break"],
      answer: 1
    },
    {
      question: "Which statement provides an alternative condition?",
      options: ["switch", "case", "else if", "continue"],
      answer: 2
    },
    {
      question: "Which statement selects one option from multiple cases?",
      options: ["if", "while", "for", "switch"],
      answer: 3
    },
    {
      question: "Which keyword terminates a switch case?",
      options: ["break", "continue", "return", "exit"],
      answer: 0
    },
    {
      question: "What is the output of if(5 > 2)?",
      options: ["False", "True", "Error", "None"],
      answer: 1
    }
  ],

  // LEVEL 5 - LOOPS
  [
    {
      question: "Which loop executes at least once?",
      options: ["for", "while", "do-while", "nested for"],
      answer: 2
    },
    {
      question: "Which loop is commonly used when the number of iterations is known?",
      options: ["while", "do-while", "if", "for"],
      answer: 3
    },
    {
      question: "Which keyword exits a loop immediately?",
      options: ["break", "continue", "skip", "pass"],
      answer: 0
    },
    {
      question: "Which keyword skips the current iteration?",
      options: ["break", "continue", "return", "stop"],
      answer: 1
    },
    {
      question: "How many times does for(int i=0; i<5; i++) execute?",
      options: ["4", "6", "5", "Infinite"],
      answer: 2
    }
  ],

  // LEVEL 6 - FUNCTIONS
  [
    {
      question: "Which keyword is used to return a value from a function?",
      options: ["break", "continue", "void", "return"],
      answer: 3
    },
    {
      question: "What is a function prototype?",
      options: ["A function declaration", "A loop", "A variable", "A header file"],
      answer: 0
    },
    {
      question: "Which return type indicates that a function returns no value?",
      options: ["int", "void", "char", "float"],
      answer: 1
    },
    {
      question: "What is recursion?",
      options: ["A loop only", "A variable declaration", "A function calling itself", "A header file"],
      answer: 2
    },
    {
      question: "What is passed to a function during a function call?",
      options: ["Only keywords", "Only data types", "Only operators", "Arguments"],
      answer: 3
    }
  ],

  // LEVEL 7 - ARRAYS AND STRINGS
  [
    {
      question: "What is the index of the first element in a C array?",
      options: ["0", "1", "-1", "2"],
      answer: 0
    },
    {
      question: "Which declaration creates an integer array of 5 elements?",
      options: ["int a;", "int a[5];", "array int a;", "int[5] a;"],
      answer: 1
    },
    {
      question: "Which header file contains common string functions?",
      options: ["stdio.h", "stdlib.h", "string.h", "math.h"],
      answer: 2
    },
    {
      question: "Which character marks the end of a C string?",
      options: ["\\n", "\\t", " ", "\\0"],
      answer: 3
    },
    {
      question: "Which function finds the length of a string?",
      options: ["strlen()", "strcpy()", "strcmp()", "strcat()"],
      answer: 0
    }
  ],

  // LEVEL 8 - POINTERS
  [
    {
      question: "What is a pointer?",
      options: ["A loop", "A variable that stores an address", "A data type only", "A function"],
      answer: 1
    },
    {
      question: "Which operator is used to get the address of a variable?",
      options: ["*", "%", "&", "#"],
      answer: 2
    },
    {
      question: "Which operator accesses the value stored at an address?",
      options: ["&", "%", "->", "*"],
      answer: 3
    },
    {
      question: "What is a NULL pointer?",
      options: ["A pointer that points to no valid object", "An integer pointer", "A character variable", "A function pointer only"],
      answer: 0
    },
    {
      question: "Which declaration creates a pointer to an integer?",
      options: ["int p;", "int *p;", "pointer int p;", "int &p;"],
      answer: 1
    }
  ],

  // LEVEL 9 - STRUCTURES AND UNIONS
  [
    {
      question: "Which keyword is used to define a structure?",
      options: ["union", "class", "struct", "record"],
      answer: 2
    },
    {
      question: "Which operator accesses a structure member using a structure variable?",
      options: ["->", "::", "&", "."],
      answer: 3
    },
    {
      question: "Which keyword defines a union?",
      options: ["union", "struct", "enum", "typedef"],
      answer: 0
    },
    {
      question: "In a union, members generally share:",
      options: ["Separate memory locations", "The same memory location", "Different functions", "Different files"],
      answer: 1
    },
    {
      question: "Which operator accesses a structure member through a pointer?",
      options: [".", "&", "->", "*"],
      answer: 2
    }
  ],

  // LEVEL 10 - FILE HANDLING AND MINI PROJECT
  [
    {
      question: "Which function opens a file in C?",
      options: ["open()", "read()", "create()", "fopen()"],
      answer: 3
    },
    {
      question: "Which mode opens a file for reading?",
      options: ["r", "w", "a", "x"],
      answer: 0
    },
    {
      question: "Which function closes an opened file?",
      options: ["fopen()", "fclose()", "closefile()", "end()"],
      answer: 1
    },
    {
      question: "Which function writes formatted output to a file?",
      options: ["scanf()", "fopen()", "fprintf()", "fclose()"],
      answer: 2
    },
    {
      question: "Which function reads formatted input from a file?",
      options: ["printf()", "fprintf()", "fwrite()", "fscanf()"],
      answer: 3
    }
  ]

];

console.log("C question bank:", cLevelQuestions.length);
console.log("C Level 1 questions:", cLevelQuestions[0].length);
// ==========================================
// DATA STRUCTURES - 50 LEARNING QUIZ QUESTIONS
// ==========================================

const dataStructuresLevelQuestions = [

  // LEVEL 1 - INTRODUCTION TO DATA STRUCTURES
  [
    {
      question: "What is a data structure?",
      options: ["A programming language", "A way to organize and store data", "An operating system", "A compiler"],
      answer: 1
    },
    {
      question: "Which of these is a linear data structure?",
      options: ["Tree", "Graph", "Array", "Network"],
      answer: 2
    },
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Array", "Linked List", "Stack"],
      answer: 3
    },
    {
      question: "Which data structure follows FIFO?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      answer: 0
    },
    {
      question: "Which is a non-linear data structure?",
      options: ["Array", "Tree", "Stack", "Queue"],
      answer: 1
    }
  ],

  // LEVEL 2 - ARRAYS
  [
    {
      question: "What is an array?",
      options: ["A collection of different functions", "A collection of similar data elements", "A programming language", "A loop"],
      answer: 1
    },
    {
      question: "What is the index of the first array element in C?",
      options: ["1", "0", "-1", "2"],
      answer: 1
    },
    {
      question: "Which operation adds an element to an array?",
      options: ["Insertion", "Deletion", "Traversal", "Searching"],
      answer: 0
    },
    {
      question: "What is the time complexity of accessing an array element by index?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: 2
    },
    {
      question: "What is a common limitation of a static array?",
      options: ["It cannot store numbers", "It cannot be traversed", "It has no index", "Its size is fixed"],
      answer: 3
    }
  ],

  // LEVEL 3 - LINKED LISTS
  [
    {
      question: "What does a linked list consist of?",
      options: ["Nodes", "Rows only", "Columns only", "Functions"],
      answer: 0
    },
    {
      question: "What does each node in a singly linked list contain?",
      options: ["Only data", "Data and a pointer to the next node", "Only an index", "Two arrays"],
      answer: 1
    },
    {
      question: "What does the last node of a singly linked list point to?",
      options: ["The first node", "The middle node", "NULL", "Itself"],
      answer: 2
    },
    {
      question: "Which linked list allows traversal in both directions?",
      options: ["Singly linked list", "Circular singly linked list", "Linear list", "Doubly linked list"],
      answer: 3
    },
    {
      question: "What is a major advantage of linked lists over fixed-size arrays?",
      options: ["Dynamic memory allocation", "Constant-time random access", "No memory usage", "Always faster searching"],
      answer: 0
    }
  ],

  // LEVEL 4 - STACKS
  [
    {
      question: "Which principle does a stack follow?",
      options: ["FIFO", "LIFO", "Random order", "Sorted order"],
      answer: 1
    },
    {
      question: "Which operation inserts an element into a stack?",
      options: ["Pop", "Peek", "Push", "Dequeue"],
      answer: 2
    },
    {
      question: "Which operation removes the top element from a stack?",
      options: ["Push", "Insert", "Enqueue", "Pop"],
      answer: 3
    },
    {
      question: "What is stack overflow?",
      options: ["Trying to push onto a full stack", "Removing from an empty stack", "Displaying a stack", "Searching a stack"],
      answer: 0
    },
    {
      question: "Which application commonly uses a stack?",
      options: ["Printer scheduling", "Function call management", "CPU temperature monitoring", "Network cabling"],
      answer: 1
    }
  ],

  // LEVEL 5 - QUEUES
  [
    {
      question: "Which principle does a queue follow?",
      options: ["LIFO", "Random order", "FIFO", "Sorted order"],
      answer: 2
    },
    {
      question: "Which operation inserts an element into a queue?",
      options: ["Push", "Pop", "Dequeue", "Enqueue"],
      answer: 3
    },
    {
      question: "Which operation removes an element from a queue?",
      options: ["Dequeue", "Enqueue", "Push", "Peek"],
      answer: 0
    },
    {
      question: "From which end is an element normally removed in a queue?",
      options: ["Rear", "Front", "Middle", "Any position"],
      answer: 1
    },
    {
      question: "Which queue connects its last position back to its first?",
      options: ["Priority queue", "Linear queue", "Circular queue", "Simple stack"],
      answer: 2
    }
  ],
    

    // LEVEL 6 - SEARCHING ALGORITHMS
  [
    {
      question: "Which algorithm searches elements one by one?",
      options: ["Binary Search", "Linear Search", "Quick Sort", "Merge Sort"],
      answer: 1
    },
    {
      question: "Which searching algorithm requires sorted data?",
      options: ["Linear Search", "Depth First Search", "Binary Search", "Breadth First Search"],
      answer: 2
    },
    {
      question: "What is the time complexity of linear search in the worst case?",
      options: ["O(1)", "O(log n)", "O(n²)", "O(n)"],
      answer: 3
    },
    {
      question: "What is the average time complexity of binary search?",
      options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
      answer: 0
    },
    {
      question: "Which condition is necessary for binary search?",
      options: ["Random data", "Sorted data", "Duplicate data", "Empty data"],
      answer: 1
    }
  ],

  // LEVEL 7 - SORTING ALGORITHMS
  [
    {
      question: "Which sorting algorithm repeatedly compares adjacent elements?",
      options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Binary Search"],
      answer: 2
    },
    {
      question: "Which sorting algorithm uses divide and conquer?",
      options: ["Bubble Sort", "Selection Sort", "Linear Search", "Merge Sort"],
      answer: 3
    },
    {
      question: "Which sorting algorithm selects the smallest element in each pass?",
      options: ["Selection Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
      answer: 0
    },
    {
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 1
    },
    {
      question: "Which algorithm is generally efficient for large datasets?",
      options: ["Linear Search", "Bubble Sort", "Merge Sort", "Simple Traversal"],
      answer: 2
    }
  ],

  // LEVEL 8 - TREES
  [
    {
      question: "What is the topmost node of a tree called?",
      options: ["Leaf", "Child", "Edge", "Root"],
      answer: 3
    },
    {
      question: "A node with no children is called:",
      options: ["Leaf node", "Root node", "Parent node", "Internal node"],
      answer: 0
    },
    {
      question: "How many children can a binary tree node have at most?",
      options: ["1", "2", "3", "4"],
      answer: 1
    },
    {
      question: "Which traversal visits the root between left and right subtrees?",
      options: ["Preorder", "Postorder", "Inorder", "Level order"],
      answer: 2
    },
    {
      question: "Which data structure is commonly used for level-order traversal?",
      options: ["Stack", "Array only", "Linked list only", "Queue"],
      answer: 3
    }
  ],

  // LEVEL 9 - GRAPHS
  [
    {
      question: "A graph consists of:",
      options: ["Vertices and edges", "Rows and columns", "Roots and leaves only", "Stacks and queues"],
      answer: 0
    },
    {
      question: "What is a vertex in a graph?",
      options: ["A connection", "A node", "A sorting method", "A path only"],
      answer: 1
    },
    {
      question: "Which traversal uses a queue?",
      options: ["DFS", "Inorder", "BFS", "Postorder"],
      answer: 2
    },
    {
      question: "Which traversal commonly uses a stack?",
      options: ["BFS", "Level order", "Binary search", "DFS"],
      answer: 3
    },
    {
      question: "What is a directed graph?",
      options: ["A graph whose edges have directions", "A graph without vertices", "A graph with no edges", "A tree only"],
      answer: 0
    }
  ],

  // LEVEL 10 - HASHING AND APPLICATIONS
  [
    {
      question: "What is hashing?",
      options: ["Sorting elements", "Mapping keys to table positions", "Deleting a tree", "Traversing a graph"],
      answer: 1
    },
    {
      question: "Which structure commonly uses hashing?",
      options: ["Stack only", "Queue only", "Hash table", "Binary tree only"],
      answer: 2
    },
    {
      question: "What is a hash collision?",
      options: ["Deleting a key", "Sorting a table", "Emptying a table", "Two keys mapping to the same index"],
      answer: 3
    },
    {
      question: "Which technique handles collisions using linked lists?",
      options: ["Chaining", "Binary search", "Bubble sort", "Traversal"],
      answer: 0
    },
    {
      question: "Which is a common application of hashing?",
      options: ["Printing documents", "Fast data lookup", "Drawing graphics only", "Playing audio"],
      answer: 1
     }
  ]
]; // End of Data Structures question bank


// ==========================================
// WEB DEVELOPMENT - 50 LEARNING QUIZ QUESTIONS
// ==========================================

const webDevelopmentLevelQuestions = [

  // LEVEL 1: Introduction to Web Development
  [
    {
      question: "What is Web Development?",
      options: [
        "Creating and maintaining websites",
        "Repairing computers",
        "Designing hardware",
        "Managing databases only"
      ],
      answer: 0
    },
    {
      question: "Which language is used to structure web pages?",
      options: ["Python", "HTML", "Java", "C"],
      answer: 1
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style System",
        "Creative Software Structure",
        "Cascading Style Sheets",
        "Colorful Style Syntax"
      ],
      answer: 2
    },
    {
      question: "Which language adds interactivity to websites?",
      options: ["HTML", "CSS", "SQL", "JavaScript"],
      answer: 3
    },
    {
      question: "What is a web browser?",
      options: [
        "A tool used to access websites",
        "A programming language",
        "A database",
        "An operating system"
      ],
      answer: 0
    }
  ],

  // LEVEL 2: HTML Fundamentals
  [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperText Managing Language"
      ],
      answer: 1
    },
    {
      question: "Which tag creates the largest heading?",
      options: ["<h6>", "<head>", "<h1>", "<heading>"],
      answer: 2
    },
    {
      question: "Which HTML tag creates a hyperlink?",
      options: ["<link>", "<href>", "<p>", "<a>"],
      answer: 3
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<img>", "<image>", "<picture>", "<src>"],
      answer: 0
    },
    {
      question: "Which tag creates a paragraph?",
      options: ["<h1>", "<p>", "<para>", "<text>"],
      answer: 1
    }
  ],
    // LEVEL 3: HTML Forms and Semantic Elements
  [
    {
      question: "Which HTML tag is used to create a form?",
      options: ["<input>", "<form>", "<fieldset>", "<button>"],
      answer: 1
    },
    {
      question: "Which input type is used for email addresses?",
      options: ["text", "number", "email", "password"],
      answer: 2
    },
    {
      question: "Which attribute connects a label to an input?",
      options: ["name", "class", "value", "for"],
      answer: 3
    },
    {
      question: "Which semantic tag represents the main content?",
      options: ["<main>", "<aside>", "<footer>", "<nav>"],
      answer: 0
    },
    {
      question: "Which HTML tag represents navigation links?",
      options: ["<section>", "<nav>", "<article>", "<header>"],
      answer: 1
    }
  ],

  // LEVEL 4: CSS Fundamentals
  [
    {
      question: "What does CSS control in a webpage?",
      options: [
        "Database storage",
        "Server operations",
        "Appearance and styling",
        "Internet connection"
      ],
      answer: 2
    },
    {
      question: "Which HTML tag is used for internal CSS?",
      options: ["<css>", "<script>", "<style>", "<design>"],
      answer: 2
    },
    {
      question: "Which CSS property changes text color?",
      options: ["font-style", "background", "text-size", "color"],
      answer: 3
    },
    {
      question: "Which symbol is used to select an ID in CSS?",
      options: ["#", ".", "*", "&"],
      answer: 0
    },
    {
      question: "Which property changes the background color?",
      options: ["color", "background-color", "font-color", "border-color"],
      answer: 1
    }
  ],
    // LEVEL 5: CSS Box Model and Layout
  [
    {
      question: "Which four parts make up the CSS box model?",
      options: [
        "Content, padding, border, margin",
        "Width, height, color, font",
        "Header, body, footer, nav",
        "Top, bottom, left, right"
      ],
      answer: 0
    },
    {
      question: "Which CSS property controls the space inside an element's border?",
      options: ["margin", "padding", "outline", "display"],
      answer: 1
    },
    {
      question: "Which property controls the space outside an element's border?",
      options: ["padding", "border", "margin", "width"],
      answer: 2
    },
    {
      question: "Which CSS property enables Flexbox layout?",
      options: [
        "position: flex",
        "layout: flex",
        "flex: display",
        "display: flex"
      ],
      answer: 3
    },
    {
      question: "Which CSS property creates a grid layout?",
      options: ["display: grid", "position: grid", "grid: block", "layout: grid"],
      answer: 0
    }
  ],

  // LEVEL 6: Responsive Web Design
  [
    {
      question: "What is responsive web design?",
      options: [
        "A website that works only on desktops",
        "A design that adapts to different screen sizes",
        "A website without images",
        "A website with only text"
      ],
      answer: 1
    },
    {
      question: "Which HTML element helps control the viewport on mobile devices?",
      options: ["<title>", "<header>", "<meta>", "<footer>"],
      answer: 2
    },
    {
      question: "Which CSS feature applies styles based on screen conditions?",
      options: ["Animation", "Transition", "Transform", "Media queries"],
      answer: 3
    },
    {
      question: "Which unit is relative to the viewport width?",
      options: ["vw", "px", "cm", "pt"],
      answer: 0
    },
    {
      question: "Which approach is commonly used for responsive images?",
      options: [
        "Fixed width for every screen",
        "max-width: 100%",
        "display: none",
        "position: absolute"
      ],
      answer: 1
    }
  ],
    // LEVEL 7: JavaScript for Web Development
  [
    {
      question: "Which keyword declares a block-scoped variable in JavaScript?",
      options: ["var", "let", "int", "define"],
      answer: 1
    },
    {
      question: "Which operator checks both value and data type?",
      options: ["=", "==", "===", "!="],
      answer: 2
    },
    {
      question: "Which method displays a message in the browser console?",
      options: ["alert()", "print()", "display()", "console.log()"],
      answer: 3
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["function", "method", "func", "define"],
      answer: 0
    },
    {
      question: "Which event occurs when a user clicks an element?",
      options: ["mouseover", "click", "change", "load"],
      answer: 1
    }
  ],

  // LEVEL 8: DOM Manipulation and Events
  [
    {
      question: "What does DOM stand for?",
      options: [
        "Data Object Management",
        "Document Order Model",
        "Document Object Model",
        "Digital Output Method"
      ],
      answer: 2
    },
    {
      question: "Which method selects an element using its ID?",
      options: [
        "getElementsByClassName()",
        "queryAll()",
        "getElementsByTagName()",
        "getElementById()"
      ],
      answer: 3
    },
    {
      question: "Which property changes the text content of an element?",
      options: ["textContent", "style", "src", "href"],
      answer: 0
    },
    {
      question: "Which method attaches an event handler to an element?",
      options: ["addStyle()", "addEventListener()", "createEvent()", "setEvent()"],
      answer: 1
    },
    {
      question: "Which event occurs when a form is submitted?",
      options: ["click", "change", "submit", "mouseover"],
      answer: 2
    }
  ],
    // LEVEL 9: Backend Development and APIs
  [
    {
      question: "What is the primary role of backend development?",
      options: [
        "Managing server-side logic and data",
        "Changing text colors",
        "Creating animations only",
        "Designing page layouts"
      ],
      answer: 0
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Internet",
        "Application Programming Interface",
        "Advanced Program Integration",
        "Automated Processing Interface"
      ],
      answer: 1
    },
    {
      question: "Which HTTP method is commonly used to retrieve data?",
      options: ["POST", "DELETE", "GET", "PATCH"],
      answer: 2
    },
    {
      question: "Which format is commonly used for exchanging API data?",
      options: ["MP3", "JPG", "DOCX", "JSON"],
      answer: 3
    },
    {
      question: "What is the purpose of a database in web applications?",
      options: [
        "To store and manage application data",
        "To style web pages",
        "To create HTML tags",
        "To display animations"
      ],
      answer: 0
    }
  ],

  // LEVEL 10: Web Hosting, Deployment and Mini Project
  [
    {
      question: "What is web hosting?",
      options: [
        "Writing HTML code",
        "Making a website accessible on the internet",
        "Creating database tables",
        "Designing logos"
      ],
      answer: 1
    },
    {
      question: "What is deployment?",
      options: [
        "Deleting website files",
        "Writing CSS styles",
        "Making an application available in a target environment",
        "Creating a programming language"
      ],
      answer: 2
    },
    {
      question: "Which protocol is used for secure communication on websites?",
      options: ["FTP", "HTTP", "SMTP", "HTTPS"],
      answer: 3
    },
    {
      question: "What is the main purpose of Git?",
      options: [
        "Version control and tracking code changes",
        "Creating images",
        "Hosting databases only",
        "Designing web pages"
      ],
      answer: 0
    },
    {
      question: "Which of the following is an example of a web hosting platform?",
      options: ["Notepad", "Render", "Calculator", "Paint"],
      answer: 1
    }
  ]

];

console.log("Web Development question bank:", webDevelopmentLevelQuestions.length);
console.log("Web Development Level 1 questions:", webDevelopmentLevelQuestions[0].length);
// ==========================================
// PART 3: JAVASCRIPT LEARNING LEVEL NAVIGATION
// ==========================================
const subjectLevels = {
  "JavaScript": javascriptLevels,
  "Database": databaseLevels,
  "Python": pythonLevels,
  "C": cLevels,
  "Data Structures": dataStructuresLevels,
  "Web Development": webDevelopmentLevels
};
// Display learning levels for the selected subject
function displayJavaScriptLevels() {

  levelsContainer.innerHTML = "";

  // Select learning content for each subject
  const selectedLevels = subjectLevels[currentLearningSubject];

  // Get unlocked level for selected subject
  const unlockedLevel =
    unlockedLevels[currentLearningSubject] || 1;

  if (!selectedLevels) {
    console.error("Learning content not found:", currentLearningSubject);
    return;
  }

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

    document.getElementById("learningPathLabel").textContent =
      "DATABASE LEARNING PATH";

    document.getElementById("learningPathTitle").textContent =
      "🗄️ Database Management – 10 Levels";

    // Restore saved DBMS progress
    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (user) {
      const savedProgress =
        await loadLearningProgress(user.id, "Database");

      unlockedLevels["Database"] = savedProgress
        ? savedProgress.unlocked_level
        : 1;
    } else {
      unlockedLevels["Database"] = 1;
    }

    document.getElementById("learningPathsSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });
});

// Open Python Learning Path
document.querySelector('[data-path="python"]')
  .addEventListener("click", async () => {

    currentLearningSubject = "Python";
    currentLearningLevel = 1;

    document.getElementById("learningPathLabel").textContent =
      "PYTHON LEARNING PATH";

    document.getElementById("learningPathTitle").textContent =
      "🐍 Python Programming – 10 Levels";

    // Restore saved Python progress
    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (user) {
      const savedProgress =
        await loadLearningProgress(user.id, "Python");

      unlockedLevels["Python"] = savedProgress
        ? savedProgress.unlocked_level
        : 1;
    } else {
      unlockedLevels["Python"] = 1;
    }

    document.getElementById("learningPathsSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });
});
// Open C Programming Learning Path
document.querySelector('[data-path="c"]')
  .addEventListener("click", async () => {

    currentLearningSubject = "C";
    currentLearningLevel = 1;

    document.getElementById("learningPathLabel").textContent =
      "C PROGRAMMING LEARNING PATH";

    document.getElementById("learningPathTitle").textContent =
      "💻 C Programming – 10 Levels";

    // Restore saved C progress
    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (user) {
      const savedProgress =
        await loadLearningProgress(user.id, "C");

      unlockedLevels["C"] = savedProgress
        ? savedProgress.unlocked_level
        : 1;
    } else {
      unlockedLevels["C"] = 1;
    }

    document.getElementById("learningPathsSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });
});
// Open Data Structures Learning Path
document.querySelector('[data-path="data-structures"]')
  .addEventListener("click", async () => {

    currentLearningSubject = "Data Structures";
    currentLearningLevel = 1;

    document.getElementById("learningPathLabel").textContent =
      "DATA STRUCTURES LEARNING PATH";

    document.getElementById("learningPathTitle").textContent =
      "📚 Data Structures – 10 Levels";

    // Restore saved Data Structures progress
    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (user) {
      const savedProgress =
        await loadLearningProgress(user.id, "Data Structures");

      unlockedLevels["Data Structures"] = savedProgress
        ? savedProgress.unlocked_level
        : 1;
    } else {
      unlockedLevels["Data Structures"] = 1;
    }

    document.getElementById("learningPathsSection").hidden = true;

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });
});
// Open Web Development Learning Path
document.querySelector('[data-path="web-development"]')
  .addEventListener("click", async () => {

    currentLearningSubject = "Web Development";
    currentLearningLevel = 1;

    document.getElementById("learningPathLabel").textContent =
      "WEB DEVELOPMENT LEARNING PATH";

    document.getElementById("learningPathTitle").textContent =
      "🌐 Web Development – 10 Levels";

    // Restore saved Web Development progress
    const { data: { user } } =
      await supabaseClient.auth.getUser();

    if (user) {
      const savedProgress =
        await loadLearningProgress(user.id, "Web Development");

      unlockedLevels["Web Development"] = savedProgress
        ? savedProgress.unlocked_level
        : 1;
    } else {
      unlockedLevels["Web Development"] = 1;
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
    else if (currentLearningSubject === "Python") {
    currentLearningLevel = levelNumber;
    level = pythonLevels[levelNumber - 1];
  }
 
else if (currentLearningSubject === "C") {
  currentLearningLevel = levelNumber;
  level = cLevels[levelNumber - 1];
}
else if (currentLearningSubject === "Data Structures") {
  currentLearningLevel = levelNumber;
  level = dataStructuresLevels[levelNumber - 1];
}
else if (currentLearningSubject === "Web Development") {
  currentLearningLevel = levelNumber;
  level = webDevelopmentLevels[levelNumber - 1];
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


const selectedLevels = subjectLevels[currentLearningSubject];
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
// Select questions for the current subject and level
if (currentLearningSubject === "JavaScript") {

  questions =
    javascriptLevelQuestions[currentLearningLevel - 1];

} else if (currentLearningSubject === "Database") {

  questions =
    databaseLevelQuestions[currentLearningLevel - 1];

} else if (currentLearningSubject === "Python") {

  questions =
    pythonLevelQuestions[currentLearningLevel - 1];

} else if (currentLearningSubject === "C") {

  questions =
    cLevelQuestions[currentLearningLevel - 1];

}
else if (currentLearningSubject === "Data Structures") {
  currentLearningLevel = levelNumber;
  level = dataStructuresLevels[levelNumber - 1];
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

// Display a question for the selected subject
function displayLearningQuestion() {

  let questions;

  if (currentLearningSubject === "JavaScript") {

    questions =
      javascriptLevelQuestions[currentLearningLevel - 1];

  } else if (currentLearningSubject === "Database") {

    questions =
      databaseLevelQuestions[currentLearningLevel - 1];

  } else if (currentLearningSubject === "Python") {

    questions =
      pythonLevelQuestions[currentLearningLevel - 1];

  } else if (currentLearningSubject === "C") {

    questions =
      cLevelQuestions[currentLearningLevel - 1];

  }
  else if (currentLearningSubject === "Data Structures") {

    questions =
      dataStructuresLevelQuestions[currentLearningLevel - 1];

}
else if (currentLearningSubject === "Web Development") {

  questions =
    webDevelopmentLevelQuestions[currentLearningLevel - 1];

}

  if (!questions) {
    console.error("Questions not found for:", currentLearningSubject);
    return;
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

  let questions;

  // Select question bank
  if (currentLearningSubject === "JavaScript") {

    questions = javascriptLevelQuestions[currentJavaScriptLevel - 1];

  } else if (currentLearningSubject === "Database") {

    questions = databaseLevelQuestions[currentLearningLevel - 1];

  } else if (currentLearningSubject === "Python") {

  questions = pythonLevelQuestions[currentLearningLevel - 1];

} else if (currentLearningSubject === "C") {

  questions = cLevelQuestions[currentLearningLevel - 1];

}
else if (currentLearningSubject === "Data Structures") {

  questions = dataStructuresLevelQuestions[currentLearningLevel - 1];

}
else if (currentLearningSubject === "Web Development") {

  questions = webDevelopmentLevelQuestions[currentLearningLevel - 1];

}
  if (!questions) {
    console.error("Questions not found:", currentLearningSubject);
    return;
  }

  learningQuizFinished = true;
  clearInterval(learningTimerInterval);

  const currentLevel =
    currentLearningSubject === "JavaScript"
      ? currentJavaScriptLevel
      : currentLearningLevel;

  // Calculate score
  let score = 0;

  questions.forEach((question, index) => {
    if (learningSelectedAnswers[index] === question.answer) {
      score++;
    }
  });

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  // Save quiz result
  const { data: { user }, error: userError } =
    await supabaseClient.auth.getUser();

  if (user && !userError) {

    const { error: resultSaveError } =
      await supabaseClient
        .from("quiz_results")
        .insert([{
          user_id: user.id,
          quiz_name: `${currentLearningSubject} Learning Path - Level ${currentLevel}`,
          score: score,
          total_questions: questions.length,
          percentage: percentage
        }]);

    if (resultSaveError) {
      console.error("Learning quiz result saving error:", resultSaveError.message);
    }
        else {
      console.log("Learning quiz result saved successfully!");
    }
  }

  // Check passing score
  const passed = score >= 3;

  // Unlock next level
  if (passed && currentLevel < 10) {

    if (currentLearningSubject === "JavaScript") {

      unlockedJavaScriptLevel = Math.max(
        unlockedJavaScriptLevel,
        currentLevel + 1
      );

      unlockedLevels["JavaScript"] = Math.max(
        unlockedLevels["JavaScript"] || 1,
        currentLevel + 1
      );

    } else {

      unlockedLevels[currentLearningSubject] = Math.max(
        unlockedLevels[currentLearningSubject] || 1,
        currentLevel + 1
      );
    }
  }

  // Save progress
  if (passed) {

    if (currentLearningSubject === "JavaScript") {
      await saveJavaScriptProgress();
    } else {
      await saveLearningProgress(
        currentLearningSubject,
        currentLevel,
        unlockedLevels[currentLearningSubject]
      );
    }
  }

  // Hide questions
  document.getElementById("learningQuestionProgress").hidden = true;
  document.getElementById("learningQuestionText").hidden = true;
  document.getElementById("learningAnswerOptions").hidden = true;
  document.getElementById("learningPreviousBtn").hidden = true;
  document.getElementById("learningNextBtn").hidden = true;
  document.getElementById("learningSubmitBtn").hidden = true;

  // Display result
  const resultSection =
    document.getElementById("learningQuizResult");

  resultSection.hidden = false;

  const oldMessage =
    resultSection.querySelector(".learning-pass-message");

  if (oldMessage) oldMessage.remove();

  document.getElementById("learningScoreText").textContent =
    `You scored ${score} out of ${questions.length} (${percentage}%).`;

  const resultMessage = document.createElement("p");
  resultMessage.className = "learning-pass-message";

  resultMessage.textContent = passed
    ? currentLevel === 10
      ? `🎉 Congratulations! You completed all 10 ${currentLearningSubject} levels!`
      : "🎉 Excellent! You unlocked the next level!"
    : "Keep practising! You need at least 3 correct answers to unlock the next level.";

  resultSection.insertBefore(
    resultMessage,
    document.getElementById("learningReviewBtn")
  );

  resultSection.scrollIntoView({ behavior: "smooth" });
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
    else if (currentLearningSubject === "Python") {
  questions =
    pythonLevelQuestions[currentLearningLevel - 1];
}
else if (currentLearningSubject === "C") {

  questions =
    cLevelQuestions[currentLearningLevel - 1];

}
else if (currentLearningSubject === "Data Structures") {

  questions =
    dataStructuresLevelQuestions[currentLearningLevel - 1];

}
else if (currentLearningSubject === "Web Development") {

  questions =
    webDevelopmentLevelQuestions[currentLearningLevel - 1];

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

    document.getElementById("javascriptLevelsSection").hidden = false;

    displayJavaScriptLevels();

    document.getElementById("javascriptLevelsSection")
      .scrollIntoView({ behavior: "smooth" });

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
// PYTHON EXAMINATION - DISPLAY ALL QUESTIONS
// ==========================================

function displayAllPythonExaminationQuestions() {

  const container = document.getElementById(
    "pythonExaminationQuestionsContainer"
  );

  container.innerHTML = "";

  pythonExaminationQuestions.forEach((question, qIndex) => {

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
      radio.name = `pythonExaminationQuestion${qIndex}`;
      radio.value = optionIndex;

      radio.checked =
        pythonExaminationAnswers[qIndex] === optionIndex;

      radio.addEventListener("change", () => {

        pythonExaminationAnswers[qIndex] = optionIndex;

        savePythonExaminationProgress(
          pythonExaminationUserId
        );

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
// C PROGRAMMING EXAMINATION - DISPLAY ALL QUESTIONS
// ==========================================

function displayAllCExaminationQuestions() {

  const container = document.getElementById(
    "cExaminationQuestionsContainer"
  );

  container.innerHTML = "";

  cExaminationQuestions.forEach((question, qIndex) => {

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
      radio.name = `cExaminationQuestion${qIndex}`;
      radio.value = optionIndex;

      radio.checked =
        cExaminationAnswers[qIndex] === optionIndex;

      radio.addEventListener("change", () => {

        cExaminationAnswers[qIndex] = optionIndex;

        saveCExaminationProgress(
          cExaminationUserId
        );

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
// DATA STRUCTURES EXAMINATION - DISPLAY ALL QUESTIONS
// ==========================================

function displayAllDataStructuresExaminationQuestions() {

  const container = document.getElementById(
    "dataStructuresExaminationQuestionsContainer"
  );

  container.innerHTML = "";

  dataStructuresExaminationQuestions.forEach((question, qIndex) => {

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
      radio.name = `dataStructuresExaminationQuestion${qIndex}`;
      radio.value = optionIndex;

      radio.checked =
        dataStructuresExaminationAnswers[qIndex] === optionIndex;

      radio.addEventListener("change", () => {

        dataStructuresExaminationAnswers[qIndex] = optionIndex;

        saveDataStructuresExaminationProgress(
          dataStructuresExaminationUserId
        );

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
// WEB DEVELOPMENT EXAMINATION - DISPLAY ALL QUESTIONS
// ==========================================

function displayAllWebDevelopmentExaminationQuestions() {

  const container = document.getElementById(
    "webDevelopmentExaminationQuestionsContainer"
  );

  container.innerHTML = "";

  webDevelopmentExaminationQuestions.forEach((question, qIndex) => {

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
      radio.name = `webDevelopmentExaminationQuestion${qIndex}`;
      radio.value = optionIndex;

      radio.checked =
        webDevelopmentExaminationAnswers[qIndex] === optionIndex;

      radio.addEventListener("change", () => {

        webDevelopmentExaminationAnswers[qIndex] = optionIndex;

        saveWebDevelopmentExaminationProgress(
          webDevelopmentExaminationUserId
        );

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

  if (!document.hidden) return;

  // PYTHON EXAMINATION SECURITY

  const pythonExamSection = document.getElementById(
    "pythonExaminationQuizSection"
  );

  if (
    pythonExamSection &&
    !pythonExamSection.hidden &&
    !pythonExaminationSubmitted
  ) {

    pythonExaminationTabSwitchCount++;

    savePythonExaminationProgress(pythonExaminationUserId);

    if (pythonExaminationTabSwitchCount >= 3) {

      alert("🚫 Maximum tab-switch limit reached! Your Python examination will be submitted automatically.");

      finishPythonExamination();

    } else {

      alert(`⚠️ Python Examination Warning ${pythonExaminationTabSwitchCount}/3!`);

    }

    return;
  }

  // C PROGRAMMING EXAMINATION SECURITY

  const cExamSection = document.getElementById(
    "cExaminationQuizSection"
  );

  if (
    cExamSection &&
    !cExamSection.hidden &&
    !cExaminationSubmitted
  ) {

    cExaminationTabSwitchCount++;

    saveCExaminationProgress(cExaminationUserId);

    if (cExaminationTabSwitchCount >= 3) {

      alert("🚫 Maximum tab-switch limit reached! Your C Programming examination will be submitted automatically.");

      finishCExamination();

    } else {

      alert(`⚠️ C Programming Examination Warning ${cExaminationTabSwitchCount}/3!`);

    }

    return;
  }
// DATA STRUCTURES EXAMINATION SECURITY

const dataStructuresExamSection = document.getElementById(
  "dataStructuresExaminationQuizSection"
);

if (
  dataStructuresExamSection &&
  !dataStructuresExamSection.hidden &&
  !dataStructuresExaminationSubmitted
) {

  dataStructuresExaminationTabSwitchCount++;

  saveDataStructuresExaminationProgress(
    dataStructuresExaminationUserId
  );

  if (dataStructuresExaminationTabSwitchCount >= 3) {

    alert("🚫 Maximum tab-switch limit reached! Your Data Structures examination will be submitted automatically.");

    finishDataStructuresExamination();

  } else {

    alert(`⚠️ Data Structures Examination Warning ${dataStructuresExaminationTabSwitchCount}/3!`);

  }

  return;
}
// WEB DEVELOPMENT EXAMINATION SECURITY

const webDevelopmentExamSection = document.getElementById(
  "webDevelopmentExaminationQuizSection"
);

if (
  webDevelopmentExamSection &&
  !webDevelopmentExamSection.hidden &&
  !webDevelopmentExaminationSubmitted
) {

  webDevelopmentExaminationTabSwitchCount++;

  saveWebDevelopmentExaminationProgress(
    webDevelopmentExaminationUserId
  );

  if (webDevelopmentExaminationTabSwitchCount >= 3) {

    alert(
      "🚫 Maximum tab-switch limit reached! Your Web Development examination will be submitted automatically."
    );

    finishWebDevelopmentExamination();

  } else {

    alert(
      `⚠️ Web Development Examination Warning ${webDevelopmentExaminationTabSwitchCount}/3!`
    );

  }

  return;
}
  // JAVA EXAMINATION SECURITY

  const examSection = document.getElementById(
    "examinationQuizSection"
  );

  if (
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

      alert(`⚠️ Java Examination Warning ${examinationTabSwitchCount}/3!`);

    }

  }

});
// ==========================================
// EXAMINATION REFRESH AND CLOSE PROTECTION
// ==========================================

window.addEventListener("beforeunload", function (event) {

  const javaExamSection = document.getElementById(
    "examinationQuizSection"
  );

  const pythonExamSection = document.getElementById(
    "pythonExaminationQuizSection"
  );

  const cExamSection = document.getElementById(
    "cExaminationQuizSection"
  );

  const dataStructuresExamSection = document.getElementById(
    "dataStructuresExaminationQuizSection"
  );

  const webDevelopmentExamSection = document.getElementById(
    "webDevelopmentExaminationQuizSection"
  );

  const javaExamActive =
    javaExamSection &&
    !javaExamSection.hidden &&
    !examinationSubmitted;

  const pythonExamActive =
    pythonExamSection &&
    !pythonExamSection.hidden &&
    !pythonExaminationSubmitted;

  const cExamActive =
    cExamSection &&
    !cExamSection.hidden &&
    !cExaminationSubmitted;

  const dataStructuresExamActive =
    dataStructuresExamSection &&
    !dataStructuresExamSection.hidden &&
    !dataStructuresExaminationSubmitted;

  const webDevelopmentExamActive =
    webDevelopmentExamSection &&
    !webDevelopmentExamSection.hidden &&
    !webDevelopmentExaminationSubmitted;

  if (
    javaExamActive ||
    pythonExamActive ||
    cExamActive ||
    dataStructuresExamActive ||
    webDevelopmentExamActive
  ) {

    event.preventDefault();
    event.returnValue = "";

  }

});
// ==================================
// STUDENT PROFILE - SAVE DETAILS
// ==================================

document.getElementById("studentProfileForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.getElementById("profileMessage");
  message.textContent = "Saving your profile...";

  const { data: { user }, error: userError } =
    await supabaseClient.auth.getUser();

  if (userError || !user) {
    message.textContent = "Please log in first.";
    return;
  }

  const { data: existingProfile } = await supabaseClient
    .from("student_profiles")
    .select("full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  const profileData = {
    user_id: user.id,
    full_name: existingProfile?.full_name || user.user_metadata?.full_name || user.email,
    education: document.getElementById("education").value,
    study_year: document.getElementById("studyYear").value,
    career_interest: document.getElementById("careerInterest").value,
    career_goal: document.getElementById("careerGoal").value.trim(),
    skill_level: document.getElementById("skillLevel").value
  };

  const { error } = await supabaseClient
    .from("student_profiles")
    .upsert(profileData, { onConflict: "user_id" });

  if (error) {
    console.error("Profile save error:", error);
    message.textContent = "Unable to save profile. Please try again.";
    return;
  }

  message.textContent = "✅ Your student profile has been saved successfully!";
});
// ==================================
// LEARN NEW SKILLS - NAVIGATION
// ==================================

document.getElementById("learnNewSkillsBtn")?.addEventListener("click", () => {

  document.getElementById("studentJourneySection").hidden = true;

  document.getElementById("learnNewSkillsSection").hidden = false;

  document.getElementById("learnNewSkillsSection").scrollIntoView({
    behavior: "smooth"
  });

});

// Back to Student Development Journey

document.getElementById("backFromLearnNewSkills")?.addEventListener("click", () => {

  document.getElementById("learnNewSkillsSection").hidden = true;

  document.getElementById("studentJourneySection").hidden = false;

  document.getElementById("studentJourneySection").scrollIntoView({
    behavior: "smooth"
  });

});
// ==================================
// PROGRAMMING SECTION NAVIGATION
// ==================================

document.getElementById("programmingExploreBtn").addEventListener("click", () => {

  document.getElementById("learnNewSkillsSection").hidden = true;

  document.getElementById("programmingSection").hidden = false;

  document.getElementById("programmingSection").scrollIntoView({
    behavior: "smooth"
  });

});

// Back to Learn New Skills

document.getElementById("backFromProgramming").addEventListener("click", () => {

  document.getElementById("programmingSection").hidden = true;

  document.getElementById("learnNewSkillsSection").hidden = false;

  document.getElementById("learnNewSkillsSection").scrollIntoView({
    behavior: "smooth"
  });

});
// ==========================================
// JOB-READY COURSE NAVIGATION
// ==========================================

let jobReadyPreviousSection = "programmingSection";

// Open Job-Ready Course from Programming Languages
document.getElementById("startCJobReadyBtn")?.addEventListener("click", () => {

  jobReadyPreviousSection = "programmingSection";

  document.getElementById("programmingSection").hidden = true;
  document.getElementById("cJobReadySection").hidden = false;

  document.getElementById("cJobReadySection").scrollIntoView({
    behavior: "smooth"
  });

});

// Open Job-Ready Course from Student Development Journey
document.getElementById("startJobReadyHubBtn").addEventListener("click", () => {

  jobReadyPreviousSection = "studentJourneySection";

  document.getElementById("studentJourneySection").hidden = true;
  document.getElementById("cJobReadySection").hidden = false;

  document.getElementById("cJobReadySection").scrollIntoView({
    behavior: "smooth"
  });

});

// Back to previous section
document.getElementById("backFromCJobReady").addEventListener("click", () => {

  document.getElementById("cJobReadySection").hidden = true;

  document.getElementById(jobReadyPreviousSection).hidden = false;

  document.getElementById(jobReadyPreviousSection).scrollIntoView({
    behavior: "smooth"
  });

});
// ==========================================
// COMMON JOB-READY COURSE NAVIGATION
// ==========================================

const jobReadyCourseCatalog = {
  cpp: {
    title: "C++ Programming",
    description: "Learn OOP, STL, algorithms and problem-solving."
  },
  java: {
    title: "Java Programming",
    description: "Learn Core Java, OOP, collections and application development."
  },
  python: {
    title: "Python Programming",
    description: "Learn Python fundamentals, automation and practical projects."
  },
  html: {
    title: "HTML",
    description: "Learn to build professional web page structures."
  },
  css: {
    title: "CSS",
    description: "Learn responsive layouts and modern web design."
  },
  javascript: {
    title: "JavaScript",
    description: "Learn interactive websites and dynamic programming."
  },
  fullstack: {
    title: "Full Stack Web Development",
    description: "Learn frontend, backend, databases and deployment."
  },
  sql: {
    title: "SQL & Database Management",
    description: "Learn SQL queries, database design and management."
  },
  dsa: {
    title: "Data Structures & Algorithms",
    description: "Develop problem-solving and interview skills."
  },
  aiml: {
    title: "AI & Machine Learning",
    description: "Explore artificial intelligence and machine learning."
  },
  cloud: {
    title: "Cloud Computing",
    description: "Learn cloud platforms, deployment and infrastructure."
  },
  cybersecurity: {
    title: "Cybersecurity",
    description: "Learn network security and protection fundamentals."
  },
  git: {
    title: "Git & GitHub",
    description: "Learn version control and collaborative development."
  }
};

// Open selected technical course
document.querySelectorAll("[data-job-course]").forEach(button => {

  button.addEventListener("click", () => {

    const courseKey = button.dataset.jobCourse;
    const course = jobReadyCourseCatalog[courseKey];

    if (!course) return;

    document.getElementById("technicalCoursesHeading").hidden = true;
    document.getElementById("technicalCoursesGrid").hidden = true;

    document.getElementById("nonTechnicalCoursesHeading").hidden = true;
    document.getElementById("nonTechnicalCoursesGrid").hidden = true;

    document.getElementById("backFromCJobReady").hidden = true;

    document.getElementById("jobReadyCourseTitle").textContent =
      course.title;

    document.getElementById("jobReadyCourseDescription").textContent =
      course.description;

    document.getElementById("jobReadyCourseView").hidden = false;

    document.getElementById("jobReadyLevelContent").hidden = true;

    document.getElementById("jobReadyLevelsGrid").innerHTML = "";

  for (let level = 1; level <= 10; level++) {

  document.getElementById("jobReadyLevelsGrid").innerHTML += `
    <article class="community-card">
      <h3>Level ${level}</h3>
      <p>${course.title} – Professional Learning</p>

      <button class="primary-btn" data-job-level="${level}">
        Start Level ${level} →
      </button>
    </article>
  `;

}

    document.getElementById("jobReadyCourseView").scrollIntoView({
      behavior: "smooth"
    });
// Open selected job-ready level
document.querySelectorAll("[data-job-level]").forEach(button => {

  button.addEventListener("click", () => {

    const level = Number(button.dataset.jobLevel);

    document.getElementById("jobReadyLevelsGrid").hidden = true;

    document.getElementById("jobReadyLevelContent").hidden = false;

    document.getElementById("jobReadyLevelTitle").textContent =
      `Level ${level}: ${course.title}`;

    document.getElementById("jobReadyLessons").innerHTML = `
      <article class="community-card">
        <h3>📘 Level ${level} Learning Content</h3>
        <p>Professional lessons and practical exercises will be added here.</p>
      </article>
    `;

    document.getElementById("jobReadyAssessment").innerHTML = `
      <article class="community-card">
        <h3>📝 Level ${level} Assessment</h3>
        <p>Assessment questions will be added here.</p>
      </article>
    `;

    document.getElementById("backToJobReadyLevels").hidden = false;

    document.getElementById("jobReadyLevelContent").scrollIntoView({
      behavior: "smooth"
    });

  });

});
  });

});

// Back to all courses
document.getElementById("backToJobReadyCourses")
  .addEventListener("click", () => {

    document.getElementById("jobReadyCourseView").hidden = true;

    document.getElementById("technicalCoursesHeading").hidden = false;
    document.getElementById("technicalCoursesGrid").hidden = false;

    document.getElementById("nonTechnicalCoursesHeading").hidden = false;
    document.getElementById("nonTechnicalCoursesGrid").hidden = false;

    document.getElementById("backFromCJobReady").hidden = false;

    document.getElementById("cJobReadySection").scrollIntoView({
      behavior: "smooth"
    });

  });
  // Back to Job-Ready Levels
document.getElementById("backToJobReadyLevels")
  .addEventListener("click", () => {

    document.getElementById("jobReadyLevelContent").hidden = true;

    document.getElementById("jobReadyLevelsGrid").hidden = false;

    document.getElementById("backToJobReadyLevels").hidden = true;

    document.getElementById("jobReadyLevelsGrid").scrollIntoView({
      behavior: "smooth"
    });

  });
// ==========================================
// C PROGRAMMING - STUDENT DEVELOPMENT JOURNEY
// ==========================================

document.getElementById("startCLearningBtn").addEventListener("click", async () => {

  // Select C Programming
  currentLearningSubject = "C";
  currentLearningLevel = 1;

  // Update headings
  document.getElementById("learningPathLabel").textContent =
    "C PROGRAMMING LEARNING PATH";

  document.getElementById("learningPathTitle").textContent =
    "💻 C Programming – 10 Levels";

  // Restore saved C progress
  const { data: { user } } =
    await supabaseClient.auth.getUser();

  if (user) {
    const savedProgress =
      await loadLearningProgress(user.id, "C");

    unlockedLevels["C"] = savedProgress
      ? savedProgress.unlocked_level
      : 1;
  } else {
    unlockedLevels["C"] = 1;
  }

  // Open existing 10-level learning system
  document.getElementById("programmingSection").hidden = true;

  document.getElementById("javascriptLevelsSection").hidden = false;

  displayJavaScriptLevels();

  document.getElementById("javascriptLevelsSection")
    .scrollIntoView({ behavior: "smooth" });

});
// ==========================================
// C PROGRAMMING COURSE NAVIGATION
// ==========================================

// Open C Programming from Job-Ready Hub
document.getElementById("openCJobCourseBtn").addEventListener("click", () => {

  document.getElementById("cJobReadySection").hidden = true;

  document.getElementById("cJobCourseSection").hidden = false;

  document.getElementById("cJobCourseSection").scrollIntoView({
    behavior: "smooth"
  });

});

// Back to Job-Ready Hub
document.getElementById("backFromCJobCourse").addEventListener("click", () => {

  document.getElementById("cJobCourseSection").hidden = true;

  document.getElementById("cJobReadySection").hidden = false;

  document.getElementById("cJobReadySection").scrollIntoView({
    behavior: "smooth"
  });

});
// ======================================================
// QUIZCONNECT - C PROGRAMMING JOB-READY COURSE
// COMPLETE 10 LEVEL LEARNING SYSTEM
// ======================================================

const cJobCourseSection = document.getElementById("cJobCourseSection");
const cJobLevelContent = document.getElementById("cJobLevelContent");
const cJobLevelTitle = document.getElementById("cJobLevelTitle");
const cJobLevelLessons = document.getElementById("cJobLevelLessons");

const cJobLevelsGrid = document.querySelector(
  "#cJobCourseSection .community-grid"
);

const cJobProgressKey = "quizconnect_c_job_ready_progress_v1";

let cJobProgress = {
  unlockedLevel: 1,
  completedLevels: [],
  scores: {}
};

// Restore saved progress
try {
  const saved = JSON.parse(localStorage.getItem(cJobProgressKey));

  if (saved) {
    cJobProgress = {
      unlockedLevel: Math.min(10, Math.max(1, saved.unlockedLevel || 1)),
      completedLevels: Array.isArray(saved.completedLevels)
        ? saved.completedLevels
        : [],
      scores: saved.scores || {}
    };
  }
} catch (error) {
  console.warn("Could not restore C Job-Ready progress.", error);
}

function saveCJobProgress() {
  localStorage.setItem(
    cJobProgressKey,
    JSON.stringify(cJobProgress)
  );
}

// ======================================================
// COURSE CONTENT - ALL 10 LEVELS
// ======================================================

const cJobCourseData = [

{
  title: "C Fundamentals & Environment Setup",

  lessons: [
    {
      title: "Introduction to C",
      text: "C is a general-purpose, procedural programming language. It is widely used in operating systems, embedded systems, compilers and performance-oriented software. It gives programmers control over memory and system resources."
    },
    {
      title: "Setting Up the Environment",
      text: "A C development environment contains a text editor or IDE and a compiler. GCC is a popular compiler. Save source files with the .c extension, compile them and execute the generated program."
    },
    {
      title: "Your First C Program",
      text: "Understand the header file, main function, printf statement, braces and return statement.",
      code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
    }
  ],

  exercise: "Write a program to display your name, college and branch.",

  assignment: "Create a personal introduction program that displays your name, college, branch and career goal.",

  questions: [
    ["Who developed the C programming language?", ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"], 1, "Dennis Ritchie developed C at Bell Labs."],
    ["Which header file is used for printf()?", ["stdlib.h", "string.h", "stdio.h", "math.h"], 2, "stdio.h provides standard input and output functions."],
    ["Where does execution of a C program begin?", ["printf()", "main()", "return()", "include()"], 1, "Execution begins in the main function."],
    ["Which extension is normally used for C source files?", [".java", ".py", ".html", ".c"], 3, "C source files normally use the .c extension."],
    ["What does printf() do?", ["Reads a file", "Displays output", "Declares variables", "Stops execution"], 1, "printf() displays formatted output."]
  ]
},

{
  title: "Variables, Data Types & Memory",

  lessons: [
    {
      title: "Variables and Constants",
      text: "A variable is a named memory location used to store a value. Variables must be declared with a data type. Constants represent values that should not be changed during program execution."
    },
    {
      title: "Data Types",
      text: "C provides int for integers, char for characters, float for decimal values and double for higher-precision floating-point values."
    },
    {
      title: "Memory and sizeof",
      text: "Variables occupy memory according to their data types and implementation. The sizeof operator returns the size of a type or object in bytes.",
      code: '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float marks = 85.5;\n\n    printf("%d\\n", age);\n    printf("%.1f\\n", marks);\n    printf("%zu", sizeof(age));\n\n    return 0;\n}'
    }
  ],

  exercise: "Declare variables to store your age, percentage, name initial and college name.",

  assignment: "Create a student information program using appropriate C data types.",

  questions: [
    ["Which data type stores whole numbers?", ["float", "int", "char", "double"], 1, "int stores integer values."],
    ["Which data type stores a single character?", ["int", "float", "char", "double"], 2, "char stores character values."],
    ["Which keyword makes a variable read-only after initialization?", ["static", "const", "extern", "register"], 1, "const prevents modification through that identifier."],
    ["Which operator returns the size of a variable?", ["length", "size", "sizeof", "memory"], 2, "sizeof returns size in bytes."],
    ["Which format specifier is commonly used for int?", ["%f", "%c", "%d", "%s"], 2, "%d is commonly used to print an int."]
  ]
},

{
  title: "Operators & Problem-Solving",

  lessons: [
    {
      title: "Arithmetic Operators",
      text: "Arithmetic operators include +, -, *, / and %. They perform addition, subtraction, multiplication, division and remainder operations."
    },
    {
      title: "Relational and Logical Operators",
      text: "Relational operators compare values. Logical operators &&, || and ! combine or reverse logical conditions."
    },
    {
      title: "Assignment and Increment Operators",
      text: "Assignment operators store values. Increment and decrement operators increase or decrease a variable by one.",
      code: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    printf("%d\\n", a + b);\n    printf("%d\\n", a % b);\n    return 0;\n}'
    }
  ],

  exercise: "Write a program to calculate the sum, difference, product and remainder of two integers.",

  assignment: "Build a simple calculator using arithmetic operators.",

  questions: [
    ["Which operator calculates the remainder?", [" / ", "%", "*", "+"], 1, "% is the modulus operator."],
    ["Which operator means logical AND?", ["||", "!", "&&", "&"], 2, "&& represents logical AND."],
    ["Which operator checks equality?", ["=", "==", "!=", ">"], 1, "== compares two values."],
    ["What does ++ do?", ["Subtracts one", "Adds one", "Multiplies by two", "Divides by two"], 1, "The increment operator increases a value by one."]
  ]
},

{
  title: "Conditional Statements",

  lessons: [
    {
      title: "if Statement",
      text: "The if statement executes a block of code when a specified condition is true."
    },
    {
      title: "if-else and else-if",
      text: "if-else selects between two alternatives. An else-if ladder checks multiple conditions in sequence."
    },
    {
      title: "switch Statement",
      text: "The switch statement selects a matching case from multiple choices. The break statement prevents unintended fall-through.",
      code: '#include <stdio.h>\n\nint main() {\n    int age = 20;\n\n    if (age >= 18) {\n        printf("Eligible");\n    } else {\n        printf("Not eligible");\n    }\n\n    return 0;\n}'
    }
  ],

  exercise: "Write a program to check whether a number is positive, negative or zero.",

  assignment: "Create a student grading system using if-else conditions.",

  questions: [
    ["Which statement is used for decision-making?", ["for", "if", "while", "goto"], 1, "if executes code based on a condition."],
    ["Which keyword handles the alternative branch?", ["case", "else", "break", "continue"], 1, "else handles the alternative path."],
    ["Which statement supports multiple fixed-value choices?", ["switch", "while", "do", "return"], 0, "switch selects among matching cases."],
    ["Which keyword exits a switch case?", ["stop", "exit", "break", "continue"], 2, "break exits the switch statement."],
    ["What is the result of 5 > 3?", ["False", "True", "0", "Error"], 1, "5 is greater than 3."]
  ]
},

{
  title: "Loops & Coding Challenges",

  lessons: [
    {
      title: "for Loop",
      text: "A for loop is useful when the number of repetitions is known. It contains initialization, a condition and an update expression."
    },
    {
      title: "while and do-while",
      text: "A while loop checks its condition before execution. A do-while loop executes its body at least once before checking the condition."
    },
    {
      title: "break and continue",
      text: "break terminates a loop. continue skips the remaining statements in the current iteration and proceeds to the next iteration.",
      code: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}'
    }
  ],

  exercise: "Print numbers from 1 to 100 and calculate their sum.",

  assignment: "Create a multiplication table generator and a number guessing game.",

  questions: [
    ["Which loop is suitable when repetitions are known?", ["for", "switch", "if", "goto"], 0, "for loops commonly handle a known number of repetitions."],
    ["Which loop executes at least once?", ["for", "while", "do-while", "none"], 2, "do-while checks its condition after executing the body."],
    ["Which keyword terminates a loop?", ["continue", "break", "skip", "next"], 1, "break exits the loop."],
    ["What does continue do?", ["Ends the program", "Exits the loop", "Skips the current iteration", "Restarts the computer"], 2, "continue skips to the next iteration."],
    ["What is an infinite loop?", ["A loop that never executes", "A loop that never ends", "A loop with one iteration", "A syntax error"], 1, "An infinite loop continues without reaching its exit condition."]
  ]
},

{
  title: "Functions & Modular Programming",

  lessons: [
    {
      title: "Introduction to Functions",
      text: "Functions divide a program into reusable blocks. They improve organization, readability, testing and maintenance."
    },
    {
      title: "Function Declaration and Definition",
      text: "A function declaration tells the compiler about the function. Its definition contains the statements that perform the task."
    },
    {
      title: "Parameters and Return Values",
      text: "Functions can receive arguments and return values. C passes ordinary arguments by value.",
      code: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf("%d", add(5, 3));\n    return 0;\n}'
    }
  ],

  exercise: "Create separate functions to calculate the area of a rectangle and a circle.",

  assignment: "Build a menu-driven calculator using user-defined functions.",

  questions: [
    ["What is a function?", ["A reusable block of code", "A data type", "A compiler", "A loop"], 0, "Functions organize reusable program logic."],
    ["Which keyword returns a value from a function?", ["break", "return", "continue", "goto"], 1, "return sends a value back to the caller."],
    ["What is a function prototype?", ["A function call", "A declaration", "A loop", "A variable"], 1, "A prototype declares a function's interface."],
    ["Which function is the usual entry point?", ["start()", "run()", "main()", "begin()"], 2, "main() is the program entry point."],
    ["What is recursion?", ["A loop only", "A function calling itself", "A compiler error", "A data type"], 1, "Recursion occurs when a function calls itself."]
  ]
},

{
  title: "Arrays & Strings",

  lessons: [
    {
      title: "One-Dimensional Arrays",
      text: "An array stores multiple elements of the same type in contiguous memory. Array indexing begins at zero."
    },
    {
      title: "Multidimensional Arrays",
      text: "A two-dimensional array represents tabular data using rows and columns. It is useful for matrices and tables."
    },
    {
      title: "Strings and String Functions",
      text: "A C string is a character array terminated by the null character '\\0'. The string.h library provides functions such as strlen, strcpy, strcmp and strcat.",
      code: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char name[] = "QuizConnect";\n    printf("%zu", strlen(name));\n    return 0;\n}'
    }
  ],

  exercise: "Find the largest and smallest elements in an integer array.",

  assignment: "Create a student marks management program using arrays and strings.",

  questions: [
    ["What is the first valid index of a C array?", ["1", "-1", "0", "2"], 2, "C arrays use zero-based indexing."],
    ["Which character terminates a C string?", ["\\n", "\\0", "\\t", "\\r"], 1, "The null character terminates a C string."],
    ["Which header provides strlen()?", ["stdio.h", "stdlib.h", "string.h", "math.h"], 2, "strlen is declared in string.h."],
    ["How many elements are in int a[5]?", ["4", "5", "6", "Depends on input"], 1, "The array has five elements."],
    ["Which function compares two strings?", ["strcpy()", "strcat()", "strlen()", "strcmp()"], 3, "strcmp compares two strings."]
  ]
},

{
  title: "Pointers & Dynamic Memory",

  lessons: [
    {
      title: "Introduction to Pointers",
      text: "A pointer is a variable that stores a memory address. The address-of operator & obtains an object's address."
    },
    {
      title: "Pointer Operations",
      text: "The dereference operator * accesses the value stored at the address held by a pointer. Pointer types should match the objects they point to."
    },
    {
      title: "Dynamic Memory Allocation",
      text: "malloc, calloc, realloc and free manage dynamically allocated memory. Always check allocation results and release memory when it is no longer needed.",
      code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = malloc(sizeof(int));\n\n    if (p == NULL) return 1;\n\n    *p = 25;\n    printf("%d", *p);\n\n    free(p);\n    return 0;\n}'
    }
  ],

  exercise: "Write a program to swap two integers using pointers.",

  assignment: "Build a dynamic student records program using dynamically allocated memory.",

  questions: [
    ["What does a pointer store?", ["A character only", "A memory address", "A loop", "A file"], 1, "A pointer stores an address."],
    ["Which operator gets a variable's address?", ["*", "&", "%", "#"], 1, "& is the address-of operator."],
    ["Which operator dereferences a pointer?", ["&", "*", "!", "%"], 1, "* accesses the pointed-to value."],
    ["Which function releases allocated memory?", ["malloc()", "calloc()", "free()", "sizeof()"], 2, "free releases dynamically allocated memory."],
    ["What should you check after malloc()?", ["Whether it returned NULL", "Whether it printed text", "Whether it changed the compiler", "Nothing"], 0, "Allocation can fail, so check for NULL."]
  ]
},

{
  title: "Structures, File Handling & Debugging",

  lessons: [
    {
      title: "Structures",
      text: "A structure groups related variables of different data types under one name. Structure members are accessed using the dot operator."
    },
    {
      title: "File Handling",
      text: "C uses FILE pointers and functions such as fopen, fprintf, fscanf, fgets and fclose to work with files. Always check whether fopen succeeded."
    },
    {
      title: "Debugging and Error Handling",
      text: "Debugging involves identifying and correcting errors. Compiler warnings, careful testing and debugging tools help locate problems.",
      code: '#include <stdio.h>\n\nstruct Student {\n    int id;\n    char grade;\n};\n\nint main() {\n    struct Student s = {101, \'A\'};\n    printf("%d %c", s.id, s.grade);\n    return 0;\n}'
    }
  ],

  exercise: "Create a structure to store student ID, name and marks.",

  assignment: "Build a student record management program with file storage and retrieval.",

  questions: [
    ["Which keyword defines a structure?", ["class", "struct", "record", "object"], 1, "struct defines a structure."],
    ["Which operator accesses a structure member?", [".", "->", "&", "%"], 0, "The dot operator accesses a member through a structure variable."],
    ["Which function opens a file?", ["fopen()", "fclose()", "fprintf()", "fread()"], 0, "fopen opens a file."],
    ["Which function closes a file?", ["fopen()", "fclose()", "printf()", "malloc()"], 1, "fclose closes an opened file."],
    ["What is debugging?", ["Writing comments", "Finding and fixing errors", "Installing software", "Deleting files"], 1, "Debugging identifies and corrects program errors."]
  ]
},

{
  title: "Industry-Style Projects",

  lessons: [
    {
      title: "Project Planning",
      text: "Identify the problem, define requirements, design the program, divide work into functions and plan how data will be stored."
    },
    {
      title: "Building Reliable Applications",
      text: "Validate user input, handle file errors, manage memory carefully and test normal as well as unusual inputs."
    },
    {
      title: "Code Quality and Documentation",
      text: "Use meaningful names, consistent formatting, modular functions and comments where necessary. Document how to compile and run your project."
    }
  ],

  exercise: "Design a menu-driven application with at least three operations.",

  assignment: "Complete one industry-style C project and document its problem statement, features, source code, test cases and output.",

  questions: [
    ["What is the first step in project development?", ["Coding immediately", "Understanding requirements", "Deleting files", "Deploying"], 1, "Requirements should be understood before implementation."],
    ["Why are functions useful in large projects?", ["They reduce organization", "They improve modularity", "They remove all bugs", "They replace data types"], 1, "Functions divide a program into manageable components."],
    ["What is input validation?", ["Checking user input", "Deleting input", "Ignoring errors", "Changing the compiler"], 0, "Input validation checks whether entered data is acceptable."],
    ["Why should allocated memory be freed?", ["To release resources", "To increase file size", "To stop compilation", "To change a variable"], 0, "free releases dynamically allocated memory."],
    ["What should project documentation contain?", ["Only the title", "Requirements, features and usage instructions", "Only screenshots", "No information"], 1, "Documentation explains the project and how to use it."]
  ]
}

];

// ======================================================
// UPDATE LEVEL LOCKS AND COMPLETION STATUS
// ======================================================

function updateCJobLevelButtons() {

  document.querySelectorAll("[data-c-job-level]").forEach(button => {

    const level = Number(button.dataset.cJobLevel);

    const completed = cJobProgress.completedLevels.includes(level);

    button.disabled = level > cJobProgress.unlockedLevel;

    if (button.dataset.originalText === undefined) {
      button.dataset.originalText = button.textContent;
    }

    if (completed) {
      button.textContent = `✅ Review Level ${level}`;
    } else if (button.disabled) {
      button.textContent = `🔒 Level ${level} Locked`;
    } else {
      button.textContent = `Start Level ${level}`;
    }

  });

}

// ======================================================
// OPEN ANY UNLOCKED LEVEL
// ======================================================

function openCJobLevel(levelNumber) {

  if (
    levelNumber < 1 ||
    levelNumber > 10 ||
    levelNumber > cJobProgress.unlockedLevel
  ) {
    return;
  }

  const level = cJobCourseData[levelNumber - 1];

  cJobLevelsGrid.hidden = true;
  cJobLevelContent.hidden = false;

  cJobLevelTitle.textContent =
    `Level ${levelNumber}: ${level.title}`;

  let html = "";

  level.lessons.forEach((lesson, index) => {

    html += `
      <article class="community-card">
        <h3>📘 Lesson ${index + 1}: ${lesson.title}</h3>
        <p>${lesson.text}</p>

        ${lesson.code ? `
          <pre><code>${lesson.code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre>
        ` : ""}
      </article>
    `;

  });

  html += `
    <article class="community-card">
      <h3>📝 Practical Exercise</h3>
      <p>${level.exercise}</p>
    </article>

    <article class="community-card">
      <h3>🎯 Level ${levelNumber} Assignment</h3>
      <p>${level.assignment}</p>
    </article>

    <article class="community-card">
      <h3>🧠 Level ${levelNumber} Assessment</h3>
      <p>Answer all five questions. You need at least 4 correct answers to pass.</p>

      <button class="primary-btn" id="startCJobAssessment">
        Start Assessment →
      </button>
    </article>

    <div id="cJobAssessmentArea"></div>
  `;

  cJobLevelLessons.innerHTML = html;

  document.getElementById("startCJobAssessment")
    .addEventListener("click", () => {
      startCJobAssessment(levelNumber);
    });

  cJobLevelContent.scrollIntoView({
    behavior: "smooth"
  });

}

// ======================================================
// LEVEL ASSESSMENT
// ======================================================

function startCJobAssessment(levelNumber) {

  const questions = cJobCourseData[levelNumber - 1].questions;

  const area = document.getElementById("cJobAssessmentArea");

  let html = `
    <h2>Level ${levelNumber} Assessment</h2>
    <p>Choose one correct answer for each question.</p>

    <form id="cJobAssessmentForm">
  `;

  questions.forEach((question, index) => {

    html += `
      <article class="community-card">
        <h3>Question ${index + 1}: ${question[0]}</h3>

        ${question[1].map((option, optionIndex) => `
          <label style="display:block; margin:10px 0;">
            <input
              type="radio"
              name="cJobQuestion${index}"
              value="${optionIndex}"
              required
            >
            ${option}
          </label>
        `).join("")}

      </article>
    `;

  });

  html += `
      <button type="submit" class="primary-btn">
        Submit Assessment
      </button>
    </form>
  `;

  area.innerHTML = html;

  document.getElementById("cJobAssessmentForm")
    .addEventListener("submit", async event => {

      event.preventDefault();

      const form = event.target;

      let score = 0;

      let feedback = "";

      questions.forEach((question, index) => {

        const selected = Number(
          new FormData(form).get(`cJobQuestion${index}`)
        );

        const correct = question[2];

        const isCorrect = selected === correct;

        if (isCorrect) {
          score++;
        }

        feedback += `
          <article class="community-card">
            <h3>
              ${isCorrect ? "✅ Correct" : "❌ Incorrect"}:
              ${question[0]}
            </h3>

            <p><strong>Correct answer:</strong>
              ${question[1][correct]}
            </p>

            <p>${question[3]}</p>
          </article>
        `;

      });

      const passed = score >= 4;

      cJobProgress.scores[levelNumber] = score;

      if (passed) {

        if (!cJobProgress.completedLevels.includes(levelNumber)) {
          cJobProgress.completedLevels.push(levelNumber);
        }

        if (levelNumber < 10) {
          cJobProgress.unlockedLevel = Math.max(
            cJobProgress.unlockedLevel,
            levelNumber + 1
          );
        }

       saveCJobProgress();

await saveLearningProgress(
  "C Programming Job Ready",
  levelNumber,
  cJobProgress.unlockedLevel
);

updateCJobLevelButtons();
      }

      area.innerHTML = `
        <article class="community-card">
          <h2>${passed ? "🎉 Assessment Passed!" : "📚 Keep Practising!"}</h2>

          <h3>Your Score: ${score}/5</h3>

          <p>${passed
            ? "Congratulations! You have passed this level."
            : "You need at least 4/5 to unlock the next level. Review the lessons and try again."
          }</p>

          <p>
            ${passed && levelNumber < 10
              ? `🔓 Level ${levelNumber + 1} is now unlocked!`
              : passed
                ? "🏆 Congratulations! You completed all 10 C Programming levels!"
                : "You can retake this assessment whenever you are ready."
            }
          </p>
        </article>

        ${feedback}

        <button class="primary-btn" id="retryCJobAssessment">
          ${passed ? "Retake Assessment" : "Try Again"}
        </button>

        <button class="secondary-btn" id="returnCJobLevels">
          Back to C Programming Levels
        </button>

        ${passed && levelNumber < 10 ? `
          <button class="primary-btn" id="continueCJobNextLevel">
            Continue to Level ${levelNumber + 1} →
          </button>
        ` : ""}
      `;

      document.getElementById("retryCJobAssessment")
        .addEventListener("click", () => {
          startCJobAssessment(levelNumber);
        });

      document.getElementById("returnCJobLevels")
        .addEventListener("click", returnToCJobLevels);

      if (passed && levelNumber < 10) {

        document.getElementById("continueCJobNextLevel")
          .addEventListener("click", () => {
            openCJobLevel(levelNumber + 1);
          });

      }

      area.scrollIntoView({
        behavior: "smooth"
      });

    });

}

// ======================================================
// LEVEL BUTTON EVENT LISTENERS
// ======================================================

document.querySelectorAll("[data-c-job-level]").forEach(button => {

  button.addEventListener("click", () => {

    const level = Number(button.dataset.cJobLevel);

    openCJobLevel(level);

  });

});

// ======================================================
// BACK TO LEVELS
// ======================================================

function returnToCJobLevels() {

  cJobLevelContent.hidden = true;
  cJobLevelsGrid.hidden = false;

  updateCJobLevelButtons();

  cJobCourseSection.scrollIntoView({
    behavior: "smooth"
  });

}

document.getElementById("backToCJobLevels")
  .addEventListener("click", returnToCJobLevels);

// Restore C Job-Ready progress from Supabase
async function restoreCJobProgress() {

  const { data: { user } } =
    await supabaseClient.auth.getUser();

  if (!user) return;

  const data = await loadLearningProgress(
    user.id,
    "C Programming Job Ready"
  );

  if (data) {

    const cloudCompleted = data.completed_levels || 0;

    const localCompleted =
      cJobProgress.completedLevels.length
        ? Math.max(...cJobProgress.completedLevels)
        : 0;

    const completed = Math.max(
      cloudCompleted,
      localCompleted
    );

    cJobProgress.completedLevels =
      Array.from({ length: completed }, (_, i) => i + 1);

    cJobProgress.unlockedLevel = Math.max(
      data.unlocked_level || 1,
      completed < 10 ? completed + 1 : 10
    );

    saveCJobProgress();
  }

  updateCJobLevelButtons();

  console.log("C Job-Ready progress restored:", cJobProgress);
}

