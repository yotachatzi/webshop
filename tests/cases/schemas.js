const schemaOne = {
  name: 'schemaOne',
  fields: [
    {
      fieldName: 'name',
      type: 'varchar',
    },
  ],
};

const schemaTwo = {
  name: 'schemaTwo',
  fields: [
    {
      fieldName: 'name',
      type: 'varchar',
    },
    {
      fieldName: 'Merchant',
      type: 'uuid',
    },
  ],
};

const schemaThree = {
  name: 'schemaThree',
  fields: [
    {
      fieldName: 'name',
      type: 'varchar',
      length: 255,
    },
  ],
};

const schemaFour = {
  name: 'schemaFour',
  fields: [
    {
      fieldName: 'name',
      type: 'varchar',
      required: true,
    },
  ],
};

const schemaFive = {
  name: 'schemaFive',
  fields: [
    {
      fieldName: 'Merchant',
      type: 'uuid',
      relation: 'schemaOne',
    },
  ],
};

const schemaSix = {
  name: 'schemaSix',
  fields: [
    {
      fieldName: 'name',
      type: 'varchar',
      default: 'hey'
    },
  ],
};
const schemaSeven = {
  name: 'schemaSeven',
  fields: [
    {
      fieldName: 'name',
      type: 'uuid',
      required: true,
      relation: 'schemaOne',
      default: '5e576ea6-f369-11ea-adc1-0242ac120002',
    },
  ],
};


const noNameSchema = {
  fields: [
    {
      fieldName: 'name',
      type: 'integer',
      length: 30,
      required: true,
      default: 'hey',
      relation: 'schemaOne'
    },
  ],
};

const noFieldsSchema = {
  name: 'schemaSeven',
};

const noNameSringSchema = {
  name: {},
  fields: [
    {
      fieldName: 'name',
      type: 'integer',
      length: 30,
      required: true,
      default: 'hey',
      relation: 'schemaOne'
    },
  ],
};

const noFieldsListSchema = {
  name: 'schemaSeven',
  fields: 'hey',
};

const emptyFieldsListSchema = {
  name: 'schemaSeven',
  fields: [],
};

const wrongFieldSchemaOne = {
  name: 'schemaSeven',
  fields: [{
    type: 'integer',
    length: 30,
    required: true,
    default: 'hey',
    relation: 'schemaOne'
  }],
};

const wrongFieldSchemaTwo = {
  name: 'schemaSeven',
  fields: [{
    name: 'hey',
    length: 30,
    required: true,
    default: 'hey',
    relation: 'schemaOne'
  }],
};

const wrongFieldSchemaThree = {
  name: 'schemaSeven',
  fields: [{
    fieldName: 5,
    type: 'integer',
    length: 30,
    required: true,
    default: 'hey',
    relation: 'schemaOne'
  }],
};

const wrongFieldSchemaFour = {
  name: 'schemaSeven',
  fields: [{
    fieldName: 'hey',
    type: 'hg fkk',
    length: 30,
    required: true,
    default: 'hey',
    relation: 'schemaOne'
  }],
};

const wrongFieldSchemaFive = {
  name: 'schemaSeven',
  fields: [{
    fieldName: 'hey',
    type: 'hgfkk',
    length: 30,
    required: true,
    default: 'hey',
    relation: 'schemaOne'
  }],
};

const wrongFieldSchemaSix = {
  name: 'schemaSeven',
  fields: [{
    fieldName: 'hey',
    type: 'int',
    length: 30,
    required: 'hey',
    default: 'hey',
    relation: 'schemaOne'
  }],
};

const wrongFieldSchemaSeven = {
  name: 'schemaSeven',
  fields: [{
    fieldName: 'hey',
    type: 'int',
    length: 30,
    required: true,
    default: 'hey',
    relation: 'schemaOne'
  }],
};
const wrongFieldSchemaEight = {
  name: 'schemaSeven',
  fields: [
    {
      fieldName: 'Merchant',
      type: 'int',
      relation: 'schemaOne',
    },
  ],
};

const schemas = [schemaOne, schemaTwo, schemaThree, schemaFour, schemaFive, schemaSix, schemaSeven];

module.exports = {
  schemas,
  noNameSchema,
  noFieldsSchema,
  noNameSringSchema,
  noFieldsListSchema,
  emptyFieldsListSchema,
  wrongFieldSchemaOne,
  wrongFieldSchemaTwo,
  wrongFieldSchemaThree,
  wrongFieldSchemaFour,
  wrongFieldSchemaFive,
  wrongFieldSchemaSix,
  wrongFieldSchemaSeven,
  wrongFieldSchemaEight,
};