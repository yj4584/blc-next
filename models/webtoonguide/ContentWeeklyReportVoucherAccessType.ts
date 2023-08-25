import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportVoucherAccessTypeAttribute {
	id?: number;
	access_type_id: number;
	voucher_id: number;
	created_at: Date | null;
	updated_at: Date | null;
}

class ContentWeeklyReportVoucherAccessType
	extends Model<ContentWeeklyReportVoucherAccessTypeAttribute>
	implements ContentWeeklyReportVoucherAccessTypeAttribute
{
	declare readonly id: number;
	declare access_type_id: number;
	declare voucher_id: number;
	declare created_at: Date | null;
	declare updated_at: Date | null;
}

export default ContentWeeklyReportVoucherAccessType.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		access_type_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		voucher_id: {
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
		tableName: 'content_weekly_report_voucher_access_type',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportVoucherAccessType',
	},
);
