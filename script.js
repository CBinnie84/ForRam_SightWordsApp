const sightWordsFirstGrade = ["the", "and", "you", "my", "is", "it", "in", "to", "we", "go"];
const sightWordsSecondGrade = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes"];

const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const checkWordBtn = document.getElementById('check-word-btn');
const nextWordBtn = document.getElementById('next-word-btn');
const progressDisplay = document.getElementById('progress');

let currentWordIndex = 0;
let correctAnswers = 0;

function showNextWord() {
    if (currentWordIndex < sightWordsFirstGrade.length + sightWordsSecondGrade.length) {
        const currentWord = currentWordIndex < sightWordsFirstGrade.length
            ? sightWordsFirstGrade[currentWordIndex]
            : sightWordsSecondGrade[currentWordIndex - sightWordsFirstGrade.length];

        wordDisplay.textContent = `Fill in the blank: "${currentWord.substring(0, 1)}____${currentWord.substring(2)}"`;
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
    const currentWord = currentWordIndex < sightWordsFirstGrade.length
        ? sightWordsFirstGrade[currentWordIndex]
        : sightWordsSecondGrade[currentWordIndex - sightWordsFirstGrade.length];
    const userAnswer = wordInput.value.toLowerCase();

    if (userAnswer === currentWord) {
        correctAnswers++;
        progressDisplay.textContent = `Progress: ${Math.round((correctAnswers / (sightWordsFirstGrade.length + sightWordsSecondGrade.length)) * 100)}%`;
    }

    checkWordBtn.disabled = true;
    nextWordBtn.disabled = false;
}

nextWordBtn.addEventListener('click', showNextWord);
checkWordBtn.addEventListener('click', checkWord);

showNextWord();
