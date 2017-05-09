var Frog = require('./Frog.js');
var Cars = require('./Cars.js');
var Logs = require('./Logs.js');
var Dock = require('./Dock.js');
// var Gameboard = require('./Gameboard.js')

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
// var gameboard = new Gameboard(0, 0, canvas.width, canvas.height, '#000')
var frogger = new Frog(350, 650);
var cars = new Cars()
var dock = new Dock()

var gameOver = false;
var carsToDraw = cars.generateCarsArray()
var logsToDraw = generateLogsArray()
var docksToDraw = dock.generateDock();
var startGameScreen = document.getElementById('game-start')
var startButton = document.getElementById('start-button')

console.log(startButton);










startButton.addEventListener('click', function() {
  gameOver = !gameOver;
  startGame();
  startGameScreen.style.display = 'none';
})

document.addEventListener('keydown', function(event) {
  if (frogger.y < 150 && frogger.y > 50) {
    frogger.moveInDock(event, canvas, frogger, docksToDraw)
  } else {
    frogger.move(event, canvas);
  }
})

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

function drawLives(ctx, numLives) {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(numLives + ' Lives', 25, 725);
}

function startGame() {
  if (gameOver) {
    requestAnimationFrame(function gameLoop () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // gameboard.drawBoard(ctx);
      drawLives(ctx, frogger.startLifes)

      carsToDraw.forEach(function(car) {
        car.draw(ctx);
        car.moveCars();
        car.resetPostition();
      })

      logsToDraw.forEach(function(log) {
        log.draw(ctx);
        log.moveLogs();
        log.resetPosition();
      })

      docksToDraw.forEach(function(dock) {
        dock.drawDock(ctx);
      })

      frogger.collisionDetection(frogger, carsToDraw);
      frogger.logCollisionDetection(frogger, logsToDraw);
      frogger.frogLandInDock(frogger, docksToDraw);
      frogger.draw(ctx);
      requestAnimationFrame(gameLoop)
    })
  }
}
