import { Sequelize } from 'sequelize';
import { config } from 'config/db-config';

const nowDBConfig = config;
const databaseKeys: string[] = Object.keys(nowDBConfig);

interface DBInterface {
	[key: string]: Sequelize;
}

const db: DBInterface = {};
databaseKeys.map((databaseKey) => {
	let myDBConfig: any = nowDBConfig[databaseKey];
	myDBConfig.logging = false;
	db[databaseKey] = new Sequelize(
		myDBConfig.database,
		myDBConfig.username,
		myDBConfig.password,
		myDBConfig,
	);
});

export default module.exports = db;
