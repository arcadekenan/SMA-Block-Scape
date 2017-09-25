const Player = require('./Classes/player.js');
const Computador = require('./Classes/computador.js');
const Tiro = require('./Classes/tiro.js');

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

var keysDown = {};

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});
