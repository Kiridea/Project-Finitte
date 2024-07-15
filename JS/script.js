console.log("Main linked");

const game = {
    rainAttacks: [],
}


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
    
    player.move();

    if(frames % 50 === 0) {
        game.rainAttacks.push(new RainAttacks(3));
    };

    game.rainAttacks.forEach((rainAttack) => {
        rainAttack.move();
        rainAttack.exit();
    });

    animationID = window.requestAnimationFrame(gameLoop)
}

animationID = window.requestAnimationFrame(gameLoop)
console.log(game.rainAttacks);