import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportAccessTypeAttribute {
	id: number;
	name: string;
	report_type_id: number;
	access_type: string;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportAccessType
	extends Model<ContentWeeklyReportAccessTypeAttribute>
	implements ContentWeeklyReportAccessTypeAttribute
{
	declare readonly id: number;
	declare name: string;
	declare report_type_id: number;
	declare access_type: string;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportAccessType.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		report_type_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		access_type: {
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
		tableName: 'content_weekly_report_access_types',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportAccessType',
	},
);
