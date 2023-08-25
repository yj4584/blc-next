import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportUserGroupDailyServiceUserAttribute {
	id: number;
	content_weekly_report_user_group_id: number;
	name: string;
	job_title: string;
	email: string;
	phone_number: string;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportUserGroupDailyServiceUser
	extends Model<ContentWeeklyReportUserGroupDailyServiceUserAttribute>
	implements ContentWeeklyReportUserGroupDailyServiceUserAttribute
{
	declare readonly id: number;
	declare content_weekly_report_user_group_id: number;
	declare name: string;
	declare job_title: string;
	declare email: string;
	declare phone_number: string;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportUserGroupDailyServiceUser.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		content_weekly_report_user_group_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		name: {
			type: DataTypes.STRING,
		},
		job_title: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		phone_number: {
			type: DataTypes.STRING,
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
		tableName: 'content_weekly_report_user_group_daily_service_users',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportUserGroupDailyServiceUser',
	},
);
