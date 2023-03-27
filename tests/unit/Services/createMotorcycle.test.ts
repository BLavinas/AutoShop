import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycleInput, motorcycleOutput } from './Mock/motorcycleMock.test';

describe('Creating new motorcycle', function () {
  it('Success creating new motorcycle', async function () {
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.createMotorcycle(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });
});
