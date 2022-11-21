import { Validator } from "../../../shared/validator";
import { OrderItem } from "./order_item";

export class Order extends Validator {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    super();

    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  validate() {
    this.required(this._id, "Id");
    this.required(this._customerId, "Customer Id");
    this.required(this._items, "Items");

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Items quantity must be greater than 0");
    }
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
