import { NextFunction, Request, Response } from 'express';
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

  public async findCars(_req: Request, res: Response) {
    const allCars = await this.carService.findCars();
    res.status(200).json(allCars);
  }

  public async findCarById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const carById = await this.carService.findCarById(id);
      return res.status(200).json(carById);
    } catch (error) {
      const err = error;
      next(err);
    }
  }

  public async updateCar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const updateCarById = await this.carService.updateCar(id, body);
      return res.status(200).json(updateCarById);
    } catch (error) {
      const err = error;
      next(err);
    }
  }
}

export default CarController;