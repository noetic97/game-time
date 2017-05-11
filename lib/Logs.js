class Logs {
  constructor(x, y, width, height, vX, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vX = vX;
  }

  draw (ctx) {
    const logImage = new Image();

    logImage.src = "lib/images/log.png";
    ctx.drawImage(logImage,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  resetPosition () {
    if (this.x <= -150) {
      this.x = 850;
    } else if (this.x >= 850) {
      this.x = -150;
    }
  }

  moveLogs () {
    this.x += this.vX;
  }

  generateLogsArray() {
    const logsArray = [];
    let x = 100;

    for (let i = 1; i < 13; i++) {
      switch (i === true) {
      case i > 3 : {
        const logRow1 = new Logs(x, 300, 100, 50, -3)

        x += 200
        logsArray.push(logRow1);
        break
      }
      case i > 6: {
        const logRow2 = new Logs( x, 250, 150, 50, 2)

        x -= 200
        logsArray.push(logRow2)
        break
      }
      case i > 9: {
        const logRow3 = new Logs( x, 200, 100, 50, -2)

        x += 250
        logsArray.push(logRow3)
        break
      }
      case i > 10: {
        const logRow4 = new Logs( x, 150, 150, 50, 3)

        logsArray.push(logRow4)
        break
      }
      case i > 12: {
        const logRow5 = new Logs( x, 100, 90, 50, -2)

        x -= 350
        logsArray.push(logRow5)
        break
      }
      }
    }
    return logsArray
  }
}

module.exports = Logs;
