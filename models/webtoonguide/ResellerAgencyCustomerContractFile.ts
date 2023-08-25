import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ResellerAgencyCustomerContractFileAttribute {
	id?: number;
	reseller_agency_id?: number;
	cocoda_user_id: number;
	contract_file_id: number;
}

class ResellerAgencyCustomerContractFile
	extends Model<ResellerAgencyCustomerContractFileAttribute>
	implements ResellerAgencyCustomerContractFileAttribute
{
	declare readonly id: number;
	declare reseller_agency_id: number;
	declare cocoda_user_id: number;
	declare contract_file_id: number;
}

export default ResellerAgencyCustomerContractFile.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		reseller_agency_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		contract_file_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
	},
	{
		tableName: 'reseller_agency_customer_contract_file',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'ResellerAgencyCustomerContractFile',
	},
);
