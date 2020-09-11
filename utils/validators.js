function isAlphabetic(str) {
  return /^[a-zA-Z]+$/.test(str);
}

const validDataTypes = new Map(
  [
    ['varchar', 'string'],
    ['integer', 'integer'],
    ['int', 'integer'],
    ['boolean', 'boolean'],
    ['uuid', 'string'],
  ],
);

function isValidPSQLdataType(value, dataType) {
  const validDataType = validDataTypes.get(dataType);
  switch (validDataType) {
    case 'string':
      return typeof value === 'string';
    case 'integer':
      return Number.isInteger(value);
    case 'boolean':
      return typeof value === 'boolean';
    default:
      return false;
  }
}

function validateSchema(schema) {
  const { name, fields } = schema;
  if (name === undefined) throw new Error('❌ Undefined: Schema name property is undefined.');
  if (fields === undefined) throw new Error(`❌ ${name}: Schema fields property is undefined.`);
  if (typeof name !== 'string') throw new Error(`❌ ${name}: Schema name property should be a string.`);
  if (!Array.isArray(fields)) throw new Error(`❌ ${name}: Schema fields property should be an array.`);
  if (fields.length === 0) throw new Error(`❌ ${name}: Schema fields array cannot be empty.`);

  for (let i = 0; i < fields.length; i += 1) {
    const {
      fieldName,
      type,
      required,
      default: defaultValue,
      relation,
      unique,
    } = fields[i];

    if (fieldName === undefined || type === undefined) throw new Error(`❌ ${name}: Schema fields should contain fieldName & type property.`);
    if (!isAlphabetic(fieldName)) throw new Error(`❌ ${name}: Schema field fieldName property must be alphabetic.`);
    if (!isAlphabetic(type)) throw new Error(`❌ ${name}: Schema field type property must be alphabetic.`);
    if (required !== undefined && typeof required !== 'boolean') throw new Error(`❌ ${name}: Schema field required property must be boolean.`);
    if (unique !== undefined && typeof unique !== 'boolean') throw new Error(`❌ ${name}: Schema field unique property must be boolean.`);
    if (!validDataTypes.has(type)) throw new Error(`❌ ${name}: Schema field type property must be a valid psql data type`);
    if (defaultValue !== undefined && !isValidPSQLdataType(defaultValue, type)) throw new Error(`❌ ${name}: Schema field default property must match the dataType property`);
    if (relation && type !== 'uuid') throw new Error(`❌ ${name}: Schema field with a foreign key must be of type uuid`);
  }
}

module.exports = { isAlphabetic, validateSchema };
