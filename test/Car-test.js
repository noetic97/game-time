const Cars = require('../lib/Cars.js');
const expect = require('chai').expect;

describe(' testing Car', () => {
  const cars = new Cars(10, 5, 100, 100, -4)

  it('should instantiate a new Car', () => {
    expect(cars).to.be.an.instanceof(Cars)
  })

  it('should reset the x position of the car when x is below or equal to -50 or above or equal to 850', () => {
    if (this.x <= -50) {
      expect(cars.resetPostition()).to.equal(this.x = 850)
    } else if (this.x >= 850) {
      expect(cars.resetPostition()).to.equal(this.x = -50)
    }
  })

  it('should increase the velocity by adding a positive or negative value to the x position', () => {
    expect(cars.moveCars()).to.increase(cars.x, -4)
  })


})
