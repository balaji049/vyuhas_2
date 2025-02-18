let currentLevel = 1;
let currentQuestionIndex = 0;
let score = 0;
let chosenAnswers = [];
let correctAnswers = [];

const questions = [
    // Level 1 questions
    { question: "1. What is a 'Vyuh' in Indian military history?", options: ["Formation", "Weapon", "Fortification", "General"], correct: "Formation" },
    { question: "2. Which famous Vyuh was used by the Kauravas in the Mahabharata?", options: ["Chakravyuha", "Padmavyuha", "Vajra", "Shakti"], correct: "Chakravyuha" },
    { question: "3. Who was the key warrior who broke the Chakravyuha formation?", options: ["Arjuna", "Abhimanyu", "Bhima", "Yudhishthira"], correct: "Abhimanyu" },
    { question: "4. In the Mahabharata, which formation was said to be the most difficult to penetrate?", options: ["Chakravyuha", "Padmavyuha", "Sarpavyuha", "Kurukshetra"], correct: "Chakravyuha" },
    { question: "5. Which Vyuh was known for its defensive strength and shaped like a lotus?", options: ["Padmavyuha", "Chakravyuha", "Sarpavyuha", "Vajra"], correct: "Padmavyuha" },
];

let timer;
let timeLimit = 60;

function startLevel(level) {
    if (level <= currentLevel) {
        currentQuestionIndex = 0;
        score = 0;
        chosenAnswers = [];
        correctAnswers = questions.slice(currentQuestionIndex, currentQuestionIndex + 5).map(q => q.correct);
        document.getElementById('levelNumber').textContent = level;
        showQuizScreen();
        loadQuestion();
        startTimer();
    } else {
        alert("This level is locked! Complete previous levels first.");
    }
}

function showQuizScreen() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'flex';
    document.getElementById('scoreCard').style.display = 'none';
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('quizQuestion').textContent = question.question;
    const options = document.getElementById('quizOptions');
    options.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('quiz-option');
        button.textContent = option;
        button.onclick = () => selectAnswer(option, button);
        options.appendChild(button);
    });
}

function selectAnswer(answer, button) {
    chosenAnswers[currentQuestionIndex] = answer;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    button.classList.add('selected');
    if (answer === correctAnswers[currentQuestionIndex]) {
        score++;
    }
}

function nextQuestion() {
    if (!chosenAnswers[currentQuestionIndex]) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        startTimer();
    } else {
        endLevel();
    }
}

function endLevel() {
    clearInterval(timer);
    checkLevelCompletion();
}

function checkLevelCompletion() {
    const skippedOrIncorrect = chosenAnswers.some((answer, index) => !answer || answer !== correctAnswers[index]);

    if (!skippedOrIncorrect) {
        currentLevel++;
        alert(`Congratulations! You've completed Level ${currentLevel - 1}. Now, proceed to Level ${currentLevel}.`);
        unlockNextLevel();
    } else {
        alert("You did not answer all questions correctly, or some were skipped. Please try again.");
    }

    showScoreCard();
}

function unlockNextLevel() {
    const nextLevelButton = document.querySelectorAll('.level')[currentLevel - 1];
    if (nextLevelButton) {
        nextLevelButton.classList.remove('locked');
        nextLevelButton.classList.add('unlocked');
    }
}

function showScoreCard() {
    const skipped = questions.length - chosenAnswers.filter(Boolean).length;

    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('scoreCard').style.display = 'flex';
    document.getElementById('attempted').textContent = chosenAnswers.filter(Boolean).length;
    document.getElementById('nonAttempted').textContent = skipped;
    document.getElementById('score').textContent = score;
    document.getElementById('correctAnswers').textContent = correctAnswers.join(', ');
    document.getElementById('chosenAnswers').textContent = chosenAnswers.map(a => a || "Skipped").join(', ');
}

function retryLevel() {
    startLevel(currentLevel);
}

function goBack() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('scoreCard').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'grid';
}

function startTimer() {
    const timerCircle = document.querySelector('.timer-circle');
    const timerText = document.querySelector('.timer-text');
    let time = timeLimit;
    let angle = 0;

    timerCircle.style.background = `conic-gradient(#76c7c0 ${angle}deg, #e0e0e0 ${angle}deg)`;
    timerText.textContent = time;

    timer = setInterval(() => {
        time--;
        angle = (time / timeLimit) * 360;
        timerCircle.style.background = `conic-gradient(#76c7c0 ${angle}deg, #e0e0e0 ${angle}deg)`;
        timerText.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}
