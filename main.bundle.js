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
	__webpack_require__(6);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var Frog = __webpack_require__(2);
	var Cars = __webpack_require__(3);
	var Logs = __webpack_require__(4);
	var Dock = __webpack_require__(5);
	// var Gameboard = require('./Gameboard.js')

	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	// var gameboard = new Gameboard(0, 0, canvas.width, canvas.height, '#000')
	var frogger = new Frog(350, 650);
	var gameOver = false;
	var carsToDraw = generateCarsArray();
	var logsToDraw = generateLogsArray();
	var docksToDraw = generateDock();

	document.addEventListener('keydown', function (event) {
	  if (event.keyCode === 89) {
	    gameOver = !gameOver;
	    startGame();
	  }
	});

	document.addEventListener('keydown', function (event) {
	  if (frogger.y < 150 && frogger.y > 50) {
	    frogger.moveInDock(event, canvas, frogger, docksToDraw);
	  } else {
	    frogger.move(event, canvas);
	  }
	});

	function generateCarsArray() {
	  var carsArray = [];
	  var x = 100;

	  for (var i = 1; i < 13; i++) {
	    switch (i === true) {
	      case i > 3:
	        var carRow1 = new Cars(x, 600, 50, 35, -1);

	        x += 200;
	        carsArray.push(carRow1);
	        break;
	      case i > 6:
	        var carRow2 = new Cars(x, 550, 50, 35, 2);

	        x -= 200;
	        carsArray.push(carRow2);
	        break;
	      case i > 9:
	        var carRow3 = new Cars(x, 500, 50, 35, -2);

	        x += 250;
	        carsArray.push(carRow3);
	        break;
	      case i > 10:
	        var carRow4 = new Cars(x, 450, 50, 35, 3);

	        carsArray.push(carRow4);
	        break;
	      case i > 12:
	        var carRow5 = new Cars(x, 400, 90, 40, -2);

	        x -= 350;
	        carsArray.push(carRow5);
	        break;
	    }
	  }
	  return carsArray;
	}

	function generateLogsArray() {
	  var logsArray = [];
	  var x = 100;

	  for (var i = 1; i < 13; i++) {
	    switch (i === true) {
	      case i > 3:
	        var logRow1 = new Logs(x, 300, 100, 50, -3);

	        x += 200;
	        logsArray.push(logRow1);
	        break;
	      case i > 6:
	        var logRow2 = new Logs(x, 250, 150, 50, 2);

	        x -= 200;
	        logsArray.push(logRow2);
	        break;
	      case i > 9:
	        var logRow3 = new Logs(x, 200, 100, 50, -2);

	        x += 250;
	        logsArray.push(logRow3);
	        break;
	      case i > 10:
	        var logRow4 = new Logs(x, 150, 150, 50, 3);

	        logsArray.push(logRow4);
	        break;
	      case i > 12:
	        var logRow5 = new Logs(x, 100, 90, 50, -2);

	        x -= 350;
	        logsArray.push(logRow5);
	        break;
	    }
	  }
	  return logsArray;
	}

	function generateDock() {
	  var dockArray = [];
	  var x = 50;

	  for (var i = 0; i < 5; i++) {
	    var newDock = new Dock(x, 50);

	    dockArray.push(newDock);
	    x += 75 + newDock.height;
	  }
	  return dockArray;
	}

	// console.log(dockArray);

	function drawLives(ctx, numLives) {
	  ctx.font = "30px Comic Sans MS";
	  ctx.fillStyle = "red";
	  ctx.fillText(numLives + ' Lives', 25, 725);
	}

	function startGame() {
	  if (gameOver) {
	    requestAnimationFrame(function gameLoop() {
	      ctx.clearRect(0, 0, canvas.width, canvas.height);

	      // gameboard.drawBoard(ctx);
	      drawLives(ctx, frogger.startLifes);

	      carsToDraw.forEach(function (car) {
	        car.draw(ctx);
	        car.moveCars();
	        car.resetPostition();
	      });

	      logsToDraw.forEach(function (log) {
	        log.draw(ctx);
	        log.moveLogs();
	        log.resetPosition();
	      });

	      docksToDraw.forEach(function (dock) {
	        dock.drawDock(ctx);
	      });

	      frogger.collisionDetection(frogger, carsToDraw);
	      frogger.logCollisionDetection(frogger, logsToDraw);
	      frogger.frogLandInDock(frogger, docksToDraw);
	      frogger.draw(ctx);
	      requestAnimationFrame(gameLoop);
	    });
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
	    ctx.drawImage(frogImage, this.x, this.y, this.width, this.height);
	  }

	  move(event, canvas) {
	    switch (event.keyCode) {
	      case this.x < canvas.width - 50 && (39 || 68):
	        this.x += 50;
	        break;
	      case this.x > 0 && (37 || 65):
	        this.x -= 50;
	        break;
	      case this.y > 100 && (38 || 87):
	        this.y -= 50;
	        break;
	      case this.y < canvas.height - 100 && (40 || 83):
	        this.y += 50;
	        break;
	      default:
	    }
	  }

	  moveInDock(event, canvas, frogger, docksToDraw) {
	    switch (event.keyCode) {
	      case this.x < canvas.width - 50 && (39 || 68):
	        this.x += 50;
	        break;
	      case this.x > 0 && (37 || 65):
	        this.x -= 50;
	        break;
	      case frogMoveIntoDock(frogger, docksToDraw) && (38 || 87):
	        this.y -= 50;
	        break;
	      case this.y < canvas.height - 100 && (40 || 83):
	        this.y += 50;
	        break;
	      default:
	    }
	  }

	  logMove() {
	    this.x += this.vX;
	  }

	  resetFrog() {
	    this.x = 350;
	    this.y = 650;
	  }

	  collisionDetection(frogger, carsToDraw) {
	    carsToDraw.forEach(function (car) {
	      if (frogger.x < car.x + car.width && frogger.x + frogger.width > car.x && frogger.y < car.y + car.height && frogger.height + frogger.y > car.y) {
	        console.log(frogger);
	        frogger.startLifes--;
	        frogger.resetFrog();
	        alert('Ya Dead!');
	      } else if (!frogger.startLifes) {
	        frogger.startLifes = 3;
	        alert('Game Over');
	      }
	    });
	  }

	  logCollisionDetection(frogger, logsToDraw) {
	    while (frogger.y < 350 && frogger.y > 50) {
	      if (findLogsCollision(frogger, logsToDraw)) {
	        return true;
	      } else {
	        frogger.startLifes--;
	        frogger.resetFrog();
	        alert('Ya Dead!');
	      }
	    }
	  }

	  frogInDock(frogger, docksToDraw) {
	    for (var i = 0; i < docksToDraw.length; i++) {
	      if (frogger.x < docksToDraw[i].x + docksToDraw[i].width && //
	      frogger.x + frogger.width > docksToDraw[i].x && frogger.y < docksToDraw[i].y + docksToDraw[i].height && frogger.height + frogger.y > docksToDraw[i].y) {
	        return true;
	      }
	    }
	  }

	  frogLandInDock(frogger, docksToDraw) {
	    while (frogger.y < 100) {
	      if (this.frogInDock(frogger, docksToDraw)) {
	        setTimeout(function () {
	          frogger.resetFrog();
	        }, 1000);
	      }
	      break;
	    }
	  }

	}

	var frogImage;

	loadResources();

	function loadResources() {
	  frogImage = new Image();
	  frogImage.src = "lib/images/frog.png";
	}

	function findLogsCollision(frogger, logsToDraw) {
	  for (var i = 0; i < logsToDraw.length; i++) {
	    if (frogger.x < logsToDraw[i].x + logsToDraw[i].width && frogger.x + frogger.width > logsToDraw[i].x && frogger.y < logsToDraw[i].y + logsToDraw[i].height && frogger.height + frogger.y > logsToDraw[i].y) {
	      frogger.vX = logsToDraw[i].vX;
	      frogger.logMove();
	      return true;
	    }
	  }
	}

	function frogMoveIntoDock(frogger, docksToDraw) {
	  for (var i = 0; i < docksToDraw.length; i++) {
	    if (frogger.x > docksToDraw[i].x && frogger.x + frogger.width < docksToDraw[i].x + docksToDraw[i].width) {
	      return true;
	    }
	  }
	}

	// function Frog(x, y) {
	//   this.x = x;
	//   this.y = y;
	//   this.height = 45;
	//   this.width = 45;
	//   this.startLifes = 3;
	//   this.vX = 0;
	// }
	//
	//
	//
	// Frog.prototype.draw = function (ctx) {
	//   ctx.drawImage(frogImage,
	//     this.x,
	//     this.y,
	//     this.width,
	//     this.height
	//    );
	// };
	//
	// Frog.prototype.move = function(event, canvas) {
	//   switch (event.keyCode) {
	//   case this.x < canvas.width - 50 && (39 || 68):
	//     this.x += 50;
	//     break;
	//   case this.x > 0 && (37 || 65):
	//     this.x -= 50;
	//     break
	//   case this.y > 100 && (38 || 87):
	//     this.y -= 50;
	//     break
	//   case this.y < canvas.height - 100 && (40 || 83):
	//     this.y += 50;
	//     break
	//   default:
	//   }
	// }
	//
	// Frog.prototype.moveInDock = function(event, canvas, frogger, docksToDraw) {
	//   switch (event.keyCode) {
	//   case this.x < canvas.width - 50 && (39 || 68):
	//     this.x += 50;
	//     break;
	//   case this.x > 0 && (37 || 65):
	//     this.x -= 50;
	//     break
	//   case frogMoveIntoDock(frogger, docksToDraw) && (38 || 87):
	//     this.y -= 50;
	//     break
	//   case this.y < canvas.height - 100 && (40 || 83):
	//     this.y += 50;
	//     break
	//   default:
	//   }
	// }
	//
	// Frog.prototype.logMove = function() {
	//   this.x += this.vX
	// }
	//
	// Frog.prototype.resetFrog = function () {
	//   this.x = 350;
	//   this.y = 650;
	// }
	//
	// Frog.prototype.collisionDetection = function (frogger, carsToDraw) {
	//   carsToDraw.forEach(function(car) {
	//     if (frogger.x < car.x + car.width &&
	//     frogger.x + frogger.width > car.x &&
	//     frogger.y < car.y + car.height  &&
	//     frogger.height + frogger.y > car.y) {
	//       console.log(frogger);
	//       frogger.startLifes--;
	//       frogger.resetFrog();
	//       alert('Ya Dead!');
	//
	//     } else if (!frogger.startLifes) {
	//       frogger.startLifes = 3;
	//       alert('Game Over');
	//     }
	//   })
	// };
	//
	//
	//
	// Frog.prototype.logCollisionDetection = function(frogger, logsToDraw) {
	//   while (frogger.y < 350 && frogger.y > 50) {
	//     if (findLogsCollision(frogger, logsToDraw)) {
	//       return true;
	//     } else {
	//       frogger.startLifes--;
	//       frogger.resetFrog();
	//       alert('Ya Dead!');
	//     }
	//   }
	// }
	//
	// Frog.prototype.frogInDock = function (frogger, docksToDraw) {
	//   for (var i = 0; i < docksToDraw.length; i++) {
	//     if (frogger.x < docksToDraw[i].x + docksToDraw[i].width && //
	//       frogger.x + frogger.width > docksToDraw[i].x &&
	//       frogger.y < docksToDraw[i].y + docksToDraw[i].height  &&
	//       frogger.height + frogger.y > docksToDraw[i].y) {
	//       return true;
	//     }
	//   }
	// }
	//
	//
	//
	// Frog.prototype.frogLandInDock = function (frogger, docksToDraw) {
	//   while (frogger.y < 100) {
	//     if (this.frogInDock(frogger, docksToDraw)) {
	//       setTimeout(function () {
	//         frogger.resetFrog();
	//       }, 1000)
	//     }
	//     break
	//   }
	// };

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
	    ctx.drawImage(carImage, this.x, this.y, this.width, this.height);
	  }

	  resetPostition() {
	    if (this.x <= -50) {
	      this.x = 850;
	    } else if (this.x >= 850) {
	      this.x = -50;
	    }
	  }

	  moveCars() {
	    this.x += this.vX;
	  }
	}

	var carImage;
	var carImage2;

	loadResources();

	function loadResources() {
	  carImage = new Image();
	  carImage.src = "lib/images/batmobile-left.png";
	  carImage2 = new Image();
	  carImage2.src = "lib/images/car-left.png";
	}

	// function Cars(x, y, width, height, vX) {
	//   this.x = x;
	//   this.y = y;
	//   this.height = height;
	//   this.width = width;
	//   this.vX = vX;
	// }
	//
	//
	// Cars.prototype.draw = function (ctx) {
	//   ctx.drawImage(carImage,
	//     this.x,
	//     this.y,
	//     this.width,
	//     this.height
	//   );
	//   ctx.drawImage(carImage2,
	//     this.x,
	//     this.y,
	//     this.width,
	//     this.height
	//   );
	// };
	//
	// Cars.prototype.resetPostition = function()  {
	//   if (this.x <= -50) {
	//     this.x = 850;
	//   } else if (this.x >= 850) {
	//     this.x = -50;
	//   }
	// }
	//
	// Cars.prototype.moveCars = function() {
	//   this.x += this.vX;
	// }

	module.exports = Cars;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class Logs {
	  constructor(x, y, width, height, vX) {
	    this.x = x;
	    this.y = y;
	    this.height = height;
	    this.width = width;
	    this.vX = vX;
	  }

	  draw(ctx) {
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
	}

	var logImage;

	loadResources();

	function loadResources() {
	  logImage = new Image();
	  logImage.src = "lib/images/log.png";
	}
	// function Logs(x, y, width, height, vX) {
	//   this.x = x;
	//   this.y = y;
	//   this.height = height;
	//   this.width = width;
	//   this.vX = vX;
	// }

	// Logs.prototype.draw = function (ctx) {
	//   ctx.drawImage(logImage,
	//     this.x,
	//     this.y,
	//     this.width,
	//     this.height
	//   );
	// };
	//
	// Logs.prototype.resetPostition = function()  {
	//   if (this.x <= -150) {
	//     this.x = 850;
	//   } else if (this.x >= 850) {
	//     this.x = -150;
	//   }
	// }
	//
	// Logs.prototype.moveLogs = function() {
	//   this.x += this.vX;
	// }

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

	  drawDock(ctx) {
	    ctx.drawImage(dockImage, this.x, this.y, this.width = 75, this.height = 50);
	  }
	}

	var dockImage;

	loadResources();

	function loadResources() {
	  dockImage = new Image();
	  dockImage.src = "lib/images/lilypad.png";
	}

	// function Dock(x, y) {
	//   this.x = x;
	//   this.y = y;
	//   this.width = 80;
	//   this.height = 50;
	// }
	//
	// Dock.prototype.drawDock = function (ctx) {
	//   ctx.drawImage(dockImage,
	//     this.x,
	//     this.y,
	//     this.width = 75,
	//     this.height = 50
	//   )
	// };

	module.exports = Dock;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "body {\n  text-align: center;\n}\n\ncanvas {\n  margin-top: 25px;\n  border: 1px dashed black;\n}\n", ""]);

	// exports


/***/ }),
/* 8 */
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
/* 9 */
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