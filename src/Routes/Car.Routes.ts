import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

const carController = new CarController();

carRoutes.post('/', (req, res) => carController.createCar(req, res));

export default carRoutes;