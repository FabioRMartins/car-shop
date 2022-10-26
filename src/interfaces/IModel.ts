export interface IModel<T> {
  create(obj: T): Promise<T>;
  read(_id: string): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, obj: Partial<T>): Promise<T | null>;
  delete(_id: string): Promise<T | null>;
}
