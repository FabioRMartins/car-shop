import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const result = await this._service.read(req.body);
    res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    res.status(200).json(result);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const result = await this._service.update(id, req.body);
    res.status(200).json(result);
  }
}
