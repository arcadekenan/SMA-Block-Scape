const Atirador = require('./atirador.js');

class Player {

    constructor () {
        this.atirador = new Atirador(275, 580, 50, 15);
    }

    render() {
        this.atirador.render();
    }

    update() {
        for (var key in keysDown) {
            var value = Number(key);
            if (value == 37) {
                this.atirador.move(-4, 0);
            } else if (value == 39) {
                this.atirador.move(4, 0);
            } else if (value == 32){
                if (count < tiro.length) {
                  this.atirador.atirar(count);
                  count++;
                }else{
                  count = 0;
                  this.atirador.atirar(count);
                }
            } else {
                this.atirador.move(0, 0);
            }
        }
    }
}

var count = 0;
module.exports = Player;
