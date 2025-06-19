// scripts/main.js
import { passages } from "./data/passages.js";
import { speak, testFontAvailability } from "./utils/speech.js";
window.passages = passages;

// Global Game State
export const state = {
  currentGrammarType: "prepositions",
  currentPassageIndex: 0,
  score: 0,
  stars: 0,
  hintUsage: {},
  selectedWord: null,
  timeLeft: 60,
  timerInterval: null,
  challengeMode: true,
  level: "Apprentice",
  isFlatArray: Array.isArray(window.passages),
  achievements: [],
};

// DOM Elements
const grammarSelect = document.getElementById("grammar-type");
const grammarTypeMessage = document.getElementById("grammar-type-message");
const passageText = document.getElementById("passage-text");
const wordBox = document.getElementById("word-box");
const feedbackDisplay = document.getElementById("feedback");
const nextPassageButton = document.getElementById("next-btn");
const prevPassageButton = document.getElementById("prev-btn");
const hintButton = document.getElementById("hint-btn");
const clearButton = document.getElementById("clear-btn");
const shareButton = document.getElementById("share-btn");
const readPassageButton = document.getElementById("read-passage-btn");
const toggleChallengeButton = document.getElementById("toggle-challenge");
const submitButton = document.getElementById("submit-btn");
const progressDisplay = document.getElementById("progress");
const scoreDisplay = document.getElementById("score");
const starsDisplay = document.getElementById("stars");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const timerBar = document.getElementById("timer-bar");
const progressBarContainer = document.getElementById("progress-bar-container");
const timerContainer = document.getElementById("timer-container");
const levelDisplay = document.getElementById("level");
const achievementsDisplay = document.getElementById("achievements");
const toggleThemeButton = document.getElementById("toggle-theme");
const timerSettingSelect = document.getElementById("timer-setting");
const textSizeSlider = document.getElementById("text-size-slider");
const toggleDyslexiaButton = document.getElementById("toggle-dyslexia");
const toggleHighContrastButton = document.getElementById("toggle-high-contrast");
const resetWordsButton = document.getElementById("reset-words-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

// Event Listeners
sidebarToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

grammarSelect.addEventListener("change", () => {
  if (!state.isFlatArray) {
    state.currentGrammarType = grammarSelect.value;
    state.currentPassageIndex = 0;
    state.timeLeft = parseInt(timerSettingSelect.value) || 0;
    displayPassage();
    updateStatus();
  }
});

textSizeSlider.addEventListener("input", () => {
  const textSize = textSizeSlider.value;
  passageText.style.fontSize = `${textSize}rem`;
  wordBox.style.fontSize = `${textSize * 0.8}rem`;
  speak(`Text size adjusted to ${textSize} rem`);
});

nextPassageButton.addEventListener("click", () => {
  clearInterval(state.timerInterval);
  state.currentPassageIndex++;
  const totalPassages = state.isFlatArray ? window.passages.length : window.passages[state.currentGrammarType].length;
  if (state.currentPassageIndex >= totalPassages) {
    feedbackDisplay.textContent = `Game Over! Final Score: ${state.score}`;
    speak(`Game Over! Your final score is ${state.score}`);
    return;
  }
  state.timeLeft = parseInt(timerSettingSelect.value) || 0;
  fadeOutIn(passageText, () => displayPassage());
  updateStatus();
});

prevPassageButton.addEventListener("click", () => {
  if (state.currentPassageIndex > 0) {
    state.currentPassageIndex--;
    state.timeLeft = parseInt(timerSettingSelect.value) || 0;
    clearInterval(state.timerInterval);
    fadeOutIn(passageText, () => displayPassage());
    updateStatus();
  }
});

clearButton.addEventListener("click", () => {
  state.hintUsage = {};
  state.selectedWord = null;
  state.timeLeft = parseInt(timerSettingSelect.value) || 0;
  clearInterval(state.timerInterval);
  displayPassage();
});

hintButton.addEventListener("click", () => {
  const passage = state.isFlatArray ? window.passages[state.currentPassageIndex] : window.passages[state.currentGrammarType][state.currentPassageIndex];
  if (passage.hints) {
    feedbackDisplay.textContent = passage.hints[0] || "No hint available.";
    feedbackDisplay.style.color = "blue";
    speak(feedbackDisplay.textContent);
  }
});

shareButton.addEventListener("click", () => {
  const shareData = {
    title: "Grammar Cloze Adventure",
    text: `I am a ${state.level} with a score of ${state.score}! Can you beat me?`,
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(err => console.error("Error sharing:", err));
  } else {
    alert("Sharing not supported.");
  }
});

readPassageButton.addEventListener("click", () => {
  const passage = state.isFlatArray ? window.passages[state.currentPassageIndex] : window.passages[state.currentGrammarType][state.currentPassageIndex];
  if (passage && passage.text) {
    const textToSpeak = passage.text.replace(/___\(\d+\)___/g, "blank");
    speak(textToSpeak);
  } else {
    feedbackDisplay.textContent = "Error: No passage to read.";
  }
});

toggleChallengeButton.addEventListener("click", () => {
  state.challengeMode = !state.challengeMode;
  toggleChallengeButton.textContent = state.challengeMode ? "⏱️ Challenge" : "⏱️ Practice";
  if (state.challengeMode) startTimer();
  else clearInterval(state.timerInterval);
  updateStatus();
});

submitButton.addEventListener("click", () => {
  const blanks = document.querySelectorAll(".blank");
  let allFilled = true;
  blanks.forEach(blank => {
    if (!blank.classList.contains("filled")) allFilled = false;
  });
  if (!allFilled) {
    feedbackDisplay.textContent = "Please fill all blanks before submitting.";
    feedbackDisplay.style.color = "red";
    speak(feedbackDisplay.textContent);
    return;
  }
  let correctCount = 0;
  blanks.forEach(blank => checkAnswer(blank));
  const totalBlanks = blanks.length;
  const rewardMessage = `Review: ${correctCount} of ${totalBlanks} correct.`;
  feedbackDisplay.textContent = rewardMessage;
  speak(rewardMessage);
  if (state.challengeMode && Object.keys(state.hintUsage).length === 0) {
    state.score += 20;
    feedbackDisplay.innerHTML += ' <span class="bonus">+20!</span>';
    speak("Bonus! 20 extra points for no hints.");
  }
});

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("sparkle");
  toggleThemeButton.textContent = document.body.classList.contains("light-mode") ? "Dark Mode" : "Light Mode";
});

toggleDyslexiaButton.addEventListener("click", () => {
  document.body.classList.toggle("dyslexia");
  speak(document.body.classList.contains("dyslexia") ? "Dyslexia mode enabled" : "Dyslexia mode disabled");
});

toggleHighContrastButton.addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
  speak(document.body.classList.contains("high-contrast") ? "High contrast mode enabled" : "High contrast mode disabled");
});

resetWordsButton.addEventListener("click", () => {
  document.querySelectorAll(".blank").forEach(blank => {
    blank.textContent = "_";
    blank.classList.remove("filled", "correct", "incorrect");
  });
  state.selectedWord = null;
  updateStatus();
});

document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "h") hintButton.click();
  else if (e.key.toLowerCase() === "n") nextPassageButton.click();
});

// Utility Functions
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateLevel() {
  if (state.score < 100) state.level = "Apprentice";
  else if (state.score < 200) state.level = "Journeyman";
  else state.level = "Master Wizard";
  levelDisplay.textContent = `Level: ${state.level}`;
}

function updateStatus() {
  scoreDisplay.textContent = `Score: ${state.score}`;
  starsDisplay.textContent = `Stars: ${state.stars}`;
  const totalPassages = state.isFlatArray ? window.passages.length : window.passages[state.currentGrammarType].length;
  progressDisplay.textContent = `Progress: ${state.currentPassageIndex + 1} / ${totalPassages}`;
  timerDisplay.textContent = `Time: ${state.timeLeft}s`;
  const progressPercent = ((state.currentPassageIndex + 1) / totalPassages) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressBarContainer.setAttribute("aria-valuenow", Math.round(progressPercent));
  if (state.challengeMode && timerSettingSelect.value !== "off") {
    const timerPercent = (state.timeLeft / parseInt(timerSettingSelect.value)) * 100;
    timerBar.style.width = `${timerPercent}%`;
    timerContainer.setAttribute("aria-valuenow", Math.round(timerPercent));
    timerBar.style.backgroundColor = state.timeLeft > 30 ? "#27ae60" : state.timeLeft > 10 ? "orange" : "red";
  } else {
    timerBar.style.width = "0%";
    timerContainer.setAttribute("aria-valuenow", "0");
  }
  updateLevel();
  achievementsDisplay.textContent = `Achievements: ${state.achievements.join(", ") || "None"}`;
}

function startTimer() {
  if (!state.challengeMode || timerSettingSelect.value === "off") return;
  clearInterval(state.timerInterval);
  state.timeLeft = parseInt(timerSettingSelect.value);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateStatus();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      feedbackDisplay.textContent = "Time's up! Submit your answers.";
      speak("Time's up! Submit your answers.");
    }
  }, 1000);
}

function fadeOutIn(element, callback) {
  element.style.transition = "opacity 0.5s ease";
  element.style.opacity = 0;
  setTimeout(() => {
    callback();
    element.style.opacity = 1;
  }, 500);
}

// Narrative Intro
function getNarrativeIntro(grammarType, index) {
  const story = {
    prepositions: [
      "Our wizard begins his quest to map the enchanted forest.",
      "With each step, he unlocks a new spell to navigate."
    ],
    conjunctions: [
      "In a moment of choice, the wizard shapes his destiny.",
      "Every connection weaves his adventure tighter."
    ],
    subjectVerbAgreement: [
      "The wizard ensures his spells align with magic rules.",
      "Each incantation matches its power source."
    ],
    pronouns: [
      "The wizard identifies allies for his quest.",
      "He assigns roles to each companion carefully."
    ],
    adjectivesAdverbs: [
      "The wizard describes his journey with vivid words.",
      "He casts spells swiftly and beautifully."
    ],
    tenses: [
      "The wizard recalls past adventures in the realm.",
      "He plans future quests with great care."
    ]
  };
  const chapters = story[grammarType] || ["Begin your adventure!"];
  return `${chapters[index % chapters.length]} (Chapter ${index + 1})`;
}

// Display Passage
function displayPassage() {
  clearInterval(state.timerInterval);
  state.hintUsage = {};
  state.selectedWord = null;

  let passage;
  if (state.isFlatArray) {
    passage = window.passages[state.currentPassageIndex];
  } else {
    passage = window.passages[state.currentGrammarType]?.[state.currentPassageIndex];
  }

  if (!passage) {
    passageText.innerHTML = "<p>Error: Passage not found.</p>";
    feedbackDisplay.textContent = state.isFlatArray
      ? "Error: Passage not found."
      : `Error: No passages for ${state.currentGrammarType}.`;
    return;
  }

  let passageHTML = `<p class="narrative-intro">${getNarrativeIntro(state.currentGrammarType, state.currentPassageIndex)}</p>`;
  passageHTML += passage.text;

  if (passage.clueWords) {
    passage.clueWords.forEach((clues, index) => {
      const blankNum = index + 1;
      clues.forEach(clue => {
        const regex = new RegExp(`\\b${clue}\\b`, "gi");
        passageHTML = passageHTML.replace(regex, `<span class="keyword keyword-${blankNum}" title="Clue for blank ${blankNum}">${clue}</span>`);
      });
    });
  }
  passageHTML = passageHTML.replace(/___\((\d)\)___/g, (_, num) => {
    return `<span class="blank-container"><span class="blank" data-blank="${num}" tabindex="0">_</span><button class="hint-for-blank" data-blank="${num}" aria-label="Hint for blank ${num}">💡</button></span>`;
  });

  fadeOutIn(passageText, () => {
    passageText.innerHTML = passageHTML;
    setupPassageInteractions();
  });

  wordBox.innerHTML = shuffle([...passage.wordBox])
    .map((word, index) => `<div class="word" draggable="true" tabindex="0" aria-label="${word}" title="${passage.wordHints?.[index] || word}">${word}</div>`)
    .join("");

  document.querySelectorAll(".word").forEach(word => {
    word.addEventListener("dragstart", handleDragStart);
    word.addEventListener("dragend", handleDragEnd);
    word.addEventListener("click", () => {
      state.selectedWord = word;
      document.querySelectorAll(".word").forEach(w => w.classList.remove("selected"));
      word.classList.add("selected");
    });
    word.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        state.selectedWord = word;
        document.querySelectorAll(".word").forEach(w => w.classList.remove("selected"));
        word.classList.add("selected");
      }
    });
  });

  if (state.challengeMode) startTimer();
  updateStatus();
}

// Setup Passage Interactions
function setupPassageInteractions() {
  document.querySelectorAll(".blank-container").forEach(container => {
    container.addEventListener("dragover", handleContainerDragOver);
    container.addEventListener("dragleave", handleContainerDragLeave);
    container.addEventListener("drop", handleContainerDrop);
  });

  document.querySelectorAll(".blank").forEach(blank => {
    blank.addEventListener("click", () => {
      if (state.selectedWord && !blank.classList.contains("filled")) {
        placeWord(blank, state.selectedWord.textContent);
        state.selectedWord.classList.remove("selected");
        state.selectedWord = null;
        updateStatus();
      }
    });
    blank.addEventListener("keydown", e => {
      if (e.key === "Enter" && state.selectedWord && !blank.classList.contains("filled")) {
        placeWord(blank, state.selectedWord.textContent);
        state.selectedWord.classList.remove("selected");
        state.selectedWord = null;
        updateStatus();
      }
    });
  });

  document.querySelectorAll(".hint-for-blank").forEach(button => {
    button.addEventListener("click", function () {
      const blankNum = this.getAttribute("data-blank");
      const hintIndex = parseInt(blankNum) - 1;
      const passage = state.isFlatArray ? window.passages[state.currentPassageIndex] : window.passages[state.currentGrammarType][state.currentPassageIndex];
      if (passage.hints && passage.hints[hintIndex]) {
        feedbackDisplay.textContent = passage.hints[hintIndex];
        feedbackDisplay.style.color = "blue";
        speak(passage.hints[hintIndex]);
        if (!state.hintUsage[blankNum] && state.challengeMode) {
          state.hintUsage[blankNum] = true;
          state.score = Math.max(0, state.score - 5);
          feedbackDisplay.textContent += " (-5 points for hint)";
          updateStatus();
        }
      }
      document.querySelectorAll(`.keyword-${blankNum}`).forEach(el => el.classList.add("highlighted"));
      setTimeout(() => document.querySelectorAll(`.keyword-${blankNum}`).forEach(el => el.classList.remove("highlighted")), 3000);
    });
  });

  document.querySelectorAll(".keyword").forEach(keyword => {
    keyword.addEventListener("click", function () {
      const blankNum = this.className.match(/keyword-(\d+)/)?.[1];
      if (blankNum) {
        const passage = state.isFlatArray ? window.passages[state.currentPassageIndex] : window.passages[state.currentGrammarType][state.currentPassageIndex];
        const hint = passage.hints?.[parseInt(blankNum) - 1] || "No hint available.";
        feedbackDisplay.textContent = hint;
        feedbackDisplay.style.color = "blue";
        speak(hint);
      }
    });
  });
}

// Drag-and-Drop Handlers
function handleContainerDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}
function handleContainerDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}
function handleContainerDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  const blank = e.currentTarget.querySelector(".blank");
  if (blank && !blank.classList.contains("filled")) {
    placeWord(blank, e.dataTransfer.getData("text/plain"));
    updateStatus();
  }
}

let draggedItem = null;
function handleDragStart(e) {
  draggedItem = e.target;
  e.dataTransfer.setData("text/plain", e.target.textContent);
  e.target.classList.add("dragging");
}
function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  draggedItem = null;
}

// Word Placement and Checking
function placeWord(blank, word) {
  blank.textContent = word;
  blank.classList.add("filled");
  checkAnswer(blank);
}

function checkAnswer(blank) {
  const blankId = parseInt(blank.getAttribute("data-blank")) - 1;
  const passage = state.isFlatArray ? window.passages[state.currentPassageIndex] : window.passages[state.currentGrammarType][state.currentPassageIndex];
  const userAnswer = blank.textContent.trim().toLowerCase();
  const correctAnswer = passage.answers[blankId].toLowerCase();

  let explanation = passage.explanations?.[blankId] || "Review the grammar rules.";
  if (userAnswer === correctAnswer) {
    blank.classList.add("correct");
    state.score += 10;
    state.stars++;
    feedbackDisplay.textContent = `Correct! ${explanation}`;
    feedbackDisplay.style.color = "green";
    document.getElementById("correct-sound").play();
    speak(feedbackDisplay.textContent);
    if (state.score >= 50 && !state.achievements.includes("Halfway Hero")) {
      state.achievements.push("Halfway Hero");
    }
  } else {
    blank.classList.add("incorrect");
    feedbackDisplay.textContent = `Incorrect! Correct answer: '${correctAnswer}'. ${explanation}`;
    feedbackDisplay.style.color = "red";
    document.getElementById("incorrect-sound").play();
    speak(feedbackDisplay.textContent);
  }
  updateStatus();
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  testFontAvailability();
  if (!window.passages) {
    feedbackDisplay.textContent = "Error: Passages data not loaded.";
    return;
  }
  state.isFlatArray = Array.isArray(window.passages);
  updateGrammarTypeDropdown();
  displayPassage();
  updateStatus();
});

function updateGrammarTypeDropdown() {
  if (state.isFlatArray) {
    grammarSelect.style.display = "none";
    grammarTypeMessage.style.display = "inline";
  } else {
    grammarSelect.style.display = "block";
    grammarTypeMessage.style.display = "none";
  }
}

export { displayPassage, updateStatus, startTimer, fadeOutIn };
