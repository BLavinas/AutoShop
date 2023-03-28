import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CustomErrors from '../../../src/errors/customErrors';
// import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import { carInput, carOutput, carOutputArray } from './Mock/carMock.test';

describe('Testing car service', function () {
  const carNotFound = 'Car not found';
  const invalidId = 'Invalid mongo id';
  afterEach(Sinon.restore);
  it('Success finding car by id', async function () {
    Sinon.stub(Model, 'findById').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.findCarById(carOutput.id);

    expect(result).to.be.deep.equal(carOutput);
  });
  it('Trying with incorrect id', async function () {
    const invalidID = 'abc';
    const errorMessage = invalidId;
    const errorStatus = '422';

    Sinon.stub(Model, 'findById').throws(new CustomErrors(errorMessage, errorStatus));
    try {
      const carService = new CarService();
      await carService.findCarById(invalidID);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Trying with nonexistent id', async function () {
    const nonexistId = '6421df8e90daac0e2b5cd916';
    const errorMessage = carNotFound;
    const errorStatus = '404';
    Sinon.stub(Model, 'findById').resolves(null);
    try {
      const carService = new CarService();
      await carService.findCarById(nonexistId);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Success finding all cars', async function () {
    Sinon.stub(Model, 'find').resolves(carOutputArray);

    const carService = new CarService();
    const result = await carService.findCars();

    expect(result).to.be.deep.equal(carOutputArray);
  });

  it('Success creating new car', async function () {
    Sinon.stub(Model, 'create').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.createCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });
  it('Success updating a car by id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.updateCar(carOutput.id, carInput);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Trying update with incorrect id', async function () {
    const invalidID = 'abc';
    const errorMessage = invalidId;
    const errorStatus = '422';

    Sinon.stub(Model, 'findByIdAndUpdate').throws(
      new CustomErrors(errorMessage, errorStatus),
    );
    try {
      const carService = new CarService();
      await carService.updateCar(invalidID, carInput);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Trying update with nonexistent id', async function () {
    const nonexistId = '6421df8e90daac0e2b5cd916';
    const errorMessage = carNotFound;
    const errorStatus = '404';
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      const carService = new CarService();
      await carService.updateCar(nonexistId, carInput);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Success deleting car', async function () {
    const existId = '6421df8e90daac0e2b5cd916';
    Sinon.stub(Model, 'findByIdAndDelete').resolves(carOutput);
    const carService = new CarService();
    const result = await carService.deleteCar(existId);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Trying delete with nonexistent id', async function () {
    const nonexistId = '6421df8e90daac0e2b5cd916';
    const errorMessage = carNotFound;
    const errorStatus = '404';
    Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
    try {
      const carService = new CarService();
      await carService.deleteCar(nonexistId);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Trying delete with incorrect id', async function () {
    const invalidID = 'abc';
    const errorMessage = invalidId;
    const errorStatus = '422';

    Sinon.stub(Model, 'findByIdAndDelete').throws(
      new CustomErrors(errorMessage, errorStatus),
    );
    try {
      const carService = new CarService();
      await carService.deleteCar(invalidID);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });
});
