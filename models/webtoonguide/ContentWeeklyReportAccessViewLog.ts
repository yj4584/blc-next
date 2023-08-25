import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportAccessViewLogAttribute {
	id: number;
	user_id: number;
	email: string;
	ip: string;
	is_admin: boolean;
	access_type: string;
	access_url: string;
	user_agenct: string;
	acccess_time: number;
	content_type_group_id: number | null;
	platform_id: number | null;
	distributor_group_id: number | null;
	content_crawling_data_id: number | null;
	weekly_report_id: number | null;
	page_name: string | null;
	is_view: boolean;
	is_parse: boolean;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportAccessViewLog
	extends Model<ContentWeeklyReportAccessViewLogAttribute>
	implements ContentWeeklyReportAccessViewLogAttribute
{
	declare readonly id: number;
	declare user_id: number;
	declare email: string;
	declare ip: string;
	declare is_admin: boolean;
	declare access_type: string;
	declare access_url: string;
	declare user_agenct: string;
	declare acccess_time: number;
	declare content_type_group_id: number | null;
	declare platform_id: number | null;
	declare distributor_group_id: number | null;
	declare content_crawling_data_id: number | null;
	declare weekly_report_id: number | null;
	declare page_name: string | null;
	declare is_view: boolean;
	declare is_parse: boolean;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportAccessViewLog.init(
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
		access_type: {
			type: DataTypes.STRING,
		},
		access_url: {
			type: DataTypes.STRING,
		},
		user_agenct: {
			type: DataTypes.STRING,
		},
		acccess_time: {
			type: DataTypes.BIGINT.UNSIGNED,
		},
		content_type_group_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		platform_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		distributor_group_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		content_crawling_data_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		weekly_report_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		page_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		is_view: {
			type: DataTypes.BOOLEAN,
		},
		is_parse: {
			type: DataTypes.BOOLEAN,
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
		tableName: 'content_weekly_report_access_view_logs',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportAccessViewLog',
	},
);
