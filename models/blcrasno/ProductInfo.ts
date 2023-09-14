import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ProductInfoAttribute {
	id: number;
	product_id: number;
	name: string;
	height: number;
	thickness: number;
	material: string;
}

class ProductInfo
	extends Model<ProductInfoAttribute>
	implements ProductInfoAttribute
{
	declare readonly id: number;
	declare product_id: number;
	declare name: string;
	declare height: number;
	declare thickness: number;
	declare material: string;
}

export default ProductInfo.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		product_id: {
			type: DataTypes.INTEGER.UNSIGNED,
		},
		name: {
			type: DataTypes.STRING,
		},
		height: {
			type: DataTypes.FLOAT,
		},
		thickness: {
			type: DataTypes.FLOAT,
		},
		material: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'product_info',
		timestamps: false,
		sequelize: sequelize.blcrasno,
		modelName: 'productInfo',
	},
);
