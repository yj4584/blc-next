import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface ImageAttribute {
	id: number;
	page: string;
	category: string;
    order: number;
	url: string;
}

class Image
	extends Model<ImageAttribute>
	implements ImageAttribute
{
	declare readonly id: number;
	declare page: string;
	declare category: string;
    declare order: number;
	declare url: string;
}

export default Image.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		page: {
			type: DataTypes.STRING,
		},
		category: {
			type: DataTypes.STRING,
		},
        order: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
		url: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'images',
		timestamps: false,
		sequelize: sequelize.blcrasno,
		modelName: 'image',
	},
);
