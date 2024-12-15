// Word list
const words = ['Snake', 'Whale', 'Horse', 'Robin', 'Adder', 'Betta', 'Bison', 'Camel', 
    'Coati', 'Cobra', 'Dingo', 'Eagle', 'Gecko', 'Goose', 'Heron'];
const targetWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
let attempts = 0;

document.addEventListener('DOMContentLoaded', () => {
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const feedbackContainer = document.getElementById('feedback-container');
const resultMessage = document.getElementById('result-message');
const attemptsDisplay = document.getElementById('attempts');
const keyboardContainer = document.getElementById('keyboard-container');

// Generate keyboard rows
const keyboardRows = [
'qwertyuiop',
'asdfghjkl',
'zxcvbnm'
];

keyboardRows.forEach(row => {
const rowDiv = document.createElement('div');
rowDiv.classList.add('keyboard-row');
row.split('').forEach(letter => {
 const key = document.createElement('button');
 key.textContent = letter.toUpperCase();
 key.classList.add('key');
 key.addEventListener('click', () => handleKeyPress(letter));
 rowDiv.appendChild(key);
});
keyboardContainer.appendChild(rowDiv);
});

// Add Enter and Delete keys
const functionRow = document.createElement('div');
functionRow.classList.add('keyboard-row');

const enterKey = document.createElement('button');
enterKey.textContent = 'Enter';
enterKey.classList.add('key', 'enter');
enterKey.addEventListener('click', handleSubmit);
functionRow.appendChild(enterKey);

const deleteKey = document.createElement('button');
deleteKey.textContent = 'Delete';
deleteKey.classList.add('key', 'delete');
deleteKey.addEventListener('click', handleDelete);
functionRow.appendChild(deleteKey);

keyboardContainer.appendChild(functionRow);

submitButton.addEventListener('click', handleSubmit);

function handleKeyPress(letter) {
if (guessInput.value.length < 5) {
 guessInput.value += letter;
}
}

function handleDelete() {
guessInput.value = guessInput.value.slice(0, -1);
}

function handleSubmit() {
const guess = guessInput.value.toLowerCase();
if (guess.length !== 5) {
 alert('Please enter a 5-letter word.');
 return;
}

attempts++;
attemptsDisplay.textContent = attempts;

const feedbackRow = document.createElement('div');
feedbackRow.classList.add('feedback-row');

for (let i = 0; i < 5; i++) {
 const box = document.createElement('div');
 box.classList.add('feedback-box');
 box.textContent = guess[i]?.toUpperCase();

 if (guess[i] === targetWord[i]) {
     box.classList.add('green');
 } else if (targetWord.includes(guess[i])) {
     box.classList.add('yellow');
 } else {
     box.classList.add('gray');
 }

 feedbackRow.appendChild(box);
}

feedbackContainer.appendChild(feedbackRow);

if (guess === targetWord) {
 resultMessage.textContent = `🎉 Correct! The word was "${targetWord.toUpperCase()}".`;
 disableInput();
} else if (attempts === 6) {
 resultMessage.textContent = `❌ Game over! The word was "${targetWord.toUpperCase()}".`;
 disableInput();
}

guessInput.value = '';
}

function disableInput() {
guessInput.disabled = true;
Array.from(keyboardContainer.querySelectorAll('.key')).forEach(key => key.disabled = true);
}
});