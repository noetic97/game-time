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
    // const LEFT = 39;
    const frogMoveDist = 50;

    switch (event.keyCode) {
    case this.x < canvas.width - frogMoveDist && (39 || 68):
      this.x += frogMoveDist;
      break;
    case this.x > 0 && (37 || 65):
      this.x -= frogMoveDist;
      break
    case this.y > 100 && (38 || 87):
      this.y -= frogMoveDist;
      break
    case this.y < canvas.height - 100 && (40 || 83):
      this.y += frogMoveDist;
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
    case this.frogMoveIntoDock(frogger, docksToDraw) && (38 || 87):
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
      if (this.findLogsCollision(frogger, logsToDraw)) {
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
      if (this.x < docksToDraw[i].x + docksToDraw[i].width && //
        this.x + this.width > docksToDraw[i].x &&
        this.y < docksToDraw[i].y + docksToDraw[i].height  &&
        this.height + this.y > docksToDraw[i].y) {
        return true;
      }
    }
  }

  frogLandInDock(frogger, docksToDraw) {
    while (frogger.y < 100) {
      if (this.frogInDock(frogger, docksToDraw)) {
        frogger.resetFrog();
      }
      break
    }
    // gameboard.score += 25;
    // console.log(gameboard.score);
  }

  findLogsCollision(frogger, logsToDraw) {
    // var {x, y, width, height} = this;
    for (var i = 0; i < logsToDraw.length; i++) {
      if (this.x < logsToDraw[i].x + logsToDraw[i].width &&
          this.x + this.width > logsToDraw[i].x &&
          this.y < logsToDraw[i].y + logsToDraw[i].height  &&
          this.height + this.y > logsToDraw[i].y) {

        this.vX = logsToDraw[i].vX;
        this.logMove();
        return true
      }
    }
  }

  frogMoveIntoDock(frogger, docksToDraw) {
    for (var i = 0; i < docksToDraw.length; i++) {
      if (this.x > docksToDraw[i].x &&
          this.x + this.width < docksToDraw[i].x + docksToDraw[i].width) {

        return true;
      }
    }
  }
}

module.exports = Frog;
