const sightWordsFirstGrade = ["the", "and", "you", "my", "is", "it", "in", "to", "we", "go", /* Add more first-grade words here */];
const sightWordsSecondGrade = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes", /* Add more second-grade words here */];

const sentencesContainer = document.getElementById('sentences-container');
const checkWordsBtn = document.getElementById('check-words-btn');
const nextSentencesBtn = document.getElementById('next-sentences-btn');
const progressDisplay = document.getElementById('progress');
const nameInput = document.getElementById('name-input');

let sentences = [];
let currentSentenceIndex = 0;
let correctAnswers = 0;

function generateRandomSentence() {
    const allWords = [...sightWordsFirstGrade, ...sightWordsSecondGrade];
    const sentenceTemplate = "This is ___ and we ___ to the ___ to ___.";

    // Replace placeholders with random sight words
    const sentence = sentenceTemplate.replace(/___/g, () => {
        const randomIndex = Math.floor(Math.random() * allWords.length);
        return allWords[randomIndex];
    });

    return sentence;
}

function showNextSentences() {
    const sentence = generateRandomSentence();

    sentences.push(sentence);

    if (currentSentenceIndex < sentences.length) {
        const currentSentence = sentences[currentSentenceIndex];

        sentencesContainer.innerHTML = `Hello ${nameInput.value}! ${currentSentence}`;
        checkWordsBtn.disabled = false;
        nextSentencesBtn.disabled = true;
    } else {
        sentencesContainer.textContent = "Mission Accomplished!";
        checkWordsBtn.disabled = true;
        nextSentencesBtn.disabled = true;
    }
}

function checkWords() {
    const currentSentence = sentences[currentSentenceIndex];
    const blanksCount = (currentSentence.match(/___/g) || []).length;

    for (let i = 0; i < blanksCount; i++) {
        const currentWord = getCurrentWord();
        const userAnswer = prompt(`Fill in the blank: "${currentWord}"`);

        if (userAnswer.toLowerCase() === currentWord.toLowerCase()) {
            correctAnswers++;
        }
    }

    const progress = Math.round((correctAnswers / blanksCount) * 100);
    progressDisplay.textContent = `Progress: ${progress}%`;

    const completedSentence = currentSentence.replace(/___/g, '<span class="completed-blank">____</span>');
    sentencesContainer.innerHTML = `Good job, ${nameInput.value}! ${completedSentence}`;

    checkWordsBtn.disabled = true;
    nextSentencesBtn.disabled = false;
}

function getCurrentWord() {
    const allWords = [...sightWordsFirstGrade, ...sightWordsSecondGrade];
    return allWords[Math.floor(Math.random() * allWords.length)];
}

nextSentencesBtn.addEventListener('click', () => {
    currentSentenceIndex++;
    showNextSentences();
});

checkWordsBtn.addEventListener('click', checkWords);

showNextSentences();
