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


// Frog.prototype.move = function (event) {
//   if (event.keyCode == 39 || event.keyCode == 68) {
//     this.x += 50;
//   } else if (event.keyCode == 37 || event.keyCode == 65) {
//     this.x -= 50;
//   } else if (event.keyCode == 38 || event.keyCode == 87) {
//     this.y -= 50;
//   } else if (event.keyCode == 40 || event.keyCode == 83) {
//     this.y += 50;
//   }
// };

// I had it hard coded before in the places it uses canvas.width and canvas.height but since our frog piece is 48px and our measurements rely on grids of 50 I had to add two or it would go out of the frame.

Frog.prototype.move = function(event, canvas) {
  switch (event.keyCode) {
  case (this.x < canvas.width - (this.width + 2)) && (39 || 68):
    this.x += 50;
    break;
  case this.x > 0 && (37 || 65):
    this.x -= 50;
    break
  case this.y > 1 && (38 || 87):
    this.y -= 50;
    break
  case this.y < canvas.height - (this.width + 2) && (40 || 83):
    this.y += 50;
    break
  default:
  }
}

module.exports = Frog;
