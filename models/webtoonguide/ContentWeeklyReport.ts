import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportAttribute {
	id: number;
	weekly_report_type_id: number;
	report_date: number | null;
	json_data: string | null;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReport
	extends Model<ContentWeeklyReportAttribute>
	implements ContentWeeklyReportAttribute
{
	declare readonly id: number;
	declare weekly_report_type_id: number;
	declare report_date: number | null;
	declare json_data: string | null;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReport.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		weekly_report_type_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		report_date: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		json_data: {
			type: DataTypes.TEXT('long'),
			allowNull: true,
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
		tableName: 'content_weekly_reports',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReport',
	},
);
