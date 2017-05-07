function Frogking(x, y, width, height) {
  this.x;
  this.y;
  this.width;
  this.height;
}

var frogKingImage;

loadResources();

function loadResources() {
  frogKingImage = new Image();
  frogKingImage.src = "lib/images/frog-king.png"
}

function frogInDock(frogger, docksToDraw) {
  for (var i = 0; i < docksToDraw.length; i++) {
    if (frogger.x < docksToDraw[i].x + docksToDraw[i].width && //
      frogger.x + frogger.width > docksToDraw[i].x &&
      frogger.y < docksToDraw[i].y + docksToDraw[i].height  &&
      frogger.height + frogger.y > docksToDraw[i].y) {
      return true;
    }
  }
}

var kingFrogArray = [];

Frogking.prototype.generateKingFrogArray = function (frogger, docksToDraw, kingFrogFlag) {
  if (frogInDock(frogger, docksToDraw) && kingFrogFlag === true) {
    var kingFrog = new Frogking(frogger.x, frogger.y, frogger.width, frogger.height);
    console.log('Hi');
    kingFrogArray.push(kingFrog);
    kingFrogFlag = false;
    return;
  }
  return kingFrogArray
};

Frogking.prototype.drawKing = function (ctx) {
  ctx.drawImage(frogKingImage,
    this.x,
    this.y,
    this.width,
    this.height
  )
};

module.exports = Frogking;
