import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(tableNames.user, table => {
    table.increments('id', { primaryKey: true }).unique().index();
    table.string(`username`).unique();
    table.string('password');
    table.string('fullname');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.user);
}
