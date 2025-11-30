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

    document.addEventListener("keydown", (e) => {
        if ((e.key === "a" || e.key === "A") && !this.gameStarted) {
            this.startGame();
        }
    });

    // Touch start untuk memulai game (hanya sekali)
    document.addEventListener("touchstart", (e) => {
        if (!this.gameStarted && e.target.tagName !== 'BUTTON') {
            this.startGame();
            e.preventDefault();
        }
    }, { passive: false });


    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", (e) => {
            if (this.gameover) return;
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
        document.getElementsByTagName("h1")[0].textContent = "Game Over, Press Any Key to Restart";

        this.restartHandler = this.resetGameOnce.bind(this);
        document.addEventListener("keydown", this.restartHandler);
        document.addEventListener("touchstart", this.restartHandler, { passive: false });
    }

    resetGameOnce() {
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.gameover = false;
        this.gameStarted = false;

        document.getElementsByTagName("h1")[0].textContent = "Touch Screen or Press A to Start";

        document.removeEventListener("keydown", this.restartHandler);
        document.removeEventListener("touchstart", this.restartHandler);
    }
}


const simonGame = new Game();
