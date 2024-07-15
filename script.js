console.log("Main linked");


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

    animationID = window.requestAnimationFrame(gameLoop)
}

animationID = window.requestAnimationFrame(gameLoop)
