function Frog(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.height = 50;
  this.width = 50;
}

Frog.prototype.draw = function (ctx) {
  ctx.fillStyle = "rgba(0, 255, 0, 1)"
  ctx.fillRect(
    this.x,
    this.y,
    this.height,
    this.width
   );
};


Frog.prototype.move = function (event) {
  if (event.keyCode == 39 || event.keyCode == 68) {
    this.x += 50;
  } else if (event.keyCode == 37 || event.keyCode == 65) {
    this.x -= 50;
  } else if (event.keyCode == 38 || event.keyCode == 87) {
    this.y -= 50;
  } else if (event.keyCode == 40 || event.keyCode == 83) {
    this.y += 50;
  }
};

module.exports = Frog;
