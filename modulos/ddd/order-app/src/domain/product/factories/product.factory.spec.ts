import { ProductFactory } from "./product.factory";

describe("ProductFactory Unit Test", () => {
  it("should return a instance of ProductInterface", () => {
    const product = ProductFactory.create("Product 1", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });
});
