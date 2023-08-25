import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportVoucherAttribute {
	id?: number;
	name?: string;
	type?: string;
	service?: string;
	created_at?: Date | null;
	updated_at?: Date | null;
	contentWeeklyReportAccessTypes?: any;
	contentWeeklyReportVoucherPrices?: any;
}

class ContentWeeklyReportVoucher
	extends Model<ContentWeeklyReportVoucherAttribute>
	implements ContentWeeklyReportVoucherAttribute
{
	declare readonly id: number;
	declare name: string;
	declare type: string;
	declare service: string;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportVoucher.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.STRING,
		},
		service: {
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
		tableName: 'content_weekly_report_vouchers',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportVoucher',
	},
);
