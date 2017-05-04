function Cars(x, y, width, height, vX) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.vX = vX;
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

Cars.prototype.draw = function (ctx) {
  // ctx.fillStyle = "rgba(0, 0, 0, 1)"
  // ctx.fillRect(
  ctx.drawImage(carImage,
    this.x,
    this.y,
    this.width,
    this.height
  );
  ctx.drawImage(carImage2,
    this.x,
    this.y,
    this.width,
    this.height
  );
};


Cars.prototype.resetPostition = function()  {
  if (this.x <= -50) {
    this.x = 850;
  } else if (this.x >= 850) {
    this.x = -50;
  }
}

Cars.prototype.moveCars = function() {
  this.x += this.vX;
}



// Cars.prototype.generateCarsArray = function() {
//   var carsArray = [];
//   var x = 100;
//
//   for (var i = 1; i < 13; i++) {
//     switch (i === true) {
//     case i > 3 :
//       var carRow1 = new Cars(x, 650, 50, 50, -1)
//
//       x += 200
//       carsArray.push(carRow1);
//       break
//     case i > 6:
//       var carRow2 = new Cars( x, 600, 50, 50, 2)
//
//       x -= 200
//       carsArray.push(carRow2)
//       break
//     case i > 9:
//       x += 250
//       var carRow3 = new Cars( x, 550, 50, 50, -3)
//
//       carsArray.push(carRow3)
//       break
//     case i > 10:
//       var carRow4 = new Cars( 400, 500, 50, 50, 4)
//
//       carsArray.push(carRow4)
//       break
//     case i > 12:
//       x -= 350
//       var carRow5 = new Cars( x, 450, 100, 50, -2)
//
//       carsArray.push(carRow5)
//       break
//     }
//   }
//   return carsArray
// }

module.exports = Cars;
