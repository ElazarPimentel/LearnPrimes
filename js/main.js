// Constants for default range
let NUMBER_START = 1;
let NUMBER_END = 200;

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to get explanation why a number is prime or not
function getPrimeExplanation(num) {
    if (num <= 1) {
        return `${num} is not prime because prime numbers must be greater than 1.`;
    }
    
    if (isPrime(num)) {
        return `${num} is prime because it's only divisible by 1 and itself.`;
    } else {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return `${num} is not prime because it's divisible by ${i} (${num} ÷ ${i} = ${num/i}).`;
            }
        }
    }
}

let currentNumber;
let lastNumber;
let hasAnswered = false;

// Add these variables at the top with other variables
let correctCount = 0;
let currentStreak = 0;
let totalCount = 0;

// Generate random number between start and end (inclusive)
function getRandomNumber(start, end) {
    let newNumber;
    do {
        newNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    } while (newNumber === lastNumber);
    
    lastNumber = newNumber;
    return newNumber;
}

// Initialize game
function newNumber() {
    currentNumber = getRandomNumber(NUMBER_START, NUMBER_END);
    document.getElementById('number').textContent = currentNumber;
    document.getElementById('result').textContent = '';
    document.getElementById('explanation').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
    hasAnswered = false;
    document.getElementById('encouragement').textContent = '';
}

// Check user's answer
function checkAnswer(userAnswer) {
    const correctAnswer = isPrime(currentNumber);
    const isCorrect = userAnswer === correctAnswer;
    const feedbackElement = document.getElementById('feedback');
    
    totalCount++;
    if (isCorrect) {
        correctCount++;
        currentStreak++;
        showEncouragement();
    } else {
        currentStreak = 0;
    }
    
    updateStats();
    
    feedbackElement.innerHTML = `
        ${isCorrect ? '✅ Correct!' : '❌ Wrong!'}<br>
        ${getPrimeExplanation(currentNumber)}<br>
        Press any key for next number
    `;
    hasAnswered = true;
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (hasAnswered) {
        document.getElementById('feedback').innerHTML = '';
        newNumber();
        hasAnswered = false;
        return;
    }
    
    const key = event.key.toLowerCase();
    if (key === 'y') {
        checkAnswer(true);
    } else if (key === 'n') {
        checkAnswer(false);
    }
});

// Function to update number range
function updateRange() {
    const minInput = document.getElementById('min-number');
    const maxInput = document.getElementById('max-number');
    
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    if (min >= max) {
        alert('Minimum number must be less than maximum number');
        return;
    }
    
    NUMBER_START = min;
    NUMBER_END = max;
    newNumber();
}

// Add these new functions
function updateStats() {
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('streak-count').textContent = currentStreak;
    document.getElementById('total-count').textContent = totalCount;
}

function showEncouragement() {
    const encouragements = [
        "🌟 Fantastic job!",
        "🎯 You're on fire!",
        "💫 Keep it up!",
        "🏆 You're crushing it!",
        "⭐ Amazing work!",
        "🌈 Brilliant!",
        "💪 You're getting stronger!",
        "🎨 Beautiful thinking!"
    ];
    
    const streakMessages = {
        5: "🏆 5 in a row! Incredible!",
        10: "🌟 Perfect 10! You're unstoppable!",
        15: "💫 15 streak! Mathematical genius!",
        20: "👑 20 streak! You're legendary!"
    };
    
    const encouragementElement = document.getElementById('encouragement');
    
    if (streakMessages[currentStreak]) {
        encouragementElement.textContent = streakMessages[currentStreak];
    } else {
        const randomIndex = Math.floor(Math.random() * encouragements.length);
        encouragementElement.textContent = encouragements[randomIndex];
    }
}

// Initialize when page loads
window.onload = function() {
    newNumber();
};

// Function to check a specific 3-digit number
function checkSpecificNumber() {
    const input = document.getElementById('specific-number');
    const resultDiv = document.getElementById('specific-result');
    const number = parseInt(input.value);

    // Validate input
    if (isNaN(number) || number < 1 || number > 999) {
        resultDiv.innerHTML = '❌ Please enter a valid number between 1 and 999';
        resultDiv.style.color = '#ff4444';
        return;
    }

    // Check if prime and show result with explanation
    const isPrimeResult = isPrime(number);
    const explanation = getPrimeExplanation(number);
    
    resultDiv.innerHTML = `${isPrimeResult ? '✅' : '❌'} ${explanation}`;
    resultDiv.style.color = isPrimeResult ? '#00ff00' : '#ff4444';
}
