class Dock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
  }

  drawDock (ctx) {
    ctx.drawImage(dockImage,
      this.x,
      this.y,
      this.width = 75,
      this.height = 50
    )
  }
}

var dockImage;

loadResources();

function loadResources() {
  dockImage = new Image();
  dockImage.src = "lib/images/lilypad.png";
}

// function Dock(x, y) {
//   this.x = x;
//   this.y = y;
//   this.width = 80;
//   this.height = 50;
// }
//
// Dock.prototype.drawDock = function (ctx) {
//   ctx.drawImage(dockImage,
//     this.x,
//     this.y,
//     this.width = 75,
//     this.height = 50
//   )
// };

module.exports = Dock;
