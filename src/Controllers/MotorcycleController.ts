import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private motorcycleService: MotorcycleService;
  constructor(motorcycleService: MotorcycleService = new MotorcycleService()) {
    this.motorcycleService = motorcycleService;
  }
  public async createMotorcycle(req: Request, res: Response) {
    const { body } = req;
    const createdMotorcycle = await this.motorcycleService.createMotorcycle(
      body,
    );
    res.status(201).json(createdMotorcycle);
  }
  public async findMotorcycleById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    try {
      const motorcycleById = await this.motorcycleService.findMotorcycleById(
        id,
      );
      return res.status(200).json(motorcycleById);
    } catch (error) {
      const err = error;
      next(err);
    }
  }
  public async findMotorcycle(_req: Request, res: Response) {
    const allMotorcycles = await this.motorcycleService.findMotorcycle();
    res.status(200).json(allMotorcycles);
  }

  public async updateMotorcycle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const updateMotorcycleById = await this.motorcycleService.updateMotorcycle(id, body);
      return res.status(200).json(updateMotorcycleById);
    } catch (error) {
      const err = error;
      next(err);
    }
  }
}

export default MotorcycleController;