import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface CocodaUserCocodaUserGroupAttribute {
	id: number;
	cocoda_user_id: number;
	cocoda_user_group_id: number;
}

class CocodaUserCocodaUserGroup
	extends Model<CocodaUserCocodaUserGroupAttribute>
	implements CocodaUserCocodaUserGroupAttribute
{
	declare readonly id: number;
	declare cocoda_user_id: number;
	declare cocoda_user_group_id: number;
}

export default CocodaUserCocodaUserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		cocoda_user_group_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
	},
	{
		tableName: 'cocoda_user_cocoda_user_group',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'cocodaUserCocodaUserGroup',
	},
);
