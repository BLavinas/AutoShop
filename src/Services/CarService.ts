import Car from '../Domains/Car';
// import CustomErrors from '../errors/customErrors';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM: CarODM;
  constructor(carODM: CarODM = new CarODM()) {
    this.carODM = carODM;
  }
  public async createCar(car: ICar): Promise<Car> {
    const createdCar = await this.carODM.create(car);
    const returnCar = new Car(createdCar);
    return returnCar;
  }

  public async findCars(): Promise<Car[]> {
    const getAllCars = await this.carODM.find();
    const allCars = getAllCars.map((car) => new Car(car));
    return allCars;
  }

  public async findCarById(id: string): Promise<Car | null | object> {
    const getCarById = await this.carODM.findById(id);
    if (!getCarById) return getCarById;
    const carById = new Car(getCarById);
    return carById;
  }
}

export default CarService;