import Car from '../Domains/Car';
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
    // console.log(returnCar);
    return returnCar;
  }
}

export default CarService;