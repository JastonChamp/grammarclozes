import { state, displayPassage, updateStatus, startTimer, fadeOutIn } from "../main.js";
import { speak } from "../utils/speech.js";
const grammarSelect = document.getElementById("grammar-type");
const textSizeSlider = document.getElementById("text-size-slider");
const passageText = document.getElementById("passage-text");
const wordBox = document.getElementById("word-box");
const feedbackDisplay = document.getElementById("feedback");
const nextPassageButton = document.getElementById("next-btn");
const prevPassageButton = document.getElementById("prev-btn");
const clearButton = document.getElementById("clear-btn");
const hintButton = document.getElementById("hint-btn");
const shareButton = document.getElementById("share-btn");
const readPassageButton = document.getElementById("read-passage-btn");
const toggleChallengeButton = document.getElementById("toggle-challenge");
const submitButton = document.getElementById("submit-btn");
const toggleThemeButton = document.getElementById("toggle-theme");
const themeSelect = document.getElementById("theme-select");
const timerSettingSelect = document.getElementById("timer-setting");
const timerBar = document.getElementById("timer-bar");
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// ----------------------
// Navigation & Controls
// ----------------------
grammarSelect.addEventListener("change", () => {
  if (!state.isFlatArray) {
    state.currentGrammarType = grammarSelect.value;
    state.currentPassageIndex = 0;
    state.timeLeft = (timerSettingSelect.value === "off") ? 0 : parseInt(timerSettingSelect.value);
    displayPassage();
    updateStatus();
  }
});
// Theme selection
if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    const choice = themeSelect.value;
    document.body.classList.remove("light-mode", "theme1", "theme2");
    if (choice === "light") {
      document.body.classList.add("light-mode");
    } else if (choice === "theme1") {
      document.body.classList.add("theme1");
    } else if (choice === "theme2") {
      document.body.classList.add("theme2");
    }
  });
}

// Add event listener for text size slider
textSizeSlider.addEventListener("input", () => {
  const textSize = textSizeSlider.value;
  passageText.style.fontSize = `${textSize}rem`;
  wordBox.style.fontSize = `${textSize * 0.8}rem`; // Slightly smaller for word box
  speak(`Text size adjusted to ${textSize} rem`);
});

nextPassageButton.addEventListener("click", () => {
  clearInterval(state.timerInterval);
  state.currentPassageIndex++;
  const totalPassages = state.isFlatArray ? window.passages.length : window.passages[state.currentGrammarType].length;
  if (state.currentPassageIndex >= totalPassages) {
    feedbackDisplay.textContent = "Game Over! Final Score: " + state.score;
    speak("Game Over! Your final score is " + state.score);
    return;
  }
  state.timeLeft = (timerSettingSelect.value === "off") ? 0 : parseInt(timerSettingSelect.value);
  fadeOutIn(passageText, () => displayPassage());
  updateStatus();
});

prevPassageButton.addEventListener("click", () => {
  if (state.currentPassageIndex > 0) {
    state.currentPassageIndex--;
    state.timeLeft = (timerSettingSelect.value === "off") ? 0 : parseInt(timerSettingSelect.value);
    clearInterval(state.timerInterval);
    fadeOutIn(passageText, () => displayPassage());
    updateStatus();
  }
});

clearButton.addEventListener("click", () => {
  state.hintUsage = {};
  state.selectedWord = null;
  state.timeLeft = (timerSettingSelect.value === "off") ? 0 : parseInt(timerSettingSelect.value);
  clearInterval(state.timerInterval);
  displayPassage();
});

hintButton.addEventListener("click", () => {
  const passage = state.isFlatArray ? window.passages[state.currentPassageIndex] : window.passages[state.currentGrammarType][state.currentPassageIndex];
  if (passage.hint) {
    feedbackDisplay.textContent = passage.hint;
    feedbackDisplay.style.color = "blue";
    speak(passage.hint);
  }
});

shareButton.addEventListener("click", () => {
  const shareData = {
    title: "Grammar Cloze Adventure",
    text: `I am a ${state.level} with a score of ${state.score}! Can you beat my score?`,
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
    // Replace ___(\d+)___ with "blank" for speech
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
  else {
    clearInterval(state.timerInterval);
    timerBar.style.width = "0%";
  }
  updateStatus();
});

submitButton.addEventListener("click", () => {
  const blanks = document.querySelectorAll(".blank");
  let allFilled = true;
  blanks.forEach(blank => {
    if (!blank.classList.contains("filled")) allFilled = false;
  });
  if (!allFilled) {
    feedbackDisplay.textContent = "Please complete all blanks before submitting.";
    feedbackDisplay.style.color = "red";
    speak("Please complete all blanks before submitting.");
    return;
  }
  let correctCount = 0;
  blanks.forEach(blank => {
    if (blank.classList.contains("correct")) correctCount++;
  });
  const rewardMessage = `Review: You got ${correctCount} out of ${blanks.length} correct.`;
  feedbackDisplay.textContent = rewardMessage;
  speak(rewardMessage);
  if (state.challengeMode && Object.keys(state.hintUsage).length === 0) {
    state.score += 20;
    feedbackDisplay.innerHTML += ' <span class="bonus">+20!</span>';
    speak("Bonus! 20 extra points for no hints.");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "h") {
    hintButton.click();
  } else if (e.key.toLowerCase() === "n") {
    nextPassageButton.click();
  }
});
