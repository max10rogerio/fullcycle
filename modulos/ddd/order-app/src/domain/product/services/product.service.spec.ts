import { Product } from "../entities/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const p1 = new Product("1", "P1", 10);
    const p2 = new Product("2", "P2", 20);

    ProductService.increasePrice([p1, p2], 100);

    expect(p1.price).toBe(20);
    expect(p2.price).toBe(40);
  });
});
