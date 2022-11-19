import { DataSource, DataSourceOptions } from 'typeorm';
import Config from './config/Config';
const config: DataSourceOptions = {
  host: Config.host,
  username: Config.username,
  password: Config.password,
  database: Config.database,
  type: 'postgres',
  port: parseInt(Config.db_port),
  logging: false,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  entities: process.env.NODE_ENV === 'development' || 'test' ? ['src/entity/**/*.ts'] : ['dist/entity/**/*.js'],
  migrations: process.env.NODE_ENV === 'development' ? ['src/migration/**/*.ts'] : ['dist/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.ts', 'dist/subscriber/**/*.js'],
};

const AppDataSource = new DataSource(config);

export default AppDataSource;
