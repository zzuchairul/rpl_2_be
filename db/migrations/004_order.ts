import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(tableNames.order, table => {
    table.increments('id', { primaryKey: true }).unique().index();
    table.dateTime('create_at').notNullable().defaultTo(knex.fn.now());
    table.string('note', 255);
    table.integer(`${tableNames.order}_id`).unsigned();
    table
      .foreign(`${tableNames.order}_id`)
      .references('id')
      .inTable(tableNames.order);
    table.string('status', 255).defaultTo('sedang diproses');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.order);
}
