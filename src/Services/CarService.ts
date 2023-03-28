import Car from '../Domains/Car';
import CustomErrors from '../errors/customErrors';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private invalidCar: string;
  private invalidId: string;
  private carODM: CarODM;
  constructor(carODM: CarODM = new CarODM()) {
    this.carODM = carODM;
    this.invalidId = 'Invalid mongo id';
    this.invalidCar = 'Car not found';
  }
  public async createCar(carObj: ICar): Promise<Car> {
    const createdCar = await this.carODM.create(carObj);
    const car = new Car(createdCar);
    return car;
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
      throw new CustomErrors(this.invalidId, '422');
    }

    if (!getCarById) {
      throw new CustomErrors(this.invalidCar, '404');
    }

    const carById = new Car(getCarById);
    return carById;
  }

  public async updateCar(id: string, car: ICar): Promise<Car | null> {
    let updatedCar;

    try {
      updatedCar = await this.carODM.update(id, car);
    } catch (error) {
      throw new CustomErrors(this.invalidId, '422');
    }

    if (!updatedCar) {
      throw new CustomErrors(this.invalidCar, '404');
    }

    const returnedCar = new Car(updatedCar);
    return returnedCar;
  }

  public async deleteCar(id: string) {
    let deletedCar;

    try {
      deletedCar = await this.carODM.delete(id);
    } catch (error) {
      throw new CustomErrors(this.invalidId, '422');
    }
    if (!deletedCar) {
      throw new CustomErrors(this.invalidCar, '404');
    }
    const returnedCar = new Car(deletedCar);
    return returnedCar;
  }
}

export default CarService;