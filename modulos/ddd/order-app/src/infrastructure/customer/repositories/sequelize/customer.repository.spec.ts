import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../../domain/customer/entities/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer Repository Test", () => {
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

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create", async () => {
    const repository = new CustomerRepository();
    const customerEntity = new Customer("1", "Customer");

    customerEntity.address = new Address("street", "123", "zip", "city");

    await repository.create(customerEntity);

    const model = await CustomerModel.findOne({ where: { id: "1" } });

    expect(model.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer",
      street: customerEntity.address.street,
      zipcode: customerEntity.address.zip,
      city: customerEntity.address.city,
      number: customerEntity.address.number,
      active: customerEntity.isActive(),
      rewardPoints: customerEntity.rewardPoints,
    });
  });

  it("should update", async () => {
    const repository = new CustomerRepository();
    const customerEntity = new Customer("1", "Customer");

    customerEntity.address = new Address("street", "123", "zip", "city");

    await repository.create(customerEntity);

    customerEntity.changeName("Customer 2");

    await repository.update(customerEntity);

    const model = await CustomerModel.findOne({ where: { id: "1" } });

    expect(model.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: customerEntity.address.street,
      zipcode: customerEntity.address.zip,
      city: customerEntity.address.city,
      number: customerEntity.address.number,
      active: customerEntity.isActive(),
      rewardPoints: customerEntity.rewardPoints,
    });
  });

  it("should find by id", async () => {
    const repository = new CustomerRepository();
    const customerEntity = new Customer("1", "Customer");

    customerEntity.address = new Address("street", "123", "zip", "city");

    await repository.create(customerEntity);

    const model = await CustomerModel.findOne({ where: { id: "1" } });
    const foundCustomer = await repository.find("1");

    expect(model.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.address.street,
      zipcode: foundCustomer.address.zip,
      city: foundCustomer.address.city,
      number: foundCustomer.address.number,
      rewardPoints: foundCustomer.rewardPoints,
      active: foundCustomer.isActive(),
    });
  });

  it("should throw error when customer not found", async () => {
    const repository = new CustomerRepository();

    await expect(repository.find("1")).rejects.toThrowError(
      "Customer not found"
    );
  });

  it("should find all", async () => {
    const repository = new CustomerRepository();
    const customer1Entity = new Customer("1", "Customer 1");
    const customer2Entity = new Customer("2", "Customer 2");
    const address = new Address("street", "123", "zip", "city");

    customer1Entity.address = address;
    customer2Entity.address = address;

    await repository.create(customer1Entity);
    await repository.create(customer2Entity);

    const foundCustomers = await repository.findAll();

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toContainEqual(customer1Entity);
    expect(foundCustomers).toContainEqual(customer2Entity);
  });
});
