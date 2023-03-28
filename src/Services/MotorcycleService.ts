import Motorcycle from '../Domains/Motorcycle';
import CustomErrors from '../errors/customErrors';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;
  private invalidId: string;
  private invalidMotorcycle: string;

  constructor(motorcycleODM: MotorcycleODM = new MotorcycleODM()) {
    this.motorcycleODM = motorcycleODM;
    this.invalidId = 'Invalid mongo id';
    this.invalidMotorcycle = 'Motorcycle not found';
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
      throw new CustomErrors(this.invalidId, '422');
    }
    if (!getMotorcycleById) {
      throw new CustomErrors(this.invalidMotorcycle, '404');
    }
    const motorcycleById = new Motorcycle(getMotorcycleById);
    return motorcycleById;
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    let updatedMotorcycle;

    try {
      updatedMotorcycle = await this.motorcycleODM.update(id, motorcycle);
    } catch (error) {
      throw new CustomErrors(this.invalidId, '422');
    }

    if (!updatedMotorcycle) {
      throw new CustomErrors(this.invalidMotorcycle, '404');
    }

    const returnedMotorcycle = new Motorcycle(updatedMotorcycle);
    return returnedMotorcycle;
  }

  public async deleteMotorcycle(id: string) {
    let deletedMotorcycle;

    try {
      deletedMotorcycle = await this.motorcycleODM.delete(id);
    } catch (error) {
      throw new CustomErrors(this.invalidId, '422');
    }
    if (!deletedMotorcycle) {
      throw new CustomErrors(this.invalidMotorcycle, '404');
    }

    const returnedMotorcycle = new Motorcycle(deletedMotorcycle);
    return returnedMotorcycle;
  }
}

export default MotorcycleService;