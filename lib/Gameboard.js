function Gameboard(x, y, width, height, fill) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fill = fill;
}

Gameboard.prototype.drawBoard = function (ctx) {
  ctx.fillStyle = this.fill;
  ctx.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  )
};

module.exports = Gameboard
