import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportAccessLogAttribute {
	id: number;
	user_id: number;
	email: string;
	ip: string;
	is_admin: boolean;
	country_id: number | null;
	access_type: string;
	access_url: string;
	acccess_time: number;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportAccessLog
	extends Model<ContentWeeklyReportAccessLogAttribute>
	implements ContentWeeklyReportAccessLogAttribute
{
	declare readonly id: number;
	declare user_id: number;
	declare email: string;
	declare ip: string;
	declare is_admin: boolean;
	declare country_id: number | null;
	declare access_type: string;
	declare access_url: string;
	declare acccess_time: number;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportAccessLog.init(
	{
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		email: {
			type: DataTypes.STRING,
		},
		ip: {
			type: DataTypes.STRING,
		},
		is_admin: {
			type: DataTypes.BOOLEAN,
		},
		country_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		access_type: {
			type: DataTypes.STRING,
		},
		access_url: {
			type: DataTypes.STRING,
		},
		acccess_time: {
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
		tableName: 'content_weekly_report_access_logs',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportAccessLog',
	},
);
