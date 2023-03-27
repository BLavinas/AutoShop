import { Model, Schema, model, models, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  readonly model: Model<T>;
  private schema: Schema<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }
  public async create(carObj: T): Promise<T> {
    return this.model.create(carObj);
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, carObj: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, carObj, { new: true });
  }
}

export default AbstractODM;
