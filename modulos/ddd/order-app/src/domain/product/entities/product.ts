import { Validator } from "../../../shared/validator";
import { ProductInterface } from "./product.interface";

export class Product extends Validator implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();

    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  public validate(): void {
    this.required(this._id, "Id");
    this.required(this._name, "Name");

    if (this._price <= 0) {
      throw new Error("Price must be greather than zero");
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;

    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;

    this.validate();
  }
}
