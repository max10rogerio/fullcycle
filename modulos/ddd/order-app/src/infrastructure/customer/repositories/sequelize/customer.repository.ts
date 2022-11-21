import { Customer } from "../../../../domain/customer/entities/customer";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repositories/customer-repository.interface";
import { Address } from "../../../../domain/customer/value-object/address";
import { CustomerModel } from "./customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zipcode: entity.address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zipcode: entity.address.zip,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let model: CustomerModel;

    try {
      model = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const address = new Address(
      model.street,
      model.number,
      model.zipcode,
      model.city
    );

    const customer = new Customer(model.id, model.name);

    customer.address = address;

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll();

    return models.map((model) => {
      const customer = new Customer(model.id, model.name);
      const address = new Address(
        model.street,
        model.number,
        model.zipcode,
        model.city
      );

      customer.address = address;
      customer.addRewardPoints(model.rewardPoints);

      if (model.active) {
        customer.activate();
      }

      return customer;
    });
  }
}
