export default interface IService<T> {
  create(obj: unknown): Promise<T>,    
  read(_id: string): Promise<T[]>, 
}