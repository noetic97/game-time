var Frog = require('./Frog.js');

class Gameboard {
  constructor(x, y, width, height, fill) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.score = 0;
    this.level = 1;
    this.hiScore = 0;
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
}

  // keepScore() {
  //   if (Frog.y < 100) {
  //     this.score += 25;
  //     console.log(this.score);
  //   }
  //   return this.score;
  // }

module.exports = Gameboard;
