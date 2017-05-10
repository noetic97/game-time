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
    const DIRECTIONS = {
      LEFT: 37,
      RIGHT: 39,
      UP: 38,
      DOWN: 40
    };
    const { LEFT, RIGHT, UP, DOWN } = DIRECTIONS;
    const gridSize = 50;

    switch (event.keyCode) {
    case this.x < (canvas.width - gridSize) && RIGHT: {
      this.x += gridSize;
      break;
    }
    case this.x > 0 && LEFT: {
      this.x -= gridSize;
      break
    }
    case this.y > 100 && UP: {
      this.y -= gridSize;
      break
    }
    case this.y < (canvas.height - 100) && DOWN: {
      this.y += gridSize;
      break
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
    case this.x < canvas.width - gridSize && RIGHT: {
      this.x += gridSize;
      break;
    }
    case this.x > 0 && LEFT: {
      this.x -= gridSize;
      break
    }
    case this.frogCanDock(array) && UP: {
      this.y -= gridSize;
      break
    }
    case this.y < canvas.height - 100 && DOWN: {
      this.y += gridSize;
      break
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
      if (this.x < array[i].x + array[i].width &&
        this.x + this.width > array[i].x &&
        this.y < array[i].y + array[i].height  &&
        this.height + this.y > array[i].y) {
        return true;
      }
    }
  }

  frogHitByCar(carsToDraw) {
    if (this.collisionHelper(carsToDraw)) {
      this.startLifes--
      this.resetFrog();
      // alert('YA DEAD!!!')
    }
  }

  findLogsCollision(logsToDraw) {
    let {x, y, width, height} = this;

    for (let i = 0; i < logsToDraw.length; i++) {
      if (x < logsToDraw[i].x + logsToDraw[i].width &&
          x + width > logsToDraw[i].x &&
          y < logsToDraw[i].y + logsToDraw[i].height  &&
          height + y > logsToDraw[i].y) {

        this.vX = logsToDraw[i].vX;
        this.x += this.vX;
        return true
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
        // alert('YA DEAD!!!');
      }
    }
  }

  frogLandInDock(array) {
    while (this.y < 100) {
      if (this.frogCanDock(array)) {
        this.resetFrog();
      }
      break
    }
  }

  frogCanDock(array) {
    for (let i = 0; i < array.length; i++) {
      if (this.x > array[i].x - this.width / 2 &&
        this.x + this.width < array[i].x + array[i].width + this.width / 2) {
        return true;
      }
    }
  }

  gameOverCheck() {
    if (this.startLifes === 0) {
      // alert('GAME OVER!')
      this.resetFrog()
      this.startLifes = 3
    }
  }
}

module.exports = Frog;
