console.log("Player linked");

const player = {
    positionX: 0,
    positionY: 0,
    velocity: 3,
    directions: [],
    element: document.querySelector("#player"),

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
    }
}