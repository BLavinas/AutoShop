import Motorcycle from '../Domains/Motorcycle';
import CustomErrors from '../errors/customErrors';
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
  public async findMotorcycle(): Promise<Motorcycle[]> {
    const getAllMotorcycle = await this.motorcycleODM.find();
    const allMotorcycles = getAllMotorcycle.map((motorcycle) => new Motorcycle(motorcycle));
    return allMotorcycles;
  }

  public async findMotorcycleById(id: string): Promise<Motorcycle | null | object> {
    let getMotorcycleById;

    try {
      getMotorcycleById = await this.motorcycleODM.findById(id);
    } catch (error) {
      throw new CustomErrors('Invalid mongo id', '422');
    }
    if (!getMotorcycleById) {
      throw new CustomErrors('Motorcycle not found', '404');
    }
    const motorcycleById = new Motorcycle(getMotorcycleById);
    return motorcycleById;
  }
}

export default MotorcycleService;