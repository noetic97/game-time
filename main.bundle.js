/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(7);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// Requirements

	const Frog = __webpack_require__(2);
	const Cars = __webpack_require__(3);
	const Logs = __webpack_require__(4);
	const Dock = __webpack_require__(5);
	const Gameboard = __webpack_require__(6);

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

	const carsToDraw = cars.generateCarsArray();
	const logsToDraw = logs.generateLogsArray();
	const docksToDraw = dock.generateDock();

	// Game State Flags

	let beginGame = false;
	let pause = false;
	let stopGameFlag = false;
	let pauseDeadFlag = true;

	// DOM Elements

	const startGameScreen = document.getElementById('game-start');
	const pauseScreen = document.getElementById('game-paused');
	const startButton = document.getElementById('start-button');
	const pauseBackground = document.getElementById('pause-background');
	const gameOverScreen = document.getElementById('game-over');
	const loseLifeScreen = document.getElementById('game-died');

	// Event Listeners

	startButton.addEventListener('click', gameStart);

	document.addEventListener('keydown', moveFrog);

	document.addEventListener('keydown', pauseGame);

	document.addEventListener('keydown', keepPlaying);

	// Game Loop

	function startGame() {
	  requestAnimationFrame(function gameLoop() {
	    if (beginGame === true && pause === false && stopGameFlag === false) {
	      const livesBeginning = frogger.startLifes;

	      ctx.clearRect(0, 0, canvas.width, canvas.height);

	      gameboard.putBoardInGame(ctx, frogger.startLifes);
	      gameboard.keepScore(frogger);
	      gameboard.newHiScore();
	      gameboard.levelUp(frogger, logsToDraw, carsToDraw);

	      carsToDraw.forEach(function (car) {
	        car.putCarsInGame(ctx);
	      });

	      logsToDraw.forEach(function (log) {
	        log.putLogsInGame(ctx);
	      });

	      docksToDraw.forEach(function (dock) {
	        dock.draw(ctx);
	      });

	      frogger.extraLife(gameboard);
	      frogger.frogHitByCar(carsToDraw);
	      frogger.logCollisionDetection(logsToDraw);
	      frogger.frogLandInDock(docksToDraw);

	      frogger.draw(ctx);

	      gameboard.levelDown(frogger, logsToDraw, carsToDraw);

	      loseLifeCheck(livesBeginning);
	      gameOverCheckInGame();

	      requestAnimationFrame(gameLoop);
	    }
	  });
	}

	// Event Listener Callbacks

	function gameStart() {
	  beginGame = true;
	  startGame();
	  startGameScreen.style.display = 'none';
	}

	function pauseGame() {
	  if (event.which == 32 && beginGame === true && pauseDeadFlag === true) {
	    pause = !pause;
	    pause === true ? pauseScreen.style.display = 'block' : pauseScreen.style.display = 'none';
	    pause === true ? pauseBackground.style.display = 'block' : pauseBackground.style.display = 'none';
	    startGame();
	  }
	}

	function keepPlaying() {
	  if (event.which == 13 && stopGameFlag === true) {
	    gameOverScreen.style.display = 'none';
	    loseLifeScreen.style.display = 'none';
	    pauseBackground.style.display = 'none';
	    stopGameFlag = false;
	    pauseDeadFlag = true;
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
	    pauseDeadFlag = false;
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

	// Cheat code

	const secretCode = '38384040373937396665'; //99 lives Konami code
	let input = '';
	let timer;

	document.addEventListener('keyup', function (event) {
	  input += event.keyCode;

	  clearTimeout(timer);
	  timer = setTimeout(function () {
	    input = '';
	  }, 700);

	  check_input();
	});

	function check_input() {
	  if (input === secretCode) {
	    frogger.startLifes = 99;
	    alert('SO MANY LIVES!!!');
	  }
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Frog {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.height = 45;
	    this.width = 45;
	    this.startLifes = 3;
	    this.vX = 0;
	  }

	  draw(ctx) {
	    let frogImage = new Image();

	    frogImage.src = "lib/images/frog.png";
	    ctx.drawImage(frogImage, this.x, this.y, this.width, this.height);
	  }

	  move(event, canvas) {
	    const DIRECTIONS = {
	      LEFT: 37,
	      RIGHT: 39,
	      UP: 38,
	      DOWN: 40
	    };
	    const { LEFT, RIGHT, UP, DOWN } = DIRECTIONS;
	    const gridSize = 50;

	    switch (event.keyCode) {
	      case this.x < canvas.width - gridSize && RIGHT:
	        {
	          this.x += gridSize;
	          break;
	        }
	      case this.x > 0 && LEFT:
	        {
	          this.x -= gridSize;
	          break;
	        }
	      case this.y > 100 && UP:
	        {
	          this.y -= gridSize;
	          break;
	        }
	      case this.y < canvas.height - 100 && DOWN:
	        {
	          this.y += gridSize;
	          break;
	        }
	      default:
	    }
	  }

	  moveInDock(event, canvas, array) {
	    const DIRECTIONS = {
	      LEFT: 37,
	      RIGHT: 39,
	      UP: 38,
	      DOWN: 40
	    };
	    const { LEFT, RIGHT, UP, DOWN } = DIRECTIONS;
	    const gridSize = 50;

	    switch (event.keyCode) {
	      case this.x < canvas.width - gridSize && RIGHT:
	        {
	          this.x += gridSize;
	          break;
	        }
	      case this.x > 0 && LEFT:
	        {
	          this.x -= gridSize;
	          break;
	        }
	      case this.frogCanDock(array) && UP:
	        {
	          this.y -= gridSize;
	          break;
	        }
	      case this.y < canvas.height - 100 && DOWN:
	        {
	          this.y += gridSize;
	          break;
	        }
	      default:
	    }
	  }

	  resetFrog() {
	    this.x = 350;
	    this.y = 650;
	  }

	  extraLife(gameboard) {
	    if (gameboard.score % 300 === 0 && this.y < 100) {
	      this.startLifes++;
	    }
	  }

	  collisionHelper(array) {
	    for (let i = 0; i < array.length; i++) {
	      if (this.x < array[i].x + array[i].width && this.x + this.width > array[i].x && this.y < array[i].y + array[i].height && this.height + this.y > array[i].y) {
	        return true;
	      }
	    }
	  }

	  frogHitByCar(carsToDraw) {
	    if (this.collisionHelper(carsToDraw)) {
	      this.startLifes--;
	      this.resetFrog();
	    }
	  }

	  findLogsCollision(logsToDraw) {
	    let { x, y, width, height } = this;

	    for (let i = 0; i < logsToDraw.length; i++) {
	      if (x < logsToDraw[i].x + logsToDraw[i].width && x + width > logsToDraw[i].x && y < logsToDraw[i].y + logsToDraw[i].height && height + y > logsToDraw[i].y) {

	        this.vX = logsToDraw[i].vX;
	        this.x += this.vX;
	        return true;
	      }
	    }
	  }

	  logCollisionDetection(logsToDraw) {
	    while (this.y < 350 && this.y > 50) {
	      if (this.findLogsCollision(logsToDraw)) {
	        return true;
	      } else {
	        this.startLifes--;
	        this.resetFrog();
	      }
	    }
	  }

	  frogLandInDock(array) {
	    while (this.y < 100) {
	      if (this.frogCanDock(array)) {
	        this.resetFrog();
	      }
	      break;
	    }
	  }

	  frogCanDock(array) {
	    for (let i = 0; i < array.length; i++) {
	      if (this.x > array[i].x - this.width / 2 && this.x + this.width < array[i].x + array[i].width + this.width / 2) {
	        return true;
	      }
	    }
	  }

	  gameOverCheck() {
	    if (this.startLifes === 0) {
	      this.resetFrog();
	      this.startLifes = 3;
	      return true;
	    }
	  }
	}

	module.exports = Frog;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class Cars {
	  constructor(x, y, width, height, vX) {
	    this.x = x;
	    this.y = y;
	    this.height = height;
	    this.width = width;
	    this.vX = vX;
	  }

	  draw(ctx) {
	    let carImage = new Image();
	    let carImage2 = new Image();

	    carImage.src = "lib/images/car-left.png";
	    carImage2.src = "lib/images/batmobile-left.png";
	    ctx.drawImage(carImage, this.x, this.y, this.width, this.height);
	  }

	  resetPosition() {
	    if (this.x <= -50) {
	      this.x = 850;
	    } else if (this.x >= 850) {
	      this.x = -50;
	    }
	  }

	  moveCars() {
	    this.x += this.vX;
	  }

	  putCarsInGame(ctx) {
	    this.draw(ctx);
	    this.moveCars();
	    this.resetPosition();
	  }

	  generateCarsArray() {
	    const carsArray = [];
	    let x = 100;

	    for (let i = 1; i < 13; i++) {
	      switch (i === true) {
	        case i > 3:
	          {
	            const carRow1 = new Cars(x, 600, 50, 35, -1);

	            x += 200;
	            carsArray.push(carRow1);
	            break;
	          }
	        case i > 6:
	          {
	            const carRow2 = new Cars(x, 550, 50, 35, 2);

	            x -= 200;
	            carsArray.push(carRow2);
	            break;
	          }
	        case i > 9:
	          {
	            const carRow3 = new Cars(x, 500, 50, 35, -2);

	            x += 250;
	            carsArray.push(carRow3);
	            break;
	          }
	        case i > 10:
	          {
	            const carRow4 = new Cars(x, 450, 50, 35, 3);

	            carsArray.push(carRow4);
	            break;
	          }
	        case i > 12:
	          {
	            const carRow5 = new Cars(x, 400, 90, 40, -2);

	            x -= 350;
	            carsArray.push(carRow5);
	            break;
	          }
	      }
	    }
	    return carsArray;
	  }
	}

	module.exports = Cars;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class Logs {
	  constructor(x, y, width, height, vX) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.vX = vX;
	  }

	  draw(ctx) {
	    const logImage = new Image();

	    logImage.src = "lib/images/log.png";
	    ctx.drawImage(logImage, this.x, this.y, this.width, this.height);
	  }

	  resetPosition() {
	    if (this.x <= -150) {
	      this.x = 850;
	    } else if (this.x >= 850) {
	      this.x = -150;
	    }
	  }

	  moveLogs() {
	    this.x += this.vX;
	  }

	  putLogsInGame(ctx) {
	    this.draw(ctx);
	    this.moveLogs();
	    this.resetPosition();
	  }

	  generateLogsArray() {
	    const logsArray = [];
	    let x = 100;

	    for (let i = 1; i < 13; i++) {
	      switch (i === true) {
	        case i > 3:
	          {
	            const logRow1 = new Logs(x, 300, 100, 50, -3);

	            x += 200;
	            logsArray.push(logRow1);
	            break;
	          }
	        case i > 6:
	          {
	            const logRow2 = new Logs(x, 250, 150, 50, 2);

	            x -= 200;
	            logsArray.push(logRow2);
	            break;
	          }
	        case i > 9:
	          {
	            const logRow3 = new Logs(x, 200, 100, 50, -2);

	            x += 250;
	            logsArray.push(logRow3);
	            break;
	          }
	        case i > 10:
	          {
	            const logRow4 = new Logs(x, 150, 150, 50, 3);

	            logsArray.push(logRow4);
	            break;
	          }
	        case i > 12:
	          {
	            const logRow5 = new Logs(x, 100, 90, 50, -2);

	            x -= 350;
	            logsArray.push(logRow5);
	            break;
	          }
	      }
	    }
	    return logsArray;
	  }
	}

	module.exports = Logs;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	class Dock {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.width = 80;
	    this.height = 50;
	  }

	  draw(ctx) {
	    const dockImage = new Image();

	    dockImage.src = "lib/images/lilypad.png";
	    ctx.drawImage(dockImage, this.x, this.y, this.width = 75, this.height = 50);
	  }

	  generateDock() {
	    const dockArray = [];
	    let x = 50;

	    for (let i = 0; i < 5; i++) {
	      const newDock = new Dock(x, 50);

	      dockArray.push(newDock);
	      x += 75 + newDock.height;
	    }
	    return dockArray;
	  }
	}

	module.exports = Dock;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	class Gameboard {
	  constructor(x, y, width, height) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.score = 0;
	    this.level = 1;
	    this.levelCounter = 0;
	    if (JSON.parse(localStorage.getItem("hiScore")) === null) {
	      this.hiScore = 0;
	    } else {
	      this.hiScore = JSON.parse(localStorage.getItem("hiScore"));
	    }
	  }

	  draw(ctx) {
	    ctx.fillStyle = 'black';
	    ctx.fillRect(0, 0, 700, 50);
	    ctx.fillStyle = 'blue';
	    ctx.fillRect(0, 50, 700, 300);
	    ctx.fillStyle = 'green';
	    ctx.fillRect(0, 350, 700, 50);
	    ctx.fillStyle = 'grey';
	    ctx.fillRect(0, 400, 700, 250);
	    ctx.fillStyle = 'green';
	    ctx.fillRect(0, 650, 700, 50);
	    ctx.fillStyle = 'black';
	    ctx.fillRect(0, 700, 700, 50);
	  }

	  drawLives(ctx, numLives) {
	    ctx.font = "30px Comic Sans MS";
	    ctx.fillStyle = 'white';
	    ctx.fillText(numLives + ' Lives', 25, 735);
	  }

	  drawScore(ctx) {
	    ctx.font = "30px Comic Sans MS";
	    ctx.fillStyle = 'white';
	    ctx.fillText('Score: ' + this.score, 25, 35);
	  }

	  drawLevel(ctx) {
	    ctx.font = "30px Comic Sans MS";
	    ctx.fillStyle = 'white';
	    ctx.fillText('Level: ' + this.level, 550, 735);
	  }

	  drawHiScore(ctx) {
	    ctx.font = "30px Comic Sans MS";
	    ctx.fillStyle = 'white';
	    ctx.fillText('Hi-Score: ' + this.hiScore, 450, 35);
	  }

	  putBoardInGame(ctx, numLives) {
	    this.draw(ctx);
	    this.drawLives(ctx, numLives);
	    this.drawScore(ctx);
	    this.drawLevel(ctx);
	    this.drawHiScore(ctx);
	  }

	  keepScore(gamePiece) {
	    if (gamePiece.y < 100) {
	      this.score += 25;
	    }
	  }

	  newHiScore() {
	    if (this.score > this.hiScore) {
	      this.hiScore = this.score;
	      localStorage.setItem("hiScore", this.hiScore);
	    }
	  }

	  levelUp(gamePiece, obstacleArray, obstacleArray2) {
	    if (this.score % 125 === 0 && gamePiece.y < 100) {
	      this.level++;
	      this.levelCounter++;
	      this.difficultyUp(obstacleArray, obstacleArray2);
	    }
	  }

	  difficultyUp(obstacleArray, obstacleArray2) {
	    obstacleArray.forEach(obstacle => {
	      obstacle.vX < 0 ? obstacle.vX-- : obstacle.vX++;
	    });
	    obstacleArray2.forEach(obstacle => {
	      obstacle.vX < 0 ? obstacle.vX-- : obstacle.vX++;
	    });
	  }

	  levelDownHelper(obstacle) {
	    obstacle.vX < 0 ? obstacle.vX + this.levelCounter : obstacle.vX - this.levelCounter;
	  }

	  levelDown(gamePiece, obstacleArray, obstacleArray2) {
	    if (gamePiece.startLifes === 0) {
	      obstacleArray.forEach(obstacle => {
	        obstacle.vX < 0 ? obstacle.vX += this.levelCounter : obstacle.vX -= this.levelCounter;
	      });
	      obstacleArray2.forEach(obstacle => {
	        obstacle.vX < 0 ? obstacle.vX += this.levelCounter : obstacle.vX -= this.levelCounter;
	      });
	      this.levelCounter = 0;
	      this.level = 1;
	      this.score = 0;
	    }
	  }
	}

	module.exports = Gameboard;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "html {\n  background-color: black;\n}\n\nbody {\n  box-sizing: border-box;\n  font-family: 'Press Start 2P', cursive;\n  text-align: center;\n}\n\np {\n  font-size: 24px;\n}\n\n#game-container {\n  height: 750px;\n  margin: 50px auto;\n  position: relative;\n  width: 750px\n}\n\ncanvas {\n  border: 25px groove rgb(91, 185, 81);\n  border-radius: 15px;\n  margin: 0;\n  z-index: 1;\n}\n\n#game-start {\n  background: lightgray;\n  display: inline-block;\n  height: 750px;\n  left: 25px;\n  position: absolute;\n  top: 25px;\n  width: 700px;\n  z-index: 2;\n}\n\n#start-logo {\n  margin: 30px auto 0;\n}\n\n#start-button {\n  margin: 20px auto;\n  font-size: 30px;\n  font-family: 'Press Start 2P', cursive;\n  box-shadow: 3px 3px 1px black;\n  border-radius: 10px;\n}\n\n#game-paused {\n  display: none;\n  height: 750px;\n  left: 25px;\n  position: absolute;\n  top: 25px;\n  width: 700px;\n  z-index: 4;\n}\n\n#pause-logo {\n  margin-top: 150px;\n}\n\n#pause-background {\n  display: none;\n  height: 750px;\n  background-color: lightgray;\n  left: 25px;\n  position: absolute;\n  top: 25px;\n  width: 700px;\n  z-index: 3;\n  opacity: .5;\n}\n\n#game-died {\n  display: none;\n  height: 750px;\n  left: 25px;\n  position: absolute;\n  top: 25px;\n  width: 700px;\n  z-index: 4;\n}\n\n#player-dead {\n  color: red;\n}\n\n#game-over {\n  display: none;\n  height: 750px;\n  left: 25px;\n  position: absolute;\n  top: 25px;\n  width: 700px;\n  z-index: 5;\n}\n\n.game-status {\n  color: #35BF36;\n  font-size: 48pt;\n  margin: 15px auto;\n}\n\n.directions {\n  width: 550px;\n  margin: 50px auto 0;\n}\n\nbutton {\n  background-color: #35BF36;\n  border: none;\n  color: white;\n  height: 50px;\n  font-size: 20px;\n  font-weight: bold;\n  text-decoration: none;\n  width: 200px;\n}\n", ""]);

	// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);