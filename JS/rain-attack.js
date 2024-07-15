class RainAttacks {
    constructor(velocity) {
        this.createRainAttacksElement();
        this.positionY = 0;
        this.positionX = Math.floor(Math.random() * (gameArea.offsetWidth - this.element.offsetWidth));
        this.velocity = velocity;
        this.updateElementPosition();
    }

    createRainAttacksElement() { //create and spawn element inside the game area
        this.element = document.createElement("div");
        this.element.className = "rain-attack";
        gameArea.appendChild(this.element);
    }

    updateElementPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    move() {
        this.positionY += this.velocity;
        this.updateElementPosition();
    }

    exit() {
        if(this.positionY > gameArea.offsetHeight + this.element.offsetHeight) {
            this.disappear();
        }
    }
    
    disappear() {
        const index = game.rainAttacks.indexOf(this);
        game.rainAttacks.splice(index, 1);
        this.element.remove();
    }
}
