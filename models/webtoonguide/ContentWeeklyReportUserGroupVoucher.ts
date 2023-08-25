import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ContentWeeklyReportUserGroupVoucherAttribute {
	id: number;
	user_group_id: number;
	voucher_id: number;
	voucher_name: string;
	start_at: number;
	end_at: number;
	count: number;
	monetary_unit_id: number;
	sum_price: number;
	ori_price: number;
	price: number;
	tax: number;
	memo: string;
	is_delete: number;
	created_at: Date | null;
	updated_at: Date | null;
	insert_time: number;
	delete_time: number;
	insert_cocoda_user_id: number;
	delete_cocoda_user_id: number;
	insert_reseller_agency_id: number;
}

class ContentWeeklyReportUserGroupVoucher
	extends Model<ContentWeeklyReportUserGroupVoucherAttribute>
	implements ContentWeeklyReportUserGroupVoucherAttribute
{
	declare readonly id: number;
	declare user_group_id: number;
	declare voucher_id: number;
	declare voucher_name: string;
	declare start_at: number;
	declare end_at: number;
	declare count: number;
	declare monetary_unit_id: number;
	declare sum_price: number;
	declare ori_price: number;
	declare price: number;
	declare tax: number;
	declare memo: string;
	declare is_delete: number;
	declare created_at: Date | null;
	declare updated_at: Date | null;
	declare insert_time: number;
	declare delete_time: number;
	declare insert_cocoda_user_id: number;
	declare delete_cocoda_user_id: number;
	declare insert_reseller_agency_id: number;
}

export default ContentWeeklyReportUserGroupVoucher.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		user_group_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		voucher_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		voucher_name: {
			type: DataTypes.STRING,
		},
		start_at: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		end_at: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		count: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		monetary_unit_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		sum_price: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		ori_price: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		price: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		tax: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		memo: {
			type: DataTypes.STRING,
		},
		is_delete: {
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
		insert_time: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		delete_time: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		insert_cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		delete_cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		insert_reseller_agency_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
	},
	{
		tableName: 'content_weekly_report_user_group_voucher',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'contentWeeklyReportUserGroupVoucher',
	},
);
