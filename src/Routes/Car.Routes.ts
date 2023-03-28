import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

const carController = new CarController();

carRoutes.post('/', (req, res) => carController.createCar(req, res));
carRoutes.get('/', (req, res) => carController.findCars(req, res));
carRoutes.get('/:id', (req, res, next) => carController.findCarById(req, res, next));
carRoutes.put('/:id', (req, res, next) => carController.updateCar(req, res, next));
carRoutes.delete('/:id', (req, res, next) => carController.deleteCar(req, res, next));

export default carRoutes;