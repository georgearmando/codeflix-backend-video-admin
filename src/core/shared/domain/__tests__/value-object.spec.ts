import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  it("should be equals", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test");

    expect(valueObject1.equals(valueObject2)).toBeTruthy();

    const complexValueObject1 = new ComplexValueObject("test", 1);
    const complexValueObject2 = new ComplexValueObject("test", 1);

    expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
  });

  it("should not be equals", () => {
    const valueObject1 = new StringValueObject("test1");
    const valueObject2 = new StringValueObject("test2");

    expect(valueObject1.equals(valueObject2)).toBeFalsy();

    const complexValueObject1 = new ComplexValueObject("test", 1);
    const complexValueObject2 = new ComplexValueObject("test", 2);

    expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
  });

  it("should not be equals comparing with null or undefined value", () => {
    const valueObject = new StringValueObject("test");
    expect(valueObject.equals(null as any)).toBeFalsy();
    expect(valueObject.equals(undefined as any)).toBeFalsy();

    const complexValueObject = new ComplexValueObject("test", 1);
    expect(complexValueObject.equals(null as any)).toBeFalsy();
    expect(complexValueObject.equals(undefined as any)).toBeFalsy();
  });
});