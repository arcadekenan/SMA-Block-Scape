const Inimigo = require('./inimigo.js');

class Computador {

    constructor () {
        this.inimigo = new Inimigo(275, 10, 20, 20);
    }

    render () {
        this.inimigo.render();
    }

    update (tiro) {
        if (this.inimigo.x + this.inimigo.width == 600){
            this.inimigo.move(0, 20);
            direita = false;
            esquerda = true;
        } else if (this.inimigo.x + this.inimigo.width == 20){
            this.inimigo.move(0, 20);
            direita = true;
            esquerda = false;
        } else if (tiro.y == this.inimigo.y) {
            this.inimigo.move(0, 0);
        }

        if (tiro.y < (this.inimigo.y + this.inimigo.height + 2) &&
        tiro.y > this.inimigo.y &&
        tiro.x < (this.inimigo.x + this.inimigo.width + 2) &&
        tiro.x > this.inimigo.x){
            this.inimigo.move(0, 0);
            direita = false;
            esquerda = false;
        }

        if (direita){
            this.inimigo.move(2, 0);
        } else if (esquerda){
            this.inimigo.move(-2, 0);
        }else{
            this.inimigo.move(0, 0);
        }
    }
}

module.exports = Computador;
