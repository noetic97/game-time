// Requirements

const Frog = require('./Frog.js');
const Cars = require('./Cars.js');
const Logs = require('./Logs.js');
const Dock = require('./Dock.js');
const Gameboard = require('./Gameboard.js');

// Canvas DOM Manipulation

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Game Objects

const gameboard = new Gameboard(0, 0, canvas.width, canvas.height);
const frogger = new Frog(350, 650);
const cars = new Cars();
const logs = new Logs();
const dock = new Dock();

// Gerate Game Object Arrays

const carsToDraw = cars.generateCarsArray()
const logsToDraw = logs.generateLogsArray()
const docksToDraw = dock.generateDock();

// Game State Flags

let beginGame = false;
let pause = false;
let stopGameFlag = false;

// DOM Elements

const startGameScreen = document.getElementById('game-start');
const pauseScreen = document.getElementById('game-paused');
const startButton = document.getElementById('start-button');
const pauseBackground = document.getElementById('pause-background');
const gameOverScreen = document.getElementById('game-over');
const loseLifeScreen = document.getElementById('game-died');

// Event Listeners

startButton.addEventListener('click', gameStart)

document.addEventListener('keydown', moveFrog)

document.addEventListener('keydown', pauseGame)

document.addEventListener('keydown', keepPlaying)

// Game Loop

function startGame() {
  requestAnimationFrame( function gameLoop () {
    if (beginGame === true && pause === false && stopGameFlag === false) {
      const livesBeginning = frogger.startLifes

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      gameboard.drawboard(ctx);
      gameboard.drawLives(ctx, frogger.startLifes);
      gameboard.keepScore(frogger)
      gameboard.drawScore(ctx, gameboard.score);
      gameboard.levelUp(frogger, logsToDraw, carsToDraw)
      gameboard.drawLevel(ctx, gameboard.level);
      gameboard.newHiScore();
      gameboard.drawHiScore(ctx, gameboard.hiScore)

      frogger.extraLife(gameboard)

      carsToDraw.forEach(function(car) {
        car.draw(ctx);
        car.moveCars();
        car.resetPosition();
      })

      logsToDraw.forEach(function(log) {
        log.draw(ctx);
        log.moveLogs();
        log.resetPosition();
      })

      docksToDraw.forEach(function(dock) {
        dock.drawDock(ctx);
      })

      frogger.frogHitByCar(carsToDraw);
      frogger.logCollisionDetection(logsToDraw);
      frogger.frogLandInDock(docksToDraw);

      frogger.draw(ctx);

      gameboard.levelDown(frogger, logsToDraw, carsToDraw);

      loseLifeCheck(livesBeginning);
      gameOverCheckInGame();

      requestAnimationFrame(gameLoop);
    }
  })
}

// Event Listener Callbacks

function gameStart() {
  beginGame = true;
  startGame();
  startGameScreen.style.display = 'none';
}

function pauseGame() {
  if (event.which == 32 || event.keyCode == 32) {
    pause = !pause;
    pause === true ? pauseScreen.style.display = 'block' :
    pauseScreen.style.display = 'none';
    pause === true ? pauseBackground.style.display = 'block' :
    pauseBackground.style.display = 'none';
    startGame();
  }
}

function keepPlaying() {
  if (event.which == 13 && stopGameFlag === true) {
    gameOverScreen.style.display = 'none';
    loseLifeScreen.style.display = 'none';
    pauseBackground.style.display = 'none';
    stopGameFlag = false;
    startGame();
  }
}

function moveFrog() {
  if (frogger.y < 150 && frogger.y > 50) {
    frogger.moveInDock(event, canvas, docksToDraw);
  } else {
    frogger.move(event, canvas);
  }
}

// Game State Evaluation Functions

function loseLifeCheck(livesBeginning) {
  if (livesBeginning > frogger.startLifes && frogger.startLifes != 0) {
    stopGameFlag = true;
    loseLifeScreen.style.display = 'block';
    pauseBackground.style.display = 'block';
  }
}

function gameOverCheckInGame() {
  if (frogger.gameOverCheck()) {
    stopGameFlag = true;

    gameOverScreen.style.display = 'block';
    pauseBackground.style.display = 'block';
  }
}
