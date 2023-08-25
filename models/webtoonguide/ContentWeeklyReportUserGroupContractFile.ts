import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportUserGroupContractFileAttribute {
	id?: number;
	customer_id?: number;
	name?: string;
	path?: string;
	size?: number;
	insert_time?: number;
}

class ContentWeeklyReportUserGroupContractFile
	extends Model<ContentWeeklyReportUserGroupContractFileAttribute>
	implements ContentWeeklyReportUserGroupContractFileAttribute
{
	declare readonly id?: number;
	declare customer_id?: number;
	declare name?: string;
	declare path?: string;
	declare size?: number;
	declare insert_time?: number;
}

export default ContentWeeklyReportUserGroupContractFile.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		customer_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		name: {
			type: DataTypes.STRING,
		},
		path: {
			type: DataTypes.STRING,
		},
		size: {
			type: DataTypes.INTEGER,
		},
		insert_time: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: 'content_weekly_report_user_group_contract_files',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'ContentWeeklyReportUserGroupContractFile',
	},
);
