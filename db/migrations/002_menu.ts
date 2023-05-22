import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(tableNames.menu, table => {
    table.increments('id', { primaryKey: true }).unique().index();
    table.integer(`${tableNames.item}_id`).unsigned();
    table
      .foreign(`${tableNames.item}_id`)
      .references('id')
      .inTable(tableNames.item)
      .onDelete('cascade');
    table.boolean('available');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.menu);
}
