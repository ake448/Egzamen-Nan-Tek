import { SECTIONS } from "./questions.js";

const PASS_PERCENT = 70;
const STORAGE_KEY = "it-support-assessment.progress";
const SCHEMA_VERSION = 1;
const QUIZ_ID = "it-support-parts-a-f";
const SHARE_SCHEMA_VERSION = 1;
const QUESTIONS = SECTIONS.flatMap((section) => section.questions.map((question) => ({ ...question, sectionId: section.id })));
const app = document.querySelector("#app");
const announcements = document.querySelector("#announcements");
const validQuestionIds = new Set(QUESTIONS.map((question) => question.number));

function loadSharedSnapshot() {
  try {
    const encoded = new URLSearchParams(window.location.hash.slice(1)).get("progress");
    if (!encoded) return null;
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const snapshot = JSON.parse(new TextDecoder().decode(bytes));
    if (snapshot.quizId !== QUIZ_ID || snapshot.schemaVersion !== SHARE_SCHEMA_VERSION || !Array.isArray(snapshot.answers) || snapshot.answers.length !== QUESTIONS.length) return null;

    const answers = {};
    snapshot.answers.forEach((choiceId, index) => {
      const question = QUESTIONS[index];
      if (question && question.choices.some((choice) => choice.id === choiceId)) answers[question.number] = choiceId;
    });
    const flags = Array.isArray(snapshot.flags) ? snapshot.flags.filter((number) => validQuestionIds.has(number)) : [];
    return {
      traineeName: typeof snapshot.traineeName === "string" ? snapshot.traineeName.slice(0, 80) : "Trainee",
      sharedAt: typeof snapshot.sharedAt === "string" ? snapshot.sharedAt : "",
      answers,
      flags
    };
  } catch {
    return null;
  }
}

let sharedSnapshot = loadSharedSnapshot();

function initialState() {
  return { phase: "welcome", currentQuestion: 0, answers: {}, flags: [], traineeName: "Georgia G.", startedAt: null, completedAt: null };
}

function restoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    const saved = JSON.parse(raw);
    if (saved.schemaVersion !== SCHEMA_VERSION || saved.quizId !== QUIZ_ID) return initialState();
    const answers = {};
    for (const [questionNumber, choiceId] of Object.entries(saved.state.answers || {})) {
      const question = QUESTIONS.find((item) => item.number === Number(questionNumber));
      if (question && question.choices.some((choice) => choice.id === choiceId)) answers[questionNumber] = choiceId;
    }
    const flags = Array.isArray(saved.state.flags) ? saved.state.flags.filter((number) => validQuestionIds.has(number)) : [];
    const phase = ["quiz", "results", "review"].includes(saved.state.phase) ? saved.state.phase : "welcome";
    const currentQuestion = Number.isInteger(saved.state.currentQuestion) && saved.state.currentQuestion >= 0 && saved.state.currentQuestion < QUESTIONS.length ? saved.state.currentQuestion : 0;
    const allAnswered = Object.keys(answers).length === QUESTIONS.length;
    const restoredPhase = ["results", "review"].includes(phase) && allAnswered ? phase : phase === "quiz" && saved.state.startedAt ? "quiz" : "welcome";
    return {
      phase: restoredPhase,
      currentQuestion,
      answers,
      flags,
      traineeName: typeof saved.state.traineeName === "string" ? saved.state.traineeName.slice(0, 80) : "Georgia G.",
      startedAt: typeof saved.state.startedAt === "string" ? saved.state.startedAt : null,
      completedAt: allAnswered && typeof saved.state.completedAt === "string" ? saved.state.completedAt : null
    };
  } catch {
    return initialState();
  }
}

let state = restoreState();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      quizId: QUIZ_ID,
      state: {
        phase: state.phase,
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        flags: state.flags,
        traineeName: state.traineeName,
        startedAt: state.startedAt,
        completedAt: state.completedAt
      }
    }));
    return true;
  } catch {
    return false;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function sectionFor(id) { return SECTIONS.find((section) => section.id === id); }

function answeredCount() { return Object.keys(state.answers).length; }

function score() {
  return QUESTIONS.reduce((total, question) => total + (state.answers[question.number] === question.answer ? 1 : 0), 0);
}

function announce(message) {
  announcements.textContent = "";
  window.requestAnimationFrame(() => { announcements.textContent = message; });
}

function createShareUrl() {
  const snapshot = {
    schemaVersion: SHARE_SCHEMA_VERSION,
    quizId: QUIZ_ID,
    traineeName: state.traineeName.trim() || "Trainee",
    sharedAt: new Date().toISOString(),
    answers: QUESTIONS.map((question) => state.answers[question.number] || ""),
    flags: state.flags
  };
  const bytes = new TextEncoder().encode(JSON.stringify(snapshot));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = `progress=${encodeURIComponent(btoa(binary))}`;
  return shareUrl.href;
}

async function shareProgress() {
  const url = createShareUrl();
  try {
    if (navigator.share) {
      await navigator.share({ title: `${state.traineeName || "Trainee"}'s quiz progress`, text: "Read-only quiz progress snapshot", url });
      announce("Progress snapshot shared.");
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      announce("Progress link copied. Anyone with the link can view this snapshot.");
    } else {
      window.prompt("Copy this progress link. Anyone with it can view the snapshot:", url);
    }
  } catch (error) {
    if (error.name !== "AbortError") announce("Could not share the link. Try copying the page URL from your browser.");
  }
}

function focusQuestion() {
  app.querySelector(".question-legend")?.focus();
}

function statusMessage() {
  return persist() ? "Progress saved on this device." : "Progress could not be saved in this browser.";
}

function renderWelcome() {
  const hasSavedQuiz = state.phase !== "welcome";
  const buttonLabel = hasSavedQuiz ? "Resume assessment" : "Begin assessment";
  const answered = answeredCount();
  return `
    <section class="welcome-layout" aria-labelledby="page-title">
      <div class="welcome-copy">
        <p class="eyebrow">Practical knowledge / assessment</p>
        <h1 id="page-title" tabindex="-1">IT Support<br>Skills Check</h1>
        <p class="intro">A focused assessment across help desk fundamentals, email deliverability and DNS, and real-world client situations.</p>
        <div class="name-field">
          <label for="trainee-name">Trainee name</label>
          <input id="trainee-name" name="traineeName" type="text" maxlength="80" autocomplete="name" value="${escapeHtml(state.traineeName)}">
        </div>
        <div class="rubric" aria-label="Scoring rubric">
          <div class="rubric-item">Questions<strong>50 total</strong></div>
          <div class="rubric-item">Scoring<strong>1 point each</strong></div>
          <div class="rubric-item">Passing score<strong>35 correct (70%)</strong></div>
        </div>
        <ul class="section-list" aria-label="Assessment sections">
          ${SECTIONS.map((section) => `<li><span class="section-index">PART ${section.id}</span><span>${escapeHtml(section.title)}</span></li>`).join("")}
        </ul>
        <button class="button button-primary" type="button" data-action="start">${buttonLabel}<span aria-hidden="true">→</span></button>
        ${hasSavedQuiz ? `<span class="saved-note">${answered} of ${QUESTIONS.length} answered. Your progress is saved on this device.</span>` : ""}
      </div>
    </section>`;
}

function renderNavigator() {
  return `
    <aside class="navigator" aria-labelledby="navigator-title">
      <div class="navigator-heading">
        <h2 id="navigator-title">Question map</h2>
        <span class="navigator-count">${answeredCount()} / ${QUESTIONS.length} answered</span>
      </div>
      ${SECTIONS.map((section) => `
        <section class="navigator-section" aria-labelledby="nav-section-${section.id}">
          <h3 id="nav-section-${section.id}">Part ${section.id}</h3>
          <div class="navigator-grid">
            ${section.questions.map((question) => {
              const isCurrent = QUESTIONS[state.currentQuestion].number === question.number;
              const isAnswered = Boolean(state.answers[question.number]);
              const isFlagged = state.flags.includes(question.number);
              const classes = ["nav-question", isCurrent && "is-current", isAnswered && "is-answered", isFlagged && "is-flagged"].filter(Boolean).join(" ");
              const details = [isAnswered ? "answered" : "not answered", isFlagged ? "flagged" : "not flagged", isCurrent ? "current question" : ""].filter(Boolean).join(", ");
              return `<button class="${classes}" type="button" data-action="go" data-index="${QUESTIONS.indexOf(question)}" aria-label="Question ${question.number}, ${details}" aria-current="${isCurrent ? "step" : "false"}">${question.number}</button>`;
            }).join("")}
          </div>
        </section>`).join("")}
      <div class="navigator-legend" aria-label="Question map key">
        <span class="legend-item"><span class="legend-swatch answered" aria-hidden="true"></span>Answered</span>
        <span class="legend-item"><span class="legend-swatch flagged" aria-hidden="true"></span>Flagged</span>
      </div>
      <p class="storage-status" role="status">${escapeHtml(state.storageMessage || "Progress saves automatically on this device.")}</p>
      <button class="button button-secondary share-button" type="button" data-action="share">Share progress</button>
    </aside>`;
}

function renderQuiz() {
  const question = QUESTIONS[state.currentQuestion];
  const section = sectionFor(question.sectionId);
  const selected = state.answers[question.number];
  const isAnswered = Boolean(selected);
  const isCorrect = selected === question.answer;
  const answered = answeredCount();
  const isFlagged = state.flags.includes(question.number);
  const progress = Math.round((answered / QUESTIONS.length) * 100);
  const explanation = question.explanation ? `<p>${escapeHtml(question.explanation)}</p>` : "";
  const feedback = isAnswered ? `
    <div class="feedback ${isCorrect ? "" : "is-incorrect"}" role="status" aria-live="polite">
      <strong>${isCorrect ? "Correct" : `Not quite. The correct answer is ${question.answer}.`}</strong>
      ${explanation}
    </div>` : "";
  const previousDisabled = state.currentQuestion === 0 ? "disabled" : "";
  const nextQuestionExists = state.currentQuestion < QUESTIONS.length - 1;
  const canFinish = answered === QUESTIONS.length;
  const nextLabel = nextQuestionExists ? "Next question" : canFinish ? "See results" : "Finish assessment";
  const nextAction = nextQuestionExists ? "next" : "finish";

  return `
    <div class="quiz-layout">
      <section class="quiz-column" aria-label="Assessment question">
        <div class="progress-wrap">
          <div class="progress-copy"><span>Assessment progress</span><span>${answered} of ${QUESTIONS.length} answered</span></div>
          <div class="progress-track" role="progressbar" aria-label="Questions answered" aria-valuemin="0" aria-valuemax="${QUESTIONS.length}" aria-valuenow="${answered}" aria-valuetext="${answered} of ${QUESTIONS.length} questions answered">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <article class="question-panel">
          <div class="question-meta">
            <span class="question-count">QUESTION ${question.number} / ${QUESTIONS.at(-1).number}</span>
            <button class="bookmark-button" type="button" data-action="flag" aria-pressed="${isFlagged}" aria-label="${isFlagged ? "Remove bookmark" : "Bookmark"} question ${question.number}">${isFlagged ? "★ Bookmarked" : "☆ Bookmark"}</button>
          </div>
          <span class="section-label">Part ${section.id} / ${escapeHtml(section.title)}</span>
          <form id="answer-form">
            <fieldset class="question-fieldset">
              <legend class="question-legend" tabindex="-1">${escapeHtml(question.prompt)}</legend>
              <div class="choice-list">
                ${question.choices.map((choice) => `
                  <label class="choice-option">
                    <input class="choice-input" type="radio" name="answer" value="${choice.id}" ${selected === choice.id ? "checked" : ""}>
                    <span class="choice-card"><span class="choice-key" aria-hidden="true">${choice.id}</span><span>${escapeHtml(choice.text)}</span></span>
                  </label>`).join("")}
              </div>
            </fieldset>
            ${feedback}
            <div class="question-actions">
              <button class="button button-secondary" type="button" data-action="previous" ${previousDisabled}>Previous</button>
              <button class="button button-primary" type="button" data-action="${nextAction}" ${!nextQuestionExists && !canFinish ? "disabled" : ""}>${nextLabel}<span aria-hidden="true">→</span></button>
            </div>
          </form>
        </article>
      </section>
      ${renderNavigator()}
    </div>`;
}

function sectionResults() {
  return SECTIONS.map((section) => {
    const total = section.questions.length;
    const correct = section.questions.reduce((count, question) => count + (state.answers[question.number] === question.answer ? 1 : 0), 0);
    const percent = Math.round((correct / total) * 100);
    return { section, correct, total, percent };
  });
}

function renderResults() {
  const correct = score();
  const percent = Math.round((correct / QUESTIONS.length) * 100);
  const passed = percent >= PASS_PERCENT;
  return `
    <section class="results-layout" aria-labelledby="results-title">
      <p class="eyebrow">Assessment complete / 50 questions</p>
      <div class="result-hero ${passed ? "" : "is-fail"}">
        <div>
          <h1 id="results-title" tabindex="-1">Your results</h1>
          <p class="result-message">${passed ? "You met the passing score. Nice work across all three sections." : "You did not reach the passing score this time. Review your answers and try again."}</p>
          <span class="result-status">${passed ? "PASS" : "NOT YET"} · ${percent}%</span>
        </div>
        <div class="score-block" aria-label="${correct} out of ${QUESTIONS.length} correct"><span class="score-number">${correct}</span><span class="score-denominator">/ ${QUESTIONS.length}</span></div>
      </div>
      <section class="breakdown" aria-labelledby="breakdown-title">
        <h2 id="breakdown-title">Section breakdown</h2>
        <div class="breakdown-list">
          ${sectionResults().map(({ section, correct: sectionCorrect, total, percent: sectionPercent }) => `
            <div class="breakdown-row">
              <span class="breakdown-name">Part ${section.id} / ${escapeHtml(section.title)}</span>
              <span class="breakdown-score">${sectionCorrect} / ${total} · ${sectionPercent}%</span>
              <div class="breakdown-track" role="progressbar" aria-label="Part ${section.id} score" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${sectionCorrect}" aria-valuetext="${sectionCorrect} of ${total} correct">
                <div class="breakdown-fill" style="width: ${sectionPercent}%"></div>
              </div>
            </div>`).join("")}
        </div>
      </section>
      <div class="results-actions">
        <button class="button button-primary" type="button" data-action="review">Review answers</button>
        <button class="button button-secondary" type="button" data-action="share">Share progress</button>
        <button class="button button-secondary" type="button" data-action="retake">Retake assessment</button>
      </div>
    </section>`;
}

function renderSharedSnapshot() {
  const answered = Object.keys(sharedSnapshot.answers).length;
  const correct = scoreSnapshot(sharedSnapshot.answers);
  const isComplete = answered === QUESTIONS.length;
  const percent = isComplete ? Math.round((correct / QUESTIONS.length) * 100) : null;
  const passed = isComplete && percent >= PASS_PERCENT;
  const sharedDate = new Date(sharedSnapshot.sharedAt);
  const dateLabel = Number.isNaN(sharedDate.getTime()) ? "Date unavailable" : sharedDate.toLocaleString();

  return `
    <section class="shared-layout" aria-labelledby="shared-title">
      <p class="eyebrow">Read-only progress snapshot</p>
      <div class="result-hero ${isComplete && !passed ? "is-fail" : ""}">
        <div>
          <h1 id="shared-title" tabindex="-1">${escapeHtml(sharedSnapshot.traineeName)}'s progress</h1>
          <p class="result-message">${isComplete ? `Completed and shared ${escapeHtml(dateLabel)}.` : `In progress: ${answered} of ${QUESTIONS.length} questions answered. Shared ${escapeHtml(dateLabel)}.`}</p>
          <span class="result-status">${isComplete ? `${passed ? "PASS" : "NOT YET"} · ${percent}%` : `${answered} / ${QUESTIONS.length} ANSWERED`}</span>
        </div>
        <div class="score-block" aria-label="${correct} correct out of ${answered} answered"><span class="score-number">${correct}</span><span class="score-denominator">/ ${answered}</span></div>
      </div>
      <p class="share-notice">This is a snapshot from ${escapeHtml(dateLabel)}. It does not update automatically. Anyone with this link can view the answers and score. It is not verified or tamper-proof.</p>
      <section class="breakdown" aria-labelledby="shared-breakdown-title">
        <h2 id="shared-breakdown-title">Section breakdown</h2>
        <div class="breakdown-list">
          ${SECTIONS.map((section) => {
            const sectionAnswered = section.questions.filter((question) => sharedSnapshot.answers[question.number]).length;
            const sectionCorrect = section.questions.reduce((count, question) => count + (sharedSnapshot.answers[question.number] === question.answer ? 1 : 0), 0);
            const completion = Math.round((sectionAnswered / section.questions.length) * 100);
            return `
              <div class="breakdown-row">
                <span class="breakdown-name">Part ${section.id} / ${escapeHtml(section.title)}</span>
                <span class="breakdown-score">${sectionCorrect} correct · ${sectionAnswered} / ${section.questions.length} answered</span>
                <div class="breakdown-track" role="progressbar" aria-label="Part ${section.id} questions answered" aria-valuemin="0" aria-valuemax="${section.questions.length}" aria-valuenow="${sectionAnswered}" aria-valuetext="${sectionAnswered} of ${section.questions.length} answered">
                  <div class="breakdown-fill" style="width: ${completion}%"></div>
                </div>
              </div>`;
          }).join("")}
        </div>
      </section>
      <section class="shared-review" aria-labelledby="shared-review-title">
        <h2 id="shared-review-title">Answer details</h2>
        ${SECTIONS.map((section) => `
          <section class="review-section" aria-labelledby="shared-section-${section.id}">
            <h3 id="shared-section-${section.id}">Part ${section.id} / ${escapeHtml(section.title)}</h3>
            ${section.questions.map((question) => {
              const selected = sharedSnapshot.answers[question.number];
              const isCorrect = selected === question.answer;
              return `
                <details class="review-item">
                  <summary>Question ${question.number}: ${escapeHtml(question.prompt)}</summary>
                  <div class="review-body">
                    <p class="review-result ${selected ? isCorrect ? "is-correct" : "is-wrong" : ""}">${selected ? isCorrect ? `Correct: ${selected}.` : `Selected: ${selected}. Correct answer: ${question.answer}.` : "Not answered."}${sharedSnapshot.flags.includes(question.number) ? " Flagged for review." : ""}</p>
                    <ul class="review-options">
                      ${question.choices.map((choice) => {
                        const classes = [choice.id === question.answer && "is-correct", choice.id === selected && "is-selected"].filter(Boolean).join(" ");
                        return `<li class="${classes}"><strong>${choice.id}.</strong> ${escapeHtml(choice.text)}</li>`;
                      }).join("")}
                    </ul>
                    ${question.explanation ? `<p class="review-explanation">${escapeHtml(question.explanation)}</p>` : ""}
                  </div>
                </details>`;
            }).join("")}
          </section>`).join("")}
      </section>
      <div class="results-actions">
        <button class="button button-primary" type="button" data-action="open-quiz">Open quiz</button>
      </div>
    </section>`;
}

function scoreSnapshot(answers) {
  return QUESTIONS.reduce((total, question) => total + (answers[question.number] === question.answer ? 1 : 0), 0);
}

function renderReview() {
  return `
    <section class="review-layout" aria-labelledby="review-title">
      <p class="eyebrow">Assessment review</p>
      <h1 id="review-title" tabindex="-1">Review answers</h1>
      <p class="intro">Your selected answers are shown alongside the correct answers.</p>
      ${SECTIONS.map((section) => `
        <section class="review-section" aria-labelledby="review-section-${section.id}">
          <h2 id="review-section-${section.id}">Part ${section.id} / ${escapeHtml(section.title)}</h2>
          ${section.questions.map((question) => {
            const selected = state.answers[question.number];
            const isCorrect = selected === question.answer;
            return `
              <details class="review-item">
                <summary>Question ${question.number}: ${escapeHtml(question.prompt)}</summary>
                <div class="review-body">
                  <p class="review-result ${isCorrect ? "is-correct" : "is-wrong"}">${isCorrect ? "Correct" : `Your answer: ${selected}. Correct answer: ${question.answer}.`}</p>
                  <ul class="review-options">
                    ${question.choices.map((choice) => {
                      const classes = [choice.id === question.answer && "is-correct", choice.id === selected && "is-selected"].filter(Boolean).join(" ");
                      const note = choice.id === question.answer ? " (correct answer)" : choice.id === selected ? " (your answer)" : "";
                      return `<li class="${classes}"><strong>${choice.id}.</strong> ${escapeHtml(choice.text)}${note}</li>`;
                    }).join("")}
                  </ul>
                  ${question.explanation ? `<p class="review-explanation">${escapeHtml(question.explanation)}</p>` : ""}
                </div>
              </details>`;
          }).join("")}
        </section>`).join("")}
      <div class="results-actions">
        <button class="button button-primary" type="button" data-action="back-results">Back to results</button>
        <button class="button button-secondary" type="button" data-action="retake">Retake assessment</button>
      </div>
    </section>`;
}

function render({ focus = false } = {}) {
  app.innerHTML = sharedSnapshot ? renderSharedSnapshot()
    : state.phase === "welcome" ? renderWelcome()
      : state.phase === "quiz" ? renderQuiz()
        : state.phase === "results" ? renderResults()
          : renderReview();
  if (focus) {
    const target = sharedSnapshot ? app.querySelector("h1") : state.phase === "quiz" ? app.querySelector(".question-legend") : app.querySelector("h1");
    target?.focus();
  }
}

function goToQuestion(index) {
  state.currentQuestion = Math.max(0, Math.min(QUESTIONS.length - 1, index));
  state.storageMessage = statusMessage();
  render({ focus: true });
}

app.addEventListener("input", (event) => {
  if (event.target.id === "trainee-name") {
    state.traineeName = event.target.value.slice(0, 80);
    persist();
  }
});

app.addEventListener("change", (event) => {
  if (event.target.matches('input[name="answer"]')) {
    const question = QUESTIONS[state.currentQuestion];
    state.answers[question.number] = event.target.value;
    state.storageMessage = statusMessage();
    const correct = event.target.value === question.answer;
    render();
    app.querySelector('input[name="answer"]:checked')?.focus();
    announce(correct ? `Correct. ${question.explanation || ""}` : `Not quite. The correct answer is ${question.answer}. ${question.explanation || ""}`);
  }
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.action;

  if (action === "start") {
    if (state.phase === "welcome") {
      state.phase = "quiz";
      state.startedAt = new Date().toISOString();
    }
    state.storageMessage = statusMessage();
    render({ focus: true });
    return;
  }

  if (action === "share") {
    void shareProgress();
    return;
  }

  if (action === "open-quiz") {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    sharedSnapshot = null;
    state = restoreState();
    render({ focus: true });
    return;
  }

  if (action === "flag") {
    const questionNumber = QUESTIONS[state.currentQuestion].number;
    state.flags = state.flags.includes(questionNumber)
      ? state.flags.filter((number) => number !== questionNumber)
      : [...state.flags, questionNumber];
    state.storageMessage = statusMessage();
    render();
    app.querySelector('[data-action="flag"]')?.focus();
    announce(state.flags.includes(questionNumber) ? `Question ${questionNumber} bookmarked.` : `Bookmark removed from question ${questionNumber}.`);
    return;
  }

  if (action === "go") {
    goToQuestion(Number(button.dataset.index));
    return;
  }

  if (action === "previous" || action === "next") {
    goToQuestion(state.currentQuestion + (action === "next" ? 1 : -1));
    return;
  }

  if (action === "finish") {
    if (answeredCount() !== QUESTIONS.length) {
      announce(`Answer all ${QUESTIONS.length} questions before seeing your results.`);
      return;
    }
    state.phase = "results";
    state.completedAt = new Date().toISOString();
    state.storageMessage = statusMessage();
    render({ focus: true });
    return;
  }

  if (action === "review") {
    state.phase = "review";
    state.storageMessage = statusMessage();
    render({ focus: true });
    return;
  }

  if (action === "back-results") {
    state.phase = "results";
    render({ focus: true });
    return;
  }

  if (action === "retake") {
    state = { ...initialState(), traineeName: state.traineeName, phase: "quiz", startedAt: new Date().toISOString() };
    state.storageMessage = statusMessage();
    render({ focus: true });
  }
});

render();
