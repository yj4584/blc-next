import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface UserAttribute {
	id: number;
	name: string;
	email: string;
	password: string;
}

class User extends Model<UserAttribute> implements UserAttribute {
	declare readonly id: number;
	declare name: string;
	declare email: string;
	declare password: string;
}

export default User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'users',
		timestamps: false,
		sequelize: sequelize.blcrasno,
		modelName: 'user',
	},
);
