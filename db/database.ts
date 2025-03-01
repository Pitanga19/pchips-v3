// pchips-v3/db/database.ts

import path from "path";
import { Sequelize } from 'sequelize';

const DB_PATH = path.resolve(__dirname, './database.sqlite3');

const sequelize = new Sequelize({
    dialect: 'sqlite',      // Use SQLite3
    storage: DB_PATH,
    logging: false,         // Disable SQL logs
    define: {
        underscored: true,  // Use snake_case for column names
    },
});

export default sequelize;