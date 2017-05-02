var Frog = require('./Frog.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var frogger = new Frog(350, 700);

document.addEventListener('keyup', function(event) {
  // console.log('Yo');
  frogger.move(event);
})

requestAnimationFrame(function gameLoop () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frogger.draw(ctx);
  // console.log('Fuck');

  requestAnimationFrame(gameLoop)
})
