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
      this.hiScore = JSON.parse(localStorage.getItem("hiScore"))
    }
  }

  drawboard(ctx) {
    // let grassImage = new Image();
    //
    // grassImage.src = "lib/images/grass.png";
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 700, 50)
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 50, 700, 300)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 350, 700, 50)
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 400, 700, 250)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 650, 700, 50)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 700, 700, 50)
  }

  drawLives(ctx, numLives) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText(numLives + ' Lives', 25, 735);
  }

  drawScore(ctx) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + this.score, 25, 35);
  }

  keepScore(gamePiece) {
    if (gamePiece.y < 100) {
      this.score += 25;
    }
  }

  drawLevel(ctx) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText('Level: ' + this.level, 550, 735);
  }

  newHiScore() {
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      localStorage.setItem("hiScore", this.hiScore)
    }
  }

  drawHiScore(ctx) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText('Hi-Score: ' + this.hiScore, 450, 35);
  }

  levelUp(gamePiece, obstacleArray, obstacleArray2) {
    if (this.score % 125 === 0 && gamePiece.y < 100) {
      this.level++;
      this.levelCounter++;
      obstacleArray.forEach( (obstacle) => {
        obstacle.vX < 0 ? obstacle.vX-- : obstacle.vX++
      })
      obstacleArray2.forEach( (obstacle) => {
        obstacle.vX < 0 ? obstacle.vX-- : obstacle.vX++
      })
      console.log(obstacleArray, 'in level up');
    }
  }

  levelDownHelper(obstacle) {
    obstacle.vX < 0 ? obstacle.vX + this.levelCounter : obstacle.vX - this.levelCounter;
  }

  levelDown(gamePiece, obstacleArray, obstacleArray2) {
    if (gamePiece.startLifes === 0) {
      console.log('1 before', obstacleArray);
      // console.log('2 before', obstacleArray2);

      obstacleArray.forEach( (obstacle) => {
        obstacle.vX < 0 ? obstacle.vX += this.levelCounter : obstacle.vX -= this.levelCounter;
      })
      obstacleArray2.forEach( (obstacle) => {
        obstacle.vX < 0 ? obstacle.vX += this.levelCounter : obstacle.vX -= this.levelCounter;
      })
      console.log('1 after', obstacleArray);
      // console.log('2 after', obstacleArray2);
      this.levelCounter = 0;
      this.level = 1;
      this.score = 0;
    }
  }
}

module.exports = Gameboard;
