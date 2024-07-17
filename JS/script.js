console.log("Main linked");
const startGameButton = document.querySelector("#start-btn");
const startingScreen = document.querySelector("#starting-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const winScreen = document.querySelector("#win-screen");
const bossElement = document.querySelector("#boss");
const playerElement = document.querySelector("#player");

startGameButton.addEventListener("click", () => {
    game.hasStarted = true;
    startingScreen.style.display = "none";
});

const game = {
    playerLife: 10,
    bossLife: 25,
    rainAttacks: [],
    counterTokens: [],
    isOver: false,
    hasStarted: false,
    win: false,
    checkGameOver() {
        if (this.playerLife <= 0) {
            gameOverScreen.style.display = "flex";
            this.isOver = true;
            const exitButton = document.querySelector("#lose-reset-page-btn")
            exitButton.addEventListener("click", () => {
                location.reload();
            })
        }
    },

    checkGameWin(){
        if(this.bossLife <= 0) {
            winScreen.style.display = "flex";
            this.win = true;
            const exitButton = document.querySelector("#win-reset-page-btn")
            exitButton.addEventListener("click", () => {
                location.reload();
            })
        }
    }

};

const playerLifeElement = document.querySelector("#player-life");
playerLifeElement.innerHTML = `<div id="life-segment"></div>`.repeat(game.playerLife);

const bossLifeElement = document.querySelector("#boss-life");
bossLifeElement.innerHTML = `<div id="boss-life-segment"></div>`.repeat(game.bossLife);


const gameArea = document.querySelector("#game-area");

function bossShake() {
    bossElement.style.animation = "shake 150ms";
    setTimeout(() => {
        bossElement.style.animation = "";
    }, 150);
}

function playerFlash() {
    playerElement.style.animation = "flash 100ms";
    setTimeout(() => {
        playerElement.style.animation = "";
    }, 200);
}

document.addEventListener("keydown", (event) => {
    //move upon pressing key in the corresponding direction
    player.setDirection(event.key);
});

document.addEventListener("keyup", (event) => {
    //stop moving
    player.unsetDirection(event.key);
});

let frames = 0;
let animationID;

function gameLoop() { //smooth movement based on framerate
    frames++;
    
    if (!game.isOver && game.hasStarted && !game.win) {
        player.checkCollisions(game.rainAttacks, "attacks");
        player.checkCollisions(game.counterTokens, "tokens");
        player.move();
        game.checkGameOver();
        game.checkGameWin();

        if(game.bossLife > 10) {
            if(frames % 50 === 0) {
                const newAttack = new RainAttacks(3)
                game.rainAttacks.push(newAttack);
            };
    
            if(frames % 200 === 0) {
                const newToken = new CounterTokens(2);
                game.counterTokens.push(newToken);
            };
        }

        if(game.bossLife <= 10) {
            if(frames % 30 === 0) {
                const newAttack = new RainAttacks(3)
                game.rainAttacks.push(newAttack);
            };
    
            if(frames % 200 === 0) {
                const newToken = new CounterTokens(2);
                game.counterTokens.push(newToken);
            };


        }

        if(game.bossLife <= 5) {
            if(frames % 15 === 0) {
                const newAttack = new RainAttacks(3)
                game.rainAttacks.push(newAttack);
            };

        }
    }

    game.rainAttacks.forEach((rainAttack) => {
        rainAttack.move();
        rainAttack.exit();
    });  

    game.counterTokens.forEach((counterToken) => {
        counterToken.move();
        counterToken.exit();
    });

    animationID = window.requestAnimationFrame(gameLoop)
}

animationID = window.requestAnimationFrame(gameLoop)