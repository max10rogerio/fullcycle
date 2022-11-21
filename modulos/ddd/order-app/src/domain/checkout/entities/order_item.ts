export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _productId: string;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    productId: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._productId = productId;
  }

  // create all getters private
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get productId(): string {
    return this._productId;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
