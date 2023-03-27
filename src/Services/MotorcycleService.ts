import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;
  constructor(motorcycleODM: MotorcycleODM = new MotorcycleODM()) {
    this.motorcycleODM = motorcycleODM;
  }
  public async createMotorcycle(motorcycleObj: IMotorcycle) {
    const createdMotorcycle = await this.motorcycleODM.create(motorcycleObj);
    const motorcycle = new Motorcycle(createdMotorcycle);
    return motorcycle;
  }
}

export default MotorcycleService;