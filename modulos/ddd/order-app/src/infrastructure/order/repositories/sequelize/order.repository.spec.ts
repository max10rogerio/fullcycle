import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entities/order";
import { OrderItem } from "../../../../domain/checkout/entities/order_item";
import { Customer } from "../../../../domain/customer/entities/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { Product } from "../../../../domain/product/entities/product";
import { CustomerModel } from "../../../customer/repositories/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repositories/sequelize/customer.repository";
import { ProductModel } from "../../../product/repositories/sequelize/product.model";
import { ProductRepository } from "../../../product/repositories/sequelize/product.repository";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";

describe("Order Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      ProductModel,
      OrderItemModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    // create customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer");
    const address = new Address("street", "123", "zip", "city");
    customer.address = address;
    await customerRepository.create(customer);

    // create product
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product", 10);
    await productRepository.create(product);

    // create order item
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      1,
      product.id
    );

    // create order
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    // assert
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        },
      ],
    });
  });
});
