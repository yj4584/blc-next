import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface CocodaUserApiTokenAttribute {
	cocoda_user_id: number;
	cocoda_user_email: string;
	hash_token: string;
	user_agent: string;
	last_check_time: number;
	ip: string;
}

class CocodaUserApiToken
	extends Model<CocodaUserApiTokenAttribute>
	implements CocodaUserApiTokenAttribute
{
	declare cocoda_user_id: number;
	declare cocoda_user_email: string;
	declare hash_token: string;
	declare user_agent: string;
	declare last_check_time: number;
	declare ip: string;
}

export default CocodaUserApiToken.init(
	{
		cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		cocoda_user_email: {
			type: DataTypes.STRING,
		},
		hash_token: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		user_agent: {
			type: DataTypes.STRING,
		},
		last_check_time: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		ip: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'cocoda_user_api_tokens',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'cocodaUserApiToken',
	},
);
