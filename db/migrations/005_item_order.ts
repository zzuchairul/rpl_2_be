import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(tableNames.item_order, table => {
    table.integer(`${tableNames.item}_id`).unsigned();
    table
      .foreign(`${tableNames.item}_id`)
      .references('id')
      .inTable(tableNames.item);
    table.integer(`${tableNames.order}_id`).unsigned();
    table
      .foreign(`${tableNames.order}_id`)
      .references('id')
      .inTable(tableNames.order);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.item_order);
}
