import { Order } from "../../../../domain/checkout/entities/order";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repositories/order-repository.interface";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        })),
      },
      {
        include: [{ model: OrderItemModel, as: "items" }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
