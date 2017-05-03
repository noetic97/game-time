function Cars(x, y, width, height, vX) {
  this.x = x;
  this.y = y;
  this.height = width;
  this.width = height;
  this.vX = vX;
  // array.push(Car)
}

Cars.prototype.draw = function (ctx) {
  ctx.fillStyle = "rgba(0, 0, 0, 1)"
  ctx.fillRect(
    this.x += this.vX,
    this.y,
    this.height,
    this.width
  );
};

Cars.prototype.resetPostition = function()  {
  if (this.x == -50) {
    this.x = 750;
  }
}

var cars = new Cars(50, 50, 50, 50, -3)


// console.log(cars)

var carRows = {
  row1: [],
  row2: [],
  row3: [],
  row4: [],
  row5: []
};

var carGroups = Object.keys(carRows);

carGroups.forEach(function(key) {
  for (var i = 0; i < 3; i++) {
    var clone = Object.assign({}, cars);

    carRows[key].push(clone);
    console.log(carRows)
  }
});

// console.log(carRows);

module.exports = Cars;
