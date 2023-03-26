import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

const carController = new CarController();

carRoutes.post('/', (req, res) => carController.createCar(req, res));
carRoutes.get('/', (req, res) => carController.findCars(req, res));
carRoutes.get('/:id', (req, res) => carController.findCarById(req, res));

export default carRoutes;