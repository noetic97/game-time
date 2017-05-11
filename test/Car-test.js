const Cars = require('../lib/Cars.js');
const expect = require('chai').expect;

describe(' testing Car', () => {
  const cars = new Cars(10, 5, 100, 100, -4)

  it('should instantiate a new Car', () => {
    expect(cars).to.be.an.instanceof(Cars);
  })

  it('should reset the x position of the car when x is below or equal to -50 or above or equal to 850', () => {
    let car1 = new Cars(-50, 100);
    let car2 = new Cars(850, 100);

    expect(car1.x).to.equal(-50);
    expect(car2.x).to.equal(850);
    car1.resetPosition()
    car2.resetPosition()
    expect(car1.x).to.equal(850);
    expect(car2.x).to.equal(-50);
  })

  it('the cars should move', () => {
    expect(cars.x).to.equal(10);
    cars.moveCars();
    expect(cars.x).to.equal(6);
  })

  it('should create an array of 12 cars', () => {
    let carsArray = cars.generateCarsArray();

    expect(carsArray.length).to.equal(12);
  })

})
