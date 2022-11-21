import { EventInterface } from "../../@shared/events/event.interface";
import { Product } from "../entities/product";

export class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: Product;

  constructor(product: Product) {
    this.dateTimeOccurred = new Date();
    this.eventData = product;
  }
}
