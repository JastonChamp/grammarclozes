document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.wheel');
    if (!wheel) {
        console.error('Wheel element not found!');
        return;
    }

    const spinButton = document.getElementById('spinButton');
    if (!spinButton) {
        console.error('Spin button not found!');
        return;
    }

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
        'guile', 'hose', 'knave', 'lease', 'more', 'niece', 'prune', 'celebrate', 
        'activate', 'elevate', 'meditate', 'emulate', 'illustrate', 'investigate', 
        'navigate', 'originate', 'regulate', 'vibrate', 'fabricate', 'motivate', 
        'replicate', 'dominate', 'evaluate', 'grace', 'plate', 'trade', 'brave', 
        'chase', 'glaze', 'praise', 'shame', 'whale', 'crave', 'flame', 'plane', 
        'slide', 'stripe', 'throne', 'grove', 'shine', 'smile', 'stone', 'swipe', 
        'drive', 'prize', 'slice', 'spine', 'stripe', 'throne', 'blame', 'freeze', 
        'grease', 'please', 'prone', 'scene', 'type', 'waste', 'whine', 'bride', 
        'crime', 'grime', 'phone', 'prime', 'rhyme', 'scope', 'spoke', 'thrive', 
        'alive', 'brine', 'clone', 'flute', 'groan', 'plume',
        // ... any additional words can be added here
    ];

    const isExceptionalWord = (word) => longVowelExceptions.includes(word.toLowerCase());
    const isLongVowelPair = (letter, nextLetter) => {
        const longVowelPairs = ['ai', 'ea', 'ee', 'ie', 'oa', 'oe', 'ue', 'ei', 'ey'];
        return longVowelPairs.includes(letter + nextLetter);
    };

    longVowelWords.forEach(word => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        let coloredWord = '';
        let isExceptional = isExceptionalWord(word);

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            let nextLetter = word[i + 1] || '';
            let isVowel = 'aeiou'.includes(letter);

            if (isExceptional && isVowel) {
                coloredWord += `<span class="vowel-blue">${letter}</span>`;
            } else if (letter === 'e' && i === word.length - 1) {
                coloredWord += `<span class="silent-e">${letter}</span>`;
            } else if (isVowel && (nextLetter === 'e' || isLongVowelPair(letter, nextLetter))) {
                coloredWord += `<span class="vowel-blue">${letter}</span>`;
            } else if (isVowel) {
                coloredWord += `<span class="vowel-short">${letter}</span>`;
            } else {
                coloredWord += letter;
            }
        }

        slot.innerHTML = coloredWord;
        wheel.appendChild(slot);
    });

    let currentSlot = 0;
    const slots = document.querySelectorAll('.slot');
    slots[currentSlot].style.display = 'flex';

    spinButton.addEventListener('click', () => {
        let shuffleCount = 0;
        let lastRandom = 0;

        const shuffleEffect = setInterval(() => {
            if (slots[lastRandom]) {
                slots[lastRandom].style.display = 'none';
            }
            let randomSlot = Math.floor(Math.random() * longVowelWords.length);
            if (slots[randomSlot]) {
                slots[randomSlot].style.display = 'flex';
            }
            lastRandom = randomSlot;
            shuffleCount++;
            if (shuffleCount > 20) {
                clearInterval(shuffleEffect);
                if (slots[currentSlot]) {
                    slots[currentSlot].style.display = 'flex';
                }
            }
        }, 100);

        setTimeout(() => {
            let randomSlot = Math.floor(Math.random() * longVowelWords.length);
            if (slots[currentSlot]) {
                slots[currentSlot].style.display = 'none';
            }
            if (slots[randomSlot]) {
                slots[randomSlot].style.display = 'flex';
            }
            currentSlot = randomSlot;
        }, 2500);
    });
});
