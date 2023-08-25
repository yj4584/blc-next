import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import MonetaryUnit, {
	MonetaryUnitAttribute,
} from 'models/webtoonguide/MonetaryUnit';
import parseFindProps from 'data-controllers/parseFindProps';

import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

export interface MonetaryUnitControllerAttribute
	extends MonetaryUnitAttribute {}

export default class MonetaryUnitController {
	static defaultAttributes = ['id', 'key', 'name'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<MonetaryUnitControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = MonetaryUnitController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include = MonetaryUnitController.includeChecks(includeDatas);

		const result = await MonetaryUnit.findAll(selectOptions);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<MonetaryUnitControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = MonetaryUnitController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include = MonetaryUnitController.includeChecks(includeDatas);

		const result = await MonetaryUnit.findOne(selectOptions);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<MonetaryUnitControllerAttribute | null> {
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
		const result = await MonetaryUnit.create(convertInsertData, props).catch(
			null,
		);
		return result;
	}

	static async update(
		updateData: any,
		props: FindInterface = {},
	): Promise<boolean> {
		const updateResult = await MonetaryUnit.update(updateData, {
			where: props.where,
		});
		return updateResult[0] != 0;
	}
}
