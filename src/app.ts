import express from 'express';
import ErrorHandler from './middlewares/errorHandles';
import carRoutes from './Routes/Car.Routes';

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);

app.use(ErrorHandler.handle);
export default app;
