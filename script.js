document.addEventListener('DOMContentLoaded', () => {
  const blanks = document.querySelectorAll('.blank');
  const wordBox = document.querySelector('.words');
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('feedback');
  let draggedWord = null;

  // Initialize drag events for words
  const words = document.querySelectorAll('.word');
  words.forEach(word => {
    word.addEventListener('dragstart', e => {
      draggedWord = e.target;
      e.target.classList.add('dragging');
    });
    word.addEventListener('dragend', e => {
      e.target.classList.remove('dragging');
      draggedWord = null;
    });
  });

  // Enable dropping on blanks and word box
  blanks.forEach(blank => {
    blank.addEventListener('dragover', e => e.preventDefault());
    blank.addEventListener('dragenter', e => e.target.classList.add('active'));
    blank.addEventListener('dragleave', e => e.target.classList.remove('active'));
    blank.addEventListener('drop', handleDrop);
  });

  wordBox.addEventListener('dragover', e => e.preventDefault());
  wordBox.addEventListener('dragenter', e => e.target.classList.add('active'));
  wordBox.addEventListener('dragleave', e => e.target.classList.remove('active'));
  wordBox.addEventListener('drop', handleDrop);

  function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('active');
    if (!draggedWord) return;

    const dropTarget = e.target.closest('.blank') || e.target.closest('.words');
    if (dropTarget) {
      if (dropTarget.classList.contains('blank')) {
        if (dropTarget.firstChild) {
          wordBox.appendChild(dropTarget.firstChild); // Return existing word
        }
        dropTarget.appendChild(draggedWord);
      } else if (dropTarget.classList.contains('words')) {
        dropTarget.appendChild(draggedWord);
      }
      checkCompletion();
    }
  }

  function checkCompletion() {
    const allFilled = Array.from(blanks).every(blank => blank.firstChild);
    submitBtn.disabled = !allFilled;
    submitBtn.style.backgroundColor = allFilled ? 'var(--primary-color)' : '#cccccc';
  }

  submitBtn.addEventListener('click', () => {
    let allCorrect = true;
    blanks.forEach(blank => {
      const word = blank.firstChild ? blank.firstChild.textContent : '';
      const correctAnswer = blank.dataset.answer;
      blank.classList.remove('correct', 'incorrect');
      if (word === correctAnswer) {
        blank.classList.add('correct');
      } else {
        blank.classList.add('incorrect');
        allCorrect = false;
      }
    });
    feedback.textContent = allCorrect 
      ? "Well done! All answers are correct." 
      : "Some answers are incorrect. Try again!";
  });
});
