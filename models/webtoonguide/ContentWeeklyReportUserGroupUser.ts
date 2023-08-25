import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportUserGroupUserAttribute {
	id: number;
	user_id: number;
	cocoda_user_id: number;
	content_weekly_report_user_group_id: number;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportUserGroupUser
	extends Model<ContentWeeklyReportUserGroupUserAttribute>
	implements ContentWeeklyReportUserGroupUserAttribute
{
	declare readonly id: number;
	declare user_id: number;
	declare cocoda_user_id: number;
	declare content_weekly_report_user_group_id: number;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportUserGroupUser.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		content_weekly_report_user_group_id: {
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
		tableName: 'content_weekly_report_user_group_user',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportUserGroupUser',
	},
);
