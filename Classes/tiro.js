class Tiro {

    constructor (x, y, on) {
        if(on){
          this.x = x;
          this.y = y;
          this.x_speed = 0;
          this.y_speed = 3;
          this.radius = 5;
          this.on = on;
        }else{
          this.x = -1;
          this.y = -1;
          this.x_speed = 0;
          this.y_speed = 0;
          this.radius = 0;
          this.on = on;
        }
    }

    render () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
    }

    update (atirador, inimigo) {
        this.x += 0;
        this.y += this.y_speed;
        var top_x = this.x - 5;
        var top_y = this.y - 5;
        var bottom_x = this.x + 5;
        var bottom_y = this.y + 5;

        if (top_y > 300) {
            if (top_y < (atirador.y + atirador.height) && bottom_y > atirador.y && top_x < (atirador.x + atirador.width) && bottom_x > atirador.x) {
                this.y_speed = -4;
                this.x_speed += (atirador.x_speed / 2);
                this.y += this.y_speed;
            }
        } else {
            if (top_y < (inimigo.y + inimigo.height) && bottom_y > inimigo.y && top_x < (inimigo.x + inimigo.width) && bottom_x > inimigo.x) {
                this.y_speed = 0;
                this.y += this.y_speed;
            }
        }
    }

    getON () {
      return this.on;
    }
}

module.exports = Tiro;
