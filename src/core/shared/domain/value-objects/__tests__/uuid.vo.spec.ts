import { InvalidUUIDError, Uuid } from "../uuid.vo";

describe("Uuid Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  it("should throw an error on invalid uuid", () => {
    expect(() => {
      new Uuid("invalid")
    }).toThrowError(new InvalidUUIDError());
  });

  it("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept a valid uuid", () => {
    const uuid = new Uuid("123e4567-e89b-12d3-a456-426614174000");
    expect(uuid.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});