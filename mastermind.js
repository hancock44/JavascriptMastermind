class Mastermind {
    constructor() {
        this.secretCode = this.generateSecretCode();
        this.maxAttempts = 10;
        this.currentAttempt = 0;
    }

    generateSecretCode() {
        // Generate a random secret code
        let code = '';
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']; // Example colors
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            code += colors[randomIndex][0]; // Take the first letter of each color as code
        }
        return code;
    }

    checkGuess(guess) {
        // Check the guess against the secret code
        let correct = '';
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === this.secretCode[i]) {
                correct += 'R'; // Right color and right position
            } else if (this.secretCode.includes(guess[i])) {
                correct += 'W'; // Right color but wrong position
            } else {
                correct += 'X'; // Wrong color
            }
        }
        return feedback;
    }

    isGameOver() {
        // Check if the game is over
        return this.currentAttempt >= this.maxAttempts || this.checkGuess(guess) === 'RRRR';
    }
    
}

class UI {
    constructor() {
        this.gameContainer = document.getElementById('game');
    }

    displayMessage(message) {
        // Display message on the UI
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        this.gameContainer.appendChild(messageElement);
    }

    displayGameBoard() {
        // Display game board on the UI
        const boardElement = document.createElement('div');
        boardElement.innerHTML = `
            <input type="text" id="guessInput" placeholder="Enter your guess">
            <button id="guessButton">Guess</button>
        `;
        this.gameContainer.appendChild(boardElement);
        const guessInput = document.getElementById('guessInput');
        const guessButton = document.getElementById('guessButton');
        guessButton.addEventListener('click', () => {
            const guess = guessInput.value;
            // Validate and process the guess
        });
    }

}

class Game {
    constructor() {
        this.mastermind = new Mastermind();
        this.ui = new UI();
        this.ui.displayGameBoard();
    }

    start() {
        // Game initialization logic
        this.ui.displayMessage('Welcome to Mastermind! Try to guess the colors! There are four same/different colors in each code (red, blue, green, yellow, purple, orange). Guess it in under ten guesses and you win! * means correct color but wrong loaction. ^ means correct color and location. X means wrong color and wrong location. Have fun!';
    }

}

function play() {
    const game = new Game();
    game.start();
}

play()
