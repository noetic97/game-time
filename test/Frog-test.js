const Frog = require('../lib/Frog.js');
const expect = require('chai').expect;

describe(' testing Frog', () => {
  const frogger = new Frog(150, 150)
  const canvas = {
    width: 700,
    height: 750
  }

  const obstacle = {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    vX: 5
  }

  const obstacleArray = [ obstacle ]

  it('Should create a new frog', () => {
    expect(frogger).to.be.an.instanceof(Frog)
  })

  it(' Draw should be a function', () => {
    expect(frogger).to.respondTo('draw')
  })

  it('should move right on right arrow keypress', () => {
    frogger.move({ keyCode: 39}, canvas)
    expect(frogger.x).to.equal(200);
  })

  it('should move left on left arrow keypress', () => {
    frogger.move({keyCode: 37}, canvas)
    expect(frogger.x).to.equal(150);
  })

  it('should move down on down arrow keypress', () => {
    frogger.move({keyCode: 40}, canvas)
    expect(frogger.y).to.equal(200);
  })

  it('should move up on up arrow keypress', () => {
    frogger.move({keyCode: 38}, canvas)
    expect(frogger.y).to.equal(150);
  })

  it('should not move up on up arrow keypress if y position is less than 100', () => {
    const frogger = new Frog(0, 99)

    frogger.move({keyCode: 38}, canvas)
    expect(frogger.y).to.equal(99);
  })

  it('should move frog to game start position', () => {
    frogger.resetFrog();
    expect(frogger.x).to.equal(350)
    expect(frogger.y).to.equal(650)
  })

  it('should add a life when the score reaches multiples of 300 and frog.y is less than 50', () => {
    let gameboard = { score: 300 };
    const frogger = new Frog(0, 50)

    frogger.extraLife(gameboard)
    expect(frogger.startLifes).to.equal(4);
    gameboard.score = 600;
    frogger.extraLife(gameboard)
    expect(frogger.startLifes).to.equal(5);
  })

  it('should return true when game piece overlaps with object', () => {
    const frogger = new Frog(100, 100);
    const frogger1 = new Frog(650, 650);

    expect(frogger.collisionHelper(obstacleArray)).to.be.true
    expect(frogger1.collisionHelper(obstacleArray)).to.not.be.true
  })

  it('should lose a life when hit by a car', () => {
    const frogger = new Frog(100, 100);

    expect(frogger.startLifes).to.equal(3);
    frogger.frogHitByCar(obstacleArray);
    expect(frogger.startLifes).to.equal(2);
  })

  it('frog should change its velocity to match the log it lands on', () => {
    const frogger = new Frog(100, 100);

    expect(frogger.vX).to.equal(0);
    frogger.logCollisionDetection(obstacleArray);
    expect(frogger.vX).to.equal(5);
  })

  it('frog should lose a life if it lands in the water', () => {
    const frogger = new Frog(250, 250);

    expect(frogger.startLifes).to.equal(3);
    frogger.logCollisionDetection(obstacleArray);
    expect(frogger.startLifes).to.equal(2);
  })

  it('game should end when frog has 0 livesand then reset the lives to 3', () => {
    const frogger = new Frog(100, 100);

    expect(frogger.startLifes).to.equal(3);
    frogger.startLifes--;
    frogger.gameOverCheck();
    expect(frogger.startLifes).to.equal(2);
    frogger.startLifes--;
    frogger.gameOverCheck();
    expect(frogger.startLifes).to.equal(1);
    frogger.startLifes--;
    expect(frogger.startLifes).to.equal(0);
    expect(frogger).to.respondTo('gameOverCheck')
    frogger.gameOverCheck();
    expect(frogger.startLifes).to.equal(3);
  })
})
