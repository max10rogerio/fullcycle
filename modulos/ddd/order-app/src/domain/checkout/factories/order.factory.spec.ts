import { OrderFactory } from "./order.factory";

describe("OrderFactory Unit Test", () => {
  it("should return an instance of Order", () => {
    const order = OrderFactory.create({
      id: "1",
      customerId: "1",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
          quantity: 1,
          productId: "1",
        },
      ],
    });

    // assert order
    expect(order.id).toBeDefined();
    expect(order.customerId).toBe("1");
    expect(order.constructor.name).toBe("Order");

    // assert order items
    expect(order.items).toHaveLength(1);
    expect(order.items[0].id).toBe("1");
    expect(order.items[0].name).toBe("Product 1");
    expect(order.items[0].price).toBe(10);
    expect(order.items[0].quantity).toBe(1);
    expect(order.items[0].productId).toBe("1");
    expect(order.items[0].constructor.name).toBe("OrderItem");
  });
});
