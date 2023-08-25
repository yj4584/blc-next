import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ResellerAgencyAttribute {
	id?: number;
	name: string;
	memo: string;
	language_id: number;
}

class ResellerAgency
	extends Model<ResellerAgencyAttribute>
	implements ResellerAgencyAttribute
{
	declare readonly id: number;
	declare name: string;
	declare memo: string;
	declare language_id: number;
}

export default ResellerAgency.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		memo: {
			type: DataTypes.STRING,
		},
		language_id: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: 'reseller_agencies',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'resellerAgency',
	},
);
