import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.item, table => {
    table.increments('id', { primaryKey: true }).unique().index().notNullable();
    table.string('title');
    table.float('price');
    table.string('desc');
    table.string('imageURL');
    table.string('category');
    table.integer('qty').defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.item);
}
