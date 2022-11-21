export abstract class Validator {
  public abstract validate(): void;

  public required(value: any | null, label: string) {
    if (!value || value.length === 0) {
      throw new Error(Validator.makeMessageError(label));
    }
  }

  public static makeMessageError(label: string): string {
    return `${label} is required`;
  }
}
