import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportTypeAttribute {
	id: number;
	name: string;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportType
	extends Model<ContentWeeklyReportTypeAttribute>
	implements ContentWeeklyReportTypeAttribute
{
	declare readonly id: number;
	declare name: string;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportType.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
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
		tableName: 'content_weekly_report_types',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportType',
	},
);
