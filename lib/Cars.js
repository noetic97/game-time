function Cars(x, y, width, height, vX) {
  this.x = x;
  this.y = y;
  this.height = width;
  this.width = height;
  this.vX = vX;
}

Cars.prototype.draw = function (ctx) {
  ctx.fillStyle = "rgba(0, 0, 0, 1)"
  ctx.fillRect(
    this.x,
    this.y,
    this.height,
    this.width
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



Cars.prototype.generateCarsArray = function() {
  var carsArray = [];
  var x = 100
  for (var i = 1; i < 13; i++) {
    switch (i === true) {
      case i > 3 :
        var carRow1 = new Cars(x, 650, 50, 50, -1)
        x += 200
        carsArray.push(carRow1);
        break
      case i > 6:

        var carRow2 = new Cars( x, 600, 50, 50, 2)
        x -= 200
        carsArray.push(carRow2)
        break
      case i > 9:
        x += 250
        var carRow3 = new Cars( x, 550, 50, 50, -3)
        carsArray.push(carRow3)
        break
      case i > 10:
        var carRow4 = new Cars( 400, 500, 50, 50, 4)
        carsArray.push(carRow4)
        break
      case i > 12:
        x -= 350
        var carRow5 = new Cars( x, 450, 100, 50, -2)
        carsArray.push(carRow5)
        break
    }
  }
  return carsArray
}






// var cars = new Cars(50, 50, 50, 50, -3)
//
//
// // console.log(cars)
//
// var carRows = {
//   row1: [],
//   row2: [],
//   row3: [],
//   row4: [],
//   row5: []
// };
//
// var carGroups = Object.keys(carRows);
//
// carGroups.forEach(function(key) {
//   for (var i = 0; i < 3; i++) {
//     var clone = Object.assign({}, cars);
//
//     carRows[key].push(clone);
//     console.log(carRows)
//   }
// });

// console.log(carRows);

module.exports = Cars;
