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
    //   450,
    //   this.width,
    //   this.height
    // )
    // ctx.drawImage(carImage,
    //   this.x,
    //   500,
    //   this.width,
    //   this.height
    // )
    // ctx.drawImage(carImage2,
    //   this.x,
    //   550,
    //   this.width,
    //   this.height
    // )
    // ctx.drawImage(carImage,
    //   this.x,
    //   600,
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
    var carsArray = [];
    var x = 100;

    for (var i = 1; i < 13; i++) {
      switch (i === true) {
      case i > 3 :
        var carRow1 = new Cars(x, 600, 50, 35, -1)

        x += 200
        carsArray.push(carRow1);
        break
      case i > 6:
        var carRow2 = new Cars( x, 550, 50, 35, 2)

        x -= 200
        carsArray.push(carRow2)
        break
      case i > 9:
        var carRow3 = new Cars( x, 500, 50, 35, -2)

        x += 250
        carsArray.push(carRow3)
        break
      case i > 10:
        var carRow4 = new Cars( x, 450, 50, 35, 3)

        carsArray.push(carRow4)
        break
      case i > 12:
        var carRow5 = new Cars( x, 400, 90, 40, -2)

        x -= 350
        carsArray.push(carRow5)
        break
      }
    }
    return carsArray
  }
}

// var carImage;
// var carImage2;
//
// loadResources();
//
// function loadResources() {
//   carImage = new Image();
//   carImage.src = "lib/images/batmobile-left.png";
//   carImage2 = new Image();
//   carImage2.src = "lib/images/car-left.png";
// }

// function Cars(x, y, width, height, vX) {
//   this.x = x;
//   this.y = y;
//   this.height = height;
//   this.width = width;
//   this.vX = vX;
// }
//
//
// Cars.prototype.draw = function (ctx) {
//   ctx.drawImage(carImage,
//     this.x,
//     this.y,
//     this.width,
//     this.height
//   );
//   ctx.drawImage(carImage2,
//     this.x,
//     this.y,
//     this.width,
//     this.height
//   );
// };
//
// Cars.prototype.resetPostition = function()  {
//   if (this.x <= -50) {
//     this.x = 850;
//   } else if (this.x >= 850) {
//     this.x = -50;
//   }
// }
//
// Cars.prototype.moveCars = function() {
//   this.x += this.vX;
// }

module.exports = Cars;
