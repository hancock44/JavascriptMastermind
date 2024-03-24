class Mastermind {
    constructor() {
        this.secretCode = this.generateSecretCode();
        this.maxAttempts = 10;
        this.currentAttempt = 0;
    }

    generateSecretCode() {
        // Generate a random secret code
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += Math.floor(Math.random() * 6) + 1; // Random number from 1 to 6
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
        if (correctColors == 4) {
            return ('You win! Great job guessing ' + this.secretcode)
        } else if (this.currentAttempt >= this.maxAttempts) {
            return ('Game Over! No more attempts left... the correct answer is ' + this.secretcode)
        } 

}

class UI {
    constructor() {
        this.gameContainer = document.getElementById('game');
    }

    displayMessage(message) {
        // Display message on the UI
        
    }

    displayGameBoard() {
        // Display game board on the UI
    }

    // Other UI related methods...
}

class Game {
    constructor() {
        this.mastermind = new Mastermind();
        this.ui = new UI();
        this.ui.displayGameBoard();
    }

    start() {
        // Game initialization logic
    }

    // Other game related methods...
}

// Bootstrap the game
function play() {
    const game = new Game();
    game.start();
}

play(); // Call the play function to start the game

