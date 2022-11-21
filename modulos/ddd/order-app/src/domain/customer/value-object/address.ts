import { Validator } from "../../../shared/validator";

export class Address extends Validator {
  _street: string = "";
  _number: string = "";
  _zip: string = "";
  _city: string = "";

  constructor(street: string, number: string, zip: string, city: string) {
    super();

    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    this.required(this._street, "Street");
    this.required(this._number, "Number");
    this.required(this._zip, "Zip");
    this.required(this._city, "City");
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
  }
}
