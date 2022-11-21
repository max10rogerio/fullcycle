import { Validator } from "../../../shared/validator";
import { Address } from "../value-object/address";

export class Customer extends Validator {
  private _id: string;
  private _name: string;
  private _address: Address | undefined;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();

    this._id = id;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  validate() {
    this.required(this._id, "Id");
    this.required(this._name, "Name");
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate customer");
    }

    this._active = true;
  }

  isActive(): boolean {
    return this._active;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }
}
