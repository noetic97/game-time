var Frog = require('./Frog.js');
var Cars = require('./Cars.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var frogger = new Frog(350, 700);
var cars0 = new Cars(650, 650, 50, 50, -2)
var cars1 = new Cars(800, 650, 50, 50, -2)
var cars2 = new Cars(950, 650, 50, 50, -2)

// function focusOnLoad() {
//   canvas.focus();
// }
//
// focusOnLoad();

document.addEventListener('keyup', function(event) {
  // console.log('Yo');
  frogger.move(event);
  console.log('move')
})

requestAnimationFrame(function gameLoop () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frogger.draw(ctx);
  cars0.draw(ctx);
  cars1.draw(ctx);
  cars2.draw(ctx);
  cars0.resetPostition()
  cars1.resetPostition()
  cars2.resetPostition()
  // console.log('Fuck');

  requestAnimationFrame(gameLoop)
})
