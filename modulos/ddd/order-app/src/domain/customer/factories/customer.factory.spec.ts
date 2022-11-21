import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("CustomerFactory Unit Test", () => {
  it("should return an instance of CustomerInterface", () => {
    const customer = CustomerFactory.create("Customer 1");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.address).toBeUndefined();
  });

  it("should return an instance of Customer with address", () => {
    const address = new Address("Street 1", "Number 1", "zip 1", "city 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.address).toBeInstanceOf(Address);
    expect(customer.address).toBe(address);
  });
});
