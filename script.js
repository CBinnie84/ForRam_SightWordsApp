const sightWordsFirstGrade = ["the", "and", "you", "my", "is", "it", "in", "to", "we", "go", /* Add more first-grade words here */];
const sightWordsSecondGrade = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes", /* Add more second-grade words here */];

const allSightWords = [...sightWordsFirstGrade, ...sightWordsSecondGrade];

const sentences = generateSentences(allSightWords);

const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const checkWordBtn = document.getElementById('check-word-btn');
const nextWordBtn = document.getElementById('next-word-btn');
const progressDisplay = document.getElementById('progress');
const nameInput = document.getElementById('name-input');

let currentSentenceIndex = 0;
let correctAnswers = 0;

function generateSentences(words) {
    return words.map(word => `I have a ___ in my pocket.`);
}

function showNextSentence() {
    if (currentSentenceIndex < sentences.length) {
        const currentSentence = sentences[currentSentenceIndex];
        const sentenceWithBlanks = currentSentence.replace(/___/g, '<span class="blank">____</span>');

        wordDisplay.innerHTML = `Hello ${nameInput.value}! ${sentenceWithBlanks}`;
        wordInput.value = '';
        checkWordBtn.disabled = false;
        nextWordBtn.disabled = true;
    } else {
        wordDisplay.textContent = "Mission Accomplished!";
        checkWordBtn.disabled = true;
        nextWordBtn.disabled = true;
    }
}

function checkWord() {
    const currentSentence = sentences[currentSentenceIndex];
    const blanksCount = (currentSentence.match(/___/g) || []).length;

    for (let i = 0; i < blanksCount; i++) {
        const currentWord = getCurrentWord();
        const userAnswer = wordInput.value.toLowerCase();

        if (userAnswer === currentWord) {
            correctAnswers++;
        }
    }

    const progress = Math.round((correctAnswers / blanksCount) * 100);
    progressDisplay.textContent = `Progress: ${progress}%`;

    const completedSentence = currentSentence.replace(/___/g, `<span class="completed-blank">${getCurrentWord()}</span>`);
    wordDisplay.innerHTML = `Good job, ${nameInput.value}! ${completedSentence}`;

    checkWordBtn.disabled = true;
    nextWordBtn.disabled = false;
}

function getCurrentWord() {
    return allSightWords[Math.floor(Math.random() * allSightWords.length)];
}

nextWordBtn.addEventListener('click', () => {
    currentSentenceIndex++;
    showNextSentence();
});

checkWordBtn.addEventListener('click', checkWord);

showNextSentence();
