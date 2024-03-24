class Mastermind {
    constructor() {
        this.secretCode = this.generateSecretCode();
        this.maxAttempts = 10;
        this.currentAttempt = 0;
    }

    generateSecretCode() {
        const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
        let code = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            code += colors[randomIndex].charAt(0).toUpperCase();
        }
        return code;
    }

    checkGuess(guess) {
        let exactMatches = 0;
        let partialMatches = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === this.secretCode[i]) {
                exactMatches++;
            } else if (this.secretCode.includes(guess[i])) {
                partialMatches++;
            }
        }
        return { exactMatches, partialMatches };
    }

    isGameOver() {
        return this.currentAttempt >= this.maxAttempts || this.checkGuess(this.secretCode).exactMatches === 4;
    }
}

class UI {
    constructor() {
        this.gameContainer = document.getElementById('game');
    }

    displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('alert', 'alert-info', 'mt-3');
        messageElement.textContent = message;
        this.gameContainer.appendChild(messageElement);
    }

    displayGameBoard() {
        const gameBoard = document.createElement('div');
        gameBoard.classList.add('mt-5');

        const form = document.createElement('form');
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group', 'mb-3');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '4');
        input.classList.add('form-control');
        input.placeholder = 'Enter your guess (e.g., RYGB)';

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Submit';

        form.appendChild(inputGroup);
        inputGroup.appendChild(input);
        inputGroup.appendChild(button);
        gameBoard.appendChild(form);
        this.gameContainer.appendChild(gameBoard);

        button.addEventListener('click', (event) => {
            event.preventDefault();
            const guess = input.value.toUpperCase();
            if (/^[RGBYOP]{4}$/.test(guess)) {
                game.makeGuess(guess);
                input.value = '';
            } else {
                this.displayMessage('Please enter a valid guess using letters R, G, B, Y, O, or P.');
            }
        });
    }
}

class Game {
    constructor() {
        this.mastermind = new Mastermind();
        this.ui = new UI();
        this.ui.displayGameBoard();
        this.ui.displayMessage('Guess the 4-letter secret code using the colors (R, G, B, Y, O, P). You have 10 attempts.');
    }

    start() {
        // Game initialization logic
    }

    makeGuess(guess) {
        const result = this.mastermind.checkGuess(guess);
        this.ui.displayMessage(`Guess: ${guess} | Exact Matches: ${result.exactMatches} | Partial Matches: ${result.partialMatches}`);
        this.mastermind.currentAttempt++;

        if (result.exactMatches === 4) {
            this.ui.displayMessage('Congratulations! You have guessed the correct code.');
            this.endGame();
        } else if (this.mastermind.isGameOver()) {
            this.ui.displayMessage(`Game over! The correct code was ${this.mastermind.secretCode}.`);
            this.endGame();
        } else {
            this.ui.displayMessage(`Attempts remaining: ${this.mastermind.maxAttempts - this.mastermind.currentAttempt}`);
        }
    }

    endGame() {
        const form = document.querySelector('form');
        form.parentNode.removeChild(form);
    }
}

// Bootstrap the game
const game = new Game();
game.start();

// Bootstrap the game
const game = new Game();
game.start();
