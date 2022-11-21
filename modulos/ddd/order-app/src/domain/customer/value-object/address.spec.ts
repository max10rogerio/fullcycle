import { Validator } from "../../../shared/validator";
import { Address } from "./address";

describe("Address Unit Test", () => {
  it("should be throws error when Street is empty", () => {
    expect(() => {
      new Address("", "", "", "");
    }).toThrowError(Validator.makeMessageError("Street"));
  });

  it("should be throws error when Number is empty", () => {
    expect(() => {
      new Address("Test", "", "", "");
    }).toThrowError(Validator.makeMessageError("Number"));
  });

  it("should be throws error when Zip is empty", () => {
    expect(() => {
      new Address("Test", "123", "", "");
    }).toThrowError(Validator.makeMessageError("Zip"));
  });

  it("should be throws error when Number is empty", () => {
    expect(() => {
      new Address("Test", "123", "12345789", "");
    }).toThrowError(Validator.makeMessageError("City"));
  });

  it("should be instanciate Address successfully", () => {
    expect(() => {
      new Address("Test", "1", "1", "1");
    }).not.toThrow();
  });

  it("should be get formatted address", () => {
    const address = new Address(
      "Street Test",
      "Number 1",
      "Zip 123",
      "Maringá"
    );

    expect(address.toString()).toEqual(
      "Street Test, Number 1, Zip 123, Maringá"
    );
  });
});
