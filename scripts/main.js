import { passages } from "./data/passages.js";
import { speak, testFontAvailability } from "./utils/speech.js";
window.passages = passages;

// ----------------------
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
  isFlatArray: Array.isArray(window.passages)
};

// Debug flag for optional console output
const debug = false;

// ----------------------
// DOM Elements
// ----------------------
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
const levelDisplay = document.getElementById("level");
const toggleThemeButton = document.getElementById("toggle-theme");
const timerSettingSelect = document.getElementById("timer-setting");

// Dyslexia-friendly font toggle with debugging
const toggleDyslexiaButton = document.getElementById("toggle-dyslexia");
toggleDyslexiaButton.addEventListener("click", () => {
  document.body.classList.toggle("dyslexia");
  const isDyslexiaMode = document.body.classList.contains("dyslexia");
  toggleDyslexiaButton.textContent = isDyslexiaMode ? "Disable Dyslexia Font" : "Toggle Dyslexia Font";
  speak(isDyslexiaMode ? "Dyslexia-friendly font enabled" : "Dyslexia-friendly font disabled");
//   console.log("Dyslexia mode:", isDyslexiaMode);
//   console.log("Passage text font-family:", window.getComputedStyle(passageText).fontFamily);
//   console.log("Word box font-family:", window.getComputedStyle(wordBox).fontFamily);
  // Log font-family of child elements
  const narrativeIntro = passageText.querySelector(".narrative-intro");
  if (narrativeIntro) {
//     console.log("Narrative intro font-family:", window.getComputedStyle(narrativeIntro).fontFamily);
  }
  const firstWord = wordBox.querySelector(".word");
  if (firstWord) {
//     console.log("First word font-family:", window.getComputedStyle(firstWord).fontFamily);
  }
});

// Test if Open Dyslexic font is loaded
// function testFontAvailability() {
//   const testDiv = document.createElement("div");
//   testDiv.style.fontFamily = '"Open Dyslexic"';
//   testDiv.style.position = "absolute";
//   testDiv.style.visibility = "hidden";
//   testDiv.textContent = "Test";
//   document.body.appendChild(testDiv);
//   const computedFont = window.getComputedStyle(testDiv).fontFamily;
//   document.body.removeChild(testDiv);
// //   console.log("Open Dyslexic font test:", computedFont);
//   if (!computedFont.includes("Open Dyslexic")) {
//     console.warn("Open Dyslexic font may not be loaded correctly. Falling back to Comic Sans MS.");
//   }
// }

// ----------------------
// Guided Tutorial Modal (Onboarding)
// ----------------------
const tutorialModal = document.getElementById("tutorial-modal");
const tutorialCloseButton = document.getElementById("tutorial-close-btn");
if (!localStorage.getItem("hasSeenTutorial")) {
  tutorialModal.style.display = "flex";
} else {
  tutorialModal.style.display = "none";
}
tutorialCloseButton.addEventListener("click", () => {
  tutorialModal.style.display = "none";
  localStorage.setItem("hasSeenTutorial", "true");
  speak("Welcome to Grammar Cloze Adventure! Drag or tap a word to fill in the blanks. Then press submit to check your answers.");
});

// ----------------------
// Speech Synthesis Setup – UK Female Fallback
// // ----------------------
// const synth = window.speechSynthesis;
// let voices = [];
// let ukFemaleVoice = null;
// function loadVoices() {
//   voices = synth.getVoices();
//   ukFemaleVoice = voices.find(voice =>
//     voice.lang === "en-GB" &&
//     (voice.name.toLowerCase().includes("female") || voice.name === "Samantha" || voice.name === "Kate")
//   ) || voices.find(voice => voice.lang === "en-GB");
// //   console.log("Voices loaded:", voices.length);
// }
// loadVoices();
// synth.onvoiceschanged = loadVoices;
// function speak(text) {
//   if (!window.speechSynthesis) {
//     feedbackDisplay.textContent = "Speech synthesis not supported.";
//     return;
//   }
//   if (synth.speaking) synth.cancel();
//   loadVoices();
//   if (!voices.length) {
//     feedbackDisplay.textContent = "Voices not loaded.";
//     return;
//   }
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-GB";
//   utterance.voice = ukFemaleVoice || voices[0];
//   utterance.rate = 0.9;
//   utterance.pitch = 1.1;
//   synth.speak(utterance);

// ----------------------
// Utility Functions
// ----------------------
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateLevel() {
  if (state.score < 100) {
    state.level = "Apprentice";
  } else if (state.score < 200) {
    state.level = "Journeyman";
  } else {
    state.level = "Master Wizard";
  }
  levelDisplay.textContent = `Level: ${state.level}`;
}

function updateStatus() {
  scoreDisplay.textContent = `Score: ${state.score}`;
  starsDisplay.textContent = `Stars: ${state.stars}`;
  const totalPassages = state.isFlatArray ? window.passages.length : window.passages[state.currentGrammarType].length;
 progressDisplay.textContent = `Progress: ${state.currentPassageIndex + 1} / ${totalPassages}`;
  timerDisplay.textContent = `Time: ${state.timeLeft}s`;
  progressBar.style.width = `${((state.currentPassageIndex + 1) / totalPassages) * 100}%`;
  if (state.challengeMode && timerSettingSelect.value !== "off") {
    timerBar.style.width = `${(state.timeLeft / parseInt(timerSettingSelect.value)) * 100}%`;
    timerBar.style.backgroundColor =
      state.timeLeft > (parseInt(timerSettingSelect.value) * 0.5)
        ? "#27ae60"
        : state.timeLeft > (parseInt(timerSettingSelect.value) * 0.2)
        ? "orange"
        : "red";
  } else {
    timerBar.style.width = "0%";
  }
  updateLevel();
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
      feedbackDisplay.textContent = "Time's up! Please submit your answers.";
      speak("Time's up! Please submit your answers.");
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

// ----------------------
// Narrative Intro Function
// ----------------------
function getNarrativeIntro(grammarType, index) {
  const story = {
    prepositions: [
      "Our wizard begins his quest to map the enchanted forest.",
      "With each step, he unlocks a new spell to navigate the realm."
    ],
    conjunctions: [
      "In a moment of choice, the wizard faces decisions that shape his destiny.",
      "Every connection he makes weaves his adventure tighter."
    ],
    subjectVerbAgreement: [
      "The wizard ensures his spells agree with the magic rules.",
      "Each incantation must match its power source perfectly."
    ],
    pronouns: [
      "The wizard identifies the right allies for his quest.",
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
  const totalPassages = state.isFlatArray ? window.passages.length : window.passages[grammarType].length;
 return `${chapters[index % chapters.length]} (Chapter ${index + 1} of ${totalPassages})`;
}

// ----------------------
// Display Passage
// ----------------------
function displayPassage() {
  clearInterval(state.timerInterval);
  state.hintUsage = {};
  state.selectedWord = null;

  // Determine the passage based on structure
  let passage;
  if (state.isFlatArray) {
    passage = window.passages[state.currentPassageIndex];
  } else {
    passage = window.passages[state.currentGrammarType]?.[state.currentPassageIndex];
  }

//   console.log("Current passage:", passage); // Debug log

  if (!passage) {
    passageText.innerHTML = "<p>Error: Passage not found.</p>";
    feedbackDisplay.textContent = state.isFlatArray
      ? "Error: Passage not found."
      : `Error: No passages available for ${state.currentGrammarType}. Please select another category.`;
    console.error("Passage not found at index", state.currentPassageIndex, "for type", state.currentGrammarType);
    return;
  }

  if (!passage.text || !Array.isArray(passage.wordBox) || !Array.isArray(passage.answers) ||
      !Array.isArray(passage.clueWords) || !Array.isArray(passage.hints)) {
    passageText.innerHTML = "<p>Error: Invalid passage data.</p>";
    feedbackDisplay.textContent = "Error: Missing required passage data.";
    console.error("Invalid passage data:", passage);
    return;
  }

 const blanks = passage.text.match(/\d/g) || [];
  const blankCount = blanks.length;
  const answerCount = passage.answers.length;
  const clueCount = passage.clueWords.length;
  const hintCount = passage.hints.length;

  const mismatch = [];
  if (answerCount !== blankCount) mismatch.push(`answers (${answerCount})`);
  if (clueCount !== blankCount) mismatch.push(`clues (${clueCount})`);
  if (hintCount !== blankCount) mismatch.push(`hints (${hintCount})`);

  if (mismatch.length) {
    feedbackDisplay.textContent =
      `Warning: ${blankCount} blanks, but ${mismatch.join(', ')}.`;
    console.warn(
      `Mismatch in passage data: blanks=${blankCount}`,
      { answers: answerCount, clues: clueCount, hints: hintCount },
      passage
    );
  }

  let passageHTML = `<p class="narrative-intro">${getNarrativeIntro(state.currentGrammarType, state.currentPassageIndex)}</p>`;
  passageHTML = passage.text;

  if (passage.clueWords) {
    passage.clueWords.forEach((clues, index) => {␊
      const blankNum = index + 1;
      clues.forEach(clue => {
        const regex = new RegExp(`\\b${clue}\\b`, "gi");
        passageHTML = passageHTML.replace(regex,
          `<span class="keyword keyword-${blankNum}" title="Clue for blank ${blankNum}">${clue}</span>`);
      });
    });
  }
  passageHTML = passageHTML.replace(/___\((\d)\)___/g, (_, num) => {
    return `<span class="blank-container">
              <span class="blank" data-blank="${num}" tabindex="0">_</span>
              <button class="hint-for-blank" data-blank="${num}" aria-label="Hint for blank ${num}">💡</button>
            </span>`;
  });

  // Skip fade animation on initial load to avoid rendering issues
  if (state.currentPassageIndex === 0 && Object.keys(state.hintUsage).length === 0) {
    passageText.innerHTML = passageHTML;
    setupPassageInteractions();
  } else {
    fadeOutIn(passageText, () => {
      passageText.innerHTML = passageHTML;
      setupPassageInteractions();
    });
  }

 wordBox.innerHTML = shuffle([...passage.wordBox])
    .map((word, index) => {
      const hint = passage.wordHints?.[index] ?? word;
      return `<div class="word" draggable="true" tabindex="0" aria-label="${word}" title="${hint}">${word}</div>`;
    })
    .join("");

  document.querySelectorAll(".word").forEach(word => {
    word.addEventListener("dragstart", handleDragStart);
    word.addEventListener("dragend", handleDragEnd);
    word.addEventListener("click", () => {
      state.selectedWord = word;
      document.querySelectorAll(".word").forEach(w => w.classList.remove("selected"));
      word.classList.add("selected");
    });
    word.addEventListener("keydown", (e) => {
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

// Extract interaction setup into a separate function for clarity
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
    blank.addEventListener("keydown", (e) => {
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
          feedbackDisplay.textContent = " (-5 points for hint)";
          updateStatus();
        }
      }
      document.querySelectorAll(`.keyword-${blankNum}`).forEach(el => el.classList.add("highlighted"));
      setTimeout(() => {
        document.querySelectorAll(`.keyword-${blankNum}`).forEach(el => el.classList.remove("highlighted"));
      }, 3000);
    });
  });
}

// ----------------------
// Drag-and-Drop Handlers
// ----------------------
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
  const droppedWord = e.dataTransfer.getData("text/plain");
  const blank = e.currentTarget.querySelector(".blank");
  if (blank && !blank.classList.contains("filled")) {
    placeWord(blank, droppedWord);
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

// ----------------------
// Word Placement and Checking
// ----------------------
function placeWord(blank, word) {
  blank.textContent = word;
  blank.classList.add("filled");
  blank.style.transition = "transform 0.3s ease";
  blank.style.transform = "scale(1.2)";
  setTimeout(() => { blank.style.transform = "scale(1)"; }, 300);
  checkAnswer(blank);
}

function checkAnswer(blank) {
  const blankId = parseInt(blank.getAttribute("data-blank")) - 1;
  const passage = state.isFlatArray
    ? window.passages[state.currentPassageIndex]
    : window.passages[state.currentGrammarType][state.currentPassageIndex];
  const userAnswer = blank.textContent.trim().toLowerCase();
  const correctAnswer = passage.answers[blankId].toLowerCase();

  // Retrieve semantic hint if provided
  let semanticHint = "";
  if (passage.semanticHints && Array.isArray(passage.semanticHints)) {
    if (passage.semanticHints[blankId]) {
      semanticHint = passage.semanticHints[blankId];
    } else {
      semanticHint = "Consider the context for meaning.";
    }
  } else {
    semanticHint = "Consider the context for meaning.";
  }

  // Use passage-specific explanations if provided
  let explanation = "";
  if (passage.explanations && Array.isArray(passage.explanations) && passage.explanations[blankId]) {
    explanation = passage.explanations[blankId];
  } else {
    // Define global explanations for specific passages (if available) – these are specific,
    // so we also define generic fallback explanations to use if the index is missing.
    const globalExplanations = {
      prepositions: [
        "'On' is correct if it expresses contact with a surface.",
        "'Through' is correct when indicating movement inside and out of something.",
        "'By' is appropriate for indicating proximity.",
        "'Under' works well when indicating something is beneath another object.",
        "'Towards' is used for indicating direction."
      ],
      conjunctions: [
        "'But' is used to show contrast.",
        "'Until' indicates the time before an action or event ends.",
        "'And' connects similar ideas.",
        "'Or' presents an alternative or choice.",
        "'So' indicates a result or consequence."
      ],
      subjectVerbAgreement: [
        "Use the singular verb form with a singular subject.",
        "Use the plural verb form with a plural subject.",
        "Remember that phrases like 'each' require a singular verb.",
        "Collective nouns may require singular agreement, depending on context.",
        "Ensure that the verb matches the subject in number."
      ],
      pronouns: [
        "Use the proper possessive pronoun to show ownership.",
        "Select the subject or object pronoun based on its role in the sentence.",
        "Make sure the pronoun clearly refers back to the intended noun.",
        "Check that the pronoun’s case (subject/object) is correct.",
        "Match the pronoun in number with its antecedent."
      ],
      adjectivesAdverbs: [
        "Choose an adjective that appropriately describes the noun.",
        "Use an adverb to modify how an action is performed.",
        "Select words that convey the manner or quality of the action.",
        "Ensure the modifier fits the context of the description.",
        "The choice should enhance the meaning of the sentence."
      ],
      tenses: [
        "Select the past tense form for actions completed in the past.",
        "Use the past tense to reflect events that have already happened.",
        "Choose the tense that best reflects the sequence of events.",
        "The verb tense should match the time indicators in the sentence.",
        "Ensure the verb form is consistent with the narrative."
      ]
    };

    const genericFallbacks = {
      prepositions: "Select the preposition that best expresses the spatial or directional relationship in this sentence.",
      conjunctions: "Choose the conjunction that most appropriately links the ideas or clauses presented.",
      subjectVerbAgreement: "Ensure the verb agrees with its subject in number.",
      pronouns: "Pick the pronoun that correctly reflects the intended reference and matches the case.",
      adjectivesAdverbs: "Choose the modifier that best fits the context of the sentence.",
      tenses: "Select the verb form that correctly conveys the time or sequence of events."
    };

    // First, try using a global explanation specific to the index.
    if (
      globalExplanations[state.currentGrammarType] &&
      Array.isArray(globalExplanations[state.currentGrammarType]) &&
      globalExplanations[state.currentGrammarType][blankId]
    ) {
      explanation = globalExplanations[state.currentGrammarType][blankId];
    } else {
      // Otherwise, use a generic explanation for the grammar category.
      explanation = genericFallbacks[state.currentGrammarType] || "Review the grammar rules.";
    }
  }

  if (userAnswer === correctAnswer) {
    blank.classList.add("correct", "animate-correct");
    state.score = 10;
    state.stars = 1;
    feedbackDisplay.textContent = `Correct! ${explanation}`;
    feedbackDisplay.style.color = "green";
    document.getElementById("correct-sound").play();
    speak(feedbackDisplay.textContent);
  } else {
    blank.classList.add("incorrect", "animate-incorrect");
    feedbackDisplay.textContent = `Incorrect! The correct answer is '${correctAnswer}'. ${explanation} ${semanticHint}`;
    feedbackDisplay.style.color = "red";
    document.getElementById("incorrect-sound").play();
    speak(feedbackDisplay.textContent);
  }
  updateStatus();
}

// ----------------------

// ----------------------
// Function to Update Dropdown Visibility
// ----------------------
function updateGrammarTypeDropdown() {
//   console.log("Updating dropdown visibility...");
//   console.log("window.passages:", window.passages);
//   console.log("state.isFlatArray:", state.isFlatArray);
//   console.log("grammarSelect:", grammarSelect);
//   console.log("grammarTypeMessage:", grammarTypeMessage);

  if (!grammarSelect || !grammarTypeMessage) {
    console.error("DOM elements not found: grammarSelect or grammarTypeMessage");
    return;
  }

  if (state.isFlatArray) {
//     console.log("Hiding dropdown (flat array mode)");
    grammarSelect.style.display = "none";
    grammarTypeMessage.style.display = "inline";
  } else {
//     console.log("Showing dropdown (category-based mode)");
    grammarSelect.style.display = "block";
    grammarTypeMessage.style.display = "none";
  }
}

// ----------------------
// Initialize the Game
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Debug initial state
//   console.log("Initial window.passages:", window.passages);
//   console.log("Initial state.isFlatArray:", state.isFlatArray);

  // Test font availability on load
  testFontAvailability();

  // Ensure passages are defined before proceeding
  if (!window.passages) {
    console.error("window.passages is not defined!");
    feedbackDisplay.textContent = "Error: Passages data not loaded.";
    return;
  }

  // Update state.isFlatArray after passages are confirmed to be loaded
  state.isFlatArray = Array.isArray(window.passages);
//   console.log("Updated state.isFlatArray after load:", state.isFlatArray);

  // Update dropdown visibility
  updateGrammarTypeDropdown();

  // Initialize the game
  displayPassage();
  updateStatus();
});

window.displayPassage = displayPassage;
window.updateStatus = updateStatus;
window.startTimer = startTimer;
window.fadeOutIn = fadeOutIn;
