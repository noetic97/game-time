function Frog(x, y, vX) {
  this.x = x;
  this.y = y;
  this.vX = vX;
  this.height = 45;
  this.width = 45;
  this.startLifes = 3;
}

var frogImage;
var frogKingImage;

loadResources();

function loadResources() {
  frogImage = new Image();
  frogImage.src = "lib/images/frog.png";
  frogKingImage = new Image();
  frogKingImage.src = "lib/images/frog-king.png"
}

Frog.prototype.draw = function (ctx) {
  ctx.drawImage(frogImage,
    this.x,
    this.y,
    this.width,
    this.height
   );
};

Frog.prototype.move = function(event, canvas) {
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
  console.log('frog x: ', this.x, ' frogger y ', this.y);
}
Frog.prototype.moveInDock = function(event, canvas, frogger, docksToDraw) {
  console.log(frogMoveIntoDock(frogger, docksToDraw));
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

Frog.prototype.logMove = function() {
  this.x += this.vX
}

Frog.prototype.resetFrog = function () {
  this.x = 350;
  this.y = 650;
  kingFrogFlag = true;
}

Frog.prototype.collisionDetection = function (frogger, carsToDraw) {
  carsToDraw.forEach(function(car) {
    if (frogger.x < car.x + car.width &&
    frogger.x + frogger.width > car.x &&
    frogger.y < car.y + car.height  &&
    frogger.height + frogger.y > car.y) {

      frogger.startLifes--;
      frogger.resetFrog();
      alert('Ya Dead!');

    } else if (!frogger.startLifes) {
      frogger.startLifes = 3;
      alert('Game Over');
    }
  })
};

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


Frog.prototype.logCollisionDetection = function(frogger, logsToDraw) {
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


function frogInDock(frogger, docksToDraw) {
  for (var i = 0; i < docksToDraw.length; i++) {
    if (frogger.x < docksToDraw[i].x + docksToDraw[i].width && //
      frogger.x + frogger.width > docksToDraw[i].x &&
      frogger.y < docksToDraw[i].y + docksToDraw[i].height  &&
      frogger.height + frogger.y > docksToDraw[i].y) {
      return true;
    }
  }
}

function frogMoveIntoDock(frogger, docksToDraw) {
  for (var i = 0; i < docksToDraw.length; i++) {
    if (frogger.x > docksToDraw[i].x
    && frogger.x + frogger.width < docksToDraw[i].x + docksToDraw[i].width) {
      console.log(docksToDraw[i]);
      return true;
    }
  }
}

Frog.prototype.frogLandInDock = function (frogger, docksToDraw) {
  while (frogger.y < 100) {
    if (frogInDock(frogger, docksToDraw)) {
      setTimeout(function () {
        frogger.resetFrog();
      }, 1000)
    }
    break
  }
  // kingFrogFlag = true;
};

module.exports =  Frog;
