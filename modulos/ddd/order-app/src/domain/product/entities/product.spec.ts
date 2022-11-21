import { Validator } from "../../../shared/validator";
import { Product } from "./product";

describe("Product Unit Tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Product("", "123456", 0);
    }).toThrowError(Validator.makeMessageError("Id"));
  });

  it("should throw error when NAME is empty", () => {
    expect(() => {
      new Product("1", "", 0);
    }).toThrowError(Validator.makeMessageError("Name"));
  });

  it("should throw error when PRICE is less than zero", () => {
    expect(() => {
      new Product("1", "Test", -1);
    }).toThrowError("Price must be greather than zero");
  });

  it("should change name", () => {
    const product = new Product("1", "TV", 1);

    expect(product.name).toBe("TV");

    product.changeName("Car");

    expect(product.name).toBe("Car");
  });

  it("should change price", () => {
    const product = new Product("1", "TV", 1);

    expect(product.price).toBe(1);

    product.changePrice(2);

    expect(product.price).toBe(2);
  });
});
