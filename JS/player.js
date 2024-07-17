console.log("Player linked");

const player = {
    positionX: 0,
    positionY: 0,
    velocity: 3,
    directions: [],
    element: document.querySelector("#player"),

    initializePosition() {
        console.log("GAME AREA OFFSETWIDTH: ",gameArea.offsetWidth / 2);
        console.log("ELEMENT OFFSETWIDTH" ,this.element.offsetWidth);
        this.positionX = (gameArea.offsetWidth / 2 - this.element.offsetWidth/2);
        console.log(this.positionX);
        this.positionY = (gameArea.offsetHeight / 2) - (this.element.offsetHeight / 2);
    },

    move() { //player movement
        const direction = this.directions.join("");
        console.log(this.directions);
        switch (direction) {
            //move up
            case "w":
            case "ArrowUp":
                this.positionY -= this.velocity;
                break;
            //move up and right
            case "wd":
            case "ArrowUpArrowRight":
            case "dw":
            case "ArrowRightArrowUp":
                this.positionX += this.velocity;
                this.positionY -= this.velocity;
                break;
            //move up and left
            case "wa":
            case "ArrowUpArrowLeft":
            case "aw":
            case "ArrowLeftArrowUp":
                this.positionY -= this.velocity;
                this.positionX -= this.velocity;
                break;
            //move down
            case "s":
            case "ArrowDown":
                this.positionY += this.velocity;
                break;
            //move down and right
            case "sd":
            case "ArrowDownArrowRight":
            case "ds":
            case "ArrowRightArrowDown":
                this.positionY += this.velocity;
                this.positionX += this.velocity;
                break;
            //move down and left
            case "sa":
            case "ArrowDownArrowLeft":
            case "as":
            case "ArrowLeftArrowDown":
                this.positionY += this.velocity;
                this.positionX -= this.velocity;
                break;
            //move left
            case "a":
            case "ArrowLeft":
                this.positionX -= this.velocity;
                break;
            //move right
            case "d":
            case "ArrowRight":
                this.positionX += this.velocity;
                break;
        }
        this.setBoundaries();
        //update position of player
        this.element.style.top = `${this.positionY}px`;
        this.element.style.left = `${this.positionX}px`;
    },

    setDirection(direction) { //push movement input into directions array
        if (!this.directions.includes(direction)) {
            this.directions.push(direction);
        }
    },

    unsetDirection(direction) { //remove input from array
        const index = this.directions.indexOf(direction);
        this.directions.splice(index, 1);
    },

    setBoundaries() { //bind player within the game area
        if (this.positionX <= 0) {
            this.positionX = 0;
        }

        if (this.positionY <= 0) {
            this.positionY = 0;
        }

        if (this.positionX >= gameArea.offsetWidth - this.element.offsetWidth) {
            this.positionX = gameArea.offsetWidth - this.element.offsetWidth;
        }

        if (this.positionY >= gameArea.offsetHeight - this.element.offsetHeight) {
            this.positionY = gameArea.offsetHeight - this.element.offsetHeight;
        }
    },

    checkCollisions(array, string) {
        array.forEach((entity) => {
            const playerLeftEdge = this.positionX;
            const playerRightEdge = this.positionX + this.element.offsetWidth;
            const playerTopEdge = this.positionY;
            const playerBottomEdge = this.positionY + this.element.offsetHeight;
            
            const fallingEntityLeftEdge = entity.positionX;
            const fallingEntityRightEdge = entity.positionX + entity.element.offsetWidth;
            const fallingEntityTopEdge = entity.positionY;
            const fallingEntityBottomEdge = entity.positionY + entity.element.offsetHeight;

            if(
                playerLeftEdge < fallingEntityRightEdge &&
                playerRightEdge > fallingEntityLeftEdge &&
                playerTopEdge < fallingEntityBottomEdge &&
                playerBottomEdge > fallingEntityTopEdge
            ) {
                console.log("ouch");
                entity.disappear();
                if(string === "attacks") {
                    game.playerLife--;
                    playerLifeElement.innerHTML = `<div id="life-segment"></div>`.repeat(game.playerLife);
                    playerFlash();
                } else if (string === "tokens") {
                    game.bossLife--;
                    bossLifeElement.innerHTML = `<div id="boss-life-segment"></div>`.repeat(game.bossLife);
                    bossShake();
                }
            }
        });
        
    }
}