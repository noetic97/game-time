var Frog = require('./Frog.js');
var Cars = require('./Cars.js');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var frogger = new Frog(350, 650);

console.log(frogger.startLifes);



document.addEventListener('keydown', function(event) {
  frogger.move(event, canvas);
})

function generateCarsArray() {
  var carsArray = [];
  var x = 100;

  for (var i = 1; i < 13; i++) {
    switch (i === true) {
    case i > 3 :
      var carRow1 = new Cars(x, 600, 50, 35, -1)

      x += 200
      carsArray.push(carRow1);
      break
    case i > 6:
      var carRow2 = new Cars( x, 550, 50, 35, 2)

      x -= 200
      carsArray.push(carRow2)
      break
    case i > 9:
      var carRow3 = new Cars( x, 500, 50, 35, -2)

      x += 250
      carsArray.push(carRow3)
      break
    case i > 10:
      var carRow4 = new Cars( x, 450, 50, 35, 3)

      carsArray.push(carRow4)
      break
    case i > 12:
      var carRow5 = new Cars( x, 400, 90, 40, -2)

      x -= 350
      carsArray.push(carRow5)
      break
    }
  }
  return carsArray
}

var carsToDraw = generateCarsArray()

function drawLives(ctx, numLives) {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(numLives + ' Lives', 25, 725);
  }




requestAnimationFrame(function gameLoop () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frogger.draw(ctx);
  drawLives(ctx, frogger.startLifes)

  carsToDraw.forEach(function(car) {
    if (car.y === 600) {
      car.draw(ctx);
    } else if (car.y === 550) {
      car.draw(ctx)
    } else if (car.y === 500) {
      car.draw(ctx)
    } else if (car.y === 450) {
      car.draw(ctx)
    } else if (car.y === 400) {
      car.draw(ctx)
    }
    car.moveCars();
    car.resetPostition();
  })
  frogger.collisionDetection(frogger, carsToDraw);

  requestAnimationFrame(gameLoop)

})
