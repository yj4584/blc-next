import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportUserGroupAttribute {
	id: number;
	user_group_type_id: number | null;
	name: string;
	company_id: number | null;
	manager: string;
	manager_email: string;
	manager_phone_number: string;
	memo: string;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportUserGroup
	extends Model<ContentWeeklyReportUserGroupAttribute>
	implements ContentWeeklyReportUserGroupAttribute
{
	declare readonly id: number;
	declare user_group_type_id: number | null;
	declare name: string;
	declare company_id: number | null;
	declare manager: string;
	declare manager_email: string;
	declare manager_phone_number: string;
	declare memo: string;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportUserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_group_type_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		company_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		manager: {
			type: DataTypes.STRING,
		},
		manager_email: {
			type: DataTypes.STRING,
		},
		manager_phone_number: {
			type: DataTypes.STRING,
		},
		memo: {
			type: DataTypes.TEXT,
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
		tableName: 'content_weekly_report_user_groups',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportUserGroup',
	},
);
