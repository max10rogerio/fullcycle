import { v4 as uuid } from "uuid";
import { Product } from "../entities/product";
import { ProductInterface } from "../entities/product.interface";

export class ProductFactory {
  public static create(name: string, price: number): ProductInterface {
    return new Product(uuid(), name, price);
  }
}
