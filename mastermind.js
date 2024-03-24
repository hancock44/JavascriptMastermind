class Mastermind {
    constructor() {
        this.secretCode = this.generateSecretCode();
        this.maxAttempts = 10;
        this.currentAttempt = 0;
        this.guessList = [];
    }

    generateSecretCode() {
        // Generate a random secret code
        const code = [];
        const colors = ['red', 'blue', 'green', 'yellow', 'brown', 'purple'];
        for (let i = 0; i < 4; i++) {
            code[i] = colors[Math.floor(Math.random() * colors.length)]; // Fixed the random color selection
        }
        return code;
    }

    checkGuess(guess) {
        // Check the guess against the secret code
        let correctColors = 0;
        let correctPositions = 0;

        for (let i = 0; i < this.secretCode.length; i++) {
            if (guess[i] === this.secretCode[i]) {
                correctPositions++;
            } else if (this.secretCode.includes(guess[i])) {
                correctColors++;
            }
        }
        document.getElementById('correctness').textContent = '*'.repeat(correctColors) + '^'.repeat(correctPositions);
        this.currentAttempt++;
        if (correctPositions === 4) {
            return 'win';
        } else if (this.currentAttempt >= this.maxAttempts) {
            return 'lose';
        } else {
            return 'continue';
        }
    }
}

class UI {
    constructor() {
        this.uiElements = {
            guessInputs: document.querySelectorAll('.guess-input'),
            checkButton: document.getElementById('checkGuess'),
            messageContainer: document.getElementById('gameMessage'),
            feedbackContainer: document.getElementById('correctness')
        };
    }

    displayMessage(message) {
        // Display message on the UI
        this.uiElements.messageContainer.textContent = message;
    }

    clearInputs() {
        // Clear input fields after checking guess
        this.uiElements.guessInputs.forEach(input => input.value = '');
    }

    getGuess() {
        // Get the guess from the input fields
        const guess = [];
        this.uiElements.guessInputs.forEach(input => guess.push(input.value.toLowerCase())); // Convert to lowercase for consistency
        return guess;
    }

    displayFeedback(feedback) {
        // Display feedback on the UI
        this.uiElements.feedbackContainer.textContent = feedback;
    }
}

class Game {
    constructor() {
        this.mastermind = new Mastermind();
        this.ui = new UI();
    }

    start() {
        // Game initialization
        this.ui.displayMessage('Welcome to the game Mastermind! Input a guess with a color in each box in order to try and get the correct code! The colors included are blue, red, green, yellow, purple, and brown. * - a correct color only, ^ - correct location for a color. You have 10 guesses total!');
        this.ui.uiElements.checkButton.addEventListener('click', () => this.checkGuess());
    }

    checkGuess() {
        // Check the guess and update UI accordingly
        const guess = this.ui.getGuess();
        const result = this.mastermind.checkGuess(guess);
        if (result === 'win') {
            this.ui.displayMessage('You win! Great job guessing the correct code: ' + this.mastermind.secretCode.join(', '));
        } else if (result === 'lose') {
            this.ui.displayMessage('Game Over! No more attempts left... the correct answer was: ' + this.mastermind.secretCode.join(', '));
        } else {
            this.ui.displayFeedback('Guesses left: ' + (this.mastermind.maxAttempts - this.mastermind.currentAttempt));
            this.ui.clearInputs();
        }
    }
}

function play() {
    const game = new Game();
    game.start();
}

// Start the game when the document is loaded
document.addEventListener('DOMContentLoaded', play);



