import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface CocodaUserAttribute {
	id: number;
	name: string;
	nickname: string;
	email: string;
	check_email: string;
	password: string;
	is_delete: boolean;
}

class CocodaUser
	extends Model<CocodaUserAttribute>
	implements CocodaUserAttribute
{
	declare readonly id: number;
	declare name: string;
	declare nickname: string;
	declare email: string;
	declare check_email: string;
	declare password: string;
	declare is_delete: boolean;
}

export default CocodaUser.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		nickname: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		check_email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		is_delete: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		tableName: 'cocoda_users',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'cocodaUser',
	},
);
