var Frog = require('./Frog.js');
var Cars = require('./Cars.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var frogger = new Frog(350, 701);


document.addEventListener('keydown', function(event) {
  frogger.move(event, canvas);
  console.log('frogger x y', frogger.x, frogger.y);
})

function generateCarsArray() {
  var carsArray = [];
  var x = 100
  for (var i = 1; i < 13; i++) {
    switch (i === true) {
      case i > 3 :
        var carRow1 = new Cars(x, 650, 50, 50, -1)
        x += 200
        carsArray.push(carRow1);
        break
      case i > 6:

        var carRow2 = new Cars( x, 600, 50, 50, 2)
        x -= 200
        carsArray.push(carRow2)
        break
      case i > 9:
        x += 250
        var carRow3 = new Cars( x, 550, 50, 50, -3)
        carsArray.push(carRow3)
        break
      case i > 10:
        var carRow4 = new Cars( 400, 500, 50, 50, 4)
        carsArray.push(carRow4)
        break
      case i > 12:
        x -= 350
        var carRow5 = new Cars( x, 450, 100, 50, -2)
        carsArray.push(carRow5)
        break
    }
  }
  return carsArray
}

var carsToDraw = generateCarsArray()
console.log(carsToDraw[11].height, carsToDraw[11].width, 'car 11 height');
console.log(carsToDraw[1].height, 'car 1 height');
requestAnimationFrame(function gameLoop () {
// console.log('animation', carsToDraw);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frogger.draw(ctx);
  console.log(frogger.y);

  carsToDraw.forEach(function(car) {
    car.draw(ctx);
    car.moveCars();
    car.resetPostition();
  })

  frogger.collisionDetection(frogger, carsToDraw)
  // frogger.collisionDetection()
  requestAnimationFrame(gameLoop)
})
