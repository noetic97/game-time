var Frog = require('./Frog.js');

class Gameboard {
  constructor(x, y, width, height, fill) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.score = 100;
    this.level = 1;
    this.hiScore = 0;
    this.levelCounter = 0;
  }

  drawboard(ctx) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 700, 50)
    ctx.fillStyle = 'brown'
    ctx.fillRect(0, 50, 700, 100)
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 100, 700, 250)
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
    ctx.fillText(numLives + ' Lives', 25, 730);
  }

  drawScore(ctx) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + this.score, 25, 30);
  }

  keepScore(gamePiece) {
    if (gamePiece.y < 100) {
      this.score += 25;
      console.log(this.score);
    }
    return this.score;
  }

  drawLevel(ctx) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText('Level: ' + this.level, 550, 730);
  }

  drawHiScore(ctx) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white'
    ctx.fillText('Hi-Score: ' + this.hiScore, 450, 30);
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
    }
  }

  levelDownHelper(obstacle) {
    obstacle.vX < 0 ? obstacle.vX+ this.levelCounter : obstacle.vX - this.levelCounter
  }

  levelDown(gamePiece, obstacleArray, obstacleArray2) {
    if (gamePiece.startLifes === 0) {
      // console.log('1 before', obstacleArray);
      // console.log('2 before', obstacleArray2);

      obstacleArray.forEach( (obstacle) => {
        obstacle.vX < 0 ? obstacle.vX++ : obstacle.vX--
      })
      obstacleArray2.forEach( (obstacle) => {
        obstacle.vX < 0 ? obstacle.vX++ : obstacle.vX--
      })
      // console.log('1 after', obstacleArray);
      // console.log('2 after', obstacleArray2);
      this.levelCounter = 0;
      this.level = 1

    }
  }


}


module.exports = Gameboard;
