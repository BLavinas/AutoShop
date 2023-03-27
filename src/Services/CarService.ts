import Car from '../Domains/Car';
import CustomErrors from '../errors/customErrors';
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
    let getCarById;

    try {
      getCarById = await this.carODM.findById(id);
    } catch (error) {
      throw new CustomErrors('Invalid mongo id', '422');
    }

    if (!getCarById) {
      throw new CustomErrors('Car not found', '404');
    }

    const carById = new Car(getCarById);
    return carById;
  }

  public async updateCar(id: string, car: ICar): Promise<Car | null> {
    let updatedCar;

    try {
      updatedCar = await this.carODM.update(id, car);
    } catch (error) {
      throw new CustomErrors('Invalid mongo id', '422');
    }

    if (!updatedCar) {
      throw new CustomErrors('Car not found', '404');
    }

    const returnedCar = new Car(updatedCar);
    return returnedCar;
  }
}

export default CarService;