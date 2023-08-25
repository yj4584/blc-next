import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportDataAttribute {
	id: number;
	weekly_report_id: number;
	content_crawling_data_id: number;
	json_data: string;
	short_text: string;
	add_description: string;
	is_active: boolean;
	access_key: number;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportData
	extends Model<ContentWeeklyReportDataAttribute>
	implements ContentWeeklyReportDataAttribute
{
	declare readonly id: number;
	declare weekly_report_id: number;
	declare content_crawling_data_id: number;
	declare json_data: string;
	declare short_text: string;
	declare add_description: string;
	declare is_active: boolean;
	declare access_key: number;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportData.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		weekly_report_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		content_crawling_data_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		json_data: {
			type: DataTypes.TEXT('long'),
		},
		short_text: {
			type: DataTypes.STRING,
		},
		add_description: {
			type: DataTypes.TEXT,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
		},
		access_key: {
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
		tableName: 'content_weekly_report_datas',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportData',
	},
);
