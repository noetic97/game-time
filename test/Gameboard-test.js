const Gameboard = require('../lib/Gameboard.js');
const expect = require('chai').expect;

describe(' testing Gameboard', () => {
  const gameboard = new Gameboard(0, 0, 700, 750);

  const gamePiece = {
    x: 350,
    y: 100,
    width: 45,
    height: 45
  }

  let obstacle = {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    vX: 1
  }

  const obstacleArray = [ obstacle ]

  const obstacleArray2 = [ obstacle ]

  it('should instantiate a new Gameboard', () => {
    expect(gameboard).to.be.an.instanceof(Gameboard);
  })

  it('should start with a score of 0', () => {
    expect(gameboard.score).to.equal(0);
  })

  it('should start with a level of 1', () => {
    expect(gameboard.level).to.equal(1);
  })

  it('Draw should be a function', () => {
    expect(gameboard).to.respondTo('draw')
  })

  it('should increase the score by 25 each time the frog lands in the dock', () => {
    expect(gamePiece.y).to.equal(100);
    gameboard.keepScore(gamePiece);
    expect(gameboard.score).to.equal(0);
    gamePiece.y -= 50;
    gameboard.keepScore(gamePiece);
    expect(gameboard.score).to.equal(25);
  })

  it('should level up when the score is a multiple of 125', () => {
    const gameboard = new Gameboard(0, 0, 700, 750);

    expect(gameboard.score).to.equal(0);
    expect(gameboard.level).to.equal(1);
    gameboard.score += 125;
    gameboard.levelUp(gamePiece, obstacleArray, obstacleArray2);
    expect(gameboard.score).to.equal(125);
    expect(gameboard.level).to.equal(2);
    gameboard.score += 125;
    gameboard.levelUp(gamePiece, obstacleArray, obstacleArray2);
    expect(gameboard.score).to.equal(250);
    expect(gameboard.level).to.equal(3);
  })

  it('should increase the difficulty by increasing the speed of the cars and logs when the level increases', () => {
    const gameboard = new Gameboard(0, 0, 700, 750);

    expect(gameboard.score).to.equal(0);
    expect(gameboard.level).to.equal(1);
    expect(obstacle.vX).to.equal(5);
    gameboard.score += 125;
    gameboard.levelUp(gamePiece, obstacleArray, obstacleArray2);
    expect(gameboard.score).to.equal(125);
    expect(gameboard.level).to.equal(2);
    expect(obstacle.vX).to.equal(7);
    gameboard.score += 125;
    gameboard.levelUp(gamePiece, obstacleArray, obstacleArray2);
    expect(gameboard.score).to.equal(250);
    expect(gameboard.level).to.equal(3);
    expect(obstacle.vX).to.equal(9);
  })
})
