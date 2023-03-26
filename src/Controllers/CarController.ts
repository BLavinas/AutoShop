import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
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

  public async findCars(req: Request, res: Response) {
    const allCars = await this.carService.findCars();
    res.status(200).json(allCars);
  }

  public async findCarById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      isValidObjectId(id);
      const carById = await this.carService.findCarById(id);
      if (!carById) return res.status(404).json({ message: 'Car not found' });
      return res.status(200).json(carById);
    } catch (error) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}

export default CarController;