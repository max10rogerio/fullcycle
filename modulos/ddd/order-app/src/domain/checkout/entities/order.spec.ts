import { Validator } from "../../../shared/validator";
import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order Unit Tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Order("", "123456", []);
    }).toThrowError(Validator.makeMessageError("Id"));
  });

  it("should throw error when CUSTOMER ID is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrowError(Validator.makeMessageError("Id"));
  });

  it("should throw error when ITEMS is empty", () => {
    expect(() => {
      new Order("1", "1", []);
    }).toThrowError(Validator.makeMessageError("Items"));
  });

  it("should calculate total", () => {
    expect(() => {
      const item = new OrderItem("1", "TV", 100, -1, "p1");

      new Order("1", "1", [item]);
    }).toThrowError("Items quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "TV", 100, 1, "p1");
    const item2 = new OrderItem("2", "Smartphone", 200, 1, "p2");
    const order = new Order("1", "1", [item, item2]);

    expect(order.total()).toBe(300);
  });
});
