var frogger = require('./Frog.js');




function Dock(x, y) {
  this.x = x;
  this.y = y;
  this.width = 75;
  this.height = 50;
}

// var frogKingImage;
//
// loadResources();
//
// function loadResources() {
//   frogKingImage = new Image();
//   frogKingImage.src = "lib/images/frog-king.png"
// }

// function frogInDock(frogger, docksToDraw) {
//   for (var i = 0; i < docksToDraw.length; i++) {
//     if (frogger.x < docksToDraw[i].x + docksToDraw[i].width && //
//       frogger.x + frogger.width > docksToDraw[i].x &&
//       frogger.y < docksToDraw[i].y + docksToDraw[i].height  &&
//       frogger.height + frogger.y > docksToDraw[i].y) {
//       return true;
//     }
//   }
// }

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
