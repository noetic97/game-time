function Frog(x, y, vX) {
  this.x = x;
  this.y = y;
  this.vX = vX;
  this.height = 45;
  this.width = 45;
  this.startLifes = 3;
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
  console.log('frog x: ', this.x, ' frogger y ', this.y);
}

Frog.prototype.logMove = function() {
  this.x += this.vX
}

Frog.prototype.resetFrog = function () {
  this.x = 350;
  this.y = 650;
}

Frog.prototype.collisionDetection = function (frogger, carsToDraw) {
  carsToDraw.forEach(function(car) {
    if (frogger.x < car.x + car.width &&
    frogger.x + frogger.width > car.x &&
    frogger.y < car.y + car.height  &&
    frogger.height + frogger.y > car.y) {

      frogger.startLifes--;
      frogger.resetFrog();
      alert('Ya Dead!');

    } else if (!frogger.startLifes) {
      frogger.startLifes = 3;
      alert('Game Over');
    }

  })
};


Frog.prototype.logCollisionDetection = function (frogger, logsToDraw) {
  logsToDraw.forEach(function(log)  {
      if (frogger.x < log.x + log.width &&
        frogger.x + frogger.width > log.x &&
        frogger.y < log.y + log.height  &&
        frogger.height + frogger.y > log.y) {
          console.log('if block');
          frogger.vX = log.vX;
          frogger.logMove();

        } else {
          
        }
    })
  }


    // switch (frogger.y > 250) {
    //   case (frogger.x < log.x + log.width &&
    //   frogger.x + frogger.width > log.x &&
    //   frogger.y < log.y + log.height  &&
    //   frogger.height + frogger.y > log.y):
    //     frogger.vX = log.vX;
    //     frogger.logMove();
    //     break;
    //   default:






module.exports =  Frog;
