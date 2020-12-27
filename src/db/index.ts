import { Sequelize } from 'sequelize';

const DATABASE_NAME= process.env.DATABASE_NAME || 'songkick';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'user_dev';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 5432;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  dialect: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  define: {
    timestamps: false,
  }
});

export default sequelize;