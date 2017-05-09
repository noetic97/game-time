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
    ctx.drawImage(frogImage,
      this.x,
      this.y,
      this.width,
      this.height
     );
  }

  move(event, canvas) {
    switch (event.keyCode) {
    case this.x < canvas.width - 50 && (39 || 68):
      this.x += 50;
      break;
    case this.x > 0 && (37 || 65):
      this.x -= 50;
      break
    case this.y > 100 && (38 || 87):
      this.y -= 50;
      break
    case this.y < canvas.height - 100 && (40 || 83):
      this.y += 50;
      break
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
      break
    case frogMoveIntoDock(frogger, docksToDraw) && (38 || 87):
      this.y -= 50;
      break
    case this.y < canvas.height - 100 && (40 || 83):
      this.y += 50;
      break
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
    carsToDraw.forEach(function(car) {
      if (frogger.x < car.x + car.width &&
      frogger.x + frogger.width > car.x &&
      frogger.y < car.y + car.height  &&
      frogger.height + frogger.y > car.y) {
        console.log(frogger);
        frogger.startLifes--;
        frogger.resetFrog();
        alert('Ya Dead!');

      } else if (!frogger.startLifes) {
        frogger.startLifes = 3;
        alert('Game Over');
      }
    })
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
        frogger.x + frogger.width > docksToDraw[i].x &&
        frogger.y < docksToDraw[i].y + docksToDraw[i].height  &&
        frogger.height + frogger.y > docksToDraw[i].y) {
        return true;
      }
    }
  }

  frogLandInDock(frogger, docksToDraw) {
    while (frogger.y < 100) {
      if (this.frogInDock(frogger, docksToDraw)) {
        setTimeout(function () {
          frogger.resetFrog();
        }, 1000)
      }
      break
    }
  }
}

function findLogsCollision(frogger, logsToDraw) {
  for (var i = 0; i < logsToDraw.length; i++) {
    if (frogger.x < logsToDraw[i].x + logsToDraw[i].width &&
      frogger.x + frogger.width > logsToDraw[i].x &&
      frogger.y < logsToDraw[i].y + logsToDraw[i].height  &&
      frogger.height + frogger.y > logsToDraw[i].y) {
      frogger.vX = logsToDraw[i].vX;
      frogger.logMove();
      return true
    }
  }
}

function frogMoveIntoDock(frogger, docksToDraw) {
  for (var i = 0; i < docksToDraw.length; i++) {
    if (frogger.x > docksToDraw[i].x
    && frogger.x + frogger.width < docksToDraw[i].x + docksToDraw[i].width) {
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
