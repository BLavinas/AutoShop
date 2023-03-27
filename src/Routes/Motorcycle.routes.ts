import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();
const motorcycleController = new MotorcycleController();

motorcycleRoutes.post('/', (req, res) => motorcycleController.createMotorcycle(req, res));

export default motorcycleRoutes;