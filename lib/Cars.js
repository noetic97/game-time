class Cars {
  constructor(x, y, width, height, vX) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.vX = vX;
  }

  draw(ctx) {
    let carImage = new Image();
    let carImage2 = new Image();

    carImage.src = "lib/images/car-left.png";
    carImage2.src = "lib/images/batmobile-left.png";
    ctx.drawImage(carImage,
      this.x,
      this.y,
      this.width,
      this.height
    )
    // ctx.drawImage(carImage2,
    //   this.x,
    //   this.y = 450,
    //   this.width,
    //   this.height
    // )
    // ctx.drawImage(carImage,
    //   this.x,
    //   this.y = 500,
    //   this.width,
    //   this.height
    // )
    // ctx.drawImage(carImage2,
    //   this.x,
    //   this.y = 550,
    //   this.width,
    //   this.height
    // )
    // ctx.drawImage(carImage,
    //   this.x,
    //   this.y = 600,
    //   this.width,
    //   this.height
    // )
  }

  resetPostition() {
    if (this.x <= -50) {
      this.x = 850;
    } else if (this.x >= 850) {
      this.x = -50;
    }
  }

  moveCars() {
    this.x += this.vX;
  }

  generateCarsArray() {
    const carsArray = [];
    let x = 100;

    for (let i = 1; i < 13; i++) {
      switch (i === true) {
      case i > 3 : {
        const carRow1 = new Cars(x, 600, 50, 35, -1);

        x += 200;
        carsArray.push(carRow1);
        break;
      }
      case i > 6: {
        const carRow2 = new Cars( x, 550, 50, 35, 2);

        x -= 200
        carsArray.push(carRow2);
        break;
      }
      case i > 9: {
        const carRow3 = new Cars( x, 500, 50, 35, -2)

        x += 250
        carsArray.push(carRow3)
        break;
      }
      case i > 10: {
        const carRow4 = new Cars( x, 450, 50, 35, 3)

        carsArray.push(carRow4)
        break;
      }
      case i > 12: {
        const carRow5 = new Cars( x, 400, 90, 40, -2)

        x -= 350
        carsArray.push(carRow5)
        break;
      }
      }
    }
    return carsArray
  }
}

module.exports = Cars;
