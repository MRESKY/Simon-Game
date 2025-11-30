class Game {
    constructor() {
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.gameover = false;
        this.gameStarted = false;
        this.buttonColors = ["red", "blue", "green", "yellow"];
        this.init();
    }
    init() {
        // Event listener untuk keyboard
        this.keydownHandler = (e) => {
            if (!this.gameStarted && (e.key === "a" || e.key === "A")) {
                this.startGame();
            } else if (this.gameover) {
                this.resetGameOnce();
            }
        };
        document.addEventListener("keydown", this.keydownHandler);

        // Event listener untuk touch (mobile)
        this.touchHandler = (e) => {
            // Cek jika touch bukan pada button game
            if (e.target.tagName !== 'BUTTON' || !e.target.hasAttribute('data-color')) {
                if (!this.gameStarted && !this.gameover) {
                    this.startGame();
                    e.preventDefault();
                } else if (this.gameover) {
                    this.resetGameOnce();
                    e.preventDefault();
                }
            }
        };
        document.addEventListener("touchstart", this.touchHandler, { passive: false });

        // Event listener untuk button clicks
        document.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (e) => {
                if (this.gameover || !this.gameStarted) return;
                const userChosenColor = e.target.getAttribute("data-color");
                this.userClickedPattern.push(userChosenColor);
                this.animatedPress(userChosenColor);
                this.soundbutton(userChosenColor);
                this.checkAnswer(this.userClickedPattern.length - 1);
            });
        });
    }

    startGame() {
        if (this.gameStarted) return;
        this.gameStarted = true;
        document.getElementsByTagName("h1")[0].textContent = "Game Started!";
        this.nextSequence();
    }
    
    nextSequence() {
        this.userClickedPattern = [];
        
        const randomColor = this.buttonColors[Math.floor(Math.random() * this.buttonColors.length)];
        this.gamePattern.push(randomColor);
        this.animatedPress(randomColor);
        this.soundbutton(randomColor);
        document.getElementsByTagName("h1")[0].textContent = `Level ${this.gamePattern.length}`;
        console.log("Game pattern:", this.gamePattern);
    }
    animatedPress(color) {
        const button = document.querySelector(`button[data-color="${color}"]`);
        if (button) {
            button.classList.add("pressed");
            setTimeout(() => {
                button.classList.remove("pressed");
            }, 500);
        }
    }

    soundbutton(color) {
        const audio = new Audio(`sounds/${color}.mp3`);
        audio.play();
    }

    checkAnswer(currentIndex) {
         if (this.userClickedPattern[currentIndex] !== this.gamePattern[currentIndex]) {
            this.gameOver();
            return;
        }

        if (this.userClickedPattern.length === this.gamePattern.length) {
            setTimeout(() => this.nextSequence(), 1000);
        }
    }

    gameOver() {
        this.gameover = true;
        const audio = new Audio("sounds/wrong.mp3");
        audio.play();
        document.getElementsByTagName("h1")[0].textContent = "Game Over, Touch Screen to Restart";
    }

    resetGameOnce() {
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.gameover = false;
        this.gameStarted = false;

        document.getElementsByTagName("h1")[0].textContent = "Touch Screen or Press A to Start";
    }
}


const simonGame = new Game();
