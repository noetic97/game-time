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

  extraLife(gameboard) {
    if (gameboard.score % 300 === 0 && this.y < 100) {
      this.startLifes++;
    }
  }

  collisionDetection(frogger, carsToDraw) {
    carsToDraw.forEach(function(car) {
      let { x, y, width, height } = car;

      if (frogger.x < x + width &&
      frogger.x + frogger.width > x &&
      frogger.y < y + height  &&
      frogger.height + frogger.y > y) {
        frogger.startLifes--;
        setTimeout(function() {
          frogger.resetFrog();
          alert('Ya Dead!');
        }, 1);
      }
    })
  }

  findLogsCollision(frogger, logsToDraw) {
    let {x, y, width, height} = this;

    for (let i = 0; i < logsToDraw.length; i++) {
      if (x < logsToDraw[i].x + logsToDraw[i].width &&
          x + width > logsToDraw[i].x &&
          y < logsToDraw[i].y + logsToDraw[i].height  &&
          height + y > logsToDraw[i].y) {

        this.vX = logsToDraw[i].vX;
        this.logMove();
        return true
      }
    }
  }

  logCollisionDetection(frogger, logsToDraw) {
    while (frogger.y < 350 && frogger.y > 50) {
      if (this.findLogsCollision(frogger, logsToDraw)) {
        return true;
      } else {
        frogger.startLifes--;
        frogger.resetFrog();
        alert('Ya Dead!');
        // setTimeout(function() {
        // }, 1);
      }
    }
  }

  frogInDock(frogger, docksToDraw) {
    for (let i = 0; i < docksToDraw.length; i++) {
      if (this.x < docksToDraw[i].x + docksToDraw[i].width && //
        this.x + this.width > docksToDraw[i].x &&
        this.y < docksToDraw[i].y + docksToDraw[i].height  &&
        this.height + this.y > docksToDraw[i].y) {
        return true;
      }
    }
  }

  gameOverCheck() {
    if (this.startLifes === 0) {
      alert('GAME OVER!')
      this.resetFrog()
      this.startLifes = 3
    }
  }

  frogLandInDock(frogger, docksToDraw) {
    while (frogger.y < 100) {
      if (this.frogInDock(frogger, docksToDraw)) {
        frogger.resetFrog();
        // setTimeout(function() {
        // }, 1);
      }
      break
    }
    // gameboard.score += 25;
    // console.log(gameboard.score);
  }

  frogMoveIntoDock(frogger, docksToDraw) {
    for (let i = 0; i < docksToDraw.length; i++) {
      if (this.x > docksToDraw[i].x &&
          this.x + this.width < docksToDraw[i].x + docksToDraw[i].width) {

        return true;
      }
    }
  }
}

module.exports = Frog;
