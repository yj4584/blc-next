import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportUserGroupTypeAttribute {
	id: number;
	name: string;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportUserGroupType
	extends Model<ContentWeeklyReportUserGroupTypeAttribute>
	implements ContentWeeklyReportUserGroupTypeAttribute
{
	declare readonly id: number;
	declare name: string;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportUserGroupType.init(
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
		tableName: 'content_weekly_report_user_group_types',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportUserGroupType',
	},
);
