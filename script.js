
// ===== ABC LEARNING DATA =====

const alphabet = [
    ["A", "Apple 🍎"],
    ["B", "Ball ⚽"],
    ["C", "Cat 🐱"],
    ["D", "Dog 🐶"],
    ["E", "Elephant 🐘"],
    ["F", "Fish 🐟"],
    ["G", "Grapes 🍇"],
    ["H", "Horse 🐴"],
    ["I", "Ice Cream 🍦"],
    ["J", "Juice 🧃"],
    ["K", "Kite 🪁"],
    ["L", "Lion 🦁"],
    ["M", "Mango 🥭"],
    ["N", "Nest 🪺"],
    ["O", "Orange 🍊"],
    ["P", "Parrot 🦜"],
    ["Q", "Queen 👑"],
    ["R", "Rabbit 🐰"],
    ["S", "Sun ☀️"],
    ["T", "Tiger 🐯"],
    ["U", "Umbrella ☂️"],
    ["V", "Van 🚐"],
    ["W", "Watch ⌚"],
    ["X", "Xylophone 🎵"],
    ["Y", "Yak 🦬"],
    ["Z", "Zebra 🦓"]
];

// ===== CURRENT LETTER =====

let currentIndex = 0;

// ===== SHOW LETTER =====

function showLetter() {

    const letter = alphabet[currentIndex];

    document.getElementById("letter").innerText = letter[0];

    document.getElementById("word").innerText =
        letter[0] + " for " + letter[1];

    document.getElementById("abcProgress").innerText =
        "Letter " + (currentIndex + 1) + " of 26";
}

// ===== NEXT LETTER =====

function nextLetter() {

    if (currentIndex < alphabet.length - 1) {
        currentIndex++;
        showLetter();
    } else {
        alert("Congratulations! You completed ABC! 🎉");
    }
}

// ===== PREVIOUS LETTER =====

function previousLetter() {

    if (currentIndex > 0) {
        currentIndex--;
        showLetter();
    }
}

// ===== VOICE FUNCTION =====

function speakLetter() {

    const letter = alphabet[currentIndex];

    const speech = new SpeechSynthesisUtterance(
        letter[0] + " for " + letter[1].split(" ")[0]
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

// ===== OPEN GAME =====


function openGame(gameName) {

    // Sabhi game screens ko hide karo
    document.getElementById("abcGame").style.display = "none";
    document.getElementById("numberGame").style.display = "none";
    document.getElementById("mathChallenge").style.display = "none";

    // Selected game open karo
    if (gameName === "abc") {

        document.getElementById("abcGame").style.display = "block";
        showLetter();

    } 
    else if (gameName === "math") {

        document.getElementById("numberGame").style.display = "block";

    } 
    else if (gameName === "challenge") {

        document.getElementById("mathChallenge").style.display = "block";

    }

    // Game screen par scroll karo
    const gameIds = {
        abc: "abcGame",
        math: "numberGame",
        challenge: "mathChallenge"
    };

    document.getElementById(gameIds[gameName]).scrollIntoView({
        behavior: "smooth"
    });

}


// ===== START LEARNING =====

function startLearning() {
    openGame("abc");
}

// ===== ABC QUIZ SYSTEM =====

let coins = 0;
let answered = false;

const quizPictures = [
    { name: "Apple", emoji: "🍎" },
    { name: "Ball", emoji: "⚽" },
    { name: "Cat", emoji: "🐱" },
    { name: "Dog", emoji: "🐶" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Fish", emoji: "🐟" },
    { name: "Grapes", emoji: "🍇" },
    { name: "Horse", emoji: "🐴" },
    { name: "Ice Cream", emoji: "🍦" },
    { name: "Juice", emoji: "🧃" },
    { name: "Kite", emoji: "🪁" },
    { name: "Lion", emoji: "🦁" },
    { name: "Mango", emoji: "🥭" },
    { name: "Nest", emoji: "🪺" },
    { name: "Orange", emoji: "🍊" },
    { name: "Parrot", emoji: "🦜" },
    { name: "Queen", emoji: "👑" },
    { name: "Rabbit", emoji: "🐰" },
    { name: "Sun", emoji: "☀️" },
    { name: "Tiger", emoji: "🐯" },
    { name: "Umbrella", emoji: "☂️" },
    { name: "Van", emoji: "🚐" },
    { name: "Watch", emoji: "⌚" },
    { name: "Xylophone", emoji: "🎵" },
    { name: "Yak", emoji: "🦬" },
    { name: "Zebra", emoji: "🦓" }
];

// ===== CREATE QUIZ =====

function renderQuiz() {

    answered = false;

    const correct = quizPictures[currentIndex];

    document.getElementById("quizQuestion").innerText =
        "Which picture starts with " + alphabet[currentIndex][0] + "?";

    document.getElementById("quizFeedback").innerText = "";

    let options = [correct];

    while (options.length < 4) {

        let random = quizPictures[
            Math.floor(Math.random() * quizPictures.length)
        ];

        if (!options.some(item => item.name === random.name)) {
            options.push(random);
        }
    }

    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById("quizOptions");

    container.innerHTML = "";

    options.forEach(item => {

        const button = document.createElement("button");

        button.className = "quiz-option";

        button.innerHTML = `
            <span>${item.emoji}</span>
            <strong>${item.name}</strong>
        `;

        button.onclick = () => checkAnswer(item.name, button);

        container.appendChild(button);
    });
}

// ===== CHECK ANSWER =====

function checkAnswer(answer, button) {

    if (answered) return;

    if (answer === quizPictures[currentIndex].name) {

        answered = true;

        coins += 10;

        document.getElementById("coinScore").innerText = coins;

        document.getElementById("quizFeedback").innerText =
            "🎉 Excellent! You earned 10 coins!";

        button.classList.add("correct-answer");

        speakLetter();

    } else {

        document.getElementById("quizFeedback").innerText =
            "❌ Try Again! Hint: " +
            alphabet[currentIndex][0] + " for " +
            alphabet[currentIndex][1];
    }
}

// ===== UPDATE LETTER =====

const originalShowLetter = showLetter;

showLetter = function() {
    originalShowLetter();
    renderQuiz();
};

// ===== NUMBER LEARNING SYSTEM =====

const numberWords = [
    "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen",
    "Fifteen", "Sixteen", "Seventeen", "Eighteen",
    "Nineteen", "Twenty"
];

let numberIndex = 0;

// SHOW NUMBER

function showNumber() {

    document.getElementById("numberDisplay").innerText =
        numberIndex + 1;

    document.getElementById("numberWord").innerText =
        numberWords[numberIndex];

    document.getElementById("numberHint").innerText =
        "Count and Learn! 🎉";

    document.getElementById("numberProgress").innerText =
        "Number " + (numberIndex + 1) + " of 20";
}

// NEXT NUMBER

function nextNumber() {

    if (numberIndex < 19) {
        numberIndex++;
        showNumber();
    } else {
        alert("Amazing! You completed Numbers 1 to 20! 🏆");
    }
}

// PREVIOUS NUMBER

function previousNumber() {

    if (numberIndex > 0) {
        numberIndex--;
        showNumber();
    }
}

// NUMBER VOICE

function speakNumber() {

    const speech = new SpeechSynthesisUtterance(
        numberWords[numberIndex]
    );

    speech.lang = "en-US";
    speech.rate = 0.8;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

// OPEN MATH GAME

const previousOpenGame = openGame;

openGame = function(gameName) {

    if (gameName === "math") {

        document.getElementById("numberGame").style.display = "block";

        document.getElementById("numberGame").scrollIntoView({
            behavior: "smooth"
        });

        showNumber();

    } else {

        previousOpenGame(gameName);

    }
};

// ===== MATH CHALLENGE GAME =====

let mathScore = 0;
let mathCoins = 0;
let mathTime = 30;
let mathTimerInterval;
let correctMathAnswer = 0;

function startMath(level) {

    clearInterval(mathTimerInterval);

    mathScore = 0;
    mathTime = 30;

    document.getElementById("mathScore").innerText = mathScore;
    document.getElementById("mathTimer").innerText = mathTime;

    document.getElementById("mathPlayArea").style.display = "block";
    document.getElementById("mathQuestion").style.display = "block";
    document.getElementById("mathOptions").style.display = "grid";
    document.getElementById("mathFeedback").innerText = "";

    generateMathQuestion(level);

    mathTimerInterval = setInterval(function () {

        mathTime--;

        document.getElementById("mathTimer").innerText = mathTime;

        if (mathTime <= 0) {
            clearInterval(mathTimerInterval);
            document.getElementById("mathFeedback").innerText =
                "⏰ Time Up! Final Score: " + mathScore;
            document.getElementById("mathQuestion").style.display = "none";
            document.getElementById("mathOptions").style.display = "none";
        }

    }, 1000);
}


function generateMathQuestion(level) {

    let a, b, operator;

    // EASY LEVEL
    if (level === "easy") {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;

        operator = Math.random() < 0.5 ? "+" : "-";
    }

    // MEDIUM LEVEL
    else if (level === "medium") {
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 12) + 1;

        let operators = ["+", "-", "×"];
        operator = operators[Math.floor(Math.random() * 3)];
    }

    // HARD LEVEL
    else if (level === "hard") {

        let operators = ["+", "-", "×", "÷"];
        operator = operators[Math.floor(Math.random() * 4)];

        if (operator === "÷") {
            b = Math.floor(Math.random() * 10) + 1;
            correctMathAnswer = Math.floor(Math.random() * 10) + 1;
            a = b * correctMathAnswer;
        } else {
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * 20) + 1;
        }
    }

    if (operator === "-" && b > a) {
        [a, b] = [b, a];
    }

    if (operator === "+") correctMathAnswer = a + b;
    if (operator === "-") correctMathAnswer = a - b;
    if (operator === "×") correctMathAnswer = a * b;
    if (operator === "÷") correctMathAnswer = a / b;

    document.getElementById("mathQuestion").innerText =
        a + " " + operator + " " + b + " = ?";

    let answers = new Set([correctMathAnswer]);

    while (answers.size < 4) {
        let wrong = correctMathAnswer +
            Math.floor(Math.random() * 11) - 5;

        if (wrong >= 0 && wrong !== correctMathAnswer) {
            answers.add(wrong);
        }
    }

    let options = [...answers].sort(() => Math.random() - 0.5);

    document.getElementById("mathOptions").innerHTML =
        options.map(answer =>
            `<button onclick="checkMathAnswer(${answer}, '${level}')">
                ${answer}
            </button>`
        ).join("");
}

function checkMathAnswer(answer, level) {
    if (mathTime <= 0) return;

    if (answer === correctMathAnswer) {
        mathScore += 10;
        mathCoins += 5;

        document.getElementById("mathFeedback").innerText =
            "🎉 Correct Answer! +10 Score, +5 Coins";
    } else {
        document.getElementById("mathFeedback").innerText =
            "❌ Wrong Answer! Correct Answer: " + correctMathAnswer;
    }

    document.getElementById("mathScore").innerText = mathScore;
    document.getElementById("mathCoins").innerText = mathCoins;

    generateMathQuestion(level);
}

