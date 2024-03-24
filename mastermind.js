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
            code[i] = colors[Math.floor(Math.random() * 6)]; // Random color from index 0 to 5
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
        return { correctColors, correctPositions };
    }

    isGameOver(correctColors) {
        // Check if the game is over
        if (correctColors === 4) {
            return 'win';
        } else if (this.currentAttempt >= this.maxAttempts) {
            return 'lose';
        }
        return 'continue';
    }
}

class UI {
    constructor() {
        this.gameMessage = document.getElementById('gameMessage');
        this.feedback = document.getElementById('feedback');
        this.checkGuessBtn = document.getElementById('checkGuess');
        this.checkGuessBtn.addEventListener('click', this.handleGuess.bind(this));
        this.mastermind = new Mastermind();
        this.attemptsLeft = this.mastermind.maxAttempts;
    }

    handleGuess() {
        const guess = this.getGuess();
        const result = this.mastermind.checkGuess(guess);
        this.displayFeedback(result);
        this.attemptsLeft--;
        if (result.correctPositions === 4) {
            this.displayMessage('Congratulations! You win!');
            this.checkGuessBtn.disabled = true;
        } else if (this.attemptsLeft === 0) {
            this.displayMessage(`Game over! The correct code was ${this.mastermind.secretCode.join(' ')}`);
            this.checkGuessBtn.disabled = true;
        } else {
            this.displayMessage(`You have ${this.attemptsLeft} attempts left.`);
        }
    }

    getGuess() {
        const guess = [];
        for (let i = 1; i <= 4; i++) {
            const color = document.getElementById(`place${i}`).value.trim().toLowerCase();
            guess.push(color);
        }
        return guess;
    }

    displayFeedback(result) {
        let feedbackText = '';
        for (let i = 0; i < result.correctPositions; i++) {
            feedbackText += '^';
        }
        for (let i = 0; i < result.correctColors; i++) {
            feedbackText += '*';
        }
        this.feedback.textContent = feedbackText;
    }

    displayMessage(message) {
        this.gameMessage.textContent = message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.displayMessage('Welcome to the Mastermind game!');
});


