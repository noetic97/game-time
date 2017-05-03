function Frog(x, y) {
  this.x = x;
  this.y = y;
  this.height = 48;
  this.width = 48;
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

Frog.prototype.move = function(event, canvas) {
  switch (event.keyCode) {
  case this.x < canvas.width - 50 && (39 || 68):
    this.x += 50;
    break;
  case this.x > 0 && (37 || 65):
    this.x -= 50;
    break
  case this.y > 1 && (38 || 87):
    this.y -= 50;
    break
  case this.y < canvas.height - 50 && (40 || 83):
    this.y += 50;
    break
  default:
  }
}

Frog.prototype.collisionDetection = function (frogger, cars) {
  if (frogger.x < cars0.x + cars0.width &&
   frogger.x + frogger.width > cars0.x &&
   frogger.y < cars0.y + cars0.height &&
   frogger.height + frogger.y > cars0.y) {
     console.log('collision')
  }
};

module.exports = Frog;
