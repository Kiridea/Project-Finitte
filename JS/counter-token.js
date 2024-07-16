class CounterTokens {
    constructor(velocity) {
        this.createCounterTokensElement();
        this.positionY = 0;
        this.positionX = Math.floor(Math.random() * (gameArea.offsetWidth - this.element.offsetWidth));
        this.velocity = velocity;
        this.updateElementPosition();
    }

    createCounterTokensElement() {
        this.element = document.createElement("div");
        this.element.className = "counter-token";
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
        const index = game.counterTokens.indexOf(this);
        game.counterTokens.splice(index, 1);
        this.element.remove();
    }
}