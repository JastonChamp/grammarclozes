document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.wheel');
    const longVowelWords = [
        'cake', 'hope', 'ride', 'plane', 'cube', 'note', 'dime', 'like', 'home', 
        // ... add more long vowel words with silent 'e'
    ];

    longVowelWords.forEach(word => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        let coloredWord = '';

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            if ('aeiou'.includes(letter) && i !== word.length - 1) {
                coloredWord += `<span class="vowel-blue">${letter}</span>`;
            } else if (i === word.length - 1 && letter === 'e') {
                coloredWord += `<span class="silent-e">${letter}</span>`;
            } else {
                coloredWord += letter;
            }
        }

        slot.innerHTML = coloredWord;
        slot.style.display = 'none';
        wheel.appendChild(slot);
    });

    const slots = document.querySelectorAll('.slot');
    let currentSlot = 0;
    slots[currentSlot].style.display = 'flex';

    document.getElementById('spinButton').addEventListener('click', () => {
        let shuffleCount = 0;
        let lastRandom = 0;

        const shuffleEffect = setInterval(() => {
            slots[lastRandom].style.display = 'none';
            let randomSlot = Math.floor(Math.random() * longVowelWords.length);
            slots[randomSlot].style.display = 'flex';
            lastRandom = randomSlot;
            shuffleCount++;
            if (shuffleCount > 20) {
                clearInterval(shuffleEffect);
                slots[lastRandom].style.display = 'none';
                slots[currentSlot].style.display = 'flex';
            }
        }, 100);

        setTimeout(() => {
            let randomSlot = Math.floor(Math.random() * longVowelWords.length);
            slots[currentSlot].style.display = 'none';
            slots[randomSlot].style.display = 'flex';
            currentSlot = randomSlot;
        }, 2500);
    });
});
