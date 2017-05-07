function Dock(x, y) {
  this.x = x;
  this.y = y;
  this.width = 75;
  this.height = 50;
}

Dock.prototype.drawDock = function (ctx) {
  ctx.fillStyle = "rgba(0, 255, 0, 1)"
  ctx.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  )
};

module.exports = Dock;
