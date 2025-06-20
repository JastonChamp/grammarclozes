export const synth = window.speechSynthesis;
export let voices = [];
let ukFemaleVoice = null;

export function loadVoices() {
  voices = synth.getVoices();
  ukFemaleVoice =
    voices.find(
      (voice) =>
        voice.lang === "en-GB" &&
        (voice.name.toLowerCase().includes("female") ||
          voice.name === "Samantha" ||
         voice.name === "Kate" ||
          voice.name === "Serena")
    ) || voices.find((voice) => voice.lang === "en-GB");
  return voices;
}

loadVoices();
synth.onvoiceschanged = loadVoices;

export function speak(text) {
  if (!window.speechSynthesis) {
    return;
  }
  if (synth.speaking) synth.cancel();
  loadVoices();
  if (!voices.length) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  const select = document.getElementById("voice-select");
  let chosen = null;
  if (select && select.value) {
    chosen = voices.find(v => v.name === select.value);
  }
  utterance.voice = chosen || ukFemaleVoice || voices[0];
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  synth.speak(utterance);
}

export function testFontAvailability() {
  const testDiv = document.createElement("div");
  testDiv.style.fontFamily = '"Open Dyslexic"';
  testDiv.style.position = "absolute";
  testDiv.style.visibility = "hidden";
  testDiv.textContent = "Test";
  document.body.appendChild(testDiv);
  const computedFont = window.getComputedStyle(testDiv).fontFamily;
  document.body.removeChild(testDiv);
  if (!computedFont.includes("Open Dyslexic")) {
    console.warn(
      "Open Dyslexic font may not be loaded correctly. Falling back to Comic Sans MS."
    );
  }
}
