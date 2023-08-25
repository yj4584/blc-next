import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface MonetaryUnitAttribute {
	id: number;
	key: string | null;
	name: string | null;
	created_at: Date;
	updated_at: Date;
}

class MonetaryUnit
	extends Model<MonetaryUnitAttribute>
	implements MonetaryUnitAttribute
{
	declare readonly id: number;
	declare key: string | null;
	declare name: string | null;
	declare created_at: Date;
	declare updated_at: Date;
}

export default MonetaryUnit.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		key: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
		},
		updated_at: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: 'monetary_units',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'monetaryUnit',
	},
);
