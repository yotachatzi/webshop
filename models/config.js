const { Client } = require('pg');
const { validateSchema } = require('../utils/validators');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const pgSqlTriggerFuncQuery = `
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

async function connectDB() {
  try {
    await client.connect();
    return {
      success: true,
      message: `🏁 Database successfully connected!
      `,
    };
  } catch (e) {
    return {
      success: false,
      message: `
❌ Connection error: ${e.message}`,
    };
  }
}

function constructQuery(schema) {
  validateSchema(schema);
  const { name, fields } = schema;

  let queryHead = `do $$ begin CREATE TABLE IF NOT EXISTS ${name} ( id UUID PRIMARY KEY,`;
  const queryTail = ' created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$';

  for (let i = 0; i < fields.length; i += 1) {
    const {
      fieldName,
      type,
      length,
      relation,
      required,
      default: defaultValue,
      unique,
    } = fields[i];
    let queryBody = ` ${fieldName} ${type}`;

    if (type === 'varchar') {
      if (length) queryBody += `(${fields[i].length})`;
    }
    if (required) queryBody += ' NOT NULL';
    if (unique !== undefined && unique === true) queryBody += ' UNIQUE';
    if (defaultValue) {
      if (type === 'varchar' || type === 'uuid') queryBody += ` DEFAULT '${defaultValue}'`;
      if (type === 'int' || type === 'integer' || type === 'boolean') queryBody += ` DEFAULT ${defaultValue}`;
    }
    if (relation) queryBody += ` REFERENCES ${relation} (id)`;

    queryBody += ',';
    queryHead += queryBody;
  }

  return queryHead + queryTail;
}

async function executeQuery(query, successMsg) {
  try {
    await client.query(query);
    // eslint-disable-next-line
    console.log(successMsg);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function attachTriggerToSchema(schemaName, triggerName) {
  try {
    const trigger = `
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON ${schemaName}
    FOR EACH ROW
    EXECUTE PROCEDURE ${triggerName};
    `;
    await executeQuery(trigger, `🔫  trigger ${triggerName} was attached to ${schemaName}`);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function initDB(modelsInit) {
  const tablePromises = [];
  const triggerPromises = [];

  try {
    await executeQuery(pgSqlTriggerFuncQuery, '+ func trigger_set_timestamp() was created!');

    for (let i = 0; i < modelsInit.length; i += 1) {
      const query = constructQuery(modelsInit[i]);
      const successMsg = `📋 Table ${modelsInit[i].name} initialized.`;

      tablePromises.push(executeQuery(query, successMsg));
    }

    await Promise.all(tablePromises);

    for (let i = 0; i < modelsInit.length; i += 1) {
      triggerPromises.push(attachTriggerToSchema(modelsInit[i].name, 'trigger_set_timestamp()'));
    }

    await Promise.all(triggerPromises);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e.message);
  }
}

module.exports = {
  client,
  connectDB,
  initDB,
  constructQuery,
  executeQuery,
};
