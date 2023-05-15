import knex from 'knex';
import knexConfig from '../knexfile';

const environment: string = process.env.NODE_ENV || 'development';
const connectionConfig: object = knexConfig[environment];

const connection = knex(connectionConfig);

export default connection;
