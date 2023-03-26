import { Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private carService: CarService;
  constructor(carService: CarService = new CarService()) {
    this.carService = carService;
  }

  public async createCar(req: Request, res: Response) {
    const { body } = req;
    const createdCar = await this.carService.createCar(body);
    res.status(201).json(createdCar);
  }
}

export default CarController;