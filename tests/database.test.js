const { client, connectDB, initDB, constructQuery, executeQuery } = require('../models/config');
const { schemas } = require('./cases/schemas');
const { correctQueries } = require('./cases/queries');
jest.setTimeout(50000);

beforeAll(() => {
  return connectDB();
});

afterAll(() => {
  return client.end();;
});

describe("Util func constructQuery ", () => {

  for (let i = 0; i < schemas.length; i += 1) {
    it(`should return a table insertion query based on ${schemas[i].name}`, async () => {
      const result = constructQuery(schemas[i]);
      expect(result).toBe(correctQueries[i]);
    });
  }

});

describe("Util func executeQuery ", () => {

  it(`should create a table named schemaone`, async () => {
    await executeQuery(correctQueries[0], 'table is created!');
    const result = await client.query(`
        SELECT EXISTS
        (
          SELECT 1
          FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'schemaone'
        );
      `);
    expect(result.rows[0].exists).toBe(true);
  });
});