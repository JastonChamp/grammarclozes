// script.js
document.addEventListener('DOMContentLoaded', () => {
    const blanks = document.querySelectorAll('.blank');
    const words = document.querySelectorAll('.word');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const pointsDisplay = document.getElementById('points');
    let points = 0;

    // Drag-and-Drop Setup
    words.forEach(word => {
        word.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', word.textContent);
        });
    });

    blanks.forEach(blank => {
        blank.addEventListener('dragover', (e) => e.preventDefault());
        blank.addEventListener('drop', (e) => {
            e.preventDefault();
            const wordText = e.dataTransfer.getData('text');
            const draggedWord = Array.from(words).find(w => w.textContent === wordText && !w.classList.contains('used'));
            if (draggedWord && !blank.textContent) {
                blank.textContent = wordText;
                draggedWord.classList.add('used');
            }
        });
    });

    // Submit Button Logic
    submitBtn.addEventListener('click', () => {
        let allCorrect = true;
        blanks.forEach(blank => {
            const userAnswer = blank.textContent.trim();
            const correctAnswer = blank.dataset.answer;
            blank.classList.remove('correct', 'incorrect');
            if (userAnswer === correctAnswer) {
                blank.classList.add('correct');
            } else {
                blank.classList.add('incorrect');
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedback.textContent = "Well done! You’ve restored Grammar Guru’s power!";
            points += 10;
            pointsDisplay.textContent = `Points: ${points}`;
            triggerConfetti();
            submitBtn.disabled = true;
        } else {
            feedback.textContent = "Some answers are incorrect. Try again!";
        }
    });

    // Simple Confetti Animation
    function triggerConfetti() {
        const confettiDiv = document.createElement('div');
        confettiDiv.className = 'confetti';
        document.body.appendChild(confettiDiv);
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.style.width = '10px';
            piece.style.height = '10px';
            piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            piece.style.position = 'absolute';
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.top = '-10px';
            piece.style.animation = `fall ${Math.random() * 2 + 1}s linear`;
            confettiDiv.appendChild(piece);
        }
        setTimeout(() => confettiDiv.remove(), 3000);
    }
});

// CSS Animation for Confetti
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(styleSheet);
