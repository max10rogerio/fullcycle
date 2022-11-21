import { OrderItem } from "./order_item";

describe("OrderItem Unit Tests", () => {
  it("should be calculate order item total", () => {
    const item = new OrderItem("1", "TV", 100, 5, "p1");

    expect(item.orderItemTotal()).toBe(500);
  });

  it("should be get price", () => {
    const item = new OrderItem("1", "TV", 100, 5, "p1");

    expect(item.price).toBe(100);
  });
});
