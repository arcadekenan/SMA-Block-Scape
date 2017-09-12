var animacao = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.createElement('canvas');
var width = 600;
var height = 600;
var direita = true;
var esquerda = false;
canvas.width = width;
canvas.height = height;
canvas.id = "canvas";
canvas.style.padding = "15px";
canvas.style.margin = "auto";
canvas.style.position = "absolute";
canvas.style.width = "95%";
canvas.style.height = "95%";
var context = canvas.getContext('2d');

function iniciar(){
    var ModalJogo = document.getElementById('jogando');
    ModalJogo.appendChild(canvas);
    animacao(step);
}

var step = function () {
    update();
    render();
    animacao(step);
};

var update = function () {
    player.update();
    computador.update(tiro);
    tiro.update(player.atirador, computador.inimigo);
};

var player = new Player();
var computador = new Computador();
var tiro = new Tiro(300, 580);

var render = function () {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    computador.render();
    tiro.render();
};

function Player() {
    this.atirador = new Atirador(275, 580, 50, 15);
}

Player.prototype.render = function () {
    this.atirador.render();
};

Player.prototype.update = function () {
    for (var key in keysDown) {
        var value = Number(key);
        if (value == 37) {
            this.atirador.move(-4, 0);
        } else if (value == 39) {
            this.atirador.move(4, 0);
        } else if (value == 32){
            this.atirador.atirar();
        } else {
            this.atirador.move(0, 0);
        }
    }
};

function Computador() {
    this.inimigo = new Inimigo(275, 10, 20, 20);
}

Computador.prototype.render = function () {
    this.inimigo.render();
};

Computador.prototype.update = function (tiro) {

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

    if (tiro.y < (this.inimigo.y + this.inimigo.height + 2) && tiro.y > this.inimigo.y && tiro.x < (this.inimigo.x + this.inimigo.width + 2) && tiro.x > this.inimigo.x){
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
};

function Tiro(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

Tiro.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
};

Tiro.prototype.update = function (atirador, inimigo) {
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
};

function Atirador(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Atirador.prototype.render = function () {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillRect(this.x + (this.width/3), this.y - (this.height), 15, 15);
};

Atirador.prototype.move = function (x, y) {
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

Atirador.prototype.atirar = function (){
    tiro = new Tiro((player.atirador.x) + 25, 580);
    console.log("atirei");
}

function Inimigo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Inimigo.prototype.render = function () {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Inimigo.prototype.move = function (x, y) {
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

var keysDown = {};

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});
