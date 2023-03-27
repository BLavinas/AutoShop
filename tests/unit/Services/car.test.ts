import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CustomErrors from '../../../src/errors/customErrors';
// import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import { carInput, carOutput, carOutputArray } from './Mock/carMock.test';

describe('Finding car by id', function () {
  afterEach(Sinon.restore);
  it('Success finding car by id', async function () {
    Sinon.stub(Model, 'findById').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.findCarById(carOutput.id);

    expect(result).to.be.deep.equal(carOutput);
  });
  it('Trying with incorrect id', async function () {
    const carService = new CarService();
    Sinon.stub(Model, 'findById').throws(new CustomErrors('Invalid mongo id', '422'));
    expect(await carService.findCarById('1')).to.throw(CustomErrors, 'Invalid mongo id');
  });

  describe('Finding car', function () {
    it('Success finding all cars', async function () {
      Sinon.stub(Model, 'find').resolves(carOutputArray);

      const carService = new CarService();
      const result = await carService.findCars();

      expect(result).to.be.deep.equal(carOutputArray);
    });
  });

  describe('Creating new car', function () {
    it('Success creating new car', async function () {
      Sinon.stub(Model, 'create').resolves(carOutput);

      const carService = new CarService();
      const result = await carService.createCar(carInput);

      expect(result).to.be.deep.equal(carOutput);
    });
  });
});