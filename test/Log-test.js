const Logs = require('../lib/Logs.js');
const expect = require('chai').expect;


describe('Testing Log', () => {

  const log = new Logs(5, 10, 20, 30, 1)

  it('should instantiate new log', () => {
    expect(log).to.be.an.instanceof(Logs)
  })

  it('should have an x value of 5', () => {
    expect(log.x).to.equal(5)
  })

  it('should draw something', () => {
    expect(log).to.respondTo('draw')
  })

  it('should reset the x position if off screen', () => {
    const log2 = new Logs(900);
    const log3 = new Logs(-200);

    log2.resetPosition();
    expect(log2.x).to.equal(-150);
    log3.resetPosition();
    expect(log3.x).to.equal(850);
  })

  it('should move the log', () => {
    log.moveLogs()
    expect(log.x).to.equal(6)
  })
})
