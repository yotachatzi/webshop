const { isAlphabetic, validateSchema } = require('../utils/validators');
const {
  noNameSchema,
  noFieldsSchema,
  noFieldsListSchema,
  noNameSringSchema,
  emptyFieldsListSchema,
  wrongFieldSchemaOne,
  wrongFieldSchemaTwo,
  wrongFieldSchemaThree,
  wrongFieldSchemaFour,
  wrongFieldSchemaFive,
  wrongFieldSchemaSix,
  wrongFieldSchemaSeven,
  wrongFieldSchemaEight,
} = require('./cases/schemas');

describe("The isAlphabetic validator ", () => {

  it("should return true if the argument consists of aplhabetic characters", () => {
    const result = isAlphabetic('something');
    expect(result).toBe(true);
  });

  it("should return false if the argument does not consist of only aplhabetic characters", () => {
    const result = isAlphabetic('some thing');
    expect(result).toBe(false);
  });

});

describe("The validateSchema validator ", () => {

  it(`should throw an error if schema name property is undefined`, () => {
    expect(() => validateSchema(noNameSchema)).toThrow(`❌ Undefined: Schema name property is undefined.`);
  });

  it(`should throw an error if schema fields property is undefined`, () => {
    expect(() => validateSchema(noFieldsSchema)).toThrow(`❌ schemaSeven: Schema fields property is undefined.`);
  });

  it(`should throw an error if schema name property is not an array`, () => {
    expect(() => validateSchema(noNameSringSchema)).toThrow(`❌ [object Object]: Schema name property should be a string.`);
  });

  it(`should throw an error if schema fields property is not an array`, () => {
    expect(() => validateSchema(noFieldsListSchema)).toThrow(`❌ schemaSeven: Schema fields property should be an array.`);
  });

  it(`should throw an error if schema field array cannot be empty`, () => {
    expect(() => validateSchema(emptyFieldsListSchema)).toThrow(`❌ schemaSeven: Schema fields array cannot be empty.`);
  });

  it(`should throw an error if schema field does not contain a name property`, () => {
    expect(() => validateSchema(wrongFieldSchemaOne)).toThrow(`❌ schemaSeven: Schema fields should contain fieldName & type property.`);
  });

  it(`should throw an error if schema field does not contain a type property`, () => {
    expect(() => validateSchema(wrongFieldSchemaTwo)).toThrow(`❌ schemaSeven: Schema fields should contain fieldName & type property.`);
  });

  it(`should throw an error if schema field fieldName property is not alphabetic`, () => {
    expect(() => validateSchema(wrongFieldSchemaThree)).toThrow(`❌ schemaSeven: Schema field fieldName property must be alphabetic.`);
  });

  it(`should throw an error if schema field type property is not alphabetic`, () => {
    expect(() => validateSchema(wrongFieldSchemaFour)).toThrow(`❌ schemaSeven: Schema field type property must be alphabetic.`);
  });

  it(`should throw an error if schema field required property is not a boolean`, () => {
    expect(() => validateSchema(wrongFieldSchemaSix)).toThrow(`❌ schemaSeven: Schema field required property must be boolean.`);
  });

  it(`should throw an error if schema field type property is not a valid psql data type`, () => {
    expect(() => validateSchema(wrongFieldSchemaFive)).toThrow(`❌ schemaSeven: Schema field type property must be a valid psql data type`);
  });

  it(`should throw an error if schema field default does not match specified data type`, () => {
    expect(() => validateSchema(wrongFieldSchemaSeven)).toThrow(`❌ schemaSeven: Schema field default property must match the dataType property`);
  });

  it(`should throw an error if schema field default does not match specified data type`, () => {
    expect(() => validateSchema(wrongFieldSchemaEight)).toThrow(`❌ schemaSeven: Schema field with a foreign key must be of type uuid`);
  });

});