class Cars {
  constructor(x, y, width, height, vX) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.vX = vX;
  }

  draw(ctx) {
    ctx.drawImage(carImage,
      this.x,
      this.y,
      this.width,
      this.height
    )
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
}

var carImage;
var carImage2;

loadResources();

function loadResources() {
  carImage = new Image();
  carImage.src = "lib/images/batmobile-left.png";
  carImage2 = new Image();
  carImage2.src = "lib/images/car-left.png";
}

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
