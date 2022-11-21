import { Order } from "../entities/order";
import { OrderItem } from "../entities/order_item";

export class OrderFactory {
  public static create(params: OrderFactoryParams): Order {
    const items = params.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.productId
      );
    });

    return new Order(params.id, params.customerId, items);
  }
}

export type OrderFactoryParams = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
  }[];
};
