import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CustomErrors from '../../../src/errors/customErrors';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycleInput,
  motorcycleOutput, motorcycleOutputArray } from './Mock/motorcycleMock.test';

describe('Testing motorcycle service', function () {
  const motorcycleNotFound = 'Motorcycle not found';
  const invalidId = 'Invalid mongo id';

  afterEach(Sinon.restore);
  it('Success finding motorcycle by id', async function () {
    Sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.findMotorcycleById(motorcycleOutput.id);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Trying with incorrect id', async function () {
    const invalidID = 'abc';
    const errorMessage = invalidId;
    const errorStatus = '422';

    Sinon.stub(Model, 'findById').throws(
      new CustomErrors(errorMessage, errorStatus),
    );
    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.findMotorcycleById(invalidID);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Trying with nonexistent id', async function () {
    const nonexistId = '6421df8e90daac0e2b5cd916';
    const errorMessage = motorcycleNotFound;
    const errorStatus = '404';
    Sinon.stub(Model, 'findById').resolves(null);
    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.findMotorcycleById(nonexistId);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Success finding all motorcycles', async function () {
    Sinon.stub(Model, 'find').resolves(motorcycleOutputArray);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.findMotorcycle();

    expect(result).to.be.deep.equal(motorcycleOutputArray);
  });

  it('Success creating new motorcycle', async function () {
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.createMotorcycle(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Success updating a Motorcycle by id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.updateMotorcycle(motorcycleOutput.id, motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('Trying update with incorrect id', async function () {
    const invalidID = 'abc';
    const errorMessage = invalidId;
    const errorStatus = '422';

    Sinon.stub(Model, 'findByIdAndUpdate').throws(
      new CustomErrors(errorMessage, errorStatus),
    );
    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.updateMotorcycle(invalidID, motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Trying update with nonexistent id', async function () {
    const nonexistId = '6421df8e90daac0e2b5cd916';
    const errorMessage = motorcycleNotFound;
    const errorStatus = '404';
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    try {
      const carService = new MotorcycleService();
      await carService.updateMotorcycle(nonexistId, motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });

  it('Success deleting motorcycle', async function () {
    const existId = '6421df8e90daac0e2b5cd916';
    Sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleOutput);
    const carService = new MotorcycleService();
    const result = await carService.deleteMotorcycle(existId);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Trying delete with nonexistent id', async function () {
    const nonexistId = '6421df8e90daac0e2b5cd916';
    const errorMessage = motorcycleNotFound;
    const errorStatus = '404';
    Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
    try {
      const carService = new MotorcycleService();
      await carService.deleteMotorcycle(nonexistId);
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
      const carService = new MotorcycleService();
      await carService.deleteMotorcycle(invalidID);
    } catch (error) {
      expect((error as Error).message).to.equal(errorMessage);
      expect((error as Error).stack).to.equal(errorStatus);
    }
  });
});
