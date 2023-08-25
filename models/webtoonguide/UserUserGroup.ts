import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface UserUserGroupAttribute {
	id?: number;
	user_id?: number;
	user_group_id?: number;
	created_at?: Date | null;
	updated_at?: Date | null;
}

class UserUserGroup
	extends Model<UserUserGroupAttribute>
	implements UserUserGroupAttribute
{
	declare readonly id?: number;
	declare user_id?: number;
	declare user_group_id?: number;
	declare created_at?: Date | null;
	declare updated_at?: Date | null;
}

export default UserUserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
		},
		user_group_id: {
			type: DataTypes.INTEGER,
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
		tableName: 'user_user_group',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'userUserGroup',
	},
);
