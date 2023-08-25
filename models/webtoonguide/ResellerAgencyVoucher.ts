import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ResellerAgencyVoucherAttribute {
	id?: number;
	reseller_agency_id: number;
	voucher_id: number;
}

class ResellerAgencyVoucher
	extends Model<ResellerAgencyVoucherAttribute>
	implements ResellerAgencyVoucherAttribute
{
	declare readonly id: number;
	declare reseller_agency_id: number;
	declare voucher_id: number;
}

export default ResellerAgencyVoucher.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		reseller_agency_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		voucher_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
	},
	{
		tableName: 'reseller_agency_voucher',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'resellerAgencyVoucher',
	},
);
