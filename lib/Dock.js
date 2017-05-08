function Dock(x, y) {
  this.x = x;
  this.y = y;
  this.width = 75;
  this.height = 50;
}

var dockImage;

loadResources();

function loadResources() {
  dockImage = new Image();
  dockImage.src = "lib/images/lilypad.png";
}

Dock.prototype.drawDock = function (ctx) {
  ctx.drawImage(dockImage,
    this.x,
    this.y,
    this.width = 75,
    this.height = 50
  )
};

module.exports = Dock;
