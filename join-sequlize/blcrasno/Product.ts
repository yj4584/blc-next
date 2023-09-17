import joinProcess from 'join-sequlize/joinProcess';
import Product from 'models/blcrasno/Product';
import ProductInfo from 'models/blcrasno/ProductInfo';
import Image from 'models/blcrasno/Image';

const joinList: any = {
	ProductInfo: () => {
		Product.hasMany(ProductInfo, {
			foreignKey: 'product_id',
		});
	},
	Image: () => {
		Product.hasMany(Image, {
			foreignKey: 'product_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
