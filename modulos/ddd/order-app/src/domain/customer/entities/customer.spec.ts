import { Validator } from "../../../shared/validator";
import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Costumer Unit Tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError(Validator.makeMessageError("Id"));
  });

  it("should throw error when NAME is empty", () => {
    expect(() => {
      new Customer("1", "");
    }).toThrowError(Validator.makeMessageError("Name"));
  });

  it("should change name", () => {
    const customer = new Customer("123", "john");

    customer.changeName("max");

    expect(customer.name).toBe("max");
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "john");

      customer.activate();
    }).toThrowError("Address is mandatory to activate customer");
  });

  it("should active customer", () => {
    const customer = new Customer("123", "john");
    const address = new Address("Street 1", "123", "13456789", "Maringá");

    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactive customer", () => {
    const customer = new Customer("123", "john");

    expect(customer.isActive()).toBe(true);

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "john");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  });
});
