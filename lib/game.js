var Frog = require('./Frog.js');
var Cars = require('./Cars.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var frogger = new Frog(350, 700);
var cars = new Cars(650, 650, 50, 50, -2)

document.addEventListener('keyup', function(event) {
  // console.log('Yo');
  frogger.move(event);
})

requestAnimationFrame(function gameLoop () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frogger.draw(ctx);
  cars.draw(ctx);
  cars.resetPostition()
  // console.log('Fuck');

  requestAnimationFrame(gameLoop)
})
