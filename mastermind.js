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
        const colors = ['red', 'blue', 'green', 'yellow', 'brown', 'purple']
        for (let i = 0; i < 4; i++) {
            code[i] = colors[Math.floor(Math.random() * 6) + 1]; // Random color from index 1 to 6
        }
        return code;
    }

    getGuess() {
        // Gets guess from user
        place1 = document.getElementById('place1');
        place2 = document.getElementById('place2');
        place3 = document.getElementById('place3');
        place4 = document.getElementById('place4');
        const guess = [place1, place2, place3, place4];
        return guess;
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
        document.getElementById('correctnessMessage') = ('*' * correctColors) + ('^' * correctPositions)
        return { correctColors, correctPositions };
    }

    isGameOver(correctColors) {
        // Check if the game is over
        if (correctColors == 4) {
            return ('You win! Great job guessing ' + this.secretcode);
        } else if (this.currentAttempt >= this.maxAttempts) {
            return ('Game Over! No more attempts left... the correct answer is ' + this.secretcode);
        } 

}

class UI {
    constructor() {
        this.gameContainer = document.getElementById('game');
        this.messageContainer = document.getElementById('gameMessage');
    }

    displayMessage(message) {
        // Display message on the UI
        messageContainer.innerHTML = message
    }

    displayGameBoard(guessList) {
        // Display game board on the UI
        gameContainer.innerHTML = guessList
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
    }
    
}

function play() {
    const game = new Game();
    game.start();
    done = false;
    while not done {
        
    }
}

play(); // Call the play function to start the game

