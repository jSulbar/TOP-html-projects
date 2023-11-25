let rpsButtons = Array.from(document.querySelector('.options').children);
let scoreCounters = {
    'cpu': document.querySelector('.counter-cpu'),
    'player': document.querySelector('.counter-player')
};
let roundCounter = document.querySelector('.round-number');
let resultDisplay = document.querySelector('.match-result');

let rpsOptions = ['Rock', 'Paper', 'Scissors'];
let scoreCount = { 'player': 0, 'cpu': 0 };
let roundCount = 0;

rpsButtons.forEach(btn =>
    btn.addEventListener('click', (event) => {
        let userChoice = getUserRpsOption(event);
        let roundResult = playRpsRound(userChoice);
        game(roundResult);
    })
);

// Taken from MDN's example on Math.random
function getRandomRpsOption() {
    return Math.floor(Math.random() * (3 - 0) + 0);
}

function getGameResult(userChoice, cpuChoice) {
    // Draw
    if (userChoice === cpuChoice) return 2;

    // User winning situations
    if (userChoice == 0 && cpuChoice == 2) return 0;
    else if (userChoice == 1 && cpuChoice == 0) return 0;
    else if (userChoice == 2 && cpuChoice == 1) return 0;

    // Everything else loses
    else return 1;
}

// Call this method from an event as a signarl receiver
// And feed it to getGameResult?
function getUserRpsOption(event) {
    let userChoice = event.target.classList[0];

    for (option in rpsOptions) {
        if (userChoice.toLowerCase() === rpsOptions[option].toLowerCase()) {
            userChoice = Number(option);
            break;
        }
    }

    return userChoice;
}

function playRpsRound(userChoice) {
    let cpuChoice = getRandomRpsOption();
    let result = getGameResult(userChoice, cpuChoice);
    updateRoundCount(++roundCount);
    return result;
}

function isMatch() {
    return roundCount >= 5;
}

function resetScore() {
    scoreCount.cpu = 0;
    scoreCount.player = 0;
}

function resetRoundCount() {
    roundCount = 0;
}

function updateRoundCount(count) {
    roundCounter.textContent = count;
}

function updateScoreCount() {
    scoreCounters.cpu.textContent = scoreCount.cpu;
    scoreCounters.player.textContent = scoreCount.player;
}

function getWinner() {
    if (!isMatch()) return 'fuck';
    else {
        return scoreCount.player > scoreCount.cpu ?
        'player' : 'cpu';
    }
}

function resetMatch() {
    resetRoundCount();
    resetScore();
    updateScoreCount();
}

function game(roundResult) {
    if (roundResult == 2) {
        resultDisplay.textContent = 'Draw!' // Match tie
    }
    else if (roundResult == 0) {
        resultDisplay.textContent = 'You win!'
        scoreCount.player++; // Match win
    }
    else {
        resultDisplay.textContent = 'You lose! Yippee!'
        scoreCount.cpu++; // Match loss
    }
    updateScoreCount();

    if (isMatch()) {
        resultDisplay.textContent = `The ${getWinner()} wins!`;
        resetMatch();
    }
}
