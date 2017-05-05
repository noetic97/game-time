var Frog = require('./Frog.js');
var Cars = require('./Cars.js');
var Logs = require('./Logs.js')

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var frogger = new Frog(350, 650);
var gameOver = false;

console.log(frogger.startLifes);



document.addEventListener('keydown', function(event) {
  frogger.move(event, canvas);
})

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 89) {
    gameOver = !gameOver;
    startGame();
  }
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

function generateLogsArray() {
  var logsArray = [];
  var x = 100;

  for (var i = 1; i < 13; i++) {
    switch (i === true) {
    case i > 3 :
      var logRow1 = new Logs(x, 300, 100, 50, -3)

      x += 200
      logsArray.push(logRow1);
      break
    case i > 6:
      var logRow2 = new Logs( x, 250, 150, 50, 2)

      x -= 200
      logsArray.push(logRow2)
      break
    case i > 9:
      var logRow3 = new Logs( x, 200, 100, 50, -2)

      x += 250
      logsArray.push(logRow3)
      break
    case i > 10:
      var logRow4 = new Logs( x, 150, 150, 50, 3)

      logsArray.push(logRow4)
      break
    case i > 12:
      var logRow5 = new Logs( x, 100, 90, 50, -2)

      x -= 350
      logsArray.push(logRow5)
      break
    }
  }
  return logsArray
}

var logsToDraw = generateLogsArray()

function drawLives(ctx, numLives) {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(numLives + ' Lives', 25, 725);
}

function startGame() {
  if (gameOver) {
    requestAnimationFrame(function gameLoop () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
      logsToDraw.forEach(function(log) {
        log.draw(ctx);
        log.moveLogs();
        log.resetPostition();
      })
      frogger.draw(ctx);
      frogger.collisionDetection(frogger, carsToDraw);
      frogger.logCollisionDetection(frogger, logsToDraw);

      requestAnimationFrame(gameLoop)
    })
  }
}
