import * as sinon from "sinon";
import chai from "chai";
const { expect } = chai;
import CarModel from "../../../models/carsModel";
import { Model } from "mongoose";
import { carMock, carMockId } from "../../mocks/carsMock";

describe("Car Model", () => {
  const carModel = new CarModel();
  before(async () => {
    sinon.stub(Model, "create").resolves(carMockId);
    sinon.stub(Model, "findOne").resolves(carMockId);
    sinon.stub(Model, "findByIdAndUpdate").resolves(carMockId);
  });

  after(() => {
    sinon.restore();
  });

  describe("Criando Car", () => {
    it("succesfully created", async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId);
    });
  });

  describe("Buscando Car", () => {
    it("successfully found", async () => {
      const carFound = await carModel.readOne("4edd40c86762e0fb12000003");
      expect(carFound).to.be.deep.equal(carMockId);
    });

    it("_id not found", async () => {
      try {
        await carModel.readOne("1312312");
      } catch (error: any) {
        expect(error.message).to.be.eq("InvalidMongoId");
      }
    });
  });

  describe("Atualizando Car", () => {
    it("successfuly update", async () => {
      const carUpdate = await carModel.update(
        "4edd40c86762e0fb12000003",
        carMock
      );
      expect(carUpdate).to.be.deep.equal(carMockId);
    });

    it("update not found", async () => {
      try {
        await carModel.update("1312312", carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq("InvalidMongoId");
      }
    });
  });
});
