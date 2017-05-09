class Gameboard {
  constructor(x, y, width, height, fill) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
  }
}

// function Gameboard(x, y, width, height, fill) {
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.fill = fill;
// }

// Gameboard.prototype.drawBoard = function (ctx) {
//   drawBackGround(ctx)
//   drawWater(ctx);
//   drawRoad(ctx);
// };
//
// function drawWater(ctx) {
//   ctxfillStyle = 'lightblue';
//   ctx.fillRect(0, 50, 700, 300)
// }
// function drawRoad(ctx) {
//   ctxfillStyle = 'red';
//   ctx.fillRect(0, 400, 700, 300)
//
//   function drawBackGround(ctx) {
//     ctxfillStyle = 'black';
//     ctx.fillRect(0, 0, 700, 750)
//   }
// }
// module.exports = Gameboard
