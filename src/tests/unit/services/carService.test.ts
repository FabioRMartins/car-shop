import { expect } from "chai";
import * as sinon from "sinon";
import { ZodError } from "zod";
import CarModel from "../../../models/carsModel";
import CarService from "../../../services/carService";
import { carMock, carMockId } from "../../mocks/carsMock";

describe("Car Service", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, "create").resolves(carMockId);
  });

  after(() => {
    sinon.restore();
  });

  describe("Criando Car", () => {
    it("Successesfuly created", async () => {
      const newCar = await carService.create(carMock);

      expect(newCar).to.be.deep.equal(carMockId);
    });

    it("Not created", async () => {
      let error;

      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });
});
