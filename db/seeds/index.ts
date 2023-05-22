import { Knex } from 'knex';
import tableNames from '../../src/constant/tableNames';
import itemSeeds from './data/itemSeeds';
import menuSeeds from './data/menuSeeds';

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.item).del();
  await knex(tableNames.item).insert(itemSeeds);

  await knex(tableNames.menu).del();
  await knex(tableNames.menu).insert(menuSeeds);
}
