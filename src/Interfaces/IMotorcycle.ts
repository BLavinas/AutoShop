import IVehicle from './IVehicle';

 type MotorcycleCategory = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicle {
  category: MotorcycleCategory;
  engineCapacity: number;
}
export { MotorcycleCategory };
export default IMotorcycle;
