import { EventHandlerInterface } from "../../../@shared/events/event-handler.interface";
import { ProductCreatedEvent } from "../product-create.event";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  async handle(event: ProductCreatedEvent): Promise<void> {
    console.log(
      `Sending email to notify a new product: ${event.eventData.name}`
    );
  }
}
