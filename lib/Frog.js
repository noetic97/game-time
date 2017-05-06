function Frog(x, y, vX) {
  this.x = x;
  this.y = y;
  this.vX = vX;
  this.height = 45;
  this.width = 45;
  this.startLifes = 3;
}

var frogImage;

loadResources();

function loadResources() {
  frogImage = new Image();
  frogImage.src = "lib/images/frog.png";
}

Frog.prototype.draw = function (ctx) {
  // ctx.fillStyle = "rgba(0, 255, 0, 1)"
  // ctx.fillRect(
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
  case this.y > 51 && (38 || 87):
    this.y -= 50;
    break
  case this.y < canvas.height - 100 && (40 || 83):
    this.y += 50;
    break
  default:
}
  console.log('frog x: ', this.x, ' frogger y ', this.y);
}
Frog.prototype.moveInDock = function(event, canvas) {
  switch (event.keyCode) {
  case this.x < canvas.width - 50 && (39 || 68):
    this.x += 50;
    break;
  case this.x > 0 && (37 || 65):
    this.x -= 50;
    break
  case this.y > 51 && (38 || 87):
    this.y -= 50;
    break
  case this.y < canvas.height - 100 && (40 || 83):
    this.y += 50;
    break
  default:
}
  console.log('move in dock');
}

Frog.prototype.logMove = function() {
  this.x += this.vX
}

Frog.prototype.resetFrog = function () {
  this.x = 350;
  this.y = 650;
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
      } else {
        frogger.startLifes--;
        frogger.resetFrog();
        alert('Ya Dead!');
      }
      break
    }
  }

// if frogger has y below 100 and x

function frogInDock(frogger, docksToDraw) {
  for (var i = 0; i < docksToDraw.length; i++) {
      if (frogger.x < docksToDraw[i].x + docksToDraw[i].width && //
        frogger.x + frogger.width > docksToDraw[i].x &&
        frogger.y < docksToDraw[i].y + docksToDraw[i].height  &&
        frogger.height + frogger.y > docksToDraw[i].y) {
          // console.log('function works')
        return true
      }
  }
}

Frog.prototype.frogLandInDock = function (frogger, docksToDraw) {
  while (frogger.y < 100) {
    if (frogInDock(frogger, docksToDraw)) {
    }
    break
  }
};



module.exports =  Frog;
