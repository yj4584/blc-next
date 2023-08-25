import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface CocodaUserGroupAttribute {
	id: number;
	name: string;
}

class CocodaUserGroup
	extends Model<CocodaUserGroupAttribute>
	implements CocodaUserGroupAttribute
{
	declare readonly id: number;
	declare name: string;
}

export default CocodaUserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'cocoda_user_groups',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'cocodaUserGroup',
	},
);
