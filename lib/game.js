const Frog = require('./Frog.js');
const Cars = require('./Cars.js');
const Logs = require('./Logs.js');
const Dock = require('./Dock.js');
const Gameboard = require('./Gameboard.js')

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gameboard = new Gameboard(0, 0, canvas.width, canvas.height)
const frogger = new Frog(350, 650);
const cars = new Cars()
const logs = new Logs()
const dock = new Dock()

let gameOver = false;
const carsToDraw = cars.generateCarsArray()
const logsToDraw = logs.generateLogsArray()
const docksToDraw = dock.generateDock();

const startGameScreen = document.getElementById('game-start')
const startButton = document.getElementById('start-button')

startButton.addEventListener('click', function() {
  gameOver = !gameOver;
  startGame();
  startGameScreen.style.display = 'none';
})

document.addEventListener('keydown', function(event) {
  if (frogger.y < 150 && frogger.y > 50) {
    frogger.moveInDock(event, canvas, docksToDraw)
  } else {
    frogger.move(event, canvas);
  }
})

function startGame() {
  if (gameOver) {
    requestAnimationFrame(function gameLoop () {

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      gameboard.putBoardInGame(ctx, frogger.startLifes)
      gameboard.keepScore(frogger)
      gameboard.newHiScore();
      gameboard.levelUp(frogger, logsToDraw, carsToDraw)

      carsToDraw.forEach(function(car) {
        car.putCarsInGame(ctx);
      })

      logsToDraw.forEach(function(log) {
        log.putLogsInGame(ctx);
      })

      docksToDraw.forEach(function(dock) {
        dock.draw(ctx);
      })

      frogger.extraLife(gameboard)
      frogger.frogHitByCar(carsToDraw);
      frogger.logCollisionDetection(logsToDraw);
      frogger.draw(ctx);
      frogger.frogLandInDock(docksToDraw);
      gameboard.levelDown(frogger, logsToDraw, carsToDraw)
      frogger.gameOverCheck()
      requestAnimationFrame(gameLoop)
    })
  }
}
