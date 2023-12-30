const sightWordsFirstGrade = ["the", "and", "you", "my", "is", "it", "in", "to", "we", "go", /* Add more first-grade words here */];
const sightWordsSecondGrade = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes", /* Add more second-grade words here */];

const wordDisplay = document.getElementById('word-display');
const nameInput = document.getElementById('name-input');
const wordInput = document.getElementById('word-input');
const checkWordBtn = document.getElementById('check-word-btn');
const nextWordBtn = document.getElementById('next-word-btn');
const progressDisplay = document.getElementById('progress');

let currentWordIndex = 0;
let correctAnswers = 0;
let userName = "";

function initializeGame() {
    nameInput.addEventListener('input', () => {
        userName = nameInput.value;
    });

    nextWordBtn.addEventListener('click', () => {
        currentWordIndex++;
        showNextWord();
    });

    checkWordBtn.addEventListener('click', checkWord);

    showNextWord();
}

function showNextWord() {
    const allWords = [...sightWordsFirstGrade, ...sightWordsSecondGrade];
    shuffleArray(allWords);

    if (currentWordIndex < allWords.length) {
        const currentWord = allWords[currentWordIndex];

        wordDisplay.textContent = `Hey ${userName}, fill in the blank: "${currentWord.substring(0, 1)}____${currentWord.substring(2)}"`;
        wordInput.value = '';
        checkWordBtn.disabled = false;
        nextWordBtn.disabled = true;
    } else {
        wordDisplay.textContent = `Good job, ${userName}! Mission Accomplished!`;
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
        wordDisplay.textContent = `Good job, ${userName}! You got the word right.`;
    } else {
        wordDisplay.textContent = `Oops, try again, ${userName}. Fill in the blank: "${currentWord.substring(0, 1)}____${currentWord.substring(2)}"`;
    }

    checkWordBtn.disabled = true;
    nextWordBtn.disabled = false;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initializeGame();

