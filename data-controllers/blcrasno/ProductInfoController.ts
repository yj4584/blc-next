import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseBlcrasnoInclude from 'data-controllers/parseBlcrasnoInclude';
import ProductInfo, { ProductInfoAttribute } from 'models/blcrasno/ProductInfo';
import parseFindProps from 'data-controllers/parseFindProps';
import bcrypt from 'bcrypt';

import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

export interface ProductInfoControllerAttribute extends ProductInfoAttribute {}

export default class ProductInfoController {
	static defaultAttributes = ['id', 'category', 'name'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseBlcrasnoInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<ProductInfoControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = ProductInfoController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include = ProductInfoController.includeChecks(includeDatas);

		const result = await ProductInfo.findAll(selectOptions);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<ProductInfoControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = ProductInfoController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include = ProductInfoController.includeChecks(includeDatas);

		const result = await ProductInfo.findOne(selectOptions);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<ProductInfoControllerAttribute | null> {
		const convertInsertData: any = Object.keys(insertData).reduce(
			(result, insertDataKey) => {
				const convertKey = convertCamelCaseToSnakeCase(insertDataKey);
				return {
					...result,
					[convertKey]: insertData[insertDataKey],
				};
			},
			{},
		);
		const result = await ProductInfo.create(convertInsertData, props).catch(
			null,
		);
		return result;
	}

	static async update(
		updateData: any,
		props: FindInterface = {},
	): Promise<boolean> {
		const updateResult = await ProductInfo.update(updateData, {
			where: props.where,
		});
		return updateResult[0] != 0;
	}
}
