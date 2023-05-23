import Country from './entity/Country';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'sqlite',
  database: './checkpoint.sqlite',
  synchronize: true,
  entities: [Country],
  logging: ["query", "error"]
})

export default dataSource;