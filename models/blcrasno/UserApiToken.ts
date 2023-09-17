import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface UserApiTokenAttribute {
	user_id: number;
	user_email?: string;
	hash_token?: string;
	user_agent?: string;
	last_check_time?: number;
	ip?: string;
}

class UserApiToken
	extends Model<UserApiTokenAttribute>
	implements UserApiTokenAttribute
{
	declare user_id: number;
	declare user_email: string;
	declare hash_token: string;
	declare user_agent: string;
	declare last_check_time: number;
	declare ip: string;
}

export default UserApiToken.init(
	{
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		user_email: {
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
		tableName: 'user_api_tokens',
		timestamps: false,
		sequelize: sequelize.blcrasno,
		modelName: 'userApiToken',
	},
);
