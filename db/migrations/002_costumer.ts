import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(tableNames.costumer, table => {
    table.increments('id', { primaryKey: true }).unique().index();
    table.integer(`table`).unsigned();
    table.dateTime('create_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.costumer);
}
