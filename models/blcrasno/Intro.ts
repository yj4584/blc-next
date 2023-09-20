import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface IntroAttribute {
	id: number;
	text: string;
}

class Intro extends Model<IntroAttribute> implements IntroAttribute {
	declare readonly id: number;
	declare text: string;
}

export default Intro.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		text: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: 'intro',
		timestamps: false,
		sequelize: sequelize.blcrasno,
		modelName: 'intro',
	},
);
