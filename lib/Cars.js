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
    this.width,
);
 console.log('draw')
};

Cars.prototype.resetPostition = function()  {
  if (this.x == -50) {
    this.x = 750;
  }
}


module.exports = Cars;
