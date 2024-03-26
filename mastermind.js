class Mastermind {
    constructor() {
        this.secretCode = this.generateSecretCode();
        this.maxAttempts = 10;
        this.currentAttempt = 0;
        this.guessList = [];
        this.correctPositions = 0; // Track correct positions
        this.correctColors = 0; // Track correct colors in wrong positions
    }

    getNumGuesses() {
        selectElement = document.querySelector('#select1');
        value = selectElement.value;
    }
    
    generateSecretCode() {
        // Generate a random color code
        const code = [];
        const colors = ['red', 'blue', 'green', 'yellow', 'brown', 'purple'];
        for (let i = 0; i < 4; i++) {
            code[i] = colors[Math.floor(Math.random() * colors.length)];
        }
        return code;
    }

    checkGuess(guess) {
        // Reset correct positions and colors
        this.correctPositions = 0;
        this.correctColors = 0;

        // Arrays to keep track of correct colors in right position and correct colors in wrong position
        const checkedPositions = [];
        const checkedColors = [];

        // First pass to check for correct colors in right positions
        for (let i = 0; i < this.secretCode.length; i++) {
            if (guess[i] === this.secretCode[i]) {
                this.correctPositions++;
                checkedPositions.push(i);
            }
        }

        // Check for correct colors in wrong positions
        for (let i = 0; i < guess.length; i++) {
            if (!checkedPositions.includes(i)) {
                const codeIndex = this.secretCode.indexOf(guess[i]);
                if (codeIndex !== -1 && !checkedColors.includes(codeIndex)) {
                    this.correctColors++;
                    checkedColors.push(codeIndex);
                }
            }
        }

        // Reset and check game status after guess
        this.currentAttempt++;
        this.guessList.push({ guess: guess.join(', '), correctness: `*${this.correctColors} ^${this.correctPositions}` });

        if (this.correctPositions === 4) {
            return 'win';
        } else if (this.currentAttempt >= this.maxAttempts) {
            return 'lose';
        } else {
            return 'continue';
        }
    }
}

class UI {
    constructor(mastermind) {
        this.mastermind = mastermind;
        this.uiElements = {
            guessInputs: document.querySelectorAll('.guess-input'),
            checkButton: document.getElementById('checkGuess'),
            messageContainer: document.getElementById('gameMessage'),
            feedbackContainer: document.getElementById('correctness'),
            previousGuessesContainer: document.getElementById('previousGuesses')
        };
    }

    displayMessage(message) {
        // Display message on the UI
        this.uiElements.messageContainer.textContent = message;
    }

    clearInputs() {
        // Clear inputs after checking guess
        this.uiElements.guessInputs.forEach(input => input.value = '');
    }

    getGuess() {
        // Get the guess from inputs
        const guess = [];
        this.uiElements.guessInputs.forEach(input => guess.push(input.value.toLowerCase())); // Convert to lowercase for consistency
        return guess;
    }

    displayFeedback(feedback) {
        // Display feedback on the UI
        this.uiElements.feedbackContainer.textContent = feedback;
    }

    displayCorrectness() {
        // Display the correctness of a guess on the UI
        const feedback = '*'.repeat(this.mastermind.correctColors) + '^'.repeat(this.mastermind.correctPositions);
        this.displayFeedback(feedback);
    }

    displayPreviousGuesses() {
        // Display all previous guesses and their correctness
        this.uiElements.previousGuessesContainer.innerHTML = '';
        this.mastermind.guessList.forEach(item => {
            const guessElement = document.createElement('div');
            guessElement.textContent = `${item.guess} - ${item.correctness}`;
            this.uiElements.previousGuessesContainer.appendChild(guessElement);
        });
    }
}

class Game {
    constructor() {
        this.mastermind = new Mastermind();
        this.ui = new UI(this.mastermind);
    }

    start() {
        // Start up game
        this.ui.displayMessage('Welcome to the game Mastermind! Input a guess with a color in each box in order to try and get the correct code! The colors included are blue, red, green, yellow, purple, and brown. * - a correct color only, ^ - correct location for a color. Select from the drop down for the amount of guesses allowed.');
        this.ui.uiElements.checkButton.addEventListener('click', () => this.checkGuess()); // Add event listener to the Check button
    }

    checkGuess() {
        // Check the guess and update UI
        const guess = this.ui.getGuess();
        const result = this.mastermind.checkGuess(guess);
        if (result === 'win') {
            this.ui.displayMessage('You win! Great job guessing the correct code: ' + this.mastermind.secretCode.join(', ') + '. Reload to play again!');
        } else if (result === 'lose') {
            this.ui.displayMessage('Game Over! No more attempts left... the correct answer was: ' + this.mastermind.secretCode.join(', '));
        } else {
            this.ui.displayFeedback('Guesses left: ' + (this.mastermind.maxAttempts - this.mastermind.currentAttempt));
            this.ui.displayCorrectness(); // Update the correctness feedback
            this.ui.displayPreviousGuesses(); // Display previous guesses
            this.ui.clearInputs();
        }
        // Increment currentAttempt
        this.mastermind.currentAttempt++;
    }
}

function play() {
    const game = new Game();
    game.start();
}

// Start the game when website opened or reloaded
document.addEventListener('DOMContentLoaded', play);




