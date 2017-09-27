const Tiro = require('./tiro.js');

class Atirador {

    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }

    render() {
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillRect(this.x + (this.width/3), this.y - (this.height), 15, 15);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        this.x_speed = x;
        this.y_speed = y;
        if (this.x < 0) {
            this.x = 0;
            this.x_speed = 0;
        } else if (this.x + this.width > 600) {
            this.x = 600 - this.width;
            this.x_speed = 0;
        }
    }

    atirar(count){
        console.log(count);
        tiro[count] = new Tiro((player.atirador.x) + 25, 580, true);
        console.log("atirei");
    }
}

module.exports = Atirador;
