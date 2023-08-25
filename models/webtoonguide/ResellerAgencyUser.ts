import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ResellerAgencyUserAttribute {
	id?: number;
	cocoda_user_id: number;
	reseller_agency_id: number;
}

class ResellerAgencyUser
	extends Model<ResellerAgencyUserAttribute>
	implements ResellerAgencyUserAttribute
{
	declare readonly id: number;
	declare cocoda_user_id: number;
	declare reseller_agency_id: number;
}

export default ResellerAgencyUser.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		cocoda_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		reseller_agency_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
	},
	{
		tableName: 'reseller_agency_user',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'resellerAgencyUser',
	},
);
