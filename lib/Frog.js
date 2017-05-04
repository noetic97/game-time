function Frog(x, y) {
  this.x = x;
  this.y = y;
  this.height = 45;
  this.width = 45;
}

var frogImage;

loadResources();

function loadResources() {
  frogImage = new Image();
  frogImage.src = "lib/images/frog.png";
}

Frog.prototype.draw = function (ctx) {
  // ctx.fillStyle = "rgba(0, 255, 0, 1)"
  // ctx.fillRect(
  ctx.drawImage(frogImage,
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
  case this.y > 51 && (38 || 87):
    this.y -= 50;
    break
  case this.y < canvas.height - 100 && (40 || 83):
    this.y += 50;
    break
  default:
  }
}

Frog.prototype.collisionDetection = function (frogger, carsToDraw) {
  carsToDraw.forEach(function(car) {
    if (frogger.x < car.x + car.width &&
      frogger.x + frogger.width > car.x &&
      frogger.y < car.y + car.height  &&
      frogger.height + frogger.y > car.y) {
      console.log('collision');
    }
  })
};

module.exports =  Frog;
