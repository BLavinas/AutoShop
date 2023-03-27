import express from 'express';
import ErrorHandler from './middlewares/errorHandles';
import carRoutes from './Routes/Car.Routes';
import motorcycleRoutes from './Routes/Motorcycle.routes';

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);

app.use(ErrorHandler.handle);
export default app;
