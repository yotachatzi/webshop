const correctQueryOne = `do $$ begin CREATE TABLE IF NOT EXISTS schemaOne ( id UUID PRIMARY KEY, name varchar, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQueryTwo = `do $$ begin CREATE TABLE IF NOT EXISTS schemaTwo ( id UUID PRIMARY KEY, name varchar, Merchant uuid, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQueryThree = `do $$ begin CREATE TABLE IF NOT EXISTS schemaThree ( id UUID PRIMARY KEY, name varchar(255), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQueryFour = `do $$ begin CREATE TABLE IF NOT EXISTS schemaFour ( id UUID PRIMARY KEY, name varchar NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQueryFive = `do $$ begin CREATE TABLE IF NOT EXISTS schemaFive ( id UUID PRIMARY KEY, Merchant uuid REFERENCES schemaOne (id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQuerySix = `do $$ begin CREATE TABLE IF NOT EXISTS schemaSix ( id UUID PRIMARY KEY, name varchar DEFAULT 'hey', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQuerySeven = `do $$ begin CREATE TABLE IF NOT EXISTS schemaSeven ( id UUID PRIMARY KEY, name uuid NOT NULL DEFAULT '5e576ea6-f369-11ea-adc1-0242ac120002' REFERENCES schemaOne (id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); end $$`;

const correctQueries = [correctQueryOne, correctQueryTwo, correctQueryThree, correctQueryFour, correctQueryFive, correctQuerySix, correctQuerySeven];

module.exports = {
  correctQueries,
  correctQueryOne,
  correctQueryTwo,
  correctQueryThree,
  correctQueryFour,
  correctQueryFive,
  correctQuerySix,
  correctQuerySeven,
}