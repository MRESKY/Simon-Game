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
        // Universal start/restart handler
        this.handleStart = (e) => {
            // Jangan handle jika click pada button game
            if (e.target.closest('button[data-color]')) {
                return;
            }
            
            if (!this.gameStarted && !this.gameover) {
                this.startGame();
            } else if (this.gameover) {
                this.resetGameOnce();
            }
            
            e.preventDefault();
        };

        // Add event listeners untuk semua jenis input
        document.addEventListener("click", this.handleStart);
        document.addEventListener("touchstart", this.handleStart);
        
        // Keyboard support
        document.addEventListener("keydown", (e) => {
            if (e.key === "a" || e.key === "A" || e.key === " ") {
                this.handleStart(e);
            }
        });

        // Button game handlers
        document.querySelectorAll("button").forEach(button => {
            // Touch events untuk button
            button.addEventListener("touchstart", (e) => {
                e.stopPropagation();
                if (this.gameover || !this.gameStarted) return;
                
                const userChosenColor = e.target.getAttribute("data-color");
                this.userClickedPattern.push(userChosenColor);
                this.animatedPress(userChosenColor);
                this.soundbutton(userChosenColor);
                this.checkAnswer(this.userClickedPattern.length - 1);
            });
            
            // Click events untuk button
            button.addEventListener("click", (e) => {
                e.stopPropagation();
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
        document.querySelector("h1").textContent = "Game Started!";
        document.querySelector(".instructions").style.display = "none";
        this.nextSequence();
    }
    
    nextSequence() {
        this.userClickedPattern = [];
        
        const randomColor = this.buttonColors[Math.floor(Math.random() * this.buttonColors.length)];
        this.gamePattern.push(randomColor);
        this.animatedPress(randomColor);
        this.soundbutton(randomColor);
        document.querySelector("h1").textContent = `Level ${this.gamePattern.length}`;
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
        document.querySelector("h1").textContent = "Game Over!";
        document.querySelector(".instructions").textContent = "Tap anywhere to restart";
        document.querySelector(".instructions").style.display = "block";
    }

    resetGameOnce() {
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.gameover = false;
        this.gameStarted = false;

        document.querySelector("h1").textContent = "Touch Anywhere to Start";
        document.querySelector(".instructions").textContent = "Tap screen to start • Press A key on desktop";
        document.querySelector(".instructions").style.display = "block";
    }
}


const simonGame = new Game();
