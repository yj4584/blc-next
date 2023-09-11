const env: any = process.env;

interface DBConfigItemInterface {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: string;
	port: string;
	define: {
		timestamps: boolean;
	};
}

const webtoonguide: DBConfigItemInterface = {
	username: env.WG_DB_USERNAME,
	password: env.WG_DB_PASSWORD,
	database: env.WG_DB_DATABASE,
	host: env.WG_DB_HOST,
	dialect: env.WG_DB_CONNECTION,
	port: typeof env.WG_DB_PORT == 'undefined' ? '3306' : env.WG_DB_PORT,
	define: {
		timestamps: false,
	},
};

const blcrasno: DBConfigItemInterface = {
	username: env.BLC_DB_USERNAME,
	password: env.BLC_DB_PASSWORD,
	database: env.BLC_DB_DATABASE,
	host: env.BLC_DB_HOST,
	dialect: env.BLC_DB_CONNECTION,
	port: typeof env.BLC_DB_PORT == 'undefined' ? '3306' : env.BLC_DB_PORT,
	define: {
		timestamps: false,
	},
};


interface DBConfigInterface {
	[key: string]: DBConfigItemInterface;
}

export const config: DBConfigInterface = {
	webtoonguide: webtoonguide,
	blcrasno: blcrasno
};
