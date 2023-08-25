import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface UserGroupAttribute {
	id?: number;
	name?: string;
	group_level?: number | null;
	priority?: number;
	created_at?: Date | null;
	updated_at?: Date | null;
}

class UserGroup
	extends Model<UserGroupAttribute>
	implements UserGroupAttribute
{
	declare readonly id?: number;
	declare name?: string;
	declare group_level?: number | null;
	declare priority?: number;
	declare created_at?: Date | null;
	declare updated_at?: Date | null;
}

export default UserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		group_level: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		priority: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: 'user_groups',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'userGroup',
	},
);
