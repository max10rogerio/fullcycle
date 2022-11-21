import { Customer } from "../../customer/entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order_item";
import { OrderService } from "./order.service";

describe("Order Service Unit Test", () => {
  describe("Place Order", () => {
    it("should be place an order", () => {
      const customer = new Customer("c1", "Customer 1");
      const item1 = new OrderItem("i1", "Item 1", 10, 1, "p1");

      const order = OrderService.placeOrder(customer, [item1]);

      expect(customer.rewardPoints).toBe(5);
      expect(order.total()).toBe(10);
    });

    it("should be place an order", () => {
      expect(() => {
        const customer = new Customer("c1", "Customer 1");

        OrderService.placeOrder(customer, []);
      }).toThrowError("Order must have at least one item");
    });
  });

  describe("Total all orders", () => {
    it("should be get total os all orders", () => {
      const item1 = new OrderItem("i1", "Item 1", 100, 1, "p1");
      const item2 = new OrderItem("i2", "Item 2", 200, 2, "p2");

      const order1 = new Order("o1", "c1", [item1]);
      const order2 = new Order("o2", "c1", [item2]);

      const total = OrderService.total([order1, order2]);

      expect(total).toBe(500);
    });
  });
});
