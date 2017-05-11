class Dock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
  }

  draw(ctx) {
    const dockImage = new Image();

    dockImage.src = "lib/images/lilypad.png";
    ctx.drawImage(dockImage,
      this.x,
      this.y,
      this.width = 75,
      this.height = 50
    )
  }

  generateDock() {
    const dockArray = [];
    let x = 50;

    for (let i = 0; i < 5; i++) {
      const newDock = new Dock(x, 50);

      dockArray.push(newDock);
      x += (75 + newDock.height);
    }
    return dockArray;
  }
}

module.exports = Dock;
