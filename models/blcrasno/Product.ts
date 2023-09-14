import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ProductAttribute {
	id: number;
	category: string;
	name: string;
}

class Product extends Model<ProductAttribute> implements ProductAttribute {
	declare readonly id: number;
	declare category: string;
	declare name: string;
}

export default Product.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		category: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'products',
		timestamps: false,
		sequelize: sequelize.blcrasno,
		modelName: 'product',
	},
);
