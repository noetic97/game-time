const Frog = require('../lib/Frog.js');
const expect = require('chai').expect;

describe(' testing Frog', () => {

  it('should create a new frog', () => {
     const frogger = new Frog(10, 5)
    expect(frogger).to.be.an.instanceof(Frog)
  })

  it('should ')
})
