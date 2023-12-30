const sightWordsFirstGrade = ["the", "and", "you", "my", "is", "it", "in", "to", "we", "go", /* Add more first-grade words here */];
const sightWordsSecondGrade = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes", /* Add more second-grade words here */];

const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const checkWordBtn = document.getElementById('check-word-btn');
const nextWordBtn = document.getElementById('next-word-btn');
const progressDisplay = document.getElementById('progress');

let currentWordIndex = 0;
let correctAnswers = 0;

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showNextWord() {
    const allWords = [...sightWordsFirstGrade, ...sightWordsSecondGrade];
    shuffleArray(allWords);

    if (currentWordIndex < allWords.length) {
        const currentWord = allWords[currentWordIndex];

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
    const allWords = [...sightWordsFirstGrade, ...sightWordsSecondGrade];
    const currentWord = allWords[currentWordIndex];
    const userAnswer = wordInput.value.toLowerCase();

    if (userAnswer === currentWord) {
        correctAnswers++;
        progressDisplay.textContent = `Progress: ${Math.round((correctAnswers / allWords.length) * 100)}%`;
    }

    checkWordBtn.disabled = true;
    nextWordBtn.disabled = false;
}

nextWordBtn.addEventListener('click', () => {
    currentWordIndex++;
    showNextWord();
});

checkWordBtn.addEventListener('click', checkWord);

showNextWord();

