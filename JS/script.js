console.log("Main linked");
const startGameButton = document.querySelector("#start-btn");
const startingScreen = document.querySelector("#starting-screen");

startGameButton.addEventListener("click", () => {
    game.hasStarted = true;
    startingScreen.style.display = "none";
});

const game = {
    playerLife: 10,
    bossLife: 25,
    rainAttacks: [],
    counterTokens: [],
    hasStarted: false,
};

const playerLifeElement = document.querySelector("#player-life");
playerLifeElement.innerHTML = `<div id="life-segment"></div>`.repeat(game.playerLife);

const bossLifeElement = document.querySelector("#boss-life");
bossLifeElement.innerHTML = `<div id="boss-life-segment"></div>`.repeat(game.bossLife);


const gameArea = document.querySelector("#game-area");

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
    
    if (game.hasStarted) {
        player.checkCollisions(game.rainAttacks, "attacks");
        player.checkCollisions(game.counterTokens, "tokens");
        player.move();

        if(frames % 50 === 0) {
            const newAttack = new RainAttacks(3)
            game.rainAttacks.push(newAttack);
        };

        if(frames % 200 === 0) {
            const newToken = new CounterTokens(2);
            game.counterTokens.push(newToken);
        };

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