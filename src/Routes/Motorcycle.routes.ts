import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();
const motorcycleController = new MotorcycleController();

motorcycleRoutes.post('/', (req, res) => motorcycleController.createMotorcycle(req, res));
motorcycleRoutes.get('/', (req, res) => motorcycleController.findMotorcycle(req, res));
motorcycleRoutes.get('/:id', (req, res, next) => motorcycleController
  .findMotorcycleById(req, res, next));

export default motorcycleRoutes;