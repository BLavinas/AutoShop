import IMotorcycle, { MotorcycleCategory } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: MotorcycleCategory;
  private engineCapacity: number;
  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}

export default Motorcycle;