import { InterfaceIncludeDataInterface } from 'data-interface/database/common';
import Image from 'models/blcrasno/Image';
import Product from 'models/blcrasno/Product';
import ProductInfo from 'models/blcrasno/ProductInfo';

const includeJoinDatas: any = {
	image: {
		model: Image,
		defaultAttributes: ['id', 'page', 'category', 'url'],
	},
	product: {
		model: Product,
		defaultAttributes: ['id', 'category', 'name'],
	},
	productInfo: {
		model: ProductInfo,
		defaultAttributes: ['id', 'name', 'height', 'thickness', 'material'],
	},
};
const recursionParseInclude = (includeData: InterfaceIncludeDataInterface) => {
	let myIncludes: any = {};
	if (typeof includeJoinDatas == 'undefined') {
		return null;
	}
	if (typeof includeJoinDatas[includeData.key] == 'undefined') {
		return null;
	}

	const through =
		typeof includeData.through == 'undefined' ? undefined : includeData.through;
	const separate =
		typeof includeData.separate == 'undefined' ? false : includeData.separate;
	const required =
		typeof includeData.required == 'undefined' ? false : includeData.required;
	const attributes =
		typeof includeData.attributes == 'undefined'
			? includeJoinDatas[includeData.key].defaultAttributes
			: includeData.attributes;
	myIncludes = {
		model: includeJoinDatas[includeData.key].model,
		required: required,
		attributes: attributes,
		separate: separate,
		through: through,
	};
	if (typeof includeData.whereAttributes != 'undefined') {
		myIncludes.where = includeData.whereAttributes;
	}

	if (
		typeof includeJoinDatas[includeData.key].defaultWhereAttributes !=
		'undefined'
	) {
		if (typeof myIncludes.where == 'undefined') {
			myIncludes.where =
				includeJoinDatas[includeData.key].defaultWhereAttribute;
		} else {
			const whereKeys = Object.keys(
				includeJoinDatas[includeData.key].defaultWhereAttribute,
			);
			for (let i = 0; i < whereKeys.length; ++i) {
				if (typeof myIncludes.where[whereKeys[i]] != 'undefined') {
					continue;
				}
				myIncludes.where[whereKeys[i]] =
					includeJoinDatas[includeData.key].defaultWhereAttribute[whereKeys[i]];
			}
		}
	}

	if (
		typeof includeData.includes != 'undefined' &&
		includeData.includes.length > 0
	) {
		let childIncludes: any[] = [];
		includeData.includes.map((childIncludeItem) => {
			let childIncludeData = recursionParseInclude(childIncludeItem);
			if (childIncludeData != null) {
				childIncludes.push(childIncludeData);
			}
		});
		if (childIncludes.length > 0) {
			myIncludes.include = childIncludes;
		}
	}
	return myIncludes;
};

const parseBlcrasnoInclude = (
	includeDatas: InterfaceIncludeDataInterface[],
) => {
	let includes: any[] = [];
	includeDatas.map((includeData) => {
		let childIncludeData = recursionParseInclude(includeData);
		if (childIncludeData != null) {
			includes.push(childIncludeData);
		}
	});
	return includes;
};

export default parseBlcrasnoInclude;
