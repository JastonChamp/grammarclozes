document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.wheel');
    const longVowelWords = [
        'spade', 'mate', 'game', 'afraid', 'bake', 'gave', 'way', 'rake', 'great', 
        'holiday', 'clay', 'baked', 'wake', 'played', 'stayed', 'stay', 'against', 
        'paint', 'nails', 'tray', 'find', 'right', 'flight', 'skies', 'sight', 
        'five', 'height', 'dive', 'kind', 'light', 'night', 'white', 'realised', 
        'realise', 'quite', 'delighted', 'drove', 'though', 'both', 'low', 'home', 
        'hoped', 'nose', 'ago', 'envelope', 'propose', 'floated', 'only', "won't", 
        'wrote', 'note', "don't", 'show', 'own', 'owned', 'close', 'road', 'cove', 
        'pillow', 'hollow', 'boat', 'float', 'emu', 'useful', 'cube', 'cane', 'fume', 
        'gaze', 'hive', 'joke', 'kite', 'lime', 'maze', 'nape', 'poke', 'rude', 'sage', 
        'tune', 'vape', 'wane', 'yoke', 'zone', 'acne', 'bane', 'cope', 'dune', 'fare', 
        'gape', 'hale', 'june', 'lace', 'mine', 'name', 'pike', 'robe', 'sake', 'tape', 
        'vase', 'wake', 'yule', 'amuse', 'brace', 'crane', 'drape', 'flame', 'grape', 
        'haste', 'juice', 'lance', 'moose', 'pride', 'raise', 'shade', 'trace', 'value', 
        'waste', 'alone', 'brace', 'crave', 'drive', 'flute', 'grime', 'house', 'judge', 
        'lathe', 'mouse', 'noise', 'prize', 'range', 'shape', 'trice', 'vague', 'arise', 
        'blame', 'crone', 'frame', 'grove', 'horse', 'knife', 'leave', 'morse', 'price', 
        'rathe', 'shave', 'tripe', 'vane', 'adore', 'blaze', 'crude', 'drone', 'froze', 
        'guile', 'hose', 'knave', 'lease', 'more', 'niece', 'prune'
        // ... any additional words can be added here
];

    longVowelWords.forEach(word => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        let coloredWord = '';

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            let nextLetter = word[i + 1] || '';
            let isVowel = 'aeiou'.includes(letter);
            let isNextVowel = 'aeiou'.includes(nextLetter);

            // Check for silent 'e'
            if (letter === 'e' && i === word.length - 1) {
                coloredWord += `<span class="silent-e">${letter}</span>`;
            } else if (isVowel && (nextLetter === 'e' || (isNextVowel && nextLetter !== ''))) {
                // Long vowels
                coloredWord += `<span class="vowel-blue">${letter}</span>`;
            } else if (isVowel) {
                // Short vowels
                coloredWord += `<span class="vowel-short">${letter}</span>`;
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
