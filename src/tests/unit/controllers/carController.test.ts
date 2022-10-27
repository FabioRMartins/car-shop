import * as sinon from "sinon";
import chai from "chai";
const { expect } = chai;
import CarModel from "../../../models/carsModel";
import { carMock } from "../../mocks/carsMock";
import CarService from "../../../services/carService";
import CarController from "../../../controllers/carController";
import { Request, Response } from "express";

describe("Car Controller", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, "create").resolves(carMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe("Criando Car", () => {
    it("Successesfuly created", async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
});
