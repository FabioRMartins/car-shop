import { Router } from 'express';
import CarController from '../controllers/carController';
import CarModel from '../models/carsModel';
import CarService from '../services/carService';

const carRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRoute.post('/cars', (req, res) => carController.create(req, res));

export default carRoute;