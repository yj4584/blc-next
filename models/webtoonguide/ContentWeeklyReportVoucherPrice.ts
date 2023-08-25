import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportVoucherPriceAttribute {
	id: number;
	voucher_id: number;
	month: number;
	price: number;
	real_price: number;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportVoucherPrice
	extends Model<ContentWeeklyReportVoucherPriceAttribute>
	implements ContentWeeklyReportVoucherPriceAttribute
{
	declare readonly id: number;
	declare voucher_id: number;
	declare month: number;
	declare price: number;
	declare real_price: number;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportVoucherPrice.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		voucher_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		month: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		price: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		real_price: {
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
		tableName: 'content_weekly_report_voucher_prices',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportVoucherPrice',
	},
);
