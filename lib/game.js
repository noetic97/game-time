var Frog = require('./Frog.js');
var Cars = require('./Cars.js');
var Logs = require('./Logs.js');
var Dock = require('./Dock.js');
var Gameboard = require('./Gameboard.js')

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var gameboard = new Gameboard(0, 0, canvas.width, canvas.height)
var score = gameboard.score
var frogger = new Frog(350, 650);
var cars = new Cars()
var logs = new Logs()
var dock = new Dock()

var gameOver = false;
var carsToDraw = cars.generateCarsArray()
var logsToDraw = logs.generateLogsArray()
var docksToDraw = dock.generateDock();

var startGameScreen = document.getElementById('game-start')
var startButton = document.getElementById('start-button')
var resetBoard = false

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

function startGame() {
  if (gameOver) {
    requestAnimationFrame(function gameLoop () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      gameboard.drawboard(ctx);
      gameboard.drawLives(ctx, frogger.startLifes);
      gameboard.keepScore(frogger)
      gameboard.drawScore(ctx, gameboard.score);
      gameboard.levelUp(frogger, logsToDraw, carsToDraw)
      gameboard.drawLevel(ctx, gameboard.level);
      gameboard.drawHiScore(ctx, gameboard.hiScore)
      // gameboard.keepScore();

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
      gameboard.levelDown(frogger, logsToDraw, carsToDraw)
      frogger.gameOverCheck()
      requestAnimationFrame(gameLoop)
    })
  }
}
