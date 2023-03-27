import { Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private motorcycleService: MotorcycleService;
  constructor(motorcycleService: MotorcycleService = new MotorcycleService()) {
    this.motorcycleService = motorcycleService;
  }
  public async createMotorcycle(req: Request, res: Response) {
    const { body } = req;
    const createdMotorcycle = await this.motorcycleService.createMotorcycle(body);
    res.status(201).json(createdMotorcycle);
  }
}

export default MotorcycleController;